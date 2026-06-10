# PROJECT TRACKER — KUSUMA DIGITAL SOLUTIONS

**Updated:** 2026-06-09 | **Architecture/Rules:** PROJECT_BIBLE.md

---

## OVERALL PROGRESS

```
Overall          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  80%
HTML Pages       ████████████████████ 100%  (12 of 12)
CSS              ████████████████████ 100%  (35 sections)
Image Assets     ████████████████████ 100%  (4 of 4)
Integrations     ░░░░░░░░░░░░░░░░░░░░   0%  (0 of 6)
Real Content     ░░░░░░░░░░░░░░░░░░░░   0%  (phone, GA4, bio)
```

---

## FILE STATUS

| File                  | Status  | Notes                                               |
| --------------------- | ------- | --------------------------------------------------- |
| `index.html`          | ✅ Done | Homepage                                            |
| `services.html`       | ✅ Done | 7 services, pricing, FAQ (data migration FAQ added) |
| `about.html`          | ✅ Done | Real photo live — bio updated                       |
| `contact.html`        | ✅ Done | Netlify form, Calendly placeholder                  |
| `thank-you.html`      | ✅ Done | noindex                                             |
| `404.html`            | ✅ Done | Branded error, 3 nav options, noindex               |
| `privacy.html`        | ✅ Done |                                                     |
| `terms.html`          | ✅ Done |                                                     |
| `blog/index.html`     | ✅ Done | 3 blog cards                                        |
| `blog/post-1.html`    | ✅ Done | Website cost — 900 words                            |
| `blog/post-2.html`    | ✅ Done | Not showing on Google — 850 words                   |
| `blog/post-3.html`    | ✅ Done | What is local SEO — 950 words                       |
| `css/styles.css`      | ✅ Done | 35 sections, card hover lift fixed to 2–3px         |
| `css/theme-amber.css` | ✅ Done | Final theme — do not change                         |
| `js/main.js`          | ✅ Done |                                                     |
| `js/form.js`          | ✅ Done | GA4 ID still placeholder — critical                 |
| `sitemap.xml`         | ✅ Done |                                                     |
| `netlify.toml`        | ✅ Done |                                                     |
| `robots.txt`          | ✅ Done |                                                     |

---

## IMAGE ASSETS

| File                          | Status                                   |
| ----------------------------- | ---------------------------------------- |
| `images/og-image.jpg`         | ✅ 1200×630, amber on dark, 37KB         |
| `images/apple-touch-icon.png` | ✅ 180×180 KD monogram                   |
| `images/favicon.ico`          | ✅ Exists                                |
| `images/rana.jpg`             | ✅ Added — real photo live on about page |

---

## KNOWN ISSUES — OPEN

| #   | Severity    | Issue                                        | Fix                                                 |
| --- | ----------- | -------------------------------------------- | --------------------------------------------------- |
| 02  | 🔴 Critical | `G-XXXXXXXXXX` placeholder in `js/form.js`   | Replace with real GA4 measurement ID                |
| 03  | 🔴 Critical | `tel:PLACEHOLDER` in footer on every page    | Replace with Google Voice number when ready         |
| 06  | 🟠 High     | Netlify Forms untested                       | Deploy, submit live test form, confirm in dashboard |
| 09  | 🟡 Medium   | Calendly URL not set in `contact.html`       | Free Calendly account → paste embed URL             |
| 13  | ⚪ Low      | `"sameAs": []` empty in LocalBusiness schema | Populate after GBP + social profiles are created    |
| 18  | 🟡 Medium   | `about.html` bio is placeholder text         | Rana must write real bio before launch              |

---

## INTEGRATIONS — PRE-LAUNCH

| Integration             | Status     | Notes                                               |
| ----------------------- | ---------- | --------------------------------------------------- |
| Netlify deploy          | ⏳ Pending | Do this first — everything else depends on live URL |
| GA4 property            | ⏳ Pending | Create → replace `G-XXXXXXXXXX` in form.js          |
| Google Search Console   | ⏳ Pending | Requires live URL                                   |
| Google Business Profile | ⏳ Pending | Service area mode, hide address                     |
| Zoho Mail               | ⏳ Pending | rana@kusumadigitals.com — free plan                 |
| Calendly                | ⏳ Pending | Free plan → paste URL into contact.html             |

---

## COMPLETED THIS SESSION (2026-06-09)

- Renamed company from "Kusuma Digitals" → "Kusuma Digital Solutions" across all 12 pages (titles, meta, OG, Twitter, schema, nav, footer, CSS comments)
- Replaced placeholder stock photo on about page with real `images/rana.jpg`
- Converted all internal paths to root-relative (`/css/`, `/images/`, `/blog/`) — fixes broken assets on subpages
- Removed FOUC `<style>body{visibility:hidden}</style>` from inner pages (handled by styles.css)
- Fixed service card hover lift: was 6px → corrected to 3px (blog cards 2px, pricing cards 3px — all now within spec)
- Added data migration FAQ entry to services.html schema

---

## NEXT TASK — DEPLOY TO NETLIFY

1. Push repo to GitHub (if not already)
2. Connect repo to Netlify → auto-deploy
3. Verify Netlify Forms works — submit test contact form, check dashboard
4. Replace `G-XXXXXXXXXX` in `js/form.js` with real GA4 ID (issue 02)
5. Replace `tel:PLACEHOLDER` in footers with real number (issue 03)
6. Set Calendly embed URL in `contact.html` (issue 09)
7. Rana: write real bio for `about.html` (issue 18)
