from .policy import is_admin, is_core_admin, is_team


def account_access(request):
    from .models import GuardianConsent, VerifiedEmail, AccountDeletion
    deleting=request.user.is_authenticated and AccountDeletion.objects.filter(user=request.user,cancelled_at__isnull=True,completed_at__isnull=True).exists()
    pending = request.user.is_authenticated and GuardianConsent.objects.filter(user=request.user, is_under_16=True).exclude(status='given').exists()
    email_pending = request.user.is_authenticated and request.user.profile.email_verification_required and not VerifiedEmail.objects.filter(user=request.user, email__iexact=request.user.email).exists()
    from .models import NewsletterSubscription
    recognized=(request.user.is_authenticated and NewsletterSubscription.objects.filter(member=request.user,verified_at__isnull=False).exists()) or bool(request.session.get('newsletter_confirmed'))
    from .community_services import can_moderate, active_restrictions
    banned=request.user.is_authenticated and active_restrictions().filter(member=request.user,kind='ban').exists()
    return {'community_can_moderate':can_moderate(request.user), 'newsletter_recognized':recognized, 'email_pending':email_pending, 'deletion_pending':deleting,'account_restricted':pending or email_pending or deleting or banned, 'consent_pending': pending, 'account_is_team': is_team(request.user), 'account_is_admin': is_admin(request.user), 'account_is_core_admin': is_core_admin(request.user)}
