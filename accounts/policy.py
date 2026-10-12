from functools import wraps

from django.conf import settings
from django.core.exceptions import PermissionDenied


TEAM_ROLES = ('admin', 'identity_admin', 'core_team_admin', 'moderator', 'editorial', 'tech')


def has_role(user, *roles):
    return user.is_authenticated and user.is_active and user.groups.filter(name__in=roles).exists()


def is_admin(user):
    return user.is_authenticated and user.is_active and (user.is_superuser or has_role(user, 'admin', 'identity_admin'))


def is_team(user):
    return is_admin(user) or has_role(user, *TEAM_ROLES)


def needs_2fa(user):
    return user.is_authenticated and (user.is_staff or is_admin(user) or has_role(user, 'moderator', 'core_team_admin'))


def moderator_ready(user):
    if not has_role(user, 'moderator') or not user.is_verified():
        return False
    record = getattr(user, 'moderatoronboarding', None)
    version = settings.APPROVED_GUIDELINES_VERSION
    return bool(version and record and record.guidelines_version_read == version and record.read_at and record.first_review_with_id and record.approved_by_id and record.approved_at)


def admin_required(view):
    @wraps(view)
    def guarded(request, *args, **kwargs):
        if not is_admin(request.user) or not request.user.is_verified():
            raise PermissionDenied
        return view(request, *args, **kwargs)
    return guarded


def is_core_admin(user):
    return has_role(user, "core_team_admin")
