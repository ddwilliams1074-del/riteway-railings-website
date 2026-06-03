import { readFile, writeFile } from 'node:fs/promises';

// Generates the category gallery pages (Aluminum Railing / Glass Railing /
// Privacy Walls) from tools/gallery-manifest.json so the photo lists stay in
// sync with tools/optimize-gallery-images.mjs. Output = plain static HTML in
// the repo root (no build step at serve time).

const manifest = JSON.parse(await readFile('tools/gallery-manifest.json', 'utf8'));

const pages = [
  {
    file: 'aluminum-railing.html',
    nav: 'aluminum',
    manifestKey: 'images/aluminum-railing',
    title: 'Aluminum Railings Edmonton | Custom Picket & Glass-Infill | Riteway Railings',
    description: 'Custom aluminum picket and glass-infill railings for decks, stairs and balconies across Edmonton, AB & area. Fully welded, thicker-wall aluminum, powder-coated to your colour. Free quotes — (780) 952-8057.',
    canonical: 'https://ritewayrailings.ca/aluminum-railing.html',
    h1: 'Aluminum Railing',
    intro: 'Picket and glass-infill aluminum railings for decks, stairs, and balconies — any height, fully welded, in thicker-wall aluminum built to last the Edmonton seasons. Powder-coated in black, white, beige, yard bronze, or a custom colour.',
    galleryHeading: 'Aluminum railing projects in Edmonton',
    galleryIntro: 'A look at recent aluminum railing installs across the Edmonton area — decks, stairs, and balconies in picket and glass-infill styles. Tap any photo to enlarge.',
    heroImage: 'images/aluminum-railing/aluminum-railing-edmonton-14.jpg',
    alt: 'Custom aluminum railing project in Edmonton',
  },
  {
    file: 'glass-railing.html',
    nav: 'glass',
    manifestKey: 'images/glass-railing',
    title: 'Glass Railings Edmonton | Aluminum-Framed Glass Railing | Riteway Railings',
    description: 'Aluminum-framed glass railings for decks and balconies across Edmonton, AB & area. Pinhead, raindrop, bronze, tint and grey-tint glass, measured and cut for each project. Free quotes — (780) 952-8057.',
    canonical: 'https://ritewayrailings.ca/glass-railing.html',
    h1: 'Glass Railing',
    intro: 'Aluminum-framed glass railings that open up the view while keeping a clean, modern edge. Choose pinhead, raindrop, bronze, tint, or grey-tint glass — measured and cut for each deck, stair, and balcony.',
    galleryHeading: 'Glass railing projects in Edmonton',
    galleryIntro: 'Recent aluminum-framed glass railing projects around Edmonton — open, unobstructed views with a clean, modern edge. Tap any photo to enlarge.',
    alt: 'Aluminum-framed glass railing project in Edmonton',
  },
  {
    file: 'privacy-walls.html',
    nav: 'privacy',
    manifestKey: 'images/privacy-walls',
    title: 'Privacy Walls Edmonton | Aluminum Privacy Screens & Panels | Riteway Railings',
    description: 'Aluminum privacy walls and panels that block wind and obscure views while keeping a clean, modern look. Built and installed across Edmonton, AB & area. Free quotes — (780) 952-8057.',
    canonical: 'https://ritewayrailings.ca/privacy-walls.html',
    h1: 'Privacy Walls',
    intro: 'Aluminum privacy walls and panels that block wind and shield your deck or balcony from view — without closing it in. Frosted or tinted glass and solid infill options, powder-coated to match your railings.',
    galleryHeading: 'Privacy wall projects in Edmonton',
    galleryIntro: 'Recent privacy wall and screen installs around Edmonton — wind-blocking panels that add seclusion while keeping a clean, modern look. Tap any photo to enlarge.',
    heroImage: 'images/privacy-walls/privacy-wall-edmonton-07.jpg',
    alt: 'Aluminum privacy wall project in Edmonton',
  },
];

const navItem = (active, key, href, label) =>
  `        <a href="${href}"${active === key ? ' aria-current="page" class="is-current"' : ''}>${label}</a>`;

const nav = (active) => `      <nav class="nav-links" aria-label="Primary">
        <a href="index.html#hero">Home</a>
${navItem(active, 'aluminum', 'aluminum-railing.html', 'Aluminum Railing')}
${navItem(active, 'glass', 'glass-railing.html', 'Glass Railing')}
${navItem(active, 'privacy', 'privacy-walls.html', 'Privacy Walls')}
        <a href="index.html#about">About</a>
        <a href="index.html#contact">Contact</a>
        <a href="tel:+17809528057" class="nav-call">(780) 952-8057</a>
        <a href="index.html#contact" class="btn btn-primary nav-quote">Free Quote</a>
      </nav>`;

const galleryImgs = (key, alt) =>
  manifest[key]
    .map((img, i) =>
      `          <button type="button" class="g-item" aria-label="Enlarge photo ${i + 1} of ${manifest[key].length}">
            <img src="${img.src}" alt="${alt} — photo ${i + 1}" loading="lazy" width="${img.w}" height="${img.h}">
          </button>`
    )
    .join('\n');

const page = (p) => `<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>document.documentElement.classList.add('js');</script>
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <link rel="canonical" href="${p.canonical}">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16.png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#0a0a0a">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${p.h1} Edmonton | Riteway Railings">
  <meta property="og:description" content="${p.description}">
  <meta property="og:url" content="${p.canonical}">
  <meta property="og:image" content="https://ritewayrailings.ca/${p.heroImage || manifest[p.manifestKey][0].src}">
  <meta property="og:locale" content="en_CA">
  <meta name="twitter:card" content="summary_large_image">
  <!-- PREVIEW MODE: keeps the GitHub Pages staging site out of Google.
       Before going live on ritewayrailings.ca, change this to: index, follow -->
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body id="top">
  <header id="site-header">
    <div class="container nav">
      <a class="nav-logo" href="index.html" aria-label="Riteway Railings home">
        <img src="images/riteway-railings-logo-white.png" alt="Riteway Railings logo" width="180" height="38">
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
${nav(p.nav)}
    </div>
  </header>
  <main>
    <section class="hero page-hero" id="hero">
      <div class="hero-bg" aria-hidden="true" style="background-image:url('${p.heroImage || manifest[p.manifestKey][0].src}')"></div>
      <div class="container hero-inner">
        <nav class="crumb reveal" aria-label="Breadcrumb"><a href="index.html">Home</a> <span aria-hidden="true">/</span> ${p.h1}</nav>
        <h1 class="reveal">${p.h1}</h1>
        <p class="hero-sub reveal">${p.intro}</p>
        <div class="hero-cta reveal">
          <a href="index.html#contact" class="btn btn-primary">Get a Free Quote</a>
          <a href="tel:+17809528057" class="btn btn-ghost">Call (780) 952-8057</a>
          <a href="sms:+17809528057" class="btn btn-ghost">Text (780) 952-8057</a>
        </div>
      </div>
      <a class="scroll-cue" href="#gallery" aria-label="Scroll down to the gallery">
        <span class="scroll-cue-arrow"></span>
      </a>
    </section>

    <section class="section gallery-section" id="gallery">
      <div class="container">
        <p class="label reveal">Our Work</p>
        <h2 class="reveal">${p.galleryHeading}</h2>
        <p class="gallery-intro reveal">${p.galleryIntro}</p>
        <div class="gallery reveal">
${galleryImgs(p.manifestKey, p.alt)}
        </div>
      </div>
    </section>
    <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous photo">&#8249;</button>
      <img src="" alt="">
      <button class="lightbox-nav lightbox-next" aria-label="Next photo">&#8250;</button>
      <p class="lightbox-count" aria-live="polite"></p>
    </div>

    <section class="section contact-cta">
      <div class="container contact-cta-inner reveal">
        <h2>Like what you see? Let's build yours.</h2>
        <p>Tell us about your project and we'll get back to you with a custom quote.</p>
        <div class="hero-cta">
          <a href="index.html#contact" class="btn btn-primary">Get a Free Quote</a>
          <a href="tel:+17809528057" class="btn btn-ghost">Call (780) 952-8057</a>
        </div>
      </div>
    </section>
  </main>
  <footer id="site-footer">
    <div class="container footer-grid">
      <div>
        <img src="images/riteway-railings-logo-white.png" alt="Riteway Railings logo" width="200" height="42" class="footer-logo">
        <p>Custom aluminum railings, built the RITE-WAY. Supply &amp; install across Edmonton &amp; area.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p><a href="tel:+17809528057">(780) 952-8057</a><br>
        <a href="mailto:info@ritewayrailings.ca">info@ritewayrailings.ca</a><br>
        9147 Cooper Cres SW, Edmonton, AB T6W 3K9</p>
      </div>
      <div>
        <h4>Service Area</h4>
        <p>Edmonton · Beaumont · Sherwood Park · Spruce Grove · Devon</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/ritewayralings.ca" rel="noopener" target="_blank" aria-label="Riteway Railings on Facebook">
            <img src="images/facebook-icon.png" alt="Facebook" width="28" height="28" loading="lazy">
          </a>
          <a href="https://share.google/1fA46HY9huSIOTUSi" rel="noopener" target="_blank" aria-label="Riteway Railings on Google">
            <img src="images/google-icon.png" alt="Google Business Profile" width="28" height="28" loading="lazy">
          </a>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; <span id="year"></span> Riteway Railings. All rights reserved.</p>
    </div>
  </footer>
  <script src="js/main.js" defer></script>
</body>
</html>
`;

for (const p of pages) {
  await writeFile(p.file, page(p));
  console.log('wrote', p.file, `(${manifest[p.manifestKey].length} photos)`);
}
