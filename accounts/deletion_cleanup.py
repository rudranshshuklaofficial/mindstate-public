"""Keep referential tombstones where publication/audit records protect users."""
from django.contrib.sessions.models import Session
from django.utils import timezone
from .models import EmailVerification, VerifiedEmail, RecoveryCode, ProfileChange, MembershipApplication, PasswordResetChallenge

def erase_files(instance, paths):
    from django.db.models import FileField
    for field in instance._meta.fields:
        if isinstance(field,FileField):
            asset=getattr(instance,field.name)
            if asset:
                paths.add(asset.name)
                setattr(instance,field.name,'')

def anonymize_member(member):
    paths=set()
    profile=member.profile
    erase_files(profile,paths)
    for field in ('display_name','bio','photo_caption','detail_caption','closing_caption','handwritten_note','scrapbook_note','margin_note','sticker_text'):
        setattr(profile,field,'')
    profile.save()
    for change in ProfileChange.objects.filter(profile=profile):erase_files(change,paths)
    ProfileChange.objects.filter(profile=profile).delete()
    for application in MembershipApplication.objects.filter(member=member):
        erase_files(application,paths)
        application.email=f'deleted-{member.pk}-{application.pk}@invalid.example';application.display_name='Deleted member';application.introduction='';application.requested_username='';application.save()
    for person in profile.contributor_names.all():
        person.name=f'Deleted member {member.pk}/{person.pk}';person.bio='';person.save()
    for submission in member.submissions.all():
        erase_files(submission,paths)
        submission.title='Removed work';submission.body='';submission.summary='';submission.tags='';submission.image_credit='';submission.content_warning='';submission.review_note='';submission.save()
        for snapshot in submission.snapshots.all():
            if snapshot.featured_image:paths.add(snapshot.featured_image)
            for image in snapshot.images:
                path=image.get('path','') if isinstance(image,dict) else image
                if isinstance(path,str) and path:paths.add(path)
        submission.snapshots.all().delete()
        if hasattr(submission,'live_content'):
            live=submission.live_content;live.is_published=False;live.title='Removed work';live.description='';live.author='Deleted member';live.image_url='';live.tags='';live.save()
    from .models import Collaboration, CollaborationNote, ReviewNotice, AccountNotice
    ReviewNotice.objects.filter(recipient__iexact=member.email).update(recipient='',body='')
    AccountNotice.objects.filter(application__member=member).update(recipient='',body='')
    for collaboration in Collaboration.objects.filter(created_by=member):
        erase_files(collaboration,paths)
        collaboration.closed=True;collaboration.brief='';collaboration.illustration_meaning='';collaboration.review_note='';collaboration.source_credit='';collaboration.source_url='';collaboration.draft_reference='';collaboration.save()
    CollaborationNote.objects.filter(author=member).update(body='',author=None)
    from .models import NewsletterSubscription, NewsletterDelivery, CommunityNotice, SupportTicket, SupportReply, PrivateEvidence, BanAppeal
    from django.db.models import Q
    for subscription in NewsletterSubscription.objects.filter(Q(member=member)|Q(email__iexact=member.email)):
        subscription.email=f'deleted-{member.pk}-{subscription.pk}@invalid.example';subscription.weekly=False;subscription.monthly=False;subscription.opted_out_at=timezone.now();subscription.member=None;subscription.save()
    CommunityNotice.objects.filter(recipient__iexact=member.email).update(recipient='',body='',html='')
    for ticket in SupportTicket.objects.filter(member=member):
        for image in ticket.images.all():erase_files(image,paths);image.delete()
        ticket.replies.all().update(text='',actor=None)
        ticket.email=f'deleted-{member.pk}@invalid.example';ticket.subject='Removed request';ticket.text='';ticket.code_digest='';ticket.member=None;ticket.save()
    SupportReply.objects.filter(actor=member).update(text='',actor=None)
    for appeal in BanAppeal.objects.filter(restriction__member=member):
        for image in appeal.images.all():erase_files(image,paths);image.delete()
        appeal.text='Removed appeal';appeal.decision='';appeal.save()
    PasswordResetChallenge.objects.filter(user=member).delete()
    EmailVerification.objects.filter(user=member).delete();VerifiedEmail.objects.filter(user=member).delete();RecoveryCode.objects.filter(user=member).delete()
    from django_otp.plugins.otp_totp.models import TOTPDevice
    TOTPDevice.objects.filter(user=member).delete()
    member.email='';member.first_name='';member.last_name='';member.username=f'deleted-{member.pk}';member.is_active=False;member.set_unusable_password();member.save()
    member.groups.clear()
    for session in Session.objects.filter(expire_date__gt=timezone.now()).iterator():
        if str(session.get_decoded().get('_auth_user_id',''))==str(member.pk):session.delete()

    return sorted(paths)
