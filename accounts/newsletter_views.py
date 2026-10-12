from django.core.paginator import Paginator
from django import forms
from django.conf import settings
from django.contrib import messages
from django.core import signing
from django.core.mail import send_mail
from django.http import Http404
from django.shortcuts import render,redirect,get_object_or_404
from django.urls import reverse
from django.utils import timezone
from .models import NewsletterSubscription,NewsletterSchedule,NewsletterDelivery
from .community_services import enroll,eligible
from .community_views import form_page
from .services import allow_attempt,audit
from .policy import admin_required,is_admin
from .newsletter import KINDS,content_for,period_dates
from django.contrib.auth.decorators import login_required

class SubscribeForm(forms.Form):email=forms.EmailField()
class ScheduleForm(forms.Form):
    kind=forms.ChoiceField(choices=[(k,k.replace('_',' ').title()) for k in KINDS])
    enabled=forms.BooleanField(required=False)
    hour=forms.IntegerField(min_value=0,max_value=23,initial=9,label='Hour in Asia/Calcutta')
    weekday=forms.ChoiceField(choices=list(enumerate(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])))

def subscribe(request):
    form=SubscribeForm(request.POST or None)
    if request.method=='POST' and form.is_valid():
        if not allow_attempt(request,'newsletter-subscribe',5,3600):form.add_error(None,'Please wait before trying again.')
        else:
            email=form.cleaned_data['email'].strip().lower()
            token=signing.dumps(email,salt='newsletter-confirm')
            link=request.build_absolute_uri(reverse('newsletter-confirm',args=[token]))
            try:
                if send_mail('Confirm your MindState newsletter subscription','Confirm your weekly catchups:\n'+link+'\nThis link expires in 24 hours. Ignore it if you did not subscribe.',settings.DEFAULT_FROM_EMAIL,[email])!=1:raise OSError()
                messages.success(request,'Check your email to confirm. The link expires in 24 hours.')
                return redirect('newsletter-subscribe')
            except Exception:form.add_error(None,'Delivery failed. Check the address and try again later.')
    return form_page(request,'A little MindState in your inbox',form,'Send confirmation','Weekly catchups. You can unsubscribe at any time.')

def confirm(request,token):
    try:email=signing.loads(token,salt='newsletter-confirm',max_age=86400)
    except signing.BadSignature:raise Http404
    if request.method=='POST':
        sub,_=NewsletterSubscription.objects.get_or_create(email=email)
        sub.verified_at=timezone.now();sub.opted_out_at=None;sub.weekly=True;sub.monthly=False;sub.save()
        request.session['newsletter_confirmed']=True
        messages.success(request,'Your newsletter subscription is confirmed.')
        return redirect('newsletter-subscribe')
    return render(request,'accounts/newsletter-choice.html',{'title':'Confirm your subscription','description':'Receive weekly MindState catchups. You can unsubscribe in every edition.','button':'Confirm subscription'})

def unsubscribe(request,token):
    sub=get_object_or_404(NewsletterSubscription,token=token)
    if request.method=='POST':
        sub.opted_out_at=timezone.now();sub.weekly=False;sub.monthly=False;sub.save()
        return render(request,'accounts/newsletter-choice.html',{'title':'You are unsubscribed','description':'Reader catchups have stopped. You can explicitly subscribe again at any time.'})
    return render(request,'accounts/newsletter-choice.html',{'title':'Unsubscribe from catchups?','description':'Stop weekly reader newsletters. Writer activity reports are separate and pause after five weeks without publishing.','button':'Unsubscribe'})

@admin_required
def newsletter_admin(request):
    form=ScheduleForm(request.POST or None)
    if request.method=='POST' and form.is_valid():
        data=form.cleaned_data.copy();kind=data.pop('kind');data['weekday']=int(data['weekday'])
        schedule,_=NewsletterSchedule.objects.update_or_create(kind=kind,defaults=data)
        audit(request.user,'newsletter.schedule_changed',schedule)
        return redirect('newsletter-admin')
    for kind in KINDS:NewsletterSchedule.objects.get_or_create(kind=kind)
    return render(request,'accounts/newsletter-admin.html',{'form':form,'schedules':NewsletterSchedule.objects.filter(kind__in=KINDS),'subscribers':Paginator(NewsletterSubscription.objects.select_related('member').order_by('-created_at'),50).get_page(request.GET.get('subscribers_page')),'deliveries':Paginator(NewsletterDelivery.objects.select_related('notice').order_by('-created_at'),50).get_page(request.GET.get('editions_page'))})

@admin_required
def preview(request,kind):
    if kind not in KINDS:raise Http404
    return render(request,'accounts/newsletter-web.html',content_for(kind,request.user,timezone.now(),request.build_absolute_uri('/')))

def edition(request,token):
    item=get_object_or_404(NewsletterDelivery,web_token=token)
    if item.kind.startswith('writer_') and not (request.user.is_authenticated and (request.user.pk==item.member_id or (is_admin(request.user) and request.user.is_verified()))):raise Http404
    from .newsletter import delivery_eligible
    if item.kind.startswith('writer_') and not delivery_eligible(item):raise Http404
    # Rebuild from currently public records rather than expose hidden snapshots.
    from datetime import datetime
    from .newsletter import ZONE
    period_time=datetime.fromisoformat(item.period).replace(tzinfo=ZONE)
    response=render(request,'accounts/newsletter-web.html',content_for(item.kind,item.member,period_time,request.build_absolute_uri('/'),item))
    response['Cache-Control']='private, no-store'
    return response


@login_required
def preferences(request):
    sub=enroll(request.user)
    if sub is None:
        sub=NewsletterSubscription.objects.filter(member=request.user,email__iexact=request.user.email).first()
    if not sub:raise Http404
    class PreferencesForm(forms.Form):
        weekly=forms.BooleanField(required=False,label='Weekly reader catchup')
    form=PreferencesForm(request.POST or None,initial={'weekly':sub.weekly,'monthly':sub.monthly})
    if request.method=='POST' and form.is_valid():
        sub.weekly=form.cleaned_data['weekly'];sub.monthly=False
        sub.opted_out_at=None if sub.weekly or sub.monthly else timezone.now();sub.save()
        messages.success(request,'Newsletter preferences saved.')
        return redirect('newsletter-preferences')
    return form_page(request,'Newsletter preferences',form,'Save preferences','Reader catchups are optional. Writer activity reports pause after five weeks without publishing.')
