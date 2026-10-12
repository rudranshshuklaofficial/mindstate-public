from django.utils.crypto import salted_hmac
from datetime import timedelta
from contextvars import ContextVar

request_has_audit = ContextVar('request_has_audit', default=False)

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone

from .models import AuditLog, GuardianConsent, Invite, MembershipApplication, RateLimitBucket


def audit(actor, action, target, details=None):
    entry = AuditLog.objects.create(actor=actor, action=action, target_type=target._meta.label_lower, target_id=str(target.pk), details=details or {})
    request_has_audit.set(True)
    return entry


@transaction.atomic
def allow_attempt(request, scope, maximum, seconds=900):
    # Hash the remote address, never store it or trust forwarded headers.
    key = salted_hmac("accounts.rate-limit", f'{scope}:{request.META.get("REMOTE_ADDR", "unknown")}', algorithm="sha256").hexdigest()
    bucket, _ = RateLimitBucket.objects.select_for_update().get_or_create(key=key)
    now = timezone.now()
    if bucket.starts_at <= now - timedelta(seconds=seconds):
        bucket.starts_at, bucket.count = now, 0
    if bucket.count >= maximum:
        return False
    bucket.count += 1
    bucket.save()
    return True


@transaction.atomic
def decide_application(actor, application_id, data):
    from .policy import is_admin
    if not is_admin(actor):
        raise ValidationError('Administrative access required.')
    member_id = MembershipApplication.objects.values_list('member_id', flat=True).get(pk=application_id)
    if member_id:
        get_user_model().objects.select_for_update().get(pk=member_id)
    item = MembershipApplication.objects.select_for_update().get(pk=application_id)
    if data.get('consent_revision') is not None and str(item.consent_revision) != str(data['consent_revision']):
        raise ValidationError('This consent document changed. Reload before reviewing.')
    if item.status != MembershipApplication.PENDING:
        raise ValidationError('This application has already been decided.')
    if data['decision'] == 'approve':
        if not item.member_id and get_user_model().objects.filter(email__iexact=item.email).exists():
            raise ValidationError('An account already uses this email. Manage the existing account instead.')
        if item.is_under_16:
            if not item.consent_document:
                raise ValidationError('Review a signed guardian form before approval.')
            if not item.review_started_at:
                raise ValidationError('Start the review before recording a decision.')
            item.consent_method, item.consent_date, item.consent_recorded_by = 'Signed guardian document (revision %s)' % item.consent_revision, timezone.localdate(), actor
        item.status = MembershipApplication.APPROVED
        if item.member_id:
            GuardianConsent.objects.update_or_create(user_id=item.member_id, defaults={'is_under_16': item.is_under_16, 'status': 'given' if item.is_under_16 else 'not_needed', 'method': item.consent_method, 'consent_date': item.consent_date, 'recorded_by': actor, 'recorded_at': timezone.now()})
    else:
        item.status = MembershipApplication.DECLINED
    item.decided_by, item.decided_at, item.decision_note = actor, timezone.now(), data['note']
    item.save()
    audit(actor, 'application.' + item.status, item)
    if item.is_under_16 and item.status == MembershipApplication.APPROVED:
        audit(actor, 'consent.recorded', item)
    from .models import AccountNotice
    from .account_flows import deliver_account_notice
    notice = AccountNotice.objects.create(application=item, recipient=item.email, subject='Your MindState guardian consent update', body=('Your guardian permission has been approved. Sign in to access MindState.' if item.status == 'approved' else 'Your guardian permission needs changes. Sign in to see your private tracker and upload a replacement.'))
    transaction.on_commit(lambda: deliver_account_notice(notice.pk))
    return item


@transaction.atomic
def accept_invite(token, form):
    invitation = Invite.objects.select_for_update().select_related('application').get(token=token)
    application = invitation.application
    if not invitation.available or application.status != MembershipApplication.APPROVED:
        raise ValidationError('This invitation is no longer available. Contact the team for help.')
    if application.is_under_16 and not (application.consent_document and application.consent_method and application.consent_date):
        raise ValidationError('Parental consent must be recorded before account activation.')
    if get_user_model().objects.filter(email__iexact=application.email).exists():
        raise ValidationError('This invitation is no longer available. Contact the team for help.')
    user = form.save(commit=False)
    user.email = application.email
    user.save()
    user.groups.set(invitation.groups.all())
    user.profile.display_name = application.display_name
    user.profile.save()
    GuardianConsent.objects.create(user=user, is_under_16=application.is_under_16, status='given' if application.is_under_16 else 'not_needed', method=application.consent_method, consent_date=application.consent_date, recorded_by=application.consent_recorded_by, recorded_at=timezone.now() if application.is_under_16 else None)
    application.member = user
    application.save(update_fields=['member'])
    from .models import ReferralAttribution
    ReferralAttribution.objects.filter(application=application).update(member=user)
    invitation.used_at = timezone.now()
    invitation.save(update_fields=['used_at'])
    audit(user, 'invitation.accepted', invitation)
    return user
