from io import BytesIO
import tempfile
from unittest.mock import patch
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings, Client
from django.urls import reverse
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image
from .models import ProfileChange, Submission, ReviewNotice, MembershipApplication
from .submission_services import review_submission, send_review_notice
from alpha.models import LandingContent


@override_settings(ALLOWED_HOSTS=['testserver'], PRIVATE_MEDIA_READY=True, PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'], STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}}, EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend', EMAIL_DELIVERY_ENABLED=True)
class PublishingTests(TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=settings.BASE_DIR/'work', prefix='publishing-test-')
        self.addCleanup(self.temp.cleanup)
        storage = override_settings(MEDIA_ROOT=self.temp.name)
        storage.enable()
        self.addCleanup(storage.disable)
        self.member = get_user_model().objects.create_user('creator', 'creator@example.com', 'Existing-secret-391!')
        self.admin = get_user_model().objects.create_user('reviewer', 'admin@example.com', 'Existing-secret-391!')
        self.admin.groups.add(Group.objects.get(name='admin'))
        self.member.profile.display_name = 'Approved creator'
        self.member.profile.save()

    def login(self, user=None, verified=True):
        user=user or self.member
        self.client.force_login(user)
        if verified:
            device,_=TOTPDevice.objects.get_or_create(user=user, name='test', defaults={'confirmed':True})
            session=self.client.session
            session[DEVICE_ID_SESSION_KEY]=device.persistent_id
            session.save()
        return user

    def image(self):
        output=BytesIO()
        Image.new('RGB',(40,30),'green').save(output,'PNG')
        return SimpleUploadedFile('image.png',output.getvalue(),content_type='image/png')

    def submit(self, section='articles'):
        self.login()
        response=self.client.post(reverse('submission-new'), {'title':'A considered story','summary':'An introduction','body':'# A section\n\nA **thoughtful** paragraph.','section':section,'language':'en','tags':'Care','featured_image':self.image(),'status':'approved','owner':self.admin.pk})
        self.assertEqual(response.status_code,302)
        item=Submission.objects.get()
        self.assertEqual(item.owner,self.member)
        self.assertEqual(item.status,'pending')
        return item

    def approve(self,item):
        self.login(self.admin)
        response=self.client.post(reverse('review-detail',args=[item.pk]),{'decision':'approve','note':'Ready to share','version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302)
        item.refresh_from_db()
        return item

    def test_adult_signup_is_immediate_without_privileged_fields(self):
        response=self.client.post(reverse('signup'), {'username':'newreader','email':'reader@example.com','display_name':'Requested name','password1':'Brand-new-secret-391!','password2':'Brand-new-secret-391!','age_confirmation':'on','is_staff':'on','roles':['admin']})
        self.assertRedirects(response,reverse('signup-verify'))
        user=get_user_model().objects.get(username='newreader')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.groups.exists())
        self.assertEqual(user.profile.display_name,'MindState member')
        self.assertEqual(user.profile.changes.get().status,'pending')
        self.assertFalse(MembershipApplication.objects.exists())

    def test_under16_cannot_use_adult_signup(self):
        response=self.client.post(reverse('signup'),{'username':'child','email':'child@example.com','display_name':'Child','password1':'Brand-new-secret-391!','password2':'Brand-new-secret-391!'})
        self.assertRedirects(response, reverse('guardian-signup'))
        self.assertFalse(get_user_model().objects.filter(username='child').exists())

    def test_under16_signup_requires_credentials_before_consent_upload(self):
        response = self.client.post(reverse('guardian-signup'), {'requested_username':'child', 'email':'child@example.com', 'display_name':'Child', 'consent_document':self.image()})
        self.assertEqual(response.status_code, 200)
        self.assertFalse(MembershipApplication.objects.exists())
        self.assertFalse(get_user_model().objects.filter(username='child').exists())

    def test_posting_needs_authenticator(self):
        self.login(verified=False)
        response=self.client.get(reverse('submission-new'))
        self.assertTrue(response.url.startswith(reverse('two-factor')))
        self.assertFalse(Submission.objects.exists())

    def test_review_publishes_real_page_and_adds_directory_profile(self):
        item=self.approve(self.submit())
        post=LandingContent.objects.get(submission=item)
        response=self.client.get(post.link_url)
        self.assertContains(response,'<strong>thoughtful</strong>',html=True)
        self.assertContains(self.client.get(reverse('community-directory')),reverse('profile-view',args=[self.member.profile.public_ref]))
        self.assertEqual(len(mail.outbox),1)
        self.assertIn('team@mindstate.space',mail.outbox[0].from_email)
        self.assertTrue(mail.outbox[0].alternatives)

    def test_art_publication_uses_art_route(self):
        item=self.approve(self.submit('art'))
        post=LandingContent.objects.get(submission=item)
        self.assertTrue(post.link_url.startswith('/app/art/'))
        self.assertEqual(self.client.get(post.link_url).status_code,200)

    def test_edit_keeps_approved_version_until_new_approval(self):
        item=self.approve(self.submit())
        self.login()
        post=LandingContent.objects.get(submission=item)
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'title':'Unapproved replacement','summary':'Updated introduction','body':'Replacement text','section':'articles','language':'en','version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302)
        item.refresh_from_db()
        self.assertEqual(item.status,'pending')
        self.assertEqual(item.revision,2)
        self.assertNotContains(self.client.get(post.link_url),'Unapproved replacement')
        self.approve(item)
        self.assertContains(self.client.get(post.link_url),'Unapproved replacement')
        self.assertEqual(item.snapshots.count(),2)

    def test_pending_media_and_trackers_are_private(self):
        item=self.submit()
        stranger=get_user_model().objects.create_user('stranger')
        self.login(stranger)
        self.assertEqual(self.client.get(reverse('submission-detail',args=[item.pk])).status_code,403)
        self.assertEqual(self.client.get(reverse('submission-media',args=[item.pk,'pending','featured'])).status_code,403)
        self.assertEqual(self.client.get(reverse('review-queue')).status_code,403)
        self.assertEqual(self.client.get(reverse('profile-reviews')).status_code,403)

    def test_stale_review_is_rejected_and_no_self_approval(self):
        item=self.submit()
        self.login(self.admin)
        response=self.client.post(reverse('review-detail',args=[item.pk]),{'decision':'approve','note':'Ready','version':'2020-01-01T00:00:00+00:00'})
        self.assertContains(response,'Reload')
        self.assertFalse(LandingContent.objects.exists())
        item.owner=self.admin
        item.save()
        response=self.client.post(reverse('review-detail',args=[item.pk]),{'decision':'approve','note':'Ready','version':item.updated_at.isoformat()})
        self.assertContains(response,'Another admin')

    def test_profile_image_banner_and_name_wait_for_manual_review(self):
        self.login()
        response=self.client.post(reverse('profile-edit'),{'profile_revision': '0', 'display_name':'New public name','bio':'New introduction','avatar':self.image(),'banner':self.image()})
        self.assertEqual(response.status_code,302)
        change=ProfileChange.objects.get()
        self.member.profile.refresh_from_db()
        self.assertEqual(self.member.profile.display_name,'Approved creator')
        self.assertFalse(self.member.profile.avatar)
        self.login(self.admin)
        response=self.client.post(reverse('profile-review',args=[change.pk]),{'decision':'approve','note':'Reviewed'})
        self.assertEqual(response.status_code,302)
        self.member.profile.refresh_from_db()
        self.assertEqual(self.member.profile.display_name,'New public name')
        for slot in ('avatar','banner'):
            response=self.client.get(reverse('profile-'+slot,args=[self.member.profile.public_ref]))
            self.assertEqual(response.status_code,200)
            response.close()

    def test_notification_retry_preserves_original_decision(self):
        item=self.submit()
        notice=ReviewNotice.objects.create(submission=item,recipient=self.member.email,subject='Saved decision',body='Saved reviewed title and note')
        item.title='Later unrelated title'
        item.save()
        with patch('accounts.submission_services.EmailMultiAlternatives.send',side_effect=RuntimeError()):
            self.assertFalse(send_review_notice(notice))
        notice.refresh_from_db()
        self.assertEqual(notice.status,'pending')
        self.assertTrue(send_review_notice(notice))
        self.assertIn('Saved reviewed title',mail.outbox[0].alternatives[0].content)
        self.assertNotIn('Later unrelated title',mail.outbox[0].alternatives[0].content)
        self.assertFalse(send_review_notice(notice))

    def test_unsafe_upload_and_html_are_not_executed(self):
        from .forms import SubmissionForm
        from .templatetags.member_tags import story_format
        form=SubmissionForm({'title':'Test','summary':'Test','section':'articles','language':'en','body':'Body'}, {'featured_image':SimpleUploadedFile('attack.svg',b'<svg><script/></svg>')})
        self.assertFalse(form.is_valid())
        self.assertNotIn('<script>',story_format('<script>alert(1)</script>'))


    def test_editor_and_review_pages_render_for_verified_users(self):
        self.login()
        self.assertContains(self.client.get(reverse('submission-new')), 'Writing tools')
        item=self.submit()
        self.assertContains(self.client.get(reverse('submission-edit',args=[item.pk])), 'Send revision')
        self.assertEqual(self.client.get(reverse('submission-detail',args=[item.pk])).status_code,200)
        self.login(self.admin)
        for name in ('review-queue','profile-reviews'):
            self.assertEqual(self.client.get(reverse(name)).status_code,200)


    def test_guardian_pdf_validation_and_downloadable_form(self):
        from .forms import GuardianSignUpForm
        data={'requested_username':'child','email':'child@example.com','display_name':'Child'}
        pdf=(settings.BASE_DIR/'static/documents/MindState_Guardian_Consent_Form.pdf').read_bytes()
        form=GuardianSignUpForm(data,{'consent_document':SimpleUploadedFile('signed.pdf',pdf,content_type='application/pdf')})
        self.assertTrue(form.is_valid(), form.errors)
        form=GuardianSignUpForm(data,{'consent_document':SimpleUploadedFile('fake.pdf',b'%PDF-not-a-real-document')})
        self.assertFalse(form.is_valid())

    def test_malformed_version_is_rejected_without_server_error(self):
        from .submission_services import matches_version
        from django.utils import timezone
        self.assertFalse(matches_version('2026-99-99T00:00:00',timezone.now()))
        self.assertFalse(matches_version(None,timezone.now()))

    def test_login_and_studio_design_preserve_real_workflow(self):
        response=self.client.get(reverse('login'))
        self.assertContains(response,'data-auth-background',count=3)
        self.assertNotContains(response,'Back to MindState')
        self.assertNotContains(response,'Need help now?')
        self.login()
        response=self.client.get(reverse('submission-new'))
        self.assertContains(response,'data-rich-editor')
        self.assertContains(response,'Reading preview')
        self.assertNotContains(response,'workspace-sidebar')
        item=self.submit()
        self.assertEqual(item.body,'# A section\n\nA **thoughtful** paragraph.')
        self.login(self.admin)
        response=self.client.get(reverse('review-detail',args=[item.pk]))
        for marker in ('review-visual-panel','review-text-panel','review-decision-panel','name="version"','data-review-gallery'):
            self.assertContains(response,marker)
        change=ProfileChange.objects.create(profile=self.member.profile,requested_by=self.member,display_name='New name',bio='New bio')
        response=self.client.get(reverse('profile-review',args=[change.pk]))
        self.assertContains(response,'Proposed profile')
        self.assertContains(response,'name="decision"')
