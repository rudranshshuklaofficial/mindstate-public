"""Assemble the supplied scrapbook artwork into email-safe, linked image cells.

Only local published featured files are read; no server-side URL fetching.
The responsive web edition uses the original HTML artwork instead.
"""
from io import BytesIO
from pathlib import Path
from urllib.parse import urlparse,unquote
from PIL import Image,ImageOps,ImageDraw,ImageFont,ImageEnhance
from django.contrib.staticfiles import finders
from django.template.loader import render_to_string
from email.message import MIMEPart
from django.core.mail import EmailMultiAlternatives

HOME='https://mindstate.space/'
SCALE=2

def photo_url(url):
    # Display-only crop of the black scan surround; the published art is untouched.
    from urllib.parse import urljoin
    if urlparse(url).path=='/static/art-posts/04-looking-back-at-yourself/image_01_featured.jpg':
        return urljoin(url,'/static/newsletter-v6/looking-back-at-yourself-cropped.jpg')
    return url

def local_photo(post):
    path=unquote(urlparse(photo_url(post.image_url)).path)
    if path.startswith('/static/'):
        found=finders.find(path[8:])
        if found:return Image.open(found).convert('RGBA')
    import re
    from django.core.files.storage import default_storage
    from .models import SubmissionSnapshot
    match=re.fullmatch(r'/submissions/(\d+)/media/(\d+)/featured/',path)
    if match and post.submission_id==int(match[1]):
        snapshot=SubmissionSnapshot.objects.filter(submission_id=post.submission_id,revision=int(match[2])).first()
        if snapshot and snapshot.featured_image:
            with default_storage.open(snapshot.featured_image,'rb') as file:return Image.open(file).convert('RGBA')
    raise ValueError('A featured photo is unavailable locally. Restore its published asset before retrying.')

def artwork(name):
    path=finders.find('newsletter-v6/'+name+'.png')
    if not path:raise ValueError('Newsletter artwork is missing.')
    return Image.open(path).convert('RGBA')

class NewsletterEmail(EmailMultiAlternatives):
    """Keep inline artwork related to HTML, never as a separate attachment list."""
    def _add_attachments(self,message):
        if not self.attachments:return
        html=message.get_body(preferencelist=('html',))
        if html is None:raise ValueError('Newsletter artwork requires an HTML body.')
        if any(not isinstance(part,MIMEPart) or not part.get('Content-ID') for part in self.attachments):
            raise ValueError('Newsletter attachments must be inline artwork.')
        html.make_related()
        html.set_param('type','text/html')
        for part in self.attachments:html.attach(part)

def newsletter_font(size,weight=400):
    path=finders.find('fonts/newsletter-google-sans-flex.woff2')
    if not path:raise ValueError('Google Sans Flex newsletter font is missing.')
    font=ImageFont.truetype(path,round(size*SCALE))
    font.set_variation_by_axes([weight])
    return font

def captioned_photo(post,width,height,index):
    """Keep captions inside the photo, underneath the original paper borders."""
    size=(round(width*SCALE),round(height*SCALE))
    image=ImageOps.fit(local_photo(post),size,method=Image.Resampling.LANCZOS)
    image=ImageEnhance.Brightness(image).enhance(.62)
    draw=ImageDraw.Draw(image)
    font_size=18 if width>200 else 14
    font=newsletter_font(font_size,600)
    small=newsletter_font(11,500)
    left,right={0:(42,20),2:(35,12),4:(12,35)}.get(index,(12,12))
    max_width=size[0]-(left+right)*SCALE
    center=(size[0]+(left-right)*SCALE)//2
    words=post.title.split();lines=[];line=''
    for word in words:
        proposed=(line+' '+word).strip()
        if draw.textlength(proposed,font=font)>max_width and line:
            lines.append(line);line=word
        else:line=proposed
    if line:lines.append(line)
    limit=3
    if len(lines)>limit:lines=lines[:limit];lines[-1]+='…'
    for i,line in enumerate(lines):
        while draw.textlength(line,font=font)>max_width and len(line)>1:line=line[:-2]+'…'
        lines[i]=line
    line_height=(font_size+3)*SCALE
    total=len(lines)*line_height+18*SCALE
    y=(size[1]-total)//2
    for line in lines:
        draw.text((center,y),line,font=font,fill='white',anchor='mt',stroke_width=1,stroke_fill='#292021')
        y+=line_height
    draw.text((center,y+4*SCALE),'Read post',font=small,fill='white',anchor='mt')
    return image

def canvas_for(data):
    canvas=Image.new('RGBA',(1200,2106),'#fef0d8')
    def place(image,x,y,w,h,angle=0,origin=(0,0),fit=False):
        size=(round(w*SCALE),round(h*SCALE))
        image=ImageOps.fit(image,size) if fit else image.resize(size,Image.Resampling.LANCZOS)
        if angle:
            # Rotate on a full-size transparent layer around the CSS transform origin.
            layer=Image.new('RGBA',canvas.size)
            layer.alpha_composite(image,(round(x*SCALE),round(y*SCALE)))
            pivot=(round((x+w*origin[0])*SCALE),round((y+h*origin[1])*SCALE))
            layer=layer.rotate(-angle,resample=Image.Resampling.BICUBIC,center=pivot)
            canvas.alpha_composite(layer)
        else:canvas.alpha_composite(image,(round(x*SCALE),round(y*SCALE)))
    place(artwork('header'),112,27,375,250)
    place(artwork('footer'),0,747,611,306)
    slots=[(64.51,338,240.81,150.5,2.48),(385,343,142,138,-4.695),(67,592,153,90,0),(220,592,153,90,0),(370,592,153,90,0)]
    for index,(post,slot) in enumerate(zip(data['featured_posts'],slots)):place(captioned_photo(post,slot[2],slot[3],index),*slot)
    # Match the original sprite placement and frame overlays.
    strip=artwork('strip')
    strip1=strip.resize((340,round(90*5.6416*2)),Image.Resampling.LANCZOS).crop((0,0,340,180))
    strip2=strip.resize((348,round(92*5.6416*2)),Image.Resampling.LANCZOS).crop((0,199,348,383))
    place(strip1,135,592,170,90);place(strip2,286,592,174,92)
    bottom=artwork('bottom-frame').resize((1102,round(166*1.8693*2)),Image.Resampling.LANCZOS).crop((0,30,1102,362))
    place(bottom,24,550,551,166)
    place(artwork('left-frame'),24,298,332,228,2.48,(.46,.5))
    place(artwork('right-frame'),364,306,206,206,-4.695,(.46,.5))
    return canvas.convert('RGB')

def email_parts(data):
    canvas=canvas_for(data)
    posts=data['featured_posts']
    # Every post cell has its own ordinary anchor, supported in Gmail/Outlook.
    specifications=[('header',(0,0,600,298),None),('left',(0,298,356,550),0),('right',(356,298,600,550),1),('bottom1',(0,550,220,716),2),('bottom2',(220,550,373,716),3),('bottom3',(373,550,600,716),4),('footer',(0,716,600,1053),None)]
    cells=[]
    for name,box,index in specifications:
        stream=BytesIO();canvas.crop(tuple(v*SCALE for v in box)).save(stream,'JPEG',quality=92,optimize=True)
        post=posts[index] if index is not None and index<len(posts) else None
        cells.append({'name':name,'cid':'mindstate-weekly-'+name,'width':round((box[2]-box[0])*1.2),'percent':format((box[2]-box[0])/6,'.6f'),'height':box[3]-box[1],'bytes':stream.getvalue(),'url':post.newsletter_url if post else HOME,'alt':post.title if post else ('MindState — posts of the week' if name=='header' else 'Visit MindState')})
    return cells

def attach_parts(message,cells):
    for cell in cells:
        image=MIMEPart()
        image.set_content(cell['bytes'],maintype='image',subtype='jpeg')
        image.add_header('Content-ID','<'+cell['cid']+'>')
        image.add_header('Content-Disposition','inline')
        message.attach(image)

def mail_html(data):
    cells=email_parts(data)
    context={**data,'header_cell':cells[0],'top_cells':cells[1:3],'bottom_cells':cells[3:6],'footer_cell':cells[6]}
    return render_to_string('accounts/newsletter-email.html',context),cells
