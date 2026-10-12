from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Send one labelled Workspace delivery test to team@mindstate.space.'

    def handle(self, *args, **options):
        if not settings.EMAIL_DELIVERY_ENABLED:
            raise CommandError('Workspace SMTP is not configured. Run the hidden-input setup locally.')
        try:
            delivered = send_mail('[MindState TEST] Local delivery verification', 'This is the single authorized local delivery test for MindState account recovery and guardian-consent notifications. No member action is needed.', settings.DEFAULT_FROM_EMAIL, ['team@mindstate.space'], fail_silently=False)
        except Exception as error:
            raise CommandError('Workspace delivery test failed. Check the sender account and app-password configuration.') from None
        if delivered != 1:
            raise CommandError('The mail server did not accept the delivery test.')
        self.stdout.write(self.style.SUCCESS('The mail server accepted one test addressed to team@mindstate.space. Confirm its arrival in that mailbox.'))
