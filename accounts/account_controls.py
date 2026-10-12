"""Restricted settings and reversible account deletion."""
from datetime import timedelta
import secrets

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.core.exceptions import PermissionDenied
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.shortcuts import redirect, render
from django.utils import timezone
from django.views.decorators.debug import sensitive_post_parameters

from .models import AccountDeletion, EmailVerification, GuardianConsent, MembershipApplication, VerifiedEmail
from .services import allow_attempt, audit


def restricted_settings(user):
    return (user.profile.email_verification_required and not VerifiedEmail.objects.filter(user=user, email__iexact=user.email).exists()) or GuardianConsent.objects.filter(user=user,is_under_16=True).exclude(status='given').exists()


@login_required
@sensitive_post_parameters('password')
def email_settings(request):
    from .member_views import EmailForm
    if not restricted_settings(request.user) and (not request.user.is_verified() or timezone.now().timestamp()-request.session.get('security_verified_at',0)>600):
        return redirect('/accounts/2fa/?next=/accounts/email-settings/')
    form = EmailForm(request.POST or None, user=request.user)
    if request.method == 'POST' and form.is_valid():
        if not allow_attempt(request, 'email-change:'+str(request.user.pk), 5, 3600):
            form.add_error(None, 'Too many requests. Please try again later.')
        elif not settings.EMAIL_DELIVERY_ENABLED:
            form.add_error(None, 'Email delivery is unavailable. Please retry later.')
        else:
            address = form.cleaned_data['email'].strip().lower()
            error = ''
            with transaction.atomic():
                member = get_user_model().objects.select_for_update().get(pk=request.user.pk)
                old = EmailVerification.objects.filter(user=member).first()
                if not member.check_password(form.cleaned_data['password']):
                    error = 'Check your current password.'
                elif old and old.sent_at and old.sent_at > timezone.now()-timedelta(seconds=60):
                    error = 'Please wait 60 seconds before requesting another code.'
                elif get_user_model().objects.filter(email__iexact=address).exclude(pk=member.pk).exists() or VerifiedEmail.objects.filter(email__iexact=address).exclude(user=member).exists():
                    error = 'This email address cannot be used.'
                else:
                    code = f'{secrets.randbelow(1000000):06d}'
                    challenge, _ = EmailVerification.objects.update_or_create(user=member, defaults={'purpose':'account','email':address,'digest':make_password(code),'expires_at':timezone.now()+timedelta(minutes=10),'attempts':0,'used_at':None,'sent_at':None})
                    try:
                        send_mail('Verify your MindState email', f'Your verification code is {code}. It expires in 10 minutes and can be used once.\n\nIf you did not request this change, ignore this email.', settings.DEFAULT_FROM_EMAIL, [address], fail_silently=False)
                    except Exception:
                        challenge.used_at = timezone.now()
                        challenge.save(update_fields=['used_at'])
                        error = 'We could not send the code. Your current address has not changed. Please retry.'
                    else:
                        challenge.sent_at = timezone.now()
                        challenge.save(update_fields=['sent_at'])
                        audit(member,'account.email_verification_requested',member)
            if not error:
                return redirect('verify-email')
            form.add_error(None,error)
    return render(request,'accounts/restricted-settings.html',{'form':form,'email_verified':VerifiedEmail.objects.filter(user=request.user,email__iexact=request.user.email).exists()})


@login_required
@sensitive_post_parameters('password')
def delete_account(request):
    from .policy import is_admin
    if not VerifiedEmail.objects.filter(user=request.user,email__iexact=request.user.email).exists():
        return redirect('signup-verify')
    # Preserve enabled 2FA: deletion is sensitive even if the UI is restricted.
    from django_otp.plugins.otp_totp.models import TOTPDevice
    if TOTPDevice.objects.filter(user=request.user,confirmed=True).exists() and not request.user.is_verified():
        return redirect('/accounts/2fa/?next=/accounts/delete/')
    error = ''
    if request.method == 'POST':
        if not allow_attempt(request,'delete-account:'+str(request.user.pk),5):
            error = 'Please wait before trying again.'
        elif request.POST.get('confirmation') != 'DELETE' or not request.user.check_password(request.POST.get('password','')):
            error = 'Enter DELETE and your current password to confirm.'
        else:
            with transaction.atomic():
                # Same group locks as role management protect the last admin.
                from django.contrib.auth.models import Group
                list(Group.objects.select_for_update().filter(name__in=['admin','identity_admin']).order_by('pk'))
                member = get_user_model().objects.select_for_update().get(pk=request.user.pk)
                from django.db.models import Q
                other_admin = get_user_model().objects.filter(is_active=True).exclude(pk=member.pk).exclude(accountdeletion__cancelled_at__isnull=True,accountdeletion__requested_at__isnull=False).filter(Q(is_superuser=True)|Q(groups__name__in=['admin','identity_admin'])).exists()
                if not member.check_password(request.POST.get('password','')) or not VerifiedEmail.objects.filter(user=member,email__iexact=member.email).exists():
                    error = 'Verify your current email and password before deleting your account.'
                elif is_admin(member) and not other_admin:
                    error = 'Another active administrator is required before this account can be deleted.'
                else:
                    deletion, _ = AccountDeletion.objects.get_or_create(user=member, defaults={'purge_at':timezone.now()+timedelta(days=14)})
                    if deletion.cancelled_at:
                        deletion.requested_at=timezone.now();deletion.purge_at=timezone.now()+timedelta(days=14);deletion.cancelled_at=None
                        deletion.save()
                    audit(member,'account.deletion_requested',deletion)
                    return redirect('account-deletion')
    return render(request,'accounts/delete-account.html',{'error':error})


@login_required
@sensitive_post_parameters('password')
def deletion_status(request):
    deletion = AccountDeletion.objects.filter(user=request.user,cancelled_at__isnull=True,completed_at__isnull=True).first()
    if not deletion:
        return redirect('account-security')
    error = ''
    if request.method == 'POST':
        if not allow_attempt(request,'cancel-deletion:'+str(request.user.pk),5) or not request.user.check_password(request.POST.get('password','')):
            error = 'Check your password or try again later.'
        else:
            with transaction.atomic():
                member=get_user_model().objects.select_for_update().get(pk=request.user.pk)
                deletion=AccountDeletion.objects.select_for_update().get(pk=deletion.pk)
                if not member.check_password(request.POST.get('password','')):
                    error='Check your current password.'
                elif deletion.purge_at <= timezone.now() or deletion.completed_at:
                    error='The cancellation period has ended.'
                elif not deletion.cancelled_at:
                    deletion.cancelled_at=timezone.now();deletion.save(update_fields=['cancelled_at'])
                    audit(request.user,'account.deletion_cancelled',deletion)
                    messages.success(request,'Account deletion cancelled.')
                    return redirect('account-security')
    return render(request,'accounts/deletion-status.html',{'deletion':deletion,'error':error})
