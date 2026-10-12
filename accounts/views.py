import base64
import secrets

from django.conf import settings
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.contrib import messages
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import Group
from django.contrib.auth.views import LoginView
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import IntegrityError, transaction
from django.db.models import Q
from django.http import FileResponse, Http404, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.http import require_POST
from django_otp import login as otp_login, verify_token
from django_otp.plugins.otp_totp.models import TOTPDevice

from .forms import ApplicationForm, DecisionForm, GuardianSignUpForm, InviteAcceptForm, OnboardingForm, OpenSignUpForm, RolesForm, TokenForm
from .models import AuditLog, GuardianConsent, Invite, MembershipApplication, ModeratorOnboarding, Profile, ProfileChange, RecoveryCode, Submission
from .policy import TEAM_ROLES, admin_required, has_role, is_admin, is_core_admin, is_team, moderator_ready
from .services import accept_invite, allow_attempt, audit, decide_application


def safe_next(request):
    destination = request.POST.get('next') or request.GET.get('next') or reverse('home')
    return destination if url_has_allowed_host_and_scheme(destination, {request.get_host()}, require_https=request.is_secure()) else reverse('home')


class MemberLoginView(LoginView):
    template_name = 'auth.html'
    next_page = 'home'

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        form.fields['username'].widget.attrs.pop('autofocus', None)
        return form

    def post(self, request, *args, **kwargs):
        if not allow_attempt(request, 'login', 10):
            form = AuthenticationForm(request, data={})
            form.is_valid()
            form.add_error(None, 'Sign-in is temporarily unavailable. Please try again later.')
            return self.render_to_response(self.get_context_data(form=form), status=429)
        return super().post(request, *args, **kwargs)


@sensitive_post_parameters('password1', 'password2')
def signup(request):
    from .experience import remember_referral, attribute_referral
    remember_referral(request)
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST' and str(request.POST.get('age_confirmation', '')).lower() not in ('on', 'true', '1'):
        request.session['under16_signup_prefill'] = {key: request.POST.get(key, '')[:254] for key in ('username', 'email', 'display_name')}
        request.session['under16_signup_prefill_time'] = timezone.now().timestamp()
        messages.info(request, 'Continue on the under-16 route. Please re-enter your password; it was not stored.')
        return redirect('guardian-signup')
    form = OpenSignUpForm(request.POST or None)
    if request.method == 'POST':
        if not allow_attempt(request, 'signup', 5, 3600):
            form.add_error(None, 'Please wait before creating another account.')
            return render(request, 'auth.html', {'mode': 'signup', 'form': form}, status=429)
        if form.is_valid():
            try:
                with transaction.atomic():
                    member = form.save()
                    GuardianConsent.objects.create(user=member, is_under_16=False, status='not_needed')
                    audit(member, 'account.created', member)
                    attribute_referral(request, member=member)
            except IntegrityError:
                form.add_error(None, 'That username or email is already in use.')
            else:
                login(request, member)
                from .signup_verification import send_signup_code
                delivery_error = send_signup_code(request, member)
                if delivery_error:
                    messages.error(request, delivery_error)
                return redirect('signup-verify')
    return render(request, 'auth.html', {'mode': 'signup', 'form': form})


def guardian_signup(request):
    from .account_flows import under16_signup
    return under16_signup(request)


@require_POST
def sign_out(request):
    logout(request)
    return redirect('login')


def apply(request):
    from .experience import remember_referral
    remember_referral(request)
    return redirect('signup')


@sensitive_post_parameters('password1', 'password2')
def invite_accept(request, token):
    invitation = get_object_or_404(Invite.objects.select_related('application'), token=token)
    if not invitation.available:
        return render(request, 'accounts/notice.html', {'title': 'Invitation unavailable', 'description': 'This link has expired, been revoked, or already been used. Contact the MindState team for another invitation.'}, status=410)
    form = InviteAcceptForm(request.POST or None, initial={'username': invitation.application.requested_username})
    if request.method == 'POST':
        if not allow_attempt(request, 'invite', 10):
            form.add_error(None, 'Please try again later.')
        elif form.is_valid():
            try:
                accept_invite(token, form)
            except ValidationError as exc:
                form.add_error(None, exc)
            else:
                messages.success(request, 'Your account is ready. Sign in to get started.')
                return redirect('login')
    return render(request, 'accounts/form.html', {'title': 'Welcome to MindState', 'description': 'Choose a non-identifying username and a strong password. Your invitation determines your membership; roles cannot be chosen here.', 'form': form, 'button': 'Create my account'})


def password_recovery(request):
    from .account_flows import password_reset
    return password_reset(request)


@login_required
def dashboard(request):
    from .member_views import dashboard_page
    return dashboard_page(request)


@login_required
def profile_edit(request):
    from .member_views import edit_profile
    return edit_profile(request)


@login_required
@sensitive_post_parameters('token')
def two_factor(request):
    from .account_controls import restricted_settings
    if restricted_settings(request.user) and not TOTPDevice.objects.filter(user=request.user,confirmed=True).exists():
        raise PermissionDenied
    destination = safe_next(request) if request.GET.get('next') or request.POST.get('next') else reverse('account-security')
    device = TOTPDevice.objects.filter(user=request.user, name='MindState').order_by('-confirmed', 'pk').first()
    if not device:
        device = TOTPDevice.objects.create(user=request.user, name='MindState', confirmed=False)
    setup = not device.confirmed
    form = TokenForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        if not allow_attempt(request, 'otp:' + str(request.user.pk), 10):
            form.add_error(None, 'Please wait before trying another code.')
        else:
            with transaction.atomic():
                device = TOTPDevice.objects.select_for_update().get(pk=device.pk)
                setup = not device.confirmed
                token = form.cleaned_data['token'].strip().replace(' ', '')
                verified = verify_token(request.user, device.persistent_id, token)
                if not verified and not setup:
                    for code in RecoveryCode.objects.select_for_update().filter(user=request.user, used_at__isnull=True):
                        if check_password(token, code.digest):
                            code.used_at = timezone.now()
                            code.save(update_fields=['used_at'])
                            verified = device
                            audit(request.user, 'two_factor.recovery_used', code)
                            break
                if verified:
                    if setup:
                        verified.confirmed = True
                        verified.save(update_fields=['confirmed'])
                    otp_login(request, verified)
                    request.session['security_verified_at'] = timezone.now().timestamp()
                    audit(request.user, 'two_factor.verified', device)
                    if setup:
                        codes = [secrets.token_hex(8) for _ in range(8)]
                        RecoveryCode.objects.bulk_create([RecoveryCode(user=request.user, digest=make_password(code)) for code in codes])
                        audit(request.user, 'two_factor.enrolled', device)
                        return render(request, 'accounts/recovery.html', {'codes': codes, 'next': destination})
                    return redirect(destination)
                audit(request.user, 'two_factor.verification_failed', device)
                form.add_error(None, 'That code could not be verified. Try a new code or a recovery code.')
    return render(request, 'accounts/two_factor.html', {'title': 'Secure your account' if setup else 'Verify your sign-in', 'form': form, 'setup': setup, 'setup_key': base64.b32encode(device.bin_key).decode().rstrip('=') if setup else '', 'next': destination})


@login_required
@require_POST
@sensitive_post_parameters('password')
def recovery_codes(request):
    from .account_controls import restricted_settings
    if restricted_settings(request.user) or not request.user.is_verified():
        raise PermissionDenied
    # Reauthenticate before replacing usable codes.
    if not allow_attempt(request, 'recovery:' + str(request.user.pk), 5) or not request.user.check_password(request.POST.get('password', '')):
        return HttpResponse('Unable to generate recovery codes.', status=403)
    with transaction.atomic():
        RecoveryCode.objects.filter(user=request.user).delete()
        codes = [secrets.token_hex(8) for _ in range(8)]
        RecoveryCode.objects.bulk_create([RecoveryCode(user=request.user, digest=make_password(code)) for code in codes])
        audit(request.user, 'two_factor.recovery_replaced', request.user)
    return render(request, 'accounts/recovery.html', {'codes': codes, 'next': reverse('account-security')})


@login_required
def team_home(request):
    if not is_team(request.user):
        raise PermissionDenied
    from .models import Collaboration, SupportTicket, BanAppeal
    from .collaboration_services import can_review
    joint_count = Collaboration.objects.filter(closed=False, status__in=['submitted', 'in_review', 'approved']).exclude(members__user=request.user).count() if can_review(request.user) else 0
    return render(request, 'accounts/team.html', {'support_count': SupportTicket.objects.filter(verified_at__isnull=False,status='open').count(), 'appeal_count': BanAppeal.objects.filter(status='pending').count() if is_admin(request.user) else 0, 'can_review_collaborations': can_review(request.user), 'collaboration_review_count': joint_count, 'post_review_count': Submission.objects.filter(status='pending', collaboration__isnull=True).exclude(owner=request.user).count() if is_admin(request.user) else 0, 'profile_review_count': ProfileChange.objects.filter(status='pending').exclude(profile__user=request.user).exclude(requested_by=request.user).count() if is_admin(request.user) else 0, 'pending_count': MembershipApplication.objects.filter(status='pending').count() if is_admin(request.user) else 0, 'member_count': get_user_model().objects.count() if is_admin(request.user) or is_core_admin(request.user) else 0, 'invite_count': Invite.objects.filter(used_at__isnull=True, revoked_at__isnull=True, expires_at__gt=timezone.now()).count() if is_admin(request.user) else 0, 'moderator': has_role(request.user, 'moderator'), 'moderator_ready': moderator_ready(request.user), 'approved_version': settings.APPROVED_GUIDELINES_VERSION})


@admin_required
def applications(request):
    return render(request, 'accounts/applications.html', {'applications': MembershipApplication.objects.all()})


@admin_required
def application_detail(request, pk):
    item = get_object_or_404(MembershipApplication, pk=pk)
    form = DecisionForm(request.POST or None)
    if request.method == 'POST' and request.POST.get('action') == 'start':
        started=MembershipApplication.objects.filter(pk=pk, status='pending', review_started_at__isnull=True).update(review_started_at=timezone.now())
        if started:
            audit(request.user,'consent.review_started',item)
        return redirect('team-application', pk=pk)
    if request.method == 'POST' and form.is_valid():
        if str(item.consent_revision) != request.POST.get('consent_revision'):
            form.add_error(None, 'This consent document changed. Reload before reviewing.')
            return render(request, 'accounts/application.html', {'application': item, 'form': form})
        if not item.review_started_at:
            form.add_error(None, 'Confirm Start review before recording your decision.')
            return render(request, 'accounts/application.html', {'application':item, 'form':form})
        try:
            decision_data = dict(form.cleaned_data, consent_revision=request.POST.get('consent_revision'))
            decide_application(request.user, pk, decision_data)
        except ValidationError as exc:
            form.add_error(None, exc)
        else:
            messages.success(request, 'Application decision recorded.')
            return redirect('team-applications')
    return render(request, 'accounts/application.html', {'application': item, 'form': form, 'tracking_url': request.build_absolute_uri(reverse('application-status', args=[item.tracking_token]))})


@admin_required
@xframe_options_sameorigin
def consent_document(request, pk):
    item = get_object_or_404(MembershipApplication, pk=pk, is_under_16=True)
    if not item.consent_document:
        raise Http404
    from .consent_preview import preview_document
    return preview_document(request, item)


@admin_required
def invites(request):
    from .models import ReferralLink
    from django.db.models import Count
    return render(request, 'accounts/invites.html', {'referrals': ReferralLink.objects.select_related('created_by__profile').annotate(join_count=Count('attributions')).order_by('-created_at'), 'invites': Invite.objects.select_related('application').order_by('-pk')})


@admin_required
@require_POST
def revoke_invite(request, pk):
    with transaction.atomic():
        invitation = get_object_or_404(Invite.objects.select_for_update(), pk=pk)
        if not invitation.used_at and not invitation.revoked_at:
            invitation.revoked_at = timezone.now()
            invitation.save(update_fields=['revoked_at'])
            audit(request.user, 'invitation.revoked', invitation)
    messages.success(request, 'Invitation revoked.')
    return redirect('team-applications')


@admin_required
def members(request):
    return render(request, 'accounts/members.html', {'members': get_user_model().objects.select_related('profile').prefetch_related('groups').order_by('pk')})


@admin_required
def member_roles(request, pk):
    member = get_object_or_404(get_user_model(), pk=pk)
    form = RolesForm(request.POST or None, initial={'roles': list(member.groups.filter(name__in=TEAM_ROLES).values_list('name', flat=True))})
    if request.method == 'POST' and form.is_valid():
        with transaction.atomic():
            # All role writes take the same group locks, including on Postgres.
            list(Group.objects.select_for_update().filter(name__in=TEAM_ROLES).order_by('pk'))
            member = get_user_model().objects.select_for_update().get(pk=pk)
            if not is_admin(request.user):
                raise PermissionDenied
            chosen = form.cleaned_data['roles']
            other_admins = get_user_model().objects.filter(is_active=True).exclude(pk=pk).filter(Q(is_superuser=True) | Q(groups__name__in=['admin', 'identity_admin'])).exists()
            identities = get_user_model().objects.filter(groups__name='identity_admin').exclude(pk=pk).count()
            if member == request.user and not any(x in chosen for x in ('admin', 'identity_admin')) and not member.is_superuser:
                form.add_error(None, 'Ask another admin to change your administrative access.')
            elif is_admin(member) and not member.is_superuser and not other_admins and not any(x in chosen for x in ('admin', 'identity_admin')):
                form.add_error(None, 'The last administrator cannot be removed.')
            elif 'identity_admin' in chosen and identities >= 2:
                form.add_error(None, 'At most two named identity admins are allowed.')
            else:
                previous_roles = list(member.groups.filter(name__in=TEAM_ROLES).values_list('name', flat=True))
                member.groups.remove(*Group.objects.filter(name__in=TEAM_ROLES))
                member.groups.add(*Group.objects.filter(name__in=chosen))
                if 'moderator' in chosen:
                    ModeratorOnboarding.objects.get_or_create(user=member)
                audit(request.user, 'roles.changed', member, {'before': sorted(previous_roles), 'after': sorted(chosen)})
                messages.success(request, 'Team roles updated. Django maintenance access is unchanged.')
                return redirect('team-members')
    return render(request, 'accounts/form.html', {'title': 'Team roles', 'description': 'Member reference: ' + str(member.pk) + '. Team roles never grant Django maintenance access.', 'form': form, 'button': 'Save roles'})


@login_required
@require_POST
def acknowledge_guidelines(request):
    if not has_role(request.user, 'moderator') or not request.user.is_verified() or not settings.APPROVED_GUIDELINES_VERSION or request.POST.get('acknowledged') != 'yes':
        raise PermissionDenied
    record, _ = ModeratorOnboarding.objects.get_or_create(user=request.user)
    record.guidelines_version_read = settings.APPROVED_GUIDELINES_VERSION
    record.read_at = timezone.now()
    record.save()
    audit(request.user, 'onboarding.guidelines_read', record)
    return redirect('team-home')


@admin_required
def onboarding(request, pk):
    member = get_object_or_404(get_user_model(), pk=pk, groups__name='moderator')
    record, _ = ModeratorOnboarding.objects.get_or_create(user=member)
    form = OnboardingForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        supervisor = form.cleaned_data['supervisor']
        if supervisor == member or request.user == member:
            form.add_error(None, 'A different experienced reviewer and admin must confirm onboarding.')
        elif not settings.APPROVED_GUIDELINES_VERSION or record.guidelines_version_read != settings.APPROVED_GUIDELINES_VERSION or not record.read_at:
            form.add_error(None, 'The approved guidelines must be configured and acknowledged first.')
        elif not TOTPDevice.objects.filter(user=member, confirmed=True).exists():
            form.add_error(None, 'Authenticator setup must be completed first.')
        else:
            record.first_review_with, record.approved_by, record.approved_at = supervisor, request.user, timezone.now()
            record.save()
            audit(request.user, 'onboarding.approved', record)
            messages.success(request, 'Moderator onboarding confirmed.')
            return redirect('team-members')
    return render(request, 'accounts/form.html', {'title': 'Moderator onboarding', 'description': 'Confirm a supervised first review completed outside the site. Moderator tools arrive in a later stage.', 'form': form, 'button': 'Confirm onboarding'})


@admin_required
def audit_log(request):
    from django.core.paginator import Paginator
    entries = AuditLog.objects.select_related('actor__profile').all()
    category = request.GET.get('category', '')
    prefixes = {'applications': ['application.', 'invitation.', 'consent.'], 'members': ['profile.', 'roles.', 'onboarding.'], 'security': ['account.', 'two_factor.'], 'navigation': ['admin.'], 'maintenance': ['maintenance.']}
    if category in prefixes:
        query = Q()
        for prefix in prefixes[category]:
            query |= Q(action__startswith=prefix)
        entries = entries.filter(query)
    search = request.GET.get('q', '').strip()[:80]
    if search:
        entries = entries.filter(Q(action__icontains=search) | Q(target_id__icontains=search))
    page = Paginator(entries, 25).get_page(request.GET.get('page'))
    return render(request, 'accounts/audit.html', {'entries': page, 'category': category, 'q': search})


def help_page(request):
    return render(request, 'accounts/help.html')
