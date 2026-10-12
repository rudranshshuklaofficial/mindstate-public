from datetime import timedelta
import secrets
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.debug import sensitive_post_parameters
from .models import EmailVerification, VerifiedEmail
from .services import allow_attempt, audit


def send_signup_code(request, member):
    if not settings.EMAIL_DELIVERY_ENABLED:
        return 'Email delivery is unavailable. Your account is saved; retry when delivery is available.'
    if not allow_attempt(request, 'signup-mail:' + str(member.pk), 5, 3600):
        return 'Too many verification emails requested. Please wait before trying again.'
    with transaction.atomic():
        member = get_user_model().objects.select_for_update().get(pk=member.pk)
        old = EmailVerification.objects.filter(user=member).first()
        if old and old.purpose == 'signup' and old.sent_at and old.sent_at > timezone.now() - timedelta(seconds=60):
            return 'Please wait 60 seconds before requesting another code.'
        code = f'{secrets.randbelow(1000000):06d}'
        challenge, _ = EmailVerification.objects.update_or_create(user=member, defaults={'email': member.email.lower(), 'purpose':'signup', 'digest':make_password(code), 'expires_at':timezone.now()+timedelta(minutes=10), 'attempts':0, 'used_at':None, 'sent_at':None})
        try:
            send_mail('Verify your MindState email', f'Your verification code is {code}. It expires in 10 minutes and can be used once.\n\nSign in and enter it at {settings.MINDSTATE_SITE_URL}{reverse("signup-verify")}\n\nIf you did not create this account, ignore this email.', settings.DEFAULT_FROM_EMAIL, [challenge.email], fail_silently=False)
        except Exception:
            challenge.used_at = timezone.now()
            challenge.save(update_fields=['used_at'])
            return 'We could not send your verification email. Your account is saved. Please retry.'
        challenge.sent_at = timezone.now()
        challenge.save(update_fields=['sent_at'])
        audit(member, 'signup.verification_sent', member)
    return ''


def verification_destination(member):
    consent = getattr(member, 'guardianconsent', None)
    return 'consent-status' if consent and consent.is_under_16 and consent.status != 'given' else 'dashboard'


@login_required
@sensitive_post_parameters('code')
def signup_verify(request):
    member = request.user
    if VerifiedEmail.objects.filter(user=member, email__iexact=member.email).exists():
        return redirect(verification_destination(member))
    error = ''
    if request.method == 'POST':
        if request.POST.get('action') == 'resend':
            error = send_signup_code(request, member)
            if not error:
                messages.success(request, 'A new verification code was sent. Earlier codes no longer work.')
        elif allow_attempt(request, 'signup-code:' + str(member.pk), 20, 900):
            with transaction.atomic():
                member = get_user_model().objects.select_for_update().get(pk=member.pk)
                challenge = EmailVerification.objects.select_for_update().filter(user=member, purpose='signup').first()
                if not challenge or challenge.used_at or not challenge.sent_at or challenge.expires_at <= timezone.now() or challenge.attempts >= 5 or challenge.email.lower() != member.email.lower():
                    error = 'This code is unavailable or expired. Request a new code.'
                else:
                    challenge.attempts += 1
                    challenge.save(update_fields=['attempts'])
                    if not check_password(request.POST.get('code','').strip(), challenge.digest):
                        error = 'That code could not be verified.'
                    else:
                        try:
                            with transaction.atomic():
                                VerifiedEmail.objects.update_or_create(user=member, defaults={'email':challenge.email, 'verified_at':timezone.now()})
                                challenge.used_at = timezone.now()
                                challenge.save(update_fields=['used_at'])
                                audit(member, 'signup.email_verified', member)
                        except IntegrityError:
                            error = 'This email cannot be verified for this account. Contact support.'
                        else:
                            messages.success(request, 'Email verified. Your account is ready for the next step.')
                            return redirect(verification_destination(member))
        else:
            error = 'Please wait before trying another code.'
    challenge = EmailVerification.objects.filter(user=member, purpose='signup').first()
    return render(request, 'accounts/signup-verify.html', {'email':member.email, 'error':error, 'verification_sent':bool(challenge and challenge.sent_at and not challenge.used_at and challenge.expires_at > timezone.now() and challenge.attempts < 5)})
