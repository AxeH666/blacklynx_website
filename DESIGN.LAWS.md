# DESIGN.LAWS.md — Jericho

The constitution for Jericho's website. Read before generating any UI. Non-negotiable.

Jericho is a debugging tool. Positioning: **proof, not guesses.** It retrieves the exact buggy function from a codebase, verifies the fix is grounded in real code, and applies it. Two modes: hosted SaaS (cloud APIs) and self-hosted (local/air-gapped). Audience: developers globally. The site must feel like an instrument of certainty — forensic, precise, earned. Never generic, never decorative for its own sake.

---

## STACK

Next.js 15 (App Router, static export) · React 18 · TypeScript · Tailwind 3 · GSAP + Framer Motion · R3F / Three.js / drei · Cloudflare Pages.

---

## NEVER (AI-slop tells — reject on sight)

- Inter font, anywhere.
- Any hue / chromatic accent. The palette is pure neutral — chroma at/near 0. No crimson, no purple/indigo/violet, no colored accents of any kind.
- Glassmorphism / frosted glass (decorative blur panels — see PART 1 for controlled sheen, which is not frosted glass).
- Centered-everything hero. Default to asymmetric, editorial, left-aligned.
- A badge/pill directly above the H1.
- Identical feature cards with an icon-on-top.
- Floating gradient blobs / orbs / abstract 3D decoration.
- Soft drop-shadow cards (elevation is lightness + borders + inset highlights, not drop shadows).
- Colored left/top borders on cards.
- `#000` pure black or `#fff` pure white.
- Generic copy: "supercharge", "unleash", "all-in-one", "build the future", "scale without limits".
- **Empty buttons.** Every button has a clear, specific label. No icon-only buttons without aria-label and visible purpose.
- **Gradient text** — no `background-clip: text` rainbow or metallic headline tricks.
- **Colored glows** — no `box-shadow` halos in any hue; silver/white glows at ≤8% opacity only, and only on verified interactive focus/hover.
- **Pill / full-radius buttons** — no `border-radius: 9999px` or `rounded-full` on buttons. Buttons are 6–8px radius (see PART 2).
- **Bouncy springs on UI** — no spring/bounce easing on buttons, nav, cards, or modals. Cold ease-out only (see PART 5).
- **Pure-white text** — never `oklch(1 0 0)` or `#fff` for body or headings; cap at ~`oklch(0.95 0 0)`.
- **Nested-card-in-card-in-card** — max one surface elevation step between parent and child; no Russian-doll card stacks.
- **>3 font roles per view** — display, body, mono only. No third decorative face.

---

## COLOR (OKLCH — monochrome black + silver)

**Shipping tokens** (live in `app/globals.css` / `tailwind.config.ts` — reconciled Stage 1):

- Pure neutral system: every token is OKLCH with **chroma 0 and no hue**. No crimson, no colored accent, no hue anywhere.
- **Hierarchy and the primary action are signaled by LIGHTNESS, not hue. The primary CTA is the lightest element in its viewport.**
- Elevation: `--canvas` `oklch(0.17 0 0)` · `--surface` `oklch(0.21 0 0)` · `--raised` `oklch(0.25 0 0)` · `--overlay` `oklch(0.29 0 0)`
- Borders: `--border` `oklch(0.37 0 0)` · `--border-strong` `oklch(0.45 0 0)`
- Text: `--text` `oklch(0.95 0 0)` · `--text-secondary` `oklch(0.76 0 0)` (≥4.5:1 on all surfaces) · `--text-muted` `oklch(0.72 0 0)`
- Primary action (silver): `--accent` `oklch(0.92 0 0)` · `--accent-hover` `oklch(0.98 0 0)` · `--accent-fg` `oklch(0.17 0 0)`
- Body contrast ≥ 4.5:1. The whole system is grayscale; the only "color" decision is lightness placement.

---

## PART 1 — SURFACES, DEPTH, CHROME / GLASS

### OKLCH elevation ramp (shipping — matches `app/globals.css`)

```css
:root {
  --canvas:       oklch(0.17 0 0);   /* near-black base */
  --surface:      oklch(0.21 0 0);   /* default panel */
  --raised:       oklch(0.25 0 0);   /* cards, inputs */
  --overlay:      oklch(0.29 0 0);   /* modals, popovers */
  --border:       oklch(0.37 0 0);   /* default 1px hairline */
  --border-strong: oklch(0.45 0 0);  /* emphasized border */
  --text-muted:   oklch(0.72 0 0);   /* secondary / de-emphasized */
  --text:         oklch(0.95 0 0);   /* primary text — never pure white */
  --text-secondary: oklch(0.76 0 0); /* sub-copy — ≥4.5:1 on all surfaces */
  --accent:       oklch(0.92 0 0);   /* primary CTA fill (silver) */
  --accent-hover: oklch(0.98 0 0);
  --accent-fg:      oklch(0.17 0 0);   /* text on silver button */
}
```

**Optional cold tint (use sparingly, one decision for the whole system):** add `chroma ≈ 0.004`, `hue ≈ 255` to surface tokens only — e.g. `--surface: oklch(0.21 0.004 255)`. Keeps the palette effectively monochrome while avoiding muddy warm grays. If used, apply consistently to all surface/border tokens; never tint text or accent.

### Elevation rules

**L1.** On dark UI, **shadows never convey elevation**. Depth is communicated exclusively by surface lightness steps (+3–4% L per step), 1px borders, and inset top-lit highlights. Drop shadows are forbidden on cards and panels.

**L2.** Off-white text is never pure white. Primary text caps at ~`oklch(0.95 0 0)`. Pure `oklch(1 0 0)` is reserved for ≤8% opacity inset highlights and focus-ring inner strokes — never for readable copy.

**L3.** Elevation steps must be **perceptually even**: each step adds +3–4% lightness (L). If a step "disappears," the delta is too small; if it "jumps," the delta is too large. Tune against real content, not math alone.

### Calibration references (do not copy hex — tune OKLCH)

**Radix neutral-gray dark reference map** (step → intent):

| Step | Hex (ref) | Intent |
|------|-----------|--------|
| 1 | `#111111` | app background |
| 2 | `#191919` | subtle bg |
| 3 | `#222222` | UI element bg |
| 4 | `#2a2a2a` | hovered UI element |
| 5 | `#313131` | active / selected |
| 6 | `#3a3a3a` | subtle borders |
| 7 | `#484848` | UI borders |
| 8 | `#606060` | hovered borders |
| 9 | `#6e6e6e` | solid backgrounds |
| 10 | `#7b7b7b` | hovered solid |
| 11 | `#b4b4b4` | low-contrast text |
| 12 | `#eeeeee` | high-contrast text |

**Linear LCH note:** Linear's dark surfaces carry a faint blue hue in LCH (~250–260°). For Jericho, **strip the hue — target chroma 0** — to stay forensic/monochrome. Use Linear's *lightness relationships* as calibration, not their hue.

**Geist step-intent mapping** (Vercel Geist gray scale → Jericho intent):

| Geist step | Intent in Jericho |
|------------|-------------------|
| Background 1 | `--canvas` |
| Background 2 | `--surface` |
| Component default | `--raised` |
| Component hover | `--raised` + border lift or +1% L |
| Borders default | `--border` |
| Borders strong | `--border-strong` |
| Text secondary | `--text-muted` |
| Text primary | `--text` |
| Accents / CTA fill | separate `--accent` token (implementation: silver `oklch(0.92 0 0)`) |

### Hairline / top-lit bevel technique

The workhorse inset highlight — apply to any raised surface:

```css
box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.08);
```

Gradient-border bevel (for panels that need a crisp top edge):

```css
.bevel-surface {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--raised), var(--raised)) padding-box,
    linear-gradient(
      to bottom,
      oklch(1 0 0 / 0.12),
      oklch(1 0 0 / 0.04)
    ) border-box;
  border-radius: 6px;
}
```

**B1.** Every raised surface gets the inset `0 1px 0 oklch(1 0 0 / 0.08)` highlight OR the gradient-border bevel — not both stacked unless deliberately layered (modal chrome).

**B2.** Inset highlight opacity never exceeds 12% on the top edge. If the surface reads as "glowing," pull it down.

**B3.** Bottom edge gets no inset shadow. Depth reads from the top-lit edge only on dark UI.

### Sheen / glass gradient (not frosted glass)

Controlled luminance fade — not `backdrop-filter: blur()`.

```css
.glass-surface {
  position: relative;
  background: var(--raised);
}

.glass-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    oklch(1 0 0 / 0.06) 0%,
    oklch(1 0 0 / 0) 60%
  );
  pointer-events: none;
}
```

**G1.** Sheen gradient white opacity ≤ 6% at peak, fading to 0 by ~60% height. Never full-height gradients.

**G2.** Sheen is decorative luminance only — it does not replace surface lightness steps. A sheen on a flat canvas is slop.

**G3.** No `backdrop-filter`, no frosted panels, no `bg-white/10` glass cards. This technique is a pseudo-element highlight, not glassmorphism.

### Grain (film texture)

```css
.grain::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}
```

**N1.** Grain opacity starts at 2.5%. Range: 2–5%. Never above 5%.

**N2.** Grain is `position: fixed` over the viewport — one layer, not per-card. Per-element grain is slop.

**N3.** Grain is optional polish (Stage 3+). Ship without it; add only if the canvas reads as flat plastic.

---

## PART 2 — BUTTONS & INTERACTIVE

### Geometry

| Property | Value |
|----------|-------|
| Border radius | 6–8px (default 7px) |
| Height | 36–40px default · 32px compact · 44px large |
| Horizontal : vertical padding | ~2.2–2.5 : 1 |
| Font size | 13–15px (default 14px) |
| Font weight | 450–500 (default 500) |
| Letter-spacing | −0.01em |

> **RECONCILED (Stage 1):** Radius tokens ship as `--radius-sm: 4px`, `--radius-md: 6px`, `--radius-lg: 8px` in `globals.css`, mapped in Tailwind. Button polish (7px default) is Stage 2.

### Primary button (silver fill — light on dark)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 7px;
  font-family: var(--font-geist), sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: oklch(0.16 0 0);
  background: linear-gradient(
    180deg,
    oklch(0.94 0 0) 0%,
    oklch(0.88 0 0) 100%
  );
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.35),
    0 1px 2px oklch(0 0 0 / 0.40);
  transition:
    filter var(--dur-fast) var(--ease-out-expo),
    transform var(--dur-fast) var(--ease-out-expo);
  cursor: pointer;
}

@media (hover: hover) {
  .btn-primary:hover {
    filter: brightness(1.04);
  }
}

.btn-primary:active {
  transform: scale(0.97);
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: none;
  transform: none;
}
```

### Ghost button

```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 18px;
  border: 1px solid var(--border-strong);
  border-radius: 7px;
  font-family: var(--font-geist), sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
  background: transparent;
  transition:
    border-color var(--dur-fast) var(--ease-out-expo),
    background-color var(--dur-fast) var(--ease-out-expo);
  cursor: pointer;
}

@media (hover: hover) {
  .btn-ghost:hover {
    border-color: oklch(0.55 0 0);
    background: oklch(1 0 0 / 0.04);
  }
}

.btn-ghost:active {
  transform: scale(0.97);
}
```

### Button state rules

**BTN1.** Only **ONE** `variant="primary"` (silver fill) per viewport. If a section needs two actions, one is primary, one is ghost. Never two light-silver primaries in the same fold.

**BTN2.** Hover styles apply only inside `@media (hover: hover)`. Touch devices get `:active` feedback only — no sticky hover states.

**BTN3.** Disabled buttons have **no hover state and no tooltip**. `opacity: 0.4`, `cursor: not-allowed`, `pointer-events` may remain for screen-reader access but visual hover is suppressed.

**BTN4.** **Font-weight must not change on hover.** Weight is fixed at render; hover changes brightness/border/background only.

**BTN5.** Every button has a **visible text label**. No icon-only buttons without `aria-label` and a visible purpose. No empty `<button>`.

---

## PART 3 — TYPOGRAPHY

### Tracking table

| Context | Size | Letter-spacing |
|---------|------|----------------|
| Display | > 40px | −0.02 to −0.03em |
| Display (large) | ≥ 60px | −0.025em |
| Subheads | 24–40px | −0.01 to −0.015em |
| Body | 16–18px | 0 |
| Mono / caps eyebrows | any | +0.05 to +0.1em |

### Weight discipline

- UI text: **300–500**. Default body 400. Button labels 500.
- Headings: **500–600**. Never lighter than 400 for any UI copy.
- Never use weight change as a hover affordance.

### Type scale

- Ratio: **1.2–1.25** (major third). Base: **16px**.
- Example scale:

| Token | Size | Use |
|-------|------|-----|
| `--text-xs` | 12px | mono labels, eyebrows |
| `--text-sm` | 13px | captions, button text |
| `--text-base` | 16px | body |
| `--text-lg` | 18px | lead / sub-copy |
| `--text-xl` | 20px | h4 |
| `--text-2xl` | 24px | h3 |
| `--text-3xl` | 30px | h2 |
| `--text-4xl` | 36px | h1 |
| `--text-5xl` | 48px | display |
| `--text-6xl` | 60px | hero display |

### Line-height & measure

| Context | Line-height | Measure |
|---------|-------------|---------|
| Body | 1.5–1.65 | ~65ch max |
| h1 | ~1.1 | — |
| Display | ~1.05 | — |

- Don't center long text. Body measure 40–65ch.

### Monospace-as-signal

- Geist Mono / JetBrains Mono for: code blocks, stack traces, diffs, API routes (`POST /debug`), mono eyebrows, `confidence_score · verified=true`.
- **Tabular numbers for data, not monospace.** Prices, counts, metrics use `font-variant-numeric: tabular-nums` on the sans face — not mono.

### Font rendering

```css
:root {
  font-feature-settings: "kern" 1, "liga" 1;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
}

.mono,
code,
pre,
kbd {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

.data,
.price,
.metric {
  font-variant-numeric: tabular-nums slashed-zero;
}

input,
select,
textarea {
  font-size: 16px; /* prevents iOS zoom on focus */
}
```

**T1.** Display tracking tightens as size increases — never positive tracking on headlines.

**T2.** Mono is a **signal**, not a body font. If everything is mono, nothing is.

**T3.** Max **3 font roles per view**: display (Geist), body (Geist), mono (Geist Mono). No fourth face.

**T4.** Inputs at **≥ 16px** on mobile to prevent iOS auto-zoom.

---

## PART 4 — SPACING & RHYTHM

### Non-linear scale principle (Refactoring UI)

No two adjacent steps closer than ~25%. Base unit: **16px** for layout rhythm (not every micro-gap). Whitespace is the default — remove only when proven necessary.

### Spacing scale (shipping — matches `app/globals.css`)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

> **RECONCILED (Stage 1):** Non-linear scale starting at 4px is live in `globals.css` and `tailwind.config.ts`. Component class names remapped to preserve pixel intent (e.g. old `py-space-7` 96px → `py-space-24`).

### Spacing rules

**S1.** **Internal padding < external gap.** Padding inside a card is always smaller than the gap between cards. If padding ≥ gap, the layout feels cramped and same-y.

**S2.** **Optical correction over mathematical centering.** Icons, arrows, and chevrons get 1–2px manual offset. Trust the eye, not the box model.

**S3.** **Restraint / whitespace.** Start with too much space, then remove. Every section earns its vertical rhythm — no arbitrary `py-24` without intent.

---

## PART 5 — MOTION

Cold, precise, forensic. **Ease-out only. No bounce/spring on UI.**

### Easing & duration tokens (shipping — matches `app/globals.css`)

```css
:root {
  --ease-out-cubic: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  /* spring-bounce: NOT for UI motion (cold aesthetic) — DESIGN.LAWS M3 */
  --ease-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
  --dur:      180ms;
  --dur-slow: 240ms;
}
```

> **RECONCILED (Stage 1):** `--ease-out-quart`, `--ease-out-expo`, and duration tokens are live. `--ease-spring-bounce` remains defined but is **banned from UI motion** (M3). Use `ease-out-expo` / `dur-fast` as defaults in Stage 2+.

### Motion techniques

- **Hover:** 150ms (`--dur-fast`), instant on / ease off. Brightness or border change only.
- **Press:** `transform: scale(0.97)`. Never below `0.95`.
- **Stagger:** 40–80ms between siblings. Choreograph — don't animate everything.
- **Scroll reveal:** `opacity 0→1` + `translateY(8px→0)`. Scale from ≥ 0.9 if used — **never scale from 0**.
- **Popovers:** animate from trigger origin (`transform-origin` set to trigger quadrant).
- **Animate only `transform` + `opacity`.** 60fps target. Animations must be interruptible.
- **Don't animate** frequent actions (typing, scrolling content) or keyboard-driven flows.
- **2px blur crossfade trick** (optional, Stage 3): on exit, `filter: blur(2px)` + `opacity: 0` over `--dur-fast` — use sparingly on modals only.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- **Theme switch** (if ever added) should not transition — instant swap.

### Motion rules

**M1.** UI animations ≤ 200ms default, ≤ 240ms slow. Never > 300ms for UI feedback.

**M2.** **No `ease-in` or `linear`** for UI transitions. Default: `--ease-out-expo`.

**M3.** **No bounce / spring on UI.** Springs are for the 3D hero only (if at all) — never buttons, nav, cards, toasts.

**M4.** Everything gated behind `prefers-reduced-motion: reduce` (block above).

**M5.** Style focus rings deliberately. Never `outline: none` without a replacement (see PART 6).

---

## PART 6 — THE 1% DETAILS

### Concentric radius

When a padded container has rounded corners, inner elements subtract the padding:

```css
.outer {
  border-radius: 12px;
  padding: 8px;
}

.inner {
  border-radius: calc(12px - 8px); /* = 4px */
}
```

### Selection

```css
::selection {
  background: oklch(0.95 0 0 / 0.20);
  color: oklch(0.95 0 0);
}
```

### Scrollbar (dark)

```css
:root {
  color-scheme: dark;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: oklch(0.35 0 0);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.45 0 0);
}
```

### Focus-visible rings

Simple (default):

```css
:focus-visible {
  outline: 2px solid oklch(0.95 0 0 / 0.80);
  outline-offset: 2px;
}
```

Busy-background variant (on silver buttons / light surfaces):

```css
:focus-visible {
  outline: 2px solid oklch(0.16 0 0);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px oklch(0.95 0 0 / 0.25);
}
```

- Focus ring contrast ≥ 3:1 against adjacent colors.
- **Do not animate the focus ring.**

### Hairline dividers & mono eyebrows

```css
.divider {
  height: 1px;
  background: var(--border);
  border: none;
}

.eyebrow {
  font-family: var(--font-geist-mono), monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
```

### Images

- Real `<img>` or `next/image` with explicit `width` + `height`. No CSS-background hero photos.
- System border (`1px solid var(--border)`) + concentric radius.
- Brightness-tuned: `filter: brightness(0.92)` on screenshots if they blow out against dark canvas.

### Detail rules

**D1.** `font-variant-numeric: tabular-nums` on all prices, counts, metrics, and table columns.

**D2.** Concentric radius on every nested rounded container — no "double radius" visual clash.

**D3.** Focus rings are styled and static — never animated, never removed.

**D4.** Dividers are 1px `var(--border)` — not `opacity-20` hacks on text color.

**D5.** ≤ 3 font roles, ≤ 1 primary button, ≤ 1 grain layer, ≤ 1 sheen per surface. Restraint is the craft.

### Ethos

> "Details. Imbuing every aspect of your work with care and refinement doesn't just make it prettier, it makes it feel more intentional, more human, more crafted."
> — Paco Coursey

---

## 3D (R3F)

- Used ONCE, meaningfully: the hero "lock-on" — a field of dim code nodes resolving to one bright verified node, a bright silver reticle confirming. Expresses "proof, not guesses" and the Jericho name (noise → signal). Never decorative.
- Budget: < 1000 draw calls, ideally < 300. Instanced geometry. `frameloop="demand"`. Capped `dpr={[1,2]}`. `<PerformanceMonitor>` adaptive quality.
- Lazy-load the canvas after first paint via a `'use client'` wrapper + `dynamic(ssr:false)`. Hero headline + CTA stay in SSR'd HTML, never inside `<canvas>`.
- Mutate refs in `useFrame`; never `setState` per frame; never allocate in the loop.
- Pause offscreen (IntersectionObserver) and on `document.hidden`.
- Mobile / can't-hold-60fps / reduced-motion → static poster image of the locked-on frame. The animation is never worth jank.

---

## PERFORMANCE GATES (hard)

- LCP < 2.5s · INP < 200ms · CLS < 0.1, at P75, real-device.
- Three.js bundle is code-split and never on the critical path.
- Set all image/video dimensions. Preload LCP image + fonts.

---

## TOKEN RECONCILIATION STATUS (Stage 1 — complete)

| Flag | Item | Status |
|------|------|--------|
| #1 | Elevation token names (`surface`/`raised`/`overlay`/`text`) | **RECONCILED** |
| #2 | Elevation L values (canvas 0.17, border 0.37, etc.) | **RECONCILED** |
| #3 | Radius tokens (`--radius-sm/md/lg` → Tailwind `rounded-sm/md/lg`) | **RECONCILED** (button 7px polish → Stage 2) |
| #4 | Spacing scale (4px base, non-linear through `space-24`) | **RECONCILED** |
| #5 | Motion tokens (`ease-out-quart/expo`, `dur-fast/dur/dur-slow`) | **RECONCILED** |

---

## STAGED IMPLEMENTATION PLAN

| Stage | Scope | Benchmark |
|-------|-------|-----------|
| **1 — Tokens** | ~~Reconcile OKLCH ramp names/values, spacing scale, easing/duration tokens, radius tokens.~~ **DONE (Stage 1).** Wire into `globals.css` + `tailwind.config.ts`. Remove all hardcoded hex (incl. waitlist). | All routes render with new tokens; zero hex in `app/` + `components/`; contrast ≥ 4.5:1 on body text. |
| **2 — Atoms** | CTA/button polish per PART 2, typography per PART 3, surface bevels per PART 1. Section spacing per PART 4. | Buttons match `.btn-primary` / `.btn-ghost` spec; 3 font roles max; tracking table applied. |
| **3 — Motion / polish** | Scroll reveals, stagger, grain (optional), sheen on hero chrome, focus rings, scrollbar, selection. Mobile nav drawer. | 60fps animations; `prefers-reduced-motion` passes; INP < 200ms. |
| **4 — Slop audit** | Walk every route against NEVER list + rule IDs. Run slopcop.adriankrebs.ch. | Target 0–1 flags. Zero nested-card stacks, zero pill buttons, zero gradient text. |

---

## THRESHOLDS THAT CHANGE THE RULES

If the UI reads as **washed-out white** on dark:
- Inset top highlight is too strong → pull `oklch(1 0 0 / …)` down (start at 0.08, never above 0.12).
- Elevation step is too large → reduce L delta between adjacent surfaces (target +3–4%).
- Pull **both** down together before adding more contrast elsewhere.

If body text fails 4.5:1 → fix before any polish pass.

If the primary button doesn't read as the lightest element → check for competing sheen, gradient text, or an oversized ghost border.

---

## CAVEATS

- **Geist / Linear hex values in calibration tables are reference anchors, not verified production values.** Do not paste them into CSS. Tune OKLCH against real Jericho content.
- **The OKLCH elevation ramp is calibrated, not copied.** Every L stop must be validated against actual components, screenshots, and contrast tests on real displays.
- **Cold tint option** (`chroma 0.004, hue 255`) is a single system-wide decision — pick it or don't; never mix tinted and untinted surfaces.
- **`--ease-spring-bounce`** may exist in code but is **banned from UI motion** per the cold aesthetic. Reserved for nothing until explicitly revisited.

---

## VERIFICATION

- Self-check every screen against NEVER list before considering it done.
- Self-check every interactive against rule IDs (L1–L3, B1–B3, G1–G3, N1–N3, BTN1–BTN5, T1–T4, S1–S3, M1–M5, D1–D5).
- Target 0–1 flags on slopcop.adriankrebs.ch.
- If 3D can't hold 60fps mid-range → ship the static fallback.
- If body contrast < 4.5:1 → fix first.
