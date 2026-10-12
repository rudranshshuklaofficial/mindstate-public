from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.core.files.storage import default_storage
from django.db import transaction
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.decorators.http import require_POST

from .forms import SubmissionForm, SubmissionReviewForm
from .models import GuardianConsent, ReviewNotice, Submission, SubmissionSnapshot, ProfileChange, Profile
from .policy import is_admin
from .services import allow_attempt, audit
from .submission_services import matches_version, review_submission, send_review_notice


def creator_access(request):
    if not request.user.is_verified():
        return redirect(reverse('two-factor') + '?next=' + request.path)
    consent = GuardianConsent.objects.filter(user=request.user).first()
    if consent and consent.is_under_16 and consent.status != 'given':
        raise PermissionDenied('Guardian permission must be recorded before sharing work.')
    return None


@login_required
def create_submission(request):
    blocked = creator_access(request)
    if blocked:
        return blocked
    saving_draft = request.method == 'POST' and request.POST.get('action') == 'save_draft'
    form = SubmissionForm(request.POST or None, request.FILES or None, draft=saving_draft, initial={'section': request.GET.get('section') if request.GET.get('section') in ('art', 'articles') else 'articles'})
    if request.method == 'POST' and form.is_valid():
        if not allow_attempt(request, 'submission:' + str(request.user.pk), 12, 3600):
            form.add_error(None, 'Please wait before sending more work.')
        else:
            with transaction.atomic():
                item = form.save(commit=False)
                item.owner = request.user
                item.status = Submission.DRAFT if saving_draft else Submission.PENDING
                item.save()
                audit(request.user, 'submission.draft_saved' if saving_draft else 'submission.sent', item, {'revision': item.revision})
            messages.success(request, 'Draft saved privately.' if saving_draft else 'Your work is in review. Follow its status here.')
            return redirect('submission-detail', pk=item.pk)
    return render(request, 'accounts/submission-form.html', {'form': form, 'is_edit': False})


@login_required
def submission_detail(request, pk):
    item = get_object_or_404(Submission.objects.select_related('owner__profile', 'reviewed_by'), pk=pk)
    if hasattr(item, 'collaboration'):
        return redirect('collaboration-detail', pk=item.collaboration.pk)
    if item.status == Submission.DRAFT and item.owner_id != request.user.pk:
        raise PermissionDenied
    if item.owner_id != request.user.pk and not (is_admin(request.user) and request.user.is_verified()):
        raise PermissionDenied
    post = getattr(item, 'live_content', None)
    return render(request, 'accounts/submission-detail.html', {'item': item, 'post': post, 'snapshots': item.snapshots.all()})


@login_required
def edit_submission(request, pk):
    blocked = creator_access(request)
    if blocked:
        return blocked
    item = get_object_or_404(Submission, pk=pk, owner=request.user)
    if hasattr(item, 'collaboration'):
        return redirect('collaboration-detail', pk=item.collaboration.pk)
    saving_draft = request.method == 'POST' and request.POST.get('action') == 'save_draft'
    form = SubmissionForm(instance=item, draft=item.status == Submission.DRAFT)
    if request.method == 'POST':
        with transaction.atomic():
            item = Submission.objects.select_for_update().get(pk=pk, owner=request.user)
            previous = item.status
            form = SubmissionForm(request.POST, request.FILES, instance=item, draft=saving_draft)
            if not matches_version(request.POST.get('version'), item.updated_at):
                form.add_error(None, 'This work changed in another tab. Reload the editor before saving.')
            elif form.is_valid():
                item = form.save(commit=False)
                if previous in (Submission.APPROVED, Submission.DECLINED):
                    item.revision += 1
                item.status, item.review_note = (Submission.DRAFT if saving_draft else Submission.PENDING), ''
                item.reviewed_by, item.reviewed_at = None, None
                item.save()
                audit(request.user, 'submission.draft_saved' if saving_draft else 'submission.revised', item, {'revision': item.revision})
                messages.success(request, 'Draft saved privately. The approved version stays visible.' if saving_draft else 'Your revision is waiting for review. The approved version stays visible.')
                return redirect('submission-detail', pk=item.pk)
    return render(request, 'accounts/submission-form.html', {'form': form, 'is_edit': True, 'item': item})


@login_required
def review_queue(request):
    if not is_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    return render(request, 'accounts/review-queue.html', {'items': Submission.objects.filter(status=Submission.PENDING, collaboration__isnull=True).select_related('owner__profile'), 'notices': ReviewNotice.objects.filter(status='pending').select_related('submission')[:20]})


@login_required
def review_detail(request, pk):
    if not is_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    item = get_object_or_404(Submission.objects.select_related('owner__profile'), pk=pk)
    if hasattr(item, 'collaboration'):
        return redirect('collaboration-detail', pk=item.collaboration.pk)
    if item.status == Submission.DRAFT:
        raise Http404
    form = SubmissionReviewForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        try:
            item, notice = review_submission(request.user, item.pk, form.cleaned_data['decision'], form.cleaned_data['note'], request.POST.get('version', ''))
        except ValueError as exc:
            form.add_error(None, str(exc))
        else:
            delivered = send_review_notice(notice)
            messages.success(request, 'Decision saved. ' + ('The member was emailed.' if delivered else 'Email is queued until delivery is available.'))
            return redirect('review-queue')
    return render(request, 'accounts/review-detail.html', {'item': item, 'form': form})


@login_required
@require_POST
def retry_notice(request, pk):
    if not is_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    notice = get_object_or_404(ReviewNotice, pk=pk, status='pending')
    messages.success(request, 'Email sent.' if send_review_notice(notice) else 'Email delivery is still unavailable. The notice remains queued.')
    return redirect('review-queue')


@login_required
def submission_media(request, pk, revision, slot):
    from .visibility import hidden_member_ids
    item = get_object_or_404(Submission.objects.exclude(owner_id__in=hidden_member_ids()), pk=pk)
    if slot not in ('featured', 'image_2', 'image_3', 'image_4', 'image_5'):
        raise Http404
    if revision == 'pending':
        if hasattr(item, 'collaboration'):
            return redirect('collaboration-media', pk=item.collaboration.pk, slot='featured_image' if slot == 'featured' else slot)
        if item.status == Submission.DRAFT and item.owner_id != request.user.pk:
            raise PermissionDenied
        if item.owner_id != request.user.pk and not (is_admin(request.user) and request.user.is_verified()):
            raise PermissionDenied
        path = getattr(item, 'featured_image' if slot == 'featured' else slot).name
    else:
        if not revision.isdigit():
            raise Http404
        snapshot = get_object_or_404(SubmissionSnapshot, submission=item, revision=int(revision))
        if slot == 'featured':
            path = snapshot.featured_image
        else:
            index = int(slot.split('_')[1]) - 2
            path = snapshot.images[index] if index < len(snapshot.images) else ''
    if not path or not default_storage.exists(path):
        raise Http404
    return FileResponse(default_storage.open(path, 'rb'), content_type='image/jpeg')


@login_required
def profile_reviews(request):
    if not is_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    from django.db.models import Q
    from django.core.paginator import Paginator
    changes = ProfileChange.objects.select_related('profile__user', 'requested_by__profile')
    recent = list(changes.filter(status='pending')[:5])
    status = request.GET.get('status', 'pending')
    if status not in ('pending', 'approved', 'declined'):
        status = 'pending'
    query = request.GET.get('q', '').strip()[:200]
    changes = changes.filter(status=status)
    if query:
        changes = changes.filter(Q(display_name__icontains=query) | Q(profile__user__username__icontains=query))
    return render(request, 'accounts/profile-reviews.html', {'changes': Paginator(changes, 18).get_page(request.GET.get('page')), 'recent_changes': recent, 'review_query': query, 'review_status': status})


@login_required
def profile_review(request, pk):
    if not is_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    change = get_object_or_404(ProfileChange.objects.select_related('profile__user'), pk=pk)
    form = SubmissionReviewForm(request.POST or None)
    form.fields['note'].max_length = 500
    form.fields['decision'].choices = [('approve', 'Approve profile'), ('decline', 'Request changes')]
    if request.method == 'POST' and form.is_valid():
        from django.utils import timezone
        with transaction.atomic():
            Profile.objects.select_for_update().get(pk=change.profile_id)
            change = ProfileChange.objects.select_for_update().get(pk=pk)
            if change.requested_by_id == request.user.pk or change.profile.user_id == request.user.pk:
                form.add_error(None, 'Another admin must review these changes.')
            elif change.status != 'pending':
                form.add_error(None, 'This profile has already been reviewed.')
            else:
                change.status = 'approved' if form.cleaned_data['decision'] == 'approve' else 'declined'
                change.review_note = form.cleaned_data['note'][:500]
                change.reviewed_by, change.reviewed_at = request.user, timezone.now()
                if change.status == 'approved':
                    profile = Profile.objects.select_for_update().get(pk=change.profile_id)
                    from .profile_presentation import EDITABLE_FIELDS
                    for field in EDITABLE_FIELDS:
                        setattr(profile, field, getattr(change, field))
                    for slot in ('avatar', 'banner'):
                        if getattr(change, 'remove_' + slot):
                            setattr(profile, slot, '')
                        elif getattr(change, slot):
                            setattr(profile, slot, getattr(change, slot).name)
                    if change.remove_folio_image:
                        profile.folio_image = ''
                    elif change.folio_image:
                        profile.folio_image = change.folio_image.name
                    profile.save()
                    profile.contributor_names.update(bio=profile.bio)
                    from alpha.models import LandingContent
                    LandingContent.objects.filter(submission__owner=profile.user).update(author=profile.display_name)
                change.save(update_fields=['status', 'review_note', 'reviewed_by', 'reviewed_at'])
                audit(request.user, 'profile.' + change.status, change)
                messages.success(request, 'Profile decision recorded.')
                return redirect('profile-reviews')
    from .member_views import profile_context, published_posts
    from .profile_presentation import present_profile
    approved = request.GET.get('appearance') == 'approved'
    context = present_profile(profile_context(request, change.profile, published_posts(change.profile)), change.profile, None if approved else change)
    context.update(change=change, form=form, can_edit=False, own_profile=False, approved_appearance=approved)
    return render(request, 'accounts/profile-review.html', context)


@login_required
def profile_change_media(request, pk, slot):
    change = get_object_or_404(ProfileChange, pk=pk)
    if slot not in ('avatar', 'banner', 'folio_image'):
        raise Http404
    if change.profile.user_id != request.user.pk and not (is_admin(request.user) and request.user.is_verified()):
        raise PermissionDenied
    image = getattr(change, slot)
    if not image:
        raise Http404
    return FileResponse(image.open('rb'), content_type='image/jpeg')
