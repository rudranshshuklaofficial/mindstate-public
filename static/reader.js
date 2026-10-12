(()=>{
 const book=document.querySelector('[data-book]');
 if(book){
  const viewport=book.querySelector('[data-book-viewport]'),content=book.querySelector('[data-book-content]'),previous=book.querySelector('[data-book-prev]'),next=book.querySelector('[data-book-next]'),count=book.querySelector('[data-book-count]'),expand=book.querySelector('[data-book-expand]'),appearance=book.querySelector('[data-book-text]'),settings=book.querySelector('[id=reader-settings]'),closed=book.querySelector('[data-book-closed]'),open=book.querySelector('[data-book-open]'),soundButton=book.querySelector('[data-book-sound]');
  const font=book.querySelector('[data-reader-font]'),size=book.querySelector('[data-reader-size]'),spacing=book.querySelector('[data-reader-spacing]');
  let spread=0,spreads=1,columns=2,pages=2,step=0,turning=false,sound=true,audioContext,readingAnchor=null;
  book.classList.add('is-paged','is-closed');book.querySelectorAll('.book-toolbar [hidden],.book-controls[hidden]').forEach(el=>el.hidden=false);closed.hidden=false;
  function playPaper(){if(!sound)return;try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();const length=Math.round(audioContext.sampleRate*.13),buffer=audioContext.createBuffer(1,length,audioContext.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/length);const noise=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();noise.buffer=buffer;filter.type='lowpass';filter.frequency.value=1100;gain.gain.value=.07;noise.connect(filter).connect(gain).connect(audioContext.destination);noise.start();}catch{sound=false;soundButton.setAttribute('aria-pressed','false');}}
  // Remember a character in the current passage, rather than a page number:
  // page numbers change when the leaves are resized.
  function rememberPassage(){
   const bounds=viewport.getBoundingClientRect(),cover=content.querySelector('.book-cover');
   if(cover&&cover.getBoundingClientRect().right>bounds.left){readingAnchor={element:cover};return;}
   const walker=document.createTreeWalker(content,NodeFilter.SHOW_TEXT);
   for(let node;node=walker.nextNode();){
    if(!node.textContent.trim())continue;
    const range=document.createRange();range.selectNodeContents(node);
    if(![...range.getClientRects()].some(rect=>rect.right>bounds.left+1&&rect.left<bounds.right&&rect.bottom>bounds.top&&rect.top<bounds.bottom))continue;
    let low=0,high=node.length-1;
    while(low<high){const middle=Math.floor((low+high)/2);range.setStart(node,middle);range.setEnd(node,middle+1);if(range.getBoundingClientRect().right<=bounds.left+1)low=middle+1;else high=middle;}
    readingAnchor={node,offset:low};return;
   }
  }
  function layout(){
   if(book.classList.contains('is-closed'))return;
   const width=viewport.getBoundingClientRect().width;if(width<1)return;
   columns=width<550?1:2;
   book.classList.toggle('is-single-page',columns===1);
   const gap=Number.parseFloat(getComputedStyle(book).getPropertyValue('--book-gap'))||64,pageWidth=Math.floor((width-gap*(columns-1))/columns);
   book.style.setProperty('--book-page-width',`${pageWidth}px`);
   if(book.classList.contains('is-expanded')||document.fullscreenElement===book)book.style.setProperty('--book-height',`${Math.max(360,innerHeight-230)}px`);else book.style.removeProperty('--book-height');
   step=(pageWidth+gap)*columns;
   pages=Math.max(columns,Math.ceil((content.scrollWidth+gap)/(pageWidth+gap)));spreads=Math.ceil(pages/columns);
   if(readingAnchor){let rect;if(readingAnchor.element)rect=readingAnchor.element.getBoundingClientRect();else if(readingAnchor.node.isConnected){const range=document.createRange();range.setStart(readingAnchor.node,readingAnchor.offset);range.setEnd(readingAnchor.node,Math.min(readingAnchor.offset+1,readingAnchor.node.length));rect=range.getBoundingClientRect();}if(rect)spread=Math.floor(Math.max(0,rect.left-content.getBoundingClientRect().left)/(pageWidth+gap)/columns);}
   show(Math.min(spread,spreads-1),true);
  }
  function show(value,preservePassage=false){spread=Math.max(0,Math.min(value,spreads-1));viewport.scrollTo({left:spread*step,behavior:'instant'});previous.disabled=spread===0;next.disabled=spread===spreads-1;const first=spread*columns+1,last=Math.min(first+columns-1,pages);count.textContent=`${columns===1?'Page':'Pages'} ${first}${last>first?'–'+last:''} of ${pages}`;if(!preservePassage)rememberPassage();}
  function turn(direction){if(turning||book.classList.contains('is-closed'))return;const target=spread+direction;if(target<0||target>=spreads)return;playPaper();if(matchMedia('(prefers-reduced-motion:reduce)').matches){show(target);return;}turning=true;book.classList.add(direction>0?'is-turning':'is-turning-back');setTimeout(()=>show(target),220);setTimeout(()=>{book.classList.remove('is-turning','is-turning-back');turning=false;},470);}
  open.addEventListener('click',()=>{playPaper();if(matchMedia('(prefers-reduced-motion:reduce)').matches){book.classList.remove('is-closed');closed.hidden=true;layout();return;}book.classList.add('is-opening');setTimeout(()=>{book.classList.remove('is-closed','is-opening');closed.hidden=true;layout();viewport.focus();},650);});
  previous.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));viewport.addEventListener('keydown',event=>{if(event.target.closest('a,button,input,textarea,select'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();turn(event.key==='ArrowRight'?1:-1);}});
  function expanded(){const active=book.classList.contains('is-expanded')||document.fullscreenElement===book;expand.setAttribute('aria-label',active?'Exit maximized book':'Maximize book');expand.querySelector('.ms-icon').textContent=active?'close_fullscreen':'open_in_full';layout();}
  expand.addEventListener('click',async()=>{if(document.fullscreenElement===book)await document.exitFullscreen();else if(book.classList.contains('is-expanded'))book.classList.remove('is-expanded');else{try{await book.requestFullscreen();}catch{book.classList.add('is-expanded');}}expanded();});document.addEventListener('fullscreenchange',expanded);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&book.classList.contains('is-expanded')){book.classList.remove('is-expanded');expanded();expand.focus();}});

  content.querySelectorAll('.library-reading,.library-source,.art-gallery').forEach(wrapper=>wrapper.replaceWith(...wrapper.childNodes));
  function applyAppearance(){content.dataset.readerFont=content.dataset.publishedFont||'sans';book.style.setProperty('--book-font',`${{standard:17,large:19,larger:22}[content.dataset.publishedSize]||17}px`);layout();}
  soundButton.setAttribute('aria-pressed','true');soundButton.setAttribute('aria-label','Turn page sound off');soundButton.querySelector('.ms-icon').textContent='volume_up';soundButton.addEventListener('click',()=>{sound=!sound;soundButton.setAttribute('aria-pressed',String(sound));soundButton.setAttribute('aria-label',sound?'Turn page sound off':'Turn page sound on');soundButton.querySelector('.ms-icon').textContent=sound?'volume_up':'volume_off';});
  let frame;new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{applyAppearance();});}).observe(viewport);content.querySelectorAll('img').forEach(img=>img.addEventListener('load',layout));document.fonts.ready.then(layout);applyAppearance();
 }
 const gallery=document.querySelector('[data-art-gallery]');if(gallery){const items=[...gallery.querySelectorAll('[data-exhibit]')],previous=document.querySelector('[data-gallery-previous]'),next=document.querySelector('[data-gallery-next]'),position=document.querySelector('[data-gallery-position]');if(items.length){let active=0;gallery.classList.add('is-gallery-ready');gallery.tabIndex=0;function update(index){active=Math.max(0,Math.min(index,items.length-1));items.forEach((item,i)=>item.classList.toggle('is-centered',i===active));position.textContent=`${active+1} / ${items.length}`;previous.disabled=active===0;next.disabled=active===items.length-1;}function visit(index){update(index);items[active].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'nearest',inline:'center'});}previous.addEventListener('click',()=>visit(active-1));next.addEventListener('click',()=>visit(active+1));let scrollTimer;gallery.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{const center=gallery.scrollLeft+gallery.clientWidth/2;let nearest=0,distance=Infinity;items.forEach((item,i)=>{const d=Math.abs(item.offsetLeft+item.offsetWidth/2-center);if(d<distance){distance=d;nearest=i;}});update(nearest);},180);});gallery.addEventListener('wheel',event=>{if(event.ctrlKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;event.preventDefault();gallery.scrollBy({left:event.deltaY,behavior:'instant'});},{passive:false});document.addEventListener('keydown',event=>{if(event.target.closest('input,textarea,select,[contenteditable]'))return;if(!['ArrowRight','ArrowLeft'].includes(event.key))return;event.preventDefault();visit(active+(event.key==='ArrowRight'?1:-1));});update(0);}else document.querySelector('.gallery-navigation')?.remove();}
})();
