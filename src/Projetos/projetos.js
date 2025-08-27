document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburger');
  const panel = document.getElementById('nav-links');
  if (!btn || !panel) return;

  const toggle = () => {
    const open = panel.classList.toggle('open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  btn.addEventListener('click', toggle);
  panel.querySelectorAll('a, button').forEach(el =>
    el.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
});
