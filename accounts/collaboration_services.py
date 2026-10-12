from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from django.utils import timezone

from alpha.models import LandingContent
from .models import Collaboration, Contributor, GuardianConsent, PostCredit, Submission, SubmissionSnapshot
from .policy import has_role, is_admin, moderator_ready
from .services import audit


def can_review(user):
    return user.is_verified() and (is_admin(user) or has_role(user, 'editorial') or moderator_ready(user))


def member_eligible(user):
    consent = GuardianConsent.objects.filter(user=user).first()
    return user.is_active and not (consent and consent.is_under_16 and consent.status != 'given')


def reset_agreements(collaboration):
    collaboration.revision += 1
    collaboration.members.update(confirmed_revision=0, consented_at=None)


def validate_ready(collaboration):
    submission = collaboration.submission
    members = list(collaboration.members.select_related('user'))
    if len(members) != 2 or {m.role for m in members} != {'writer', 'artist'}:
        raise ValidationError('A writer and an artist must join before review.')
    if any(not member_eligible(m.user) for m in members):
        raise ValidationError('Both members need active accounts and any required guardian permission.')
    if any(m.confirmed_revision != collaboration.revision or not m.consented_at for m in members):
        raise ValidationError('Both co-authors must confirm this version and its consent before submission.')
    if not all(str(getattr(submission, field)).strip() for field in ('title', 'summary', 'body')) or not submission.featured_image:
        raise ValidationError('Add a title, summary, text and exactly one featured image before review.')
    if not submission.image_credit.strip():
        raise ValidationError('Explain image ownership or provide the image credit.')
    if collaboration.image_rights == 'licensed' and not all((collaboration.source_url, collaboration.licence.strip(), collaboration.source_credit.strip())):
        raise ValidationError('Licensed references need a source link, licence and credit.')
    if submission.section == 'art' and not collaboration.illustration_meaning.strip():
        raise ValidationError('Explain the illustration’s meaning before submitting art.')


@transaction.atomic
def review_collaboration(user, pk, decision, note, revision):
    if not can_review(user):
        raise PermissionDenied
    collaboration = Collaboration.objects.select_for_update().select_related('submission').get(pk=pk)
    if collaboration.members.filter(user=user).exists():
        raise PermissionDenied('A different reviewer must review this collaboration.')
    if str(collaboration.revision) != str(revision):
        raise ValidationError('The draft changed. Reload before reviewing.')
    transitions = {'start': ('submitted', 'in_review'), 'approve': ('in_review', 'approved'), 'publish': ('approved', 'published')}
    if decision == 'changes':
        if collaboration.status not in ('submitted', 'in_review') or not note.strip():
            raise ValidationError('Only submitted work can receive a request for changes, with a note.')
        collaboration.status = 'changes_requested'
        collaboration.members.update(confirmed_revision=0, consented_at=None)
        collaboration.submission.status = Submission.DECLINED
    else:
        transition = transitions.get(decision)
        if not transition or collaboration.status != transition[0]:
            raise ValidationError('This action does not match the current review status.')
        validate_ready(collaboration)
        if decision == 'publish':
            if collaboration.is_demo:
                raise ValidationError('Demo collaborations are for testing and cannot be published to the live library.')
            publish_collaboration(collaboration)
        collaboration.status = transition[1]
        if decision == 'approve':
            collaboration.submission.status = Submission.APPROVED
    collaboration.review_note = note
    collaboration.submission.review_note = note
    collaboration.submission.reviewed_by = user
    collaboration.submission.reviewed_at = timezone.now()
    collaboration.submission.save()
    collaboration.save()
    audit(user, 'collaboration.' + collaboration.status, collaboration)
    return collaboration


def publish_collaboration(collaboration):
    item = collaboration.submission
    rights = item.image_credit
    if collaboration.image_rights == 'licensed':
        rights += f' · Reference: {collaboration.source_url} · {collaboration.licence} · {collaboration.source_credit}'
    body = item.body
    if collaboration.illustration_meaning:
        body += '\n\n## About the illustration\n\n' + collaboration.illustration_meaning
    snapshot = SubmissionSnapshot.objects.create(
        submission=item, revision=item.revision, title=item.title, summary=item.summary,
        body=body, section=item.section, reading_font=item.reading_font, reading_size=item.reading_size,
        language=item.language, tags=item.tags, content_warning=item.content_warning,
        image_credit=rights, featured_image=item.featured_image.name,
        images=[getattr(item, field).name for field in ('image_2', 'image_3', 'image_4', 'image_5') if getattr(item, field)],
        approved_at=timezone.now(),
    )
    members = list(collaboration.members.select_related('user__profile').order_by('role'))
    post = LandingContent.objects.create(
        submission=item, section=item.section, title=item.title, description=item.summary,
        author=' and '.join(m.credit_name for m in members), tags=item.tags,
        published_at=timezone.localdate(), is_published=True,
        image_url=f'/submissions/{item.pk}/media/{snapshot.revision}/featured/',
    )
    post.link_url = f'/app/art/contributed-{post.pk}/' if item.section == 'art' else f'/app/article/{post.pk}/'
    post.save(update_fields=['link_url'])
    for member in members:
        if member.anonymous:
            person, _ = Contributor.objects.get_or_create(name='Anonymous ' + member.role, defaults={'role': member.role.title()})
            # Never reuse a contributor identity that was linked through another workflow.
            if person.profile_id:
                person, _ = Contributor.objects.get_or_create(name=f'Anonymous {member.role} · collaboration {collaboration.pk}', defaults={'role': member.role.title()})
        else:
            person = Contributor.objects.filter(profile=member.user.profile).first()
            if not person:
                name = member.credit_name
                if Contributor.objects.filter(name=name).exists():
                    name += ' (' + member.user.profile.public_ref + ')'
                person = Contributor.objects.create(name=name, profile=member.user.profile, role=member.role.title())
        PostCredit.objects.create(post=post, contributor=person, anonymous=member.anonymous)
