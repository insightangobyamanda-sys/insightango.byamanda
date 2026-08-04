/* INSIGHTANGO · script.js */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Testimonials "Read more" toggle
function initTestimonials() {
  const COLLAPSED_HEIGHT = 172; // must match .testimonial-text max-height in style.css
  document.querySelectorAll('.testimonial').forEach(item => {
    const textEl = item.querySelector('.testimonial-text');
    const fadeEl = item.querySelector('.testimonial-fade');
    const btn = item.querySelector('.read-more-btn');
    if (!textEl || !btn) return;

    const fullHeight = textEl.scrollHeight;

    // Text already fits within the collapsed area: hide the fade & button
    if (fullHeight <= COLLAPSED_HEIGHT + 4) {
      btn.classList.add('is-hidden');
      if (fadeEl) fadeEl.classList.add('hidden');
      return;
    }

    btn.addEventListener('click', () => {
      const isExpanded = textEl.classList.toggle('expanded');
      if (isExpanded) {
        textEl.style.maxHeight = fullHeight + 'px';
        if (fadeEl) fadeEl.classList.add('hidden');
        btn.textContent = 'Read less';
      } else {
        textEl.style.maxHeight = '';
        if (fadeEl) fadeEl.classList.remove('hidden');
        btn.textContent = 'Read more…';
      }
    });
  });
}
window.addEventListener('load', initTestimonials);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});
