(() => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('#mobile-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.setAttribute('aria-hidden', String(open));
    nav.classList.toggle('open', !open);
  });
})();
