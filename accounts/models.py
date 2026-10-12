import secrets
import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


def public_ref():
    return secrets.token_hex(8).upper()


class Profile(models.Model):
    email_verification_required = models.BooleanField(default=False)
    THEMES = [('editorial', 'Editorial paper'), ('collage', 'Cut-paper collage'), ('linen', 'Warm linen')]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=80, blank=True)
    bio = models.CharField(max_length=300, blank=True)
    photo_caption = models.CharField(max_length=120, blank=True)
    detail_caption = models.CharField(max_length=120, blank=True)
    closing_caption = models.CharField(max_length=120, blank=True)
    handwritten_note = models.CharField(max_length=120, blank=True)
    scrapbook_note = models.CharField(max_length=180, blank=True)
    margin_note = models.CharField(max_length=120, blank=True)
    sticker_text = models.CharField(max_length=12, blank=True)
    avatar = models.FileField(upload_to='avatars/', blank=True)
    banner = models.FileField(upload_to='banners/', blank=True)
    folio_image = models.FileField(upload_to='folio-images/', blank=True)
    theme = models.CharField(max_length=16, choices=THEMES, default='editorial')
    public_ref = models.CharField(max_length=16, unique=True, default=public_ref, editable=False)

    class Meta:
        permissions = [('access_team_workspace', 'Access team workspace'), ('change_other_profiles', 'Edit other member profiles')]

    @property
    def complete(self):
        return bool(self.display_name.strip() and self.bio.strip())


class MembershipApplication(models.Model):
    PENDING, APPROVED, DECLINED = 'pending', 'approved', 'declined'
    email = models.EmailField()
    tracking_token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    member = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='membership_applications')
    display_name = models.CharField(max_length=80)
    interests = models.JSONField(default=list)
    introduction = models.CharField(max_length=1000)
    requested_username = models.CharField(max_length=150, blank=True)
    consent_document = models.FileField(upload_to='guardian-consent/', blank=True)
    is_under_16 = models.BooleanField(default=False)
    status = models.CharField(max_length=16, default=PENDING, choices=[(x, x.title()) for x in (PENDING, APPROVED, DECLINED)])
    consent_method = models.CharField(max_length=200, blank=True)
    consent_date = models.DateField(null=True, blank=True)
    consent_recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='+')
    decided_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='+')
    decision_note = models.CharField(max_length=1000, blank=True)
    review_started_at = models.DateTimeField(null=True, blank=True)
    consent_revision = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    decided_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        permissions = [('review_applications', 'Review membership applications')]
        constraints = [models.UniqueConstraint(models.functions.Lower('email'), name='one_membership_application_per_email')]


class Invite(models.Model):
    application = models.OneToOneField(MembershipApplication, on_delete=models.PROTECT)
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    groups = models.ManyToManyField('auth.Group', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(null=True, blank=True)
    revoked_at = models.DateTimeField(null=True, blank=True)

    @property
    def available(self):
        return not self.used_at and not self.revoked_at and self.expires_at > timezone.now()


class GuardianConsent(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_under_16 = models.BooleanField(default=False)
    status = models.CharField(max_length=16, default='not_needed', choices=[(x, x.replace('_', ' ').title()) for x in ('not_needed', 'pending', 'given', 'withdrawn')])
    method = models.CharField(max_length=200, blank=True)
    consent_date = models.DateField(null=True, blank=True)
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    recorded_at = models.DateTimeField(null=True)


class ModeratorOnboarding(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    guidelines_version_read = models.CharField(max_length=20, blank=True)
    read_at = models.DateTimeField(null=True, blank=True)
    first_review_with = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='+')
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='+')
    approved_at = models.DateTimeField(null=True, blank=True)


class RecoveryCode(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    digest = models.CharField(max_length=128)
    used_at = models.DateTimeField(null=True)


class RateLimitBucket(models.Model):
    key = models.CharField(max_length=64, unique=True)
    starts_at = models.DateTimeField(default=timezone.now)
    count = models.PositiveIntegerField(default=0)


class AuditQuerySet(models.QuerySet):
    def update(self, **kwargs):
        raise ValidationError("Audit entries cannot be changed.")

    def delete(self):
        raise ValidationError("Audit entries cannot be deleted.")


class AuditLog(models.Model):
    objects = AuditQuerySet.as_manager()
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    action = models.CharField(max_length=80)
    target_type = models.CharField(max_length=80)
    target_id = models.CharField(max_length=80)
    details = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        permissions = [('manage_roles', 'Manage team roles'), ('view_identity', 'Access identity workspace')]

    @property
    def summary(self):
        labels = {
            'submission.draft_saved': 'Saved a private draft', 'referral.created': 'Created an application referral link', 'referral.revoked': 'Revoked a referral link', 'referral.joined': 'New referral received',
            'application.received': 'Application received', 'application.approved': 'Application approved',
            'application.declined': 'Application declined', 'invitation.accepted': 'Invitation accepted',
            'invitation.revoked': 'Invitation revoked', 'consent.recorded': 'Parental consent recorded',
            'roles.changed': 'Team roles changed', 'profile.updated': 'Profile edited',
            'profile.contributor_linked': 'Published author linked to a member',
            'account.signed_in': 'Signed in', 'account.signed_out': 'Signed out',
            'account.username_changed': 'Username changed', 'account.password_changed': 'Password changed',
            'account.email_verification_requested': 'Email verification requested', 'account.email_verified': 'Email verified',
            'two_factor.verified': 'Authenticator verified', 'two_factor.verification_failed': 'Authenticator verification failed', 'two_factor.enrolled': 'Authenticator set up', 'two_factor.recovery_used': 'Recovery code used',
            'two_factor.recovery_replaced': 'Recovery codes replaced', 'onboarding.guidelines_read': 'Guidelines acknowledged',
            'onboarding.approved': 'Moderator onboarding approved', 'admin.page_viewed': 'Opened a page',
            'admin.action': 'Submitted an administrative request', 'maintenance.created': 'Created a record in maintenance admin', 'maintenance.changed': 'Edited a record in maintenance admin', 'maintenance.deleted': 'Deleted a record in maintenance admin',
        }
        if self.action == 'admin.page_viewed':
            pages = {'home': 'Home', 'dashboard': 'Dashboard', 'team-home': 'Team workspace', 'team-applications': 'Applications', 'team-application': 'an application', 'team-invites': 'Invitations', 'team-members': 'Members', 'team-audit': 'Activity log', 'profile-view': 'a member profile', 'account-security': 'Account security', 'contribute': 'the contribution guide', 'search': 'Search', 'help': 'Help'}
            return 'Opened ' + pages.get(self.target_id, self.target_id.replace('-', ' ').replace(':', ' · '))
        return labels.get(self.action, self.action.replace('.', ' · ').replace('_', ' ').capitalize())

    def save(self, *args, **kwargs):
        if not self._state.adding:
            raise ValidationError('Audit entries cannot be changed.')
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError('Audit entries cannot be deleted.')


class Contributor(models.Model):
    name = models.CharField(max_length=120, unique=True)
    profile = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.SET_NULL, related_name='contributor_names')
    role = models.CharField(max_length=60, default='Writer')
    bio = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ['name']


class PostCredit(models.Model):
    post = models.ForeignKey('alpha.LandingContent', on_delete=models.CASCADE, related_name='profile_credits')
    contributor = models.ForeignKey(Contributor, on_delete=models.CASCADE, related_name='post_credits')
    anonymous = models.BooleanField(default=False)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['post', 'contributor'], name='unique_post_contributor')]


class EmailVerification(models.Model):
    purpose = models.CharField(max_length=12, default='account')
    sent_at = models.DateTimeField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField()
    digest = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    attempts = models.PositiveSmallIntegerField(default=0)
    used_at = models.DateTimeField(null=True)


class VerifiedEmail(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    verified_at = models.DateTimeField(default=timezone.now)


class ProfileChange(models.Model):
    PENDING, APPROVED, DECLINED = 'pending', 'approved', 'declined'
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='changes')
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='+')
    display_name = models.CharField(max_length=80)
    bio = models.CharField(max_length=300, blank=True)
    photo_caption = models.CharField(max_length=120, blank=True)
    detail_caption = models.CharField(max_length=120, blank=True)
    closing_caption = models.CharField(max_length=120, blank=True)
    handwritten_note = models.CharField(max_length=120, blank=True)
    scrapbook_note = models.CharField(max_length=180, blank=True)
    margin_note = models.CharField(max_length=120, blank=True)
    sticker_text = models.CharField(max_length=12, blank=True)
    folio_image = models.FileField(upload_to='folio-images/', blank=True)
    theme = models.CharField(max_length=16, choices=Profile.THEMES, default='editorial')
    avatar = models.FileField(upload_to='profile-review/avatars/', blank=True)
    banner = models.FileField(upload_to='profile-review/banners/', blank=True)
    remove_avatar = models.BooleanField(default=False)
    remove_banner = models.BooleanField(default=False)
    remove_folio_image = models.BooleanField(default=False)
    status = models.CharField(max_length=16, choices=[(PENDING, 'Pending'), (APPROVED, 'Approved'), (DECLINED, 'Declined'), ('superseded', 'Superseded')], default=PENDING, db_index=True)
    review_note = models.CharField(max_length=500, blank=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ['-created_at']


class Submission(models.Model):
    DRAFT, PENDING, APPROVED, DECLINED = 'draft', 'pending', 'approved', 'declined'
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='submissions')
    section = models.CharField(max_length=16, choices=[('articles', 'Article'), ('art', 'Art')])
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=500)
    body = models.TextField()
    FONT_CHOICES = [('sans', 'MindState Sans'), ('serif', 'Instrument Serif'), ('classic', 'Classic book'), ('mono', 'Typewriter')]
    SIZE_CHOICES = [('standard', 'Standard'), ('large', 'Large'), ('larger', 'Extra large')]
    reading_font = models.CharField(max_length=12, choices=FONT_CHOICES, default='sans')
    reading_size = models.CharField(max_length=12, choices=SIZE_CHOICES, default='standard')
    language = models.CharField(max_length=2, choices=[('en', 'English'), ('de', 'German')], default='en')
    tags = models.CharField(max_length=255, blank=True)
    content_warning = models.CharField(max_length=500, blank=True)
    image_credit = models.CharField(max_length=500, blank=True)
    featured_image = models.FileField(upload_to='submissions/featured/', blank=True)
    image_2 = models.FileField(upload_to='submissions/inside/', blank=True)
    image_3 = models.FileField(upload_to='submissions/inside/', blank=True)
    image_4 = models.FileField(upload_to='submissions/inside/', blank=True)
    image_5 = models.FileField(upload_to='submissions/inside/', blank=True)
    status = models.CharField(max_length=16, choices=[(DRAFT, 'Draft'), (PENDING, 'In review'), (APPROVED, 'Published'), (DECLINED, 'Changes requested')], default=DRAFT, db_index=True)
    revision = models.PositiveIntegerField(default=1)
    review_note = models.CharField(max_length=1000, blank=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    reviewed_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']


class SubmissionSnapshot(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, related_name='snapshots')
    revision = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=500)
    body = models.TextField()
    reading_font = models.CharField(max_length=12, choices=Submission.FONT_CHOICES, default='sans')
    reading_size = models.CharField(max_length=12, choices=Submission.SIZE_CHOICES, default='standard')
    section = models.CharField(max_length=16)
    language = models.CharField(max_length=2)
    tags = models.CharField(max_length=255, blank=True)
    content_warning = models.CharField(max_length=500, blank=True)
    image_credit = models.CharField(max_length=500, blank=True)
    featured_image = models.CharField(max_length=500, blank=True)
    images = models.JSONField(default=list)
    approved_at = models.DateTimeField(default=timezone.now)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['submission', 'revision'], name='one_snapshot_per_submission_revision')]


class ReviewNotice(models.Model):
    submission = models.ForeignKey(Submission, null=True, blank=True, on_delete=models.CASCADE, related_name='notices')
    recipient = models.EmailField()
    subject = models.CharField(max_length=200)
    body = models.TextField()
    status = models.CharField(max_length=16, choices=[('pending', 'Pending'), ('sent', 'Sent')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True)


class ReferralLink(models.Model):
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='referral_links')
    created_at = models.DateTimeField(auto_now_add=True)
    revoked_at = models.DateTimeField(null=True, blank=True)


class ReferralAttribution(models.Model):
    link = models.ForeignKey(ReferralLink, on_delete=models.PROTECT, related_name='attributions')
    member = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='referral_attribution')
    application = models.OneToOneField(MembershipApplication, null=True, blank=True, on_delete=models.SET_NULL, related_name='referral_attribution')
    created_at = models.DateTimeField(auto_now_add=True)


class PostRead(models.Model):
    post = models.ForeignKey('alpha.LandingContent', on_delete=models.CASCADE)
    reader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    day = models.DateField(default=timezone.localdate)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['post', 'reader', 'day'], name='one_read_per_member_post_day')]


class Collaboration(models.Model):
    STATES = [(x, x.replace('_', ' ').title()) for x in (
        'draft', 'submitted', 'in_review', 'changes_requested', 'approved', 'published')]
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='+')
    submission = models.OneToOneField(Submission, on_delete=models.PROTECT, related_name='collaboration')
    need = models.CharField(max_length=12, choices=[('art', 'Need art'), ('writing', 'Need writing')])
    brief = models.CharField(max_length=1200)
    draft_reference = models.CharField(max_length=3000, blank=True)
    reference_image = models.FileField(upload_to='collaborations/references/', blank=True)
    illustration_meaning = models.CharField(max_length=2000, blank=True)
    image_rights = models.CharField(max_length=12, choices=[('own', 'Our own work'), ('licensed', 'Openly licensed references')], default='own')
    source_url = models.URLField(blank=True)
    licence = models.CharField(max_length=120, blank=True)
    source_credit = models.CharField(max_length=300, blank=True)
    status = models.CharField(max_length=20, choices=STATES, default='draft', db_index=True)
    revision = models.PositiveIntegerField(default=1)
    closed = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(null=True, blank=True)
    review_note = models.CharField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']


class CollaborationMember(models.Model):
    collaboration = models.ForeignKey(Collaboration, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='collaboration_memberships')
    role = models.CharField(max_length=8, choices=[('writer', 'Writer'), ('artist', 'Artist')])
    anonymous = models.BooleanField(default=False)
    confirmed_revision = models.PositiveIntegerField(default=0)
    consented_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['collaboration', 'user'], name='one_collaboration_membership'),
            models.UniqueConstraint(fields=['collaboration', 'role'], name='one_collaboration_role'),
        ]

    @property
    def credit_name(self):
        if self.anonymous:
            return 'Anonymous ' + self.role
        return self.user.profile.display_name or 'MindState member'


class CollaborationNote(models.Model):
    collaboration = models.ForeignKey(Collaboration, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='+')
    label = models.CharField(max_length=120)
    body = models.CharField(max_length=1500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at', 'pk']


class PasswordResetChallenge(models.Model):
    identity_digest = models.CharField(max_length=64, blank=True)
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    method = models.CharField(max_length=8, default='email')
    digest = models.CharField(max_length=128, blank=True)
    expires_at = models.DateTimeField()
    attempts = models.PositiveIntegerField(default=0)
    verified_at = models.DateTimeField(null=True)
    used_at = models.DateTimeField(null=True)


class AccountNotice(models.Model):
    application = models.ForeignKey(MembershipApplication, on_delete=models.CASCADE, related_name='account_notices')
    recipient = models.EmailField()
    subject = models.CharField(max_length=200)
    body = models.TextField()
    sent_at = models.DateTimeField(null=True)
    attempts = models.PositiveIntegerField(default=0)
    last_error = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class AccountDeletion(models.Model):
    files_pending = models.JSONField(default=list, blank=True)
    cleanup_error = models.CharField(max_length=200, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    requested_at = models.DateTimeField(default=timezone.now)
    purge_at = models.DateTimeField()
    cancelled_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

from .community_models import MemberRestriction, BanAppeal, SupportTicket, SupportReply, PrivateEvidence, CommunityNotice, NewsletterSubscription, NewsletterSchedule, NewsletterDelivery
