// ── Validation helpers ──
function showError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  field.classList.remove('success');
  error.classList.add('visible');
}

function showSuccess(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  field.classList.add('success');
  if (error) error.classList.remove('visible');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ── Live validation on blur ──
document.getElementById('name').addEventListener('blur', function() {
  this.value.trim().length > 0
    ? showSuccess('name', 'name-error')
    : showError('name', 'name-error');
});

document.getElementById('name').addEventListener('input', function() {
  if (this.classList.contains('error') && this.value.trim().length > 0) {
    showSuccess('name', 'name-error');
  }
});

document.getElementById('email').addEventListener('blur', function() {
  isValidEmail(this.value)
    ? showSuccess('email', 'email-error')
    : showError('email', 'email-error');
});

document.getElementById('email').addEventListener('input', function() {
  if (this.classList.contains('error') && isValidEmail(this.value)) {
    showSuccess('email', 'email-error');
  }
});

document.getElementById('service').addEventListener('change', function() {
  this.value
    ? showSuccess('service', 'service-error')
    : showError('service', 'service-error');
});

document.getElementById('scope').addEventListener('blur', function() {
  this.value.trim().length >= 20
    ? showSuccess('scope', 'scope-error')
    : showError('scope', 'scope-error');
});

document.getElementById('scope').addEventListener('input', function() {
  if (this.classList.contains('error') && this.value.trim().length >= 20) {
    showSuccess('scope', 'scope-error');
  }
});

// ── Submit validation ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const scope   = document.getElementById('scope').value.trim();

  let valid = true;

  if (name.length === 0) {
    showError('name', 'name-error');
    valid = false;
  } else {
    showSuccess('name', 'name-error');
  }

  if (!isValidEmail(email)) {
    showError('email', 'email-error');
    valid = false;
  } else {
    showSuccess('email', 'email-error');
  }

  if (!service) {
    showError('service', 'service-error');
    valid = false;
  } else {
    showSuccess('service', 'service-error');
  }

  if (scope.length < 20) {
    showError('scope', 'scope-error');
    valid = false;
  } else {
    showSuccess('scope', 'scope-error');
  }

  if (!valid) {
    // Scroll to first error
    const firstError = document.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // All valid — replace with your actual submission logic
  // e.g. fetch('/api/contact', { method: 'POST', body: new FormData(this) })
  document.getElementById('formSuccess').style.display = 'block';
  this.reset();
  document.querySelectorAll('.form-input, .form-select, .form-textarea')
    .forEach(el => el.classList.remove('success', 'error'));
  this.querySelector('.form-submit').style.display = 'none';
});