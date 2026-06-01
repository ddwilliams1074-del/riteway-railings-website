# Riteway Railings — Website Redesign Spec

**Date:** 2026-06-01
**Project:** Rebuild of https://ritewayrailings.ca/ as a modern static single-page site
**Working dir:** `Website-rite-way railings/`

---

## 1. Goal

Rebuild the customer's existing website with an updated, modern look. Optimize for
local SEO around **aluminum railing supply and install in Edmonton, Alberta and area**.
Railings are **measured and custom-built for each project** and offered as **modular or
fully welded** systems.

## 2. Decisions (confirmed)

| Decision | Choice |
|----------|--------|
| Tech / hosting | Static HTML / CSS / JS (no build step; host anywhere) |
| Page structure | Single page with anchor-link navigation |
| Quote form delivery | Formspree / Web3Forms (emails `info@ritewayrailings.ca`) — endpoint added later |
| Theme | Black & white + brushed-silver / chrome accents |
| Logo | Provided in `Brand Assets/` (raster PNG + source AI/EPS/PSD) |
| Photos | 11 real project photos pulled from current site → `Brand Assets/site-photos/` |
| Design approach | Per `frontend-design` skill — distinctive, production-grade |

## 3. Aesthetic Direction

**Refined industrial / architectural monochrome.** High-contrast black & white with a
brushed-silver/chrome gradient accent that echoes the logo's triangle medallion. Feel:
precise, premium, built-to-spec.

- **Typography:** Heavy, slightly-condensed display face for headlines matching the logo's
  industrial letterforms (e.g. **Anton** or **Archivo Black**), paired with a clean
  characterful grotesk for body (e.g. **Hanken Grotesk**). Self-hosted or Google Fonts.
  Explicitly avoid generic Inter/Roboto/Arial and overused Space Grotesk. *(Tunable.)*
- **Accents:** Chrome/silver gradient (light→mid grey) reused for the triangle motif,
  hairline dividers, hover states, and the favicon. Otherwise pure black, white, greys.
- **Motion:** One orchestrated staggered hero reveal on load (CSS `animation-delay`);
  subtle hover lifts on cards/buttons; restrained scroll reveals. CSS-only.
- **Logo handling:** Source art is black; produce an inverted **white** version (CSS
  `filter: invert(1)` or generated PNG) for the dark nav/hero/footer.
- **Triangle motif:** The logo's chrome triangle is reused as bullet markers, step
  numbers in "How it works", and section dividers.

## 4. Page Sections (single page)

Sticky dark header: white logo + anchor links **Railings · Glass · Privacy Walls ·
Gallery · About · Contact** + "Free Quote" button + click-to-call.

1. **Hero** — "Custom railings, done the RITE-WAY." Subhead: aluminum railing supply &
   install for Edmonton & area, measured and custom-built. CTAs: *Get a Free Quote* /
   *Call (780) 952-8057*. Background uses a project photo with dark overlay.
2. **Trust strip** — Custom-built · Modular **or** fully welded · 5+ powder finishes · Local Edmonton.
3. **Services / Products** — cards:
   - Aluminum Railings (pickets or glass infill, any height)
   - Privacy Walls (wind protection, obscured views)
   - Custom Glass (pinhead, raindrop, bronze, tint, grey tint)
4. **How it works** — Measured → Custom-built → Installed (3 steps, triangle markers).
5. **Why Riteway** — modular or fully welded options, thicker-wall aluminum, powder-coat
   colors (black, white, beige, yard bronze, custom), engineered/stamped drawings available.
6. **Gallery** — responsive grid of the 11 project photos with lightbox on click.
7. **Service area** — Edmonton, Beaumont, Sherwood Park, Spruce Grove, Devon.
8. **Quote / Contact** — form (name, phone, email, project details) → Formspree/Web3Forms;
   plus phone, email, address (9147 Cooper Cres SW, Edmonton, AB T6W 3K9), hours
   (Mon–Fri 8–6, Sat 10–4, Sun closed).
9. **Footer** — white logo, contact, service areas, Facebook link, copyright.

## 5. SEO & Technical Requirements

- **Meta:** title + description + Open Graph/Twitter tags targeting "aluminum railing
  supply and install — Edmonton, Alberta & area," custom measured & built.
- **Structured data:** JSON-LD `LocalBusiness` (name, address, geo, phone, hours,
  `areaServed`, services) + `BreadcrumbList` where relevant.
- **sitemap.xml** + **robots.txt** referencing the canonical URL.
- **Favicon:** capital **"R"** in the site's black/silver scheme; full set
  (`favicon.ico`, PNG 16/32/180/192/512, `apple-touch-icon`, `site.webmanifest`) so it
  renders across all browsers.
- **Images:** renamed descriptively (e.g. `aluminum-glass-privacy-railing-edmonton.jpg`)
  with keyword-aware `alt` text; lazy-loaded; width/height set to avoid layout shift.
- **Semantics/a11y:** one `<h1>`, logical heading order, sufficient contrast, focus
  states, `aria` labels on nav/form, `prefers-reduced-motion` respected.
- **Performance:** no framework, minimal JS, self-hosted or `font-display:swap` fonts.

## 6. File Layout

```
Website-rite-way railings/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js            (nav toggle, gallery lightbox, scroll reveals, form UX)
├── images/                (renamed, web-optimized project photos + logos)
├── favicon.ico
├── apple-touch-icon.png
├── favicon-16.png, favicon-32.png, icon-192.png, icon-512.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── docs/superpowers/specs/2026-06-01-riteway-railings-website-design.md
└── Brand Assets/          (untouched source logos + site-photos/)
```

## 7. Out of Scope (YAGNI)

- No CMS / backend / database.
- No multi-page routing (single page only).
- No e-commerce or online booking.
- No blog (can be added later if SEO needs grow).

## 8. Open Items / Placeholders

- **Formspree/Web3Forms endpoint** — placeholder in form `action`; client supplies key.
- **Fonts** — recommended pairing chosen; final pending client preference.
- **Google Business photos** — not pullable via API without auth; client may drop extra
  photos into `Brand Assets/site-photos/` for inclusion.
- **Canonical domain** — assume `https://ritewayrailings.ca/` for sitemap/canonical/OG.
