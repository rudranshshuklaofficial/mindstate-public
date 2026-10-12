from datetime import timedelta
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.db.models import Q
from django.utils import timezone
from .models import MemberRestriction, BanAppeal, CommunityNotice, NewsletterSubscription, VerifiedEmail, GuardianConsent, AccountDeletion
from .policy import is_admin, has_role
from .services import audit

def active_restrictions():
    return MemberRestriction.objects.filter(lifted_at__isnull=True).filter(Q(expires_at__isnull=True)|Q(expires_at__gt=timezone.now()))

def can_moderate(user):
    if not user.is_authenticated or not user.is_verified():return False
    if active_restrictions().filter(member=user,kind='ban').exists():return False
    if AccountDeletion.objects.filter(user=user,cancelled_at__isnull=True).exists():return False
    if GuardianConsent.objects.filter(user=user,is_under_16=True).exclude(status='given').exists():return False
    if user.profile.email_verification_required and not VerifiedEmail.objects.filter(user=user,email__iexact=user.email).exists():return False
    return is_admin(user) or has_role(user,'moderator')


def eligible(member):
    return bool(member and member.is_active and VerifiedEmail.objects.filter(user=member,email__iexact=member.email).exists() and not GuardianConsent.objects.filter(user=member,is_under_16=True).exclude(status='given').exists() and not AccountDeletion.objects.filter(user=member,cancelled_at__isnull=True).exists() and not active_restrictions().filter(member=member,kind='ban').exists())

def deliver_notice(pk):
    from django.db.models import F
    now=timezone.now()
    # A committed conditional write claims one sender, including on SQLite.
    claimed=CommunityNotice.objects.filter(pk=pk,sent_at__isnull=True).filter(Q(sending_until__isnull=True)|Q(sending_until__lte=now)).update(sending_until=now+timedelta(minutes=10),attempts=F('attempts')+1)
    if not claimed:return CommunityNotice.objects.filter(pk=pk,sent_at__isnull=False).exists()
    notice=CommunityNotice.objects.get(pk=pk)
    try:
        cells=None
        if notice.key.startswith('newsletter:'):
            from .newsletter import delivery_eligible,content_for,ZONE
            from .newsletter_artwork import mail_html,attach_parts,NewsletterEmail
            from datetime import datetime
            delivery=notice.newsletterdelivery
            if not delivery_eligible(delivery):raise ValueError('This edition is no longer eligible.')
            data=content_for(delivery.kind,delivery.member,datetime.fromisoformat(delivery.period).replace(tzinfo=ZONE),getattr(settings,'MINDSTATE_SITE_URL','http://localhost:3000'),delivery)
            notice.html,cells=mail_html(data)
        headers={'List-Unsubscribe':'<'+data['unsubscribe_url']+'>'} if cells and data.get('unsubscribe_url') else {}
        message_class=NewsletterEmail if cells else EmailMultiAlternatives
        message=message_class(notice.subject,notice.body,settings.DEFAULT_FROM_EMAIL,[notice.recipient],headers=headers)
        if notice.html:message.attach_alternative(notice.html,'text/html')
        if cells:attach_parts(message,cells)
        if message.send()!=1:raise OSError('Delivery not accepted')
        CommunityNotice.objects.filter(pk=pk).update(sent_at=timezone.now(),error='',sending_until=None)
        return True
    except Exception as error:
        CommunityNotice.objects.filter(pk=pk).update(error='Delivery failed ('+type(error).__name__+'). Retry from Administration.',sending_until=None)
        return False


def queue_notice(recipient,subject,body,key,html=''):
    notice,_=CommunityNotice.objects.get_or_create(key=key,defaults={'recipient':recipient,'subject':subject,'body':body,'html':html})
    return notice

@transaction.atomic
def restrict_member(actor,member_id,kind,reason,incident,hours=None):
    if not can_moderate(actor) or (kind=='ban' and not is_admin(actor)):raise PermissionDenied
    # Serialize role-sensitive actions with role management and account deletion.
    from django.contrib.auth.models import Group
    list(Group.objects.select_for_update().filter(name__in=['admin','identity_admin']).order_by('pk'))
    member=get_user_model().objects.select_for_update().get(pk=member_id)
    if member.pk==actor.pk or is_admin(member) or member.is_superuser or (not is_admin(actor) and (member.is_staff or has_role(member,'core_team_admin'))):
        raise ValidationError('You cannot restrict yourself or an administrator.')
    if kind not in ('archive','ban') or not reason.strip() or not incident.strip():raise ValidationError('Add a reason and an incident reference.')
    if len(reason)>1000 or len(incident)>120:raise ValidationError('The reason or incident reference is too long.')
    if hours is not None and (hours<1 or hours>(72 if kind=='archive' else 8760)):raise ValidationError('Choose a valid duration. Investigation archives last at most 72 hours.')
    if kind=='archive' and hours is None:raise ValidationError('Archives need a duration of at most 72 hours.')
    if active_restrictions().filter(member=member).exists():raise ValidationError('This member already has an active restriction. Lift or review it first.')
    if MemberRestriction.objects.filter(member=member,kind=kind,incident=incident).exists():raise ValidationError('This incident already has a restriction; its duration cannot be extended.')
    record=MemberRestriction.objects.create(member=member,actor=actor,kind=kind,reason=reason.strip(),incident=incident.strip(),expires_at=timezone.now()+timedelta(hours=hours) if hours else None)
    audit(actor,'member.'+kind,record)
    if kind=='ban' and member.email:
        end=record.expires_at.isoformat() if record.expires_at else 'Permanent'
        notice=queue_notice(member.email,'Your MindState account access changed',f'Your account is banned. {end}\nReason: {record.reason}\nSign in to submit one appeal or request account deletion. After an appeal, contact team@mindstate.space for further discussion.',f'ban:{record.pk}')
        transaction.on_commit(lambda:deliver_notice(notice.pk))
    return record

@transaction.atomic
def decide_appeal(actor,pk,decision,note):
    if not is_admin(actor) or not can_moderate(actor):raise PermissionDenied
    appeal=BanAppeal.objects.select_for_update().select_related('restriction__member').get(pk=pk)
    restriction=MemberRestriction.objects.select_for_update().get(pk=appeal.restriction_id)
    if appeal.status!='pending':raise ValidationError('This appeal has already been reviewed.')
    if decision not in ('approved','rejected') or not note.strip() or len(note)>2000:raise ValidationError('Choose a decision and provide a reply of up to 2,000 characters.')
    appeal.status=decision;appeal.decision=note.strip();appeal.reviewer=actor;appeal.reviewed_at=timezone.now();appeal.save()
    if decision=='approved':restriction.lifted_at=timezone.now();restriction.lifted_by=actor;restriction.save()
    audit(actor,'appeal.'+decision,appeal)
    notice=queue_notice(restriction.member.email,'Your MindState appeal '+decision,appeal.decision+'\nFor further discussion, contact team@mindstate.space.',f'appeal:{appeal.pk}')
    transaction.on_commit(lambda:deliver_notice(notice.pk))

@transaction.atomic
def enroll(member):
    if not eligible(member):return None
    email=member.email.strip().lower()
    record,created=NewsletterSubscription.objects.get_or_create(email=email,defaults={'member':member,'verified_at':timezone.now()})
    if record.member_id in (None,member.pk):
        record.member=member;record.verified_at=record.verified_at or timezone.now();record.save(update_fields=['member','verified_at'])
    return record
