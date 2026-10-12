from django.core.management.base import BaseCommand
from accounts.newsletter import run_newsletters
class Command(BaseCommand):
    help='Build due editions; --deliver sends enabled schedules. Safe default: no email.'
    def add_arguments(self,parser):parser.add_argument('--deliver',action='store_true')
    def handle(self,*args,**options):
        count=run_newsletters(deliver=options['deliver'])
        self.stdout.write(f'{count} new editions prepared. Delivery {"enabled" if options["deliver"] else "disabled"}.')
