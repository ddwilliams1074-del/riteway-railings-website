// Riteway Railings scripts

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Gallery lightbox
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('.gallery img').forEach((img) =>
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
    })
  );
  lb.addEventListener('click', (e) => { if (e.target !== lbImg) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Quote form async submit
const form = document.querySelector('.quote-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { form.reset(); status.textContent = 'Thanks! We’ll be in touch shortly.'; }
      else { status.textContent = 'Something went wrong — please call (780) 952-8057.'; }
    } catch {
      status.textContent = 'Something went wrong — please call (780) 952-8057.';
    }
  });
}

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
