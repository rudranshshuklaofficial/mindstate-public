from django.db.models import Q
from django.contrib.auth import get_user_model
from .models import AccountDeletion
def hidden_member_ids():
    from .community_services import active_restrictions
    return get_user_model().objects.filter(Q(pk__in=AccountDeletion.objects.filter(cancelled_at__isnull=True).values('user_id'))|Q(pk__in=active_restrictions().values('member_id'))).values_list('pk',flat=True)
def visible_posts(queryset):
    hidden=hidden_member_ids()
    return queryset.exclude(Q(profile_credits__contributor__profile__user_id__in=hidden)|Q(submission__owner_id__in=hidden)).distinct()
