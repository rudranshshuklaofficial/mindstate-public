from django.contrib import messages
from django.conf import settings
from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe
from pathlib import Path
from django.core import signing
from django.http import JsonResponse, HttpResponseBadRequest
from django.template.loader import render_to_string
from django.urls import reverse
from urllib.parse import urlencode
from accounts.visibility import visible_posts
from .community import COMMUNITY_MEMBERS, directory_members
from .models import CommunityVoice, EventConversation, FeaturedEdition, LandingContent, Newsletter, Waitlist


def contribute(request):
	content_dir = Path(settings.BASE_DIR) / 'templates'
	return render(request, 'contribute.html', {
		'full_guidelines': mark_safe((content_dir / 'contribute-full.html').read_text(encoding='utf-8')),
		'guidelines_toc': mark_safe((content_dir / 'contribute-toc.html').read_text(encoding='utf-8')),
	})


@login_required
def home(request):
	if request.method == 'POST':
		from accounts.newsletter_views import subscribe
		return subscribe(request)

	content = visible_posts(LandingContent.objects.filter(is_published=True))
	try:
		article_page = home_article_page(request)
	except signing.BadSignature:
		return HttpResponseBadRequest('This article page link is invalid. Return to the homepage.')
	latest_articles = list(content.filter(section=LandingContent.ARTICLES).order_by('-published_at', 'display_order')[:2])
	latest_art = list(content.filter(section=LandingContent.ART).order_by('-published_at', 'display_order')[:2])
	recently_added = []
	for index in range(max(len(latest_articles), len(latest_art))):
		for group in [latest_articles, latest_art]:
			if index < len(group):
				recently_added.append(group[index])
	pick_ids = [1005, 2006, 1008]
	picks = content.in_bulk(pick_ids)
	return render(request, 'home.html', {
		**article_page,
		'landing_events': content.filter(section=LandingContent.EVENTS)[:3],
		'recently_added': recently_added,
		'editor_picks': [picks[pk] for pk in pick_ids if pk in picks],
		'artworks': content.filter(section=LandingContent.ART),
		'community_voices': CommunityVoice.objects.filter(is_published=True)[:3],
	})

@login_required
def article(request, pk):
	content = get_object_or_404(
		visible_posts(LandingContent.objects.all()),
		pk=pk,
		is_published=True,
	)
	from accounts.experience import record_read
	record_read(request, content)
	snapshot = content.submission.snapshots.order_by('-revision').first() if content.submission_id else None
	other_content = visible_posts(LandingContent.objects.filter(is_published=True)).exclude(pk=content.pk)
	related_articles = list(other_content.filter(
		section=content.section,
	)[:2]) + list(other_content.exclude(section=content.section)[:2])
	community_voices = CommunityVoice.objects.filter(is_published=True)[:3]
	return render(request, 'reader.html', {
		'article': content,
		'snapshot': snapshot,
		'related_articles': related_articles,
		'community_voices': community_voices,
	})

@login_required
def search(request):
	query = request.GET.get('q', '').strip()
	results = visible_posts(LandingContent.objects.filter(
		is_published=True,
		section__in=[LandingContent.ARTICLES, LandingContent.ART],
	))
	section = request.GET.get('section', '')
	if section in [LandingContent.ARTICLES, LandingContent.ART]:
		results = results.filter(section=section)
	if query:
		results = results.filter(
			Q(title__icontains=query)
			| Q(description__icontains=query)
			| Q(author__icontains=query)
			| Q(tags__icontains=query)
		)
	return render(request, 'search.html', {
		'search_query': query,
		'search_results': results,
		'search_section': section,
	})


@login_required
def community_directory(request):
	ordered_members = directory_members()
	grouped_members = {}
	for member in ordered_members:
		letter = member['name'][0].upper()
		grouped_members.setdefault(letter, []).append(member)

	return render(request, 'community-directory.html', {
		'community_members': ordered_members,
		'member_groups': [
			{'letter': letter, 'members': members}
			for letter, members in grouped_members.items()
		],
		'member_count': len(ordered_members),
		'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		'available_letters': set(grouped_members),
	})

@login_required
def art_post(request, slug):
	content = get_object_or_404(visible_posts(LandingContent.objects.all()), section=LandingContent.ART,
		link_url=f'/app/art/{slug}/', is_published=True)
	return article(request, content.pk)


@login_required
def art_gallery(request):
	return render(request, 'art-gallery.html', {'artworks': visible_posts(LandingContent.objects.filter(section=LandingContent.ART, is_published=True))})

@login_required
def landing(request):
	if request.method == 'POST':
		name = request.POST.get('name', '').strip()
		email = request.POST.get('email', '').strip()
		if email:
			Waitlist.objects.get_or_create(email=email, defaults={'name': name})
			messages.success(request, 'You have been added to the waitlist.')
		return redirect('landing')

	return render(request, 'landing.html', {
		'featured_editions': FeaturedEdition.objects.filter(is_published=True),
		'community_voices': CommunityVoice.objects.filter(is_published=True),
		'events_conversations': EventConversation.objects.filter(is_published=True),
		'newsletters': Newsletter.objects.filter(is_published=True),
	})


def home_article_page(request):
    from django.db.models import F
    from django.utils.dateparse import parse_date
    token = request.GET.get('cursor', '')
    items = visible_posts(LandingContent.objects.filter(is_published=True, section=LandingContent.ARTICLES)).order_by('display_order',F('published_at').desc(nulls_last=True),'-pk')
    size = 8
    if token:
        last = signing.loads(token, salt='home-articles', max_age=86400)
        if not isinstance(last,list) or len(last)!=3 or not isinstance(last[0],int) or not isinstance(last[2],int):
            raise signing.BadSignature('Invalid cursor')
        order, date, pk = last
        after = Q(published_at__isnull=True,pk__lt=pk)
        if date is not None:
            date=parse_date(date)
            if date is None:raise signing.BadSignature('Invalid cursor date')
            after=Q(published_at__lt=date)|Q(published_at__isnull=True)|Q(published_at=date,pk__lt=pk)
        items=items.filter(Q(display_order__gt=order)|(Q(display_order=order)&after))
        size = 4
    page = list(items[:size + 1])
    has_more = len(page) > size
    page = page[:size]
    next_token = signing.dumps([page[-1].display_order,page[-1].published_at.isoformat() if page[-1].published_at else None,page[-1].pk], salt='home-articles') if has_more else ''
    query = '?' + urlencode({'cursor':next_token}) if next_token else ''
    return {'articles':page, 'articles_more':has_more, 'articles_next':reverse('home-articles-more')+query if query else '', 'articles_fallback':reverse('home')+query+'#home-articles' if query else ''}


@login_required
def home_articles_more(request):
    try:
        context = home_article_page(request)
    except signing.BadSignature:
        return HttpResponseBadRequest('Invalid article page link.')
    return JsonResponse({'html':render_to_string('home-article-batch.html', context, request=request), 'has_more':context['articles_more'], 'next_url':context['articles_next'], 'fallback_url':context['articles_fallback']})
