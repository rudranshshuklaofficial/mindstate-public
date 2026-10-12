from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    if created and not kwargs.get('raw'):
        Profile.objects.get_or_create(user=instance)


from django.contrib.auth.signals import user_logged_in, user_logged_out
from .services import audit

@receiver(user_logged_in)
def log_sign_in(sender, user, **kwargs):
    audit(user, 'account.signed_in', user)
    from .community_services import enroll
    enroll(user)

@receiver(user_logged_out)
def log_sign_out(sender, user, **kwargs):
    if user:
        audit(user, 'account.signed_out', user)


from django.contrib.admin.models import LogEntry
from .models import AuditLog
from .services import request_has_audit
import json

@receiver(post_save, sender=LogEntry)
def record_maintenance_action(sender, instance, created, **kwargs):
    if not created or kwargs.get('raw'):
        return
    fields = []
    try:
        changes = json.loads(instance.change_message)
        if isinstance(changes, list):
            for change in changes:
                if isinstance(change, dict) and isinstance(change.get('changed'), dict):
                    fields.extend(str(field)[:80] for field in change['changed'].get('fields', []))
    except (ValueError, TypeError):
        pass
    action = {1: 'maintenance.created', 2: 'maintenance.changed', 3: 'maintenance.deleted'}.get(instance.action_flag, 'maintenance.action')
    content_type = instance.content_type
    AuditLog.objects.create(actor_id=instance.user_id, action=action, target_type=f'{content_type.app_label}.{content_type.model}' if content_type else 'maintenance', target_id=str(instance.object_id or '')[:80], details={'fields': fields})
    request_has_audit.set(True)
