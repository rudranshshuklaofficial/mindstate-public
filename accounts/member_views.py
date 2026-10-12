from django import forms
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import PermissionDenied
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.db.models import Sum
from django.http import FileResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.http import require_POST
from datetime import timedelta
import secrets

from alpha.models import LandingContent
from .profile_presentation import EDITABLE_FIELDS, present_profile
from .profile_copy import developer_copy, writing_excerpt
from .forms import ProfileChangeForm
from .models import Contributor, EmailVerification, MembershipApplication, Profile, ProfileChange, VerifiedEmail
from .policy import is_admin, is_core_admin
from .services import audit, allow_attempt


def published_posts(profile):
    return LandingContent.objects.filter(is_published=True, profile_credits__contributor__profile=profile, profile_credits__anonymous=False).distinct()




def folio_role_context(posts, profile=None, contributor=None):
    roles = [contributor.role] if contributor else list(profile.contributor_names.values_list('role', flat=True))
    import re
    words = re.findall(r'[a-z]+', ' '.join(roles).lower())
    developer = 'developer' in words or 'tech' in words
    if profile:
        developer = developer or profile.user.groups.filter(name='tech').exists()
    writer = any(role in words for role in ('writer', 'author', 'artist')) or posts.exists()
    return {'is_developer': developer, 'dual_profile': developer and writer,
            'show_published_work': not developer or writer}


def folio_work_context(posts):
    # Only explicitly credited, published work is supplied by the calling views.
    images = list(posts.filter(section__in=['articles', 'art']).exclude(image_url='')[:3])
    return {
        'folio_excerpt': writing_excerpt(posts),
        'folio_feature': images[0] if images else None,
        'folio_detail': images[1] if len(images) > 1 else None,
        'folio_closing': images[-1] if images else None,
    }


def profile_context(request, profile, posts):
    own = profile.user_id == request.user.pk
    return {**folio_work_context(posts), **folio_role_context(posts, profile=profile), 'developer_copy': developer_copy(profile.display_name), 'profile': profile, 'folio_name': profile.display_name, 'folio_bio': profile.bio, 'posts': posts, 'own_profile': own,
            'can_edit': own or (is_core_admin(request.user) and request.user.is_verified()),
            'profile_admin': is_admin(profile.user) or is_core_admin(profile.user), 'profile_core_admin': is_core_admin(profile.user), 'core_editor': is_core_admin(request.user) and request.user.is_verified(), 'unlinked_contributors': Contributor.objects.filter(profile__isnull=True), 'article_count': posts.filter(section='articles').count(),
            'art_count': posts.filter(section='art').count(), 'total_views': posts.aggregate(total=Sum('view_count'))['total'] or 0, 'share_url': request.build_absolute_uri(reverse('profile-view', args=[profile.public_ref]))}


@login_required
def dashboard_page(request):
    profile = request.user.profile
    posts = published_posts(profile)
    context = profile_context(request, profile, posts)
    context['application'] = request.user.membership_applications.first()
    context['recent_activity'] = []
    context['submissions'] = request.user.submissions.filter(collaboration__isnull=True).exclude(status='draft')
    context['drafts'] = request.user.submissions.filter(collaboration__isnull=True, status='draft')[:3]
    context['draft_count'] = request.user.submissions.filter(collaboration__isnull=True, status='draft').count()
    context['in_review_count'] = request.user.submissions.filter(collaboration__isnull=True, status='pending').count()
    context['profile_change'] = profile.changes.first()
    return render(request, 'accounts/dashboard.html', context)


@login_required
def my_profile(request):
    return redirect('profile-view', ref=request.user.profile.public_ref)


@login_required
def profile_view(request, ref):
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.select_related('user').exclude(user_id__in=hidden_member_ids()), public_ref=ref)
    context = profile_context(request, profile, published_posts(profile))
    if context['own_profile']:
        latest = profile.changes.first()
        if latest and latest.status in ('pending', 'declined') and request.GET.get('appearance') != 'approved':
            present_profile(context, profile, latest)
            context['private_profile_change'] = latest
        context['submissions'] = request.user.submissions.filter(collaboration__isnull=True).exclude(status='draft')
        context['drafts'] = request.user.submissions.filter(collaboration__isnull=True, status='draft')[:3]
        context['draft_count'] = request.user.submissions.filter(collaboration__isnull=True, status='draft').count()
        context['in_review_count'] = request.user.submissions.filter(collaboration__isnull=True, status='pending').count()
        context['profile_change'] = profile.changes.first()
    return render(request, 'accounts/profile.html', context)


@login_required
def contributor_view(request, pk):
    person = get_object_or_404(Contributor.objects.select_related('profile'), pk=pk)
    if person.profile_id:
        return redirect('profile-view', ref=person.profile.public_ref)
    posts = LandingContent.objects.filter(profile_credits__contributor=person, profile_credits__anonymous=False, is_published=True).distinct()
    return render(request, 'accounts/contributor.html', {
        **folio_work_context(posts), **folio_role_context(posts, contributor=person), 'developer_copy': developer_copy(person.name), 'contributor': person, 'folio_name': person.name, 'folio_bio': person.bio,
        'posts': posts, 'article_count': posts.filter(section='articles').count(),
        'art_count': posts.filter(section='art').count(),
        'share_url': request.build_absolute_uri(),
    })


@login_required
def core_profiles(request):
    if not is_core_admin(request.user) or not request.user.is_verified():
        raise PermissionDenied
    members = get_user_model().objects.select_related('profile').order_by('profile__display_name', 'username')
    return render(request, 'accounts/core-profiles.html', {'members': members})


@login_required
def avatar(request, ref):
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.exclude(user_id__in=hidden_member_ids()), public_ref=ref)
    if not profile.avatar:
        from django.http import Http404
        raise Http404
    return FileResponse(profile.avatar.open('rb'), content_type='image/jpeg')


@login_required
def edit_profile(request, ref=None):
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.exclude(user_id__in=hidden_member_ids()), public_ref=ref) if ref else request.user.profile
    if profile.user_id != request.user.pk and not (is_core_admin(request.user) and request.user.is_verified()):
        raise PermissionDenied
    latest = profile.changes.first()
    proposed = latest if latest and latest.status in ('pending', 'declined') else None
    initial = {field: getattr(proposed or profile, field) for field in EDITABLE_FIELDS}
    if proposed:
        initial.update({('remove_' + slot): getattr(proposed, 'remove_' + slot) for slot in ('avatar', 'banner', 'folio_image')})
    form = ProfileChangeForm(request.POST or None, request.FILES or None, initial=initial)
    if request.method == 'POST' and allow_attempt(request, 'profile:' + str(request.user.pk), 20, 3600) and form.is_valid():
        with transaction.atomic():
            locked = Profile.objects.select_for_update().get(pk=profile.pk)
            latest = locked.changes.first()
            expected = str(latest.pk) if latest else '0'
            if request.POST.get('profile_revision') != expected:
                form.add_error(None, 'Your profile changed in another tab. Reload before saving.')
            else:
                change = form.save(commit=False)
                change.profile, change.requested_by = locked, request.user
                # Unchanged pending images/removal requests survive a second save.
                if latest and latest.status in ('pending', 'declined'):
                    for slot in ('avatar', 'banner', 'folio_image'):
                        if not getattr(change, slot) and not getattr(change, 'remove_' + slot):
                            setattr(change, slot, getattr(latest, slot))
                locked.changes.filter(status='pending').update(status='superseded')
                change.save()
                audit(request.user, 'profile.change_requested', change)
                messages.success(request, 'Saved and sent for review. Only you can see these changes until approval.')
                return redirect('profile-view', ref=profile.public_ref)
    preview = present_profile(profile_context(request, profile, published_posts(profile)), profile, proposed)
    preview.update(title='Shape your profile', description='Save your personal scrapbook details. Only you see changes until the team approves them.', form=form, button='Save and send for review', profile_revision=latest.pk if latest else 0)
    return render(request, 'accounts/profile-editor.html', preview)



def application_status(request, token):
    item = get_object_or_404(MembershipApplication, tracking_token=token)
    return render(request, 'accounts/application-status.html', {'application': item})


class UsernameForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(label='Current password', widget=forms.PasswordInput)

    def __init__(self, *args, user, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def clean_username(self):
        name = self.cleaned_data['username']
        get_user_model()._meta.get_field('username').run_validators(name)
        if get_user_model().objects.filter(username__iexact=name).exclude(pk=self.user.pk).exists():
            raise forms.ValidationError('Choose another username.')
        return name

    def clean_password(self):
        if not self.user.check_password(self.cleaned_data['password']):
            raise forms.ValidationError('Check your current password.')
        return self.cleaned_data['password']


class EmailForm(forms.Form):
    email = forms.EmailField(label='New email address')
    password = forms.CharField(label='Current password', widget=forms.PasswordInput)

    def __init__(self, *args, user, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def clean_password(self):
        if not self.user.check_password(self.cleaned_data['password']):
            raise forms.ValidationError('Check your current password.')
        return self.cleaned_data['password']


@login_required
@sensitive_post_parameters('password', 'old_password', 'new_password1', 'new_password2')
def security(request):
    from .account_controls import restricted_settings
    if restricted_settings(request.user):
        return redirect('restricted-settings')
    if not request.user.is_verified() or timezone.now().timestamp() - request.session.get('security_verified_at', 0) > 600:
        return redirect(reverse('two-factor') + '?next=' + reverse('account-security'))
    username_form = UsernameForm(user=request.user, initial={'username': request.user.username})
    password_form = PasswordChangeForm(request.user)
    email_form = EmailForm(user=request.user)
    if request.method == 'POST':
        if not allow_attempt(request, 'settings:' + str(request.user.pk), 10):
            messages.error(request, 'Please wait before trying another account change.')
            return redirect('account-security')
        action = request.POST.get('action')
        if action == 'username':
            username_form = UsernameForm(request.POST, user=request.user)
            if username_form.is_valid():
                try:
                    with transaction.atomic():
                        request.user.username = username_form.cleaned_data['username']
                        request.user.save(update_fields=['username'])
                        audit(request.user, 'account.username_changed', request.user)
                except IntegrityError:
                    username_form.add_error('username', 'Choose another username.')
                else:
                    messages.success(request, 'Username changed. Use it next time you sign in.')
                    return redirect('account-security')
        elif action == 'password':
            password_form = PasswordChangeForm(request.user, request.POST)
            if password_form.is_valid():
                user = password_form.save()
                update_session_auth_hash(request, user)
                audit(user, 'account.password_changed', user)
                messages.success(request, 'Password changed. Other sessions will need to sign in again.')
                return redirect('account-security')
        elif action == 'email':
            from .account_controls import email_settings
            return email_settings(request)
    verified_email = getattr(request.user, 'verifiedemail', None)
    return render(request, 'accounts/security.html', {'username_form': username_form, 'password_form': password_form, 'email_form': email_form, 'email_verified': bool(verified_email and verified_email.email == request.user.email.lower()), 'recovery_count': request.user.recoverycode_set.filter(used_at__isnull=True).count(), 'email_enabled': settings.EMAIL_DELIVERY_ENABLED})


@login_required
@sensitive_post_parameters('code')
def verify_email(request):
    from .account_controls import restricted_settings
    if not restricted_settings(request.user) and (not request.user.is_verified() or timezone.now().timestamp() - request.session.get('security_verified_at', 0) > 600):
        return redirect(reverse('two-factor') + '?next=' + reverse('verify-email'))
    challenge = get_object_or_404(EmailVerification, user=request.user, purpose='account')
    error = ''
    if request.method == 'POST':
        with transaction.atomic():
            get_user_model().objects.select_for_update().get(pk=request.user.pk)
            challenge = EmailVerification.objects.select_for_update().get(pk=challenge.pk)
            if not allow_attempt(request, 'email-code:' + str(request.user.pk), 10) or challenge.purpose != 'account' or not challenge.sent_at or challenge.used_at or challenge.expires_at <= timezone.now() or challenge.attempts >= 5:
                error = 'This code is unavailable. Request a new verification email in account security.'
            else:
                challenge.attempts += 1
                challenge.save(update_fields=['attempts'])
                if not check_password(request.POST.get('code', ''), challenge.digest):
                    error = 'That code could not be verified.'
                elif get_user_model().objects.filter(email__iexact=challenge.email).exclude(pk=request.user.pk).exists():
                    error = 'This address cannot be used. Contact the team for help.'
                else:
                    try:
                        with transaction.atomic():
                            VerifiedEmail.objects.update_or_create(user=request.user, defaults={'email': challenge.email, 'verified_at': timezone.now()})
                            request.user.email = challenge.email
                            request.user.save(update_fields=['email'])
                            # Explicitly linked requests only; never match legacy identity by email.
                            MembershipApplication.objects.filter(member=request.user,status='pending').update(email=challenge.email)
                            challenge.used_at = timezone.now()
                            challenge.save(update_fields=['used_at'])
                            audit(request.user, 'account.email_verified', request.user)
                    except IntegrityError:
                        error = 'This address cannot be used. Contact the team for help.'
                    else:
                        messages.success(request, 'Email verified and saved.')
                        return redirect('account-security')
    return render(request, 'accounts/verify-email.html', {'email': challenge.email, 'error': error})


@login_required
@require_POST
def link_contributor(request, ref):
    if not (is_core_admin(request.user) and request.user.is_verified()):
        raise PermissionDenied
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.exclude(user_id__in=hidden_member_ids()), public_ref=ref)
    with transaction.atomic():
        person = get_object_or_404(Contributor.objects.select_for_update(), pk=request.POST.get('contributor'))
        if person.profile_id and person.profile_id != profile.pk:
            messages.error(request, 'That contributor is already linked. Ask the team to review ownership.')
        else:
            person.profile = profile
            person.save(update_fields=['profile'])
            audit(request.user, 'profile.contributor_linked', person, {'profile_reference': profile.public_ref})
            messages.success(request, 'Published author credit linked to this member.')
    return redirect('profile-view', ref=ref)


@login_required
def banner(request, ref):
    from .visibility import hidden_member_ids
    profile = get_object_or_404(Profile.objects.exclude(user_id__in=hidden_member_ids()), public_ref=ref)
    if not profile.banner:
        from django.http import Http404
        raise Http404
    return FileResponse(profile.banner.open('rb'), content_type='image/jpeg')
