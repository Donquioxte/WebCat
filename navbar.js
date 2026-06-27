const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const workPages = ['case-studies.html', 'cve.html'];
const isWorkActive = workPages.includes(currentPage);

const mainLinks = [
  { href: 'services.html', label: 'Services' },
  { href: 'blog.html', label: 'Blog' },
  { href: 'tools.html', label: 'Tools' },
  { href: 'testimonials.html', label: 'Testimonials' },
  { href: 'about.html', label: 'About' },
];

const workDropdownItems = [
  { href: 'case-studies.html', label: 'Case studies' },
  { href: 'cve.html', label: 'CVE / Hall of fame' },
];

const mainNavLinks = mainLinks.map(link => `
  <li class="nav-item">
    <a class="nav-link ${currentPage === link.href ? 'active' : ''}" href="${link.href}">${link.label}</a>
  </li>
`).join('');

const dropdownItems = workDropdownItems.map(item => `
  <li><a class="dropdown-item ${currentPage === item.href ? 'active' : ''}" href="${item.href}">${item.label}</a></li>
`).join('');

document.body.insertAdjacentHTML('afterbegin', `
  <nav class="navbar navbar-expand-lg" id="mainNav">
    <div class="container">

      <a class="brand" href="index.html">wil<span>.</span>dev</a>

      <div class="d-flex align-items-center gap-2 ms-auto d-lg-none">
        <button class="theme-toggle" id="themeToggleMobile" aria-label="Toggle theme">
          <span class="theme-icon">☀️</span>
        </button>
        <button
          class="hamburger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navCollapse">
        <ul class="navbar-nav mx-auto">
          ${mainNavLinks}
          <li class="nav-item dropdown ${isWorkActive ? 'active' : ''}">
            <a class="nav-link dropdown-toggle ${isWorkActive ? 'active' : ''}"
               href="#"
               role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false">
              Work
            </a>
            <ul class="dropdown-menu">
              ${dropdownItems}
            </ul>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <button class="theme-toggle d-none d-lg-flex" id="themeToggleDesktop" aria-label="Toggle theme">
            <span class="theme-icon">☀️</span>
          </button>
          <a class="nav-cta" href="contact.html">Hire me</a>
        </div>
      </div>

    </div>
  </nav>
`);

// ── Theme logic ──
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-icon').forEach(icon => {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

document.addEventListener('click', function(e) {
  if (e.target.closest('#themeToggleDesktop') || e.target.closest('#themeToggleMobile')) {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }
});

// ── Animate hamburger lines on BS collapse events ──
const navCollapse = document.getElementById('navCollapse');
const hamburger = document.querySelector('.hamburger');

navCollapse.addEventListener('show.bs.collapse', () => hamburger.classList.add('open'));
navCollapse.addEventListener('hide.bs.collapse', () => hamburger.classList.remove('open'));

// ── Auto-inject Bootstrap JS if not already loaded ──
if (!window.bootstrap) {
  const bsScript = document.createElement('script');
  bsScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
  document.body.appendChild(bsScript);
} 
// ── Auto-inject back to top button ──
const bttScript = document.createElement('script');
bttScript.src = 'back-to-top.js';
document.body.appendChild(bttScript);