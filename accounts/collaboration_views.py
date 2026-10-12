from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import IntegrityError, transaction
from django.db.models import Count
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.clickjacking import xframe_options_sameorigin

from .collaboration_forms import CollaborationEditForm, CollaborationRequestForm, CollaborationReviewForm, ConfirmForm, NoteForm
from .collaboration_services import can_review, member_eligible, reset_agreements, review_collaboration, validate_ready
from .models import Collaboration, CollaborationMember, CollaborationNote, Submission
from .services import allow_attempt, audit
from .submission_views import creator_access


def request_card(item):
    return {'pk': item.pk, 'title': item.submission.title, 'need': item.get_need_display(),
            'brief': item.brief, 'language': item.submission.get_language_display(),
            'status': item.get_status_display(), 'demo': item.is_demo,
            'credits': [m.credit_name for m in item.members.select_related('user__profile')]}


@login_required
def space(request):
    from .visibility import hidden_member_ids
    base = Collaboration.objects.exclude(created_by_id__in=hidden_member_ids()).exclude(members__user_id__in=hidden_member_ids()).select_related('submission').prefetch_related('members__user__profile').filter(closed=False)
    open_items = base.annotate(member_count=Count('members')).filter(status='draft', member_count=1)
    mine = base.filter(members__user=request.user)
    review = base.filter(status__in=['submitted', 'in_review', 'approved']).exclude(members__user=request.user) if can_review(request.user) else base.none()
    empty_preview = settings.DEBUG and request.GET.get('empty') == '1'
    return render(request, 'accounts/collaborations.html', {
        'open_requests': [] if empty_preview else [request_card(c) for c in open_items],
        'my_collaborations': [] if empty_preview else [request_card(c) for c in mine],
        'review_items': [] if empty_preview else [request_card(c) for c in review],
        'reviewer': can_review(request.user), 'empty_preview': empty_preview,
    })


@login_required
def create(request):
    blocked = creator_access(request)
    if blocked:
        return blocked
    form = CollaborationRequestForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        if not allow_attempt(request, 'collaboration-create:' + str(request.user.pk), 12, 3600):
            form.add_error(None, 'Please wait before creating more requests.')
        else:
            with transaction.atomic():
                item = form.save(commit=False)
                item.created_by = request.user
                item.submission = Submission.objects.create(
                    owner=request.user, title=form.cleaned_data['title'],
                    language=form.cleaned_data['language'], content_warning=form.cleaned_data['content_warning'],
                    section='articles' if item.need == 'art' else 'art', status=Submission.DRAFT,
                    summary='', body=form.cleaned_data.get('draft_text', ''),
                )
                item.save()
                CollaborationMember.objects.create(collaboration=item, user=request.user,
                    role='writer' if item.need == 'art' else 'artist', anonymous=form.cleaned_data['anonymous'])
                audit(request.user, 'collaboration.created', item)
            return redirect('collaboration-detail', pk=item.pk)
    return render(request, 'accounts/collaboration-create.html', {'form': form})


@login_required
def detail(request, pk):
    from .visibility import hidden_member_ids
    item = get_object_or_404(Collaboration.objects.select_related('submission').exclude(created_by_id__in=hidden_member_ids()).exclude(members__user_id__in=hidden_member_ids()), pk=pk, closed=False)
    edit_form = None
    error = ''
    if request.method == 'POST':
        blocked = creator_access(request)
        if blocked:
            return blocked
        if not allow_attempt(request, 'collaboration-action:' + str(request.user.pk), 120, 3600):
            raise PermissionDenied('Please wait before making more changes.')
        try:
            with transaction.atomic():
                item = Collaboration.objects.select_for_update().select_related('submission').get(pk=pk, closed=False)
                member = item.members.filter(user=request.user).first()
                action = request.POST.get('action')
                if str(item.revision) != request.POST.get('revision'):
                    raise ValidationError('This draft changed in another tab. Reload before continuing.')
                if action == 'accept':
                    if member or item.status != 'draft' or item.members.count() != 1 or not member_eligible(request.user):
                        raise ValidationError('This request is no longer available to accept.')
                    role = 'artist' if item.members.get().role == 'writer' else 'writer'
                    CollaborationMember.objects.create(collaboration=item, user=request.user, role=role, anonymous=request.POST.get('anonymous') == 'on')
                    reset_agreements(item)
                    item.save()
                elif action == 'note':
                    if not member and not (item.status == 'draft' and item.members.count() == 1):
                        raise PermissionDenied
                    form = NoteForm(request.POST, prefix='note')
                    if not form.is_valid():
                        raise ValidationError('Write a note of up to 1,500 characters.')
                    CollaborationNote.objects.create(collaboration=item, author=request.user,
                        label=member.get_role_display() if member else 'Interested member', body=form.cleaned_data['body'])
                elif action in ('edit', 'confirm', 'submit', 'leave'):
                    if not member:
                        raise PermissionDenied
                    if item.status not in ('draft', 'changes_requested'):
                        raise ValidationError('This version is locked during review and after publication.')
                    if action == 'edit':
                        edit_form = CollaborationEditForm(request.POST, request.FILES, instance=item.submission, draft=True)
                        if len(request.FILES) > 5:
                            raise ValidationError('Upload no more than five images, including one featured image.')
                        if not edit_form.is_valid():
                            raise ValidationError('Check the shared draft fields below.')
                        submission = edit_form.save(commit=False)
                        if item.status == 'changes_requested':
                            submission.revision += 1
                        submission.status = Submission.DRAFT
                        submission.save()
                        for field in ('illustration_meaning', 'image_rights', 'source_url', 'licence', 'source_credit'):
                            setattr(item, field, edit_form.cleaned_data[field])
                        item.status = 'draft'
                        reset_agreements(item)
                        item.save()
                    elif action == 'confirm':
                        if item.members.count() != 2 or not ConfirmForm(request.POST).is_valid():
                            raise ValidationError('Both roles must be filled. Check the consent agreement to confirm this draft.')
                        if not member_eligible(request.user):
                            raise PermissionDenied
                        member.confirmed_revision, member.consented_at = item.revision, timezone.now()
                        member.save()
                    elif action == 'submit':
                        validate_ready(item)
                        item.status, item.submitted_at = 'submitted', timezone.now()
                        item.submission.status = Submission.PENDING
                        item.submission.save()
                        item.save()
                    elif action == 'leave':
                        if item.submitted_at:
                            raise ValidationError('Once submitted, contact editorial about withdrawal. Published work follows the 14-day takedown and account rules.')
                        member.delete()
                        remaining = item.members.first()
                        if remaining:
                            item.submission.owner = remaining.user
                            item.submission.save()
                            item.need = 'art' if remaining.role == 'writer' else 'writing'
                        else:
                            item.closed = True
                        reset_agreements(item)
                        item.save()
                elif action == 'review':
                    form = CollaborationReviewForm(request.POST)
                    if not form.is_valid():
                        raise ValidationError('Choose a review action and include a note when requesting changes.')
                    review_collaboration(request.user, item.pk, form.cleaned_data['decision'], form.cleaned_data['note'], item.revision)
                else:
                    raise ValidationError('Choose a valid action.')
                audit(request.user, 'collaboration.' + str(action), item)
            messages.success(request, 'Collaboration updated.')
            return redirect('collaboration-space' if action == 'leave' else 'collaboration-detail', **({} if action == 'leave' else {'pk': item.pk}))
        except ValidationError as exc:
            error = ' '.join(exc.messages)
            item.refresh_from_db()
            item.submission.refresh_from_db()
        except IntegrityError:
            error = 'This request changed while you were joining. Reload to see its current co-authors.'
            item.refresh_from_db()
    members = list(item.members.select_related('user__profile'))
    member = next((m for m in members if m.user_id == request.user.pk), None)
    reviewer = can_review(request.user) and not member and item.status in ('submitted', 'in_review', 'changes_requested', 'approved', 'published')
    private_work = bool(member or reviewer)
    if request.method == 'GET' and not private_work and not (item.status == 'draft' and len(members) == 1):
        raise PermissionDenied
    editable = bool(member and item.status in ('draft', 'changes_requested'))
    if editable and edit_form is None:
        edit_form = CollaborationEditForm(instance=item.submission, draft=True, initial={
            field: getattr(item, field) for field in ('illustration_meaning', 'image_rights', 'source_url', 'licence', 'source_credit')})
    # Do not pass membership objects or account IDs to templates or the review UI.
    credits = [{'name': m.credit_name, 'role': m.get_role_display(), 'confirmed': m.confirmed_revision == item.revision and bool(m.consented_at)} for m in members]
    notes = item.notes.all() if private_work else item.notes.filter(author=request.user)
    post = getattr(item.submission, 'live_content', None)
    return render(request, 'accounts/collaboration-detail.html', {
        'item': item, 'credits': credits, 'private_work': private_work, 'editable': editable,
        'can_accept': not member and item.status == 'draft' and len(members) == 1,
        'can_note': bool(member or (item.status == 'draft' and len(members) == 1)),
        'can_leave': bool(member and not item.submitted_at and item.status == 'draft'),
        'reviewer': reviewer, 'edit_form': edit_form, 'confirm_form': ConfirmForm(),
        'note_form': NoteForm(prefix='note'), 'notes': notes, 'error': error, 'post': post,
    })


@login_required
def reference_image(request, pk):
    from .visibility import hidden_member_ids
    item = get_object_or_404(Collaboration.objects.exclude(created_by_id__in=hidden_member_ids()).exclude(members__user_id__in=hidden_member_ids()), pk=pk, closed=False)
    open_request = item.status == 'draft' and item.members.count() == 1
    if not open_request and not item.members.filter(user=request.user).exists() and not (can_review(request.user) and item.status != 'draft'):
        raise PermissionDenied
    if not item.reference_image:
        raise Http404
    return FileResponse(item.reference_image.open('rb'), content_type='image/jpeg')


@login_required
def media(request, pk, slot):
    from .visibility import hidden_member_ids
    item = get_object_or_404(Collaboration.objects.select_related('submission').exclude(created_by_id__in=hidden_member_ids()).exclude(members__user_id__in=hidden_member_ids()), pk=pk, closed=False)
    member = item.members.filter(user=request.user).exists()
    open_request = item.status == 'draft' and item.members.count() == 1
    if not open_request and not member and not (can_review(request.user) and item.status != 'draft'):
        raise PermissionDenied
    if slot not in ('featured_image', 'image_2', 'image_3', 'image_4', 'image_5'):
        raise Http404
    image = getattr(item.submission, slot)
    if not image:
        raise Http404
    return FileResponse(image.open('rb'), content_type='image/jpeg')


@login_required
@xframe_options_sameorigin
def preview(request, pk):
    from .visibility import hidden_member_ids
    item = get_object_or_404(Collaboration.objects.select_related('submission').exclude(created_by_id__in=hidden_member_ids()).exclude(members__user_id__in=hidden_member_ids()), pk=pk, closed=False)
    open_request = item.status == 'draft' and item.members.count() == 1
    authorized = item.members.filter(user=request.user).exists() or (can_review(request.user) and item.status not in ('draft',))
    if not open_request and not authorized:
        raise Http404
    return render(request, 'accounts/collaboration-preview.html', {'item': item, 'preview_base': 'accounts/preview-shell.html' if request.GET.get('dialog') == '1' else 'app/base.html'})
