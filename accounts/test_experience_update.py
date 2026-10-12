from datetime import timedelta
from io import BytesIO
import tempfile
from unittest.mock import patch
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from django_otp import DEVICE_ID_SESSION_KEY
from django_otp.plugins.otp_totp.models import TOTPDevice
from PIL import Image
from alpha.models import LandingContent
from .models import Submission, ReferralLink, ReferralAttribution, PostRead, ReviewNotice


@override_settings(ALLOWED_HOSTS=['testserver'], PRIVATE_MEDIA_READY=True, EMAIL_DELIVERY_ENABLED=False, PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'], STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class ExperienceUpdateTests(TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(dir=settings.BASE_DIR/'work')
        self.addCleanup(self.temp.cleanup)
        storage=override_settings(MEDIA_ROOT=self.temp.name);storage.enable();self.addCleanup(storage.disable)
        self.creator=get_user_model().objects.create_user('maker','maker@example.invalid','Test-secret-391!')
        self.reader=get_user_model().objects.create_user('reader','reader@example.invalid','Test-secret-391!')
        self.admin=get_user_model().objects.create_user('reviewer','reviewer@example.invalid','Test-secret-391!')
        self.admin.groups.add(Group.objects.get(name='admin'))

    def login(self,user):
        self.client.force_login(user)
        device,_=TOTPDevice.objects.get_or_create(user=user,name='test',defaults={'confirmed':True})
        session=self.client.session;session[DEVICE_ID_SESSION_KEY]=device.persistent_id;session.save()

    def image(self):
        data=BytesIO();Image.new('RGB',(40,30),'green').save(data,'PNG')
        return SimpleUploadedFile('picture.png',data.getvalue(),content_type='image/png')

    def make_draft(self):
        self.login(self.creator)
        response=self.client.post(reverse('submission-new'),{'section':'articles','language':'en','action':'save_draft'})
        self.assertEqual(response.status_code,302)
        return Submission.objects.get(owner=self.creator)

    def publish(self):
        item=self.make_draft()
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'section':'articles','language':'en','title':'A quiet moment','summary':'A little introduction','body':'# A beginning\n\nA **thoughtful** story.','featured_image':self.image(),'version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302);item.refresh_from_db();self.assertEqual(item.status,'pending')
        self.login(self.admin)
        self.assertEqual(self.client.post(reverse('review-detail',args=[item.pk]),{'decision':'approve','note':'Ready','version':item.updated_at.isoformat()}).status_code,302)
        item.refresh_from_db();return item,item.live_content

    def test_incomplete_drafts_are_private_and_do_not_enter_review(self):
        item=self.make_draft();self.assertEqual(item.title,'Untitled draft');self.assertEqual(item.status,'draft')
        self.assertFalse(LandingContent.objects.filter(submission=item).exists());self.assertFalse(ReviewNotice.objects.exists())
        self.assertContains(self.client.get(reverse('drafts')),item.title)
        self.login(self.reader)
        self.assertNotContains(self.client.get(reverse('drafts')),item.title)
        self.assertEqual(self.client.get(reverse('submission-edit',args=[item.pk])).status_code,404)
        self.assertEqual(self.client.get(reverse('submission-detail',args=[item.pk])).status_code,403)
        self.login(self.admin);self.assertEqual(self.client.get(reverse('review-detail',args=[item.pk])).status_code,404)
        self.assertNotContains(self.client.get(reverse('review-queue')),item.title)

    def test_send_draft_requires_complete_fields_and_featured_image(self):
        item=self.make_draft()
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'section':'articles','language':'en','version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,200);item.refresh_from_db();self.assertEqual(item.status,'draft')
        self.assertContains(response,'A featured image is needed')

    def test_published_revision_saved_as_draft_keeps_live_snapshot(self):
        item,post=self.publish();self.login(self.creator)
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'action':'save_draft','section':'articles','language':'en','title':'Still shaping this','version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302);item.refresh_from_db();post.refresh_from_db()
        self.assertEqual(item.status,'draft');self.assertEqual(item.revision,2);self.assertEqual(post.title,'A quiet moment')
        self.assertContains(self.client.get(post.link_url),'A quiet moment')
        self.assertNotContains(self.client.get(post.link_url),'Still shaping this')

    def test_reads_are_daily_deduplicated_and_exclude_owner_head_and_prefetch(self):
        item,post=self.publish();self.login(self.creator);self.client.get(post.link_url)
        self.login(self.reader);self.client.head(post.link_url);self.client.get(post.link_url,HTTP_SEC_PURPOSE='prefetch')
        post.refresh_from_db();self.assertEqual(post.view_count,0)
        self.client.get(post.link_url);self.client.get(post.link_url);post.refresh_from_db();self.assertEqual(post.view_count,1)
        tomorrow=timezone.localdate()+timedelta(days=1)
        with patch('accounts.experience.timezone.localdate',return_value=tomorrow):self.client.get(post.link_url)
        post.refresh_from_db();self.assertEqual(post.view_count,2);self.assertEqual(PostRead.objects.filter(post=post).count(),2)
        self.login(self.creator);self.assertContains(self.client.get(reverse('my-profile'),follow=True),'<strong>2</strong> Views',html=False)

    def test_referral_is_reusable_attributed_and_never_assigns_roles(self):
        self.login(self.admin);self.client.post(reverse('referral-new'));link=ReferralLink.objects.get()
        for index in range(2):
            self.client.logout();self.client.get(reverse('apply')+'?ref='+str(link.token))
            response=self.client.post(reverse('signup'),{'username':f'new{index}','email':f'new{index}@example.invalid','display_name':'A new member','password1':'Brand-new-secret-391!','password2':'Brand-new-secret-391!','age_confirmation':'on'})
            self.assertEqual(response.status_code,302)
            user=get_user_model().objects.get(username=f'new{index}');self.assertFalse(user.groups.exists())
            self.assertEqual(user.referral_attribution.link,link)
        self.assertEqual(ReferralAttribution.objects.filter(link=link).count(),2)
        self.login(self.admin);self.client.post(reverse('referral-revoke',args=[link.pk]));self.client.logout()
        self.client.get(reverse('apply')+'?ref='+str(link.token));self.assertNotIn('team_referral',self.client.session)

    def test_new_pages_and_profile_filters(self):
        self.login(self.reader)
        self.assertEqual(self.client.get(reverse('art-gallery')).status_code,200)
        self.assertNotContains(self.client.get(reverse('art-gallery')),'Main navigation')
        self.assertEqual(self.client.post(reverse('referral-new')).status_code,403)
        self.login(self.admin)
        self.assertContains(self.client.get(reverse('profile-reviews')+'?status=approved&q=nobody'),'No profiles match')

    def test_image_removal_saves_and_draft_media_remains_owner_only(self):
        item=self.make_draft()
        self.client.post(reverse('submission-edit',args=[item.pk]),{'action':'save_draft','section':'articles','language':'en','featured_image':self.image(),'image_2':self.image(),'version':item.updated_at.isoformat()})
        item.refresh_from_db()
        self.assertTrue(item.featured_image);self.assertTrue(item.image_2)
        self.login(self.admin)
        self.assertEqual(self.client.get(reverse('submission-media',args=[item.pk,'pending','featured'])).status_code,403)
        self.login(self.creator)
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'action':'save_draft','section':'articles','language':'en','featured_image-clear':'on','image_2-clear':'on','version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302);item.refresh_from_db()
        self.assertFalse(item.featured_image);self.assertFalse(item.image_2)


    def test_approved_typography_stays_live_during_unapproved_revision(self):
        item=self.make_draft()
        response=self.client.post(reverse('submission-edit',args=[item.pk]),{'section':'articles','language':'en','title':'A book page','summary':'A short page','body':'A paragraph to read.','reading_font':'mono','reading_size':'large','image_credit':'Original photograph by the contributor','featured_image':self.image(),'version':item.updated_at.isoformat()})
        self.assertEqual(response.status_code,302);item.refresh_from_db()
        self.login(self.admin)
        self.assertEqual(self.client.post(reverse('review-detail',args=[item.pk]),{'decision':'approve','note':'Ready','version':item.updated_at.isoformat()}).status_code,302)
        item.refresh_from_db();self.assertEqual(item.snapshots.first().reading_font,'mono');self.assertEqual(item.snapshots.first().image_credit,'Original photograph by the contributor')
        self.assertContains(self.client.get(item.live_content.link_url),'data-published-font="mono"')
        self.assertContains(self.client.get(item.live_content.link_url),'Original photograph by the contributor')
        self.login(self.creator)
        self.assertEqual(self.client.post(reverse('submission-edit',args=[item.pk]),{'action':'save_draft','section':'articles','language':'en','title':'New page','reading_font':'serif','reading_size':'larger','version':item.updated_at.isoformat()}).status_code,302)
        self.assertContains(self.client.get(item.live_content.link_url),'data-published-font="mono"')

    def test_theme_changes_immediately_without_review_or_other_profile_changes(self):
        from .models import ProfileChange
        self.login(self.creator)
        response=self.client.post(reverse('profile-theme'),{'theme':'collage','display_name':'Unreviewed name'})
        self.assertEqual(response.status_code,302)
        self.creator.profile.refresh_from_db()
        self.assertEqual(self.creator.profile.theme,'collage')
        self.assertEqual(self.creator.profile.display_name,'')
        self.assertFalse(ProfileChange.objects.filter(profile=self.creator.profile).exists())
        self.assertEqual(self.client.post(reverse('profile-theme'),{'theme':'invalid'}).status_code,400)
        self.assertContains(self.client.get(reverse('profile-view',args=[self.creator.profile.public_ref])),'theme-collage')

    def test_folio_image_is_reviewed_and_member_card_is_private(self):
        from .models import ProfileChange
        self.login(self.creator)
        self.assertEqual(self.client.post(reverse('profile-edit'),{'profile_revision':'0','display_name':'Maker','bio':'An artist','folio_image':self.image()}).status_code,302)
        change=ProfileChange.objects.get(profile=self.creator.profile)
        self.creator.profile.refresh_from_db()
        self.assertFalse(self.creator.profile.folio_image)
        self.assertContains(self.client.get(reverse('member-card')),'Maker',status_code=200) if self.creator.profile.display_name else self.assertContains(self.client.get(reverse('member-card')),'MindState member')
        self.client.post(reverse('profile-theme'),{'theme':'linen'})
        self.login(self.admin)
        self.assertContains(self.client.get(reverse('profile-review',args=[change.pk])),'Closing scrapbook image')
        self.assertEqual(self.client.post(reverse('profile-review',args=[change.pk]),{'decision':'approve','note':'Looks good'}).status_code,302)
        self.creator.profile.refresh_from_db()
        self.assertTrue(self.creator.profile.folio_image)
        self.assertEqual(self.creator.profile.theme,'linen')
        image_response=self.client.get(reverse('profile-folio-image',args=[self.creator.profile.public_ref]))
        self.assertEqual(image_response.status_code,200)
        image_response.close()
        self.client.logout()
        self.assertEqual(self.client.get(reverse('member-card')).status_code,302)

    def test_closing_image_removal_requires_approval_and_preserves_theme(self):
        from .models import ProfileChange
        profile = self.creator.profile
        profile.folio_image.save('approved.png', self.image())
        original = profile.folio_image.name
        self.login(self.creator)
        response = self.client.post(reverse('profile-edit'), {'profile_revision':'0', 'display_name': 'Maker', 'bio': 'A note', 'remove_folio_image': 'on'})
        self.assertEqual(response.status_code, 302)
        change = ProfileChange.objects.get(profile=profile)
        profile.refresh_from_db()
        self.assertEqual(profile.folio_image.name, original)
        self.assertTrue(change.remove_folio_image)
        self.client.post(reverse('profile-theme'), {'theme': 'collage'})
        self.login(self.admin)
        self.assertContains(self.client.get(reverse('profile-review', args=[change.pk])), 'Removal requested')
        self.client.post(reverse('profile-review', args=[change.pk]), {'decision': 'approve', 'note': 'Requested removal'})
        profile.refresh_from_db()
        self.assertFalse(profile.folio_image)
        self.assertEqual(profile.theme, 'collage')

    def test_declined_closing_replacement_keeps_approved_image(self):
        from .models import ProfileChange
        profile = self.creator.profile
        profile.folio_image.save('approved.png', self.image())
        original = profile.folio_image.name
        self.login(self.creator)
        self.client.post(reverse('profile-edit'), {'profile_revision':'0', 'display_name': 'Maker', 'bio': '', 'folio_image': self.image()})
        change = ProfileChange.objects.get(profile=profile)
        self.login(self.reader)
        self.assertEqual(self.client.get(reverse('profile-change-media', args=[change.pk, 'folio_image'])).status_code, 403)
        self.login(self.admin)
        self.client.post(reverse('profile-review', args=[change.pk]), {'decision': 'decline', 'note': 'Please choose another image'})
        profile.refresh_from_db()
        self.assertEqual(profile.folio_image.name, original)

    def test_member_card_uses_confirmed_roles_and_cannot_edit_profile(self):
        from .models import Contributor, ProfileChange
        Contributor.objects.create(name='Confirmed maker', profile=self.creator.profile, role='Artist')
        self.creator.groups.add(Group.objects.get(name='editorial'))
        self.login(self.creator)
        response = self.client.get(reverse('member-card'))
        self.assertContains(response, 'Editorial, Artist')
        self.assertContains(response, 'Illustrated avatar')
        self.assertContains(response, 'Sticker collection')
        self.assertContains(response, 'data-logo=')
        self.assertFalse(ProfileChange.objects.filter(profile=self.creator.profile).exists())

    def test_contribution_reference_uses_real_shared_components(self):
        self.login(self.creator)
        self.assertContains(self.client.get(reverse('contribute')), reverse('design-system'))
        response = self.client.get(reverse('design-system'))
        for heading in ['Notebook &amp; writing tools', 'Reader controls', 'Review decision', 'Draft shelf card', 'Dependencies', 'Profile statistics']:
            self.assertContains(response, heading)
        self.assertContains(response, 'templates/accounts/submission-form.html')
        self.assertContains(response, 'data-copy-component')
