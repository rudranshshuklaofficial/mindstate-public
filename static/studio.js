(() => {
  // Only the supported text syntax is persisted. Pasted HTML is never accepted.
  function inlineText(parent, value) {
    const parts=value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    for(const part of parts){let tag=null,text=part;if(part.startsWith('**')&&part.endsWith('**')){tag='strong';text=part.slice(2,-2);}else if(part.startsWith('*')&&part.endsWith('*')){tag='em';text=part.slice(1,-1);}if(tag){const node=document.createElement(tag);node.textContent=text;parent.append(node);}else parent.append(document.createTextNode(text));}
  }
  function renderStory(value, parent) {
    parent.replaceChildren();
    for(const block of value.replace(/\r\n/g,'\n').split(/\n\s*\n/)){
      const text=block.trim();if(!text)continue;
      let tag='p',body=text;
      if(text.startsWith('## ')){tag='h3';body=text.slice(3);}else if(text.startsWith('# ')){tag='h2';body=text.slice(2);}else if(text.startsWith('> ')){tag='blockquote';body=text.slice(2);}else if(text.split('\n').every(line=>line.startsWith('- '))){const list=document.createElement('ul');for(const line of text.split('\n')){const li=document.createElement('li');inlineText(li,line.slice(2));list.append(li);}parent.append(list);continue;}
      const node=document.createElement(tag);inlineText(node,body);parent.append(node);
    }
  }
  function serialize(node) {
    if(node.nodeType===Node.TEXT_NODE)return node.textContent;
    if(node.nodeType!==Node.ELEMENT_NODE)return '';
    const inside=[...node.childNodes].map(serialize).join('');
    switch(node.tagName){case 'BR':return '\n';case 'STRONG':case 'B':return '**'+inside+'**';case 'EM':case 'I':return '*'+inside+'*';case 'H2':case 'H1':return '# '+inside.trim()+'\n\n';case 'H3':return '## '+inside.trim()+'\n\n';case 'BLOCKQUOTE':return '> '+inside.trim()+'\n\n';case 'LI':return '- '+inside.trim()+'\n';case 'UL':case 'OL':return inside+'\n';case 'P':case 'DIV':return inside+'\n\n';default:return inside;}
  }
  const form=document.querySelector('[data-composer]');
  if(form){
    const source=form.querySelector('#id_body'),editor=form.querySelector('[data-rich-editor]'),preview=form.querySelector('[data-studio-preview]'),write=form.querySelector('[data-studio-write]');
    const fontChoice=form.querySelector('#id_reading_font'),sizeChoice=form.querySelector('#id_reading_size'),previewBody=form.querySelector('[data-preview-body]');
    function applyType(){for(const element of [editor,previewBody]){element.dataset.readingFont=fontChoice.value||'sans';element.dataset.readingSize=sizeChoice.value||'standard';}}
    fontChoice.addEventListener('change',applyType);sizeChoice.addEventListener('change',applyType);applyType();
    renderStory(source.value,editor);editor.hidden=false;source.hidden=true;source.required=false;
    let range=null;
    function sync(){source.value=[...editor.childNodes].map(serialize).join('').replace(/\n{3,}/g,'\n\n').trim();const words=editor.textContent.trim().split(/\s+/).filter(Boolean).length;form.querySelector('[data-word-count]').textContent=`${words} ${words===1?'word':'words'} · ${source.value.length.toLocaleString()} / 50,000 characters`;}
    function remember(){const selection=window.getSelection();if(selection.rangeCount&&editor.contains(selection.anchorNode))range=selection.getRangeAt(0).cloneRange();}
    document.addEventListener('selectionchange',remember);
    editor.addEventListener('input',()=>{sync();remember();});
    for(const eventName of ['paste','drop'])editor.addEventListener(eventName,event=>{event.preventDefault();const transfer=event.clipboardData||event.dataTransfer;document.execCommand('insertText',false,transfer?.getData('text/plain')||'');sync();});
    form.querySelectorAll('[data-studio-command]').forEach(button=>{
      button.addEventListener('mousedown',event=>event.preventDefault());
      button.addEventListener('click',()=>{editor.focus();if(range){const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);}document.execCommand(button.dataset.studioCommand,false,button.dataset.studioValue||null);sync();remember();});
    });
    form.querySelectorAll('[data-studio-mode]').forEach(button=>button.addEventListener('click',()=>{
      sync();const reading=button.dataset.studioMode==='preview';write.hidden=reading;preview.hidden=!reading;
      form.querySelectorAll('[data-studio-mode]').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));
      if(reading){form.querySelector('[data-preview-title]').textContent=form.querySelector('#id_title').value||'Your title';form.querySelector('[data-preview-summary]').textContent=form.querySelector('#id_summary').value;renderStory(source.value,form.querySelector('[data-preview-body]'));}else editor.focus();
    }));
    form.addEventListener('submit',event=>{sync();if(event.submitter?.value!=='save_draft'&&(!source.value||source.value.length>50000)){event.preventDefault();write.hidden=false;preview.hidden=true;form.querySelector('[data-studio-mode="write"]').setAttribute('aria-pressed','true');form.querySelector('[data-studio-mode="preview"]').setAttribute('aria-pressed','false');editor.focus();form.querySelector('[data-word-count]').textContent=!source.value?'Add some text before sending your work.':'Your text is too long. Keep it under 50,000 characters.';form.querySelector('[data-word-count]').setAttribute('role','alert');}});
    form.querySelectorAll('[data-image-upload]').forEach(tile=>{
      const input=tile.querySelector('input[type=file]'),image=tile.querySelector('[data-upload-preview]'),old=tile.querySelector('[data-existing-preview]'),placeholder=tile.querySelector('[data-image-placeholder]'),clear=tile.querySelector('input[type=checkbox]');let blob=null;
      const remove=tile.querySelector('[data-remove-image]');tile.classList.add('is-upload-ready');
      function refresh(){remove.hidden=!(input.files.length||old&&!clear?.checked);if(blob)URL.revokeObjectURL(blob);const file=input.files[0],removed=clear?.checked;image.hidden=true;if(old)old.hidden=Boolean(file)||removed;placeholder.hidden=Boolean(file)||Boolean(old&&!removed);if(file&&file.type.startsWith('image/')){blob=URL.createObjectURL(file);image.src=blob;image.hidden=false;}else if(file){placeholder.hidden=false;}}
      input.addEventListener('change',()=>{if(clear)clear.checked=false;refresh();});clear?.addEventListener('change',refresh);remove.addEventListener('click',()=>{input.value='';if(clear)clear.checked=true;refresh();input.focus();});refresh();
    });sync();
  }
  document.querySelectorAll('[data-review-gallery]').forEach(gallery=>{const slides=[...gallery.querySelectorAll('[data-review-slide]')];let index=0;const controls=gallery.querySelector('[data-gallery-controls]');function show(next){index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.setAttribute('aria-hidden',String(i!==index));});gallery.querySelector('[data-gallery-count]').textContent=`${index+1} / ${slides.length}`;}if(slides.length){gallery.classList.add('is-gallery-ready');controls.hidden=slides.length<2;show(0);gallery.querySelector('[data-gallery-prev]').addEventListener('click',()=>show(index-1));gallery.querySelector('[data-gallery-next]').addEventListener('click',()=>show(index+1));}});
  const dialog=document.querySelector('[data-image-dialog]');if(dialog){document.querySelectorAll('[data-expand-image]').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img'),large=dialog.querySelector('img');large.src=image.src;large.alt=image.alt;dialog.showModal();dialog.querySelector('[data-close-image]').focus();}));dialog.querySelector('[data-close-image]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});}
})();
