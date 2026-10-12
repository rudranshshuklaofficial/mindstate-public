from copy import copy
from django.urls import reverse

PERSONAL_FIELDS = ('photo_caption', 'detail_caption', 'closing_caption', 'handwritten_note', 'scrapbook_note', 'margin_note', 'sticker_text')
EDITABLE_FIELDS = ('display_name', 'bio') + PERSONAL_FIELDS


def present_profile(context, profile, change=None):
    shown = copy(profile)
    changed = []
    if change:
        for field in EDITABLE_FIELDS:
            if getattr(profile, field) != getattr(change, field):
                changed.append(field)
            setattr(shown, field, getattr(change, field))
    for slot, route in [('avatar', 'profile-avatar'), ('banner', 'profile-banner'), ('folio_image', 'profile-folio-image')]:
        original = getattr(profile, slot)
        url = reverse(route, args=[profile.public_ref]) if original else ''
        if change:
            if getattr(change, 'remove_' + slot):
                if original:
                    changed.append(slot)
                setattr(shown, slot, '')
                url = ''
            elif getattr(change, slot):
                if original.name != getattr(change, slot).name:
                    changed.append(slot)
                setattr(shown, slot, getattr(change, slot))
                url = reverse('profile-change-media', args=[change.pk, slot])
        context['folio_' + slot + '_url'] = url
    context.update(profile=shown, folio_name=shown.display_name, folio_bio=shown.bio,
                   folio_presented=True, changed_fields=' '.join(changed))
    return context
