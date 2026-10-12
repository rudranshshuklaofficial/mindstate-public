"""Private raster previews; original guardian files are never returned."""
from io import BytesIO
from contextlib import closing
import threading
from PIL import Image, ImageOps
from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.urls import reverse

_pdf_lock = threading.Lock()  # PDFium is not thread-safe within a process.

def preview_document(request, item):
    if not item.review_started_at:
        raise Http404
    if request.GET.get('revision') != str(item.consent_revision):
        raise Http404
    try:
        with item.consent_document.open('rb') as source:
            raw = source.read(5 * 1024 * 1024 + 1)
        if len(raw) > 5 * 1024 * 1024:
            raise ValueError('Document exceeds preview limit')
        page_value = request.GET.get('page')
        if raw.startswith(b'%PDF-'):
            import pypdfium2 as pdfium
            with _pdf_lock, pdfium.PdfDocument(raw) as doc:
                count = len(doc)
                if count < 1 or count > 40:
                    raise ValueError('Preview supports 1–40 pages')
                if page_value is not None:
                    page_no = int(page_value)
                    if page_no < 0 or page_no >= count:
                        raise Http404
                    with closing(doc[page_no]) as page:
                        width, height = page.get_size()
                        if width <= 0 or height <= 0:
                            raise ValueError('Invalid page size')
                        with closing(page.render(scale=min(1.8, 1600/max(width,height)))) as bitmap:
                            image = bitmap.to_pil().copy()
                else:
                    image = None
        else:
            count = 1
            if page_value is not None and page_value != '0':
                raise Http404
            with Image.open(BytesIO(raw)) as source_image:
                image = ImageOps.exif_transpose(source_image).convert('RGB')
                image.thumbnail((1600, 2000))
        if page_value is not None:
            output = BytesIO()
            image.save(output, format='PNG')
            response = HttpResponse(output.getvalue(), content_type='image/png')
            response['X-Content-Type-Options'] = 'nosniff'
            response['Cache-Control'] = 'private, no-store'
            return response
        urls = [reverse('consent-document',args=[item.pk])+'?revision='+str(item.consent_revision)+'&page='+str(page) for page in range(count)]
        return render(request,'accounts/consent-document.html',{'pages':urls})
    except Http404:
        raise
    except Exception:
        # Fail closed, show an honest retry state rather than expose originals.
        return render(request,'accounts/consent-document.html',{'preview_error':True},status=422)
