# round1_imple_plan.md — Hub-and-Spoke Restructure

**Status:** PLAN ONLY. Nothing implemented. Approve before execution.
**Date:** 2026-06-29
**Governing doc:** `DESIGN.LAWS.md` (read; all rules below comply)

---

## 0. Target Architecture

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Hub — overall promise + two doorways (Debugging, Security) |
| `/debugging` | `app/debugging/page.tsx` | Debugging world + pipeline deep-dive |
| `/security` | `app/security/page.tsx` | Security world (reachability story) |
| `/self-hosted` | `app/self-hosted/page.tsx` | Air-gapped / regulated / enterprise |
| `/pricing` | `app/pricing/page.tsx` | Pricing (3 tiers) |
| `/waitlist` | `app/waitlist/page.tsx` | Request access (EXISTS — untouched) |

Nav on every spoke + hub. `/waitlist` keeps its standalone full-screen form (no Nav), as today.

---

## 1. Current State (verified)

**`app/`:** `layout.tsx`, `page.tsx` (hub skeleton), `waitlist/page.tsx`, `api/waitlist/route.ts`

**`components/sections/`:** `Nav.tsx`, `Hero.tsx`, `Demo.tsx`, `HowItWorks.tsx`, `Security.tsx`, `Proof.tsx`, `Pricing.tsx`, `Footer.tsx`

**`components/`:** `StrikeDemo.tsx` (reference only, not mounted)

Current `app/page.tsx` stacks: Nav → Hero → Demo → HowItWorks → Security → Proof → Pricing → Footer.

---

## 2. Component Disposition (delete vs move vs keep vs new)

| Component | Action | Where it lives after |
|-----------|--------|----------------------|
| `Nav.tsx` | **Modify** | Add 5 routes + active-route marking → becomes `"use client"` (needs `usePathname`) |
| `Footer.tsx` | **Modify (minor)** | Update footer links to real routes (`/debugging`, `/security`, `/self-hosted`, `/pricing`) instead of in-page anchors |
| `Hero.tsx` | **Keep** | Hub homepage only (overall Jericho promise) |
| `Proof.tsx` | **Keep / reuse** | Hub + reused on `/debugging` |
| `HowItWorks.tsx` | **MOVE** | Off hub → reused on `/debugging` (this *is* the pipeline deep-dive) |
| `Security.tsx` | **MOVE** | Off hub → reused on `/security` |
| `Pricing.tsx` | **MOVE** | Off hub → reused on `/pricing` |
| `Demo.tsx` | **Keep / reuse** | Off hub → reused on `/debugging` and `/security` as placeholder |
| `StrikeDemo.tsx` | **Untouched** | Reference only |
| `Doorways.tsx` | **NEW** | Hub — two equal blocks (Debugging, Security) |
| `PricingTeaser.tsx` | **NEW** (or inline) | Hub — one line + "See pricing →" |

**Net deletions: 0 component files.** Everything currently on the hub is either kept or moved to a spoke. `Demo`, `HowItWorks`, `Security`, `Pricing` are *removed from the hub stack* but *reused on spoke pages*, so per the task's rule ("KEEP any you reuse inside spoke pages") they are **moved, not deleted**.

> Decision flag: the prompt's step 7 anticipated possibly deleting `Demo/HowItWorks/Security/Pricing`. My recommendation is to **reuse all four on spokes** rather than delete + reinline, to avoid duplicating copy. If you'd rather each spoke own its sections inline (no shared section components), say so — that's the alternative in §7.

---

## 3. Hub — `app/page.tsx` (rewrite)

Order:
1. `<Nav />`
2. `<Hero />` — existing; overall promise. Keep its commented 3D canvas mount placeholder.
3. `<Doorways />` — NEW
4. `<Proof />` — shared philosophy
5. Pricing teaser — `<PricingTeaser />` or inline block
6. `<Footer />`

### `<Doorways />` spec (NEW `components/sections/Doorways.tsx`, RSC)
- Two side-by-side `<article>` blocks in `md:grid-cols-2`, **equal visual weight**.
- Plain bordered: `border border-surface-2 bg-surface-1 p-space-5`. No icon-on-top, no glassmorphism, no colored borders.
- Block 1 — Debugging:
  - Title: "Debugging"
  - Promise: "Find the exact bug. Prove the fix."
  - Sub: "Paste a stack trace. Jericho retrieves the real function, verifies the fix, and runs your tests before it shows you anything."
  - Link: `Link href="/debugging"` → "Enter debugging →"
- Block 2 — Security:
  - Title: "Security"
  - Promise: "Know which vulnerabilities actually reach your code."
  - Sub: "Reachability-aware scanning in the same plugin. It separates exploitable paths from noise."
  - Link: `Link href="/security"` → "Enter security →"

### Pricing teaser
- One line: "Solo, team, or fully self-hosted. Straightforward pricing, no per-token billing."
- `Link href="/pricing"` → "See pricing →"

---

## 4. `/debugging` — `app/debugging/page.tsx` (NEW, RSC)

Structure: `<Nav />` → `<main>` sections → `<Footer />`

1. **Debugging hero** (new inline section or `DebuggingHero`):
   - H1: "Finds the exact bug. Proves the fix."
   - Sub: retrieve → verify → run tests promise.
   - Primary CTA `Link /waitlist` "Request access"; ghost `<a href="#pipeline">` "See the pipeline".
   - **Clearly-commented 3D canvas mount placeholder** (per DESIGN.LAWS §3D: SSR'd headline/CTA, canvas lazy-mounts later).
2. **Pipeline deep-dive** — reuse `<HowItWorks />` (id="pipeline"), mono labels:
   - Paste the stack trace — `POST /debug`
   - Jericho retrieves the exact code — `RAG over your codebase`
   - Verifies against your real functions — `confidence_score · verified=true`
   - Runs your tests to prove the fix — `runtime verified`, then `POST /apply`
3. **Demo placeholder** — reuse `<Demo />` ("Watch it prove a fix").
4. **Proof points (debugging-specific)** — reuse `<Proof />` (or a debugging-scoped variant; default: reuse shared `Proof`).
5. **CTA band** → `/waitlist`.

---

## 5. `/security` — `app/security/page.tsx` (NEW, RSC)

1. **Security hero**: H1 "Security that knows your codebase." + sub; CTA `/waitlist`.
2. **Reachability explanation**: two contrasting plain blocks — "Vulnerable but unreachable" vs "Actually on a path you run." Editorial, no icon cards.
3. **Scanning layers** — reuse `<Security />` 4 points (dependency exposure, secret detection, reachability heuristics, evidence-bound findings). Plain points, no icon-on-top.
4. **Demo placeholder** — reuse `<Demo />` (heading overridable; see §8 prop note).
5. **CTA band** → `/waitlist`.

---

## 6. `/self-hosted` — `app/self-hosted/page.tsx` (NEW, RSC)

1. **Hero**: H1 "Your code never leaves your infrastructure." + sub; CTA `/waitlist`.
2. **Who it's for**: regulated industries, government, air-gapped environments — plain list.
3. **What's included**: full local stack; no external API calls in this mode; unlimited developers.
4. **Honest contrast (hosted vs self-hosted)**: explicit, two-column —
   - Hosted: uses cloud APIs for inference; fastest setup.
   - Self-hosted: fully local/air-gapped; nothing leaves your network.
   - (This honesty matters because the security product touches code; ties to the Privacy/ToS launch flag.)
5. **CTA band** → `/waitlist`.

---

## 7. `/pricing` — `app/pricing/page.tsx` (NEW, RSC)

- `<Nav />` → `<Pricing />` (moved) → `<Footer />`.
- Three tiers, plain `border border-surface-2`, **no colored top/left borders**:
  - Solo — $17/mo
  - Team — $22/seat/mo
  - Self-hosted — $300/yr
- Each: name, price, 3–4 plain feature lines, labeled "Request access" `Link /waitlist`.

**Alternative to §2 (if you prefer no shared section components):** inline each section's markup directly in its spoke page and delete `Demo/HowItWorks/Security/Pricing` from `components/sections/`. Trade-off: more duplication, but each page fully self-owned. Default plan keeps them shared.

---

## 8. Nav active-route detail

- Convert `Nav.tsx` to `"use client"`; use `usePathname()`.
- Active match: exact for `/`; `pathname.startsWith(href)` for spokes (so nested paths stay highlighted).
- Active treatment within tokens (pick one): `opacity-100` for active vs `opacity-70` inactive (already the hover model), **or** a 1px `border-b border-accent` under the active link. Recommend: opacity-100 + `border-b border-accent` (clear but minimal). CTA stays crimson and is never "active-marked."

---

## 9. Shared building decisions (recommended additions — see §11)

- **Demo reuse needs a heading prop**: `<Demo />` currently hardcodes "Watch it prove a fix". To reuse on `/security`, add an optional `title?: string` prop (default keeps current). Small, in-scope.
- **Proof reuse**: shared `Proof` is generic enough for hub + debugging. If debugging wants tailored proof copy, add optional props; default reuse as-is.

---

## 10. Rules compliance checklist (applied to every new/changed file)

- [ ] Every internal link uses `next/link` `Link`.
- [ ] Tokens only — no hardcoded hex; colors via `canvas/surface-1/surface-2/accent/accent-hover/accent-border/text-primary`.
- [ ] Spacing via `space-1..8` only; no arbitrary px (except endorsed `max-w-[Nch]`, `aspect-*` for placeholders).
- [ ] Every button/link has a visible text label.
- [ ] `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent` on interactives.
- [ ] No 3D / GSAP / Framer Motion / glassmorphism / centered hero / icon-on-top cards / badge above H1.
- [ ] Accent rationed to ONE primary crimson action per viewport (hub has Nav CTA + teaser; ensure only one *primary* crimson per fold).
- [ ] 3D mount placeholders are commented, SSR-safe (headline/CTA outside canvas).

---

## 11. Things I'd add (my recommendations — NOT in the original prompt)

1. **Route-group shared layout (DRY Nav/Footer).** Instead of importing `<Nav/>`+`<Footer/>` in all 5 pages, create `app/(site)/layout.tsx` that renders Nav + children + Footer, and move the 5 marketing routes under `(site)/`. Keep `/waitlist` outside the group (it has its own chrome). Benefit: one place to change nav/footer; impossible to forget on a new page. **Recommended.** (If you prefer explicit imports per page for simplicity, I'll do that instead — say which.)
2. **Per-route `metadata`.** Each spoke exports `metadata` (title/description) for SEO + social. Title pattern: `"Debugging — Jericho"`, etc. Cheap, high value once `noindex` is removed.
3. **A shared `CTA`/`Button` primitive.** Right now button Tailwind strings are copy-pasted (Nav, Hero, Pricing). A tiny `components/ui/CTA.tsx` (`variant: "primary" | "ghost"`, `href`, label children) enforces focus rings + accent rationing in one place and kills drift. **Recommended.**
4. **A shared `Section` + `Container` wrapper.** Encapsulate `mx-auto max-w-6xl px-space-3 py-space-7`. Reduces repetition and guarantees consistent rhythm. Optional but tidy.
5. **Consistent CTA band component** reused at the bottom of every spoke (`/waitlist` call). Avoids re-writing it 4 times.
6. **`noindex` is still set** (`public/_headers`: `X-Robots-Tag: noindex`). Fine pre-launch; flag to remove at launch alongside Privacy/ToS.
7. **Mobile nav.** Current Nav hides links on mobile (`md:flex`) with no hamburger/menu. Spoke architecture makes this worse (5 links). Plan a follow-up for a mobile menu (kept out of this round to honor "no animation/polish"). **Flagging now.**
8. **`/debugging#pipeline` deep link** from hub Doorways "Enter debugging →" could optionally land on the pipeline. Default: link to `/debugging` top. Minor.
9. **404 / not-found** currently default. Consider a tokenized `app/not-found.tsx` later (out of scope this round).
10. **Privacy/ToS** — already flagged by you as before-launch; I'll add placeholder routes only when you say go (a security product sending code to cloud APIs needs a real policy before public launch).

---

## 12. Execution order (when approved)

1. `Nav.tsx` → client + 5 routes + active marking.
2. `Footer.tsx` → real route links.
3. (If approved) `app/(site)/layout.tsx` + move routes under group; else import Nav/Footer per page.
4. New `Doorways.tsx`; rewrite hub `app/page.tsx`.
5. `Demo.tsx` → optional `title` prop.
6. Create `app/debugging`, `app/security`, `app/self-hosted`, `app/pricing` pages.
7. (If approved) extract `CTA`, `Section`, `Container` primitives and refactor.
8. `npm run build` → confirm all 6 routes compile.
9. Report: route tree + deleted-vs-moved component table.

---

## 13. Locked decisions (confirmed)

1. **Shared layout:** ✅ Route group `app/(site)/layout.tsx` renders Nav + Footer once. The 5 marketing routes (`/`, `/debugging`, `/security`, `/self-hosted`, `/pricing`) move under `(site)/`. `/waitlist` stays outside the group with its own chrome.
2. **Primitives:** ✅ Extract shared `components/ui/CTA.tsx` (`variant: "primary" | "ghost"`), `Section`, and `Container` this round; refactor existing inline buttons/sections to use them.
3. **Spoke sections:** ✅ Reuse shared `Demo` / `HowItWorks` / `Security` / `Pricing` on spoke pages. Net component deletions: 0. (`Demo` gains optional `title` prop.)
4. **Active-nav treatment:** ✅ `opacity-100` + 1px `border-b border-accent` on the active link.

### Resulting target file tree (when executed)

```
app/
  layout.tsx                      (unchanged — fonts, globals, root html)
  (site)/
    layout.tsx                    NEW — <Nav/> {children} <Footer/>
    page.tsx                      MOVED hub (Hero, Doorways, Proof, PricingTeaser)
    debugging/page.tsx            NEW
    security/page.tsx             NEW
    self-hosted/page.tsx          NEW
    pricing/page.tsx              NEW
  waitlist/page.tsx               unchanged (outside group)
  api/waitlist/route.ts           unchanged
components/
  sections/
    Nav.tsx                       MODIFY (client + active route)
    Footer.tsx                    MODIFY (real route links)
    Hero.tsx                      keep
    Doorways.tsx                  NEW
    PricingTeaser.tsx             NEW
    Proof.tsx                     keep / reuse
    HowItWorks.tsx                reuse on /debugging
    Security.tsx                  reuse on /security
    Pricing.tsx                   reuse on /pricing
    Demo.tsx                      MODIFY (optional title prop), reuse
  ui/
    CTA.tsx                       NEW
    Section.tsx                   NEW
    Container.tsx                 NEW
  StrikeDemo.tsx                  untouched
```

**Note:** moving `page.tsx` into `(site)/` keeps the URL `/` identical (route groups don't affect the path). All Nav/Footer imports are removed from individual pages once the group layout owns them.

**Status: ready to execute on your explicit go. Not yet implemented.**
