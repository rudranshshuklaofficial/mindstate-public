from datetime import timedelta
import secrets
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError, transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.utils.crypto import constant_time_compare, salted_hmac
from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.http import require_POST
from django_otp.plugins.otp_totp.models import TOTPDevice

from .forms import Under16AccountForm, ConsentUploadForm
from .models import GuardianConsent, MembershipApplication, PasswordResetChallenge, RecoveryCode, VerifiedEmail, AccountNotice
from .services import allow_attempt, audit
from .policy import admin_required


def reset_identity(member):
    if member is None:
        return ''
    return salted_hmac('accounts.reset-identity', f'{member.pk}:{member.email.lower()}:{member.password}:{member.is_active}', algorithm='sha256').hexdigest()


def deliver_account_notice(pk):
    with transaction.atomic():
        notice = AccountNotice.objects.select_for_update().get(pk=pk)
        if notice.sent_at:
            return True
        notice.attempts += 1
        try:
            if not settings.EMAIL_DELIVERY_ENABLED:
                raise RuntimeError('Email delivery is not configured.')
            send_mail(notice.subject, notice.body, settings.DEFAULT_FROM_EMAIL, [notice.recipient], fail_silently=False)
        except Exception:
            notice.last_error = 'Delivery unavailable. Check mail configuration and retry.'
        else:
            notice.sent_at, notice.last_error = timezone.now(), ''
        notice.save()
        return bool(notice.sent_at)


@admin_required
@require_POST
def retry_account_notice(request, pk):
    notice = get_object_or_404(AccountNotice, pk=pk)
    if allow_attempt(request, 'account-notice', 10):
        deliver_account_notice(notice.pk)
    return redirect('team-application', pk=notice.application_id)


@sensitive_post_parameters('password1', 'password2')
def under16_signup(request):
    if request.user.is_authenticated:
        return redirect('consent-status')
    initial = request.session.pop('under16_signup_prefill', {})
    prefill_time = request.session.pop('under16_signup_prefill_time', 0)
    if timezone.now().timestamp() - prefill_time > 300:
        initial = {}
    form = Under16AccountForm(request.POST or None, initial=initial)
    if request.method == 'POST':
        if not allow_attempt(request, 'guardian-signup', 5, 3600):
            form.add_error(None, 'Please wait before creating another account.')
        elif form.is_valid():
            try:
                with transaction.atomic():
                    member = form.save()
                    GuardianConsent.objects.create(user=member, is_under_16=True, status='pending')
                    audit(member, 'account.created_pending_consent', member)
            except IntegrityError:
                form.add_error(None, 'These account details are unavailable. Please try different details.')
            else:
                login(request, member)
                from .signup_verification import send_signup_code
                delivery_error = send_signup_code(request, member)
                if delivery_error:
                    messages.error(request, delivery_error)
                return redirect('signup-verify')
    return render(request, 'auth.html', {'mode': 'guardian', 'form': form})


@login_required
def consent_status(request):
    consent = get_object_or_404(GuardianConsent, user=request.user, is_under_16=True)
    if consent.status == 'given':
        return redirect('dashboard')
    item = request.user.membership_applications.filter(is_under_16=True).first()
    form = ConsentUploadForm(request.POST or None, request.FILES or None)
    error = ''
    if request.method == 'POST' and form.is_valid() and allow_attempt(request, 'consent-upload', 10, 3600):
        with transaction.atomic():
            get_user_model().objects.select_for_update().get(pk=request.user.pk)
            consent = GuardianConsent.objects.select_for_update().get(pk=consent.pk)
            if consent.status == 'given':
                return redirect('dashboard')
            existing = MembershipApplication.objects.select_for_update().filter(email__iexact=request.user.email).first()
            if existing and existing.member_id != request.user.pk:
                # Email ownership must be verified before a legacy request can be claimed.
                if existing.member_id or not VerifiedEmail.objects.filter(user=request.user, email__iexact=request.user.email).exists():
                    error = 'Verify your email in account settings before linking an earlier consent request.'
                else:
                    existing.member = request.user
                    existing.save(update_fields=['member'])
            if not error:
                item = existing or MembershipApplication(email=request.user.email, member=request.user, display_name=request.user.profile.display_name, requested_username=request.user.username, is_under_16=True)
                if item.pk and item.status == 'approved':
                    consent.status, consent.method, consent.consent_date = 'given', item.consent_method, item.consent_date
                    consent.recorded_by, consent.recorded_at = item.consent_recorded_by, item.decided_at
                    consent.save()
                    return redirect('dashboard')
                if item.pk:
                    item.consent_revision += 1
                item.consent_document = form.cleaned_data['consent_document']
                item.status, item.review_started_at, item.decided_at = 'pending', None, None
                item.decision_note, item.decided_by = '', None
                item.save()
                consent.status = 'pending'
                consent.save(update_fields=['status'])
                audit(request.user, 'consent.uploaded', item)
                return redirect('consent-status')
    stage = 'Consent needed' if not item else ('Changes required' if item.status == 'declined' else 'Under review' if item.review_started_at else 'Submitted')
    return render(request, 'accounts/consent-status.html', {'application': item, 'stage': stage, 'consent_steps': ['Consent needed', 'Submitted', 'Under review', 'Approved'], 'form': form, 'error': error})


@sensitive_post_parameters('code', 'new_password1', 'new_password2', 'identifier')
def password_reset(request):
    token = request.session.get('password_reset_token')
    challenge = PasswordResetChallenge.objects.select_related('user').filter(token=token).first() if token else None
    step = 'password' if challenge and challenge.verified_at else 'verify' if challenge else 'identify'
    error = ''
    form = None
    if request.method == 'POST':
        action = request.POST.get('action')
        if not allow_attempt(request, 'password-reset', 20, 900):
            error = 'Please wait before trying again.'
        elif action == 'start':
            identifier = request.POST.get('identifier', '').strip()[:254]
            users = list(get_user_model().objects.filter(Q(username__iexact=identifier) | Q(email__iexact=identifier), is_active=True)[:2])
            member = users[0] if len(users) == 1 else None
            method = 'backup' if request.POST.get('method') == 'backup' else 'email'
            if method == 'email' and not settings.EMAIL_DELIVERY_ENABLED:
                error = 'Email delivery is currently unavailable. Use a backup code or try again later.'
            else:
                code = f'{secrets.randbelow(1000000):06d}'
                challenge = PasswordResetChallenge.objects.create(user=member, method=method, identity_digest=reset_identity(member), digest=make_password(code), expires_at=timezone.now() + timedelta(minutes=10))
                if token:
                    PasswordResetChallenge.objects.filter(token=token).update(used_at=timezone.now())
                request.session.cycle_key()
                request.session['password_reset_token'] = str(challenge.token)
                if method == 'email' and member and member.email:
                    try:
                        send_mail('Your MindState password reset code', f'Your code is {code}. It expires in 10 minutes and can be used once. If you did not request a reset, ignore this email.', settings.DEFAULT_FROM_EMAIL, [member.email], fail_silently=False)
                    except Exception:
                        challenge.used_at = timezone.now()
                        challenge.save(update_fields=['used_at'])
                step = 'verify'
        elif action == 'verify' and challenge:
            with transaction.atomic():
                if challenge.user_id:
                    get_user_model().objects.select_for_update().get(pk=challenge.user_id)
                challenge = PasswordResetChallenge.objects.select_for_update(of=('self',)).select_related('user').get(pk=challenge.pk)
                valid = False
                if not challenge.used_at and not challenge.verified_at and challenge.expires_at > timezone.now() and challenge.attempts < 5 and challenge.user_id and challenge.user.is_active and constant_time_compare(challenge.identity_digest, reset_identity(challenge.user)):
                    code = request.POST.get('code', '').strip()
                    if challenge.method == 'email':
                        valid = check_password(code, challenge.digest)
                    elif TOTPDevice.objects.filter(user_id=challenge.user_id, confirmed=True).exists():
                        for recovery in RecoveryCode.objects.select_for_update().filter(user_id=challenge.user_id, used_at__isnull=True):
                            if check_password(code, recovery.digest):
                                recovery.used_at = timezone.now()
                                recovery.save(update_fields=['used_at'])
                                valid = True
                                break
                    if valid:
                        challenge.verified_at = timezone.now()
                        if challenge.method == 'email':
                            if not VerifiedEmail.objects.filter(email__iexact=challenge.user.email).exclude(user=challenge.user).exists():
                                VerifiedEmail.objects.update_or_create(user=challenge.user, defaults={'email': challenge.user.email.lower(), 'verified_at': timezone.now()})
                challenge.attempts += 1
                challenge.save()
                if valid:
                    step = 'password'
                else:
                    error = 'This code could not be verified. Check it or start a new request.'
        elif action == 'password' and challenge:
            with transaction.atomic():
                if challenge.user_id:
                    get_user_model().objects.select_for_update().get(pk=challenge.user_id)
                challenge = PasswordResetChallenge.objects.select_for_update(of=('self',)).select_related('user').get(pk=challenge.pk)
                if challenge.used_at or not challenge.verified_at or challenge.expires_at <= timezone.now() or not challenge.user_id or not challenge.user.is_active or not constant_time_compare(challenge.identity_digest, reset_identity(challenge.user)):
                    error = 'This request has expired. Start a new password reset.'
                else:
                    form = SetPasswordForm(challenge.user, request.POST)
                    if form.is_valid():
                        form.save()
                        PasswordResetChallenge.objects.filter(user_id=challenge.user_id, used_at__isnull=True).exclude(pk=challenge.pk).update(used_at=timezone.now())
                        challenge.used_at = timezone.now()
                        challenge.save(update_fields=['used_at'])
                        audit(challenge.user, 'account.password_reset', challenge.user)
                        request.session.pop('password_reset_token', None)
                        step = 'complete'
        elif action == 'restart':
            if challenge:
                PasswordResetChallenge.objects.filter(pk=challenge.pk).update(used_at=timezone.now())
            request.session.pop('password_reset_token', None)
            return redirect('password-reset')
    if step == 'password' and form is None:
        form = SetPasswordForm(challenge.user)
    return render(request, 'accounts/password-reset.html', {'step': step, 'form': form, 'error': error, 'method': challenge.method if challenge else ''})
