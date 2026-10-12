from datetime import timedelta
import secrets
from django import forms
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password,check_password
from django.core.exceptions import PermissionDenied,ValidationError
from django.core.mail import send_mail
from django.db import transaction
from django.http import FileResponse,Http404
from django.shortcuts import render,redirect,get_object_or_404
from django.urls import reverse
from django.utils import timezone
from .models import MemberRestriction,BanAppeal,SupportTicket,SupportReply,PrivateEvidence,CommunityNotice,VerifiedEmail
from .community_services import active_restrictions,can_moderate,restrict_member,decide_appeal,queue_notice,deliver_notice
from .forms import clean_private_image
from .services import audit,allow_attempt
from .policy import admin_required,is_admin

class MultipleInput(forms.ClearableFileInput):allow_multiple_selected=True
class MultipleImages(forms.FileField):
    def clean(self,data,initial=None):
        if not data:return []
        files=data if isinstance(data,(list,tuple)) else [data]
        if len(files)>5:raise ValidationError('Choose up to five images.')
        return [clean_private_image(super(MultipleImages,self).clean(f,initial)) for f in files]
class EvidenceForm(forms.Form):
    images=MultipleImages(required=False,widget=MultipleInput(attrs={'accept':'image/png,image/jpeg,image/webp'}),help_text='Up to five PNG, JPEG or WebP images, 5 MB each. Private to this conversation and its reviewers.')
class AppealForm(EvidenceForm):
    text=forms.CharField(max_length=3000,widget=forms.Textarea,label='Your appeal')
    field_order=['text','images']
class SupportForm(EvidenceForm):
    field_order=['email','subject','text','images']
    email=forms.EmailField()
    subject=forms.CharField(max_length=180)
    text=forms.CharField(max_length=5000,widget=forms.Textarea,label='How can we help?')
class ReplyForm(forms.Form):text=forms.CharField(max_length=5000,widget=forms.Textarea,label='Reply')
class RestrictionForm(forms.Form):
    kind=forms.ChoiceField(choices=[('archive','Archive for investigation'),('ban','Ban account')])
    reason=forms.CharField(max_length=1000,widget=forms.Textarea)
    incident=forms.CharField(max_length=120,help_text='A stable incident reference. An archive cannot be extended for the same incident.')
    hours=forms.IntegerField(min_value=1,max_value=8760,required=False,help_text='Archives: 1–72 hours. Bans: leave blank for permanent.')
    confirm=forms.BooleanField(label='I confirm this account restriction and its reason.')

def form_page(request,title,form,button,description=''):
    return render(request,'accounts/community-form.html',{'title':title,'form':form,'button':button,'description':description})

@login_required
def moderation_members(request):
    if not can_moderate(request.user):raise PermissionDenied
    return render(request,'accounts/moderation-members.html',{'members':get_user_model().objects.select_related('profile').prefetch_related('groups').order_by('pk')})

@login_required
def moderation_member(request,pk):
    if not can_moderate(request.user):raise PermissionDenied
    member=get_object_or_404(get_user_model(),pk=pk)
    form=RestrictionForm(request.POST or None)
    if not is_admin(request.user):form.fields['kind'].choices=[('archive','Archive for investigation')]
    if request.method=='POST' and request.POST.get('action')=='lift':
        with transaction.atomic():
            record=get_object_or_404(MemberRestriction.objects.select_for_update(),pk=request.POST.get('restriction'),member=member)
            if record.kind=='ban' and not is_admin(request.user):raise PermissionDenied
            if record.actor_id!=request.user.pk and not is_admin(request.user):raise PermissionDenied
            if not record.lifted_at:
                record.lifted_at=timezone.now();record.lifted_by=request.user;record.save();audit(request.user,'member.restriction_lifted',record)
        return redirect('moderation-member',pk=pk)
    if request.method=='POST' and form.is_valid():
        try:
            restrict_member(request.user,pk,form.cleaned_data['kind'],form.cleaned_data['reason'],form.cleaned_data['incident'],form.cleaned_data['hours'])
            messages.success(request,'Restriction recorded. Notification delivery is tracked separately.')
            return redirect('moderation-member',pk=pk)
        except ValidationError as error:form.add_error(None,error)
    return render(request,'accounts/moderation-member.html',{'member':member,'form':form,'restrictions':member.restrictions.order_by('-created_at')})

@login_required
def ban_status(request):
    restriction=active_restrictions().filter(member=request.user,kind='ban').order_by('-created_at').first()
    if not restriction:return redirect('dashboard')
    form=AppealForm(request.POST or None,request.FILES or None)
    if request.method=='POST' and form.is_valid():
        if not allow_attempt(request,'appeal:'+str(restriction.pk),5):form.add_error(None,'Please wait before retrying.')
        else:
            with transaction.atomic():
                record=MemberRestriction.objects.select_for_update().get(pk=restriction.pk)
                if BanAppeal.objects.filter(restriction=record).exists():form.add_error(None,'Only one appeal is allowed for this ban.')
                elif record.lifted_at or (record.expires_at and record.expires_at<=timezone.now()):return redirect('dashboard')
                else:
                    appeal=BanAppeal.objects.create(restriction=record,text=form.cleaned_data['text'])
                    for image in form.cleaned_data['images']:PrivateEvidence.objects.create(appeal=appeal,file=image)
                    audit(request.user,'appeal.submitted',appeal)
                    return redirect('ban-status')
    return render(request,'accounts/ban-status.html',{'restriction':restriction,'appeal':BanAppeal.objects.filter(restriction=restriction).first(),'form':form})

@admin_required
def appeals(request):
    return render(request,'accounts/appeals.html',{'appeals':BanAppeal.objects.select_related('restriction__member').order_by('status','created_at')})

@admin_required
def appeal_review(request,pk):
    item=get_object_or_404(BanAppeal.objects.select_related('restriction__member'),pk=pk)
    error=''
    if request.method=='POST':
        try:decide_appeal(request.user,pk,request.POST.get('decision'),request.POST.get('note',''));return redirect('appeal-review',pk=pk)
        except ValidationError as exc:error=' '.join(exc.messages)
    return render(request,'accounts/appeal-review.html',{'item':item,'error':error})

def ticket_access(request,ticket):
    if can_moderate(request.user):return True
    if request.user.is_authenticated and ticket.member_id==request.user.pk:return True
    return str(ticket.token) in request.session.get('support_verified',[])

def support_new(request):
    form=SupportForm(request.POST or None,request.FILES or None,initial={'email':request.user.email if request.user.is_authenticated else ''})
    if request.user.is_authenticated and request.user.email:form.fields['email'].disabled=True
    if request.method=='POST' and form.is_valid():
        if not allow_attempt(request,'support-create',5,3600):form.add_error(None,'Please wait before opening another request.')
        else:
            member=request.user if request.user.is_authenticated else None
            verified=bool(member and VerifiedEmail.objects.filter(user=member,email__iexact=member.email).exists())
            with transaction.atomic():
                ticket=SupportTicket.objects.create(member=member,email=form.cleaned_data['email'].lower(),subject=form.cleaned_data['subject'],text=form.cleaned_data['text'],verified_at=timezone.now() if verified else None)
                for image in form.cleaned_data['images']:PrivateEvidence.objects.create(ticket=ticket,file=image)
            if not verified:return redirect('support-verify',token=ticket.token)
            return redirect('support-ticket',token=ticket.token)
    return form_page(request,'Contact the MindState team',form,'Send request','For account and platform questions. Add up to five images if helpful. This is a private conversation with the team, not emergency support.')

def support_verify(request,token):
    item=get_object_or_404(SupportTicket,token=token)
    form=forms.Form(request.POST or None)
    form.fields['code']=forms.CharField(max_length=6,min_length=6,required=False,widget=forms.TextInput(attrs={'inputmode':'numeric','autocomplete':'one-time-code','data-otp-input':''}))
    error=''
    if request.method=='POST' and allow_attempt(request,'support-verify:'+str(token),12):
        with transaction.atomic():
            item=SupportTicket.objects.select_for_update().get(pk=item.pk)
            if request.POST.get('action')=='send':
                if item.code_sent_at and item.code_sent_at>timezone.now()-timedelta(seconds=60):error='Wait a minute before requesting another code.'
                elif not allow_attempt(request,'support-send:'+str(token),5,3600):error='Please wait before requesting another code.'
                else:
                    code=f'{secrets.randbelow(1000000):06d}'
                    item.code_digest=make_password(code);item.code_expires_at=timezone.now()+timedelta(minutes=10);item.code_sent_at=timezone.now();item.code_attempts=0
                    try:
                        sent=send_mail('Your MindState support verification code',f'Your code is {code}. It expires in 10 minutes and can be used once.\nReturn to the browser where you requested it.',settings.DEFAULT_FROM_EMAIL,[item.email])
                        if sent!=1:raise OSError()
                    except Exception:item.code_digest='';error='Delivery failed. Check the address or retry after a minute.'
                    item.save()
            elif request.POST.get('action')=='verify':
                if item.code_digest and item.code_expires_at and item.code_expires_at>timezone.now() and item.code_attempts<6 and check_password(request.POST.get('code',''),item.code_digest):
                    item.code_digest='';item.verified_at=timezone.now();item.save()
                    allowed=request.session.get('support_verified',[]);request.session['support_verified']=(allowed+[str(item.token)])[-30:]
                    return redirect('support-ticket',token=token)
                item.code_attempts+=1;item.save(update_fields=['code_attempts']);error='Invalid or expired code. Request another code if needed.'
    elif request.method=='POST':error='Please wait before trying again.'
    return render(request,'accounts/support-verify.html',{'item':item,'form':form,'error':error})

def support_ticket(request,token):
    item=get_object_or_404(SupportTicket,token=token)
    if not ticket_access(request,item):return redirect('support-verify',token=token)
    team=can_moderate(request.user)
    form=ReplyForm(request.POST or None)
    if request.method=='POST':
        if not allow_attempt(request,'support-reply:'+str(token),20):form.add_error(None,'Please wait before replying again.')
        elif request.POST.get('action') in ('resolve','assign'):
            if not team:raise PermissionDenied
            if request.POST['action']=='assign':item.assigned_to=request.user
            else:item.status='resolved'
            item.save();audit(request.user,'support.'+request.POST['action'],item)
            return redirect('support-ticket',token=token)
        elif form.is_valid():
            with transaction.atomic():
                item=SupportTicket.objects.select_for_update().get(pk=item.pk)
                reply=SupportReply.objects.create(ticket=item,actor=request.user if request.user.is_authenticated else None,from_team=team,text=form.cleaned_data['text'])
                item.status='open';item.save(update_fields=['status'])
                if team and item.verified_at:
                    link=request.build_absolute_uri(reverse('support-ticket',args=[item.token]))
                    notice=queue_notice(item.email,'MindState replied to your support request','The team replied to your request. Open your private conversation:\n'+link,f'support:{reply.pk}')
                    transaction.on_commit(lambda:deliver_notice(notice.pk))
            return redirect('support-ticket',token=token)
    return render(request,'accounts/support-ticket.html',{'item':item,'form':form,'team':team})

@login_required
def support_queue(request):
    if not can_moderate(request.user):raise PermissionDenied
    return render(request,'accounts/support-queue.html',{'tickets':SupportTicket.objects.filter(verified_at__isnull=False).select_related('assigned_to').order_by('status','-created_at')})

def evidence(request,pk):
    image=get_object_or_404(PrivateEvidence.objects.select_related('ticket','appeal__restriction'),pk=pk)
    if image.ticket_id:
        if not ticket_access(request,image.ticket):raise Http404
    elif not (request.user.is_authenticated and (image.appeal.restriction.member_id==request.user.pk or (is_admin(request.user) and can_moderate(request.user)))):raise Http404
    response=FileResponse(image.file.open('rb'),content_type='image/jpeg')
    response['Cache-Control']='private, no-store';response['X-Content-Type-Options']='nosniff'
    return response

@admin_required
def notices(request):
    if request.method=='POST':
        item=get_object_or_404(CommunityNotice,pk=request.POST.get('notice'))
        if item.key.startswith('newsletter:'):
            from .newsletter import delivery_eligible
            delivery=getattr(item,'newsletterdelivery',None)
            if not delivery or not delivery_eligible(delivery):raise PermissionDenied
            from .newsletter import refresh_delivery, ZONE
            from datetime import datetime
            refresh_delivery(delivery,datetime.fromisoformat(delivery.period).replace(tzinfo=ZONE),request.build_absolute_uri('/'))
        if allow_attempt(request,'community-mail-retry',20):deliver_notice(item.pk)
        return redirect('community-notices')
    return render(request,'accounts/community-notices.html',{'notices':CommunityNotice.objects.order_by('-created_at')[:200]})
