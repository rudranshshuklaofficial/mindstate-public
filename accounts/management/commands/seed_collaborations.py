from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

from accounts.models import Collaboration, CollaborationMember, CollaborationNote, Submission


class Command(BaseCommand):
    help = 'Add clearly labelled local demo collaboration requests, optionally one for an existing test member.'

    def add_arguments(self, parser):
        parser.add_argument('--owner', help='Existing local test username for the My collaborations example.')

    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise CommandError('Demo collaboration data is only available in local development.')
        User = get_user_model()
        owner = None
        if options['owner']:
            owner = User.objects.filter(username=options['owner']).first()
            if owner is None:
                raise CommandError('Choose an existing local test account.')
        examples = [
            ('demo_collab_writer', 'Demo writer', 'art', 'The shape of a quiet morning', 'A short essay about finding a slower start. Looking for one human-drawn illustration with soft shapes and a sense of light.', 'en', False),
            ('demo_collab_artist', 'Demo artist', 'writing', 'Ein kleiner Ort zum Ankommen', 'Eine handgezeichnete Szene braucht einen kurzen poetischen Text. Wir möchten einen ruhigen Moment gemeinsam erzählen.', 'de', True),
        ]
        for username, name, need, title, brief, language, anonymous in examples:
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_unusable_password()
                user.save()
                user.profile.display_name = name
                user.profile.save()
            if not Collaboration.objects.filter(is_demo=True, created_by=user, submission__title=title).exists():
                submission = Submission.objects.create(owner=user, title=title, section='articles' if need == 'art' else 'art', language=language, summary='', body='')
                collab = Collaboration.objects.create(created_by=user, submission=submission, need=need, brief=brief, is_demo=True,
                    draft_reference='Demo reference: a quiet room, an open window and the first light of the day. No external image reference is required.')
                CollaborationMember.objects.create(collaboration=collab, user=user, role='writer' if need == 'art' else 'artist', anonymous=anonymous)
                CollaborationNote.objects.create(collaboration=collab, author=user, label='Writer' if need == 'art' else 'Artist', body='Demo note: happy to discuss the mood and composition before we begin.')
        if owner and not Collaboration.objects.filter(is_demo=True, created_by=owner).exists():
            submission = Submission.objects.create(owner=owner, title='A shared page for small moments', section='articles', summary='A demo draft for two perspectives.', body='Some days, a small moment is enough to begin again.')
            collab = Collaboration.objects.create(created_by=owner, submission=submission, need='art', is_demo=True, brief='My demo collaboration: a personal essay looking for a hand-drawn visual response.')
            CollaborationMember.objects.create(collaboration=collab, user=owner, role='writer')
        self.stdout.write(self.style.SUCCESS('Local demo collaboration requests are ready at /collaborate/. No real work was published.'))
