from io import BytesIO
import tempfile

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.files.uploadedfile import SimpleUploadedFile
from django.template import Context, Template
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image

from alpha.models import LandingContent
from .models import Collaboration, CollaborationMember, GuardianConsent, ModeratorOnboarding, PostCredit, Submission


@override_settings(ALLOWED_HOSTS=['testserver'], PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],
                   PRIVATE_MEDIA_READY=True, STORAGES={'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'}, 'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class CollaborationTests(TestCase):
    def setUp(self):
        self.media_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.media_dir.cleanup)
        self.storage_settings = override_settings(MEDIA_ROOT=self.media_dir.name)
        self.storage_settings.enable()
        self.addCleanup(self.storage_settings.disable)
        User = get_user_model()
        self.writer = User.objects.create_user('private_writer_identity', 'writer-private@example.com')
        self.artist = User.objects.create_user('private_artist_identity', 'artist-private@example.com')
        self.other = User.objects.create_user('other_member')
        self.editor = User.objects.create_user('editor')
        self.editor.groups.add(Group.objects.get(name='editorial'))
        self.writer.profile.display_name = 'Secret Writer Name'
        self.writer.profile.save()
        self.artist.profile.display_name = 'Artist Pen Name'
        self.artist.profile.save()
        self.submission = Submission.objects.create(owner=self.writer, section='articles', title='Together', summary='A shared summary', body='A human-written piece.', image_credit='Our own human-drawn work')
        self.submission.featured_image.save('cover.jpg', self.image(), save=True)
        self.collab = Collaboration.objects.create(created_by=self.writer, submission=self.submission, need='art', brief='A short brief')
        self.writer_member = CollaborationMember.objects.create(collaboration=self.collab, user=self.writer, role='writer', anonymous=True)
        self.url = reverse('collaboration-detail', args=[self.collab.pk])

    def image(self):
        output = BytesIO()
        Image.new('RGB', (30, 30), '#28513b').save(output, 'JPEG')
        return SimpleUploadedFile('cover.jpg', output.getvalue(), content_type='image/jpeg')

    def login(self, user):
        self.client.force_login(user)
        device, _ = TOTPDevice.objects.get_or_create(user=user, name='test', defaults={'confirmed': True})
        session = self.client.session
        session[DEVICE_ID_SESSION_KEY] = device.persistent_id
        session.save()

    def action(self, user, action, **data):
        self.login(user)
        self.collab.refresh_from_db()
        return self.client.post(self.url, {'action': action, 'revision': str(self.collab.revision), **data})

    def pair(self):
        self.assertEqual(self.action(self.artist, 'accept').status_code, 302)

    def submit(self):
        self.pair()
        for user in (self.writer, self.artist):
            self.assertEqual(self.action(user, 'confirm', consent='on').status_code, 302)
        self.assertEqual(self.action(self.artist, 'submit').status_code, 302)

    def test_members_only_and_empty_state(self):
        self.assertEqual(self.client.get(reverse('collaboration-space')).status_code, 302)
        self.login(self.other)
        response = self.client.get(reverse('collaboration-space'))
        self.assertContains(response, 'Anonymous writer')
        self.assertNotContains(response, 'Secret Writer Name')
        with override_settings(DEBUG=True):
            response = self.client.get(reverse('collaboration-space') + '?empty=1')
        self.assertContains(response, 'A blank page, full of possibility.')
        self.assertContains(response, 'Empty-state preview')

    def test_create_request_with_anonymity_and_german_language(self):
        self.login(self.other)
        response = self.client.post(reverse('collaboration-new'), {'title': 'Ein Gedicht', 'need': 'writing', 'brief': 'Text for an illustration', 'language': 'de', 'anonymous': 'on', 'image_rights': 'own'})
        self.assertEqual(response.status_code, 302)
        item = Collaboration.objects.exclude(pk=self.collab.pk).get()
        self.assertEqual(item.submission.language, 'de')
        self.assertEqual(item.members.get().role, 'artist')
        self.assertTrue(item.members.get().anonymous)

    def test_accept_pair_limits_and_private_draft(self):
        self.assertContains(self.action(self.writer, 'accept'), 'no longer available')
        self.pair()
        self.assertContains(self.action(self.other, 'accept'), 'no longer available')
        self.login(self.other)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(self.client.get(reverse('collaboration-media', args=[self.collab.pk, 'featured_image'])).status_code, 403)

    def test_proposed_changes_do_not_accept_request(self):
        response = self.action(self.other, 'note', **{'note-body': 'Could we use a warmer palette?'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(self.collab.members.count(), 1)
        self.login(self.writer)
        self.assertContains(self.client.get(self.url), 'Could we use a warmer palette?')

    def test_both_revision_confirmations_and_consent_are_required(self):
        self.pair()
        self.assertContains(self.action(self.writer, 'confirm'), 'consent agreement')
        self.assertEqual(self.action(self.writer, 'confirm', consent='on').status_code, 302)
        self.assertContains(self.action(self.artist, 'submit'), 'Both co-authors must confirm')
        self.assertEqual(self.action(self.artist, 'confirm', consent='on').status_code, 302)
        self.assertEqual(self.action(self.writer, 'submit').status_code, 302)

    def test_edit_resets_confirmations_and_rejects_stale_edits(self):
        self.pair()
        for user in (self.writer, self.artist):
            self.action(user, 'confirm', consent='on')
        self.collab.refresh_from_db()
        old_revision = self.collab.revision
        data = {'section': 'articles', 'title': 'Edited together', 'summary': 'Summary', 'body': 'New body', 'language': 'en', 'image_rights': 'own', 'image_credit': 'Our own work'}
        self.assertEqual(self.action(self.artist, 'edit', **data).status_code, 302)
        self.assertFalse(self.collab.members.exclude(confirmed_revision=0).exists())
        self.login(self.writer)
        response = self.client.post(self.url, {'action': 'edit', 'revision': old_revision, **data, 'title': 'Stale'})
        self.assertContains(response, 'changed in another tab')
        self.submission.refresh_from_db()
        self.assertEqual(self.submission.title, 'Edited together')

    def test_either_member_can_leave_before_first_submission(self):
        self.pair()
        self.assertEqual(self.action(self.writer, 'leave').status_code, 302)
        self.collab.refresh_from_db()
        self.submission.refresh_from_db()
        self.assertEqual(self.submission.owner, self.artist)
        self.assertEqual(self.collab.need, 'writing')
        self.assertEqual(self.collab.members.count(), 1)

    def test_leaving_is_locked_after_submission(self):
        self.submit()
        self.assertContains(self.action(self.artist, 'leave'), 'locked during review')
        self.assertEqual(self.collab.members.count(), 2)

    def test_licensing_and_art_meaning_are_required(self):
        self.pair()
        self.collab.image_rights = 'licensed'
        self.collab.save()
        for user in (self.writer, self.artist):
            self.action(user, 'confirm', consent='on')
        self.assertContains(self.action(self.artist, 'submit'), 'source link, licence and credit')
        self.collab.image_rights = 'own'
        self.collab.save()
        self.submission.section = 'art'
        self.submission.save()
        self.assertContains(self.action(self.artist, 'submit'), 'illustration')

    def test_guardian_permission_and_upload_limits(self):
        GuardianConsent.objects.create(user=self.artist, is_under_16=True, status='pending')
        self.assertRedirects(self.action(self.artist, 'accept'), reverse('consent-status'), fetch_redirect_response=False)
        GuardianConsent.objects.filter(user=self.artist).update(status='given')
        self.pair()
        data = {'section': 'articles', 'title': 'Title', 'summary': 'Summary', 'body': 'Text', 'language': 'en', 'image_rights': 'own'}
        data.update({name: self.image() for name in ('featured_image', 'image_2', 'image_3', 'image_4', 'image_5', 'extra')})
        self.assertContains(self.action(self.artist, 'edit', **data), 'no more than five')

    def test_review_anonymity_and_dual_publication(self):
        self.submit()
        self.login(self.editor)
        response = self.client.get(self.url)
        for private in ('Secret Writer Name', 'private_writer_identity', 'writer-private@example.com', self.writer.profile.public_ref):
            self.assertNotContains(response, private)
        self.assertContains(response, 'Anonymous writer')
        self.assertContains(response, 'Artist Pen Name')
        for decision in ('start', 'approve', 'publish'):
            self.assertEqual(self.action(self.editor, 'review', decision=decision, note='Reviewed the human work and licences.').status_code, 302)
        post = LandingContent.objects.get(submission=self.submission)
        self.assertTrue(post.is_published)
        self.assertEqual(PostCredit.objects.filter(post=post).count(), 2)
        html = Template('{% load member_tags %}{% author_links post %}').render(Context({'post': post}))
        self.assertIn('Anonymous writer', html)
        self.assertNotIn(self.writer.profile.public_ref, html)
        self.assertIn(self.artist.profile.public_ref, html)
        self.assertContains(self.action(self.artist, 'edit'), 'locked during review')

    def test_self_review_unauthorized_review_and_demo_publish_are_blocked(self):
        self.submit()
        self.assertEqual(self.action(self.other, 'review', decision='start').status_code, 403)
        self.writer.groups.add(Group.objects.get(name='editorial'))
        self.assertEqual(self.action(self.writer, 'review', decision='start').status_code, 403)
        self.collab.is_demo = True
        self.collab.save()
        for decision in ('start', 'approve'):
            self.action(self.editor, 'review', decision=decision)
        self.assertContains(self.action(self.editor, 'review', decision='publish'), 'Demo collaborations')
        self.assertFalse(LandingContent.objects.filter(submission=self.submission).exists())

    def test_changes_requested_requires_new_agreements(self):
        self.submit()
        self.assertEqual(self.action(self.editor, 'review', decision='changes', note='Please clarify the ending.').status_code, 302)
        self.assertContains(self.action(self.artist, 'submit'), 'Both co-authors must confirm')
        self.assertFalse(self.collab.members.exclude(confirmed_revision=0).exists())

    def test_legacy_submission_routes_do_not_bypass_collaboration_privacy(self):
        self.submit()
        self.login(self.other)
        response = self.client.get(reverse('submission-detail', args=[self.submission.pk]), follow=True)
        self.assertEqual(response.status_code, 403)
        admin = get_user_model().objects.create_user('legacy_admin')
        admin.groups.add(Group.objects.get(name='admin'))
        self.login(admin)
        response = self.client.get(reverse('review-detail', args=[self.submission.pk]), follow=True)
        self.assertNotContains(response, 'Secret Writer Name')
        self.assertNotContains(self.client.get(reverse('review-queue')), 'Together')

    @override_settings(APPROVED_GUIDELINES_VERSION='collaboration-test')
    def test_onboarded_moderator_can_review_without_anonymous_identity(self):
        self.submit()
        self.other.groups.add(Group.objects.get(name='moderator'))
        self.assertEqual(self.action(self.other, 'review', decision='start').status_code, 403)
        ModeratorOnboarding.objects.create(user=self.other, guidelines_version_read='collaboration-test',
            read_at=timezone.now(), first_review_with=self.editor, approved_by=self.editor, approved_at=timezone.now())
        self.login(self.other)
        response = self.client.get(self.url)
        self.assertContains(response, 'Review joint work')
        self.assertNotContains(response, 'Secret Writer Name')
        self.assertNotContains(response, 'private_writer_identity')
        self.assertEqual(self.action(self.other, 'review', decision='start').status_code, 302)

    def test_validated_upload_preview_and_removal_use_private_routes(self):
        self.pair()
        data = {'section': 'articles', 'title': 'Title', 'summary': 'Summary', 'body': 'Text', 'language': 'en', 'image_rights': 'own', 'image_credit': 'Original human-drawn images', 'image_2': self.image()}
        self.assertEqual(self.action(self.artist, 'edit', **data).status_code, 302)
        self.login(self.artist)
        response = self.client.get(self.url)
        self.assertContains(response, reverse('collaboration-media', args=[self.collab.pk, 'image_2']))
        self.assertNotContains(response, '/media/submissions/')
        data.pop('image_2')
        data['image_2-clear'] = 'on'
        self.assertEqual(self.action(self.writer, 'edit', **data).status_code, 302)
        self.submission.refresh_from_db()
        self.assertFalse(self.submission.image_2)
