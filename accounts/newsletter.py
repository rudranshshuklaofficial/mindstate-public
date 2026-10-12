from datetime import datetime,time,timedelta
from zoneinfo import ZoneInfo
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q,Count
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils import timezone
from .models import NewsletterSubscription,NewsletterSchedule,NewsletterDelivery,PostRead
from .community_services import eligible,queue_notice,deliver_notice
from .visibility import visible_posts
from alpha.models import LandingContent

ZONE=ZoneInfo('Asia/Calcutta')
KINDS=('weekly','writer_weekly')

def post_url(post,base):
    import re
    path=post.link_url if post.section=='art' and re.fullmatch(r'/app/art/[a-zA-Z0-9_-]+/',post.link_url or '') else reverse('article',args=[post.pk])
    return base.rstrip('/')+path

def period_dates(kind,now):
    local=now.astimezone(ZONE)
    if 'monthly' in kind:
        start=local.date().replace(day=1); previous=(start-timedelta(days=1)).replace(day=1)
    else:
        start=local.date()-timedelta(days=local.weekday());previous=start-timedelta(days=7)
    return start,previous

def published_for(member):
    return visible_posts(LandingContent.objects.filter(is_published=True)).filter(Q(submission__owner=member)|Q(profile_credits__contributor__profile__user=member)).distinct()

def writer_active(member,now):
    return eligible(member) and published_for(member).filter(published_at__gte=now.astimezone(ZONE).date()-timedelta(weeks=5)).exists()

def delivery_eligible(delivery):
    if delivery.kind not in KINDS:return False
    if delivery.kind.startswith('writer_'):return writer_active(delivery.member,timezone.now())
    sub=delivery.subscription
    if sub and not sub.member_id:
        owners=get_user_model().objects.filter(email__iexact=sub.email)
        if any(not eligible(owner) for owner in owners):return False
    return bool(sub and sub.verified_at and not sub.opted_out_at and getattr(sub,delivery.kind,False) and (not sub.member_id or (eligible(sub.member) and sub.email.lower()==sub.member.email.lower())))

def content_for(kind,member,now,base,delivery=None):
    end,start=period_dates(kind,now)
    all_posts=visible_posts(LandingContent.objects.filter(is_published=True))
    new=all_posts.filter(published_at__gte=start,published_at__lt=end).order_by('-published_at','pk')
    read_counts=PostRead.objects.filter(day__gte=start,day__lt=end).values('post_id').annotate(total=Count('pk')).order_by('-total','post_id')
    top_ids=list(read_counts.values_list('post_id',flat=True)[:6])
    top_lookup={p.pk:p for p in all_posts.filter(pk__in=top_ids)}
    top=[top_lookup[pk] for pk in top_ids if pk in top_lookup]
    for post in top:post.period_reads=next((row['total'] for row in read_counts if row['post_id']==post.pk),0)
    own=published_for(member) if member else all_posts.none()
    own_reads=PostRead.objects.filter(post__in=own,day__gte=start,day__lt=end).count() if member else None
    from urllib.parse import urljoin
    for post in list(new[:10])+top+list(own[:5]):
        if post.image_url:post.image_url=urljoin(base,post.image_url)
    data={'writer':kind.startswith('writer_'),'kind':kind,'period_start':start,'period_end':end-timedelta(days=1),'new_posts':list(new.filter(section='articles')[:6]),'art_posts':list(new.filter(section='art')[:4]),'top_posts':top,'own_posts':list(own.order_by('-view_count')[:5]),'own_reads':own_reads,'base':base.rstrip('/'),'edition_url':base.rstrip('/')+reverse('newsletter-edition',args=[delivery.web_token]) if delivery else '', 'unsubscribe_url':base.rstrip('/')+reverse('newsletter-unsubscribe',args=[delivery.subscription.token]) if delivery and delivery.subscription_id and not kind.startswith('writer_') else ''}
    for post in data['new_posts']+data['art_posts']+data['top_posts']+data['own_posts']:
        if post.image_url:post.image_url=urljoin(base,post.image_url)
    candidates=list(own.order_by('-view_count','pk')) if data['writer'] else list(new)+top+list(all_posts.order_by('-published_at','pk'))
    featured=[];seen=set()
    for post in candidates:
        if post.pk in seen or not post.image_url:continue
        from .newsletter_artwork import photo_url
        seen.add(post.pk);post.image_url=photo_url(urljoin(base,post.image_url));post.newsletter_url=post_url(post,base)
        featured.append(post)
        if len(featured)==5:break
    data['featured_posts']=featured
    for post in data['own_posts']:post.newsletter_url=post_url(post,base)
    return data

def refresh_delivery(delivery,now,base):
    data=content_for(delivery.kind,delivery.member,now,base,delivery)
    from .newsletter_artwork import mail_html
    html,_=mail_html(data)
    text=render_to_string('accounts/newsletter-email.txt',data)
    delivery.notice.html=html;delivery.notice.body=text;delivery.notice.save(update_fields=['html','body'])

def run_newsletters(now=None,deliver=False):
    now=now or timezone.now();base=getattr(settings,'MINDSTATE_SITE_URL','http://localhost:3000')
    queued=0
    for kind in KINDS:
        schedule,_=NewsletterSchedule.objects.get_or_create(kind=kind)
        if not schedule.enabled:continue
        start,_=period_dates(kind,now)
        due=datetime.combine(start,time(schedule.hour),tzinfo=ZONE)
        due+=timedelta(days=schedule.month_day-1 if 'monthly' in kind else schedule.weekday)
        if now<due:continue
        recipients=get_user_model().objects.filter(is_active=True) if kind.startswith('writer_') else NewsletterSubscription.objects.select_related('member').filter(verified_at__isnull=False,opted_out_at__isnull=True,**{kind:True})
        for recipient in recipients:
            member=recipient if kind.startswith('writer_') else recipient.member
            if kind.startswith('writer_') and not writer_active(member,now):continue
            if not kind.startswith('writer_') and member and (not eligible(member) or member.email.lower()!=recipient.email.lower()):continue
            email=member.email if kind.startswith('writer_') else recipient.email
            key=f'newsletter:{kind}:{start.isoformat()}:{"member" if kind.startswith("writer_") else "subscription"}:{recipient.pk}'
            with transaction.atomic():
                notice=queue_notice(email,'MindState · '+kind.replace('_',' ').title(),'Preparing your edition.',key)
                edition,created=NewsletterDelivery.objects.get_or_create(key=key,defaults={'kind':kind,'period':start.isoformat(),'subscription':None if kind.startswith('writer_') else recipient,'member':member,'notice':notice})
                if created:refresh_delivery(edition,now,base);queued+=1
            if not delivery_eligible(edition):continue
            if deliver and not notice.sent_at:
                # Recheck immediately before every attempt; opt-outs and bans win.
                edition=NewsletterDelivery.objects.select_related('subscription__member','member','notice').get(pk=edition.pk)
                if delivery_eligible(edition):refresh_delivery(edition,now,base);deliver_notice(notice.pk)
    return queued
