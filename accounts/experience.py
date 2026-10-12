"""Private drafts, team referrals and deduplicated reading counts."""
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import F, Count
from django.core.paginator import Paginator
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from django.views.decorators.http import require_POST
from .models import Submission, ReferralLink, ReferralAttribution, PostRead
from .policy import admin_required, is_admin
from .services import audit

def remember_referral(request):
    token = request.GET.get('ref', '')
    if not token or request.user.is_authenticated:
        return
    import uuid
    try:
        token = uuid.UUID(token)
    except (ValueError, TypeError):
        return
    link = ReferralLink.objects.filter(token=token, revoked_at__isnull=True).select_related('created_by').first()
    if link and is_admin(link.created_by):
        request.session.setdefault('team_referral', str(link.token))

def attribute_referral(request, *, member=None, application=None):
    token = request.session.pop('team_referral', None)
    link = ReferralLink.objects.filter(token=token, revoked_at__isnull=True).select_related('created_by').first() if token else None
    if link and is_admin(link.created_by):
        entry = ReferralAttribution.objects.create(link=link, member=member, application=application)
        audit(member, 'referral.joined', entry, {'referring_admin': link.created_by_id})

@admin_required
@require_POST
def create_referral(request):
    link = ReferralLink.objects.create(created_by=request.user)
    audit(request.user, 'referral.created', link)
    return redirect('team-invites')

@admin_required
@require_POST
def revoke_referral(request, pk):
    link = get_object_or_404(ReferralLink, pk=pk)
    if not link.revoked_at:
        link.revoked_at = timezone.now()
        link.save(update_fields=['revoked_at'])
        audit(request.user, 'referral.revoked', link)
    return redirect('team-invites')

@login_required
def drafts(request):
    items = request.user.submissions.filter(collaboration__isnull=True, status=Submission.DRAFT)
    query = request.GET.get('q', '').strip()[:200]
    kind = request.GET.get('section', '')
    counts = {row['section']: row['total'] for row in items.values('section').annotate(total=Count('pk'))}
    if query:
        items = items.filter(title__icontains=query)
    if kind in ('articles', 'art'):
        items = items.filter(section=kind)
    return render(request, 'accounts/drafts.html', {'draft_page': Paginator(items, 18).get_page(request.GET.get('page')), 'draft_query': query, 'draft_kind': kind, 'article_drafts': counts.get('articles', 0), 'art_drafts': counts.get('art', 0)})

@transaction.atomic
def record_read(request, post):
    if request.method != 'GET' or not request.user.is_authenticated:
        return
    if request.headers.get('Purpose', '').lower() == 'prefetch' or request.headers.get('Sec-Purpose', '').lower().startswith('prefetch'):
        return
    if post.submission_id and post.submission.owner_id == request.user.pk:
        return
    if post.profile_credits.filter(contributor__profile__user=request.user).exists():
        return
    _, created = PostRead.objects.get_or_create(post=post, reader=request.user, day=timezone.localdate())
    if created:
        type(post).objects.filter(pk=post.pk).update(view_count=F('view_count') + 1)

@login_required
@require_POST
def profile_theme(request):
    from .models import Profile
    from django.http import HttpResponseBadRequest
    theme = request.POST.get('theme')
    if theme not in dict(Profile.THEMES):
        return HttpResponseBadRequest('Choose an available theme.')
    Profile.objects.filter(user=request.user).update(theme=theme)
    return redirect('profile-view', ref=request.user.profile.public_ref)

@login_required
def folio_image(request, ref):
    from .models import Profile
    from django.http import FileResponse, Http404
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.exclude(user_id__in=hidden_member_ids()), public_ref=ref)
    if not profile.folio_image:
        raise Http404
    return FileResponse(profile.folio_image.open('rb'), content_type='image/jpeg')

@login_required
def member_card(request):
    from .policy import TEAM_ROLES
    roles = list(request.user.groups.filter(name__in=TEAM_ROLES).values_list('name', flat=True))
    roles = [role.replace('_', ' ').title() for role in roles]
    if request.user.is_superuser and 'Admin' not in roles:
        roles.insert(0, 'Admin')
    roles += list(request.user.profile.contributor_names.values_list('role', flat=True))
    roles = list(dict.fromkeys(roles))
    return render(request, 'accounts/member-card.html', {'profile': request.user.profile, 'card_role': ', '.join(roles) or 'Community member'})
