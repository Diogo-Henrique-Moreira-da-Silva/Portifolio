const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;


slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', `Ir para slide ${i + 1}`);
  if (i === 0) b.setAttribute('aria-current', 'true');
  b.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(b);
});
const dots = Array.from(dotsWrap.children);

function updateUI() {
  track.style.transform = `translateX(-${index * 100}%)`;
  slides.forEach((li, i) => li.classList.toggle('current', i === index));
  dots.forEach((d, i) =>
    i === index ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')
  );
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  updateUI();
}

prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(index - 1);
  if (e.key === 'ArrowRight') goTo(index + 1);
});


let startX = 0;
track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
track.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const threshold = 50;
  if (dx > threshold) goTo(index - 1);
  if (dx < -threshold) goTo(index + 1);
});

