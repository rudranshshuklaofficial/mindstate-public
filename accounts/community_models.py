"""Moderation, private support and scheduled community mail records."""
import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone

class MemberRestriction(models.Model):
    member=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,related_name='restrictions')
    actor=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,related_name='+')
    kind=models.CharField(max_length=12,choices=[('ban','Ban'),('archive','Investigation archive')])
    reason=models.CharField(max_length=1000)
    incident=models.CharField(max_length=120)
    created_at=models.DateTimeField(default=timezone.now)
    expires_at=models.DateTimeField(null=True,blank=True)
    lifted_at=models.DateTimeField(null=True,blank=True)
    lifted_by=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,on_delete=models.SET_NULL,related_name='+')
    class Meta:
        constraints=[models.UniqueConstraint(fields=['member','kind','incident'],name='unique_member_restriction_incident')]

class BanAppeal(models.Model):
    restriction=models.OneToOneField(MemberRestriction,on_delete=models.PROTECT,related_name='appeal')
    text=models.CharField(max_length=3000)
    status=models.CharField(max_length=12,default='pending',choices=[('pending','Pending'),('approved','Approved'),('rejected','Rejected')])
    decision=models.CharField(max_length=2000,blank=True)
    reviewer=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,on_delete=models.SET_NULL,related_name='+')
    created_at=models.DateTimeField(default=timezone.now)
    reviewed_at=models.DateTimeField(null=True)

class SupportTicket(models.Model):
    token=models.UUIDField(default=uuid.uuid4,unique=True,editable=False)
    member=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,blank=True,on_delete=models.SET_NULL,related_name='support_tickets')
    email=models.EmailField()
    subject=models.CharField(max_length=180)
    text=models.CharField(max_length=5000)
    verified_at=models.DateTimeField(null=True)
    code_digest=models.CharField(max_length=128,blank=True)
    code_expires_at=models.DateTimeField(null=True)
    code_sent_at=models.DateTimeField(null=True)
    code_attempts=models.PositiveSmallIntegerField(default=0)
    status=models.CharField(max_length=12,default='open',choices=[('open','Open'),('resolved','Resolved')])
    assigned_to=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,blank=True,on_delete=models.SET_NULL,related_name='+')
    created_at=models.DateTimeField(default=timezone.now)

class SupportReply(models.Model):
    ticket=models.ForeignKey(SupportTicket,on_delete=models.CASCADE,related_name='replies')
    actor=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,on_delete=models.SET_NULL,related_name='+')
    from_team=models.BooleanField(default=False)
    text=models.CharField(max_length=5000)
    created_at=models.DateTimeField(default=timezone.now)

class PrivateEvidence(models.Model):
    ticket=models.ForeignKey(SupportTicket,null=True,blank=True,on_delete=models.CASCADE,related_name='images')
    appeal=models.ForeignKey(BanAppeal,null=True,blank=True,on_delete=models.CASCADE,related_name='images')
    file=models.FileField(upload_to='community-evidence/')
    class Meta:
        constraints=[models.CheckConstraint(condition=(models.Q(ticket__isnull=False,appeal__isnull=True)|models.Q(ticket__isnull=True,appeal__isnull=False)),name='evidence_single_parent')]

class CommunityNotice(models.Model):
    recipient=models.EmailField()
    subject=models.CharField(max_length=200)
    body=models.TextField()
    html=models.TextField(blank=True)
    key=models.CharField(max_length=200,unique=True)
    created_at=models.DateTimeField(default=timezone.now)
    sent_at=models.DateTimeField(null=True)
    attempts=models.PositiveIntegerField(default=0)
    sending_until=models.DateTimeField(null=True,blank=True)
    error=models.CharField(max_length=240,blank=True)

class NewsletterSubscription(models.Model):
    email=models.EmailField(unique=True)
    member=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,blank=True,on_delete=models.SET_NULL,related_name='newsletter_subscriptions')
    token=models.UUIDField(default=uuid.uuid4,unique=True,editable=False)
    weekly=models.BooleanField(default=True)
    monthly=models.BooleanField(default=False)
    opted_out_at=models.DateTimeField(null=True)
    verified_at=models.DateTimeField(null=True)
    created_at=models.DateTimeField(default=timezone.now)

class NewsletterSchedule(models.Model):
    kind=models.CharField(max_length=24,unique=True,choices=[('weekly','Weekly catchup'),('writer_weekly','Weekly writer report')])
    enabled=models.BooleanField(default=False)
    hour=models.PositiveSmallIntegerField(default=9)
    weekday=models.PositiveSmallIntegerField(default=0)
    month_day=models.PositiveSmallIntegerField(default=1)

class NewsletterDelivery(models.Model):
    key=models.CharField(max_length=200,unique=True)
    kind=models.CharField(max_length=24)
    period=models.CharField(max_length=12)
    subscription=models.ForeignKey(NewsletterSubscription,null=True,on_delete=models.SET_NULL)
    member=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,on_delete=models.SET_NULL,related_name='+')
    notice=models.OneToOneField(CommunityNotice,on_delete=models.PROTECT)
    web_token=models.UUIDField(default=uuid.uuid4,unique=True)
    created_at=models.DateTimeField(default=timezone.now)
