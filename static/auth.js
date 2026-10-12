(() => {
  const stage = document.querySelector('[data-auth-art-stage]');
  const pictures = [...document.querySelectorAll('[data-auth-art]')];
  let index = 0;
  function show(next) {
    if (!pictures.length) return;
    index = (next + pictures.length) % pictures.length;
    pictures.forEach((picture, position) => picture.classList.toggle('is-active', position === index));
    document.querySelectorAll('[data-auth-background]').forEach((picture, position) => picture.classList.toggle('is-active', position === index));
    const counter = document.querySelector('[data-auth-art-count]');
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(pictures.length).padStart(2, '0')}`;
  }
  document.querySelector('[data-auth-art-prev]')?.addEventListener('click', () => show(index - 1));
  document.querySelector('[data-auth-art-next]')?.addEventListener('click', () => show(index + 1));
  if (stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.parentElement.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.transform = `scale(1.08) translate(${-x * 12}px, ${-y * 12}px)`;
    });
    stage.parentElement.addEventListener('pointerleave', () => { stage.style.transform = ''; });
  }
  document.querySelectorAll('[data-password-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const shown = input.type === 'password';
      input.type = shown ? 'text' : 'password';
      button.textContent = shown ? 'Hide' : 'Show';
      button.setAttribute('aria-label', shown ? 'Hide password' : 'Show password');
    });
  });
})();

(()=>{const form=document.querySelector('[data-auth-mode="signup"]');if(!form)return;form.addEventListener('submit',event=>{if(form.dataset.authMode!=='signup'||form.querySelector('[name="age_confirmation"]').checked)return;event.preventDefault();form.dataset.authMode='guardian';form.action=form.dataset.guardianUrl;const age=form.querySelector('[name="age_confirmation"]');age.disabled=true;age.closest('.auth-field').hidden=true;document.querySelector('.auth-overline').textContent='For members under 16';const heading=document.querySelector('.auth-panel-content h1');heading.innerHTML='A thoughtful<br><em>first step.</em>';heading.tabIndex=-1;heading.focus();document.querySelector('.auth-description').textContent='Your details are kept here. Create your account, verify your email, then upload your guardian’s signed permission before exploring MindState.';const download=document.querySelector('[data-guardian-download]');if(download)download.hidden=false;history.replaceState(null,'',form.dataset.guardianUrl);});})();
