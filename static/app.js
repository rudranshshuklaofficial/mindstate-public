document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.account-menu[open]').forEach((menu) => {
    menu.open = false;
    menu.querySelector('summary').focus();
  });
});
document.addEventListener('click', (event) => {
  document.querySelectorAll('.account-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
document.querySelectorAll('[data-share-url]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.share-status');
    try {
      if (navigator.share) await navigator.share({title:'MindState profile',url:button.dataset.shareUrl});
      else { await navigator.clipboard.writeText(button.dataset.shareUrl); status.textContent='Profile link copied.'; }
    } catch (error) {
      if (error.name === 'AbortError') return;
      let input = button.parentElement.querySelector('.share-link-fallback');
      if (!input) { input=document.createElement('input'); input.className='share-link-fallback'; input.readOnly=true; input.setAttribute('aria-label','Profile share link'); button.parentElement.append(input); }
      input.value=button.dataset.shareUrl; input.focus(); input.select(); status.textContent='Copy this profile link.';
    }
  });
});
document.querySelectorAll('.post-filters').forEach((filters) => {
  filters.addEventListener('click', (event) => {
    const button=event.target.closest('[data-post-filter]'); if (!button) return;
    filters.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    const panel=filters.closest('section'); let visible=0;
    panel.querySelectorAll('[data-post-kind]').forEach(item=>{item.hidden=button.dataset.postFilter!=='all'&&item.dataset.postKind!==button.dataset.postFilter;if(!item.hidden) visible++;});
    const empty=panel.querySelector('.filter-empty'); if(empty) empty.hidden=visible>0||!panel.querySelector('[data-post-kind]');
  });
});

(() => {
 const body=document.querySelector('#id_body');
 if(!body||document.querySelector('[data-composer]'))return;
 document.querySelectorAll('[data-editor-wrap],[data-editor-prefix]').forEach(button=>button.addEventListener('click',()=>{
   const start=body.selectionStart,end=body.selectionEnd,selected=body.value.slice(start,end)||'Your text';
   const wrap=button.dataset.editorWrap,prefix=button.dataset.editorPrefix;
   const value=wrap?wrap+selected+wrap:'\n\n'+prefix+selected+'\n\n';
   body.setRangeText(value,start,end,'select');body.focus();body.dispatchEvent(new Event('input',{bubbles:true}));
 }));
})();
document.querySelectorAll('[data-copy-input],[data-copy-url]').forEach(button=>button.addEventListener('click',async()=>{
 const input=button.dataset.copyInput?document.getElementById(button.dataset.copyInput):null;
 const value=input?input.value:new URL(button.dataset.copyUrl,location.origin).href;
 const panel=button.closest('.workspace-panel,.art-card-actions');const status=panel?.querySelector('.copy-status');
 try{await navigator.clipboard.writeText(value);if(status)status.textContent='Link copied.';}catch{if(input){input.focus();input.select();}else{let fallback=panel.querySelector('.copy-link-fallback');if(!fallback){fallback=document.createElement('input');fallback.className='copy-link-fallback';fallback.readOnly=true;fallback.setAttribute('aria-label','Shareable link');panel.append(fallback);}fallback.value=value;fallback.focus();fallback.select();}if(status)status.textContent='Select and copy this link.';}
}));
