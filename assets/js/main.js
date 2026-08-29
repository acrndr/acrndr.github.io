document.documentElement.classList.add('reveal-ready');

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
  }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-25% 0px -65%', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const videos = [...document.querySelectorAll('video')];
videos.forEach((video) => {
  video.addEventListener('play', () => {
    videos.forEach((otherVideo) => {
      if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
