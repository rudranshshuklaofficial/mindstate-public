import re
from datetime import timedelta
from unittest.mock import patch
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.core import mail
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from .models import EmailVerification, VerifiedEmail, GuardianConsent

@override_settings(ALLOWED_HOSTS=['testserver'],EMAIL_DELIVERY_ENABLED=True,EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class SignupVerificationTests(TestCase):
    def data(self, age=True):
        data={'username':'newreader','email':'new@example.com','display_name':'New reader','password1':'New-secret-749!','password2':'New-secret-749!'}
        if age:data['age_confirmation']='on'
        return data
    def signup(self, under=False):
        response=self.client.post(reverse('guardian-signup' if under else 'signup'),self.data(not under))
        self.assertRedirects(response,reverse('signup-verify'))
        return get_user_model().objects.get(username='newreader'),re.search(r'code is (\d{6})',mail.outbox[-1].body)[1]
    def test_adult_hashed_code_single_use_and_access_gate(self):
        user,code=self.signup(); challenge=EmailVerification.objects.get(user=user)
        self.assertNotEqual(challenge.digest,code);self.assertTrue(check_password(code,challenge.digest))
        self.assertRedirects(self.client.get('/'),reverse('signup-verify'))
        self.assertRedirects(self.client.post(reverse('signup-verify'),{'code':code}),reverse('dashboard'))
        challenge.refresh_from_db();self.assertIsNotNone(challenge.used_at)
        self.assertTrue(VerifiedEmail.objects.filter(user=user,email=user.email).exists())
        self.assertEqual(self.client.get('/').status_code,200)
        verified_at=VerifiedEmail.objects.get(user=user).verified_at
        self.client.post(reverse('signup-verify'),{'code':code})
        self.assertEqual(VerifiedEmail.objects.get(user=user).verified_at,verified_at)
    def test_under16_verification_does_not_unlock_consent(self):
        user,code=self.signup(under=True)
        self.assertRedirects(self.client.post(reverse('signup-verify'),{'code':code}),reverse('consent-status'))
        self.assertRedirects(self.client.get('/'),reverse('consent-status'))
        self.assertRedirects(self.client.get('/search/'),reverse('consent-status'))
        self.assertEqual(GuardianConsent.objects.get(user=user).status,'pending')
        response=self.client.get(reverse('consent-status'))
        self.assertContains(response,'aria-current="step"');self.assertContains(response,'MindState_Guardian_Permission.pdf?v=f896de7be862')
    def test_nojs_age_handoff_does_not_store_password_or_create_account(self):
        data=self.data(False)
        self.assertRedirects(self.client.post(reverse('signup'),data),reverse('guardian-signup'),fetch_redirect_response=False)
        self.assertFalse(get_user_model().objects.filter(username=data['username']).exists())
        self.assertNotIn(data['password1'],str(dict(self.client.session)))
        response=self.client.get(reverse('guardian-signup'))
        self.assertContains(response,'value="newreader"');self.assertContains(response,'value="new@example.com"')
        self.assertNotContains(response,data['password1'])
    def test_validation_error_creates_no_account(self):
        data=self.data();data['password2']='Different-secret-749!'
        self.assertEqual(self.client.post(reverse('signup'),data).status_code,200)
        self.assertFalse(get_user_model().objects.filter(username='newreader').exists())
    def test_expired_wrong_codes_and_resend_invalidation(self):
        user,code=self.signup();url=reverse('signup-verify')
        self.assertContains(self.client.post(url,{'code':'abcdef'}),'could not be verified')
        EmailVerification.objects.filter(user=user).update(expires_at=timezone.now()-timedelta(seconds=1))
        self.assertContains(self.client.post(url,{'code':code}),'unavailable or expired')
        self.assertContains(self.client.post(url,{'action':'resend'}),'wait 60 seconds')
        self.assertEqual(len(mail.outbox),1)
        EmailVerification.objects.filter(user=user).update(sent_at=timezone.now()-timedelta(seconds=61))
        with patch('accounts.signup_verification.secrets.randbelow',return_value=891234):
            self.client.post(url,{'action':'resend'})
        self.assertEqual(len(mail.outbox),2)
        self.assertContains(self.client.post(url,{'code':code}),'could not be verified')
        self.assertRedirects(self.client.post(url,{'code':'891234'}),reverse('dashboard'))
    def test_delivery_failure_is_visible_and_retryable(self):
        with patch('accounts.signup_verification.send_mail',side_effect=OSError('SMTP unavailable')):
            response=self.client.post(reverse('signup'),self.data(),follow=True)
        self.assertContains(response,'could not send your verification email')
        self.assertContains(response,'No active code')
        self.assertTrue(get_user_model().objects.filter(username='newreader').exists())
        self.client.post(reverse('signup-verify'),{'action':'resend'})
        self.assertEqual(len(mail.outbox),1)
    def test_old_accounts_keep_access(self):
        user=get_user_model().objects.create_user('existing','old@example.com','Existing-secret-789!')
        self.client.force_login(user);self.assertEqual(self.client.get('/').status_code,200)

    def test_home_navigation_uses_gallery_and_requested_order(self):
        user=get_user_model().objects.create_user('navbar-reader','nav@example.com','Existing-secret-789!')
        self.client.force_login(user)
        response=self.client.get('/')
        html=response.content.decode();nav=html.split('aria-label="Main navigation"',1)[1].split('</nav>',1)[0]
        self.assertIn('href="/art/"',nav)
        self.assertNotIn('Help',nav)
        labels=['Articles','Art','Contribute','Collaborate','About us','Contact us']
        positions=[re.search(r'>'+re.escape(label)+r'(?:\s|<)',nav).start() for label in labels]
        self.assertEqual(positions,sorted(positions))

    def test_five_failed_codes_require_a_new_challenge(self):
        user,code=self.signup()
        wrong='999999' if code!='999999' else '999998'
        for _ in range(5):self.client.post(reverse('signup-verify'),{'code':wrong})
        self.assertContains(self.client.post(reverse('signup-verify'),{'code':code}),'unavailable or expired')
        self.assertFalse(VerifiedEmail.objects.filter(user=user).exists())
        self.assertContains(self.client.get(reverse('signup-verify')),'No active code')
