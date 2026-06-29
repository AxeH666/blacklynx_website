# audit1.md — Website Condition Audit

**Date:** 2026-06-29  
**Project path:** `/home/axehe/blacklynx_website`  
**Package name:** `blacklynx-website` (v0.1.0)

---

## 1. Executive Summary

This repo is a **Next.js 15 static marketing site** with **two generations of product branding coexisting in the codebase**, only one of which is live.

| Layer | Status |
|-------|--------|
| **Live site** | **Strike** — product landing for **Blackkrait Technologies** (Manipal, Karnataka) |
| **Legacy (unused)** | **BlackLynx / OpenForge** — full page of section components, not mounted |
| **Planned (docs only)** | **Jericho** — defined in `DESIGN.LAWS.md`, not implemented in UI yet |
| **Build** | ✅ `npm run build` succeeds (static export to `out/`) |
| **Tests** | ❌ `npm test` fails (test runner path misconfiguration) |
| **Waitlist** | ⚠️ UI-only on `/waitlist`; backend exists but is not wired and incompatible with static export |

The site is **functional as a static brochure** with an interactive demo (`StrikeDemo`), but has **brand fragmentation**, **dead code**, **broken test script**, **non-functional waitlist submission on production**, and **design drift** from the new Jericho constitution.

---

## 2. What Is Shown on the Website (Live Routes)

### `/` — Homepage (`app/page.tsx`)

Single self-contained page. No shared layout components from `components/sections/`.

**Header (sticky)**
- Logo: `/images/logo-head.png` + wordmark **STRIKE**
- Nav anchors: Product, How It Works, Pricing, GitHub (`https://github.com` — placeholder URL)
- CTA: **Request Early Access** → `/waitlist`

**Section: Hero / Product (`#product`)**
- H1: *Finds the exact bug. Never guesses.*
- Subcopy: stack trace → verified root cause + fix, under 5 seconds; India-only code; open-weight models; no vendor lock-in
- CTAs: Request Early Access, See How It Works
- Tagline: *Self-hosted · Privacy-first · Built for Indian engineering teams*
- Layout: left-aligned, asymmetric padding (`pl-[120px]`)

**Section: Interactive demo**
- `<StrikeDemo />` — animated IDE-style panel (see §4.2)

**Section: Trust strip**
- Centered mono uppercase: self-hosted, open-weight, no OpenAI, MIT Manipal research

**Section: How It Works (`#how`)**
- 3-step grid:
  1. Paste stack trace (`POST /debug`)
  2. Strike retrieves and verifies (`confidence_score · verified=true`)
  3. One-click patch (`POST /apply · POST /rollback`)

**Section: The Only Rule**
- *Only shows what it can prove.* — contrast vs hallucinating AI tools

**Section: Pricing (`#pricing`)**
- Self-Hosted Free: ₹0
- Hosted: ₹799/month (India-hosted, VS Code plugin)
- Enterprise: Custom

**Section: Final CTA**
- Centered: *Your next bug is already waiting. Strike finds it first.*
- Waitlist link

**Footer**
- © 2026 **BLACKKRAIT TECHNOLOGIES PVT. LTD. · MANIPAL, KARNATAKA**
- Links: Privacy (`#` placeholder), GitHub (placeholder), `contact@blackkrait.com`

**Metadata** (`app/layout.tsx`)
- Title: *Strike — Blackkrait Technologies*
- Description: stack trace / verified fix / under 5 seconds / code never leaves India
- Favicon: `./images/logo-head.png`

---

### `/waitlist/` — Early access form (`app/waitlist/page.tsx`)

- Client component with local React state only
- Fields: Name, Company, Email, Role (Engineer/Lead/CTO/Founder), Stack (Django/FastAPI/Other)
- On submit: sets `submitted=true` locally — **no API call, no persistence**
- Success message: *You're on the list. We'll reach out within 48 hours.* (misleading — nothing is stored)

---

### `/api/waitlist` — API route (`app/api/waitlist/route.ts`)

- POST accepts `{ email }`, validates via `lib/waitlist.ts`, delivers via `lib/waitlist-delivery.ts`
- **Not usable on Cloudflare Pages static export** — build marks it `ƒ (Dynamic)` but static hosting has no Node server
- Only consumed by legacy `components/sections/EarlyAccess.tsx` (unused)

---

## 3. Brand & Naming Inventory

Four names appear across the repo:

| Name | Where | Live? |
|------|-------|-------|
| **Strike** | `app/page.tsx`, `StrikeDemo.tsx`, metadata | ✅ Yes |
| **Blackkrait** | Footer, metadata, `contact@blackkrait.com` | ✅ Yes (legal entity) |
| **BlackLynx / OpenForge** | `components/sections/*`, tests, package name | ❌ Dead code |
| **Jericho** | `DESIGN.LAWS.md` only | 📋 Planned |

**Positioning conflict:**
- Live site: India-first, self-hosted, Django/Python, Strike product
- `DESIGN.LAWS.md`: global developers, Jericho, proof-not-guesses, OKLCH crimson system
- Legacy site: OpenForge AI assistant, cyan accent (`#00F5FF`), centered hero, BlackLynx platform roadmap

---

## 4. File-by-File Inventory

### 4.1 App layer (`app/`)

| File | Purpose | Used? |
|------|---------|-------|
| `app/layout.tsx` | Root layout; loads **Inter** + Geist Mono via `next/font`; global metadata | ✅ |
| `app/page.tsx` | Live Strike homepage (~237 lines, inline Tailwind/hex colors) | ✅ |
| `app/waitlist/page.tsx` | Waitlist form (client-only, no backend) | ✅ |
| `app/globals.css` | CSS vars (`--bg`, `--accent`, etc.), Inter body font, mono for `pre/code` | ✅ |
| `app/api/waitlist/route.ts` | Waitlist POST handler | ⚠️ Built but not deployable on static host |

### 4.2 Active components

| File | Lines | Purpose |
|------|-------|---------|
| `components/StrikeDemo.tsx` | ~1320 | Client-side product demo: 3-pane IDE mock (explorer, chat, code/diff). Cycles through 3 bug scenarios (`payments/views.py`, `services.py`, `serializers.py`). Phases: thinking → result → apply → success. Inline styles (not Tailwind). Uses Inter + Geist Mono CSS vars. Crimson accent `#C8102E`. Snake SVG animation during analysis. Auto-loops every 12s. |

**StrikeDemo scenario content:**
1. **payments/views.py** — Celery task fired before DB commit; fix with `transaction.on_commit`
2. **services.py** — Cache set before commit on payment; defer cache to `on_commit`
3. **serializers.py** — Audit log leaks password in payload; redact to email only

### 4.3 Legacy section components (NOT imported by live pages)

| File | Content summary | Issues if re-enabled |
|------|-----------------|----------------------|
| `components/sections/Nav.tsx` | BlackLynx nav, GSAP hide-on-scroll, mobile menu, links to OpenForge GitHub | `blacklynx-*` Tailwind tokens undefined; glassmorphism backdrop-blur |
| `components/sections/Hero.tsx` | Centered OpenForge hero, cyan glow orbs, tsparticles, GSAP reveal | Violates DESIGN.LAWS NEVER list; cyan not crimson |
| `components/sections/Product.tsx` | OpenForge feature list + animated Terminal | Colored left borders on cards |
| `components/sections/HowItWorks.tsx` | 3 icon-on-top steps, GSAP scroll | Icon-on-top card pattern |
| `components/sections/StatsBar.tsx` | Animated counters (<30s, 0 vulns, 50+ langs, 100% India) | — |
| `components/sections/Vision.tsx` | Roadmap: OpenForge → Security → BlackLynx Platform | Colored left borders on active card |
| `components/sections/WhyBlackLynx.tsx` | 3-column principles, centered heading | Centered hero pattern |
| `components/sections/EarlyAccess.tsx` | Email-only waitlist → `/api/waitlist` | Would fail on static deploy |
| `components/sections/Footer.tsx` | BlackLynx footer, `mohi@blacklynx.dev` | Wrong brand for live site |

### 4.4 Legacy UI primitives (used only by legacy sections)

| File | Purpose |
|------|---------|
| `components/ui/Button.tsx` | Primary/ghost button; references undefined `blacklynx-*` classes |
| `components/ui/Terminal.tsx` | GSAP typewriter OpenForge terminal demo |
| `components/ui/HeroParticles.tsx` | tsparticles cyan particle field on `#000000` background |

### 4.5 Library / backend helpers

| File | Purpose |
|------|---------|
| `lib/waitlist.ts` | Email normalize/validate, `buildWaitlistPayload()` with ISO timestamp |
| `lib/waitlist-delivery.ts` | Routes to Google Apps Script URL **or** SMTP via Nodemailer |
| `lib/sheets.ts` | POST payload to `WAITLIST_GOOGLE_APPS_SCRIPT_URL` |

**Env vars expected (from code):**
- `WAITLIST_GOOGLE_APPS_SCRIPT_URL` (optional — preferred path)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (fallback)
- `WAITLIST_TO_EMAIL`, `WAITLIST_FROM_EMAIL` (optional overrides)

**`.env.local` present:** SMTP_* vars configured (values not audited). No Google Apps Script URL detected in env key list.

### 4.6 Tests

| File | Purpose | Status |
|------|---------|--------|
| `tests/waitlist.test.ts` | Unit tests for email normalization/validation | ❌ Never runs — see §6 |
| `tsconfig.test.json` | Compiles lib + tests to `.test-dist/` | Misconfigured runner |

### 4.7 Config & deployment

| File | Content |
|------|---------|
| `next.config.mjs` | `output: 'export'`, `trailingSlash: true`, `reactStrictMode: true` |
| `tailwind.config.ts` | Scans `app/` + `components/`; defines `strike.*` color tokens + Inter/Geist Mono fonts |
| `postcss.config.mjs` | Standard PostCSS pipeline |
| `tsconfig.json` | Strict TypeScript, `@/*` path alias |
| `.eslintrc.json` | Extends `next/core-web-vitals` |
| `public/_headers` | `X-Robots-Tag: noindex` (site hidden from search engines) |
| `public/_routes.json` | Cloudflare Pages routing (`exclude: ["/cache/*"]`) |
| `.cfignore` | Excludes `cache/` |
| `.cloudflare-pages-exclude` | Excludes `.next/cache` |
| `.gitignore` | node_modules, .next, out, .env*, .test-dist |

### 4.8 Design constitution

| File | Content |
|------|---------|
| `DESIGN.LAWS.md` | Jericho brand rules: OKLCH palette, Geist typography, motion tokens, single R3F hero, performance gates, NEVER list. **Not reflected in live UI.** |

### 4.9 Public assets (`public/`)

| Asset | Size (approx) | Referenced by |
|-------|---------------|---------------|
| `images/logo-head.png` | 2.2 MB | Live homepage header, favicon |
| `images/hero-snake.png` | 1.4 MB | Not referenced in live code |
| `logo.png` | 890 KB | Legacy Footer/Hero only |
| `images/strike_plugin_clean_animated.html` | 13 KB | Saved standalone HTML mockup; not embedded in Next app |

**Note:** `logo-head.png` at 2.2 MB is oversized for LCP; no `next/image` optimization on homepage (uses raw `<img>`).

---

## 5. Tech Stack (Actual vs Declared)

### Declared in `package.json`

| Category | Packages |
|----------|----------|
| Framework | next ^15.5.15, react ^18.3.1 |
| Styling | tailwindcss ^3.4.17, autoprefixer, postcss |
| Motion | gsap ^3.12.7, framer-motion ^11.18.2 |
| 3D | @react-three/fiber, @react-three/drei, three — **installed, zero imports in source** |
| Particles | @tsparticles/* — **used only in dead HeroParticles** |
| Email | nodemailer ^8.0.7 |
| Tooling | typescript ^5.7.3, eslint, eslint-config-next |

### Actually used on live site

- Next.js App Router, React, TypeScript
- Tailwind (minimal — homepage mostly inline hex classes)
- Inline CSS in StrikeDemo
- Inter (layout) + Geist Mono (code) via `next/font`
- **No GSAP, Framer Motion, R3F, or tsparticles on live routes**

---

## 6. Build, Test & Deploy Status

### Build (`npm run build`) — ✅ Pass

```
Route (app)                    Size    First Load JS
┌ ○ /                         10.9 kB   113 kB
├ ○ /_not-found               993 B     103 kB
├ ƒ /api/waitlist             123 B     102 kB   ← dynamic, won't run on static host
└ ○ /waitlist                 920 B     103 kB
```

Output: `out/` with `index.html`, `waitlist/index.html`, static assets.

### Tests (`npm test`) — ❌ Fail

```
Error: Cannot find module '.test-dist/tests'
```

**Root cause:** `tsc -p tsconfig.test.json` emits `tests/waitlist.test.js` under `.test-dist/tests/`, but the script runs `node --test .test-dist/tests` (expects a directory or index file). Should be `node --test .test-dist/tests/**/*.test.js` or similar.

### Deployment target

- **Cloudflare Pages** (inferred from `_routes.json`, `_headers`, `.cfignore`)
- Static export — no serverless functions configured for waitlist API
- **`X-Robots-Tag: noindex`** — site deliberately excluded from indexing

---

## 7. Design System Condition

### Live Strike page

| Aspect | Current state | vs DESIGN.LAWS.md |
|--------|---------------|-------------------|
| Font | **Inter** (body) + Geist Mono | ❌ Inter forbidden; wants Geist display |
| Colors | Hex: `#080808`, `#C8102E`, `#F0F0F0`, etc. | ❌ Should be OKLCH tokens |
| Hero | Left-aligned ✅ | Aligns with laws |
| Accent | Crimson `#C8102E` ✅ | Concept aligns; token system missing |
| Pure black/white | Uses `#080808` / `#F0F0F0` (not pure) ✅ | Mostly OK |
| Centered sections | Final CTA + trust strip centered | ⚠️ Partial violation |
| 3D hero | None | Jericho plan calls for one R3F lock-on |
| Motion | StrikeDemo inline animations | No reduced-motion gating |
| Pricing card | `border-t-2 border-t-[#C8102E]` on Hosted tier | ⚠️ Colored top border (NEVER list) |
| StrikeDemo | Soft box-shadows, colored left border on bug line | ⚠️ Multiple NEVER violations |
| Spacing | Arbitrary values (`pl-[120px]`, `pt-[142px]`) | ❌ Not on 8px scale |

### Legacy BlackLynx components

Would fail almost every DESIGN.LAWS rule: Inter-adjacent patterns, centered hero, cyan accent, glassmorphism, icon-on-top cards, gradient blobs, tsparticles decoration.

### Tailwind token gap

Legacy components reference `blacklynx-bg`, `blacklynx-accent`, `blacklynx-border`, etc. **`tailwind.config.ts` only defines `strike.*` colors.** Legacy CSS utility classes (`section-shell`, `heading-tight`, `grid-bg`, `font-heading`) are **missing from `globals.css`**. Re-mounting legacy sections would render largely unstyled.

---

## 8. Functional Gaps & Risks

| Issue | Severity | Detail |
|-------|----------|--------|
| Waitlist doesn't persist | **High** | `/waitlist` fakes success; no data captured |
| API route vs static export | **High** | `/api/waitlist` cannot run on Cloudflare static deploy |
| Brand confusion | **Medium** | Strike / Blackkrait / BlackLynx / Jericho / OpenForge |
| Dead code volume | **Medium** | ~10 section components + 3 UI primitives unused |
| Unused npm deps | **Medium** | R3F, drei, three, tsparticles (~heavy) not imported |
| Test suite broken | **Medium** | CI would fail if tests are gated |
| SEO blocked | **Low (intentional?)** | `noindex` header |
| Placeholder links | **Low** | GitHub → `https://github.com`, Privacy → `#` |
| Logo LCP | **Low** | 2.2 MB PNG, unoptimized `<img>` |
| ESLint warning | **Low** | `@next/next/no-img-element` on homepage logo |

---

## 9. Dependency Graph (What Imports What)

```
app/layout.tsx
  └── app/globals.css

app/page.tsx
  └── components/StrikeDemo.tsx  (only active component import)

app/waitlist/page.tsx
  └── (standalone, no shared components)

app/api/waitlist/route.ts
  ├── lib/waitlist-delivery.ts
  │     ├── lib/sheets.ts
  │     └── nodemailer
  └── lib/waitlist.ts

[ORPHANED — nothing imports these]
components/sections/{Nav,Hero,Product,HowItWorks,StatsBar,Vision,WhyBlackLynx,EarlyAccess,Footer}.tsx
components/ui/{Button,Terminal,HeroParticles}.tsx
```

---

## 10. Content Matrix (Messaging on Live Site)

| Topic | Message |
|-------|---------|
| Product name | Strike |
| Company | Blackkrait Technologies Pvt. Ltd. |
| Core promise | Exact bug, never guesses; verified fix from real code |
| Speed | Under 5 seconds |
| Privacy | Code never leaves India / your server |
| Models | Open-weight only, no OpenAI, no vendor lock-in |
| Audience | Indian engineering teams (waitlist copy) |
| Stack focus | Django / Python (demo + waitlist form) |
| Research | MIT Manipal |
| Pricing | ₹0 self-hosted, ₹799/mo hosted, custom enterprise |
| Contact | contact@blackkrait.com |

---

## 11. Recommended Next Steps (Audit Only — Not Implemented)

1. **Pick one product name** (Strike → Jericho rebrand per `DESIGN.LAWS.md`, or keep Strike) and delete or archive legacy BlackLynx sections.
2. **Wire waitlist** to Google Apps Script or Cloudflare Function; remove fake success state.
3. **Remove or code-split** unused deps (R3F, tsparticles) until Jericho hero is built.
4. **Fix `npm test`** runner path.
5. **Implement DESIGN.LAWS tokens** in Tailwind/globals before new UI work.
6. **Optimize logo-head.png** and switch to `next/image`.
7. **Replace placeholder URLs** (GitHub, Privacy policy).
8. **Decide on `noindex`** — remove when ready to launch publicly.

---

## 12. Quick Reference — Route → File Map

| URL | File | Renders |
|-----|------|---------|
| `/` | `app/page.tsx` | Strike marketing homepage + StrikeDemo |
| `/waitlist/` | `app/waitlist/page.tsx` | Early access form (no backend) |
| `/api/waitlist` | `app/api/waitlist/route.ts` | POST handler (non-functional on static deploy) |
| N/A | `components/sections/*` | Legacy BlackLynx/OpenForge page (dormant) |

---

*End of audit1.*
