# PROJECT TRACKER — KUSUMA DIGITAL SOLUTIONS

**Session:** 3 Complete | **Updated:** 2026-06-01
**Rules/Architecture:** PROJECT_BIBLE.md

---

## COMPLETION

```
Overall          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░  70%
HTML Pages       ████████████████████ 100%  (12 of 12)
CSS              ████████████████████ 100%  (35 sections)
Image Assets     ░░░░░░░░░░░░░░░░░░░░   0%  (0 of 3)
Integrations     ░░░░░░░░░░░░░░░░░░░░   0%  (0 of 6)
Real Content     ░░░░░░░░░░░░░░░░░░░░   0%  (phone, GA4, bio, photo)
```

---

## ALL FILES — STATUS

| File                  | Status   | Notes                                                      |
| --------------------- | -------- | ---------------------------------------------------------- |
| `index.html`          | ✅ Done  | Homepage                                                   |
| `services.html`       | ✅ Done  | 6 services, pricing, FAQ                                   |
| `about.html`          | ✅ Done  | **Bio = placeholder. Rana must rewrite before launch.**    |
| `contact.html`        | ✅ Done  | Netlify form, Calendly placeholder                         |
| `thank-you.html`      | ✅ Done  | Form confirmation, noindex                                 |
| `404.html`            | ✅ Done  | Branded error, 3 nav options, noindex                      |
| `privacy.html`        | ✅ Done  | GA4 + Netlify + cookie disclosure                          |
| `terms.html`          | ✅ Done  | Scope, payment, IP, liability, Missouri law                |
| `blog/index.html`     | ✅ Done  | 3 blog cards, Blog is-active                               |
| `blog/post-1.html`    | ✅ Done  | Website cost — 900 words, BlogPosting schema               |
| `blog/post-2.html`    | ✅ Done  | Not showing on Google — 850 words, BlogPosting schema      |
| `blog/post-3.html`    | ✅ Done  | What is local SEO — 950 words, BlogPosting schema          |
| `css/styles.css`      | ✅ Done  | 2,615 lines — Section 35 (prose) added this session        |
| `css/theme-amber.css` | ✅ Done  | Amber is final. Do not change.                             |
| `js/main.js`          | ✅ Done  |                                                            |
| `js/form.js`          | ✅ Done  | **GA4 ID still placeholder — critical**                    |
| `sitemap.xml`         | ⚠️ Stale | Missing: privacy, terms, blog pages. Update before launch. |
| `netlify.toml`        | ✅ Done  |                                                            |
| `robots.txt`          | ✅ Done  |                                                            |

---

## IMAGE ASSETS NEEDED (before launch)

| File                          | Spec                                      |
| ----------------------------- | ----------------------------------------- |
| `images/og-image.jpg`         | 1200×630px, amber on dark, under 200KB    |
| `images/apple-touch-icon.png` | 180×180px, KD monogram                    |
| `favicon.ico`                 | 16×16 fallback, generate from favicon.svg |

## KNOWN ISSUES — OPEN ONLY

| #   | Severity    | Issue                                                      | Fix                                                             |
| --- | ----------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| 02  | 🔴 Critical | `G-XXXXXXXXXX` placeholder in `js/form.js`                 | Replace with real GA4 measurement ID                            |
| 03  | 🔴 Critical | `tel:PLACEHOLDER` in footer on every page                  | Replace with Google Voice number when set up                    |
| 04  | 🟠 High     | `images/og-image.jpg` missing — social previews broken     | 1200×630px, amber on dark, under 200KB                          |
| 05  | 🟠 High     | `images/apple-touch-icon.png` missing                      | 180×180px KD monogram                                           |
| 06  | 🟠 High     | Netlify Forms untested                                     | Deploy to Netlify, submit live test form, confirm in dashboard  |
| 08  | 🟠 High     | `sitemap.xml` stale — missing 7 pages                      | Add: privacy, terms, blog/index, post-1/2/3, thank-you excluded |
| 09  | 🟡 Medium   | Calendly URL not set in `contact.html`                     | Set up Calendly free account, paste embed URL into placeholder  |
| 11  | ⚪ Low      | `favicon.ico` missing                                      | Generate from favicon.svg at launch                             |
| 13  | ⚪ Low      | `"sameAs": []` empty in LocalBusiness schema on index.html | Populate after GBP and social profiles are created              |
| 18  | 🟡 Medium   | `about.html` bio text is placeholder                       | Rana must write real bio before launch                          |
| 19  | 🟡 Medium   | About page has placeholder photo                           | Replace with real photo of Rana before launch                   |

---

## INTEGRATIONS — PRE-LAUNCH

| Integration             | Status     | Blocker                                             |
| ----------------------- | ---------- | --------------------------------------------------- |
| Netlify deploy          | ⏳ Pending | None — do this first                                |
| GA4 property            | ⏳ Pending | Create property → replace `G-XXXXXXXXXX` in form.js |
| Google Search Console   | ⏳ Pending | Requires live Netlify URL first                     |
| Google Business Profile | ⏳ Pending | Use service area mode, hide address                 |
| Zoho Mail               | ⏳ Pending | rana@kusumadigitals.com — free plan                 |
| Calendly                | ⏳ Pending | Free plan → paste URL into contact.html             |

---

## NEXT SESSION — LAUNCH PREP

1. Update `sitemap.xml` with all 12 pages (exclude thank-you, 404)
2. Update `HANDOFF.md` — mark Session 3 complete, confirm Amber theme chosen
3. Add folder structure section to `PROJECT_BIBLE.md` (copy from Session 3 chat)
4. Walk through Netlify deploy checklist
5. Create OG image (1200×630px) — can generate with code if needed
