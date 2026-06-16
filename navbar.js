const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const workPages = ['case-studies.html', 'cve.html'];

const isWorkActive = workPages.includes(currentPage);

const workDropdownItems = [
  { href: 'case-studies.html', label: 'Case studies' },
  { href: 'cve.html', label: 'CVE / Hall of fame' },
];

const mainLinks = [
  { href: 'index.html', label: 'Home' },
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
    <a class="nav-cta" href="contact.html">Hire me</a>
  </nav>
`);

document.getElementById('workToggle').addEventListener('click', function(e) {
  e.stopPropagation();
  document.querySelector('.dropdown-wrap').classList.toggle('open');
});

document.addEventListener('click', function() {
  document.querySelector('.dropdown-wrap').classList.remove('open');
});