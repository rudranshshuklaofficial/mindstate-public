from datetime import datetime,timedelta
from io import BytesIO
import re
from tempfile import TemporaryDirectory
from unittest.mock import patch
from PIL import Image
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core import mail,signing
from django.core.exceptions import PermissionDenied,ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.test import TestCase,override_settings
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from accounts.models import MemberRestriction,BanAppeal,SupportTicket,PrivateEvidence,CommunityNotice,NewsletterSubscription,NewsletterSchedule,NewsletterDelivery,VerifiedEmail,GuardianConsent,AccountDeletion,Contributor,PostCredit,PostRead
from accounts.community_services import restrict_member,decide_appeal,active_restrictions,eligible,enroll,deliver_notice
from accounts.newsletter import run_newsletters,writer_active,delivery_eligible,ZONE
from alpha.models import LandingContent

@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',EMAIL_DELIVERY_ENABLED=True,ALLOWED_HOSTS=['testserver'],PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class PlanBTests(TestCase):
    def setUp(self):
        self.storage=TemporaryDirectory();self.addCleanup(self.storage.cleanup)
        self.override=override_settings(MEDIA_ROOT=self.storage.name);self.override.enable();self.addCleanup(self.override.disable)
        User=get_user_model()
        self.admin=User.objects.create_user('b-admin','b-admin@example.com','Existing-721!');self.admin.groups.add(Group.objects.get(name='admin'));self.admin.is_verified=lambda:True
        self.mod=User.objects.create_user('b-mod','b-mod@example.com','Existing-721!');self.mod.groups.add(Group.objects.get(name='moderator'));self.mod.is_verified=lambda:True
        self.member=User.objects.create_user('b-member','b-member@example.com','Existing-721!');self.member.is_verified=lambda:False
        self.other=User.objects.create_user('b-other','b-other@example.com','Existing-721!')
        for person in (self.admin,self.member,self.other):VerifiedEmail.objects.create(user=person,email=person.email)
        self.client.force_login(self.member)
        self.now=datetime(2026,10,12,10,tzinfo=ZONE)
    def sign_team(self,member=None):
        member=member or self.admin;self.client.force_login(member)
        device=TOTPDevice.objects.create(user=member,confirmed=True)
        session=self.client.session;session[DEVICE_ID_SESSION_KEY]=device.persistent_id;session.save()
    def image(self):
        output=BytesIO();Image.new('RGB',(20,20),'green').save(output,'PNG')
        return SimpleUploadedFile('proof.png',output.getvalue(),content_type='image/png')
    def ban(self,hours=None):return restrict_member(self.admin,self.member.pk,'ban','Repeated rule violation','incident-1',hours)
    def post(self):
        person=Contributor.objects.create(name='B credited writer',profile=self.member.profile)
        post=LandingContent.objects.create(pk=1005,section='articles',title='B public page',is_published=True,published_at=self.now.date()-timedelta(days=5),view_count=7)
        PostCredit.objects.create(post=post,contributor=person)
        return post

    def test_ban_blocks_pages_search_api_and_hides_credited_posts(self):
        post=self.post();record=self.ban()
        for path in ('/','/search/?q=B','/collaborate/','/me/','/home/articles/'):
            self.assertRedirects(self.client.get(path),'/accounts/banned/',fetch_redirect_response=False)
        self.assertContains(self.client.get('/accounts/banned/'),'Repeated rule violation')
        self.client.force_login(self.other)
        self.assertEqual(self.client.get(f'/members/{self.member.profile.public_ref}/').status_code,404)
        self.assertEqual(self.client.get(f'/app/article/{post.pk}/').status_code,404)
        self.assertEqual(CommunityNotice.objects.filter(key=f'ban:{record.pk}').count(),1)

    def test_archive_preserves_access_expires_and_cannot_extend_incident(self):
        post=self.post()
        record=restrict_member(self.mod,self.member.pk,'archive','Investigating','incident-2',72)
        self.assertEqual(self.client.get('/').status_code,200)
        self.assertEqual(self.client.get(f'/app/article/{post.pk}/').status_code,404)
        record.expires_at=timezone.now()-timedelta(seconds=1);record.save()
        self.assertEqual(self.client.get(f'/app/article/{post.pk}/').status_code,200)
        with self.assertRaises(ValidationError):restrict_member(self.mod,self.member.pk,'archive','Again','incident-2',1)
        with self.assertRaises(ValidationError):restrict_member(self.mod,self.member.pk,'archive','Long','incident-3',73)

    def test_role_and_self_protection(self):
        with self.assertRaises(PermissionDenied):restrict_member(self.mod,self.member.pk,'ban','Reason','mod-ban')
        with self.assertRaises(ValidationError):restrict_member(self.admin,self.admin.pk,'ban','Reason','self')
        with self.assertRaises(ValidationError):restrict_member(self.mod,self.admin.pk,'archive','Reason','admin',2)
        self.sign_team(self.mod)
        self.assertEqual(self.client.get('/admin-mindstate/appeals/').status_code,403)
        self.assertEqual(self.client.get('/admin-mindstate/newsletters/').status_code,403)
        self.assertEqual(self.client.get('/admin-mindstate/moderation/').status_code,200)

    def test_one_appeal_with_private_evidence_and_stale_review(self):
        record=self.ban()
        self.assertEqual(self.client.post('/accounts/banned/',{'text':'Please reconsider','images':[self.image()]}).status_code,302)
        appeal=BanAppeal.objects.get(restriction=record);image=appeal.images.get()
        self.client.post('/accounts/banned/',{'text':'Another appeal'})
        self.assertEqual(BanAppeal.objects.filter(restriction=record).count(),1)
        self.client.force_login(self.other);self.assertEqual(self.client.get(f'/support/evidence/{image.pk}/').status_code,404)
        self.sign_team();response=self.client.get(f'/support/evidence/{image.pk}/');self.assertEqual(response.status_code,200);response.close()
        with self.captureOnCommitCallbacks(execute=True):decide_appeal(self.admin,appeal.pk,'approved','Access restored')
        self.assertFalse(active_restrictions().filter(member=self.member,kind='ban').exists())
        with self.assertRaises(ValidationError):decide_appeal(self.admin,appeal.pk,'rejected','Outdated')
        self.assertEqual(len(mail.outbox),1)

    def test_rejected_appeal_keeps_ban_and_escalation_address(self):
        record=self.ban();appeal=BanAppeal.objects.create(restriction=record,text='Please reconsider')
        decide_appeal(self.admin,appeal.pk,'rejected','Decision stands')
        self.assertTrue(active_restrictions().filter(pk=record.pk).exists())
        self.assertContains(self.client.get('/accounts/banned/'),'team@mindstate.space')

    def test_mail_failure_does_not_undo_ban_and_retry_is_idempotent(self):
        with patch('accounts.community_services.EmailMultiAlternatives.send',side_effect=OSError()),self.captureOnCommitCallbacks(execute=True):record=self.ban()
        notice=CommunityNotice.objects.get(key=f'ban:{record.pk}');self.assertIsNone(notice.sent_at);self.assertTrue(notice.error)
        self.assertTrue(active_restrictions().filter(pk=record.pk).exists())
        deliver_notice(notice.pk);deliver_notice(notice.pk)
        notice.refresh_from_db();self.assertIsNotNone(notice.sent_at);self.assertEqual(notice.attempts,2);self.assertEqual(len(mail.outbox),1)

    def test_guest_support_email_proof_expiry_replay_and_private_media(self):
        self.client.logout()
        response=self.client.post('/support/',{'email':'guest@example.com','subject':'Question','text':'Private question','images':[self.image()]})
        ticket=SupportTicket.objects.get(email='guest@example.com');verify=f'/support/{ticket.token}/verify/'
        self.assertEqual(response.status_code,302)
        self.assertRedirects(self.client.get(f'/support/{ticket.token}/'),verify,fetch_redirect_response=False)
        image=ticket.images.get();self.assertEqual(self.client.get(f'/support/evidence/{image.pk}/').status_code,404)
        self.client.post(verify,{'action':'send'})
        code=re.search(r'\b(\d{6})\b',mail.outbox[-1].body).group(1)
        ticket.refresh_from_db();self.assertNotEqual(ticket.code_digest,code)
        self.client.post(verify,{'action':'verify','code':code})
        self.assertContains(self.client.get(f'/support/{ticket.token}/'),'Private question')
        response=self.client.get(f'/support/evidence/{image.pk}/');self.assertEqual(response.status_code,200);response.close()
        outsider=self.client_class();self.assertEqual(outsider.post(verify,{'action':'verify','code':code}).status_code,200)
        self.assertEqual(outsider.get(f'/support/{ticket.token}/').status_code,302)
        self.assertEqual(self.client.get(f'/support/{ticket.token}/')['Cache-Control'],'private, no-store')

    def test_support_codes_expire_and_resend_is_limited(self):
        self.client.logout();ticket=SupportTicket.objects.create(email='guest@example.com',subject='Question',text='Private')
        route=f'/support/{ticket.token}/verify/'
        self.client.post(route,{'action':'send'});code=re.search(r'\b(\d{6})\b',mail.outbox[-1].body).group(1)
        self.assertContains(self.client.post(route,{'action':'send'}),'Wait a minute')
        ticket.refresh_from_db();ticket.code_expires_at=timezone.now()-timedelta(seconds=1);ticket.save()
        self.assertContains(self.client.post(route,{'action':'verify','code':code}),'Invalid or expired')
        self.assertNotIn(str(ticket.token),self.client.session.get('support_verified',[]))

    def test_support_images_validate_count_format_and_owner(self):
        response=self.client.post('/support/',{'email':'ignored@example.com','subject':'Question','text':'Private','images':[self.image() for _ in range(6)]})
        self.assertContains(response,'Choose up to five');self.assertFalse(SupportTicket.objects.exists())
        response=self.client.post('/support/',{'subject':'Question','text':'Private','images':[SimpleUploadedFile('bad.png',b'not an image')]})
        self.assertContains(response,'valid PNG');self.assertFalse(SupportTicket.objects.exists())
        self.client.post('/support/',{'subject':'Question','text':'Private'})
        ticket=SupportTicket.objects.get();self.assertEqual(ticket.email,self.member.email)
        self.client.force_login(self.other);self.assertEqual(self.client.get(f'/support/{ticket.token}/').status_code,302)

    def test_support_available_under_consent_and_ban_mod_replies(self):
        GuardianConsent.objects.create(user=self.member,is_under_16=True,status='pending');self.ban()
        self.assertEqual(self.client.get('/support/').status_code,200)
        self.client.post('/support/',{'subject':'Account help','text':'Help please'})
        ticket=SupportTicket.objects.get()
        self.sign_team(self.mod)
        with self.captureOnCommitCallbacks(execute=True):self.client.post(f'/support/{ticket.token}/',{'text':'Here is a solution'})
        self.assertTrue(ticket.replies.get().from_team);self.assertEqual(len(mail.outbox),1)
        self.client.post(f'/support/{ticket.token}/',{'action':'assign'});self.client.post(f'/support/{ticket.token}/',{'action':'resolve'})
        ticket.refresh_from_db();self.assertEqual(ticket.assigned_to,self.mod);self.assertEqual(ticket.status,'resolved')

    def test_newsletter_enrollment_never_resubscribes_optouts(self):
        sub=enroll(self.member);self.assertIsNotNone(sub)
        sub.opted_out_at=timezone.now();sub.weekly=False;sub.monthly=False;sub.save()
        enroll(self.member);sub.refresh_from_db();self.assertIsNotNone(sub.opted_out_at)
        self.assertNotContains(self.client.get('/'),'Subscribe so you')
        self.assertEqual(self.client.post('/accounts/newsletters/',{'weekly':'on'}).status_code,302)
        sub.refresh_from_db();self.assertTrue(sub.weekly);self.assertFalse(sub.monthly);self.assertIsNone(sub.opted_out_at)

    def test_newsletter_confirmation_and_unsubscribe_need_post(self):
        token=signing.dumps('guest@example.com',salt='newsletter-confirm')
        route='/newsletter/confirm/'+token+'/'
        self.client.logout();self.client.get(route);self.assertFalse(NewsletterSubscription.objects.filter(email='guest@example.com').exists())
        self.client.post(route);sub=NewsletterSubscription.objects.get(email='guest@example.com')
        route=f'/newsletter/unsubscribe/{sub.token}/'
        self.client.get(route);sub.refresh_from_db();self.assertIsNone(sub.opted_out_at)
        self.client.post(route);sub.refresh_from_db();self.assertIsNotNone(sub.opted_out_at)
        self.assertEqual(self.client.get('/newsletter/confirm/invalid/').status_code,404)

    def test_newsletter_idempotence_metrics_writer_inactivity_and_privacy(self):
        post=self.post();PostRead.objects.create(post=post,reader=self.other,day=self.now.date()-timedelta(days=1))
        sub=enroll(self.member)
        for kind in ('weekly','writer_weekly'):NewsletterSchedule.objects.create(kind=kind,enabled=True)
        with patch('accounts.newsletter.timezone.now',return_value=self.now):
            self.assertEqual(run_newsletters(self.now,deliver=True),2)
            self.assertEqual(run_newsletters(self.now,deliver=True),0)
        self.assertEqual(len(mail.outbox),2,list(CommunityNotice.objects.values_list('error',flat=True)))
        writer=NewsletterDelivery.objects.get(kind='writer_weekly');self.assertIn('1 recorded reads',writer.notice.body)
        self.assertNotIn('Unsubscribe:',writer.notice.body)
        self.client.logout();self.assertEqual(self.client.get(f'/newsletter/edition/{writer.web_token}/').status_code,404)
        self.client.force_login(self.other);self.assertEqual(self.client.get(f'/newsletter/edition/{writer.web_token}/').status_code,404)
        post.published_at=self.now.date()-timedelta(weeks=6);post.save()
        self.assertFalse(writer_active(self.member,self.now))
        post.published_at=self.now.date();post.save();self.assertTrue(writer_active(self.member,self.now))

    def test_newsletter_suppresses_unverified_consent_banned_and_deleted(self):
        sub=enroll(self.member)
        notice=CommunityNotice.objects.create(recipient=sub.email,subject='Test',body='Test',key='newsletter:test')
        delivery=NewsletterDelivery.objects.create(key='test',kind='weekly',period='2026-10-12',subscription=sub,member=self.member,notice=notice)
        self.assertTrue(delivery_eligible(delivery))
        consent=GuardianConsent.objects.create(user=self.member,is_under_16=True,status='pending')
        self.assertFalse(delivery_eligible(delivery));consent.status='given';consent.save();self.assertTrue(delivery_eligible(delivery))
        record=self.ban();self.assertFalse(delivery_eligible(delivery));record.lifted_at=timezone.now();record.save()
        AccountDeletion.objects.create(user=self.member,purge_at=timezone.now()+timedelta(days=14));self.assertFalse(delivery_eligible(delivery))

    def test_disabled_schedules_and_dry_run_send_no_mail(self):
        self.post();enroll(self.member)
        self.assertEqual(run_newsletters(self.now,deliver=True),0)
        NewsletterSchedule.objects.filter(kind='weekly').update(enabled=True)
        run_newsletters(self.now,deliver=False)
        self.assertFalse(hasattr(mail,'outbox') and mail.outbox)

    def test_schedules_admin_only_and_validate_hours(self):
        self.assertEqual(self.client.get('/admin-mindstate/newsletters/').status_code,403)
        self.sign_team()
        response=self.client.post('/admin-mindstate/newsletters/',{'kind':'weekly','hour':99,'weekday':0,'month_day':1})
        self.assertContains(response,'less than or equal to 23')
        self.assertEqual(self.client.get('/admin-mindstate/newsletters/weekly/preview/').status_code,200)


    def test_guest_newsletter_does_not_bypass_known_pending_consent(self):
        GuardianConsent.objects.create(user=self.member,is_under_16=True,status='pending')
        sub,_=NewsletterSubscription.objects.update_or_create(email=self.member.email,defaults={'member':None,'verified_at':timezone.now()})
        notice=CommunityNotice.objects.create(recipient=sub.email,subject='Test',body='Test',key='newsletter:guest')
        delivery=NewsletterDelivery.objects.create(key='guest',kind='weekly',period='2026-10-12',subscription=sub,notice=notice)
        self.assertFalse(delivery_eligible(delivery))

    def test_deleted_member_multiple_addresses_and_private_support_are_erased(self):
        from accounts.deletion_cleanup import anonymize_member
        for email in (self.member.email,'old-address@example.com'):
            NewsletterSubscription.objects.get_or_create(email=email,defaults={'member':self.member,'verified_at':timezone.now()})
        ticket=SupportTicket.objects.create(member=self.member,email=self.member.email,subject='Private subject',text='Private body',verified_at=timezone.now())
        paths=anonymize_member(self.member)
        self.assertEqual(NewsletterSubscription.objects.filter(email__endswith='@invalid.example').count(),2)
        ticket.refresh_from_db();self.assertEqual(ticket.text,'');self.assertIsNone(ticket.member_id)

    def test_archive_hides_collaboration_including_a_noncreator(self):
        from accounts.models import Collaboration,CollaborationMember,Submission
        draft=Submission.objects.create(owner=self.other,section='articles',title='Joint draft',body='Private',summary='')
        item=Collaboration.objects.create(created_by=self.other,submission=draft,need='art',brief='Private')
        CollaborationMember.objects.create(collaboration=item,user=self.other,role='writer')
        CollaborationMember.objects.create(collaboration=item,user=self.member,role='artist')
        restrict_member(self.mod,self.member.pk,'archive','Investigating','joint-incident',2)
        self.client.force_login(self.other)
        self.assertEqual(self.client.get(f'/collaborate/{item.pk}/').status_code,404)
        self.assertEqual(self.client.get(f'/collaborate/{item.pk}/preview/').status_code,404)

    def test_writer_report_continues_after_reader_optout(self):
        self.post();sub=enroll(self.member);sub.opted_out_at=timezone.now();sub.weekly=False;sub.monthly=False;sub.save()
        for kind in ('weekly','writer_weekly'):NewsletterSchedule.objects.create(kind=kind,enabled=True)
        with patch('accounts.newsletter.timezone.now',return_value=self.now):
            self.assertEqual(run_newsletters(self.now,deliver=True),1)
        self.assertEqual(NewsletterDelivery.objects.get().kind,'writer_weekly')

    def test_support_form_accepts_email_for_a_legacy_member_without_one(self):
        self.member.email='';self.member.save(update_fields=['email'])
        response=self.client.post('/support/',{'email':'corrected@example.com','subject':'Account help','text':'Please help'})
        self.assertEqual(response.status_code,302)
        ticket=SupportTicket.objects.get();self.assertEqual(ticket.email,'corrected@example.com');self.assertIsNone(ticket.verified_at)


    def test_banned_moderator_cannot_use_staff_support_access(self):
        record=restrict_member(self.admin,self.mod.pk,'ban','Review failed','mod-restriction')
        ticket=SupportTicket.objects.create(member=self.other,email=self.other.email,subject='Private question',text='Private',verified_at=timezone.now())
        self.sign_team(self.mod)
        self.assertRedirects(self.client.get(f'/support/{ticket.token}/'),f'/support/{ticket.token}/verify/',fetch_redirect_response=False)
        self.client.post(f'/support/{ticket.token}/',{'action':'assign'})
        ticket.refresh_from_db();self.assertIsNone(ticket.assigned_to_id)

    def test_notice_send_claim_blocks_overlapping_worker_and_expires(self):
        notice=CommunityNotice.objects.create(recipient='team@mindstate.space',subject='Test',body='Test',key='claim-test',sending_until=timezone.now()+timedelta(minutes=10))
        self.assertFalse(deliver_notice(notice.pk));self.assertFalse(hasattr(mail,'outbox') and mail.outbox)
        notice.sending_until=timezone.now()-timedelta(seconds=1);notice.save()
        self.assertTrue(deliver_notice(notice.pk));self.assertTrue(deliver_notice(notice.pk));self.assertEqual(len(mail.outbox),1)
