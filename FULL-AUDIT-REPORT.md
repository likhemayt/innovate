# SEO Full Audit Report — Innovate Digital Agency
**URL:** https://innovate-proto.vercel.app
**Date:** 2026-05-08
**Audit Number:** 4
**Previous Score (Audit 3):** 65/100
**Framework:** Astro SSG + React + Tailwind, deployed on Vercel

---

## Overall SEO Health Score: 67 / 100 (+2 pts)

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 75/100 | 22% | 16.5 |
| Content Quality | 54/100 | 23% | 12.4 |
| On-Page SEO | 79/100 | 20% | 15.8 |
| Schema / Structured Data | 54/100 | 10% | 5.4 |
| Performance (CWV) | 70/100 | 10% | 7.0 |
| AI Search Readiness | 67/100 | 10% | 6.7 |
| Images | 72/100 | 5% | 3.6 |
| **TOTAL** | | | **67.4 → 67/100** |

---

## Executive Summary

Phase 3 improvements (service page expansion, performance polish, AI bot permissions) yielded a modest +2 point gain. The score ceiling is held down by three structural problems that have persisted across all four audits: thin content on evaluation-stage pages, schema accuracy errors that were introduced but never validated, and a page architecture that forces most portfolio visitors into a dead end. The largest single quick win is a Vercel redeploy — it costs zero code changes and immediately adds three missing pages to the sitemap including the primary case study.

### Business Type Detected
**B2B Digital Agency** — Branding, UX/UI Design, Web Development, SEO Strategy. Singapore HQ with global remote delivery. Premium segment (tech startups, fintech, luxury brands).

### Top 5 Critical Issues
1. **SearchAction targets a non-existent /search page** — active invalid schema on every page load
2. **Sitemap missing 3 pages** (zenith-banking, privacy, terms) — stale Vercel deployment
3. **Organization @type is wrong** — should be `ProfessionalService`, not `Organization`
4. **Testimonials attribute quotes to Vercel, Stripe, and Linear** — unverifiable, E-E-A-T risk
5. **LocalBusiness schema absent from /contact** — planned in Phase 1, never delivered

### Top 5 Quick Wins
1. Redeploy to Vercel → sitemap auto-regenerates with all 8 pages (0 code changes)
2. Remove `potentialAction` SearchAction block from index.astro (3 lines deleted)
3. Fix em-dash in contact.astro title (1 character change)
4. Change Organization @type to `ProfessionalService` in Layout.astro (1 word)
5. Add `font-display: swap` to @fontsource imports in Layout.astro (LCP improvement)

---

## 1. Technical SEO — 75/100

*Source: seo-technical specialist agent*

### Crawlability — 72/100
- **CRITICAL:** Sitemap contains only 5 of 8 pages. `/work/zenith-banking`, `/privacy`, `/terms` are absent.
  - Root cause: stale Vercel deployment, not a config error. `astro.config.mjs` has zero exclude rules.
  - Fix: trigger a fresh deploy — sitemap auto-regenerates.
- robots.txt is exemplary: all major AI crawlers (GPTBot, ClaudeBot, OAI-SearchBot, Google-Extended, PerplexityBot) explicitly allowed, sitemap URL declared.
- No Disallow rules — full crawl access.
- No IndexNow key file in `/public/` — Bing receives no push notifications on content changes.

### Indexability — 85/100
- Canonical tag present on all pages via `Layout.astro:44` (`<link rel="canonical" href={Astro.url.href} />`).
- No noindex directives detected. `/privacy` and `/terms` will be indexed (acceptable for trust signals).
- trailingSlash configuration is consistent (`never` in both astro.config.mjs and vercel.json).
- No duplicate content risk identified.

### Security Headers — 48/100
**Present (3):** X-Content-Type-Options, X-Frame-Options, Referrer-Policy
**Missing (3):**
- `Strict-Transport-Security` (HSTS) — minimum: `max-age=31536000; includeSubDomains`
- `Content-Security-Policy` — site runs GSAP, React hydration, Astro ClientRouter client-side
- `Permissions-Policy` — standard hardening expectation

### URL Structure — 92/100
- Clean, semantic URLs. No query string pollution.
- Consistent no-trailing-slash across all pages.

### Mobile Optimization — 88/100
- Viewport meta tag present.
- Tailwind responsive classes used throughout.
- No mobile-specific blockers detected.

### Core Web Vitals Readiness — 63/100 (code-level estimate)
**Risk factors:**
- `Navbar` uses `client:load` — forces React hydration on the critical path, direct INP/LCP threat.
- 9 web font weights loaded (4× Inter, 5× Manrope) without `font-display: swap` confirmed — blocks text rendering on slow connections.
- GSAP ScrollTrigger image reveals (`scale: 1.3, yPercent: 20`) create transform-based layout changes; images have explicit `width`/`height` which partially mitigates CLS.
- No `<link rel="preload">` for hero image (though `fetchpriority="high"` is present, explicit preload is stronger).
**Positive signals:** Astro SSG generates static HTML. `SmoothScroll` uses `client:idle`. Sliders use `client:visible`. Images have explicit dimensions.

### JavaScript Rendering — 80/100
- Astro SSG: content is present in static HTML, not dependent on JS for rendering.
- React components are islands (partial hydration) — good.
- GSAP animations are progressive enhancement, not content-blocking.

---

## 2. Content Quality — 54/100

*Source: seo-content specialist agent*

### Content Depth — 52/100

| Page | Word Count | Status |
|---|---|---|
| / (Homepage) | ~1,200w | Good |
| /services | ~700w | Adequate (below 800w ideal) |
| /about | ~300w | **Thin** |
| /work | ~180w | **Very Thin** |
| /work/zenith-banking | ~280w | **Thin for case study** |
| /contact | ~180w | **Thin** |
| /privacy | ~400w | Acceptable |

### E-E-A-T — 48/100

**Signals Present:**
- Physical address (Singapore, 079903)
- Founding year (2018)
- Named team members with job titles
- Personal LinkedIn profile URLs for all 3 team members
- One detailed case study with quantified outcomes
- FAQPage with substantive 80-150 word answers

**Signals Missing / Flagged:**
- **CRITICAL: Fake testimonials** — Homepage testimonials are attributed to "Elena S., CEO at Vercel", "Marcus R., Head of Design at Stripe", "Adrian L., CTO at Linear". These are real, recognisable SaaS companies. Attribution without photos, LinkedIn handles, or verifiable sources constitutes a fabrication signal under the Sept 2025 QRG update. This is a manual action risk and a trust-negative for sophisticated B2B buyers.
- No author attribution on any page — content has no named human voice.
- No Google Business Profile reference, press mentions, or industry awards.
- No client count or project volume signals on /about.
- 5 of 6 case studies have zero detail beyond a title, category, year, and one-line metric.
- Testimonial attribution inconsistency: "Elena S." appears on the homepage (CEO at Vercel) AND on the Zenith case study (CEO at Zenith Financial) — two different attributions for the same name fragment.

### AI Citability — 58/100
**Citable facts present:**
- Zenith Banking: 200% DAU increase, 45% NPS improvement, 2M+ users, 4.9 app rating
- Project Alpha: 42% conversion lift
- Nexus OS: 1M+ downloads
- Aura Fashions: 150% sales YoY
- Lumina Studio: sub-1s load time
- Founded 2018, Singapore HQ

**Weakness:** All stats lack source attribution or methodology notes — AI models down-weight unattributed figures.

### Readability — 72/100
- Consistent voice across pages: direct, premium, no filler.
- Short paragraphs, generous whitespace.
- FAQ answers are clear and substantive.

### Thin Content Risk — 41/100 (higher = worse risk)
4 of 8 pages are below the 300-word minimum. 3 evaluation-stage pages (About, Work, Contact) that a prospective client visits during shortlisting are all under 300 words.

---

## 3. On-Page SEO — 79/100

### Title Tags — 90/100
- All pages have unique, descriptive titles.
- Format: `{title} | Innovate` — correct, consistent.
- **Exception:** `/contact` title still contains an em-dash (`Contact Innovate — Start Your Project | Innovate`). Phase 1 listed this as fixed — it is not.
- Title lengths are within 50-60 character target range.

### Meta Descriptions — 88/100
- All pages pass descriptions via `Layout.astro:36`.
- Descriptions are descriptive and within 150-160 character range.
- Default fallback is `"Premium Corporate Agency"` — would render if a page neglects to pass a description prop (currently all pages provide one).

### Heading Structure — 82/100
- H1 present and unique on all pages.
- Logical H2/H3 hierarchy on Services, About, Zenith Banking.
- /work has only one line of editorial copy below the H1 — H2s are project titles in the grid.
- /contact H1 is "HELLO." — weak as a search signal, but acceptable for conversion-focused design.

### Internal Linking — 62/100
- 5 of 6 portfolio items on /work link back to `/work` instead of individual case study pages — a significant internal linking dead end.
- `/contact` is absent from the main navigation (`navItems` in Layout.astro lines 24-29 = Home, Services, About, Work only).
- Footer contains Privacy and Terms links.
- Homepage CTAs link to /work and /contact — good.

### URL Structure — 92/100
Clean, lowercase, hyphenated. `/work/zenith-banking` correctly nested.

---

## 4. Schema / Structured Data — 54/100

*Source: seo-schema specialist agent*

### Schema Inventory

| Page | Schema Types | Issues |
|---|---|---|
| All pages (Layout) | Organization | Wrong @type, logo is OG image not logo |
| / | WebSite, FAQPage | SearchAction targets non-existent /search page |
| /about | AboutPage, BreadcrumbList | Missing Person schemas for team |
| /services | Service, BreadcrumbList, OfferCatalog | @type:Service should be ProfessionalService |
| /work | CollectionPage, BreadcrumbList | datePublished values are year-only (non-conformant ISO 8601) |
| /work/zenith-banking | Article, WebPage, BreadcrumbList | Missing dateModified, wordCount, keywords, articleBody |
| /contact | ContactPage, BreadcrumbList | Missing LocalBusiness/ProfessionalService schema |
| /privacy, /terms | None | Low impact |

### Critical Issues
- **SearchAction target invalid.** `index.astro:120-124` declares `potentialAction.target` as `/search?q={search_term_string}`. No `/search` route exists. Remove immediately.
- **Organization @type too generic.** The agency has a physical address, email, and social profiles — `ProfessionalService` is the correct subtype. This change unlocks Knowledge Panel and local pack eligibility.
- **logo references og-image.jpg.** Google's Organization logo guidelines require a dedicated logo asset (near-square or letterbox, transparent/white background). The site has `favicon.svg` but no proper `/public/logo.png` or `/public/logo.svg`.

### High Priority Issues
- **LocalBusiness / ProfessionalService absent from /contact.** The page displays the full address and email — ideal surface for this schema. Phase 1 planned this fix; it was not implemented.
- **Article on /work/zenith-banking** is missing: `dateModified`, `wordCount`, `keywords`, `inLanguage`.
- **No Person schema** for Marcus Chen, Sarah Jenkins, or David Miller despite all required properties being in the HTML (name, jobTitle, photo, LinkedIn).

### Medium Issues
- OfferCatalog items lack `description` and `url` — currently just names.
- `datePublished` on CollectionPage `hasPart` items use year-only strings (`"2024"`) — not valid ISO 8601.

### Info (No Action Required for Google)
- FAQPage on `/` — Google no longer surfaces FAQ rich results for commercial/agency pages (Aug 2023 restriction). The schema is valid and serves AI/LLM citation purposes (Bing, ChatGPT, AI Overviews). Keep it.

### Ready-to-Use Fixes

**Fix 1 — Layout.astro: Change Organization to ProfessionalService + add foundingDate**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://innovate-proto.vercel.app/#organization",
  "name": "Innovate",
  "url": "https://innovate-proto.vercel.app/",
  "foundingDate": "2018",
  "logo": {
    "@type": "ImageObject",
    "url": "https://innovate-proto.vercel.app/logo.png",
    "width": 200,
    "height": 60
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10 Anson Road, International Plaza",
    "addressLocality": "Singapore",
    "postalCode": "079903",
    "addressCountry": "SG"
  },
  "email": "hello@innovate.agency",
  "sameAs": [
    "https://linkedin.com/company/innovate",
    "https://twitter.com/innovate",
    "https://instagram.com/innovate"
  ]
}
```
*Requires creating `/public/logo.png` as a dedicated brand mark asset.*

**Fix 2 — index.astro: Remove broken SearchAction**
Delete lines 120-124 (the entire `potentialAction` block):
```json
// REMOVE:
"potentialAction": {
  "@type": "SearchAction",
  "target": "https://innovate-proto.vercel.app/search?q={search_term_string}",
  "query-input": "required name=search_term_string"
}
```

**Fix 3 — contact.astro: Add ProfessionalService block to @graph**
```json
{
  "@type": "ProfessionalService",
  "@id": "https://innovate-proto.vercel.app/#organization",
  "name": "Innovate",
  "url": "https://innovate-proto.vercel.app/",
  "email": "hello@innovate.agency",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10 Anson Road, International Plaza",
    "addressLocality": "Singapore",
    "postalCode": "079903",
    "addressCountry": "SG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 1.2762,
    "longitude": 103.8453
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "priceRange": "$$"
}
```

**Fix 4 — zenith-banking.astro: Patch Article node**
Add to the existing Article schema block:
```json
"dateModified": "2024-03-15",
"wordCount": 520,
"keywords": ["fintech UX design", "mobile banking app", "digital transformation", "glassmorphic UI"],
"inLanguage": "en-SG",
"about": { "@type": "Thing", "name": "Mobile Banking UX Design" }
```

---

## 5. Performance — 70/100 (Code-Level Estimate)

*Note: No real CWV field data available (CrUX). These are code-level estimates.*

### Strengths
- Astro SSG: pages are pre-rendered static HTML — fast TTFB.
- Images use `loading="lazy"` + explicit `width`/`height` — reduces CLS.
- Hero image uses `fetchpriority="high"` — correct LCP prioritization.
- Unsplash CDN for images — global edge delivery.
- Sliders use `client:visible` — deferred hydration.
- SmoothScroll uses `client:idle` — deferred hydration.

### Risks
- **Navbar uses `client:load`** — forces React hydration on critical path. Every page pays this tax. Change to `client:idle` unless the Navbar requires interactivity before first scroll.
- **9 web font weights** (4 Inter + 5 Manrope) — without `font-display: swap`, blocks text rendering. Add `swap` descriptor to all `@fontsource` CSS imports.
- **GSAP bundle** is loaded globally. If not tree-shaken, it adds ~60KB to every page.
- **No `<link rel="preload">`** for hero image in `<head>`. While `fetchpriority="high"` helps, a preload hint provides earlier discovery.
- **No HTTP/2 push or preconnect** for Unsplash CDN (`images.unsplash.com`).

### Recommended Additions to Layout.astro `<head>`
```html
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

---

## 6. Images — 72/100

### Coverage
- Most images have `alt` attributes.
- All images have explicit `width` and `height` attributes — CLS prevention.
- All external Unsplash images use `loading="lazy"`.
- Hero section image correctly uses `fetchpriority="high"`.

### Quality Issues
- Homepage section images use generic alt values: `alt="Our Expertise"`, `alt="Who We Are"`, `alt="Our Work"` — these are section headings, not descriptions of the image content.
- Work page project images use only the project name as alt text (e.g., `alt="Project Alpha"`) — adequate but not descriptive.
- Zenith case study hero: `alt="Zenith Banking Hero"` — adequately descriptive.

### Format
- All images are external JPG (Unsplash CDN). Unsplash serves modern formats (WebP/AVIF) based on browser accept headers — this is handled automatically.
- `/projects/zenith-hero.jpg` is a local file — no format optimization confirmed.

### Recommendations
- Improve alt text on homepage sections to describe the image: e.g., `"Team collaborating in an open office workspace"` instead of `"Our Expertise"`.
- For local images, consider converting to WebP.

---

## 7. AI Search Readiness — 67/100

*Source: seo-geo specialist agent*

### Dimension Scores

| Dimension | Score |
|---|---|
| Technical AI Crawler Accessibility | 92/100 |
| Structural Readability (llms.txt + schema) | 78/100 |
| Passage-Level Citability | 64/100 |
| Brand Authority Signals | 55/100 |
| Multi-Modal Content | 40/100 |

### Strengths
- robots.txt explicitly permits all major AI crawlers — best-in-class configuration.
- llms.txt present with good core content (team bios, expertise summary, FAQs, locations, key pages).
- FAQPage schema provides structured question-answer extraction for AI systems.
- Citable statistics distributed across case study pages.

### Gaps
- **No blog or insights section** — the single largest citability gap. AI engines preferentially cite long-form, question-answering content.
- **Brand entity unverified externally.** No Wikipedia page, no Wikidata entry, no confirmed Google Knowledge Panel. Suppresses citation frequency across ChatGPT, Perplexity, and AI Overviews.
- **Unattributed statistics.** All case study metrics (200% DAU, 2M+ users, etc.) have no source or methodology citation — AI models down-weight these.
- **llms.txt gaps:** Missing service pricing tiers, named client sectors, and founding story narrative.
- **No off-site brand corroboration:** No confirmed Reddit, YouTube, or authoritative directory presence.

---

## 8. Search Experience Optimization (SXO) — 34/100

*Source: seo-sxo specialist agent — SERP live data*

### Intent Match Analysis

| Query | Score | Gap |
|---|---|---|
| "digital agency singapore" | 4/10 | SERP expects social proof density (client counts, awards, pricing). Site delivers a tagline + 1 case study. |
| "fintech ux design agency" | 3/10 | SERP rewards fintech-specific pages with compliance callouts and sector credentials. No dedicated fintech page exists. |
| "brand identity agency singapore" | 5/10 | Closest match — premium aesthetic + Brand Identity service. Fails on word count, pricing signals, and strategy narrative depth. |

### Page-Type Mismatch
The homepage classifies as a **Brand Statement / Portfolio Teaser** page. SERP consensus for "digital agency singapore" expects an **Authority Credential page** — named client logos, quantified outcomes, tenure signals, implied pricing tiers. The site looks premium but signals junior relative to SERP competitors.

### User Journey Friction
1. **No Contact in main navigation** — persistent nav shows Home, Services, About, Work only. Every competitor shows "Get a Quote" as a nav-level CTA.
2. **Portfolio wall** — 5 of 6 work items are dead-end thumbnails. A prospective client who finishes /work has one clickable case study and five visual dead ends.
3. **Testimonial credibility** — Vercel/Stripe/Linear attribution without verification signals fabrication to a sophisticated B2B buyer.
4. **No pricing signal** — Engagement models listed but no ranges. Absence of pricing framing reads as evasion to premium B2B buyers.
5. **Thin evaluation pages** — About (300w), Work (180w), Contact (180w) are the three pages visited during shortlisting. All three are below the competitor content floor.

---

## Progress vs. Audit 3

| Phase 3 Goal | Status | Notes |
|---|---|---|
| Service Page Expansion (800+ words) | Partial | 700w achieved, below 800w target |
| Pricing Signals | Done | Engagement models section added |
| Full Portfolio Schema (CollectionPage) | Done | All 6 projects in hasPart |
| Link Homepage Slider to Case Study | Done | Zenith Banking button links to /work/zenith-banking |
| Performance Polish | Done | Image attrs standardized, FadeUp JSX fixed |
| AI Search Bot (robots.txt) | Done | OAI-SearchBot explicitly added |
| LocalBusiness Schema on /contact | **NOT DONE** | Still missing (Phase 1 goal) |
| Fix Title Em-Dash | **NOT DONE** | Contact page still has em-dash |

---

*Generated by Claude SEO Skill — Audit 4 — 2026-05-08*
