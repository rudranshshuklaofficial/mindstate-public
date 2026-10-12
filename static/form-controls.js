(()=>{
 document.querySelectorAll('input[type="file"]').forEach(input=>{
  if(input.multiple)return;
  const box=document.createElement('div');box.className='image-picker';
  input.before(box);box.append(input);input.classList.add('picker-native');
  const choose=document.createElement('label');choose.htmlFor=input.id;choose.className='app-button app-outline';choose.textContent='Choose file';box.append(choose);
  const hint=document.createElement('span');hint.className='picker-filename';hint.textContent='Choose or drop a file';box.append(hint);
  const img=document.createElement('img');img.alt='Selected file preview';img.hidden=true;box.append(img);
  const clear=document.createElement('button');clear.type='button';clear.className='picker-remove';clear.textContent='×';clear.setAttribute('aria-label','Remove selected '+(input.closest('.app-field,.composer-field')?.querySelector('label')?.textContent||'file'));clear.hidden=true;box.append(clear);
  let url;
  function refresh(){if(url)URL.revokeObjectURL(url);const file=input.files[0];clear.hidden=!file;img.hidden=!file||!file.type.startsWith('image/');hint.textContent=file?file.name:'Choose or drop a file';choose.textContent=file?'Replace file':'Choose file';if(file&&!img.hidden){url=URL.createObjectURL(file);img.src=url;}}
  input.addEventListener('change',refresh);clear.addEventListener('click',()=>{input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));});
  box.addEventListener('dragover',event=>{event.preventDefault();box.classList.add('is-dragging');});box.addEventListener('dragleave',()=>box.classList.remove('is-dragging'));box.addEventListener('drop',event=>{event.preventDefault();box.classList.remove('is-dragging');if(event.dataTransfer.files.length!==1){hint.textContent='Choose one file for this slot.';return;}input.files=event.dataTransfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));});
 });
 document.querySelectorAll('[data-profile-editor] input[maxlength], [data-profile-editor] textarea[maxlength]').forEach(input=>{const counter=document.createElement('small');counter.className='field-counter';input.after(counter);const update=()=>counter.textContent=input.value.length+' / '+input.maxLength+' characters';input.addEventListener('input',update);update();});
 document.querySelectorAll('[data-profile-editor] select, [data-collaboration-form] select, .collaboration-form select').forEach(select=>{
  const wrap=document.createElement('div');wrap.className='choice-picker';select.before(wrap);wrap.append(select);select.classList.add('picker-native');
  const button=document.createElement('button');button.type='button';button.className='choice-trigger';button.setAttribute('role','combobox');button.setAttribute('aria-expanded','false');button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-label',select.labels[0]?.textContent||'Choose an option');wrap.append(button);
  const list=document.createElement('div');list.className='choice-options';list.setAttribute('role','listbox');list.id=select.id+'-choices';list.hidden=true;button.setAttribute('aria-controls',list.id);wrap.append(list);
  function close(){list.hidden=true;button.setAttribute('aria-expanded','false');}
  function sync(){button.textContent=select.selectedOptions[0]?.textContent+' ▾';list.querySelectorAll('[role=option]').forEach((el,i)=>el.setAttribute('aria-selected',String(i===select.selectedIndex)));}
  Array.from(select.options).forEach(option=>{const item=document.createElement('button');item.type='button';item.setAttribute('role','option');item.textContent=option.textContent;item.disabled=option.disabled;item.addEventListener('click',()=>{select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));close();button.focus();});list.append(item);});
  button.addEventListener('click',()=>{list.hidden=!list.hidden;button.setAttribute('aria-expanded',String(!list.hidden));if(!list.hidden)list.children[select.selectedIndex]?.focus();});wrap.addEventListener('keydown',event=>{if(event.key==='Escape'){close();button.focus();}if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();list.hidden=false;button.setAttribute('aria-expanded','true');const items=Array.from(list.children).filter(el=>!el.disabled);let index=items.indexOf(document.activeElement);index=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items[index]?.focus();}});document.addEventListener('click',event=>{if(!wrap.contains(event.target))close();});select.addEventListener('change',sync);sync();
 });
})();