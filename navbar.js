const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const workPages = ['case-studies.html', 'cve.html'];
const isWorkActive = workPages.includes(currentPage);

const workDropdownItems = [
  { href: 'case-studies.html', label: 'Case studies' },
  { href: 'cve.html', label: 'CVE / Hall of fame' },
];

const mainLinks = [
  { href: 'services.html', label: 'Services' },
  { href: 'blog.html', label: 'Blog' },
  { href: 'tools.html', label: 'Tools' },
  { href: 'testimonials.html', label: 'Testimonials' },
  { href: 'about.html', label: 'About' },
];

const mainNavLinks = mainLinks.map(link => `
  <li><a href="${link.href}" ${currentPage === link.href ? 'class="active"' : ''}>${link.label}</a></li>
`).join('');

const dropdownItems = workDropdownItems.map(item => `
  <a href="${item.href}" class="dropdown-item ${currentPage === item.href ? 'active' : ''}">${item.label}</a>
`).join('');

document.body.insertAdjacentHTML('afterbegin', `
  <nav>
    <a class="brand" href="index.html">wil<span>.</span>dev</a>
    <ul class="nav-links">
      ${mainNavLinks}
      <li class="dropdown-wrap ${isWorkActive ? 'active' : ''}">
        <button class="dropdown-toggle" id="workToggle">
          Work <span class="arrow">▾</span>
        </button>
        <div class="dropdown-menu" id="workMenu">
          ${dropdownItems}
        </div>
      </li>
    </ul>
    <div class="nav-right">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <span class="theme-icon">☀️</span>
      </button>
      <a class="nav-cta" href="contact.html">Hire me</a>
    </div>
  </nav>
`);

// Theme logic
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('click', function(e) {
  if (e.target.closest('#themeToggle')) {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
    return;
  }
  document.querySelector('.dropdown-wrap').classList.remove('open');
});

document.getElementById('workToggle').addEventListener('click', function(e) {
  e.stopPropagation();
  document.querySelector('.dropdown-wrap').classList.toggle('open');
});