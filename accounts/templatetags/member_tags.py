from django import template
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from accounts.models import PostCredit

register = template.Library()

@register.simple_tag
def author_links(post):
    people = [({'anonymous_credit': True, 'role': credit.contributor.role} if credit.anonymous else credit.contributor)
              for credit in PostCredit.objects.filter(post=post).select_related('contributor__profile__user')]
    if not people:
        from django.utils.html import escape
        return escape(post.author or 'MindState')
    return mark_safe(render_to_string('accounts/author-links.html', {'contributors': people}))


@register.simple_tag
def contributor_url(name):
    from accounts.models import Contributor
    from django.urls import reverse
    person = Contributor.objects.filter(name=name).select_related('profile').first()
    if not person:
        return reverse('community-directory')
    return reverse('profile-view', args=[person.profile.public_ref]) if person.profile_id else reverse('contributor-view', args=[person.pk])


@register.filter
def story_format(value):
    import re
    from django.utils.html import escape
    blocks = []
    for paragraph in re.split(r'\n\s*\n', str(value).replace('\r\n', '\n')):
        text = escape(paragraph.strip())
        if not text:
            continue
        text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)
        if text.startswith('## '):
            blocks.append('<h3>' + text[3:] + '</h3>')
        elif text.startswith('# '):
            blocks.append('<h2>' + text[2:] + '</h2>')
        elif all(line.startswith('- ') for line in text.split('\n')):
            blocks.append('<ul>' + ''.join('<li>' + line[2:] + '</li>' for line in text.split('\n')) + '</ul>')
        elif text.startswith('&gt; '):
            blocks.append('<blockquote>' + text[5:] + '</blockquote>')
        else:
            blocks.append('<p>' + text.replace('\n', '<br>') + '</p>')
    return mark_safe(''.join(blocks))
