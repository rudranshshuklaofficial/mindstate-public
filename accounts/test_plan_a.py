from datetime import timedelta
from io import BytesIO
import re
from tempfile import TemporaryDirectory
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image
from pypdf import PdfWriter

from alpha.models import LandingContent
from .models import AccountDeletion, Contributor, EmailVerification, GuardianConsent, MembershipApplication, PostCredit, Submission, VerifiedEmail


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',EMAIL_DELIVERY_ENABLED=True,ALLOWED_HOSTS=['testserver'],PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class PlanATests(TestCase):
    def setUp(self):
        self.storage=TemporaryDirectory();self.addCleanup(self.storage.cleanup)
        self.media=override_settings(MEDIA_ROOT=self.storage.name);self.media.enable();self.addCleanup(self.media.disable)
        self.owner=get_user_model().objects.create_user('plan-owner','owner@example.com','Existing-721!')
        self.viewer=get_user_model().objects.create_user('plan-viewer','viewer@example.com','Existing-721!')
        self.admin=get_user_model().objects.create_user('plan-admin','admin@example.com','Existing-721!')
        self.admin.groups.add(Group.objects.get(name='admin'))
        self.owner.profile.display_name='Plan owner';self.owner.profile.save()
        self.client.force_login(self.owner)

    def restricted(self):
        GuardianConsent.objects.create(user=self.owner,is_under_16=True,status='pending')

    def verified_email(self):
        VerifiedEmail.objects.create(user=self.owner,email=self.owner.email)

    def sign_admin(self):
        self.client.force_login(self.admin)
        device=TOTPDevice.objects.create(user=self.admin,confirmed=True)
        session=self.client.session;session[DEVICE_ID_SESSION_KEY]=device.persistent_id;session.save()

    def application(self,pdf=False):
        if pdf:
            output=BytesIO();writer=PdfWriter();writer.add_blank_page(width=300,height=400);writer.write(output);data=output.getvalue();filename='guardian.pdf'
        else:
            output=BytesIO();Image.new('RGB',(40,40),'green').save(output,'PNG');data=output.getvalue();filename='guardian.png'
        return MembershipApplication.objects.create(email=self.owner.email,member=self.owner,display_name='Private applicant',introduction='',is_under_16=True,consent_document=SimpleUploadedFile(filename,data))

    def test_initial_eight_then_four_batches_no_duplicates_or_extra_controls(self):
        LandingContent.objects.all().delete()
        for i in range(17):LandingContent.objects.create(title=f'Plan article {i}',section='articles',is_published=True)
        response=self.client.get('/')
        self.assertEqual(len(response.context['articles']),8)
        ids=[item.pk for item in response.context['articles']]
        cursor=response.context['articles_next']
        self.assertContains(response,'Load more articles')
        for expected in (4,4,1):
            batch=self.client.get(cursor).json()
            self.assertEqual(batch['html'].count('<article class="library-card'),expected)
            cursor=batch['next_url']
        self.assertEqual(cursor,'')
        self.assertFalse(batch['has_more'])
        fallback=self.client.get(response.context['articles_fallback'].split('#')[0])
        self.assertEqual(len(fallback.context['articles']),4)
        self.assertFalse(set(ids)&{x.pk for x in fallback.context['articles']})

    def test_invalid_cursor_and_anonymous_pagination(self):
        self.assertEqual(self.client.get('/home/articles/?cursor=tampered').status_code,400)
        self.client.logout();self.assertEqual(self.client.get('/home/articles/').status_code,302)

    def test_pending_consent_hides_and_blocks_authenticator_creation(self):
        self.restricted()
        self.assertRedirects(self.client.get('/accounts/security/'),'/accounts/email-settings/',fetch_redirect_response=False)
        self.assertNotContains(self.client.get('/accounts/email-settings/'),'Authenticator')
        for path in ('/accounts/2fa/','/accounts/recovery-codes/','/home/articles/'):
            self.assertEqual(self.client.get(path).status_code,302)
        self.assertFalse(TOTPDevice.objects.filter(user=self.owner).exists())

    def test_email_correction_requires_password_and_proof_keeps_consent_gate(self):
        self.restricted()
        self.assertContains(self.client.post('/accounts/email-settings/',{'email':'correct@example.com','password':'wrong'}),'Check your current password')
        self.assertEqual(len(mail.outbox),0)
        response=self.client.post('/accounts/email-settings/',{'email':'correct@example.com','password':'Existing-721!'})
        self.assertRedirects(response,'/accounts/verify-email/',fetch_redirect_response=False)
        self.owner.refresh_from_db();self.assertEqual(self.owner.email,'owner@example.com')
        code=re.search(r'code is (\d{6})',mail.outbox[-1].body).group(1)
        challenge=EmailVerification.objects.get(user=self.owner);self.assertNotIn(code,challenge.digest)
        self.assertEqual(self.client.post('/accounts/verify-email/',{'code':code}).status_code,302)
        self.owner.refresh_from_db();self.assertEqual(self.owner.email,'correct@example.com')
        self.assertRedirects(self.client.get('/'),'/accounts/consent/',fetch_redirect_response=False)
        challenge.refresh_from_db();self.assertIsNotNone(challenge.used_at)

    def test_change_email_failure_invalidates_code_and_allows_retry(self):
        self.restricted()
        with patch('accounts.account_controls.send_mail',side_effect=OSError):
            self.assertContains(self.client.post('/accounts/email-settings/',{'email':'correct@example.com','password':'Existing-721!'}),'could not send')
        challenge=EmailVerification.objects.get(user=self.owner)
        self.assertIsNone(challenge.sent_at);self.assertIsNotNone(challenge.used_at)
        self.assertEqual(self.client.post('/accounts/email-settings/',{'email':'correct@example.com','password':'Existing-721!'}).status_code,302)
        self.assertContains(self.client.post('/accounts/email-settings/',{'email':'correct@example.com','password':'Existing-721!'}),'wait 60 seconds')

    def test_old_code_after_email_change_and_expired_or_replayed_codes_rejected(self):
        self.restricted()
        self.client.post('/accounts/email-settings/',{'email':'first@example.com','password':'Existing-721!'})
        old_code=re.search(r'code is (\d{6})',mail.outbox[-1].body).group(1)
        EmailVerification.objects.filter(user=self.owner).update(sent_at=timezone.now()-timedelta(minutes=2))
        self.client.post('/accounts/email-settings/',{'email':'second@example.com','password':'Existing-721!'})
        self.assertContains(self.client.post('/accounts/verify-email/',{'code':old_code}),'could not be verified')
        code=re.search(r'code is (\d{6})',mail.outbox[-1].body).group(1)
        EmailVerification.objects.filter(user=self.owner).update(expires_at=timezone.now()-timedelta(seconds=1))
        self.assertContains(self.client.post('/accounts/verify-email/',{'code':code}),'unavailable')
        EmailVerification.objects.filter(user=self.owner).update(expires_at=timezone.now()+timedelta(minutes=1),used_at=timezone.now())
        self.assertContains(self.client.post('/accounts/verify-email/',{'code':code}),'unavailable')

    def test_review_start_required_idempotent_and_date_automatic(self):
        self.restricted();item=self.application();self.sign_admin()
        route=reverse('team-application',args=[item.pk])
        response=self.client.post(route,{'decision':'approve','note':'Checked','consent_revision':'1'})
        self.assertContains(response,'Confirm Start review')
        self.client.post(route,{'action':'start'})
        item.refresh_from_db();started=item.review_started_at
        self.client.post(route,{'action':'start'})
        item.refresh_from_db();self.assertEqual(started,item.review_started_at)
        self.assertNotContains(self.client.get(route),'Private applicant receipt')
        self.assertNotContains(self.client.get(route),'name="consent_date"')
        self.client.post(route,{'decision':'approve','note':'Checked','consent_revision':'1','consent_date':'2099-01-01'})
        item.refresh_from_db();self.assertEqual(item.status,'approved');self.assertEqual(item.consent_date,timezone.localdate())
        self.assertIn('revision 1',item.consent_method)

    def test_preview_never_serves_original_and_requires_revision_and_permission(self):
        item=self.application(pdf=True);self.sign_admin()
        route=reverse('consent-document',args=[item.pk])
        self.assertEqual(self.client.get(route+'?revision=1').status_code,404)
        self.client.post(reverse('team-application',args=[item.pk]),{'action':'start'})
        response=self.client.get(route+'?revision=1')
        self.assertContains(response,'page=0');self.assertNotIn('attachment',response.get('Content-Disposition',''))
        rendered=self.client.get(route+'?revision=1&page=0')
        self.assertEqual(rendered.status_code,200);self.assertEqual(rendered['Content-Type'],'image/png')
        self.assertTrue(rendered.content.startswith(b'\x89PNG'))
        for suffix in ('','?revision=0','?revision=1&page=-1','?revision=1&page=99'):
            self.assertEqual(self.client.get(route+suffix).status_code,404)
        self.client.force_login(self.viewer);self.assertEqual(self.client.get(route+'?revision=1').status_code,403)

    def test_deletion_requires_verified_email_password_and_explicit_confirmation(self):
        self.restricted()
        self.assertEqual(self.client.get('/accounts/delete/').status_code,302)
        self.verified_email()
        self.assertContains(self.client.post('/accounts/delete/',{'password':'wrong','confirmation':'DELETE'}),'current password')
        self.assertFalse(AccountDeletion.objects.exists())
        self.assertContains(self.client.post('/accounts/delete/',{'password':'Existing-721!','confirmation':'yes'}),'current password')

    def test_deletion_hides_profile_posts_and_can_be_cancelled_for_fourteen_days(self):
        self.restricted();self.verified_email()
        person=Contributor.objects.create(name='Plan owner credit',profile=self.owner.profile)
        story=LandingContent.objects.create(title='Private after deletion',section='articles',is_published=True)
        PostCredit.objects.create(post=story,contributor=person)
        self.client.post('/accounts/delete/',{'password':'Existing-721!','confirmation':'DELETE'})
        deletion=AccountDeletion.objects.get(user=self.owner)
        self.assertAlmostEqual((deletion.purge_at-timezone.now()).total_seconds(),14*86400,delta=10)
        self.assertRedirects(self.client.get('/'),'/accounts/deletion/',fetch_redirect_response=False)
        other=self.client_class();other.force_login(self.viewer)
        self.assertEqual(other.get(reverse('profile-view',args=[self.owner.profile.public_ref])).status_code,404)
        self.assertEqual(other.get(reverse('article',args=[story.pk])).status_code,404)
        self.assertFalse(other.get('/search/?q=Private after deletion').context['search_results'].exists())
        self.assertEqual(self.client.post('/accounts/deletion/',{'password':'Existing-721!'}).status_code,302)
        self.assertTrue(other.get('/search/?q=Private after deletion').context['search_results'].filter(pk=story.pk).exists())

    def test_elapsed_deletion_cannot_cancel_and_purge_is_idempotent(self):
        self.restricted();self.verified_email()
        Submission.objects.create(owner=self.owner,section='articles',title='Private draft',summary='Secret',body='Private text')
        Contributor.objects.create(name='Plan credit 1',profile=self.owner.profile)
        Contributor.objects.create(name='Plan credit 2',profile=self.owner.profile)
        deletion=AccountDeletion.objects.create(user=self.owner,purge_at=timezone.now()-timedelta(seconds=1))
        self.assertContains(self.client.post('/accounts/deletion/',{'password':'Existing-721!'}),'period has ended')
        call_command('purge_deleted_accounts')
        self.owner.refresh_from_db();self.assertFalse(self.owner.is_active);self.assertFalse(self.owner.has_usable_password());self.assertEqual(self.owner.email,'')
        self.assertEqual(self.owner.profile.display_name,'');self.assertEqual(self.owner.submissions.get().body,'')
        deletion.refresh_from_db();self.assertIsNotNone(deletion.completed_at)
        call_command('purge_deleted_accounts')

    def test_last_admin_cannot_delete_account(self):
        self.sign_admin();VerifiedEmail.objects.create(user=self.admin,email=self.admin.email)
        self.assertContains(self.client.post('/accounts/delete/',{'password':'Existing-721!','confirmation':'DELETE'}),'Another active administrator')
        self.assertFalse(AccountDeletion.objects.exists())


    def test_purge_storage_failure_is_durable_and_retried(self):
        self.owner.profile.avatar.save('private-avatar.png',SimpleUploadedFile('private-avatar.png',b'private image bytes'))
        name=self.owner.profile.avatar.name
        deletion=AccountDeletion.objects.create(user=self.owner,purge_at=timezone.now()-timedelta(seconds=1))
        with patch('django.core.files.storage.default_storage.delete',side_effect=OSError('Unavailable')):
            call_command('purge_deleted_accounts')
        deletion.refresh_from_db()
        self.assertIsNotNone(deletion.completed_at)
        self.assertIn(name,deletion.files_pending)
        self.assertIn('retry',deletion.cleanup_error)
        with patch('django.core.files.storage.default_storage.delete') as remove:
            call_command('purge_deleted_accounts')
            remove.assert_called_with(name)
        deletion.refresh_from_db();self.assertEqual(deletion.files_pending,[]);self.assertEqual(deletion.cleanup_error,'')

    def test_failed_database_anonymization_never_deletes_files(self):
        self.owner.profile.avatar.save('private-avatar.png',SimpleUploadedFile('private-avatar.png',b'private image bytes'))
        name=self.owner.profile.avatar.name
        AccountDeletion.objects.create(user=self.owner,purge_at=timezone.now()-timedelta(seconds=1))
        with patch('accounts.deletion_cleanup.erase_files',side_effect=RuntimeError('Rollback')),patch('django.core.files.storage.default_storage.delete') as remove:
            with self.assertRaises(RuntimeError):call_command('purge_deleted_accounts')
            remove.assert_not_called()
        self.owner.profile.refresh_from_db();self.assertEqual(self.owner.profile.avatar.name,name)
