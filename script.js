document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const btnLeft = document.querySelector('.slider-btn.left');
  const btnRight = document.querySelector('.slider-btn.right');
  const INTERVAL_MS = 5000;
  let currentIndex = 0;

  if (!slides.length) return;

  slides.forEach(s => s.classList.remove('active'));
  slides[currentIndex].classList.add('active');

  const nextSlide = () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  const prevSlide = () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  // Auto slider
  let timer = setInterval(nextSlide, INTERVAL_MS);

  // Slider button events
  if (btnLeft) btnLeft.addEventListener('click', () => { prevSlide(); resetTimer(); });
  if (btnRight) btnRight.addEventListener('click', () => { nextSlide(); resetTimer(); });

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, INTERVAL_MS);
  }

  // Visibility pause
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(timer);
    else timer = setInterval(nextSlide, INTERVAL_MS);
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      try {
        const res = await fetch(contactForm.action, {
          method: contactForm.method || 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          formStatus.textContent = 'Thank you! Your message has been sent.';
          contactForm.reset();
        } else {
          const json = await res.json().catch(()=>({}));
          formStatus.textContent = json.error || 'Oops — something went wrong. Please try again.';
        }
      } catch {
        formStatus.textContent = 'Network error — please try again later.';
      }
    });
  }
});
