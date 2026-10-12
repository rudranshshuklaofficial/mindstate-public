from django.core.management.base import BaseCommand,CommandError
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django.urls import reverse
from accounts.newsletter import content_for,post_url
from accounts.newsletter_artwork import mail_html,attach_parts,canvas_for,NewsletterEmail,photo_url
from accounts.visibility import visible_posts
from alpha.models import LandingContent
from pathlib import Path

class Command(BaseCommand):
    help='Send one labelled weekly artwork test to team, or the explicitly authorized demo address.'
    def add_arguments(self,parser):
        parser.add_argument('--demo-rudransh',action='store_true')
        parser.add_argument('--prepare-only',action='store_true')
    def handle(self,*args,**options):
        demo=options['demo_rudransh'];recipient='rudranshshukla2211@gmail.com' if demo else 'team@mindstate.space'
        base='https://mindstate.space'
        data=content_for('weekly',None,timezone.now(),base)
        if demo:
            posts=list(visible_posts(LandingContent.objects.filter(is_published=True)).exclude(image_url='').order_by('?')[:5])
            for post in posts:post.newsletter_url=post_url(post,base);post.image_url=photo_url(post.image_url)
            data['featured_posts']=posts;data['demo']=True
        try:
            html,cells=mail_html(data)
            folder=Path(settings.BASE_DIR)/'work/newsletter-v6';folder.mkdir(parents=True,exist_ok=True)
            canvas_for(data).save(folder/'demo-preview.jpg',quality=94)
            (folder/'demo-email.html').write_text(html,encoding='utf-8')
            (folder/'demo-post-ids.txt').write_text(','.join(str(p.pk) for p in data['featured_posts']))
            if options['prepare_only']:
                self.stdout.write('Demo artwork prepared. No email sent.');return
            text='[DEMO] MindState weekly newsletter design test.\n\n'+render_to_string('accounts/newsletter-email.txt',data)
            message=NewsletterEmail('[DEMO] MindState · Posts of the Week',text,settings.DEFAULT_FROM_EMAIL,[recipient])
            message.attach_alternative(html,'text/html');attach_parts(message,cells)
            if message.send()!=1:raise OSError('SMTP did not accept the message')
        except Exception as error:raise CommandError('Newsletter demo failed: '+str(error)) from None
        self.stdout.write('SMTP accepted one labelled weekly demo for '+recipient+'. Inbox arrival has not been independently checked.')
