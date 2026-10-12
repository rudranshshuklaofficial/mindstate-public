from datetime import datetime
from tempfile import TemporaryDirectory
from django.test import TestCase,override_settings
from django.core import mail
from django.core.management import call_command
from django.template.loader import render_to_string
from accounts.newsletter import KINDS,ZONE,content_for,run_newsletters,delivery_eligible
from accounts.newsletter_artwork import mail_html
from accounts.models import NewsletterSchedule,NewsletterSubscription,NewsletterDelivery,CommunityNotice
from alpha.models import LandingContent

@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',STORAGES={'default':{'BACKEND':'django.core.files.storage.FileSystemStorage'},'staticfiles':{'BACKEND':'django.contrib.staticfiles.storage.StaticFilesStorage'}})
class WeeklyArtworkTests(TestCase):
    def setUp(self):
        self.now=datetime(2026,10,12,10,tzinfo=ZONE)
        for i in range(5):LandingContent.objects.create(title='Featured '+str(i),image_url='/static/ChatgptImageSep19202611_28_00Pm2.png',section='articles',is_published=True,published_at='2026-10-10')
        LandingContent.objects.create(title='Private draft',image_url='/static/ChatgptImageSep19202611_28_00Pm2.png',is_published=False)
    def test_five_photos_and_original_web_slots_link_to_matching_posts(self):
        data=content_for('weekly',None,self.now,'https://mindstate.space')
        self.assertEqual(len(data['featured_posts']),5)
        html=render_to_string('accounts/newsletter-web.html',data)
        self.assertNotIn('Private draft',html)
        self.assertNotIn('Selected pages from our collection',html)
        self.assertEqual(html.count('<small>Read post</small>'),5)
        for i,post in enumerate(data['featured_posts']):
            self.assertIn('monthly-newsletter__rectangle-'+str(17+i),html)
            self.assertIn('href="'+post.newsletter_url+'"',html)
        self.assertGreaterEqual(html.count('href="https://mindstate.space/"'),2)
    def test_email_uses_seven_cid_cells_with_five_distinct_post_links(self):
        data=content_for('weekly',None,self.now,'https://mindstate.space')
        html,cells=mail_html(data)
        self.assertEqual(len(cells),7)
        self.assertEqual([c['url'] for c in cells[1:6]],[p.newsletter_url for p in data['featured_posts']])
        for cell in cells:self.assertIn('cid:'+cell['cid'],html);self.assertTrue(cell['bytes'].startswith(b'\xff\xd8'))
        self.assertNotIn('position:absolute',html)
        self.assertNotIn('Selected pages from our collection',html)
        self.assertNotIn('Contact the MindState team',html)
        self.assertIn('max-width:720px',html)
        self.assertNotIn('width="720"',html)
        self.assertIn('width="59.333333%"',html)
        self.assertIn('width="40.666667%"',html)
    def test_monthly_schedules_and_retries_cannot_send(self):
        self.assertEqual(KINDS,('weekly','writer_weekly'))
        NewsletterSchedule.objects.create(kind='monthly',enabled=True)
        NewsletterSchedule.objects.create(kind='writer_monthly',enabled=True)
        self.assertEqual(run_newsletters(self.now,deliver=True),0)
        sub=NewsletterSubscription.objects.create(email='confirmed@example.com',verified_at=self.now,monthly=True)
        notice=CommunityNotice.objects.create(key='newsletter:monthly:test',subject='Legacy',body='Legacy',recipient=sub.email)
        delivery=NewsletterDelivery.objects.create(kind='monthly',period='2026-10-01',key='legacy',notice=notice,subscription=sub)
        self.assertFalse(delivery_eligible(delivery))
    def test_authorized_demo_is_one_email_with_inline_images_and_no_enrollment(self):
        with TemporaryDirectory() as folder,override_settings(BASE_DIR=folder):call_command('test_community_mail',demo_rudransh=True)
        self.assertEqual(len(mail.outbox),1)
        self.assertEqual(mail.outbox[0].to,['rudranshshukla2211@gmail.com'])
        self.assertEqual(len(mail.outbox[0].attachments),7)
        self.assertIn('[DEMO]',mail.outbox[0].subject)
        self.assertFalse(NewsletterSubscription.objects.exists())
        mime=mail.outbox[0].message()
        self.assertEqual(mime.get_content_type(),'multipart/alternative')
        branches=list(mime.iter_parts())
        self.assertEqual([part.get_content_type() for part in branches],['text/plain','multipart/related'])
        related=list(branches[1].iter_parts())
        self.assertEqual(related[0].get_content_type(),'text/html')
        self.assertEqual(len(related),8)
        for part in related[1:]:
            self.assertEqual(part.get_content_disposition(),'inline')
            self.assertIsNone(part.get_filename())
        from accounts.newsletter_artwork import newsletter_font
        self.assertIn('Google Sans Flex',newsletter_font(14).getname()[0])

    def test_art_uses_canonical_gallery_post_and_pending_photos_stay_private(self):
        from accounts.newsletter import post_url
        from accounts.newsletter_artwork import local_photo
        from accounts.models import Submission,SubmissionSnapshot
        from django.contrib.auth import get_user_model
        from PIL import Image
        from pathlib import Path
        art=LandingContent(section='art',pk=9999,link_url='/app/art/a-quiet-page/')
        self.assertEqual(post_url(art,'https://mindstate.space'),'https://mindstate.space/app/art/a-quiet-page/')
        with TemporaryDirectory() as folder,override_settings(MEDIA_ROOT=folder):
            Image.new('RGB',(4,4),'red').save(Path(folder)/'approved.png')
            Image.new('RGB',(4,4),'blue').save(Path(folder)/'pending.png')
            member=get_user_model().objects.create_user('newsletter-image-owner')
            item=Submission.objects.create(owner=member,section='art',title='Photo test',featured_image='pending.png')
            SubmissionSnapshot.objects.create(submission=item,revision=1,title='Approved',featured_image='approved.png')
            post=LandingContent(submission=item,image_url=f'/submissions/{item.pk}/media/1/featured/')
            self.assertEqual(local_photo(post).getpixel((0,0)),(255,0,0,255))
            post.image_url=f'/submissions/{item.pk}/media/pending/featured/'
            with self.assertRaises(ValueError):local_photo(post)
