from datetime import timedelta
from io import BytesIO
import tempfile
from unittest.mock import patch

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db import IntegrityError, transaction
from django.test import Client, TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.oath import totp
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image

from alpha.models import LandingContent
from .models import AuditLog, Contributor, EmailVerification, MembershipApplication, PostCredit, VerifiedEmail


@override_settings(STORAGES={'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'}, 'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'}}, ALLOWED_HOSTS=['testserver'], PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'])
class MemberExperienceTests(TestCase):
    def setUp(self):
        self.owner = get_user_model().objects.create_user('owner', 'owner@example.com', 'Initial-secret-834!')
        self.viewer = get_user_model().objects.create_user('viewer', 'viewer@example.com', 'Initial-secret-834!')
        self.admin = get_user_model().objects.create_user('admin', 'admin@example.com', 'Initial-secret-834!')
        self.admin.groups.add(Group.objects.get(name='admin'))
        self.core = get_user_model().objects.create_user('core', 'core@example.com', 'Initial-secret-834!')
        self.core.groups.add(Group.objects.get(name='core_team_admin'))
        self.owner.profile.display_name = 'A pen name'
        self.owner.profile.bio = 'A public introduction.'
        self.owner.profile.save()
        person = Contributor.objects.create(name='Credited author', profile=self.owner.profile)
        self.post = LandingContent.objects.create(title='Published work', section='articles', author='Credited author', image_url='/static/ArticleImage.png', is_published=True)
        PostCredit.objects.create(post=self.post, contributor=person)

    def login(self, user=None, verified=True, fresh=True):
        user = user or self.owner
        self.client.force_login(user)
        if verified:
            device, _ = TOTPDevice.objects.get_or_create(user=user, name='MindState', defaults={'confirmed': True})
            session = self.client.session
            session[DEVICE_ID_SESSION_KEY] = device.persistent_id
            if fresh:
                session['security_verified_at'] = timezone.now().timestamp()
            session.save()

    def test_profile_owner_and_other_member_permissions(self):
        url = reverse('profile-view', args=[self.owner.profile.public_ref])
        self.login()
        response = self.client.get(url)
        self.assertContains(response, 'Your studio')
        self.assertContains(response, 'Edit profile')
        self.assertContains(response, 'Published work')
        self.login(self.viewer)
        response = self.client.get(url)
        self.assertContains(response, 'A pen name')
        self.assertNotContains(response, 'Demo views')
        self.assertNotContains(response, 'Edit profile')
        self.assertNotContains(response, 'owner@example.com')
        self.assertEqual(self.client.post(reverse('profile-admin-edit', args=[self.owner.profile.public_ref]), {'display_name': 'Forged', 'bio': 'Changed'}).status_code, 403)
        self.owner.profile.refresh_from_db()
        self.assertEqual(self.owner.profile.display_name, 'A pen name')

    def test_contributors_share_member_scrapbook_layout_and_public_counts(self):
        person = Contributor.objects.create(name='Independent artist', role='Artist', bio='An approved introduction.')
        art = LandingContent.objects.create(title='Published painting', section='art', is_published=True)
        private = LandingContent.objects.create(title='Unpublished painting', section='art', is_published=False)
        for post in (art, private):
            PostCredit.objects.create(post=post, contributor=person)
        self.login(self.viewer)
        response = self.client.get(reverse('contributor-view', args=[person.pk]))
        self.assertTemplateUsed(response, 'accounts/profile.html')
        self.assertContains(response, 'profile-book theme-editorial')
        self.assertContains(response, 'folio-spread')
        self.assertContains(response, 'Independent artist')
        self.assertContains(response, 'An approved introduction.')
        self.assertContains(response, '<span class="role-badge">Artist</span>', html=True)
        self.assertContains(response, 'Published painting')
        self.assertNotContains(response, 'Unpublished painting')
        self.assertEqual(response.context['article_count'], 0)
        self.assertEqual(response.context['art_count'], 1)
        for private_control in ('Edit profile', 'Make my member card', 'Paper theme', 'Joined', 'One reader per post per day'):
            self.assertNotContains(response, private_control)

    def test_linked_contributor_keeps_member_profile_and_theme(self):
        person = Contributor.objects.get(profile=self.owner.profile)
        self.owner.profile.theme = 'collage'
        self.owner.profile.save(update_fields=['theme'])
        self.login(self.viewer)
        response = self.client.get(reverse('contributor-view', args=[person.pk]), follow=True)
        self.assertRedirects(response, reverse('profile-view', args=[self.owner.profile.public_ref]))
        self.assertContains(response, 'profile-book theme-collage')
        self.assertContains(response, 'A pen name')
        self.assertContains(response, 'A public introduction.')

    def test_author_scrapbook_uses_only_credited_published_images(self):
        person = Contributor.objects.create(name='Photo essay author')
        for title, published, image in (
            ('First public essay', True, '/static/first.jpg'),
            ('Second public essay', True, '/static/second.jpg'),
            ('Private essay', False, '/static/private.jpg'),
        ):
            post = LandingContent.objects.create(title=title, section='articles', is_published=published, image_url=image)
            PostCredit.objects.create(post=post, contributor=person)
        self.login(self.viewer)
        response = self.client.get(reverse('contributor-view', args=[person.pk]))
        self.assertContains(response, 'folio-author')
        self.assertContains(response, 'folio-small-snapshot')
        self.assertContains(response, 'folio-work-cutout')
        self.assertContains(response, 'From my published pages')
        self.assertContains(response, '/static/first.jpg')
        self.assertContains(response, '/static/second.jpg')
        self.assertNotContains(response, '/static/private.jpg')
        self.assertNotContains(response, '/static/ArticleImage.png')

    def test_personal_scrapbook_images_keep_priority_over_published_work(self):
        profile = self.owner.profile
        profile.banner = 'banners/approved.jpg'
        profile.folio_image = 'folio-images/approved.jpg'
        profile.save(update_fields=['banner', 'folio_image'])
        self.login(self.viewer)
        response = self.client.get(reverse('profile-view', args=[profile.public_ref]))
        self.assertContains(response, reverse('profile-banner', args=[profile.public_ref]))
        self.assertContains(response, reverse('profile-folio-image', args=[profile.public_ref]))
        self.assertNotContains(response, 'folio-work-cutout')
        self.assertNotContains(response, 'From my published pages')

    def test_developer_without_posts_gets_demo_work_instead_of_empty_publications(self):
        person = Contributor.objects.create(name='Site developer', role='Developer')
        self.login(self.viewer)
        response = self.client.get(reverse('contributor-view', args=[person.pk]))
        self.assertContains(response, 'Developer notebook')
        self.assertContains(response, 'Work done')
        self.assertContains(response, 'Demo portfolio')
        self.assertContains(response, 'not verified contributions')
        self.assertNotContains(response, '<h2>Published work</h2>', html=True)
        self.assertNotContains(response, 'No published work linked yet')
        self.assertNotContains(response, 'profile-stat-strip')

    def test_dual_writer_developer_has_both_work_options(self):
        person = Contributor.objects.create(name='Writer and developer', role='Writer, Developer')
        self.login(self.viewer)
        response = self.client.get(reverse('contributor-view', args=[person.pk]))
        self.assertContains(response, 'href="#development-work"')
        self.assertContains(response, 'href="#published-work"')
        self.assertContains(response, 'Work done')
        self.assertContains(response, '<h2>Published work</h2>', html=True)

    def test_tech_member_with_published_work_has_dual_profile(self):
        self.owner.groups.add(Group.objects.get(name='tech'))
        self.login(self.viewer)
        response = self.client.get(reverse('profile-view', args=[self.owner.profile.public_ref]))
        self.assertTrue(response.context['dual_profile'])
        self.assertContains(response, 'Work done')
        self.assertContains(response, 'Published work')
        self.assertNotContains(response, 'Edit profile')

    def test_contributor_profile_requires_membership_login(self):
        person = Contributor.objects.create(name='Unlinked writer')
        response = self.client.get(reverse('contributor-view', args=[person.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse('login'), response.url)

    def test_only_explicit_core_role_can_edit_other_profiles(self):
        url = reverse('profile-admin-edit', args=[self.owner.profile.public_ref])
        self.login(self.admin)
        self.assertEqual(self.client.post(url, {'profile_revision': '0', 'display_name': 'Changed', 'bio': 'Changed bio'}).status_code, 403)
        self.login(self.core)
        self.assertEqual(self.client.post(url, {'profile_revision': '0', 'display_name': 'Changed', 'bio': 'Changed bio'}).status_code, 302)
        self.assertTrue(AuditLog.objects.filter(action='profile.change_requested', actor=self.core).exists())

    def test_core_role_can_find_profiles_without_application_or_role_access(self):
        self.login(self.core)
        self.assertContains(self.client.get(reverse('team-home')), 'Member profiles')
        self.assertContains(self.client.get(reverse('core-profiles')), 'A pen name')
        self.assertEqual(self.client.get(reverse('team-applications')).status_code, 403)
        self.assertEqual(self.client.get(reverse('member-roles', args=[self.owner.pk])).status_code, 403)
        self.assertEqual(self.client.get(reverse('team-audit')).status_code, 403)

    def test_core_team_password_login_reaches_authenticator(self):
        response = self.client.post(reverse('login'), {'username': 'core', 'password': 'Initial-secret-834!', 'next': reverse('team-home')})
        self.assertRedirects(response, reverse('team-home'), fetch_redirect_response=False)
        self.assertTrue(self.client.get(reverse('team-home')).url.startswith(reverse('two-factor')))

    def test_shared_profile_stays_members_only(self):
        self.assertEqual(self.client.get(reverse('profile-view', args=[self.owner.profile.public_ref])).status_code, 302)
        self.login(self.viewer)
        response = self.client.get(reverse('profile-view', args=[self.owner.profile.public_ref]))
        self.assertContains(response, 'data-share-url=')
        self.assertContains(response, 'Joined')

    def test_author_links_and_hover_cards(self):
        from django.template import Context, Template
        html = Template('{% load member_tags %}{% author_links post %}').render(Context({'post': self.post}))
        self.assertIn(reverse('profile-view', args=[self.owner.profile.public_ref]), html)
        self.assertIn('author-popover', html)
        self.assertIn('A public introduction.', html)
        self.assertNotIn(self.owner.email, html)

    def test_names_are_not_automatically_account_ownership(self):
        person = Contributor.objects.create(name=self.viewer.username)
        self.assertIsNone(person.profile_id)
        self.login(self.core)
        response = self.client.post(reverse('link-contributor', args=[self.owner.profile.public_ref]), {'contributor': person.pk})
        self.assertEqual(response.status_code, 302)
        person.refresh_from_db()
        self.assertEqual(person.profile, self.owner.profile)
        self.assertTrue(AuditLog.objects.filter(action='profile.contributor_linked').exists())

    def test_existing_guardian_receipt_is_reused(self):
        item = MembershipApplication.objects.create(email='guardian@example.com', display_name='Child', introduction='Private', is_under_16=True, status='declined')
        session = self.client.session
        session['application_receipt'] = str(item.tracking_token)
        session.save()
        self.assertContains(self.client.get(reverse('guardian-signup')), 'Create my account')
        self.assertEqual(MembershipApplication.objects.count(), 1)

    def test_receipt_contains_only_status_not_admin_notes(self):
        item = MembershipApplication.objects.create(email='private@example.com', display_name='Private name', introduction='Private introduction', decision_note='Admin-only note', status='declined')
        response = self.client.get(reverse('application-status', args=[item.tracking_token]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Declined')
        self.assertNotContains(response, 'Admin-only note')
        self.assertNotContains(response, 'private@example.com')
        self.assertEqual(response['Referrer-Policy'], 'same-origin')

    def test_member_nav_has_help_and_no_join_button(self):
        self.login()
        response = self.client.get(reverse('dashboard'))
        self.assertContains(response, reverse('help'))
        self.assertNotContains(response, 'class="reading-nav-join"')
        self.assertContains(response, reverse('my-profile'))

    def test_security_requires_recent_otp(self):
        self.login(fresh=False)
        response = self.client.get(reverse('account-security'))
        self.assertTrue(response.url.startswith(reverse('two-factor')))
        self.login()
        self.assertContains(self.client.get(reverse('account-security')), 'Change password')

    def test_bare_two_factor_returns_to_settings(self):
        self.login(verified=False)
        self.client.get(reverse('two-factor'))
        device = TOTPDevice.objects.get(user=self.owner)
        response = self.client.post(reverse('two-factor'), {'token': str(totp(device.bin_key))})
        self.assertEqual(response.context['next'], reverse('account-security'))

    def test_password_and_username_changes_require_current_password(self):
        self.login()
        response = self.client.post(reverse('account-security'), {'action': 'username', 'username': 'newowner', 'password': 'incorrect'})
        self.assertEqual(response.status_code, 200)
        self.owner.refresh_from_db()
        self.assertEqual(self.owner.username, 'owner')
        self.client.post(reverse('account-security'), {'action': 'username', 'username': 'newowner', 'password': 'Initial-secret-834!'})
        self.owner.refresh_from_db()
        self.assertEqual(self.owner.username, 'newowner')
        self.client.post(reverse('account-security'), {'action': 'password', 'old_password': 'Initial-secret-834!', 'new_password1': 'Replacement-secret-965!', 'new_password2': 'Replacement-secret-965!'})
        self.owner.refresh_from_db()
        self.assertTrue(self.owner.check_password('Replacement-secret-965!'))
        self.assertEqual(self.client.get(reverse('dashboard')).status_code, 200)

    @override_settings(EMAIL_DELIVERY_ENABLED=True, EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
    def test_email_is_unchanged_until_otp_then_single_use(self):
        from django.core import mail
        self.login()
        response = self.client.post(reverse('account-security'), {'action': 'email', 'email': 'verified@example.com', 'password': 'Initial-secret-834!'})
        self.assertRedirects(response, reverse('verify-email'))
        self.owner.refresh_from_db()
        self.assertEqual(self.owner.email, 'owner@example.com')
        code = mail.outbox[-1].body.split(' is ')[1].split('.')[0]
        self.assertNotEqual(EmailVerification.objects.get().digest, code)
        self.client.post(reverse('verify-email'), {'code': code})
        self.owner.refresh_from_db()
        self.assertEqual(self.owner.email, 'verified@example.com')
        self.assertTrue(VerifiedEmail.objects.filter(user=self.owner).exists())
        self.assertContains(self.client.post(reverse('verify-email'), {'code': code}), 'unavailable')
        self.assertEqual(mail.outbox[-1].from_email, 'MindState <team@mindstate.space>')
        self.assertNotIn(code, str(list(AuditLog.objects.values('details'))))

    def test_expired_and_attempt_limited_email_codes(self):
        self.login()
        challenge = EmailVerification.objects.create(user=self.owner, email='new@example.com', digest=make_password('123456'), expires_at=timezone.now()-timedelta(seconds=1))
        self.assertContains(self.client.post(reverse('verify-email'), {'code': '123456'}), 'unavailable')
        challenge.expires_at = timezone.now()+timedelta(minutes=10)
        challenge.attempts = 5
        challenge.save()
        self.assertContains(self.client.post(reverse('verify-email'), {'code': '123456'}), 'unavailable')
        self.owner.refresh_from_db()
        self.assertEqual(self.owner.email, 'owner@example.com')

    @override_settings(EMAIL_DELIVERY_ENABLED=True)
    @patch('accounts.account_controls.send_mail', side_effect=RuntimeError('SMTP failed'))
    def test_failed_email_delivery_invalidates_challenge(self, send):
        self.login()
        response = self.client.post(reverse('account-security'), {'action': 'email', 'email': 'new@example.com', 'password': 'Initial-secret-834!'})
        self.assertContains(response, 'could not send')
        challenge=EmailVerification.objects.get(user=self.owner)
        self.assertIsNone(challenge.sent_at)
        self.assertIsNotNone(challenge.used_at)

    def test_avatar_is_validated_sanitized_and_protected(self):
        self.login()
        image = BytesIO()
        Image.new('RGB', (24, 24), '#28513b').save(image, 'PNG')
        with tempfile.TemporaryDirectory(dir=settings.BASE_DIR / 'work', prefix='profile-test-') as folder, override_settings(MEDIA_ROOT=folder):
            from pathlib import Path
            self.assertTrue(Path(folder).resolve().is_relative_to((settings.BASE_DIR / 'work').resolve()))
            response = self.client.post(reverse('profile-edit'), {'profile_revision': '0', 'display_name': 'A pen name', 'bio': 'A bio', 'avatar': SimpleUploadedFile('photo.png', image.getvalue(), content_type='image/png')})
            self.assertEqual(response.status_code, 302)
            self.owner.profile.refresh_from_db()
            change = self.owner.profile.changes.get()
            self.assertFalse(self.owner.profile.avatar)
            with Image.open(change.avatar.path) as picture:
                self.assertLessEqual(max(picture.size), 512)
                self.assertEqual(picture.format, 'JPEG')
            avatar_url = reverse('profile-change-media', args=[change.pk, 'avatar'])
            avatar_response = self.client.get(avatar_url)
            self.assertEqual(avatar_response.status_code, 200)
            avatar_response.close()
            self.assertEqual(Client().get(avatar_url).status_code, 302)
        response = self.client.post(reverse('profile-edit'), {'display_name': 'Name', 'bio': 'Bio', 'avatar': SimpleUploadedFile('attack.svg', b'<svg></svg>', content_type='image/svg+xml')})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.context['form'].errors)

    def test_admin_activity_is_logged_without_secrets(self):
        self.login(self.admin)
        self.client.get(reverse('team-home'))
        entry = AuditLog.objects.filter(action='admin.page_viewed').first()
        self.assertEqual(entry.target_id, 'team-home')
        self.assertNotIn('password', str(entry.details))
        self.assertContains(self.client.get(reverse('team-audit')), 'Opened Team workspace')


    def test_maintenance_changes_are_mirrored_without_field_values(self):
        from django.contrib.admin.models import LogEntry, CHANGE
        from django.contrib.contenttypes.models import ContentType
        LogEntry.objects.create(user=self.admin, content_type=ContentType.objects.get_for_model(self.post), object_id=str(self.post.pk), object_repr='Private object label', action_flag=CHANGE, change_message='[{"changed":{"fields":["Title","Description"]}}]')
        entry = AuditLog.objects.get(action='maintenance.changed')
        self.assertEqual(entry.target_id, str(self.post.pk))
        self.assertEqual(entry.details['fields'], ['Title', 'Description'])
        self.assertNotIn('Private object label', str(entry.details))

    def test_secure_receipt_suppresses_referrer(self):
        item = MembershipApplication.objects.create(email='receipt@example.com', display_name='Receipt', introduction='Private')
        response = self.client.get(reverse('application-status', args=[item.tracking_token]), secure=True)
        self.assertEqual(response['Referrer-Policy'], 'no-referrer')

    def test_developers_have_distinct_editorial_copy_and_preserve_bios(self):
        self.login(self.viewer)
        responses = []
        for name in ('Ashish Maurya', 'Rudransh Shukla'):
            person, _ = Contributor.objects.get_or_create(name=name, defaults={'role': 'Developer'})
            person.bio = 'My approved introduction.'
            person.save()
            response = self.client.get(reverse('contributor-view', args=[person.pk]))
            self.assertContains(response, 'My approved introduction.')
            self.assertContains(response, 'not verified contributions')
            responses.append(response.context['developer_copy'])
        self.assertNotEqual(responses[0]['handwritten'], responses[1]['handwritten'])
        self.assertNotEqual(responses[0]['projects'], responses[1]['projects'])

    def test_writer_excerpt_uses_snapshot_not_mutable_draft_and_escapes_text(self):
        from .models import Submission, SubmissionSnapshot
        submission = Submission.objects.create(owner=self.owner, section='articles', title='A shared piece', summary='Summary', body='Private unfinished text')
        SubmissionSnapshot.objects.create(submission=submission, revision=1, title='A shared piece', summary='Summary', body='**An approved line.**\n\n<script>literal text</script>', section='articles', language='en')
        self.post.submission = submission
        self.post.save()
        self.login(self.viewer)
        response = self.client.get(reverse('profile-view', args=[self.owner.profile.public_ref]))
        self.assertContains(response, 'An approved line.')
        self.assertContains(response, '&lt;script&gt;literal text&lt;/script&gt;')
        self.assertNotContains(response, 'Private unfinished text')
        self.assertContains(response, reverse('article', args=[self.post.pk]))
        self.assertContains(response, 'Read the piece for full author credits')

    def test_private_anonymous_and_sensitive_work_is_not_excerpted(self):
        from .models import Submission, SubmissionSnapshot
        submission = Submission.objects.create(owner=self.owner, section='articles', title='A sensitive piece', summary='Summary', body='Private draft')
        snapshot = SubmissionSnapshot.objects.create(submission=submission, revision=1, title='A sensitive piece', summary='Summary', body='Sensitive approved line.', content_warning='Sensitive content', section='articles', language='en')
        self.post.submission = submission
        self.post.save()
        self.login(self.viewer)
        url = reverse('profile-view', args=[self.owner.profile.public_ref])
        self.assertNotContains(self.client.get(url), 'Sensitive approved line.')
        snapshot.content_warning = ''
        snapshot.save()
        PostCredit.objects.filter(post=self.post).update(anonymous=True)
        self.assertNotContains(self.client.get(url), 'Sensitive approved line.')
        PostCredit.objects.filter(post=self.post).update(anonymous=False)
        self.post.is_published = False
        self.post.save()
        self.assertNotContains(self.client.get(url), 'Sensitive approved line.')

    def test_legacy_writer_excerpt_omits_byline_and_links_published_piece(self):
        from .profile_copy import writing_excerpt
        legacy = LandingContent.objects.create(pk=1001, title='Just One More Scroll', section='articles', is_published=True)
        excerpt = writing_excerpt(LandingContent.objects.filter(pk=legacy.pk))
        self.assertIn('It usually starts innocently.', excerpt['text'])
        self.assertNotIn('author_links', excerpt['text'])
        self.assertLessEqual(len(excerpt['text']), 240)
        self.assertEqual(excerpt['url'], reverse('article', args=[legacy.pk]))
