document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('cvImg');
  const caption = document.getElementById('cvCaption');
  const buttons = document.querySelectorAll('.lang-btn');

  const preload = new Image();
  preload.src = 'img/cv-en.jpg';

  function setLang(lang){
    const isPT = lang === 'pt';
    img.src = isPT ? 'img/cv-pt.jpg' : 'img/cv-en.jpg';
    img.alt = isPT ? 'Currículo em Português' : 'Currículo em Inglês';
    caption.textContent = `Versão: ${isPT ? 'Português' : 'English'}`;

    buttons.forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  buttons.forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'p') setLang('pt');
    if (e.key.toLowerCase() === 'e') setLang('en');
  });
});
