# SEO Implementation Roadmap: Innovate Digital Agency

This roadmap outlines the strategic phases to improve the SEO health and AI search readiness of the Innovate Digital Agency prototype (`innovate-proto.vercel.app`). It is based on the findings from **SEO Audit 3 (May 2026)**.

## Current Status: Audit 3 (May 2026)
- **Overall SEO Score:** 65/100 (+7 pts from Audit 2)
- **Top Priority:** Critical trust fixes, schema restoration, and content depth.

---

## Phase 1: Foundation (Sprint 1 — High Priority)
**Goal:** Resolve critical blockers, fix broken functionality, and restore lost schema signals.
**Target Score:** ~72/100

### Technical & Trust Fixes
- [x] **Upload Social Image:** Created and uploaded `public/og-image.jpg`. Resolved social share 404s.
- [x] **Legal Compliance:** Created `/privacy` and `/terms` pages. Resolved footer 404 links.
- [x] **Functional Form:** Added name attributes and POST method to the contact form in `src/pages/contact.astro`.
- [x] **Trailing Slash Alignment:** Configured `trailingSlash: 'never'` in `astro.config.mjs` and `vercel.json`.
- [x] **Security Headers:** Verified and updated `vercel.json` with core security headers.

### Schema & Metadata
- [x] **Restore WebSite Schema:** Added `potentialAction` (SearchAction) to `index.astro`.
- [x] **Restore LocalBusiness Schema:** Added `LocalBusiness` schema to `/contact` with Singapore address.
- [x] **Fix Address Contradiction:** Aligned Singapore address across all pages and schema.
- [x] **Fix Testimonial Collision:** Renamed testimonial authors in `index.astro` to avoid conflict with team bios.
- [x] **Fix Title Encoding:** Replaced em-dashes with hyphens in page titles.

---

## Phase 2: Expansion (Sprint 2 — Content & E-E-A-T) ✅ COMPLETED
**Goal:** Build authority signals, improve content depth, and apply proper entity cross-referencing.

### E-E-A-T & Content
- [x] **Individual LinkedIn Profiles:** Updated LinkedIn links on `/about` to point to personal profiles for Marcus, Sarah, and David.
- [x] **Case Study Launch:** Created the detailed `Zenith Banking` case study page with challenge, solution, and measurable results.
- [x] **Expand FAQ Content:** Increased FAQ answers to 100+ words to improve AI citation probability (Done on Homepage).
- [x] **Update llms.txt:** Expanded `public/llms.txt` with team bios, FAQs, and location details for AI crawlers.

### Advanced Schema
- [x] **Entity Linking:** Applied global `@id` cross-references (`#organization`) across all pages via `Layout.astro`.
- [x] **BreadcrumbList:** Implemented `BreadcrumbList` schema across Home, About, Services, Work, and Contact pages.
- [x] **Logo Schema:** Updated `Organization.logo.url` to point to the high-quality `og-image.jpg`.

---

## Phase 3: Scale (Sprint 3 — Depth & Authority)
**Goal:** Reach production-ready SEO levels and establish industry authority.
**Target Score:** ~90/100

### Content Deepening
- [ ] **Service Page Expansion:** Expand `/services` content to 800+ words, adding "How We Work" and per-service process details.
- [ ] **Pricing Signals:** Add pricing brackets or "book a call" CTAs to the services page to address user search intent.
- [ ] **Full Portfolio Schema:** Add all 6 projects to the `CollectionPage` schema on `/work`.
- [ ] **Link Homepage Slider:** Connect homepage "View Case Study" buttons to the new detailed case study pages.

### Performance & GEO
- [ ] **Performance Polish:** Eliminate `fetchpriority` / `loading="lazy"` conflicts and ensure all images have proper width/height.
- [ ] **AI Search Bot:** Explicitly add `OAI-SearchBot` to `robots.txt` for live ChatGPT search optimization.

---

## Phase 4: Authority (Long-term)
**Goal:** Maintain top-tier rankings and establish thought leadership.

- [ ] **Thought Leadership:** Launch an insights/blog section with monthly deep-dives on design and tech.
- [ ] **Link Acquisition:** Secure mentions in industry publications and partner directories.
- [ ] **Video SEO:** Implement `VideoObject` schema if video case studies are added.
- [ ] **Continuous Monitoring:** Use `/seo drift` to monitor changes and prevent regressions.

---

## Maintenance & Monitoring
- **Tools:** Claude SEO Skill, Google Search Console, Vercel Analytics.
- **Cadence:** Run `/seo audit` after every major content update or deployment.
