# PROJECT BIBLE LITE — KUSUMA DIGITAL SOLUTIONS

**Authority:** This file governs all code generation decisions.
**Full reference:** PROJECT_BIBLE.md (rationale, hidden knowledge, history)
**Tracker:** PROJECT_TRACKER_LITE.md (current status, issues, next tasks)

---

## IDENTITY

Kusuma Digital Solutions — solo digital agency, St. Louis MO, run by Rana.
Goal: lead generation and booked calls from local small businesses.
Write all copy for a restaurant or salon owner, not a developer.
Outcomes first. Plain English. No jargon. First person on About page.

---

## TECH STACK

```
HTML / CSS / JS     Vanilla only. No frameworks. No npm. No build tools.
Hosting             Netlify (free tier)
Domain              kusumadigitals.com — Namecheap (not yet purchased)
DNS                 Cloudflare free
Forms               Netlify Forms (data-netlify="true")
Call booking        Calendly free (embed on contact.html)
Analytics           GA4 — loads ONLY after cookie consent
Search              Google Search Console
Local               Google Business Profile (service area mode, STL)
Email               Zoho Mail free — rana@kusumadigitals.com
Icons               Lucide Icons — MIT — unpkg CDN
Fonts               Plus Jakarta Sans (headings) + Inter (body) — Google Fonts
```
---

## FOLDER STRUCTURE (canonical — do not deviate)
---

KUSUMA-DIGITALS/                  ← project root (Netlify deploy root)
│
├── blog/                         ← blog section
│   ├── index.html                ← blog listing page
│   ├── post-1.html               ← "Website Cost" article
│   ├── post-2.html               ← "Not Showing on Google" article
│   └── post-3.html               ← "What Is Local SEO" article
│
├── css/                          ← all stylesheets
│   ├── styles.css                ← MASTER — all layout + components (2,500+ lines)
│   ├── theme-amber.css           ← ACTIVE color variables (load first, always)
│   ├── theme-citrus.css          ← inactive — keep, do not reference
│   └── theme-crimson.css         ← inactive — keep, do not reference
│
├── images/                       ← all image assets
│   ├── favicon.svg               ← primary favicon (SVG)
│   ├── favicon.ico               ← fallback favicon (16×16)
│   ├── apple-touch-icon.png      ← 180×180px — needed before launch
│   └── og-image.jpg              ← 1200×630px, under 200KB — needed before launch
│
├── js/                           ← all JavaScript
│   ├── main.js                   ← nav, mobile menu, cookie consent, scroll reveal
│   └── form.js                   ← Netlify form handling + GA4 event fire
│
├── 404.html                      ← branded error page (noindex)
├── about.html                    ← Rana bio + values
├── contact.html                  ← lead capture form + Calendly embed
├── index.html                    ← homepage (primary landing page)
├── privacy.html                  ← privacy policy (GA4 + Netlify + cookies)
├── services.html                 ← full services + pricing + FAQ
├── terms.html                    ← terms and conditions
├── thank-you.html                ← form confirmation redirect (noindex)
│
├── HANDOFF.md                    ← session handoff doc (update every session)
├── PROJECT_BIBLE.md              ← design rules + tech decisions (this file)
├── PROJECT_TRACKER.md            ← build status + known issues + next tasks
├── netlify.toml                  ← Netlify config (redirects, headers, 404 rule)
├── robots.txt                    ← crawl rules
└── sitemap.xml                   ← update in final session before launch

## ACTIVE CSS FILES (load in this order, always)

Root pages (`index.html`, etc.):
```html
<link rel="stylesheet" href="css/theme-amber.css" id="theme-stylesheet">
<link rel="stylesheet" href="css/styles.css">
<style>body{visibility:hidden}</style>
```

Blog pages (`blog/post-N.html`, etc.) — prefix with `../`:
```html
<link rel="stylesheet" href="../css/theme-amber.css" id="theme-stylesheet">
<link rel="stylesheet" href="../css/styles.css">
<style>body{visibility:hidden}</style>
```

`theme-amber.css` — color variables only
`styles.css` — all layout, components, responsive (1,647 lines)
`theme-crimson.css` / `theme-citrus.css` — inactive, keep, do not reference

---

## COLOR TOKENS (theme-amber.css — never hardcode hex in styles.css)

```css
--color-primary: #111111;
--color-primary-light: #1f1f1f;
--color-accent: #f59e0b;
--color-accent-dark: #d97706;
--color-accent-subtle: rgba(245, 158, 11, 0.15);
--color-background: #fafafa;
--color-surface: #f3f4f6;
--color-surface-2: #e9eaec;
--color-text: #1a1a1a;
--color-text-muted: #6b7280;
--color-text-faint: #9ca3af;
--color-border: rgba(0, 0, 0, 0.08);
--color-border-strong: rgba(0, 0, 0, 0.15);
--color-hero-bg: #111111;
--color-hero-text: #fafafa;
--color-hero-muted: rgba(250, 250, 250, 0.65);
--color-hero-border: rgba(255, 255, 255, 0.15);
--color-geo-accent: rgba(245, 158, 11, 0.08);
```

---

## TYPOGRAPHY TOKENS

```css
--font-heading: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;

/* Weights available: 400 500 600 700 800 */
/* Scale: xs=12px sm=14px base=16px lg=18px xl=20px
          2xl=24px 3xl=32px 4xl=44px 5xl=56px */
```

Headings only: Plus Jakarta Sans. Body, nav, forms, footer: Inter.

Font load (in `<head>`, before CSS):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

---

## SPACING TOKENS (8px base grid — never use arbitrary px)

```css
--space-1: 4px --space-2: 8px --space-3: 12px --space-4: 16px --space-5: 20px
  --space-6: 24px --space-8: 32px --space-10: 40px --space-12: 48px
  --space-16: 64px --space-20: 80px --space-24: 96px;
```

---

## OTHER DESIGN TOKENS

```css
/* Border radius */
--radius-sm: 4px --radius-md: 8px --radius-lg: 16px --radius-xl: 24px
  --radius-full: 9999px /* Shadows */ --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06)
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08) --shadow-md: 0 4px 16px
  rgba(0, 0, 0, 0.1) --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12) --shadow-xl: 0
  16px 48px rgba(0, 0, 0, 0.14) /* Transitions */ --ease-fast: 150ms ease
  --ease-base: 250ms ease --ease-slow: 400ms ease --ease-spring: 300ms
  cubic-bezier(0.34, 1.56, 0.64, 1) /* Layout */ --container-max: 1200px
  --nav-height: 72px /* used in scroll-margin-top — do not hardcode */;
```

---

## BREAKPOINTS (mobile-first)

```
Base:    320px  No query — minimum supported width
Tablet:  @media (min-width: 768px)
Desktop: @media (min-width: 1024px)
```

Zero horizontal scroll at all widths. No exceptions.

---

## GRADIENT RULES (approved contexts only)

Amber→orange family (`#F59E0B` → `#F97316`) in three contexts only:

- Gradient text fill on headline accent word
- Primary CTA button background
- Subtle card background gradient

Never: full-page gradients, blue/purple/teal gradients, text over busy gradients.

---

## COMPONENT REFERENCE

All components are fully defined in `styles.css` and demonstrated in `index.html`.
**Copy from `index.html`. Do not rebuild.**

| Component      | Class                                        | Notes                                                                                                                                                                   |
| -------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button         | `.btn .btn-primary/ghost/outline .btn-sm/lg` | Primary=filled amber, ghost=dark bg, outline=light bg                                                                                                                   |
| Nav            | `.nav`                                       | Logo = `<img class="nav__logo-icon">` (favicon.svg 36×36) + `<span class="nav__logo-text">Kusuma Digital Solutions</span>`. Copy from index.html. Change `.is-active` link only. |
| Hero           | `.hero`                                      | Dark bg, CSS-only geo circles, badge + H1 + sub + CTAs                                                                                                                  |
| Trust strip    | `.trust-strip`                               | One sentence, dark bg                                                                                                                                                   |
| Service card   | `.service-card.reveal`                       | Copy `<article>` pattern. 6 per grid.                                                                                                                                   |
| Why item       | `.why-item.reveal`                           | Icon + title + desc. 3 per grid.                                                                                                                                        |
| Step           | `.step.reveal`                               | Numbered. Vertical mobile → horizontal desktop.                                                                                                                         |
| Blog card      | `.blog-card.reveal`                          | Img placeholder + tag + h3 + excerpt + link                                                                                                                             |
| CTA banner     | `.cta-banner`                                | Dark full-width section. Required on every page except contact.html.                                                                                                    |
| Footer         | `.footer`                                    | 4-column grid. Copy from index.html. Never changes between pages.                                                                                                       |
| Cookie banner  | `#cookie-banner`                             | Copy from index.html to every page.                                                                                                                                     |
| Success popup  | `#success-popup`                             | contact.html only.                                                                                                                                                      |
| Section header | `.section-header--center`                    | eyebrow + h2 + optional p                                                                                                                                               |

**CSS still needed (add to styles.css as pages are built):**

- Form input / label / error styles (contact.html)
- Pricing card component (services.html)
- FAQ accordion (services.html)
- Calendly embed wrapper (contact.html)
- Blog article body typography (blog posts)

---

## SECTION ALTERNATION PATTERN

Every page follows this rhythm:

```
Dark hero → White section → Surface section → White section → Dark CTA → Dark footer
```

`section--surface` adds `--color-surface` background. Alternate white/surface throughout.

---

## PAGE TEMPLATE (every HTML page must include)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- Unique title (50-60 chars), meta description (140-155 chars) -->
    <!-- robots, geo.region, geo.placename, canonical (www version) -->
    <!-- OG: type url site_name locale title description image -->
    <!-- Twitter card -->
    <!-- Favicon: svg + ico fallback + apple-touch-icon -->
    <!-- Font preconnect + load -->
    <!-- theme-amber.css THEN styles.css -->
    <!-- Schema markup (page-appropriate type) -->
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Cookie banner (copy from index.html) -->
    <!-- Nav (copy from index.html, update .is-active) -->
    <main id="main-content">
      <!-- Page content -->
      <!-- CTA banner (all pages except contact.html) -->
    </main>
    <!-- Footer (copy from index.html) -->
    <!-- Success popup (contact.html only) -->
    <!-- DEV theme switcher (remove before launch) -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/form.js"></script>
    <script>
      document.getElementById("copyright-year").textContent =
        new Date().getFullYear();
    </script>
  </body>
</html>
```

---

## SEO CHECKLIST (every page before marking complete)

- [ ] Unique title — 50-60 chars, primary keyword first, location included
- [ ] Unique meta description — 140-155 chars, outcome-focused
- [ ] One H1, correct H2→H3 hierarchy, no skipped levels
- [ ] Canonical — exact `https://www.kusumadigitals.com/[page]`
- [ ] OG tags — all 8 required properties present
- [ ] Schema — LocalBusiness on index, Article on blog, Service on services, FAQ on FAQ section
- [ ] All images — descriptive alt text + explicit width + height attributes
- [ ] All images below fold — `loading="lazy"`

---

## NETLIFY FORM PATTERN (every form)

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  action="/thank-you.html"
>
  <input type="hidden" name="form-name" value="contact" />
  <input name="bot-field" type="hidden" />
  <!-- real fields -->
</form>
```

Forms only work on deployed Netlify URL — never on `file://` or localhost.

---

## SERVICES & PRICING

| Service                       | Pricing                                           |
| ----------------------------- | ------------------------------------------------- |
| Website Design & Development  | Starter $799 / Growth $1,499 / Custom from $2,499 |
| Local SEO & Google Presence   | Starter $299/mo / Growth $499/mo                  |
| Monthly Website Care Plans    | Basic $79/mo / Pro $149/mo                        |
| Google Business Profile Setup | $149 one-time                                     |
| Custom Tools & Automation     | From $1,499/project                               |
| Full Stack Development        | $85/hr or from $2,000/project                     |

Services appear in this order on all pages — do not reorder.
Label the tech services "Custom Tools & Automation" — never "Python and Java."

---

## MUST DO (non-negotiable)

1. One H1 per page — always, no exceptions
2. Follow H1→H2→H3 hierarchy — never skip levels
3. Every image: descriptive alt text + width + height attributes
4. Every icon: `aria-hidden="true"`
5. Every icon-only button: `aria-label`
6. All colors via CSS variables — never hardcode hex in styles.css
7. theme-amber.css loads BEFORE styles.css — always
8. Scripts at end of `<body>` — Lucide → main.js → form.js → year script
9. Netlify honeypot on every form
10. `loading="lazy"` on all images below the fold
11. All new CSS added to styles.css (not new files) using existing section format
12. CTA banner on every page except contact.html
13. Section alternation: white → surface → white (never two same in a row)
14. Full deployable HTML file every session — not snippets, not diffs

---

## MUST NEVER DO (non-negotiable)

1. Blue, purple, or teal — in any context, any element
2. Sage, ivory, forest green, copper — Tony's South City Scooters palette
3. Hardcode hex values in styles.css
4. Add any CSS framework (Tailwind, Bootstrap, etc.)
5. Add any JS framework (React, Alpine, jQuery, etc.)
6. Parallax scrolling — anywhere
7. 3D models or WebGL — anywhere
8. Accessibility overlay widgets (AccessiBe, UserWay, etc.)
9. Fake testimonials — placeholder text only until Tony's real quote arrives
10. "Python and Java" on the site — always "custom tools and automation"
11. Change the theme — Amber is final
12. Change CTA label from "Book a Free Call" — deliberate, do not alter
13. Reorder the 6 services without explicit instruction from Rana
14. Test Netlify forms locally — live Netlify URL only
15. DEV theme switcher on any page going to production
- Never create new CSS files — all CSS goes into `css/styles.css`
- Never create new JS files — all JS goes into `js/main.js` or `js/form.js`
- Never add subdirectories except `blog/`, `css/`, `images/`, `js/`
- All HTML file paths use **relative paths** (no leading `/`). Root pages: `css/`, `js/`, `images/`. Blog pages: `../css/`, `../js/`, `../images/`

---

---

_Full rationale, hidden knowledge, and rejected decisions: PROJECT_BIBLE.md_
