# SEO Action Plan — Innovate Digital Agency
**Audit 4 — 2026-05-08 | Score: 67/100 | Target: 78/100**

Completing all Critical + High items should yield approximately **+8 to +11 points**.
Completing all Medium items adds approximately **+4 to +6 points** more.

---

## CRITICAL — Fix Immediately

These are active errors or trust risks. Each day they persist has a compounding cost.

---

### C1. Remove broken SearchAction from WebSite schema
**File:** [src/pages/index.astro](src/pages/index.astro#L120-L124)
**Impact:** Invalid structured data on every page (the `#website` schema is global). Google won't award Sitelinks Searchbox for a broken endpoint and may discount other schema on the page.
**Fix:** Delete the entire `potentialAction` block (lines 120-124):
```diff
- "potentialAction": {
-   "@type": "SearchAction",
-   "target": "https://innovate-proto.vercel.app/search?q={search_term_string}",
-   "query-input": "required name=search_term_string"
- }
```
**Effort:** 5 minutes | **Expected gain:** +2 schema score points

---

### C2. Fix testimonial attribution
**File:** [src/pages/index.astro](src/pages/index.astro#L42-L61)
**Impact:** Homepage testimonials attributed to "Elena S., CEO at Vercel", "Marcus R., Head of Design at Stripe", "Adrian L., CTO at Linear" — unverifiable, E-E-A-T risk, potential manual action trigger under Sept 2025 QRG.
**Fix options (in order of preference):**
1. Replace with real client quotes from actual clients, with photo + company logo
2. Use anonymised but realistic attributions: "Head of Product, Singapore Fintech Startup"
3. Remove testimonials section entirely until real quotes are available
**Effort:** 30-60 minutes | **Expected gain:** +3-5 E-E-A-T / Content score points

---

### C3. Redeploy to Vercel (sitemap fix — zero code changes)
**Impact:** Sitemap currently missing `/work/zenith-banking`, `/privacy`, `/terms`. The primary case study won't be discovered via sitemap. Root cause is a stale deployment — no config changes needed.
**Fix:** Trigger any Vercel deployment (push any commit or use Vercel dashboard "Redeploy").
**Verify after:** `https://innovate-proto.vercel.app/sitemap.xml` should show 8 URLs.
**Effort:** 2 minutes | **Expected gain:** +5 sitemap / crawlability score points

---

## HIGH — Fix Within 1 Week

---

### H1. Change Organization @type to ProfessionalService + add foundingDate
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro#L62-L87)
**Impact:** `@type: Organization` is too generic for an entity with a physical address and professional services. `ProfessionalService` unlocks Knowledge Panel eligibility and local pack signals.
**Fix:** Replace the entire JSON-LD block in the `<head>` script:
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
**Also required:** Create `/public/logo.png` — a clean brand mark (200×60px, transparent or white background). Do NOT use og-image.jpg as the logo.
**Effort:** 20 minutes | **Expected gain:** +2 schema points, Knowledge Panel signal

---

### H2. Add ProfessionalService/LocalBusiness schema to /contact
**File:** [src/pages/contact.astro](src/pages/contact.astro#L11-L44)
**Impact:** The page has full address + email but no LocalBusiness schema. This was a Phase 1 planned fix that was never delivered. Adds local pack eligibility signal.
**Fix:** Add a third node to the `@graph` array (copy from FULL-AUDIT-REPORT.md Section 4, Fix 3).
Includes: `@type: ProfessionalService`, `@id` pointing to `#organization`, `address`, `geo` coordinates, `openingHoursSpecification`, `priceRange`.
**Effort:** 15 minutes | **Expected gain:** +2-3 schema points, local signal

---

### H3. Fix Contact page title em-dash
**File:** [src/pages/contact.astro](src/pages/contact.astro#L7)
**Impact:** Phase 1 listed this as fixed — it is not. Non-ASCII characters can cause SERP rendering inconsistencies.
**Fix:**
```diff
- title="Contact Innovate — Start Your Project"
+ title="Contact Innovate - Start Your Project"
```
**Effort:** 1 minute

---

### H4. Add Contact to main navigation
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro#L24-L29)
**Impact:** Contact is absent from the persistent nav. Every SERP competitor shows "Get a Quote" or "Contact" at nav level. This is a direct conversion path gap.
**Fix:** Add Contact to `navItems`:
```diff
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
+ { name: 'Contact', href: '/contact' },
];
```
Note: Depending on the Navbar component's rendering, you may also want to style Contact as a button/CTA rather than a plain link.
**Effort:** 5 minutes | **Expected gain:** +2-3 conversion rate points

---

### H5. Change Navbar from `client:load` to `client:idle`
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro#L92)
**Impact:** `client:load` forces React hydration on the critical path for every page — direct LCP and INP threat.
**Fix:**
```diff
- <Navbar client:load />
+ <Navbar client:idle />
```
**Caveat:** Test on mobile to ensure the Navbar is interactive before first scroll/interaction. If the Navbar has a scroll-dependent state (e.g., background color change on scroll), `client:idle` is safe. If it requires immediate click interaction above the fold, keep `client:load`.
**Effort:** 5 minutes (+ testing)

---

### H6. Add `font-display: swap` to web font loading
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro#L1-L10)
**Impact:** 9 web font weights loaded without swap declaration blocks text rendering on slow connections, harming LCP.
**Fix:** Each `@fontsource` import should use a swap variant. Example:
```diff
- import '@fontsource/inter/300.css';
+ import '@fontsource/inter/variable.css'; // variable fonts load 1 file instead of 4
```
Or if staying with static weights, ensure the CSS from @fontsource includes `font-display: swap`. Check by inspecting the imported CSS in `node_modules/@fontsource/inter/300.css` — if it lacks `font-display: swap`, override it in `src/styles/global.css`:
```css
@font-face {
  font-display: swap;
}
```
**Effort:** 15-30 minutes

---

### H7. Add security headers (HSTS, CSP, Permissions-Policy)
**File:** [vercel.json](vercel.json)
**Impact:** Only 3 of 6 standard security headers present. Missing headers affect Chrome's security score and Google's trust signals.
**Fix:** Add to the headers array:
```json
{ "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
{ "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; font-src 'self' data:" }
```
**Note:** The CSP above is a starting point. Test thoroughly — GSAP and React may require `unsafe-eval`. Tighten gradually.
**Effort:** 30 minutes (+ CSP tuning)

---

### H8. Expand /about page to 600+ words
**File:** [src/pages/about.astro](src/pages/about.astro)
**Impact:** Currently ~300 words. Evaluation-stage page visited by every serious prospect. SERP competitors average 800-1,200 words on About pages with founding story and credentials.
**Add:**
- Founding story narrative: why Innovate was started, what gap it fills
- Client count or project volume: "50+ projects delivered", "clients across 12 countries"
- Specific technologies/tools the team specialises in
- Awards, recognition, or publication mentions (if any)
- A culture/working style section
**Effort:** 2-3 hours (content writing)

---

### H9. Patch Article schema on /work/zenith-banking
**File:** [src/pages/work/zenith-banking.astro](src/pages/work/zenith-banking.astro#L16-L25)
**Fix:** Add to the Article node:
```json
"dateModified": "2024-03-15",
"wordCount": 520,
"keywords": ["fintech UX design", "mobile banking app", "digital transformation", "glassmorphic UI"],
"inLanguage": "en-SG"
```
**Effort:** 10 minutes

---

## MEDIUM — Fix Within 1 Month

---

### M1. Add individual case study pages for remaining 5 portfolio projects
**Impact:** 5 of 6 portfolio items link back to `/work` — a dead end. Each project deserves a 400-600 word page with: client context, problem statement, approach, outcomes, and one client quote.
**Pages to create:**
- `/work/project-alpha` (Branding / 2024 / 42% conversion lift)
- `/work/lumina-studio` (Web Development / 2023 / Sub-1s load time)
- `/work/aura-fashions` (E-Commerce / 2023 / 150% sales YoY)
- `/work/nexus-os` (UI/UX Design / 2023 / 1M+ downloads)
- `/work/void-records` (Visual Identity / 2022 / Global Launch)

**For each page, add:** Article schema, BreadcrumbList, links from /work grid, links from homepage slider.
**Expected gain:** +4-6 content score points, +3-4 internal linking points

---

### M2. Add Person schema for team members
**File:** [src/pages/about.astro](src/pages/about.astro#L91-L108)
**Impact:** All required data is already in the HTML (name, jobTitle, photo URL, LinkedIn). Add structured data:
```json
{
  "@type": "Person",
  "@id": "https://innovate-proto.vercel.app/about#marcus-chen",
  "name": "Marcus Chen",
  "jobTitle": "Founder & Technical Director",
  "image": "https://images.unsplash.com/photo-1560250097...",
  "sameAs": "https://linkedin.com/in/marcus-chen-innovate",
  "worksFor": { "@id": "https://innovate-proto.vercel.app/#organization" }
}
```
Repeat for Sarah Jenkins and David Miller.
**Effort:** 30 minutes

---

### M3. Expand /work page with editorial context
**File:** [src/pages/work.astro](src/pages/work.astro)
**Impact:** Currently ~180 words. Add a paragraph below the H1 that describes the agency's approach to client work, industries served, and what makes the portfolio distinctive. Aim for 300-400 total words.
**Effort:** 30 minutes

---

### M4. Add `datePublished` ISO 8601 dates to CollectionPage hasPart items
**File:** [src/pages/work.astro](src/pages/work.astro#L63-L75)
**Fix:** Replace year-only strings with full dates:
```diff
- "datePublished": "2024"
+ "datePublished": "2024-01-01"
```
**Effort:** 5 minutes

---

### M5. Improve image alt text quality on homepage sections
**File:** [src/pages/index.astro](src/pages/index.astro#L196)
**Impact:** Section images use `alt={section.title}` — e.g., `alt="Our Expertise"`. These describe the section heading, not the image content.
**Fix:** Hardcode descriptive alts for each section image:
- "Our Expertise" image → `"Team working at modern open-plan office desks"`
- "Who We Are" image → `"Creative team collaborating on a digital project"`
- "Our Work" image → `"Design wireframes and project planning on a whiteboard"`
**Effort:** 10 minutes

---

### M6. Add preconnect hints for Unsplash CDN
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro) — inside `<head>`
**Fix:**
```html
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```
**Effort:** 5 minutes

---

### M7. Add IndexNow key for Bing push notifications
**Action:** Generate an IndexNow key at https://www.indexnow.org/documentation, place the key file in `/public/`, add the key URL to `robots.txt`.
**Effort:** 20 minutes

---

### M8. Expand OfferCatalog with descriptions and URLs
**File:** [src/pages/services.astro](src/pages/services.astro#L68-L99)
**Fix:** Each of the 4 Offer items already has a `description` and features in the `services` data array — add these to the schema.
**Effort:** 15 minutes

---

### M9. Expand llms.txt with client verticals, founding story, and project briefs
**File:** [public/llms.txt](public/llms.txt)
**Add:**
- Client verticals: fintech, SaaS, luxury lifestyle, e-commerce
- Founding story narrative (2-3 sentences)
- 2-3 sample project brief summaries
- Typical project outcomes/metrics

---

## LOW — Backlog

---

### L1. Create a dedicated `/public/logo.png` brand mark
Required by Fix H1 (Organization schema logo). A clean 200×60px PNG on white/transparent background.

### L2. Launch an Insights/Blog section
The GEO agent identified this as the single largest citability gap. Even 3-4 evergreen articles per year targeting "brand agency singapore", "fintech UX design" would meaningfully improve AI citation frequency.

### L3. Create a sector-specific landing page (e.g., /services/fintech)
SXO agent identified this as the highest-leverage SEO move available — a `/services/fintech` page targeting "fintech ux design agency singapore" with Zenith Banking proof and compliance-aware language.

### L4. Seek external brand verification
Create a Wikipedia / Wikidata entity for the agency. Submit to Singapore business directories (e.g., Clutch, GoodFirms). These off-site signals drive AI citation frequency.

### L5. Add methodology notes to case study statistics
A single line per stat: "Based on app analytics data, 6 months post-launch." This prevents AI down-weighting of unattributed figures.

### L6. Add `twitter:site` and `twitter:creator` meta tags
**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro#L54-L58)
Replace `twitter:url` with `twitter:site` and add `twitter:creator`.

### L7. Add PNG/ICO favicon fallback
Currently only `favicon.svg`. Add `<link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />` for broad browser compatibility.

### L8. Use variable fonts to reduce font requests
Replace 9 static @fontsource weight files with `@fontsource-variable/inter` and `@fontsource-variable/manrope`. Reduces font payload from 9 requests to 2.

---

## Score Projection

| Phase | Actions | Estimated Score |
|---|---|---|
| Current (Audit 4) | — | **67/100** |
| After Critical fixes (C1-C3) | Remove SearchAction, fix testimonials, redeploy | **~71/100** |
| After High fixes (H1-H9) | Schema type, LocalBusiness, nav, performance | **~77/100** |
| After Medium fixes (M1-M9) | Case study pages, Person schema, content | **~82/100** |
| After Low fixes (L1-L8) | Blog, sector pages, brand entity | **~86/100** |

---

## Phase 4 Checklist Update

Based on this audit, the following items should be added to the SEO-PLAN.md Phase 4 backlog:
- [ ] Launch Insights/Blog section (L2)
- [ ] Build /services/fintech landing page (L3)
- [ ] Seek external brand verification (Clutch, GoodFirms, Wikidata) (L4)
- [ ] Add 5 remaining case study pages (M1) — elevate to Phase 4 priority
- [ ] Verify and update fake testimonials (C2) — elevate to immediate action

---

*Generated by Claude SEO Skill — Audit 4 — 2026-05-08*
