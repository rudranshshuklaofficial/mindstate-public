"""Review decisions, publication snapshots, and branded notifications."""
from email.mime.image import MIMEImage
from pathlib import Path

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.html import escape

from alpha.models import LandingContent
from .models import Contributor, PostCredit, ReviewNotice, Submission, SubmissionSnapshot
from .policy import is_admin
from .services import audit


def matches_version(value, stamp):
    try:
        return parse_datetime(value or '') == stamp
    except (ValueError, TypeError):
        return False


def latest_approved(submission):
    return submission.snapshots.order_by('-revision').first()


@transaction.atomic
def review_submission(reviewer, submission_id, decision, note, expected_version=None):
    if not is_admin(reviewer) or not reviewer.is_verified():
        raise PermissionError('Admin verification required.')
    submission = Submission.objects.select_for_update().select_related('owner__profile').get(pk=submission_id)
    if hasattr(submission, 'collaboration'):
        raise ValueError('Joint work must be reviewed in the collaboration workspace.')
    if decision not in ('approve', 'decline'):
        raise ValueError('Choose a valid decision.')
    if submission.owner_id == reviewer.pk:
        raise ValueError('Another admin must review your work.')
    if submission.status != Submission.PENDING:
        raise ValueError('This submission is no longer waiting for review.')
    if expected_version is not None and not matches_version(expected_version, submission.updated_at):
        raise ValueError('The creator updated this work. Reload it before reviewing.')
    now = timezone.now()
    submission.status = Submission.APPROVED if decision == 'approve' else Submission.DECLINED
    submission.review_note, submission.reviewed_by, submission.reviewed_at = note, reviewer, now
    if decision == 'approve':
        snapshot = SubmissionSnapshot.objects.create(
            submission=submission, revision=submission.revision, title=submission.title,
            summary=submission.summary, body=submission.body, section=submission.section,
            reading_font=submission.reading_font, reading_size=submission.reading_size,
            language=submission.language, tags=submission.tags,
            content_warning=submission.content_warning, image_credit=submission.image_credit,
            featured_image=submission.featured_image.name,
            images=[getattr(submission, field).name for field in ('image_2', 'image_3', 'image_4', 'image_5') if getattr(submission, field)],
            approved_at=now,
        )
        post = LandingContent.objects.filter(submission=submission).first()
        if post is None:
            post = LandingContent(submission=submission)
        post.section = submission.section
        post.title = snapshot.title
        post.description = snapshot.summary
        post.author = submission.owner.profile.display_name or submission.owner.username
        post.tags = snapshot.tags
        post.published_at = timezone.localdate()
        post.is_published = True
        post.image_url = f'/submissions/{submission.pk}/media/{snapshot.revision}/featured/'
        post.save()
        post.link_url = f'/app/art/contributed-{post.pk}/' if post.section == LandingContent.ART else f'/app/article/{post.pk}/'
        post.save(update_fields=['link_url'])
        person = Contributor.objects.filter(profile=submission.owner.profile).first()
        if person is None:
            name = post.author
            if Contributor.objects.filter(name=name).exists():
                name = f'{name} ({submission.owner.profile.public_ref})'
            person = Contributor.objects.create(name=name, profile=submission.owner.profile, role='Artist' if submission.section == LandingContent.ART else 'Writer')
        PostCredit.objects.get_or_create(post=post, contributor=person)
    submission.save(update_fields=['status', 'review_note', 'reviewed_by', 'reviewed_at', 'updated_at'])
    audit(reviewer, 'submission.' + submission.status, submission, {'revision': submission.revision})
    notice = None
    if submission.owner.email:
        action = 'published' if decision == 'approve' else 'needs changes'
        notice = ReviewNotice.objects.create(submission=submission, recipient=submission.owner.email,
                                             subject=f'Your MindState {submission.get_section_display().lower()} {action}',
                                             body=f'Your {submission.get_section_display().lower()} “{submission.title}” {action}.\n\n{note}\n\nOpen your dashboard to see the current status.')
    return submission, notice


@transaction.atomic
def send_review_notice(notice):
    if notice:
        notice = ReviewNotice.objects.select_for_update().get(pk=notice.pk)
    if not notice or notice.status == 'sent' or not settings.EMAIL_DELIVERY_ENABLED:
        return False
    # The saved message describes the reviewed version, even if the creator edits later.
    safe_body = escape(notice.body).replace('\n', '<br>')
    safe_subject = escape(notice.subject)
    tracker_path = f'/submissions/{notice.submission_id}/' if notice.submission_id else '/dashboard/'
    tracker_url = escape(settings.MINDSTATE_SITE_URL + tracker_path)
    html = f'''<!doctype html><html><body style="margin:0;background:#fef0d8;font-family:'Google Sans Flex',Arial,sans-serif;color:#292021"><div style="max-width:600px;margin:24px auto;background:#fff8e9;border:1px solid #c7b9a5;border-radius:18px;overflow:hidden"><div style="background:#28513b;padding:24px;color:white"><img src="cid:mindstate-logo" width="42" height="42" alt="MindState" style="vertical-align:middle"> <strong style="font-size:20px;vertical-align:middle">MindState</strong></div><div style="padding:35px"><p style="color:#28513b;text-transform:uppercase;letter-spacing:.15em;font-size:11px">A note from the team</p><h1 style="font-family:Georgia,serif;font-size:34px;font-weight:normal">{safe_subject}</h1><div style="background:#e8ecd9;border-radius:12px;padding:22px;line-height:1.7">{safe_body}</div><p style="font-size:13px">Sign in to follow your tracker and next steps.</p><a href="{tracker_url}" style="display:inline-block;background:#28513b;color:white;padding:13px 22px;border-radius:30px;text-decoration:none;font-weight:bold">Open your tracker →</a></div><div style="padding:18px 35px;background:#28513b;color:white;font-size:12px">Reply to team@mindstate.space if you need a hand.</div></div></body></html>'''
    email = EmailMultiAlternatives(notice.subject, notice.body, settings.DEFAULT_FROM_EMAIL, [notice.recipient], reply_to=['team@mindstate.space'])
    email.attach_alternative(html, 'text/html')
    logo_path = Path(settings.BASE_DIR) / 'static' / 'ChatgptImageSep19202611_28_00Pm2.png'
    logo = MIMEImage(logo_path.read_bytes(), _subtype='png')
    logo.add_header('Content-ID', '<mindstate-logo>')
    logo.add_header('Content-Disposition', 'inline', filename='mindstate-logo.png')
    email.attach(logo)
    try:
        email.send(fail_silently=False)
    except Exception:
        return False
    notice.status, notice.sent_at = 'sent', timezone.now()
    notice.save(update_fields=['status', 'sent_at'])
    return True
