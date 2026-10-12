from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from accounts.models import AccountDeletion
from accounts.services import audit

class Command(BaseCommand):
    help='Anonymize accounts whose 14-day deletion cancellation period has elapsed.'
    def handle(self,*args,**kwargs):
        ids=list(AccountDeletion.objects.filter(cancelled_at__isnull=True,completed_at__isnull=True,purge_at__lte=timezone.now()).values_list('user_id',flat=True))
        for member_id in ids:
            with transaction.atomic():
                member=get_user_model().objects.select_for_update().get(pk=member_id)
                deletion=AccountDeletion.objects.select_for_update().get(user=member)
                if deletion.cancelled_at or deletion.completed_at or deletion.purge_at>timezone.now():
                    continue
                from accounts.deletion_cleanup import anonymize_member
                deletion.files_pending=anonymize_member(member)
                deletion.completed_at=timezone.now();deletion.save(update_fields=['completed_at','files_pending'])
                audit(None,'account.deletion_completed',deletion)
        from django.core.files.storage import default_storage
        for deletion in AccountDeletion.objects.filter(completed_at__isnull=False).exclude(files_pending=[]):
            remaining=[]
            for path in deletion.files_pending:
                try:
                    default_storage.delete(path)
                except Exception:
                    remaining.append(path)
            deletion.files_pending=remaining
            deletion.cleanup_error='Some private files could not be removed. Run this command again to retry.' if remaining else ''
            deletion.save(update_fields=['files_pending','cleanup_error'])
            if remaining:self.stderr.write(deletion.cleanup_error)
        self.stdout.write('Eligible account deletions processed.')
