from urllib.parse import urlencode

from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse

from .policy import is_admin, is_core_admin, needs_2fa


class PlatformAccessMiddleware:
    """Default-deny site access, with explicit account-entry exceptions."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        public = path in ('/accounts/login/', '/accounts/signup/', '/accounts/signup/under-16/', '/accounts/apply/', '/accounts/password-reset/', '/help/') or path.startswith(('/accounts/invite/', '/accounts/application/'))
        community_public = path.startswith(('/support/', '/newsletter/'))
        public = public or community_public
        auth_entry = path == '/accounts/banned/' or path in ('/accounts/2fa/', '/accounts/recovery-codes/', '/accounts/logout/')
        static = path.startswith(settings.STATIC_URL)
        if request.user.is_authenticated and not static:
            from .community_services import active_restrictions
            banned=active_restrictions().filter(member=request.user,kind='ban').exists()
            ban_allowed=('/accounts/banned/','/accounts/logout/','/accounts/login/','/accounts/password-reset/','/accounts/delete/','/accounts/deletion/','/accounts/signup/verify/','/accounts/verify-email/','/accounts/email-settings/','/accounts/2fa/','/help/')
            if banned and path not in ban_allowed and not path.startswith(('/support/','/newsletter/unsubscribe/')):
                return redirect('ban-status')
            from .models import GuardianConsent, AccountDeletion
            deleting = AccountDeletion.objects.filter(user=request.user,cancelled_at__isnull=True,completed_at__isnull=True).exists()
            if deleting and not path.startswith('/support/') and path not in ('/accounts/deletion/','/accounts/logout/','/accounts/login/','/accounts/password-reset/','/help/','/accounts/2fa/'):
                return redirect('account-deletion')
            from .models import VerifiedEmail
            email_pending = request.user.profile.email_verification_required and not VerifiedEmail.objects.filter(user=request.user, email__iexact=request.user.email).exists()
            email_allowed = ('/accounts/signup/verify/', '/accounts/logout/', '/accounts/password-reset/', '/accounts/security/', '/accounts/verify-email/', '/help/', '/accounts/delete/', '/accounts/deletion/', '/accounts/email-settings/')
            from django_otp.plugins.otp_totp.models import TOTPDevice
            existing_otp = path == '/accounts/2fa/' and TOTPDevice.objects.filter(user=request.user,confirmed=True).exists()
            if email_pending and path not in email_allowed and not existing_otp and not community_public and path!='/accounts/banned/':
                return redirect('signup-verify')
            gated = GuardianConsent.objects.filter(user=request.user, is_under_16=True).exclude(status='given').exists()
            allowed = ('/accounts/signup/verify/', '/accounts/consent/', '/accounts/login/', '/accounts/logout/', '/accounts/password-reset/', '/accounts/security/', '/accounts/verify-email/', '/help/', '/accounts/delete/', '/accounts/deletion/', '/accounts/email-settings/')
            if gated and path not in allowed and not existing_otp and not community_public and path!='/accounts/banned/':
                return redirect('consent-status')
        if not public and not static:
            if not request.user.is_authenticated:
                return redirect(reverse('login') + '?' + urlencode({'next': request.get_full_path()}))
            if not auth_entry and needs_2fa(request.user) and not request.user.is_verified():
                return redirect(reverse('two-factor') + '?' + urlencode({'next': request.get_full_path()}))
        from .services import request_has_audit
        token = request_has_audit.set(False)
        try:
            response = self.get_response(request)
            already_recorded = request_has_audit.get()
        finally:
            request_has_audit.reset(token)
        otp_verified = getattr(request.user, 'is_verified', None)
        if not static and (is_admin(request.user) or is_core_admin(request.user)) and callable(otp_verified) and otp_verified() and (request.method == 'GET' or not already_recorded):
            from .models import AuditLog
            match = getattr(request, 'resolver_match', None)
            AuditLog.objects.create(actor=request.user, action='admin.page_viewed' if request.method == 'GET' else 'admin.action', target_type='page', target_id=match.view_name[:80] if match else 'unknown', details={'method': request.method, 'status': response.status_code})
        if (request.user.is_authenticated and not static) or path.startswith(('/accounts/', '/admin-mindstate/', '/dashboard/', '/me/', '/support/', '/newsletter/')):
            response['Cache-Control'] = 'private, no-store'
            response['Referrer-Policy'] = 'no-referrer' if request.is_secure() else 'same-origin'
        return response
