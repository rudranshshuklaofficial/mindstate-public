"""Editorial folio copy and excerpts from credited, published writing only."""
from hashlib import sha256
from html.parser import HTMLParser
import re

from django.template import TemplateDoesNotExist
from django.template.loader import get_template
from django.urls import reverse
from django.utils.text import Truncator


NOTEBOOKS = (
    {
        'bio': 'A notebook for the small ideas that make a digital space feel welcoming.',
        'handwritten': 'One thoughtful detail at a time.',
        'caption': 'Sketch it. Try it. Make room for people.',
        'lines': ('start with a small idea', 'make the next step clear', 'leave room to explore', 'give every detail care'),
        'projects': (
            ('Interface', '</>', 'A warmer first hello', 'Explore a welcoming entry point for people discovering MindState.', 'UI development'),
            ('Experience', '↔', 'Finding your way', 'Try clearer paths between stories, art and contributor spaces.', 'Navigation'),
            ('Foundations', '✳', 'Notes for the next builder', 'Document a shared component so another contributor can pick it up.', 'Documentation'),
        ),
    },
    {
        'bio': 'A little workshop for turning rough ideas into useful, everyday experiences.',
        'handwritten': 'Good things begin with a rough draft.',
        'caption': 'Ask a question. Test an idea. Keep refining.',
        'lines': ('begin with a question', 'build a working sketch', 'try the unexpected path', 'keep a note for later'),
        'projects': (
            ('Interface', '</>', 'From sketch to screen', 'Prototype a paper-inspired layout using MindState’s shared components.', 'Prototyping'),
            ('Experience', '↔', 'Room for every screen', 'Explore how a contributor flow works on small screens and with a keyboard.', 'Accessibility'),
            ('Foundations', '✳', 'A fix worth keeping', 'Reproduce a small bug and describe a test that keeps it from returning.', 'Maintenance'),
        ),
    },
    {
        'bio': 'An open page for experiments, careful questions and things worth making together.',
        'handwritten': 'Curiosity belongs in the margins.',
        'caption': 'Notice a gap. Connect the pieces. Share the learning.',
        'lines': ('notice what feels missing', 'connect the small pieces', 'check how it feels to use', 'share what you discover'),
        'projects': (
            ('Interface', '</>', 'Pieces that belong together', 'Try a consistent set of controls for a future MindState page.', 'Components'),
            ('Experience', '↔', 'The quieter interactions', 'Explore helpful feedback for loading, empty and completed states.', 'Interaction design'),
            ('Foundations', '✳', 'A clearer starting point', 'Write a practical setup note for the next person contributing code.', 'Developer guidance'),
        ),
    },
)


def developer_copy(name):
    # These are editorial/demo prompts, never claims about a member’s achievements.
    known = {'ashish maurya': 0, 'rudransh shukla': 1}
    index = known.get(name.casefold(), int(sha256(name.encode()).hexdigest()[:8], 16) % len(NOTEBOOKS))
    return {**NOTEBOOKS[index], 'window': f'{name} / idea notes'}


class SourceParagraphs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.paragraphs = []
        self.parts = None

    def handle_starttag(self, tag, attrs):
        if tag == 'p' and 'source-paragraph' in dict(attrs).get('class', '').split():
            self.parts = []
        elif tag == 'br' and self.parts is not None:
            self.parts.append(' ')

    def handle_data(self, data):
        if self.parts is not None:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == 'p' and self.parts is not None:
            self.paragraphs.append(''.join(self.parts))
            self.parts = None


def writing_excerpt(posts):
    for post in posts.filter(section='articles').select_related('submission'):
        if post.submission_id:
            snapshot = post.submission.snapshots.order_by('-revision').first()
            if not snapshot or snapshot.content_warning:
                continue
            paragraphs = []
            for paragraph in re.split(r'\n\s*\n', snapshot.body.replace('\r\n', '\n')):
                if paragraph.lstrip().startswith(('#', '- ')):
                    continue
                # Match the small Markdown subset supported by the published reader.
                paragraph = re.sub(r'^>\s?', '', paragraph.strip())
                paragraph = re.sub(r'\*\*(.+?)\*\*|(?<!\*)\*([^*]+)\*(?!\*)', lambda m: m[1] or m[2], paragraph)
                paragraphs.append(paragraph)
        else:
            try:
                source = get_template(f'article-content/{post.pk}.html').template.source
            except TemplateDoesNotExist:
                continue
            # Sensitive pieces retain their warning in the reader, rather than being excerpted here.
            if 'library-warning' in source:
                continue
            parser = SourceParagraphs()
            parser.feed(source)
            paragraphs = parser.paragraphs
        text = ' '.join(' '.join(p.split()) for p in paragraphs[:2]).strip()
        if text:
            return {'text': Truncator(text).chars(240), 'title': post.title,
                    'url': reverse('article', args=[post.pk])}
    return None
