from datetime import timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.test import Client, TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.oath import totp
from django_otp.plugins.otp_totp.models import TOTPDevice

from .forms import InviteAcceptForm
from .models import AuditLog, Invite, MembershipApplication, ModeratorOnboarding, RecoveryCode
from .services import accept_invite, decide_application


@override_settings(STORAGES={'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'}, 'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'}}, ALLOWED_HOSTS=['testserver'])
class AccessTests(TestCase):
    def setUp(self):
        self.member = get_user_model().objects.create_user('member', 'member@example.com', 'Existing-password-721!')
        self.admin = get_user_model().objects.create_user('administrator', 'admin@example.com', 'Existing-password-721!')
        self.admin.groups.add(Group.objects.get(name='admin'))

    def login(self, user=None, verified=False):
        user = user or self.member
        self.client.force_login(user)
        if verified:
            device = TOTPDevice.objects.create(user=user, confirmed=True)
            session = self.client.session
            session[DEVICE_ID_SESSION_KEY] = device.persistent_id
            session.save()
        return user

    def application(self, **changes):
        data = dict(email='new@example.com', display_name='Pen name', interests=['tech'], introduction='I want to contribute.', is_under_16=False)
        data.update(changes)
        return MembershipApplication.objects.create(**data)

    def approve(self, item, **changes):
        if item.consent_document:
            item.review_started_at=timezone.now()
            item.save(update_fields=['review_started_at'])
        data = {'decision': 'approve', 'note': 'Reviewed', 'consent_method': '', 'consent_date': None}
        data.update(changes)
        decide_application(self.admin, item.pk, data)
        # Compatibility fixture: this represents an invitation issued before the new flow.
        return Invite.objects.create(application=item, created_by=self.admin, expires_at=timezone.now() + timedelta(days=7))

    def accept_form(self, **changes):
        data = {'username': 'newmember', 'password1': 'New-secret-password-853!', 'password2': 'New-secret-password-853!'}
        data.update(changes)
        form = InviteAcceptForm(data)
        self.assertTrue(form.is_valid(), form.errors)
        return form

    def test_private_pages_redirect_visitors(self):
        for path in ('/', '/about/', '/contribute/', '/community/members/', '/app/search/', '/dashboard/', '/admin-mindstate/', '/admin/'):
            response = self.client.get(path)
            self.assertEqual(response.status_code, 302, path)
            self.assertTrue(response.url.startswith('/accounts/login/?next='))

    def test_public_entry_pages(self):
        for name in ('login', 'signup', 'guardian-signup', 'password-reset', 'help'):
            self.assertEqual(self.client.get(reverse(name)).status_code, 200, name)

    def test_existing_password_and_safe_return(self):
        response = self.client.post(reverse('login'), {'username': 'member', 'password': 'Existing-password-721!', 'next': '/dashboard/'})
        self.assertRedirects(response, '/dashboard/', fetch_redirect_response=False)
        self.client.logout()
        response = self.client.post(reverse('login'), {'username': 'member', 'password': 'Existing-password-721!', 'next': 'https://evil.example/'})
        self.assertRedirects(response, '/', fetch_redirect_response=False)

    def test_existing_admin_password_login_reaches_authenticator(self):
        response = self.client.post(reverse('login'), {'username': 'administrator', 'password': 'Existing-password-721!', 'next': '/admin-mindstate/'})
        self.assertRedirects(response, '/admin-mindstate/', fetch_redirect_response=False)
        self.assertTrue(self.client.get('/admin-mindstate/').url.startswith(reverse('two-factor')))

    def test_logout_requires_post(self):
        self.login()
        self.assertEqual(self.client.get(reverse('logout')).status_code, 405)
        self.assertRedirects(self.client.post(reverse('logout')), reverse('login'))
        self.assertNotIn('_auth_user_id', self.client.session)

    def test_login_form_preserves_requested_page(self):
        response = self.client.get(reverse('login'), {'next': '/contribute/'})
        self.assertContains(response, 'name="next" value="/contribute/"')
        response = self.client.get(reverse('login'), {'next': 'https://evil.example/'})
        self.assertNotContains(response, 'value="https://evil.example/"')

    def test_authenticated_pages_are_not_cacheable(self):
        self.login()
        self.assertEqual(self.client.get(reverse('dashboard'))['Cache-Control'], 'private, no-store')

    def test_another_users_device_cannot_verify_session(self):
        device = TOTPDevice.objects.create(user=self.member, confirmed=True)
        self.login(self.admin)
        session = self.client.session
        session[DEVICE_ID_SESSION_KEY] = device.persistent_id
        session.save()
        self.assertTrue(self.client.get(reverse('team-home')).url.startswith(reverse('two-factor')))

    def test_role_permissions_are_explicit_and_identity_not_automatic(self):
        self.assertTrue(self.admin.has_perm('accounts.review_applications'))
        self.assertTrue(self.admin.has_perm('accounts.manage_roles'))
        self.assertFalse(self.admin.has_perm('accounts.view_identity'))
        self.assertFalse(self.member.has_perm('accounts.manage_roles'))

    def test_member_dashboard_and_profile(self):
        self.login()
        self.assertContains(self.client.get(reverse('dashboard')), 'My profile')
        self.client.post(reverse('profile-edit'), {'profile_revision':'0', 'display_name': 'A pen name', 'bio': 'A short bio', 'is_staff': 'on'})
        self.member.refresh_from_db()
        self.assertEqual(self.member.profile.display_name, '')
        self.assertEqual(self.member.profile.changes.get().display_name, 'A pen name')
        self.assertFalse(self.member.is_staff)

    def test_no_member_team_access(self):
        self.login()
        for name in ('team-home', 'team-applications', 'team-invites', 'team-members', 'team-audit'):
            self.assertEqual(self.client.get(reverse(name)).status_code, 403, name)
        self.assertEqual(self.client.post(reverse('member-roles', args=[self.member.pk]), {'roles': ['admin']}).status_code, 403)
        self.assertFalse(self.member.groups.exists())

    def test_privileged_roles_require_otp(self):
        for role in ('admin', 'identity_admin', 'moderator'):
            self.member.groups.set([Group.objects.get(name=role)])
            self.login()
            response = self.client.get(reverse('dashboard'))
            self.assertTrue(response.url.startswith(reverse('two-factor')))
            self.client.logout()

    def test_other_teams_have_workspace_but_no_application_access(self):
        for role in ('editorial', 'tech'):
            self.member.groups.set([Group.objects.get(name=role)])
            self.login()
            self.assertEqual(self.client.get(reverse('team-home')).status_code, 200)
            self.assertEqual(self.client.get(reverse('team-applications')).status_code, 403)
            self.client.logout()

    def test_admin_screens_and_role_does_not_grant_maintenance(self):
        self.login(self.admin, verified=True)
        for name in ('team-home', 'team-applications', 'team-invites', 'team-members', 'team-audit'):
            self.assertEqual(self.client.get(reverse(name)).status_code, 200, name)
        self.assertEqual(self.client.get('/admin/').status_code, 302)
        self.client.post(reverse('member-roles', args=[self.member.pk]), {'roles': ['tech']})
        self.member.refresh_from_db()
        self.assertFalse(self.member.is_staff)
        self.assertFalse(self.member.is_superuser)
        self.assertTrue(self.member.groups.filter(name='tech').exists())

    def test_staff_maintenance_requires_otp_even_without_team_role(self):
        self.member.is_staff = True
        self.member.save()
        self.login()
        self.assertTrue(self.client.get('/admin/').url.startswith(reverse('two-factor')))
        self.login(verified=True)
        self.assertEqual(self.client.get('/admin/').status_code, 200)
        self.assertEqual(self.client.get(reverse('team-home')).status_code, 403)

    def test_legacy_apply_redirects_to_signup(self):
        self.assertRedirects(self.client.get(reverse('apply')), reverse('signup'))

    def test_under_16_consent_blocks_approval(self):
        item = self.application(is_under_16=True)
        with self.assertRaises(ValidationError):
            self.approve(item)
        self.assertFalse(Invite.objects.exists())
        item.consent_document = 'guardian-consent/test-reviewed.pdf'
        item.save(update_fields=['consent_document'])
        invitation = self.approve(item, consent_method='Externally confirmed parental consent', consent_date=timezone.localdate())
        user = accept_invite(invitation.token, self.accept_form())
        self.assertEqual(user.guardianconsent.status, 'given')
        self.assertEqual(user.guardianconsent.recorded_by, self.admin)

    def test_missing_document_cannot_be_approved_even_with_future_date(self):
        with self.assertRaises(ValidationError):
            self.approve(self.application(is_under_16=True), consent_method='External', consent_date=timezone.localdate() + timedelta(days=1))

    def test_approval_no_longer_creates_invitation(self):
        item = self.application()
        decide_application(self.admin, item.pk, {'decision': 'approve', 'note': 'Reviewed', 'consent_method': '', 'consent_date': None})
        self.assertFalse(Invite.objects.exists())
        self.assertEqual(get_user_model().objects.count(), 2)

    def test_decline_does_not_create_invitation(self):
        item = self.application()
        decide_application(self.admin, item.pk, {'decision': 'decline', 'note': 'Reviewed'})
        item.refresh_from_db()
        self.assertEqual(item.status, 'declined')
        self.assertFalse(Invite.objects.exists())

    def test_reused_invitation_rejected(self):
        invitation = self.approve(self.application())
        user = accept_invite(invitation.token, self.accept_form(groups=['admin'], is_staff=True))
        self.assertTrue(user.check_password('New-secret-password-853!'))
        self.assertEqual(user.profile.display_name, 'Pen name')
        self.assertFalse(user.groups.exists())
        with self.assertRaises(ValidationError):
            accept_invite(invitation.token, self.accept_form(username='another'))
        self.assertEqual(self.client.get(reverse('invite-accept', args=[invitation.token])).status_code, 410)

    def test_expired_and_revoked_invites(self):
        invitation = self.approve(self.application())
        invitation.expires_at = timezone.now() - timedelta(seconds=1)
        invitation.save()
        with self.assertRaises(ValidationError):
            accept_invite(invitation.token, self.accept_form())
        invitation.expires_at = timezone.now() + timedelta(days=1)
        invitation.save()
        self.login(self.admin, verified=True)
        self.client.post(reverse('revoke-invite', args=[invitation.pk]))
        with self.assertRaises(ValidationError):
            accept_invite(invitation.token, self.accept_form())

    def test_existing_email_cannot_be_approved(self):
        with self.assertRaises(ValidationError):
            self.approve(self.application(email=self.member.email))

    def test_login_rate_limit(self):
        for _ in range(10):
            self.client.post(reverse('login'), {'username': 'missing', 'password': 'incorrect'})
        self.assertEqual(self.client.post(reverse('login'), {'username': 'missing', 'password': 'incorrect'}).status_code, 429)

    def test_csrf_enforced(self):
        client = Client(enforce_csrf_checks=True)
        self.assertEqual(client.post(reverse('apply'), {}).status_code, 403)
        self.assertEqual(client.post(reverse('login'), {}).status_code, 403)

    def test_totp_setup_and_recovery_codes(self):
        self.login(self.admin)
        self.assertEqual(self.client.get(reverse('two-factor')).status_code, 200)
        device = TOTPDevice.objects.get(user=self.admin)
        response = self.client.post(reverse('two-factor'), {'token': str(totp(device.bin_key)), 'next': 'https://evil.example/'})
        self.assertEqual(response.status_code, 200)
        device.refresh_from_db()
        self.assertTrue(device.confirmed)
        self.assertEqual(RecoveryCode.objects.filter(user=self.admin).count(), 8)
        for code in response.context['codes']:
            self.assertFalse(RecoveryCode.objects.filter(digest=code).exists())
        self.assertEqual(response.context['next'], '/')
        self.assertEqual(self.client.get(reverse('team-home')).status_code, 200)

    def test_recovery_code_single_use(self):
        self.login(self.admin)
        TOTPDevice.objects.create(user=self.admin, confirmed=True, name='MindState')
        RecoveryCode.objects.create(user=self.admin, digest=make_password('abcdef0123456789'))
        response = self.client.post(reverse('two-factor'), {'token': 'abcdef0123456789', 'next': '/dashboard/'})
        self.assertEqual(response.status_code, 302)
        self.assertIsNotNone(RecoveryCode.objects.get().used_at)
        self.client.logout()
        self.login(self.admin)
        response = self.client.post(reverse('two-factor'), {'token': 'abcdef0123456789'})
        self.assertContains(response, 'could not be verified')

    def test_unverified_cannot_replace_recovery_codes(self):
        self.login(self.admin)
        self.assertEqual(self.client.post(reverse('recovery-codes'), {'password': 'Existing-password-721!'}).status_code, 403)

    def test_identity_role_cap_and_self_admin_protection(self):
        for name in ('identityone', 'identitytwo'):
            user = get_user_model().objects.create_user(name)
            user.groups.add(Group.objects.get(name='identity_admin'))
        self.login(self.admin, verified=True)
        response = self.client.post(reverse('member-roles', args=[self.member.pk]), {'roles': ['identity_admin']})
        self.assertContains(response, 'At most two')
        response = self.client.post(reverse('member-roles', args=[self.admin.pk]), {'roles': ['tech']})
        self.assertContains(response, 'Ask another admin')

    def test_audit_entries_are_append_only(self):
        self.approve(self.application())
        entry = AuditLog.objects.first()
        with self.assertRaises(ValidationError):
            entry.save()
        with self.assertRaises(ValidationError):
            entry.delete()
        with self.assertRaises(ValidationError):
            AuditLog.objects.filter(pk=entry.pk).update(action='changed')
        with self.assertRaises(ValidationError):
            AuditLog.objects.filter(pk=entry.pk).delete()

    @override_settings(APPROVED_GUIDELINES_VERSION='')
    def test_onboarding_blocks_unreconciled_guidelines(self):
        self.member.groups.add(Group.objects.get(name='moderator'))
        self.login(self.member, verified=True)
        self.assertEqual(self.client.post(reverse('acknowledge-guidelines'), {'acknowledged': 'yes'}).status_code, 403)

    @override_settings(APPROVED_GUIDELINES_VERSION='1.1')
    def test_onboarding_requires_acknowledgement_and_supervision(self):
        self.member.groups.add(Group.objects.get(name='moderator'))
        self.login(self.member, verified=True)
        self.assertEqual(self.client.post(reverse('acknowledge-guidelines'), {}).status_code, 403)
        self.client.post(reverse('acknowledge-guidelines'), {'acknowledged': 'yes'})
        self.assertIsNotNone(ModeratorOnboarding.objects.get(user=self.member).read_at)
        self.login(self.admin, verified=True)
        response = self.client.post(reverse('moderator-onboarding', args=[self.member.pk]), {'supervised_review': 'on', 'supervisor': self.admin.pk})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(ModeratorOnboarding.objects.get(user=self.member).approved_by, self.admin)
