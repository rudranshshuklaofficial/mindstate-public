from datetime import timedelta
from io import BytesIO
import re
import tempfile
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image
from .models import GuardianConsent, MembershipApplication, ProfileChange, RecoveryCode, PasswordResetChallenge, Collaboration, CollaborationMember, Submission, AccountNotice, Invite
from .services import decide_application


@override_settings(ALLOWED_HOSTS=['testserver'], PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'], EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend', EMAIL_DELIVERY_ENABLED=True, STORAGES={'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'}, 'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class AccountFlowTests(TestCase):
    def setUp(self):
        self.storage = tempfile.TemporaryDirectory()
        self.addCleanup(self.storage.cleanup)
        self.override = override_settings(MEDIA_ROOT=self.storage.name)
        self.override.enable()
        self.addCleanup(self.override.disable)
        self.owner = get_user_model().objects.create_user('owner', 'owner@example.com', 'Old-pass-123!')
        self.viewer = get_user_model().objects.create_user('viewer', 'viewer@example.com', 'Old-pass-123!')
        self.admin = get_user_model().objects.create_user('admin', 'admin@example.com', 'Old-pass-123!')
        self.admin.groups.add(Group.objects.get(name='admin'))
        self.owner.profile.display_name='Approved name'
        self.owner.profile.bio='Approved bio'
        self.owner.profile.save()

    def sign_in(self, user):
        self.client.force_login(user)
        device, _=TOTPDevice.objects.get_or_create(user=user, name='MindState', defaults={'confirmed':True})
        session=self.client.session
        session[DEVICE_ID_SESSION_KEY]=device.persistent_id
        session['security_verified_at']=timezone.now().timestamp()
        session.save()

    def image(self):
        buffer=BytesIO();Image.new('RGB',(100,100),'green').save(buffer,'PNG')
        return SimpleUploadedFile('photo.png',buffer.getvalue(),content_type='image/png')

    def save_profile(self, **extra):
        latest=self.owner.profile.changes.first()
        data={'profile_revision':str(latest.pk) if latest else '0','display_name':'Private name','bio':'Private bio','handwritten_note':'A private margin note','sticker_text':'HELLO'}
        data.update(extra)
        return self.client.post(reverse('profile-edit'),data)

    def test_owner_sees_pending_public_sees_approved_and_old_review_cannot_publish(self):
        self.sign_in(self.owner)
        self.assertEqual(self.save_profile().status_code,302)
        first=self.owner.profile.changes.first()
        url=reverse('profile-view',args=[self.owner.profile.public_ref])
        self.assertContains(self.client.get(url),'Only you can see these changes')
        self.assertContains(self.client.get(url),'Private name')
        self.assertContains(self.client.get(url+'?appearance=approved'),'Approved name')
        self.assertEqual(self.save_profile(display_name='New private name').status_code,302)
        first.refresh_from_db();self.assertEqual(first.status,'superseded')
        latest=self.owner.profile.changes.first()
        self.sign_in(self.viewer)
        self.assertContains(self.client.get(url),'Approved name')
        self.assertNotContains(self.client.get(url),'New private name')
        self.sign_in(self.admin)
        self.assertContains(self.client.get(reverse('profile-review',args=[first.pk])),'no longer awaiting review')
        self.client.post(reverse('profile-review',args=[first.pk]),{'decision':'approve','note':'Stale'})
        self.owner.profile.refresh_from_db();self.assertEqual(self.owner.profile.display_name,'Approved name')
        self.client.post(reverse('profile-review',args=[latest.pk]),{'decision':'approve','note':'Ready'})
        self.owner.profile.refresh_from_db();self.assertEqual(self.owner.profile.display_name,'New private name')
        self.assertEqual(self.owner.profile.handwritten_note,'A private margin note')

    def test_profile_limits_and_stale_editor_are_rejected(self):
        self.sign_in(self.owner)
        self.assertContains(self.save_profile(sticker_text='a'*13),'Ensure this value has at most 12 characters')
        self.save_profile()
        response=self.client.post(reverse('profile-edit'),{'profile_revision':'0','display_name':'Stale','bio':'Stale'})
        self.assertContains(response,'changed in another tab')

    def test_pending_images_remain_private_and_survive_repeat_save(self):
        self.sign_in(self.owner);self.save_profile(avatar=self.image())
        first=self.owner.profile.changes.first()
        self.save_profile(display_name='Another private name')
        latest=self.owner.profile.changes.first()
        self.assertEqual(latest.avatar.name,first.avatar.name)
        url=reverse('profile-change-media',args=[latest.pk,'avatar'])
        self.sign_in(self.viewer);self.assertEqual(self.client.get(url).status_code,403)
        self.sign_in(self.admin)
        response=self.client.get(reverse('profile-review',args=[latest.pk]))
        self.assertContains(response,'data-changed-fields=')
        self.assertContains(response,url)
        self.assertContains(response,'data-profile-field="avatar"')

    def test_under16_can_create_account_before_upload_and_cannot_bypass_gate(self):
        data={'username':'young','email':'young@example.com','display_name':'Young member','password1':'New-secret-634!','password2':'New-secret-634!'}
        response=self.client.post(reverse('guardian-signup'),data)
        self.assertRedirects(response,reverse('signup-verify'))
        code = re.search(r'code is (\d{6})', mail.outbox[-1].body).group(1)
        self.assertRedirects(self.client.post(reverse('signup-verify'), {'code':code}), reverse('consent-status'))
        young=get_user_model().objects.get(username='young');self.assertEqual(young.guardianconsent.status,'pending')
        for path in ['/', '/app/article/1001/', '/art/', '/app/search/', '/collaborate/', '/contributors/1/', reverse('profile-view',args=[self.owner.profile.public_ref]), reverse('profile-avatar',args=[self.owner.profile.public_ref]), '/admin-mindstate/']:
            self.assertRedirects(self.client.get(path),reverse('consent-status'),msg_prefix=path)
        response=self.client.get(reverse('consent-status'))
        self.assertContains(response,'Consent needed');self.assertNotContains(response,'Our Community Members')
        self.assertEqual(self.client.get(reverse('help')).status_code,200)

    def test_consent_upload_review_replace_approve_and_mail_failure_does_not_relock(self):
        GuardianConsent.objects.create(user=self.owner,is_under_16=True,status='pending')
        self.sign_in(self.owner)
        self.assertEqual(self.client.post(reverse('consent-status'),{'consent_document':self.image()}).status_code,302)
        item=MembershipApplication.objects.get(member=self.owner)
        self.assertContains(self.client.get(reverse('consent-status')),'Submitted')
        self.sign_in(self.admin)
        self.client.post(reverse('team-application',args=[item.pk]),{'action':'start'})
        item.refresh_from_db();self.assertIsNotNone(item.review_started_at)
        decide_application(self.admin,item.pk,{'decision':'decline','note':'Please sign the form'})
        self.sign_in(self.owner)
        self.assertContains(self.client.get(reverse('consent-status')),'Changes required')
        self.client.post(reverse('consent-status'),{'consent_document':self.image()})
        item.refresh_from_db();self.assertEqual(item.consent_revision,2)
        self.sign_in(self.admin)
        stale=self.client.post(reverse('team-application',args=[item.pk]),{'consent_revision':'1','decision':'approve','note':'Okay','consent_method':'Signed form','consent_date':timezone.localdate()})
        self.assertContains(stale,'document changed')
        self.client.post(reverse('team-application',args=[item.pk]),{'action':'start'})
        with self.captureOnCommitCallbacks(execute=True), override_settings(EMAIL_DELIVERY_ENABLED=False):
            decide_application(self.admin,item.pk,{'decision':'approve','note':'Okay','consent_method':'Signed form','consent_date':timezone.localdate()})
        self.assertFalse(Invite.objects.exists())
        self.owner.guardianconsent.refresh_from_db();self.assertEqual(self.owner.guardianconsent.status,'given')
        self.assertTrue(AccountNotice.objects.filter(sent_at__isnull=True).exists())
        self.sign_in(self.owner);self.assertEqual(self.client.get('/').status_code,200)

    def test_legacy_consent_cannot_be_claimed_by_unverified_matching_email(self):
        GuardianConsent.objects.create(user=self.owner,is_under_16=True,status='pending')
        item=MembershipApplication.objects.create(email=self.owner.email,display_name='Legacy',introduction='Private',is_under_16=True)
        self.sign_in(self.owner)
        response=self.client.post(reverse('consent-status'),{'consent_document':self.image()})
        self.assertContains(response,'Verify your email')
        item.refresh_from_db();self.assertIsNone(item.member_id)

    def test_email_recovery_requires_proof_then_invalidates_sessions_and_code(self):
        self.client.post(reverse('password-reset'),{'action':'start','identifier':self.owner.email,'method':'email'})
        code=re.search(r'code is (\d{6})',mail.outbox[-1].body).group(1)
        challenge=PasswordResetChallenge.objects.get()
        self.assertNotIn(code,challenge.digest)
        self.assertContains(self.client.post(reverse('password-reset'),{'action':'verify','code':'wrong'}),'could not be verified')
        response=self.client.post(reverse('password-reset'),{'action':'verify','code':code});self.assertContains(response,'Save new password')
        old_client=self.client_class();old_client.force_login(self.owner)
        response=self.client.post(reverse('password-reset'),{'action':'password','new_password1':'Replacement-739!','new_password2':'Replacement-739!'})
        self.assertContains(response,'Password updated')
        self.owner.refresh_from_db();self.assertTrue(self.owner.check_password('Replacement-739!'))
        self.assertEqual(old_client.get(reverse('dashboard')).status_code,302)
        challenge.refresh_from_db();self.assertIsNotNone(challenge.used_at)
        self.assertNotContains(self.client.post(reverse('password-reset'),{'action':'verify','code':code}),'Save new password')

    def test_backup_recovery_requires_confirmed_2fa_and_consumes_once(self):
        device=TOTPDevice.objects.create(user=self.owner,confirmed=True)
        recovery=RecoveryCode.objects.create(user=self.owner,digest=make_password('my-backup-code'))
        self.client.post(reverse('password-reset'),{'action':'start','identifier':self.owner.username,'method':'backup'})
        self.assertContains(self.client.post(reverse('password-reset'),{'action':'verify','code':'my-backup-code'}),'Save new password')
        recovery.refresh_from_db();self.assertIsNotNone(recovery.used_at)
        self.assertTrue(TOTPDevice.objects.filter(pk=device.pk,confirmed=True).exists())
        self.client.post(reverse('password-reset'),{'action':'restart'})
        self.client.post(reverse('password-reset'),{'action':'start','identifier':self.owner.username,'method':'backup'})
        self.assertContains(self.client.post(reverse('password-reset'),{'action':'verify','code':'my-backup-code'}),'could not be verified')

    def test_unknown_account_and_expired_code_do_not_authorize_reset(self):
        self.client.post(reverse('password-reset'),{'action':'start','identifier':'missing','method':'email'})
        response=self.client.post(reverse('password-reset'),{'action':'verify','code':'123456'})
        self.assertContains(response,'could not be verified');self.assertNotContains(response,'account does not exist')
        self.client.post(reverse('password-reset'),{'action':'start','identifier':self.owner.username,'method':'email'})
        PasswordResetChallenge.objects.filter(user=self.owner).update(expires_at=timezone.now()-timedelta(seconds=1))
        code=re.search(r'code is (\d{6})',mail.outbox[-1].body).group(1)
        self.assertContains(self.client.post(reverse('password-reset'),{'action':'verify','code':code}),'could not be verified')

    def test_collaboration_preview_is_open_before_matching_then_private(self):
        draft=Submission.objects.create(owner=self.owner,section='articles',title='Preview essay',summary='',body='My complete draft')
        item=Collaboration.objects.create(created_by=self.owner,submission=draft,need='art',brief='A brief')
        CollaborationMember.objects.create(collaboration=item,user=self.owner,role='writer',anonymous=True)
        self.sign_in(self.viewer)
        response=self.client.get(reverse('collaboration-preview',args=[item.pk])+'?dialog=1')
        self.assertContains(response,'My complete draft');self.assertContains(response,'Do not copy')
        self.assertNotContains(response,self.owner.username)
        CollaborationMember.objects.create(collaboration=item,user=self.admin,role='artist')
        self.assertEqual(self.client.get(reverse('collaboration-preview',args=[item.pk])).status_code,404)
        self.sign_in(self.owner);self.assertContains(self.client.get(reverse('collaboration-preview',args=[item.pk])),'My complete draft')

    def test_account_changes_invalidate_reset_proof(self):
        self.client.post(reverse('password-reset'), {'action':'start','identifier':self.owner.email,'method':'email'})
        code = re.search(r'code is (\d{6})', mail.outbox[-1].body).group(1)
        self.owner.email = 'replacement@example.com'
        self.owner.save(update_fields=['email'])
        self.assertContains(self.client.post(reverse('password-reset'), {'action':'verify','code':code}), 'could not be verified')

    def test_reset_invalidates_other_authorized_reset_sessions(self):
        other = self.client_class()
        for client in (self.client, other):
            client.post(reverse('password-reset'), {'action':'start','identifier':self.owner.email,'method':'email'})
            code = re.search(r'code is (\d{6})', mail.outbox[-1].body).group(1)
            self.assertContains(client.post(reverse('password-reset'), {'action':'verify','code':code}), 'Save new password')
        data = {'action':'password','new_password1':'Replacement-739!','new_password2':'Replacement-739!'}
        self.assertContains(self.client.post(reverse('password-reset'), data), 'Password updated')
        self.assertContains(other.post(reverse('password-reset'), data), 'request has expired')

    def test_pending_image_removal_can_be_undone_before_review(self):
        self.owner.profile.avatar.save('approved.png', self.image())
        self.sign_in(self.owner)
        self.save_profile(remove_avatar='on')
        self.assertTrue(self.owner.profile.changes.first().remove_avatar)
        self.save_profile()
        self.assertFalse(self.owner.profile.changes.first().remove_avatar)
