const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

/* REVEAL ANIMATION */

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add('visible');
  });
}

/* POTTERY SLIDER */

const potteryTrack = document.querySelector('.pottery-track');
const potteryNext = document.querySelector('.pottery-slider .next');
const potteryPrev = document.querySelector('.pottery-slider .prev');

function getSlideAmount() {
  if (!potteryTrack) {
    return 0;
  }

  const firstSlide = potteryTrack.querySelector('img');

  if (!firstSlide) {
    return potteryTrack.clientWidth;
  }

  const gap = parseFloat(getComputedStyle(potteryTrack).gap) || 0;

  return firstSlide.getBoundingClientRect().width + gap;
}

function updateSliderButtons() {
  if (!potteryTrack || !potteryNext || !potteryPrev) {
    return;
  }

  const maximumScroll =
    potteryTrack.scrollWidth - potteryTrack.clientWidth;

  potteryPrev.disabled = potteryTrack.scrollLeft <= 2;
  potteryNext.disabled =
    potteryTrack.scrollLeft >= maximumScroll - 2;
}

if (potteryTrack && potteryNext && potteryPrev) {
  potteryNext.addEventListener('click', () => {
    potteryTrack.scrollBy({
      left: getSlideAmount(),
      behavior: 'smooth'
    });
  });

  potteryPrev.addEventListener('click', () => {
    potteryTrack.scrollBy({
      left: -getSlideAmount(),
      behavior: 'smooth'
    });
  });

  potteryTrack.addEventListener(
    'scroll',
    updateSliderButtons,
    { passive: true }
  );

  window.addEventListener('resize', updateSliderButtons);

  updateSliderButtons();
}
