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

- [ ] **Quote form — one-time activation:** the form posts to FormSubmit
      (`https://formsubmit.co/ajax/info@ritewayrailings.ca` in `index.html`) — free,
      unlimited, no account. The **first** time the form is submitted, FormSubmit emails
      `info@ritewayrailings.ca` a confirmation link; click **Activate** once and every
      future submission is delivered to that inbox, formatted as a table. The destination
      mailbox must exist and be monitored. To deliver to a different address, change the
      email in the form `action`. (Spam is filtered by a hidden honeypot field; to also
      require a captcha, remove the `_captcha` "false" hidden input.)
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
