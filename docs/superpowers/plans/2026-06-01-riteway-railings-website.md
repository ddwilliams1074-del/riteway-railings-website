# Riteway Railings Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, SEO-optimized, black-&-white single-page static website for Riteway Railings (aluminum railing supply & install, Edmonton AB & area).

**Architecture:** A single `index.html` with semantic sections, one `css/styles.css` using CSS custom properties for the monochrome+silver theme, and one `js/main.js` for nav toggle, gallery lightbox, scroll reveals, and form UX. No framework, no build step. A one-time Node script generates the full favicon set from an SVG "R". Real project photos (already pulled to `Brand Assets/site-photos/`) are optimized, renamed for SEO, and placed in `images/`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid/flex, CSS animations), vanilla JS (ES6). Google Fonts (Anton + Hanken Grotesk). Node dev tooling (`sharp`, `png-to-ico`) for favicon generation only. Formspree/Web3Forms for the contact form.

**Verification note:** This is a static marketing site — "tests" are structural/visual verification, not unit tests. Each task verifies by (a) opening `index.html` in a headless browser to screenshot, and (b) checking HTML validity / links. Commit after each task.

---

## File Structure

```
Website-rite-way railings/
├── index.html              # all page sections
├── css/styles.css          # theme tokens + all styles
├── js/main.js              # nav, lightbox, scroll reveal, form
├── images/                 # optimized + SEO-renamed photos, white logo
├── favicon.ico             # multi-size ICO
├── favicon-16.png, favicon-32.png
├── icon-192.png, icon-512.png
├── apple-touch-icon.png    # 180x180
├── favicon.svg             # scalable "R" mark
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── tools/gen-favicons.mjs  # one-time favicon generator (dev only)
└── Brand Assets/           # untouched sources + site-photos/
```

---

## Task 1: Project scaffold + base HTML shell

**Files:**
- Create: `index.html`
- Create: `css/styles.css` (empty placeholder)
- Create: `js/main.js` (empty placeholder)

- [ ] **Step 1: Create directory skeleton and empty asset files**

```bash
mkdir -p css js images tools
printf '/* Riteway Railings styles */\n' > css/styles.css
printf '// Riteway Railings scripts\n' > js/main.js
```

- [ ] **Step 2: Write the HTML shell with head/meta and empty `<main>`**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aluminum Railings Edmonton | Custom Supply & Install | Riteway Railings</title>
  <meta name="description" content="Custom-built aluminum railings supplied and installed across Edmonton, AB & area. Modular or fully welded glass, picket & privacy railing systems, measured for each project. Free quotes — (780) 952-8057.">
  <link rel="canonical" href="https://ritewayrailings.ca/">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header id="site-header"></header>
  <main>
    <!-- sections added in later tasks -->
  </main>
  <footer id="site-footer"></footer>
  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Verify it opens**

Run: open `index.html` in a browser (or headless screenshot). Expected: blank page, no console errors, title shows in tab.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: scaffold static site shell"
```

---

## Task 2: Optimize and SEO-rename project photos

**Files:**
- Create: `tools/optimize-images.mjs`
- Create: `images/*.jpg` (renamed, resized)

Source photos in `Brand Assets/site-photos/`:
`img_1924.jpg` (glass privacy-wall balconies), `img_0129.jpg` (black picket railing on steps),
`img_1697.png` (white deck railing), `site_ident.jpg` (glass railing install worker),
`img_1503.jpg`, `img_1695.jpg`, `img_2003.png`, `w953-h715-no.jpg`, `img_0130.jpg`,
`img_0594.jpg`, `img_2291.jpg`.

SEO target rename map (descriptive, keyword-aware, Edmonton-focused):

| Source | New name |
|--------|----------|
| img_1924.jpg | aluminum-glass-privacy-railing-balcony-edmonton.jpg |
| site_ident.jpg | glass-aluminum-railing-installation-edmonton.jpg |
| img_0129.jpg | black-aluminum-picket-railing-steps-edmonton.jpg |
| img_1697.png | white-aluminum-deck-railing-edmonton.jpg |
| img_1503.jpg | custom-aluminum-railing-edmonton-1.jpg |
| img_1695.jpg | custom-aluminum-railing-edmonton-2.jpg |
| img_2003.png | aluminum-glass-railing-deck-edmonton.jpg |
| w953-h715-no.jpg | aluminum-railing-project-edmonton-3.jpg |
| img_0130.jpg | aluminum-stair-railing-edmonton.jpg |
| img_0594.jpg | aluminum-railing-installation-edmonton.jpg |
| img_2291.jpg | custom-aluminum-railing-edmonton-4.jpg |

- [ ] **Step 1: Install one-time tooling**

Run:
```bash
npm init -y
npm install --no-save sharp
```
Expected: `sharp` installs without error.

- [ ] **Step 2: Write the optimizer script**

Create `tools/optimize-images.mjs`:

```js
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'Brand Assets/site-photos';
const OUT = 'images';

const map = [
  ['img_1924.jpg', 'aluminum-glass-privacy-railing-balcony-edmonton.jpg'],
  ['site_ident.jpg', 'glass-aluminum-railing-installation-edmonton.jpg'],
  ['img_0129.jpg', 'black-aluminum-picket-railing-steps-edmonton.jpg'],
  ['img_1697.png', 'white-aluminum-deck-railing-edmonton.jpg'],
  ['img_1503.jpg', 'custom-aluminum-railing-edmonton-1.jpg'],
  ['img_1695.jpg', 'custom-aluminum-railing-edmonton-2.jpg'],
  ['img_2003.png', 'aluminum-glass-railing-deck-edmonton.jpg'],
  ['w953-h715-no.jpg', 'aluminum-railing-project-edmonton-3.jpg'],
  ['img_0130.jpg', 'aluminum-stair-railing-edmonton.jpg'],
  ['img_0594.jpg', 'aluminum-railing-installation-edmonton.jpg'],
  ['img_2291.jpg', 'custom-aluminum-railing-edmonton-4.jpg'],
];

await mkdir(OUT, { recursive: true });
for (const [src, dest] of map) {
  await sharp(`${SRC}/${src}`)
    .rotate()                              // respect EXIF orientation
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${dest}`);
  console.log('wrote', dest);
}
```

- [ ] **Step 3: Run the optimizer**

Run: `node tools/optimize-images.mjs`
Expected: 11 `wrote ...` lines; `images/` contains 11 renamed JPGs, each well under ~400 KB.

- [ ] **Step 4: Verify a sample image opens and looks correct**

Open `images/aluminum-glass-privacy-railing-balcony-edmonton.jpg`. Expected: correct orientation, sharp, reasonable size.

- [ ] **Step 5: Commit**

```bash
git add tools/optimize-images.mjs images package.json
git commit -m "feat: optimize and SEO-rename project photos"
```

---

## Task 3: Favicon set (cross-browser, all view types)

**Files:**
- Create: `favicon.svg`
- Create: `tools/gen-favicons.mjs`
- Create: `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- Create: `site.webmanifest`

Goal: a capital **"R"** mark in the site's black/silver scheme that renders in browser tabs, bookmarks, Android/Chrome, iOS home screen, Windows tiles, and Google search results.

- [ ] **Step 1: Create the scalable SVG favicon**

Create `favicon.svg` — black rounded square, silver chrome "R", with a small triangle accent echoing the logo:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f2f2"/>
      <stop offset="0.5" stop-color="#c9c9c9"/>
      <stop offset="0.5" stop-color="#9a9a9a"/>
      <stop offset="1" stop-color="#e6e6e6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="#0a0a0a"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="340" fill="url(#chrome)">R</text>
  <polygon points="256,372 286,420 226,420" fill="url(#chrome)"/>
</svg>
```

- [ ] **Step 2: Verify the SVG renders**

Open `favicon.svg` in a browser. Expected: black rounded tile, silver "R", small silver triangle below.

- [ ] **Step 3: Install raster tooling**

Run: `npm install --no-save sharp png-to-ico`
Expected: installs without error.

- [ ] **Step 4: Write the favicon generator**

Create `tools/gen-favicons.mjs`:

```js
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';

const svg = await readFile('favicon.svg');
const sizes = {
  'favicon-16.png': 16,
  'favicon-32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

for (const [name, size] of Object.entries(sizes)) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(name);
  console.log('wrote', name);
}

// Build multi-resolution .ico from 16/32/48
const icoBufs = await Promise.all(
  [16, 32, 48].map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer())
);
await writeFile('favicon.ico', await pngToIco(icoBufs));
console.log('wrote favicon.ico');
```

- [ ] **Step 5: Run the generator**

Run: `node tools/gen-favicons.mjs`
Expected: 5 PNGs + `favicon.ico` created. Open `favicon-32.png` and `apple-touch-icon.png` to confirm the "R" is legible.

- [ ] **Step 6: Create the web manifest**

Create `site.webmanifest`:

```json
{
  "name": "Riteway Railings",
  "short_name": "Riteway",
  "description": "Custom aluminum railing supply & install in Edmonton, AB & area.",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone",
  "start_url": "/"
}
```

- [ ] **Step 7: Wire favicon links into `index.html` `<head>`**

Add after the `<link rel="canonical">` line in `index.html`:

```html
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0a0a0a">
  <meta name="msapplication-TileColor" content="#0a0a0a">
```

- [ ] **Step 8: Verify in a headless browser**

Open `index.html`, confirm the favicon shows in the tab and there are no 404s in the network log for icon files.

- [ ] **Step 9: Commit**

```bash
git add favicon.svg favicon.ico favicon-16.png favicon-32.png icon-192.png icon-512.png apple-touch-icon.png site.webmanifest tools/gen-favicons.mjs index.html package.json
git commit -m "feat: add full cross-browser favicon set with silver R mark"
```

---

## Task 4: CSS foundation — theme tokens, typography, base & utilities

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Write design tokens and base styles**

Replace `css/styles.css` contents:

```css
:root {
  --black: #0a0a0a;
  --ink: #141414;
  --white: #ffffff;
  --grey-100: #f4f4f5;
  --grey-300: #d4d4d8;
  --grey-500: #8a8a8e;
  --grey-700: #3f3f46;
  --chrome: linear-gradient(180deg,#f2f2f2 0%,#c9c9c9 49%,#9a9a9a 51%,#e6e6e6 100%);
  --silver: #b8b8bd;
  --maxw: 1200px;
  --pad: clamp(1.25rem, 4vw, 4rem);
  --radius: 6px;
  --display: "Anton", Impact, sans-serif;
  --body: "Hanken Grotesk", system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--body);
  color: var(--ink);
  background: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { font-family: var(--display); font-weight: 400; line-height: 1.02; letter-spacing: .01em; text-transform: uppercase; margin: 0; }
h1 { font-size: clamp(2.6rem, 7vw, 5.5rem); }
h2 { font-size: clamp(2rem, 5vw, 3.5rem); }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); }
p { margin: 0 0 1rem; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

.container { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--pad); }
.section { padding-block: clamp(3.5rem, 8vw, 7rem); }
.label { font-family: var(--body); font-weight: 700; font-size: .75rem; letter-spacing: .2em; text-transform: uppercase; color: var(--silver); }

/* Buttons */
.btn { display: inline-flex; align-items: center; gap: .5rem; font-family: var(--body); font-weight: 700; font-size: .95rem; padding: .85rem 1.6rem; border-radius: var(--radius); border: 2px solid var(--black); cursor: pointer; transition: transform .15s ease, background .15s ease, color .15s ease; }
.btn-primary { background: var(--white); color: var(--black); }
.btn-primary:hover { transform: translateY(-2px); }
.btn-dark { background: var(--black); color: var(--white); }
.btn-dark:hover { transform: translateY(-2px); }
.btn-ghost { background: transparent; color: var(--white); border-color: rgba(255,255,255,.5); }
.btn-ghost:hover { border-color: var(--white); }

/* Chrome accent text + triangle motif */
.chrome-text { background: var(--chrome); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tri { width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 12px solid var(--silver); display: inline-block; }

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Verify base renders**

Open `index.html`. Expected: fonts load (Anton/Hanken Grotesk), no console errors. Page still mostly empty.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add CSS theme tokens, typography, and base utilities"
```

---

## Task 5: Header / sticky navigation (with white logo)

**Files:**
- Modify: `index.html` (`#site-header`)
- Modify: `css/styles.css`
- Modify: `js/main.js`
- Create: `images/riteway-railings-logo-white.png`

- [ ] **Step 1: Generate a white logo for dark backgrounds**

Run (inverts the black logo PNG to white, preserving transparency):
```bash
node -e "import('sharp').then(async ({default:s})=>{await s('Brand Assets/Logo_Source_-01.png').negate({alpha:false}).toFile('images/riteway-railings-logo-white.png');console.log('done')})"
```
Expected: `images/riteway-railings-logo-white.png` created; open it to confirm white "RITE-WAY RAILINGS" on transparent background.

- [ ] **Step 2: Add header markup into `#site-header`**

```html
<header id="site-header">
  <div class="container nav">
    <a class="nav-logo" href="#top" aria-label="Riteway Railings home">
      <img src="images/riteway-railings-logo-white.png" alt="Riteway Railings logo" width="180" height="38">
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav-links" aria-label="Primary">
      <a href="#services">Railings</a>
      <a href="#services">Glass</a>
      <a href="#why">Privacy Walls</a>
      <a href="#gallery">Gallery</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="tel:+17809528057" class="nav-call">(780) 952-8057</a>
      <a href="#contact" class="btn btn-primary nav-quote">Free Quote</a>
    </nav>
  </div>
</header>
```

Also add `id="top"` to `<body>` (i.e. `<body id="top">`).

- [ ] **Step 3: Add header styles**

```css
#site-header { position: sticky; top: 0; z-index: 50; background: var(--black); color: var(--white); border-bottom: 1px solid #1f1f1f; }
.nav { display: flex; align-items: center; justify-content: space-between; padding-block: .9rem; }
.nav-logo img { height: 36px; width: auto; }
.nav-links { display: flex; align-items: center; gap: 1.4rem; }
.nav-links a { font-size: .9rem; font-weight: 600; letter-spacing: .02em; color: var(--grey-300); transition: color .15s; }
.nav-links a:hover { color: var(--white); }
.nav-call { font-variant-numeric: tabular-nums; }
.nav-quote { color: var(--black) !important; }
.nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: 0; cursor: pointer; padding: 6px; }
.nav-toggle span { width: 26px; height: 2px; background: var(--white); transition: .2s; }
@media (max-width: 880px) {
  .nav-toggle { display: flex; }
  .nav-links { position: fixed; inset: 64px 0 auto 0; flex-direction: column; align-items: flex-start; gap: 1rem; background: var(--black); padding: 1.5rem var(--pad); transform: translateY(-120%); transition: transform .25s ease; }
  .nav-links.open { transform: none; }
}
```

- [ ] **Step 4: Add nav toggle JS**

Replace `js/main.js` contents:

```js
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
```

- [ ] **Step 5: Verify**

Open `index.html`; resize to mobile width. Expected: sticky black header with white logo; hamburger appears under 880px and toggles the menu; links visible on desktop.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css js/main.js images/riteway-railings-logo-white.png
git commit -m "feat: add sticky responsive navigation with white logo"
```

---

## Task 6: Hero section

**Files:**
- Modify: `index.html` (inside `<main>`)
- Modify: `css/styles.css`

- [ ] **Step 1: Add hero markup as first child of `<main>`**

```html
<section class="hero" id="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container hero-inner">
    <p class="label reveal">Edmonton, AB &amp; Area · Aluminum Railing Specialists</p>
    <h1 class="reveal">Custom railings,<br>done the <span class="chrome-text">RITE-WAY</span></h1>
    <p class="hero-sub reveal">Measured and custom-built aluminum railings — supplied and installed across the Edmonton area. Choose modular or fully welded glass, picket, and privacy systems.</p>
    <div class="hero-cta reveal">
      <a href="#contact" class="btn btn-primary">Get a Free Quote</a>
      <a href="tel:+17809528057" class="btn btn-ghost">Call (780) 952-8057</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles (with staggered load reveal)**

```css
.hero { position: relative; background: var(--black); color: var(--white); overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: url("../images/aluminum-glass-privacy-railing-balcony-edmonton.jpg") center/cover no-repeat; opacity: .28; filter: grayscale(1) contrast(1.05); }
.hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,10,.4), rgba(10,10,10,.85)); }
.hero-inner { position: relative; z-index: 1; padding-block: clamp(4.5rem, 14vw, 9rem); max-width: 60rem; }
.hero-sub { font-size: clamp(1.05rem, 2vw, 1.3rem); color: var(--grey-300); max-width: 38rem; margin-top: 1.25rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: .85rem; margin-top: 2rem; }
.hero .reveal { animation: heroIn .7s ease backwards; opacity: 1; transform: none; }
.hero .label.reveal { animation-delay: .05s; }
.hero h1.reveal { animation-delay: .15s; }
.hero .hero-sub.reveal { animation-delay: .3s; }
.hero .hero-cta.reveal { animation-delay: .45s; }
@keyframes heroIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
```

- [ ] **Step 3: Verify**

Open `index.html`. Expected: full-bleed dark hero with faint grayscale railing photo, chrome "RITE-WAY", two CTA buttons; content fades/slides in staggered on load.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with staggered reveal"
```

---

## Task 7: Trust strip + Services/Products cards

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Add trust strip + services markup after hero**

```html
<section class="trust" aria-label="Why choose Riteway">
  <div class="container trust-grid">
    <div><strong>100%</strong><span>Custom Built</span></div>
    <div><strong>Modular or Welded</strong><span>Your Choice</span></div>
    <div><strong>5+</strong><span>Powder-Coat Finishes</span></div>
    <div><strong>Local</strong><span>Edmonton &amp; Area</span></div>
  </div>
</section>

<section class="section" id="services">
  <div class="container">
    <p class="label reveal">What We Build</p>
    <h2 class="reveal">Aluminum railings, glass &amp; privacy walls</h2>
    <div class="cards reveal">
      <article class="card">
        <img src="images/black-aluminum-picket-railing-steps-edmonton.jpg" alt="Black aluminum picket railing on residential steps in Edmonton" loading="lazy" width="800" height="600">
        <div class="card-body">
          <h3>Aluminum Railings</h3>
          <p>Picket or glass-infill railings for decks, stairs, and balconies — any height, modular or fully welded, in thicker-wall aluminum built to last.</p>
        </div>
      </article>
      <article class="card">
        <img src="images/aluminum-glass-privacy-railing-balcony-edmonton.jpg" alt="Aluminum privacy wall with frosted glass panels on an Edmonton balcony" loading="lazy" width="800" height="600">
        <div class="card-body">
          <h3>Privacy Walls</h3>
          <p>Aluminum privacy walls and panels that block wind and obscure views while keeping a clean, modern look.</p>
        </div>
      </article>
      <article class="card">
        <img src="images/glass-aluminum-railing-installation-edmonton.jpg" alt="Installer fitting a glass aluminum railing panel in Edmonton" loading="lazy" width="800" height="600">
        <div class="card-body">
          <h3>Custom Glass</h3>
          <p>Glass infill options including pinhead, raindrop, bronze, tint, and grey tint — measured and cut for each project.</p>
        </div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add trust + card styles**

```css
.trust { background: var(--ink); color: var(--white); }
.trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; }
.trust-grid > div { padding: 1.6rem 1rem; border-right: 1px solid #262626; }
.trust-grid > div:last-child { border-right: 0; }
.trust-grid strong { display: block; font-family: var(--display); font-size: 1.6rem; }
.trust-grid span { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--silver); }
@media (max-width: 700px) { .trust-grid { grid-template-columns: repeat(2, 1fr); } .trust-grid > div:nth-child(2) { border-right: 0; } }

.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
.card { background: var(--white); border: 1px solid var(--grey-300); border-radius: var(--radius); overflow: hidden; transition: transform .2s ease, box-shadow .2s ease; }
.card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,.14); }
.card img { aspect-ratio: 4/3; object-fit: cover; width: 100%; }
.card-body { padding: 1.3rem 1.4rem 1.6rem; }
.card-body h3 { margin-bottom: .5rem; }
@media (max-width: 880px) { .cards { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

Open `index.html`. Expected: dark stat strip; three service cards with photos that lift on hover; single column on mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add trust strip and services cards"
```

---

## Task 8: How it works + Why Riteway (About)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Add markup after services section**

```html
<section class="section steps-section" id="process">
  <div class="container">
    <p class="label reveal">How It Works</p>
    <h2 class="reveal">Measured. Built. Installed.</h2>
    <ol class="steps reveal">
      <li><span class="tri"></span><h3>1 · Measured</h3><p>We come to your site and measure for a precise, custom fit — no guesswork.</p></li>
      <li><span class="tri"></span><h3>2 · Custom-Built</h3><p>Your railing is fabricated in Edmonton — modular or fully welded — and powder-coated to your colour.</p></li>
      <li><span class="tri"></span><h3>3 · Installed</h3><p>Our crew installs it clean and solid, the RITE-WAY, with engineered stamped drawings available.</p></li>
    </ol>
  </div>
</section>

<section class="section why" id="why">
  <div class="container why-grid">
    <div class="reveal">
      <p class="label">Why Riteway</p>
      <h2>Built stronger,<br>finished better</h2>
      <ul class="why-list">
        <li><span class="tri"></span>Modular <strong>or</strong> fully welded connections — your choice</li>
        <li><span class="tri"></span>Thicker-wall aluminum for added strength</li>
        <li><span class="tri"></span>Powder-coat colours: black, white, beige, yard bronze &amp; custom</li>
        <li><span class="tri"></span>Glass options: pinhead, raindrop, bronze, tint, grey tint</li>
        <li><span class="tri"></span>Engineered designs with stamped drawings available</li>
      </ul>
    </div>
    <div class="why-photo reveal" id="about">
      <img src="images/white-aluminum-deck-railing-edmonton.jpg" alt="White custom aluminum deck railing installed in Edmonton" loading="lazy" width="800" height="1000">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

```css
.steps-section { background: var(--grey-100); }
.steps { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.steps li { background: var(--white); border-radius: var(--radius); padding: 1.6rem; border-top: 3px solid var(--black); }
.steps .tri { margin-bottom: .8rem; }
.steps h3 { margin-bottom: .4rem; }
.why-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: center; }
.why-list { list-style: none; padding: 0; margin: 1.5rem 0 0; }
.why-list li { display: flex; align-items: baseline; gap: .75rem; padding: .6rem 0; border-bottom: 1px solid var(--grey-300); }
.why-photo img { border-radius: var(--radius); object-fit: cover; width: 100%; aspect-ratio: 4/5; }
@media (max-width: 880px) { .steps, .why-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

Open `index.html`. Expected: light "how it works" 3-step row with triangle markers; two-column Why section with bulleted list + portrait photo; stacks on mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add process steps and why-Riteway sections"
```

---

## Task 9: Gallery with lightbox

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Add gallery markup**

```html
<section class="section gallery-section" id="gallery">
  <div class="container">
    <p class="label reveal">Our Work</p>
    <h2 class="reveal">Recent railing projects</h2>
    <div class="gallery reveal">
      <img src="images/aluminum-glass-privacy-railing-balcony-edmonton.jpg" alt="Aluminum glass privacy railing on balcony in Edmonton" loading="lazy">
      <img src="images/black-aluminum-picket-railing-steps-edmonton.jpg" alt="Black aluminum picket railing on front steps in Edmonton" loading="lazy">
      <img src="images/white-aluminum-deck-railing-edmonton.jpg" alt="White aluminum deck railing in Edmonton" loading="lazy">
      <img src="images/glass-aluminum-railing-installation-edmonton.jpg" alt="Glass aluminum railing installation in Edmonton" loading="lazy">
      <img src="images/aluminum-glass-railing-deck-edmonton.jpg" alt="Aluminum and glass railing on a deck in Edmonton" loading="lazy">
      <img src="images/aluminum-stair-railing-edmonton.jpg" alt="Aluminum stair railing in Edmonton" loading="lazy">
      <img src="images/aluminum-railing-installation-edmonton.jpg" alt="Aluminum railing installation in Edmonton" loading="lazy">
      <img src="images/custom-aluminum-railing-edmonton-1.jpg" alt="Custom aluminum railing project in Edmonton" loading="lazy">
      <img src="images/custom-aluminum-railing-edmonton-2.jpg" alt="Custom aluminum railing project in Edmonton" loading="lazy">
      <img src="images/aluminum-railing-project-edmonton-3.jpg" alt="Aluminum railing project in Edmonton" loading="lazy">
      <img src="images/custom-aluminum-railing-edmonton-4.jpg" alt="Custom aluminum railing project in Edmonton" loading="lazy">
    </div>
  </div>
</section>
<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Image viewer">
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <img src="" alt="">
</div>
```

- [ ] **Step 2: Add gallery + lightbox styles**

```css
.gallery-section { background: var(--black); color: var(--white); }
.gallery { columns: 3 240px; column-gap: 12px; margin-top: 2.5rem; }
.gallery img { width: 100%; margin-bottom: 12px; border-radius: 4px; cursor: zoom-in; filter: grayscale(.15); transition: filter .25s, transform .25s; break-inside: avoid; }
.gallery img:hover { filter: none; transform: scale(1.01); }
.lightbox { position: fixed; inset: 0; z-index: 100; display: none; align-items: center; justify-content: center; background: rgba(0,0,0,.92); padding: 2rem; }
.lightbox.open { display: flex; }
.lightbox img { max-width: 92vw; max-height: 88vh; border-radius: 4px; }
.lightbox-close { position: absolute; top: 1rem; right: 1.5rem; font-size: 2.5rem; line-height: 1; color: #fff; background: none; border: 0; cursor: pointer; }
```

- [ ] **Step 3: Add lightbox JS (append to `js/main.js`)**

```js
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
```

- [ ] **Step 4: Verify**

Open `index.html`. Expected: masonry photo grid on dark background; clicking a photo opens a full-screen lightbox; Escape or clicking outside closes it.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add project gallery with lightbox"
```

---

## Task 10: Service area + Contact/Quote form

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Add service-area + contact markup**

```html
<section class="section area-section">
  <div class="container">
    <p class="label reveal">Service Area</p>
    <h2 class="reveal">Proudly serving the Edmonton area</h2>
    <ul class="area-list reveal">
      <li>Edmonton</li><li>Beaumont</li><li>Sherwood Park</li><li>Spruce Grove</li><li>Devon</li>
    </ul>
  </div>
</section>

<section class="section contact-section" id="contact">
  <div class="container contact-grid">
    <div class="reveal">
      <p class="label">Get In Touch</p>
      <h2>Request a free quote</h2>
      <p>Tell us about your project and we'll get back to you with a custom quote.</p>
      <ul class="contact-info">
        <li><strong>Phone</strong><a href="tel:+17809528057">(780) 952-8057</a></li>
        <li><strong>Email</strong><a href="mailto:info@ritewayrailings.ca">info@ritewayrailings.ca</a></li>
        <li><strong>Address</strong><span>9147 Cooper Cres SW, Edmonton, AB T6W 3K9</span></li>
        <li><strong>Hours</strong><span>Mon–Fri 8am–6pm · Sat 10am–4pm · Sun closed</span></li>
      </ul>
    </div>
    <form class="quote-form reveal" action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST">
      <label>Name<input type="text" name="name" required></label>
      <label>Phone<input type="tel" name="phone" required></label>
      <label>Email<input type="email" name="email" required></label>
      <label>Project details<textarea name="message" rows="4" placeholder="Type of railing, location, approximate length…" required></textarea></label>
      <button type="submit" class="btn btn-dark">Send Request</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
```

> **Note:** Replace `REPLACE_WITH_FORM_ID` with the Formspree (or Web3Forms) endpoint when the client provides it. For Web3Forms, change `action` to `https://api.web3forms.com/submit` and add `<input type="hidden" name="access_key" value="...">`.

- [ ] **Step 2: Add styles**

```css
.area-section { background: var(--grey-100); }
.area-list { list-style: none; padding: 0; margin: 1.5rem 0 0; display: flex; flex-wrap: wrap; gap: .75rem; }
.area-list li { font-family: var(--display); text-transform: uppercase; font-size: 1.1rem; padding: .5rem 1.1rem; background: var(--white); border: 1px solid var(--grey-300); border-radius: 999px; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 5vw, 4rem); }
.contact-info { list-style: none; padding: 0; margin-top: 1.5rem; }
.contact-info li { padding: .6rem 0; border-bottom: 1px solid var(--grey-300); }
.contact-info strong { display: block; font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--silver); }
.quote-form { display: grid; gap: 1rem; background: var(--white); padding: 1.8rem; border: 1px solid var(--grey-300); border-radius: var(--radius); }
.quote-form label { display: grid; gap: .35rem; font-weight: 600; font-size: .85rem; }
.quote-form input, .quote-form textarea { font: inherit; padding: .7rem .8rem; border: 1px solid var(--grey-300); border-radius: var(--radius); }
.quote-form input:focus, .quote-form textarea:focus { outline: 2px solid var(--black); outline-offset: 1px; }
.form-status { font-size: .85rem; margin: 0; }
@media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Add async form submit (append to `js/main.js`)**

```js
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
```

- [ ] **Step 4: Verify**

Open `index.html`. Expected: service-area pills; two-column contact (info + form); form fields focus with black outline; submitting shows "Sending…" then a status message (network call will fail until the real endpoint is set — acceptable).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add service area and contact/quote form"
```

---

## Task 11: Footer

**Files:**
- Modify: `index.html` (`#site-footer`)
- Modify: `css/styles.css`

- [ ] **Step 1: Add footer markup**

```html
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
      <p><a href="https://www.facebook.com/ritewayralings.ca" rel="noopener" target="_blank">Facebook</a></p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; <span id="year"></span> Riteway Railings. All rights reserved.</p>
  </div>
</footer>
```

- [ ] **Step 2: Add footer styles + year script**

```css
#site-footer { background: var(--black); color: var(--grey-300); padding-top: 3.5rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2rem; }
.footer-logo { height: 40px; width: auto; margin-bottom: 1rem; }
#site-footer h4 { font-family: var(--body); font-weight: 700; text-transform: uppercase; letter-spacing: .12em; font-size: .8rem; color: var(--white); margin: 0 0 .8rem; }
#site-footer a:hover { color: var(--white); }
.footer-bottom { border-top: 1px solid #1f1f1f; margin-top: 2.5rem; padding-block: 1.4rem; font-size: .8rem; }
@media (max-width: 880px) { .footer-grid { grid-template-columns: 1fr; } }
```

Append to `js/main.js`:
```js
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
```

- [ ] **Step 3: Verify**

Open `index.html`. Expected: dark footer with white logo, contact, service area, Facebook link, and current year in the copyright line.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add site footer"
```

---

## Task 12: SEO — structured data, sitemap, robots, scroll reveals, final polish

**Files:**
- Modify: `index.html` (`<head>` + open-graph + JSON-LD)
- Create: `sitemap.xml`, `robots.txt`
- Modify: `js/main.js`

- [ ] **Step 1: Add Open Graph / Twitter + JSON-LD to `<head>`**

Add inside `<head>` (after the favicon block):

```html
  <meta property="og:type" content="website">
  <meta property="og:title" content="Aluminum Railings Edmonton | Riteway Railings">
  <meta property="og:description" content="Custom-built aluminum railings supplied and installed across Edmonton, AB & area. Glass, picket & privacy systems, measured for each project.">
  <meta property="og:url" content="https://ritewayrailings.ca/">
  <meta property="og:image" content="https://ritewayrailings.ca/images/aluminum-glass-privacy-railing-balcony-edmonton.jpg">
  <meta property="og:locale" content="en_CA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="robots" content="index, follow">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Riteway Railings",
    "image": "https://ritewayrailings.ca/images/aluminum-glass-privacy-railing-balcony-edmonton.jpg",
    "url": "https://ritewayrailings.ca/",
    "telephone": "+1-780-952-8057",
    "email": "info@ritewayrailings.ca",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9147 Cooper Cres SW",
      "addressLocality": "Edmonton",
      "addressRegion": "AB",
      "postalCode": "T6W 3K9",
      "addressCountry": "CA"
    },
    "areaServed": ["Edmonton", "Beaumont", "Sherwood Park", "Spruce Grove", "Devon"],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "16:00" }
    ],
    "description": "Custom aluminum railing supply and installation in Edmonton, Alberta and area. Modular or fully welded glass, picket and privacy railing systems, measured and built for each project.",
    "sameAs": ["https://www.facebook.com/ritewayralings.ca"]
  }
  </script>
```

- [ ] **Step 2: Create `robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://ritewayrailings.ca/sitemap.xml
```

- [ ] **Step 3: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ritewayrailings.ca/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Add scroll-reveal IntersectionObserver (append to `js/main.js`)**

```js
const reveals = document.querySelectorAll('.reveal:not(.hero .reveal)');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}
```

- [ ] **Step 5: Verify SEO + reveals**

- Open `index.html`; scroll down — sections fade/slide in as they enter the viewport.
- Validate JSON-LD by pasting the `<script type="application/ld+json">` block into the Google Rich Results structured-data test (or `https://validator.schema.org/`). Expected: no errors.
- Confirm `robots.txt` and `sitemap.xml` open directly in the browser without errors.

- [ ] **Step 6: Commit**

```bash
git add index.html robots.txt sitemap.xml js/main.js
git commit -m "feat: add SEO meta, JSON-LD, sitemap, robots, and scroll reveals"
```

---

## Task 13: Cross-browser / responsive / accessibility verification pass

**Files:**
- Modify: any of `index.html`, `css/styles.css`, `js/main.js` as needed to fix issues found.

- [ ] **Step 1: Headless screenshot at desktop + mobile widths**

Use the puppeteer test dir to screenshot `index.html` at 1440px and 390px widths. Expected: no overflow, readable text, nav collapses, gallery reflows, footer stacks.

- [ ] **Step 2: Favicon presence check across contexts**

Confirm all icon files resolve (no 404): `favicon.ico`, `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, and `site.webmanifest`. Open `site.webmanifest` and verify icon paths resolve.

- [ ] **Step 3: Accessibility quick audit**

- Confirm exactly one `<h1>` (the hero) and logical heading order.
- Confirm every `<img>` has descriptive `alt`.
- Tab through the page: nav, gallery, form, and lightbox close are all keyboard-reachable; focus outlines visible.
- Confirm `prefers-reduced-motion` disables animation (toggle in devtools).

- [ ] **Step 4: Link + content check**

- `tel:` and `mailto:` links correct; Facebook link opens.
- All anchor nav links jump to the right sections.
- Spelling/values match spec (phone, address, hours, service areas).

- [ ] **Step 5: Fix any issues found, then commit**

```bash
git add -A
git commit -m "fix: responsive, accessibility, and cross-browser polish"
```

---

## Self-Review (completed)

- **Spec coverage:** Tech/static (T1), single-page structure (T5–T11), Formspree form (T10), B&W+silver theme (T4), logo white version (T5), 11 photos optimized+renamed (T2), favicon full set (T3), SEO meta/JSON-LD/sitemap/robots (T12), images renamed + alt text (T2, T6, T8, T9), modular-or-welded wording (T6 hero, T7 trust, T8 why), all 9 sections present, file layout matches §6. ✔
- **Placeholder scan:** The only intentional placeholder is the Formspree `action` ID (flagged in §8 of spec and noted inline in T10). No undocumented TODOs. ✔
- **Type/name consistency:** CSS class names, section IDs, and image filenames are consistent across HTML, CSS, JS, and the gallery/JSON-LD references. ✔
