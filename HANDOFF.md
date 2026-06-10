# KUSUMA DIGITAL SOLUTIONS — PROJECT HANDOFF
**For:** Claude (Radha persona) — read this at the start of every session.
**Owner:** Rana | rana@kusumadigitals.com | St. Louis, Missouri
**Last updated:** 2026-06-09 — Session 5 complete

> **Session 5 (2026-06-09):** Landing page synced with services page — "Full Stack
> Development" card replaced by "Custom Business Apps & Data Tools" (#custom-apps,
> dead #fullstack anchor fixed). 7 services now canonical (see bible). Hover polish
> on service cards (6px lift, icon scale, arrow nudge). Automation vs Apps bullets
> de-duplicated. Footer on all 12 pages now lists all 7 services. Order stays
> journey-based — Rana approved NOT sorting by price.

> **Session 4 (2026-06-09):** Site renamed to "Kusuma Digital Solutions" (confirmed, keep).
> Fixed GitHub Pages breakage: about.html + services.html had absolute paths (`/css/...`)
> violating the bible's relative-path rule — converted to relative. form.js redirect made
> relative. sitemap.xml blog URLs fixed + privacy/terms added. og-image.jpg and
> apple-touch-icon.png generated. Hardcoded hex in styles.css moved to theme tokens.
> Amber theme is FINAL (chosen Session 2). GitHub Pages = preview only; launch on Netlify.

---

## WHO YOU ARE
You are Radha. 20+ years experience in web development and site
architecture. You are meticulous, honest, direct, and you call out
bad ideas without apology. You make decisions for Rana when he is
unsure, based on your experience. You never oversell or undersell.
You are the senior engineer. Rana is the copy-paste executor.

---

## THE BUSINESS
**Kusuma Digital Solutions** — solo operation run by Rana.
- Web design and development
- Local SEO and Google presence
- Monthly website care / maintenance retainer
- Custom tools and automation ("we build tools that save you time")
- Full stack development
- Google Business Profile setup

**Target market:** St. Louis small businesses (expanding to full USA later)
**Primary site goal:** Generate leads and booked calls
**Brand meaning:** Kusuma = blossom/flower (Sanskrit + Telugu)
**Tagline (About page only):** "Kusuma means blossom. We help your
business grow its digital roots."

---

## TECH STACK (ALL FINAL — DO NOT CHANGE)
- HTML / CSS / JS — vanilla, no frameworks
- Netlify — hosting (free tier, upgrade if needed)
- Namecheap — domain: kusumadigitals.com (not yet purchased)
- Cloudflare — free DNS after Namecheap purchase
- Netlify Forms — lead capture (100/month free)
- Calendly — free plan, call booking embed on contact page
- Google Analytics 4 — loads only AFTER cookie consent
- Google Search Console — sitemap submission on launch day
- Google Business Profile — service area mode (hide home address)
  Service areas: St. Louis, MO + St. Louis County, MO
- Zoho Mail — rana@kusumadigitals.com (free plan, setup later)
- Lucide Icons — MIT license, loaded via CDN (unpkg)
- Plus Jakarta Sans — headings (Google Fonts)
- Inter — body text (Google Fonts)

---

## COLOR PALETTES — RANA CHOOSES AFTER SEEING RENDERED
Three theme CSS files exist. Swap the <link id="theme-stylesheet">
to change theme. Dev floating dot switcher in bottom-right corner.

| File | Primary | Accent | Vibe |
|---|---|---|---|
| theme-amber.css | #111111 Espresso | #F59E0B Amber | Bold, confident |
| theme-crimson.css | #7C1D2C Deep Wine | #D4A843 Gold | Premium, unique |
| theme-citrus.css | #1C1917 Espresso | #F97316 Orange | Sharp, energetic |

None are blue/purple/teal. None overlap with Tony's South City
Scooters palette (sage/ivory/forest green/copper).

RANA HAS NOT CHOSEN YET. Ask at start of Session 2.

---

## SESSION 1 — COMPLETED FILES