// ── Back to top button ──
const btn = document.createElement('button');
btn.className = 'back-to-top';
btn.setAttribute('aria-label', 'Back to top');
btn.innerHTML = `
  <svg viewBox="0 0 24 24">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
`;
document.body.appendChild(btn);

// Show after scrolling 300px
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}, { passive: true });

// Smooth scroll to top on click
btn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});