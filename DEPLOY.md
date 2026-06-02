# Deployment & Go-Live Checklist

This is a static site (plain HTML/CSS/JS). No build step — the files served are the
files in this repo's root.

## Preview hosting (GitHub Pages)

The site is hosted on GitHub Pages for the customer to review:

1. On GitHub: **Settings → Pages**.
2. **Source:** Deploy from a branch.
3. **Branch:** `main` · **Folder:** `/ (root)` → **Save**.
4. After ~1 minute the preview is live at `https://<user>.github.io/<repo>/`.
5. Every `git push` to `main` re-deploys automatically.

While in preview, `index.html` includes `<meta name="robots" content="noindex, nofollow">`
so Google does not index the staging site.

## Go-live checklist (when moving to ritewayrailings.ca)

- [ ] **Quote form:** in `index.html`, replace `REPLACE_WITH_FORM_ID` in the form `action`
      with the real Formspree form ID (sign up at formspree.io with info@ritewayrailings.ca).
      For Web3Forms instead: set `action="https://api.web3forms.com/submit"` and add
      `<input type="hidden" name="access_key" value="...">`.
- [ ] **Search indexing:** change `<meta name="robots" content="noindex, nofollow">`
      back to `index, follow` in **all four pages**: `index.html`, `aluminum-railing.html`,
      `glass-railing.html`, `privacy-walls.html`.
- [ ] **Canonical/OG/sitemap** already point to `https://ritewayrailings.ca/` — confirm the
      domain matches once DNS is pointed.
- [ ] Submit `sitemap.xml` in Google Search Console for the live domain.

## Regenerating assets (optional, dev only)

- Optimized photos: `node tools/optimize-images.mjs`
- Gallery-page photos (from `Brand Assets/source-photos/`) + rebuild the three
  category pages: `node tools/optimize-gallery-images.mjs && node tools/build-pages.mjs`
- Favicons from `favicon.svg`: `node tools/gen-favicons.mjs`
  (requires `npm install --no-save sharp png-to-ico`)
