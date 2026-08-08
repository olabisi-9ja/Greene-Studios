# GREENE STUDIOS — REDESIGN SPECIFICATION v2

**Concept:** *GREENE / THE DIGITAL STUDIO*
**One-line brief:** *An editorial digital studio operating inside a living canvas.*

**Status:** Ready to build · Supersedes the v1 direction in `REDESIGN-NOTES.md`
**Target codebase:** this repo — Next.js 14 (App Router) · React 18 · Tailwind CSS 4 · framer-motion 12 · Lenis · Archivo Variable (self-hosted) · no Google-Fonts CDN at build · no WebGL by default

---

## Table of contents

- [0. How to read this document](#0-how-to-read-this-document)
- [1. Creative direction](#1-creative-direction)
- [2. Open decisions (need owner input)](#2-open-decisions-need-owner-input)
- [3. Information architecture & sitemap](#3-information-architecture--sitemap)
- [4. Design tokens](#4-design-tokens)
- [5. Signature elements](#5-signature-elements)
- [6. Global chrome](#6-global-chrome)
- [7. Homepage — screen by screen](#7-homepage--screen-by-screen)
- [8. Sub-pages — screen by screen](#8-sub-pages--screen-by-screen)
- [9. Component system](#9-component-system)
- [10. Animation choreography reference](#10-animation-choreography-reference)
- [11. Responsive behavior](#11-responsive-behavior)
- [12. Accessibility & performance](#12-accessibility--performance)
- [13. Content plan](#13-content-plan)
- [14. Data model changes](#14-data-model-changes)
- [15. Build prompt (for the existing React project)](#15-build-prompt)
- [16. Implementation roadmap & acceptance criteria](#16-implementation-roadmap--acceptance-criteria)
- [Appendix A. CSS token block (draft, ready to paste)](#appendix-a-css-token-block)

---

## 0. How to read this document

This is an **implementation specification**, not a mood board. Every section lists: layout, content, states, animation choreography, and responsive behavior. Exact values (sizes, colors, durations, easings) are given where they matter; where a value is a judgment call it is flagged `(art)`.

File references use the **current** repo structure (`src/components/…`, `src/lib/data.ts`, `src/app/globals.css`). The component table in [§9](#9-component-system) maps every existing component to its v2 fate: **keep / restyle / replace / new / remove**.

The single most important instruction in this document: **the site itself is the portfolio piece.** Every animation, every token, every interaction must read as *proof that Greene can build this*. Motion with hierarchy. Restraint as a feature. **No templates. No shortcuts.**

---

## 1. Creative direction

### 1.1 The concept

The visitor is not browsing a website. They are **entering Greene's working environment** — a digital studio. The homepage is a walk through the studio: you arrive (loader → GS monogram draws itself), you get the pitch (hero + manifesto), you see what the studio makes (sticky case-study walk), you hear how the studio thinks (philosophy), you see what it can build (capabilities + lab), you see how it works (process), you see who it works with (proof), and you leave with a clear next action (contact).

### 1.2 The five pillars

| # | Pillar | Expressed as |
|---|---|---|
| 01 | **Identity** | GS monogram, Greene Green `#1F3D3A`, one editorial grotesk family, giant display type |
| 02 | **Atmosphere** | CLEAN / MIDNIGHT / STUDIO — a *living canvas*, not a theme switcher |
| 03 | **Work** | Sticky, cinematic case-study showcase; the portfolio is the hero of the page |
| 04 | **Lab** | Small interactive experiments that prove technical creativity |
| 05 | **Conversion** | Clear project CTA ("START A PROJECT →") without sacrificing the experience |

### 1.3 Positioning copy (locked)

| Context | Copy |
|---|---|
| Hero headline | **WE MAKE / DIGITAL / FEEL ALIVE.** |
| Hero sub | *Greene Studios is an independent digital design studio building identities, websites and digital products for ambitious brands.* |
| Status pill | **AVAILABLE FOR SELECT PROJECTS — 2026** |
| Manifesto | **GOOD DESIGN ISN'T DECORATION.** — *It should make a business clearer. A product easier to use. A brand harder to forget.* |
| Work section | **SELECTED WORK** |
| Capabilities | **WHAT CAN WE BUILD?** — BRAND / DIGITAL / PRODUCT / CODE / MOTION |
| Lab | **WE LIKE TO EXPERIMENT.** |
| Process | **FROM IDEA → IMPACT** — DISCOVER / DEFINE / DESIGN / BUILD / LAUNCH — *Typical engagement: 4–16 weeks* |
| About | **SMALL STUDIO. BIG DIGITAL THINKING.** |
| Proof | **BUILT WITH PEOPLE WHO CARE.** |
| Contact | **HAVE A GOOD PROBLEM?** — *Tell us what you're trying to build.* |
| Footer wordmark | **GREENE®** |

### 1.4 What changes vs. the current site (and what stays)

**Stays** (they already work): the atmosphere system (renamed), Lenis smooth scroll, custom cursor with `data-cursor` labels, hide-on-scroll nav, editorial `PageHeader` on sub-pages, the `✦` kicker pattern, the giant interactive footer word, structured data in `src/lib/data.ts`, `@tailwindcss/typography` prose for journal.

**Changes:**
- **Removed from the homepage:** the four vertical "who we build for" text items → interactive visual selector. The 3 philosophy cards → giant manifesto + "how we think" statements. The 10-step process wall → 5 interactive stages. The testimonial quotes and unverifiable metric chips → verifiable collaborations (see [§13](#13-content-plan)). The "Trusted by ambitious teams" client marquee → removed or reframed as collaborations.
- **Renamed:** `paper` atmosphere → **CLEAN**; `midnight` → **MIDNIGHT**; `studio` → **STUDIO** (mode names stay as code values `clean | midnight | studio`; keep `mode-paper` as a CSS alias during migration).
- **New signature:** the GS monogram draw-in (loader + page transitions + interactive hero object).

---

## 2. Open decisions (need owner input)

These are flagged throughout the document as **OD-1 … OD-6**. They do not block the build — the spec provides a default for each — but the final answers change content, not architecture.

| ID | Question | Default while unconfirmed |
|---|---|---|
| OD-1 | Are the testimonials (Sarah Chen, Marcus Williams, Priya Sharma, James Okonkwo) and result claims (e.g., "340% engagement", "£2.4M launch month", "98% client satisfaction", "$50M+ revenue") real and verifiable? | Remove testimonial quotes and unverifiable numbers. Use the "Selected collaborations" table with qualitative outcomes (see [§13.4](#134-proof--collaborations)). |
| OD-2 | Is Greene a solo studio or a team? Are real photos/names available? | Ship "Independent by design" structure with placeholders; single-founder layout if solo. |
| OD-3 | Project imagery: are current Pexels photos acceptable, or should real project shots be produced? | Use existing Pexels assets as placeholders; spec local AVIF/WebP for production. |
| OD-4 | Typography: keep Archivo Variable (already installed, grotesk) or swap body/UI to Geist/Satoshi? | Keep Archivo Variable everywhere (zero new deps, build-safe). Swap later if desired — tokens are centralized. |
| OD-5 | Lab experiments: which six ship as *live* demos vs. "SOON"? | Live: Cursor, Typography, Motion, Interaction. SOON: WebGL, AI. |
| OD-6 | Which projects are genuinely "selected work" vs. speculative? | Luminary, Vera, Arc Commerce, Bloom Health as the four featured (already `featured: true` + bloom). Onyx & Prism move to the Work archive. |

---

## 3. Information architecture & sitemap

### 3.1 Target sitemap (maps onto existing routes)

```
/                          Home (single scrollable experience)
├── /work                  Work index — editorial, alternating compositions
│   ├── /work/[slug]       Cinematic case study (Luminary, Vera, Arc, Bloom, Onyx, Prism)
│   └── /work/archive      Full archive
├── /services              WHAT CAN WE BUILD? — 5 capability rows
│   └── /services/[slug]   Capability detail (existing 5 pages, restyled)
├── /studio                About — SMALL STUDIO. BIG DIGITAL THINKING. (+ philosophy, capabilities)
│   └── /about             Alias → /studio (or keep as sibling with same content)
├── /lab                   Experiments (new route; /experiments keeps working as alias)
├── /process               Full methodology — 5 stages × 10 sub-steps, interactive
├── /journal               Journal index + /journal/[slug] (light restyle)
├── /contact               HAVE A GOOD PROBLEM? + form + availability
├── /pricing, /careers, /resources, /legal   (restyle only — PageHeader already applies)
└── 404                    "Good design knows better."
```

### 3.2 Homepage flow (locked, from the brief)

```
[LOADER]        GS monogram draws itself → expands into page
[HERO]          WE MAKE DIGITAL FEEL ALIVE. + interactive GS mark + status pill
[MANIFESTO]     GOOD DESIGN ISN'T DECORATION.
[WE BUILD FOR]  RETAIL / CONSUMER / EDUCATION / CULTURE (visual selector)
[SELECTED WORK] LUMINARY → VERA → ARC → BLOOM (sticky scroll)
[HOW WE THINK]  WE DON'T DESIGN FOR DRIBBBLE. / WE DON'T CHASE TRENDS. / WE DON'T SHIP PIXELS.
[CAPABILITIES]  BRAND / DIGITAL / PRODUCT / CODE / MOTION
[LAB]           WE LIKE TO EXPERIMENT. (6 cards)
[PROCESS]       DISCOVER → DEFINE → DESIGN → BUILD → LAUNCH
[BUILT WITH]    FIGMA · REACT · NEXT.JS · GSAP · MOTION · WEBGL · THREE.JS · LOTTIE …
[ABOUT]         SMALL STUDIO. BIG DIGITAL THINKING.
[PROOF]         SELECTED COLLABORATIONS · RESULTS
[FAQ]           compact accordion (5–6 items)
[CONTACT]       HAVE A GOOD PROBLEM? + START A PROJECT →
[FOOTER]        GREENE®
```

---

## 4. Design tokens

All tokens live in `src/app/globals.css` (see [Appendix A](#appendix-a-css-token-block) for a paste-ready draft). The Tailwind `@theme` mapping in `globals.css` is unchanged (`--color-brand-*`, `--font-display/body`, `--ease-*`) so existing `bg-[var(--brand-bg)]` classes keep working.

### 4.1 Brand core (identity — never changes)

| Token | Value | Use |
|---|---|---|
| `--gs-green` | `#1F3D3A` | **Greene Green.** Primary brand color, CLEAN accent, always the "identity" hue |
| `--gs-green-soft` | `#526B65` | Secondary Green. Borders-on-dark, muted accents, chart fills |
| `--gs-warm-white` | `#F5F4EF` | Warm White. CLEAN background, MIDNIGHT text |
| `--gs-ink` | `#0B0D0C` | Ink. CLEAN text, MIDNIGHT/STUDIO background |
| `--gs-lime` | `#C9F24B` | One loud accent for "electric moments" only: the underscore doodle, CTA hover, studio LIME accent |

**Rule:** green is the identity; the seven studio accents belong to **Studio mode only**. In CLEAN and MIDNIGHT the accent is always Greene Green (midnight uses a lightened moss-green for contrast on dark).

### 4.2 Atmosphere tokens

Each atmosphere is a `mode-*` class on `<html>` (the existing mechanism). Values below replace the v1 values.

**CLEAN (`mode-clean`, code default — was `mode-paper`)**
| Token | Value | Character |
|---|---|---|
| `--brand-bg` | `#F5F4EF` | warm white |
| `--brand-surface` | `#FBFAF6` | lighter |
| `--brand-surface-secondary` | `#E9E6DB` | deeper |
| `--brand-border` | `#DAD6C8` | hairline |
| `--brand-text` | `#0B0D0C` | ink |
| `--brand-text-secondary` | `#5D655F` | gray-green |
| `--brand-accent` | `#1F3D3A` | Greene Green |
| `--brand-on-accent` | `#F5F4EF` | |
| grain | 3% | |
| Character | Editorial, minimal, sharp. Lots of whitespace. Hairlines. |

**MIDNIGHT (`mode-midnight`)**
| Token | Value | Character |
|---|---|---|
| `--brand-bg` | `#0B0D0C` | ink (with subtle radial green glow, 6% at top) |
| `--brand-surface` | `#121615` | glass — `rgba(18,22,21,0.72)` + blur |
| `--brand-surface-secondary` | `#191E1C` | |
| `--brand-border` | `rgba(245,244,239,0.14)` | |
| `--brand-text` | `#F5F4EF` | warm white |
| `--brand-text-secondary` | `rgba(245,244,239,0.58)` | |
| `--brand-accent` | `#6E9E8B` | moss green (lightened Greene Green for dark) |
| `--brand-on-accent` | `#0B0D0C` | |
| grain | 5% | |
| Character | Cinematic, premium, glass surfaces, deep-green glows. |

**STUDIO (`mode-studio`)**
| Token | Value | Character |
|---|---|---|
| `--brand-bg` | `#0C1613` | deep green-black canvas |
| `--brand-surface` | `#13211B` | |
| `--brand-surface-secondary` | `#19291F` | |
| `--brand-border` | `rgba(245,244,239,0.16)` | |
| `--brand-text` | `#F5F4EF` | |
| `--brand-text-secondary` | `rgba(245,244,239,0.62)` | |
| `--brand-accent` | `var(--studio-accent)` | dynamic (below) |
| `--brand-on-accent` | `#0B0D0C` | |
| grain | 4% | |
| Environment | Generative canvas (CSS gradients + canvas particles) tinted by `--studio-accent`; cursor trail; section dividers glow with the accent. **The brand stays Greene; only the environment changes.** |

**Studio accents (7)** — `--studio-accent` values; map to the existing `accentHexMap` in `src/lib/context/AtmosphereContext.tsx` (replace the 9-entry map):

| Name | Hex | Mood |
|---|---|---|
| FOREST | `#2F5D4E` | grounded |
| MOSS | `#8FAE7B` | soft |
| TEAL | `#2EC4B6` | electric water |
| LIME | `#C9F24B` | loud |
| AMBER | `#FFB25C` | warm |
| VIOLET | `#8B7CF6` | spectral |
| CORAL | `#FF6F61` | heat |

Derive `--studio-accent-soft` (15% alpha) and `--studio-accent-glow` (40% alpha, for blurs) from the accent at runtime.

### 4.3 Typography

**Stack (locked):** Archivo Variable — one family, two voices. Display = `font-weight 900, uppercase, letter-spacing -0.02em, line-height 0.9`; UI/body = `400–700, normal case, letter-spacing -0.01em, line-height 1.6`. Mono accents (`01`, indices, captions) = system `ui-monospace`. *(OD-4: swap candidate Geist/Satoshi later without code changes — tokens only.)*

**Scale (Tailwind-free `clamp()` values):**

| Role | Size | Weight | Tracking | Line-height | Where |
|---|---|---|---|---|---|
| `display-1` | `clamp(3rem, 9.5vw, 10rem)` | 900 | -0.02em | 0.88 | Hero, footer word |
| `display-2` | `clamp(2.6rem, 6.5vw, 6.5rem)` | 900 | -0.02em | 0.9 | Section headlines, manifesto |
| `display-3` | `clamp(2rem, 4.5vw, 4.2rem)` | 900 | -0.015em | 0.92 | Block headlines |
| `h3` | `clamp(1.4rem, 2.6vw, 2.2rem)` | 800 | -0.01em | 1.05 | Service rows, cards |
| `body` | `1rem` / `1.0625rem` (17px on ≥1280) | 400 | normal | 1.6 | Paragraphs |
| `body-strong` | same | 600 | normal | 1.55 | Emphasis |
| `small` | `0.875rem` | 500 | normal | 1.5 | Secondary |
| `kicker` | `0.6875rem` (11px) | 700 | **0.25em** | 1 | Section labels, prefixed `✦` |
| `micro` | `0.625rem` | 700 | 0.2em | 1 | Captions, meta, status |
| `serif-i` | italic (existing utility) | 400–600 | normal | — | Accent words inside display type |

Rules:
- Display type is always uppercase except `serif-i` accent words, which render lowercase italic (existing `font-serif-i` pattern: `lowercase normal-case tracking-normal`).
- One display line per visual beat. Never two competing giant lines in the same viewport.
- Kickers use the `✦` prefix (existing pattern) except in CLEAN where the prefix may be a 40px hairline + text (existing hero pattern).

### 4.4 Spacing, grid, shape

| Item | Value |
|---|---|
| Grid | 12 columns, `max-w-[1600px]` for hero/nav frame, `max-w-[1400px]` for content; side padding `px-5 md:px-10` |
| Section padding | `py-24 md:py-36` (existing rhythm, keep) |
| Section transitions | hairline `border-t/border-b border-[var(--brand-border)]` OR a 1px atmosphere-crossfade band — never both |
| Radius | pills `rounded-full`; media `rounded-2xl`; surfaces `rounded-2xl`; never >24px except studio glass `rounded-3xl` |
| Borders | 1px hairlines; 1.5px on hover CTAs; `border-[var(--brand-border)]` |
| Shadows | soft: `0 24px 60px -24px rgba(0,0,0,0.25)`; card hover: same +15%; MIDNIGHT/STUDIO use glow shadows (`0 0 80px -20px var(--studio-accent-glow)`) |
| Grain | `NoiseTexture` retained; opacity per atmosphere (3–5%), `mix-blend-overlay` |
| Cursor hit areas | min 44×44px for controls |

### 4.5 Motion tokens

Define in `@theme` (extend existing):

| Token | Value | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` *(exists)* | All entrances, reveals, drawer |
| `--ease-io-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | Loader, page transitions, atmosphere crossfade |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` *(exists)* | UI micro-interactions |
| `--dur-micro` | 150–250ms | hovers, cursor |
| `--dur-fast` | 300–450ms | chips, accordions, tooltips |
| `--dur-base` | 600–800ms | section entrances, image transitions |
| `--dur-slow` | 900–1400ms | text reveals, sticky swaps |
| `--dur-cinematic` | 1600–2400ms | loader, page transition, atmosphere morph |

Lenis: keep `lerp: 0.09`; set `prefersReducedMotion: true` in Lenis options.

---

## 5. Signature elements

### 5.1 GS monogram

The **GS mark** is the identity engine. New component `src/components/ui/GSMark.tsx` — an inline SVG (no image file), stroke-drawn, `currentColor`-aware.

**Reference art (refine in Figma before build — behavior below is the contract):**

```svg
<!-- viewBox 0 0 100 100 · stroke-based, round caps, strokeWidth 6 -->
<!-- outer ring with a deliberate gap (drawn last) -->
<path d="M 50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="currentColor"
      stroke-dasharray="251 260" stroke-linecap="round" />
<!-- G: arc + crossbar -->
<path d="M 63 32 A 24 24 0 1 0 63 68 L 63 54 H 49" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
<!-- S: overlapping S-form -->
<path d="M 34 40 C 34 33 41 31 45 33 C 49 35 50 41 46 44 C 42 47 33 46 33 53 C 33 60 39 63 45 62 C 51 61 53 57 53 52"
      fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
```

**Behavior contract:**

| State | Behavior |
|---|---|
| `drawing` | Paths draw in sequence via `stroke-dashoffset` (animejs or framer-motion): G 0→1.0s, S 0.5→1.6s, ring 1.4→2.2s. Ease `--ease-out-expo`. Then fill fades in 0.3s. |
| `idle` | Filled monogram, `--brand-accent`. In STUDIO, the fill picks up a soft accent glow. |
| `hover` | Magnetic (follows cursor within a 40px radius, translate ≤ 8px), slight `rotate(±4deg)`, ring brightens. Cursor label: `GO` / `HOME`. |
| `drag` | When the hero mark is grabbed: scale 1.06, cursor `DRAG ↔`; mark follows pointer loosely (lerp 0.12), ring trails. |
| `exit` | **Page-transition primitive:** the mark scales from its on-page position to cover the viewport (`scale 1 → 60`, transform-origin = element center, 0.9s `--ease-io-quint`) while the atmosphere color crossfades — the screen "passes through the monogram" to the next page. This is the v2 replacement for `PageTransition`. |
| `reduced-motion` | Static filled mark; exits fade 0.3s. |

**Placement:** hero (interactive object, see [§7 S01](#s01--hero--the-opening)), loader, footer (tiny, slowly rotating at 0.05 rpm), nav (12px, next to GREENE® on scroll), 404, favicon/app icon (`public/icon.svg` — replace current `logo.png` usage gradually).

### 5.2 Atmosphere switcher

New component `src/components/ui/AtmosphereSwitcher.tsx`. Replaces the current sun/moon/paintbucket cycle button in the nav.

**UI:** compact pill labeled `ATMOSPHERE` with a colored dot showing current mode. Click opens a small popover (positioned under the pill):

```
ATMOSPHERE
─────────────────
01 CLEAN      Editorial / professional      ◉
02 MIDNIGHT   Cinematic / premium
03 STUDIO     Experimental / interactive
─────────────────  (visible only in STUDIO)
STUDIO ACCENT
FOREST  MOSS  TEAL  LIME  AMBER  VIOLET  CORAL   (7 dots)
```

**Behavior:**
- Selecting a mode animates the **entire visual system**: `html` class swap + a 0.8s `--ease-io-quint` cross-fade of `background-color`/`color` (CSS transition on tokens, existing `body { transition: background-color 0.8s … }` pattern), generative canvas re-tints, grain density changes, cursor style changes (trail appears in STUDIO).
- In STUDIO, the accent row appears; picking an accent re-tints the environment without touching the brand identity.
- Persist choice in `localStorage` (`greene:atmosphere`, `greene:studio-accent`); read on first paint to avoid flash. Default: CLEAN + LIME.
- Keyboard: popover is a `role="menu"` with arrow-key navigation; Escape closes; focus returns to the pill.

**Context changes** (`src/lib/context/AtmosphereContext.tsx`): rename `paper` → `clean` (keep a `paper` alias during migration), accent type becomes the 7 studio accents, add `accentHex`, `accentSoft`, `accentGlow`, `modeLabel` (`CLEAN/MIDNIGHT/STUDIO`), and `animate()` helper that coordinates the token cross-fade.

### 5.3 Cursor system

Extend `src/components/ui/DynamicCursor.tsx` → v2 (`AtmosphereCursor`):

| Element | Behavior |
|---|---|
| Default | 8px GS-green dot + 28px hairline ring, spring-follow. In CLEAN: ink dot; MIDNIGHT: warm-white dot (`mix-blend-difference` retained); STUDIO: accent dot + soft glow. |
| Label pill | On `[data-cursor]` targets — existing mechanism, extended vocabulary: `VIEW →` `DRAG ↔` `PLAY →` `OPEN ↗` `EXPLORE` `GO` `MENU` `CLOSE` `HELLO` `MAIL` `SCROLL` `ATMOSPHERE` `MODE` |
| Interactive (no label) | Dot scales 2.4×, ring fills 60% (existing behavior) |
| STUDIO trail | 8–10 fading ghost dots / or a canvas ribbon behind the cursor, accent-tinted, capped 60fps, disabled under `prefers-reduced-motion` |
| Touch/coarse pointers | Entirely disabled (existing check) — native cursor only |
| A11y | `cursor: none` only on `(min-width: 1025px) and (pointer: fine)` (existing); all interactions remain keyboard-usable |

### 5.4 Motion language primitives

Reusable, mode-aware, reduced-motion-aware. Implement as hooks/utilities in `src/lib/hooks/` (extend the existing `useSectionAnimation`, `useStaggerAnimation`):

| Primitive | Spec | Use |
|---|---|---|
| `revealText(lines)` | Each line: `y: 110% → 0`, 0.9s, `--ease-out-expo`, stagger 0.08s; inner spans wrapped in `overflow-hidden` | Headlines, menu items |
| `revealChars(text)` | Per-character `y: 100% → 0, rotate: 6deg → 0`, 0.9s, stagger 0.03s *(split-type pkg already installed)* | Hero, manifesto, sticky work |
| `clipReveal` | `clip-path: inset(0 0 100% 0) → inset(0)` 1.1s `--ease-out-expo`; image inside scales 1.15 → 1 over 1.6s | All imagery |
| `fadeUp` | `opacity 0→1, y 24→0`, 0.7s, `--ease-out-quart` | Body copy, chips, cards |
| `cardHover` | `scale 0.98 → 1`, 0.45s `--ease-out-quart`, shadow soft→+15% | Cards, work tiles |
| `magnetic` | Element follows cursor ≤ 8px, lerp 0.15, restores on leave *(Magnetic.tsx exists)* | GS mark, CTAs, menu items |
| `parallax(distance)` | `y` transforms up to ±8% of viewport per element, ScrollTrigger scrub 0.5 | Hero canvas layers, work imagery |
| `marquee` | Existing `Marquee`/`MarqueeContent`/`MarqueeItem`; add `pauseOnHover` prop, direction per instance | Strips, tech stack |
| `scrollTo` | `window.__lenis.scrollTo('#id')` (existing Lenis exposure) | Anchor CTAs |

**Choreography rule:** one reveal type per section beat. If text reveals chars, the imagery uses clipReveal, and the container fades — never two competing choreographies in the same viewport.

---

## 6. Global chrome

### 6.1 Loader (`src/components/Preloader.tsx` → v2)

Replaces the letter-by-letter "GREENE STUDIOS" reveal.

**Sequence (total ≈ 3.0s; `sessionStorage['loader_shown']` gate stays — first visit only):**

| t | Beat |
|---|---|
| 0.0–0.3 | Screen = current atmosphere bg. Tiny `micro` caption top-left: `GREENE STUDIOS — INDEPENDENT DIGITAL DESIGN STUDIO`. Bottom progress hairline starts. |
| 0.3–2.2 | GS monogram draws itself (G → S → ring) centered, 128–200px (`clamp(7rem, 18vw, 12.5rem)`), accent color. |
| 2.2–2.5 | Monogram fills; caption swaps to `THE DIGITAL STUDIO`. |
| 2.5–3.0 | **Monogram expands to cover the viewport** (the §5.1 `exit` primitive) and wipes away, revealing the hero mid-reveal. |
| reduced-motion | Static monogram, 400ms fade out. |

### 6.2 Navbar (`src/components/Navbar.tsx` → v2)

**Layout (all breakpoints):**

```
GREENE®  ························  ATMOSPHERE ●   [MENU ↗]
```

- Top-left: `GREENE®` wordmark (display, 900, uppercase). On scroll (>60px) the 12px GS mark appears left of the wordmark.
- Top-right: `ATMOSPHERE` pill (→ §5.2) + `MENU ↗` pill (filled ink pill, existing style).
- **Corners as a fixed frame (desktop only):** bottom-left micro label `INDEPENDENT DIGITAL STUDIO` (rotates through `AVAILABLE FOR SELECT PROJECTS — 2026` every 6s, crossfade); bottom-right `SCROLL ↓` micro label with a 24px progress ring bound to `ScrollProgress`. The frame is `fixed`, `z-[70]`, pointer-events none except the ring; hidden on mobile, hidden while the menu is open.
- Behavior: hide on scroll down / show on scroll up (existing), glass pill when scrolled (existing), `mix-blend` handled by atmosphere.

### 6.3 Full-screen menu (`src/components/SideMenu.tsx` → replace with `FullscreenMenu.tsx`)

**Layout:** full-viewport overlay, background = atmosphere bg (menu itself is a *place to change atmosphere*, see below).

```
GREENE®                    [ATMOSPHERE ●]   [CLOSE ✕]
                                  │
   WORK            ↗
   SERVICES        ↗
   LAB             ↗
   ABOUT           ↗
   CONTACT         ↗
   ——————
   PROCESS · JOURNAL   (secondary, smaller row)
   ——————
   hello@greenestudios.co · LinkedIn / Instagram / X / GitHub
   AVAILABLE FOR SELECT PROJECTS — 2026      PROJECTS — Q4 2026 / REMOTE — WORLDWIDE
```

**Animation:** items reveal `revealChars` upward, stagger 0.06s, on open (0.7s `--ease-out-expo`). Hover: the item translates 16px right, an `↗` appears, and a soft accent glow follows the cursor inside the menu (desktop). Background tints to the selected atmosphere; switching atmosphere while the menu is open animates the menu bg too. Body scroll locked (existing behavior via `document.body.style.overflow` or Lenis stop). Escape/backdrop/close button close.

### 6.4 Footer (`src/components/Footer.tsx` → v2)

Inverted block (text-colored bg, bg-colored text — existing pattern). Top → bottom:

1. CTA line: `HAVE A GOOD / PROBLEM?` (display-1) + `START A PROJECT →` (large pill) + mailto `hello@greenestudios.co` (existing style). *(Move the full CTA section onto the homepage per [§7 S13]; footer keeps a compact CTA link row.)*
2. Columns: **Menu** — `WORK SERVICES LAB ABOUT CONTACT` (LAB added; PROCESS + JOURNAL in secondary line); **Socials**; **Availability** — `PROJECTS — Q4 2026`, `REMOTE — WORLDWIDE`.
3. **Giant wordmark** `GREENE®` (`clamp(6rem, 23vw, 36rem)`, existing interactive letters, `display-1`) with the GS mark drawn inline: the mark sits at the end of the word and slowly rotates (0.05 rpm) — `(art)`.
4. Bottom bar: `© 2026 Greene Studios. All rights reserved.` · `Design & build by Greene Studios` · `EN`.

### 6.5 Page transitions (`src/components/animations/PageTransition.tsx` → v2)

Replace the current generic overlay with the **GS monogram expand** (§5.1 `exit`): on route change, a monogram at the cursor/center of the out-going page scales to cover the screen (0.9s `--ease-io-quint`), the atmosphere crossfades, the new page reveals with `revealText` on its `PageHeader`. Keep it snappy (<1.1s), skip on reduced motion, and don't block back/forward navigation.

### 6.6 Floating controls (`src/components/FloatingButtons.tsx`, `ScrollProgress.tsx`)

- Keep back-to-top (restyle to a 44px circular hairline button with `↑`, appears after 1 viewport).
- ScrollProgress becomes the nav's bottom-right ring (§6.2) — keep the component, render it inside the frame on desktop, hide on mobile.
- `NoiseTexture` (grain) — keep, per-atmosphere opacity.
- `RotatingBadge` — keep; center glyph becomes the GS mark; used only in hero (CLEAN) and footer.

---

## 7. Homepage — screen by screen

Each section: **layout / content / states / choreography / responsive**. Homepage assembly: `src/app/page.tsx` imports the new sections in the locked order ([§3.2](#32-homepage-flow-locked-from-the-brief)).

---

### S01 · HERO — THE OPENING

**Layout.** Full viewport (`min-h-[100svh]`). Layered:

```
┌──────────────────────────────────────────────┐
│ GREENE®                    ATMOSPHERE · MENU ↗│  ← nav frame
│                                              │
│        GS MONOGRAM (interactive, right 40%)  │
│                                              │
│   ● AVAILABLE FOR SELECT PROJECTS — 2026     │
│   WE MAKE                                    │
│   DIGITAL        (outlined)                  │
│   FEEL ALIVE.    (ALIVE. = accent + doodle)  │
│                                              │
│   Independent digital design studio building │
│   identities, websites & digital products.   │
│   [START A PROJECT →]  [SEE THE WORK]        │
│                                              │
│ INDEPENDENT DIGITAL STUDIO      SCROLL ↓  %  │  ← frame
└──────────────────────────────────────────────┘
```

- **Background:** the *living visual system* — `GenerativeCanvas` (new): soft Greene-green gradient blobs (CSS, `filter: blur(60px)`, slowly drifting via `@keyframes`), translucent ring/arc SVG forms, 60–100 canvas particles drifting upward (Canvas 2D, ~0.5% alpha, accent-tinted in STUDIO), floating UI fragments (2–3 skeleton cards at low opacity, parallax), grain on top. No WebGL. Paused under reduced motion (static gradient + grain).
- **GS monogram:** right side, `clamp(11rem, 26vw, 24rem)`, centered vertically. Draws in on load (G→S→ring, 2.2s, starts as loader wipes). Then interactive: magnetic hover (§5.1), drag to wobble/rotate (pointer events, `DRAG ↔`), gentle idle drift (±6px, 12s sine). On scroll it parallaxes slower than content and shrinks (`scale: 1 → 0.35`, `opacity → 0.15`, scrub) while the headline moves up.
- **Headline:** `WE MAKE / DIGITAL / FEEL ALIVE.` — `revealChars` after loader (0.9s, stagger 0.03s). "DIGITAL" = `text-outline` (existing utility); "ALIVE." = accent color + existing hand-drawn underline doodle (draw-path).
- **Status pill:** `● AVAILABLE FOR SELECT PROJECTS — 2026` — `micro` pill, hairline border, pulsing dot (existing pattern). Sub-line + two CTAs (`START A PROJECT →` primary, `SEE THE WORK` outline).

**Choreography (after loader wipe):** status pill `fadeUp` t=0 · headline chars t=0.15 · sub + CTAs t=0.6 · monogram draw t=0.2 (overlaps headline) · canvas blobs fade in t=0.8. Total ≤ 3.5s from wipe.

**Responsive:** <1024px — monogram sits *behind* the headline (absolute, 55% opacity, no drag), headline centered-left, CTAs stack. Canvas particles reduced 50%.

---

### S02 · MANIFESTO

**Layout.** `min-h-[80vh]`, centered column, `max-w-[1200px]`, generous whitespace.

```
GOOD DESIGN
ISN'T DECORATION.
────────────────────────────
It should make a business clearer.
A product easier to use.
A brand harder to forget.

                 → SCROLL TO EXPLORE
```

**Content:** display-2, "DECORATION." in `serif-i` lowercase italic + accent. Three lines appear as one sentence, words emphasized in `serif-i`. Bottom-right: giant `→` (display-1, outline) that **nudges/rotates on scroll** (tie to scrollY, ±14°) and links to `#work`; on mobile it shrinks to a `micro` label + arrow.

**Choreography:** lines `revealChars` on enter (stagger 0.05s); the three statements `fadeUp` staggered 0.15s after the headline settles; arrow parallax. Reduced motion: `fadeUp` only.

**Responsive:** stack, centered, `text-center` <1024px; arrow moves below statements.

---

### S03 · WE BUILD FOR

**Layout.** Two-column (desktop): **left = live stage** (sticky, 56% width), **right = selector list** (44%). On mobile the selector becomes a vertical stack with inline preview per row.

```
WE BUILD FOR  ✦  (kicker)

┌──────────────────────┐   01  RETAIL        ▸
│  [LIVE VISUAL PANEL] │   02  CONSUMER      ▸
│  RETAIL              │   03  EDUCATION     ▸
│  product · storefront│   04  CULTURE       ▸
│  ecommerce · type    │
└──────────────────────┘
```

**Behavior — hovering/selecting a category changes the entire visual field:**
- **Stage:** big category word (display-2, `revealChars` swap) + 4 tag chips + a large image panel that `clipReveal`s to that category's imagery + a background tint wash that crossfades.
- **Rows:** number (mono), name (h3), `▸` arrow; active row = accent text + 8px inset hairline; hover = magnetic + arrow rotate 45°.
- **Imagery map** (existing Pexels placeholders; OD-3): RETAIL → storefront/product (`mockup-1.jpg`, `branding.jpg`); CONSUMER → home/lifestyle (`branding-2.jpg`); EDUCATION → dashboard/UI (`pexels …7679662` bloom dashboard); CULTURE → experiences/editorial (`team.jpg` treated as editorial). Each category gets 1 primary + 1 secondary image.
- Each row links to `/work` (for now; later filter by industry tags — [§14](#14-data-model-changes)).

**Choreography:** stage image `clipReveal` 0.9s on change; category word chars swap 0.5s; tag chips `fadeUp` stagger 0.05s; background tint crossfade 0.8s. Auto-advance every 6s unless the user has interacted in the last 20s (pause on hover/focus).

**Accessibility:** rows are real `<button role="tab">` in a `role="tablist"` with `aria-selected`, arrow-key navigation, `aria-live="polite"` on the stage word.

**Responsive:** <1024px — selector list on top (rows), stage below (no sticky); auto-advance off.

---

### S04 · SELECTED WORK — the centerpiece

**Layout.** A tall wrapper (`h-[400vh]`) containing a `sticky top-0 h-[100svh]` stage. This is the "horizontal portfolio without horizontal scrolling."

```
┌───────────────────────────────────────────────┐
│  SELECTED WORK ✦          (kicker)   ALL WORK ↗│
│                                               │
│  01 ┃ LUMINARY            ┌─────────────────┐ │
│  ─── Brand identity       │                 │ │
│  ─── Digital product      │   PROJECT       │ │
│  ─── Web development      │   VISUAL (50%)  │ │
│  Repositioned a data      │   (clip reveal, │ │
│  platform around clarity  │    scale 1.15→1)│ │
│  and trust.               │                 │ │
│  [VIEW CASE STUDY →]      │                 │ │
│                                               │
│  ● ● ● ○   (progress rail: 01–04)            │
└───────────────────────────────────────────────┘
```

**Left column (48%):**
- Kicker + `ALL WORK ↗` link (top).
- Index + name: `01 LUMINARY` — name is display-2, swaps with `revealChars` on step change; index sits left in a progress rail (`01/02/03/04`, active dot = accent, line fills).
- Disciplines: 3 hairline rows (`Brand identity / Digital product / Web development`), each fades in with 0.05s stagger.
- Result line: one sentence (`serif-i`, secondary): *"Repositioned a data platform around clarity and trust."*
- `VIEW CASE STUDY →` (underline CTA → `/work/luminary-saas`).

**Right column (52%):** full-height media panel (`rounded-2xl`, hairline border). Per project: big image + a floating UI chip (e.g., Luminary → chart skeleton card) for depth. Transition: old image scales to 1.15 + fades out (0.5s), new image `clipReveal` 0.9s + inner scale 1.15→1 over 1.6s. In STUDIO the panel gets an accent glow border.

**Scroll choreography (the magic):**

```
scrollYProgress 0.00–0.25 → step 0 (LUMINARY)
                 0.25–0.50 → step 1 (VERA)
                 0.50–0.75 → step 2 (ARC)
                 0.75–1.00 → step 3 (BLOOM)
```

Use `framer-motion` `useScroll({ target: wrapperRef, offset: ["start start", "end end"] })` → `useTransform` to `stepIndex`; `AnimatePresence mode="wait"` for text + `motion.img` for media. `scrub` tied to scroll; the last 10% of the wrapper eases out into the next section (`opacity → 0`, `scale → 0.96`).

**Project data (locked):**

| # | Project | Disciplines | Result line |
|---|---|---|---|
| 01 | LUMINARY | Brand identity · Digital product · Web development | Repositioned a data platform around clarity and trust. |
| 02 | VERA | Brand identity · Web design · Motion | A calmer, more human wellness brand — digital first. |
| 03 | ARC | E-commerce · Development · Performance | Headless commerce with editorial storytelling. |
| 04 | BLOOM | Product design · UX research · Systems | A patient platform redesigned around calm and clarity. |

**Responsive:** <1024px — no sticky. Four full-bleed cards stacked, each `min-h-[90svh]` with name overlay + disciplines + result + `VIEW CASE STUDY →`; scroll progress rail becomes a simple counter on each card. Reduced motion: same stacked cards.

---

### S05 · HOW WE THINK

**Layout.** Three statements, each ~`min-h-[80vh]`, center-left aligned, separated by hairlines:

```
WE DON'T
DESIGN
FOR DRIBBBLE.          →  We design for people.

WE DON'T
CHASE
TRENDS.                →  We build systems that survive them.

WE DON'T
SHIP
PIXELS.                →  We build experiences that move businesses forward.
```

**Choreography (signature):** each statement pins (sticky within its 80vh) while its resolution line fades in beneath; on scroll past, the statement translates up with parallax and the next enters. Implement with `useScroll` per block or a single pinned container (ScrollTrigger-style). Simpler fallback: `revealChars` per statement + resolution `fadeUp` 0.3s later. Reduced motion = fallback.

**Content rules:** "DRIBBBLE.", "TRENDS.", "PIXELS." get the `serif-i` + accent treatment. No other copy on the section.

---

### S06 · CAPABILITIES — WHAT CAN WE BUILD?

**Layout.** Header `WHAT CAN WE BUILD?` (display-2) + kicker. Then **5 enormous rows** (hairline dividers), each:

```
01  BRAND                      Identity systems · Art direction · Brand strategy        →
02  DIGITAL                    Websites · E-commerce · Digital experiences              →
03  PRODUCT                    UI/UX · Design systems · Prototypes                      →
04  CODE                       React · Next.js · Creative development                   →
05  MOTION                     Interaction · 3D · Motion systems                        →
```

**Hover state (desktop):** row number turns accent; title scales 1.02 and translates 8px right (magnetic); the row's tag chips slide in from the right; a **live demonstration panel** appears on the right third of the section (fixed within the section, follows the row): 
- BRAND → rotating identity tiles / monogram specimen (CSS),
- DIGITAL → mini browser mockup skeleton (existing skeleton-bar pattern),
- PRODUCT → interface fragment (buttons, sliders, chart) that animates,
- CODE → animated code lines (mono, typewriter loop),
- MOTION → a looping eased dot/spring graph.
Panels are CSS/SVG only, 1.5s crossfade between rows. Rows link to `/services/{brand|digital|product|code|motion}` — map to existing slugs (`branding`, `web-design`, `ui-ux`, `frontend-dev`, `motion-design`) via a `capability → slug` map ([§14](#14-data-model-changes)).

**Responsive/mobile:** rows stack; tap expands the row inline (tags + description + mini static demo); no hover panel.

---

### S07 · LAB — WE LIKE TO EXPERIMENT.

**Layout.** Header `WE LIKE / TO EXPERIMENT.` (display-2) + kicker `A SMALL DIGITAL LABORATORY`. Then a **bento grid** (12-col): 6 cards, varying spans:

```
┌─────────────┐ ┌───────────┐
│ CURSOR      │ │ TYPOGRAPHY│
│ experiment  │ │ experiment│
├─────────────┼─────────────┤
│ MOTION      │ │ INTERACT. │
├─────────────┴─┬───────────┤
│ WEBGL 3D      │ AI        │
└───────────────┴───────────┘
```

Each card: live mini-demo (tiny canvas/CSS — e.g., Cursor = a dot following the pointer inside the card; Typography = chars that wobble on hover; Motion = spring/easing playground; Interaction = magnetic button; WebGL = simple distorted plane **or** `SOON` state; AI = prompt bar with fake-typing response **or** `SOON`), title, `micro` tech tag (`CSS · GSAP` / `CANVAS · MATTER.JS` / `WEBGL · THREE.JS` / `AI · LLM`), status chip `LIVE` / `SOON`, `data-cursor="EXPLORE"`, link to `/lab`.

**Choreography:** cards `fadeUp` stagger 0.08s + `cardHover`. Bento spans shuffle slightly on hover of the section header (`(art)`, optional). Studio accent tints the card borders/glows.

**Responsive:** <1024px — single column, cards full-width, `SOON` cards collapse to a compact row of three.

---

### S08 · PROCESS — FROM IDEA → IMPACT

**Layout.** Header `FROM IDEA → IMPACT` (display-2). Below, **5 interactive stages**:

| Stage | One-liner (locked copy) |
|---|---|
| 01 DISCOVER | Understand the business, audience and opportunity. |
| 02 DEFINE | Strategy, structure and creative direction. |
| 03 DESIGN | Identity, interface, interaction and visual system. |
| 04 BUILD | Production-quality development. |
| 05 LAUNCH | Testing, deployment and continuous improvement. |

**Desktop:** horizontal 5-column grid with a connecting hairline. Each column: outlined number (text-outline, display-3), title (h3), one-liner (`small`). **Click/tap to expand:** the column grows into a panel revealing the sub-steps it owns (from the 10-step methodology — mapping below), with a `→ /process` link. Active column gets accent top border + surface fill.

| 5-stage | 10-step mapping (content lives on `/process`) |
|---|---|
| DISCOVER | Discovery · Research |
| DEFINE | Strategy · Wireframes |
| DESIGN | Design · Prototype |
| BUILD | Development · Testing |
| LAUNCH | Launch · Support |

**Under the grid:** `Typical engagement: 4–16 weeks` (micro, with hairline rule) + `THE DETAILED PROCESS →` link.

**Mobile:** vertical accordion (one stage open at a time).

---

### S09 · BUILT WITH

**Layout.** Two counter-rotating marquee strips (existing `Marquee`, `direction` right/left), separated by a hairline, full-bleed:

```
FIGMA ✦ REACT ✦ NEXT.JS ✦ GSAP ✦ MOTION ✦ WEBGL ✦ THREE.JS ✦ LOTTIE ✦ CANVAS ✦ CSS ✦ SVG ✦ LENIS ✦
```
Second strip: same items reversed order + one special item per loop: `GREENE EXPERIMENTS →` (links `/lab`, accent-colored, `data-cursor="EXPLORE"`).

**Behavior:** hover pauses the strip (add `pauseOnHover` to marquee); items skew 4° on hover (`transition-transform`); the special item is always accent + underlined. Center label above: `BUILT WITH` kicker.

**Responsive:** both strips run on all sizes; strip 2 hidden <640px (keep one + the special item).

---

### S10 · ABOUT — SMALL STUDIO. BIG DIGITAL THINKING.

**Layout.** Split (desktop): left sticky display-2:

```
SMALL STUDIO.
BIG DIGITAL
THINKING.
```

Right column:
- One paragraph: *"Greene Studios is an independent design and technology studio focused on creating brands, digital products and experiences that people remember."* (existing copy, trimmed)
- `THE PEOPLE` subheader + people row: photo cards (real photos — OD-2; placeholders: existing `/images/hero/team*.jpg`), name, role. If solo: single card + *"Independent by design."* badge.
- Chips: `INDEPENDENT` `REMOTE-FIRST` `WORLDWIDE` `EST. 2022`.
- CTA: `MORE ABOUT THE STUDIO →` (`/studio`).

**Choreography:** headline `revealChars`; people cards `clipReveal` stagger 0.1s.

---

### S11 · PROOF — BUILT WITH PEOPLE WHO CARE.

**Layout.** Header display-2 + kicker. Body = **Selected collaborations** table (hairline rows):

```
CLIENT        PROJECT            YEAR  SERVICE          RESULT
Luminary      Analytics platform 2024  Brand · Product  +clarity & trust in product story (case study)
Vera          Wellness brand     2024  Brand · Web      Launched digital-first identity (case study)
Arc           Commerce          2024  Build · Product  Headless storefront (case study)
Bloom         Patient platform  2023  Product · UX     Redesigned patient journey (case study)
Onyx          Fintech app       2023  Product · AI     Mobile-first finance product (archive)
Prism         EdTech platform   2023  Product · Web    Learning platform UI (archive)
```

Rule per [§13.4](#134-proof--collaborations): **only verifiable quantitative results appear** ("+67% conversion" etc.). Until verified (OD-1), cells show qualitative outcomes + `(case study)` links; no invented numbers. The table header row is sticky within the section on desktop. `data-cursor="OPEN ↗"` on rows → `/work/[slug]`.

**Below the table:** a metrics band — only verified metrics (OD-1): e.g. `4–16 week engagements` · `100% senior work` · `Global, remote` — or the qualitative chips: `CLARITY` `CALM` `PERFORMANCE` `SYSTEMS` `STORY`. No unverifiable percentages.

---

### S12 · FAQ

Compact accordion (existing Radix accordion in `FAQSection.tsx`, restyled). Single column `max-w-[760px]`, centered. Items (from the brief, trimmed to 6):

1. How much does a project cost?
2. How long does it take?
3. Do you work with existing teams?
4. Can Greene handle development?
5. Do you work internationally?
6. What's included after launch? *(keep from current data)*

Hairline rows, question = h3 (400 → 700 on open), chevron rotates, answer `fadeUp` 0.3s, one-open-at-a-time. Footer of section: `Something else? hello@greenestudios.co` micro link. Answer copy: reuse `src/lib/data.ts` FAQS (trim to the six, add cost answer: *"Projects typically start around $X — exact scope determines price. Tell us what you're building and we'll give you a range within 48 hours."* — OD-1: verify pricing stance).

### S13 · CONTACT

**Layout.** Full-bleed section, atmosphere canvas background (reuse `GenerativeCanvas` at low opacity).

```
HAVE A GOOD
PROBLEM?

Tell us what you're trying to build.

[ START A PROJECT → ]        (display-3, filled accent pill — magnetic)

hello@greenestudios.co        (display-3 underline, data-cursor="MAIL")

PROJECTS          REMOTE
Q4 2026           WORLDWIDE
```

**Choreography:** headline `revealChars`; button `cardHover` + magnetic; availability chips `fadeUp`. Links: button → `/contact` (form page), email → `mailto:hello@greenestudios.co`.

### S14 · FOOTER

As specified in [§6.4](#64-footer-srccomponentsfootertsx--v2). The footer is the *closing beat*: giant `GREENE®` + tiny rotating GS mark. The `CTASection` component is retired from the homepage (its content is absorbed by S13 + footer CTA row) — keep the component for sub-pages' bottom CTAs.

---

## 8. Sub-pages — screen by screen

All sub-pages keep the `PageHeader` pattern (kicker + display title + optional right slot) and the atmosphere chrome. Shared rule: each page opens with `PageTransition` (monogram wipe) + `revealText` on the header.

### 8.1 `/work` — Work index

- **Layout:** alternating editorial compositions, **no repetitive cards**:
  - Row A (Luminary): full-width `aspect-[21/9]` image, title overlay bottom-left, disciplines + outcome + `VIEW CASE STUDY →`.
  - Row B (Vera + Arc): two-column split (`aspect-[4/3]` each), left-aligned text.
  - Row C (Bloom): full-width but reversed text (right-aligned), `aspect-[16/7]`.
  - Row D (Onyx + Prism + archive link): three compact tiles.
- Keep the filter bar (refine labels to disciplines: `All · Brand · Digital · Product · Code · Motion`), it filters the archive section only.
- Each tile: `clipReveal` on enter, `cardHover`, `data-cursor="VIEW →"`.
- Header right slot: `06` projects count (text-outline) — update dynamically with filters.

### 8.2 `/work/[slug]` — Cinematic case study

Rewrite the case-study body into the locked chapter structure (existing data supports it — `challenge`, `goals`, `approach[]`, `results[]`, `lessons` map onto chapters):

```
[HERO]      full-bleed project image (priority, gradient scrim)
            category chip · year · title display-1 · one-line description
            ↓ (scroll indicator)

[01 THE PROBLEM]   challenge as a large statement (display-3, serif-i accents)
[02 THE BEFORE]    "before" visual: current-state mockup / annotated screenshot
[03 THE IDEA]      transformation: split visual BEFORE → AFTER with clipReveal
[04 THE SYSTEM]    brand assets row · UI screens · typography specimen · component grid
[05 THE EXPERIENCE] desktop animation demo (motion stills or loop) + mobile/desktop layout pair
[06 THE RESULT]    outcomes — verified numbers only (OD-1); otherwise qualitative + client context
[07 NEXT PROJECT →] big link to next slug (Vera after Luminary, etc.), with its image
```

- Left sticky chapter rail (desktop): `01–06` micro dots with active state, `data-cursor="GO"`.
- Media per chapter: existing project `image` + Pexels placeholders; local assets later (OD-3).
- Choreography: chapter headers `revealText`, images `clipReveal`, result numbers count-up via existing `AnimatedNumbers` (only for verified metrics).
- Data: add `chapters` or derive from existing fields ([§14](#14-data-model-changes)). `related` projects at the bottom (existing) → replaced by the `NEXT PROJECT` chapter.

### 8.3 `/services` + `/services/[slug]`

- **Index:** exactly the §7 S06 rows (shared component `CapabilitiesList`), with `BRAND → /services/branding`, `DIGITAL → /services/web-design`, `PRODUCT → /services/ui-ux`, `CODE → /services/frontend-development`, `MOTION → /services/motion-design`. Title = `WHAT CAN WE BUILD?`. Right slot = `DISCUSS YOUR NEEDS →`.
- **Detail pages:** keep existing content (deliverables, who it's for, approach) — restyle header to display-2 + capability number, add a mini-demo visual at top (reuse §S06 panel), keep `PricingTiers` on applicable pages.
- Add canonical slugs: `brand`, `digital`, `product`, `code`, `motion` → `redirect()` to existing slugs (Next.js route alias) so the URL structure matches the new naming; keep old URLs working.

### 8.4 `/lab` — Experiments

New page (keep `/experiments` rendering the same component, or `redirect`). Layout: hero `WE LIKE / TO EXPERIMENT.` + grid of the six experiments as **full-size interactive demos** (same card component as §S07, scaled up, 2-col grid). Each demo is a self-contained component in `src/components/lab/`. `SOON` items show a locked teaser (monogram + `IN THE LAB — SOON`). Add journal cross-link: `READ: WHY WE EXPERIMENT →`.

### 8.5 `/studio` — About

Repurpose the current studio-mode demo page → real About page (keep a hidden route `/studio/demo` or move the demo to `/lab` if the atmosphere demo is worth preserving).

- Hero: `SMALL STUDIO. / BIG DIGITAL THINKING.` + paragraph.
- `THE PEOPLE` (OD-2) · `THE PHILOSOPHY` (the three §S05 statements + the three v1 principles as sub-detail) · `THE CAPABILITIES` (compact 5-chip grid) · `THE PROCESS` (compact 5-stage strip) · CTA.
- `/about` → keep as an alias page with the same content (or `redirect('/studio')`).

### 8.6 `/process`

Full methodology page: header `FROM IDEA → IMPACT`; the 5-stage sticky-nav (scrollspy) down the left; each stage section contains its sub-steps as rich blocks (reuse existing `PROCESS_STEPS` data — 10 steps grouped by the §S08 mapping), each with duration chip + description + deliverables; end with `TYPICAL ENGAGEMENT: 4–16 WEEKS` + CTA. Interactive: stage nav highlights on scroll (`useSectionAnimation`), sub-steps `fadeUp` staggered.

### 8.7 `/journal` + article

Light restyle only: header keeps editorial style; index cards get `cardHover` + discipline tags; article page keeps `prose` styling, adds reading-progress hairline at top (`ScrollProgress` variant) and a `NEXT ARTICLE →` link.

### 8.8 `/contact`

`HAVE A GOOD PROBLEM?` hero (display-1). Below: form (name, email, company, budget select, message) in a hairline card + right column with availability (`PROJECTS — Q4 2026`, `REMOTE — WORLDWIDE`), email, socials. Submit → mailto fallback or existing handler; success state: monogram draws + `MESSAGE RECEIVED — WE REPLY WITHIN 48H.` Keep the page server-rendered; form is a client component.

### 8.9 `/404`, `/legal`, `/pricing`, `/careers`, `/resources`

- 404: full-screen — giant `GOOD DESIGN / KNOWS BETTER.` + `THIS PAGE DOESN'T EXIST` micro + GS mark (draws on mount) + `BACK TO THE STUDIO →` (home). 
- Others: PageHeader restyle only (already handled by shared `PageHeader`); update nav links (add LAB, drop Process from primary nav per §3 menu: primary = WORK · SERVICES · LAB · ABOUT · CONTACT; secondary = PROCESS · JOURNAL).

---

## 9. Component system

### 9.1 Existing → v2 mapping

| Current component | v2 fate | Notes |
|---|---|---|
| `Preloader.tsx` | **Replace** | → `Loader` (GS draw-in, §6.1) |
| `Navbar.tsx` | **Restyle** | Minimal frame: wordmark + ATMOSPHERE + MENU ↗; corners frame §6.2 |
| `SideMenu.tsx` | **Replace** | → `FullscreenMenu.tsx` (§6.3) |
| `StudioSideMenu.tsx` | **Remove** | (studio demo artifact) |
| `Footer.tsx` | **Restyle** | §6.4 (add LAB link, GS mark, compact CTA) |
| `DynamicCursor.tsx` | **Restyle** | → atmosphere-aware + STUDIO trail (§5.3) |
| `CustomCursor.tsx` | **Remove** | (superseded by DynamicCursor v2) |
| `SmoothScroll.tsx` | **Keep** | add `prefersReducedMotion: true` |
| `ScrollProgress.tsx` | **Restyle** | → nav bottom-right ring (desktop) |
| `PageTransition.tsx` | **Replace** | → GS monogram expand (§6.5) |
| `FloatingButtons.tsx` | **Restyle** | circular hairline back-to-top |
| `NoiseTexture.tsx` | **Keep** | per-atmosphere opacity |
| `ClientWrapper.tsx` | **Keep** | |
| `RotatingBadge.tsx` | **Restyle** | center glyph → GS mark |
| `Logo.tsx` | **Replace** | → `GSMark.tsx` (§5.1) |
| `Marquee.tsx` | **Keep** | add `pauseOnHover` prop |
| `ExperienceHero.tsx` | **Replace** | → `HeroSection.tsx` (§7 S01) |
| `WhyWeExist.tsx` | **Remove** | absorbed into hero sub + manifesto |
| `Philosophy.tsx` | **Replace** | → `ManifestoSection.tsx` + `HowWeThinkSection.tsx` |
| `SelectedWork.tsx` | **Replace** | → `StickyWorkShowcase.tsx` (§7 S04) |
| `ServicesSection.tsx` | **Replace** | → `CapabilitiesSection.tsx` (§7 S06) |
| `ProcessSection.tsx` | **Replace** | → v2 interactive 5-stage (§7 S08) |
| `SocialProof.tsx` | **Replace** | → `ProofSection.tsx` (§7 S11) |
| `TestimonialsSection.tsx` | **Remove** | unless verified (OD-1) → quote band in Proof |
| `FAQSection.tsx` | **Restyle** | compact accordion (§7 S12) |
| `CTASection.tsx` | **Keep** | sub-page bottom CTAs only; homepage uses S13 |
| `AtmosphereContext.tsx` | **Restyle** | rename `paper→clean`, 7 accents, persist, animate |
| `data.ts` | **Restyle** | schema additions (§14) |

### 9.2 New components

| Component | File | Props (key ones) |
|---|---|---|
| `GSMark` | `src/components/ui/GSMark.tsx` | `state: 'idle'\|'drawing'\|'exit'`, `size`, `className`, `onDrawComplete` |
| `GenerativeCanvas` | `src/components/canvas/GenerativeCanvas.tsx` | `intensity`, `accent` (from context), `interactive` (hero) |
| `AtmosphereSwitcher` | `src/components/ui/AtmosphereSwitcher.tsx` | `variant: 'nav'\|'menu'`, `align` |
| `FullscreenMenu` | `src/components/FullscreenMenu.tsx` | `isOpen`, `onClose` |
| `HeroSection` | `src/components/home/HeroSection.tsx` | — |
| `ManifestoSection` | `src/components/home/ManifestoSection.tsx` | — |
| `IndustrySelector` | `src/components/home/IndustrySelector.tsx` | — |
| `StickyWorkShowcase` | `src/components/home/StickyWorkShowcase.tsx` | `projects` (4) |
| `HowWeThinkSection` | `src/components/home/HowWeThinkSection.tsx` | `statements` |
| `CapabilitiesSection` | `src/components/home/CapabilitiesSection.tsx` | `capabilities` |
| `LabSection` | `src/components/home/LabSection.tsx` | `experiments` |
| `TechMarquee` | `src/components/home/TechMarquee.tsx` | `items`, `specialItem` |
| `AboutSection` | `src/components/home/AboutSection.tsx` | `people` |
| `ProofSection` | `src/components/home/ProofSection.tsx` | `collaborations` |
| `ContactSection` | `src/components/home/ContactSection.tsx` | — |
| `CaseStudyChapters` | `src/components/work/CaseStudyChapters.tsx` | `project`, `next` |
| `LabCard` / `lab/*` demos | `src/components/lab/` | `experiment`, `live` |

All new components are `"use client"` where interactive, `motion`-based, mode-aware via `useAtmosphere`, and reduced-motion-aware via `useReducedMotion`.

---

## 10. Animation choreography reference

### 10.1 Global timings

| Event | Duration | Ease | Notes |
|---|---|---|---|
| Loader draw-in | 2.2s | `--ease-out-expo` | G 0→1.0 · S 0.5→1.6 · ring 1.4→2.2 |
| Loader exit (monogram expand) | 0.9s | `--ease-io-quint` | scale to cover viewport |
| Page transition | 1.1s total | `--ease-io-quint` | 0.9 expand + 0.2 crossfade |
| Atmosphere morph | 0.8s | `--ease-io-quint` | token cross-fade + canvas re-tint |
| Menu open | 0.7s | `--ease-out-expo` | items stagger 0.06s |
| Text line reveal | 0.9s | `--ease-out-expo` | stagger 0.08s |
| Character reveal | 0.9s | `--ease-out-expo` | stagger 0.03s |
| Clip-path image reveal | 1.1s | `--ease-out-expo` | inner scale 1.15→1, 1.6s |
| Card fade-up | 0.7s | `--ease-out-quart` | stagger 0.08s |
| Card hover | 0.45s | `--ease-out-quart` | scale 0.98→1 |

### 10.2 Per-section cue sheet (homepage)

| Section | On enter | On interaction | On scroll |
|---|---|---|---|
| S01 Hero | status pill 0.0 · headline chars 0.15 · sub/CTAs 0.6 · monogram draw 0.2 · canvas 0.8 | monogram magnetic/drag | monogram parallax + shrink, blobs drift |
| S02 Manifesto | lines chars 0.05s stagger | — | arrow rotates ±14° |
| S03 We build for | stage clipReveal 0.9 | category swap: image clipReveal 0.9 + word chars 0.5 + chips 0.05 | stage sticky |
| S04 Work | step 0 media clipReveal | — | steps swap on 0–25–50–75% |
| S05 How we think | statement chars 0.06 | — | pin + resolution fade 0.3 |
| S06 Capabilities | rows fadeUp 0.08 | hover panel crossfade 1.5 | — |
| S07 Lab | cards fadeUp 0.08 | cardHover | — |
| S08 Process | columns fadeUp 0.1 | expand panel 0.5 `--ease-out-quart` | — |
| S09 Built with | strips slide in | pause on hover, item skew | — |
| S10 About | headline chars; people clipReveal 0.1 | — | — |
| S11 Proof | rows fadeUp 0.06 | row arrow → | sticky header row |
| S12 FAQ | rows fadeUp 0.05 | answer fadeUp 0.3, chevron 0.3 | — |
| S13 Contact | headline chars | button magnetic + hover | canvas low parallax |

### 10.3 Rules

1. Never run more than one `revealChars` sequence in the same viewport.
2. All entrance animations run once (existing `whileInView` with `once: true`) except hero (on load) and S04 (scroll-driven).
3. `prefers-reduced-motion`: replace every transform/duration sequence with opacity crossfades ≤ 0.4s; disable marquees (static wrap), particles, trail, parallax, sticky work (→ stacked cards).
4. GPU-friendly only: `transform` + `opacity` + `clip-path`; no layout animations on scroll.

---

## 11. Responsive behavior

Breakpoints: `mobile < 640 · tablet 640–1024 · desktop ≥ 1024 · large ≥ 1440`.

| Feature | Mobile (<640) | Tablet (640–1024) | Desktop (≥1024) |
|---|---|---|---|
| Nav frame corners | hidden | hidden | visible |
| Nav | wordmark + MENU ↗ (ATMOSPHERE pill icon-only) | full pills | full pills |
| Hero | monogram behind text (55% opacity), no drag | monogram right, 40% width | full spec |
| S03 We build for | rows stacked with inline preview | rows + stage (no sticky) | sticky stage + list |
| S04 Work | stacked full-bleed cards | stacked cards | sticky 400vh walk |
| S06 Capabilities | tap-expand rows | tap-expand rows | hover demo panel |
| S07 Lab | single column | 2-col bento | full bento |
| S08 Process | vertical accordion | horizontal, tap-expand | horizontal, tap-expand |
| S09 Built with | 1 strip | 2 strips | 2 strips |
| Menu | full-screen (all sizes) | full-screen | full-screen |
| Type | all `clamp()` — no media-query overrides needed except hero grid | | |
| Cursor | disabled (coarse) | disabled | enabled + labels |

---

## 12. Accessibility & performance

### 12.1 Accessibility

- **Semantics:** `header/nav/main/section/footer` landmarks; one `h1` per page; sections get `aria-labelledby` from their kickers.
- **Contrast:** verify all token pairs ≥ WCAG AA (4.5:1 text, 3:1 large): notably `--brand-text-secondary` on `--brand-bg` in every mode (midnight secondary at 0.58 alpha on #0B0D0C ≈ 6.9:1 — OK; keep alpha ≥ 0.55).
- **Keyboard:** full focus-visible treatment (2px accent outline + offset); IndustrySelector = tablist; accordion = native Radix; menu = focus trap + restore; switcher = menu pattern.
- **Motion:** `prefers-reduced-motion` honored globally (rules in §10.3); no autoplaying motion > 5s without pause.
- **Images:** `alt` on all meaningful images (decorative = `alt=""`); project visuals get descriptive alt.
- **Text:** no critical copy inside animated SVG; monogram is `aria-hidden` where decorative; loader content is hidden from AT (`aria-hidden` + page content remains accessible immediately — loader is visual only, existing pattern).
- **Targets:** ≥44px hit areas; focus never trapped by cursor (`cursor:none` only on fine pointers).

### 12.2 Performance budgets (must hold in CLEAN, MIDNIGHT, STUDIO)

| Metric | Budget |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse performance | ≥ 90 (mobile) |
| Total JS (homepage, gzip) | < 400KB |
| Canvas/particle loop | ≤ 60fps, pauses off-screen (IntersectionObserver) |

**Techniques:** local AVIF/WebP with `sizes`; hero image `priority`; all others lazy; `content-visibility: auto` on below-fold sections (with `contain-intrinsic-size` to protect CLS); no WebGL by default (§12.3); poster/static fallback for any video; `next/image` `unoptimized` stays for remote Pexels placeholders (sandbox/network reality) but production imagery is local; Lenis `autoRaf` off (existing manual raf is fine); dynamic import for `GenerativeCanvas` particles and lab demos (`next/dynamic`, `ssr: false` where needed).

### 12.3 WebGL policy

- Default: CSS + SVG + GSAP/Motion + Canvas 2D for the whole site (as the brief demands — 80–90% of the experience).
- Three.js/OGL allowed ONLY in `/lab` experiments (WebGL demo) and never on the homepage path.
- Guard: `webgl-availability` check; fallback = static gradient/monogram card.

---

## 13. Content plan

### 13.1 Keep (with light edits)

Hero sub, manifesto lines, capabilities copy (from brief), process one-liners, FAQ answers (trimmed), contact copy, about paragraph (trimmed), footer links, journal content, service detail content, project challenges/approaches/lessons (they map to case-study chapters).

### 13.2 Rewrite / move

| Current | Action |
|---|---|
| "Design that can't be ignored." tagline | → loader caption `THE DIGITAL STUDIO`; hero uses new headline |
| 10-step process section (home) | → `/process` page; homepage gets 5 stages |
| 3 philosophy cards (home) | → "How we think" statements (home) + philosophy detail on `/studio` |
| "Trusted by ambitious teams" marquee | **Remove** (implies clients that may not exist) → collaborations table |
| Hero stat chips (98%, 40+) | **Remove** until verified (OD-1) |
| Testimonials (Sarah Chen et al.) | **Remove** until verified; if verified → quote band in Proof with attribution + project link |
| `WE BUILD FOR` four text items | → visual selector (S03) with new labels RETAIL/CONSUMER/EDUCATION/CULTURE |

### 13.3 Locked new copy (already in §1.3)

### 13.4 Proof & collaborations — the honesty rule

> **An award-quality site cannot look fabricated.** If a number can't be defended in a conversation with the client named next to it, it does not go on the site.

- Verified path (OD-1 = yes): show metrics with client permission + case-study evidence; add `AnimatedNumbers`.
- Default path (OD-1 = no): qualitative outcomes only; rows link to case studies; metrics band uses non-numeric facts (engagement lengths, seniority, reach).
- Delete `METRICS` entries not verifiable; keep `40+ projects shipped` only if true (OD-1) — otherwise drop the numeric claim entirely.

### 13.5 Legal / privacy

Keep existing legal page; add a line in footer about remote operation; no new tracking beyond current (none — state that explicitly on /legal as a selling point).

---

## 14. Data model changes

All in `src/lib/data.ts` (keep old fields; add new ones so existing pages don't break):

```ts
// PROJECTS — add per project:
export interface Project {
  // …existing fields (id, title, category, year, description, tags,
  //   color, accentColor, featured, image, results, slug,
  //   challenge, goals, approach[], lessons)
  disciplines: string[];      // ["Brand identity","Digital product","Web development"]
  outcome: string;            // one-line result for StickyWorkShowcase
  industry?: "retail" | "consumer" | "education" | "culture";
  media: { src: string; alt: string }[];  // chapter imagery (extend later)
}

// SERVICES — regroup + alias map:
export const CAPABILITIES = [
  { id: "brand",   title: "BRAND",   subItems: ["Identity systems","Art direction","Brand strategy"], slug: "branding" },
  { id: "digital", title: "DIGITAL", subItems: ["Websites","E-commerce","Digital experiences"],       slug: "web-design" },
  { id: "product", title: "PRODUCT", subItems: ["UI/UX","Design systems","Prototypes"],                slug: "ui-ux" },
  { id: "code",    title: "CODE",    subItems: ["React","Next.js","Creative development"],             slug: "frontend-development" },
  { id: "motion",  title: "MOTION",  subItems: ["Interaction","3D","Motion systems"],                  slug: "motion-design" },
]; // existing SERVICES array stays for /services/[slug] pages

// PROCESS — group the 10 steps into the 5 stages:
export const PROCESS_STAGES = [
  { id: "discover", title: "DISCOVER", blurb: "…", stepIds: ["01","02"] },
  { id: "define",   title: "DEFINE",   blurb: "…", stepIds: ["03","04"] },
  { id: "design",   title: "DESIGN",   blurb: "…", stepIds: ["05","06"] },
  { id: "build",    title: "BUILD",    blurb: "…", stepIds: ["07","08"] },
  { id: "launch",   title: "LAUNCH",   blurb: "…", stepIds: ["09","10"] },
];

// New exports:
export const STUDIO_ACCENTS = [
  { id: "forest", name: "FOREST", hex: "#2F5D4E" }, /* …moss, teal, lime, amber, violet, coral */
];
export const EXPERIMENTS = [
  { id: "cursor",      title: "Cursor experiment",      tech: "CSS · JS",      status: "live" },
  { id: "typography",  title: "Typography experiment", tech: "SPLIT-TYPE",     status: "live" },
  { id: "motion",      title: "Motion experiment",     tech: "MOTION",         status: "live" },
  { id: "interaction", title: "Interaction experiment",tech: "FRAMER-MOTION",  status: "live" },
  { id: "webgl",       title: "WebGL experiment",      tech: "THREE.JS",       status: "soon" },
  { id: "ai",          title: "AI experiment",         tech: "LLM",            status: "soon" },
];
export const TECH_STACK = ["FIGMA","REACT","NEXT.JS","GSAP","MOTION","WEBGL","THREE.JS","LOTTIE","CANVAS","CSS","SVG","LENIS"];
export const COLLABORATIONS = [ /* client, project, year, service, result, slug — per §7 S11 */ ];
```

---

## 15. Build prompt

> Copy-paste prompt for a developer or coding agent working in **this repo** (`/home/user/Greene-Studios`):

---

You are rebuilding the Greene Studios website (Next.js 14 App Router, React 18, Tailwind CSS 4, framer-motion 12, Lenis, self-hosted Archivo Variable via Fontsource — do NOT add Google Fonts, do NOT use any external font CDN, and do NOT add Three.js/WebGL anywhere except the /lab page; network access at build time is restricted, so keep all assets local or use the existing `next/image` `unoptimized` pattern for remote placeholders).

Read `REDESIGN-SPEC.md` in the repo root and implement it in full. The concept is **"GREENE / THE DIGITAL STUDIO" — an editorial digital studio operating inside a living canvas.** The existing site already has: an atmosphere system (`src/lib/context/AtmosphereContext.tsx` with `mode-paper|midnight|studio` classes + accent map), a Preloader, Navbar + SideMenu, DynamicCursor with `data-cursor` labels, Lenis SmoothScroll, ScrollProgress, PageTransition, NoiseTexture, RotatingBadge, Marquee components, and structured data in `src/lib/data.ts` (PROJECTS with challenge/goals/approach/results, SERVICES, PROCESS_STEPS, FAQS). Build on that foundation — do not delete working infrastructure; restyle/replace per the component mapping in §9.

Work in this order:
1. **Design tokens** — apply Appendix A token block to `src/app/globals.css` (rename `mode-paper` → `mode-clean`, keep alias). Keep Tailwind `@theme` mappings working.
2. **Context** — update `AtmosphereContext`: modes `clean | midnight | studio`, seven studio accents (FOREST MOSS TEAL LIME AMBER VIOLET CORAL), `localStorage` persistence, 0.8s animated token cross-fade, expose `accentHex/accentSoft/accentGlow`.
3. **Signature elements** — `GSMark` SVG monogram (draw-in states), `GenerativeCanvas` (CSS gradients + Canvas 2D particles, no WebGL), `AtmosphereSwitcher` popover, cursor v2 (atmosphere-aware + STUDIO trail, labels `VIEW → DRAG ↔ PLAY → OPEN ↗ EXPLORE GO MENU CLOSE HELLO MAIL SCROLL ATMOSPHERE MODE`).
4. **Global chrome** — Loader (GS draw-in → monogram expand wipe), minimal Navbar (GREENE® · ATMOSPHERE · MENU ↗ + desktop corner frame: bottom-left `INDEPENDENT DIGITAL STUDIO` rotating status, bottom-right `SCROLL ↓` progress ring), FullscreenMenu (huge revealChars links WORK/SERVICES/LAB/ABOUT/CONTACT + PROCESS/JOURNAL secondary + atmosphere switcher inside), Footer (giant GREENE® wordmark + rotating GS mark + LAB link), PageTransition (GS monogram expand).
5. **Homepage** — rebuild `src/app/page.tsx` sections in this exact order: Hero (WE MAKE DIGITAL FEEL ALIVE. + interactive GS mark + status pill `AVAILABLE FOR SELECT PROJECTS — 2026`), Manifesto (GOOD DESIGN ISN'T DECORATION. + → SCROLL TO EXPLORE), We build for (interactive RETAIL/CONSUMER/EDUCATION/CULTURE selector with visual stage), Selected Work (sticky 400vh scroll walk: LUMINARY→VERA→ARC→BLOOM with left info column + right media panel swapping via `useScroll`), How we think (WE DON'T DESIGN FOR DRIBBBLE./CHASE TRENDS./SHIP PIXELS. + resolution lines), Capabilities (WHAT CAN WE BUILD? — BRAND/DIGITAL/PRODUCT/CODE/MOTION rows with hover demo panels), Lab (WE LIKE TO EXPERIMENT. — 6 bento cards, live demos for cursor/typography/motion/interaction, SOON for webgl/ai), Process (FROM IDEA → IMPACT — 5 interactive stages with the 10-step mapping, `Typical engagement: 4–16 weeks`), Built with (counter-rotating tech marquees with `GREENE EXPERIMENTS →` special item), About (SMALL STUDIO. BIG DIGITAL THINKING. + THE PEOPLE), Proof (BUILT WITH PEOPLE WHO CARE. — Selected collaborations table, NO unverified numbers), FAQ (compact 6-item accordion), Contact (HAVE A GOOD PROBLEM? + START A PROJECT → + availability), Footer.
6. **Sub-pages** — case-study chapters (PROBLEM/BEFORE/IDEA/SYSTEM/EXPERIENCE/RESULT/NEXT PROJECT) on `/work/[slug]`; editorial Work index; Services index = capability rows with alias routes `brand|digital|product|code|motion` redirecting to existing slugs; new `/lab` page (keep `/experiments`); `/studio` = about page (repurpose current demo); `/process` = 10-step methodology grouped under the 5 stages; contact page with form; 404 (`GOOD DESIGN KNOWS BETTER.`).
7. **Data** — extend `src/lib/data.ts` per §14 (`disciplines`, `outcome`, `CAPABILITIES`, `PROCESS_STAGES`, `STUDIO_ACCENTS`, `EXPERIMENTS`, `TECH_STACK`, `COLLABORATIONS`). Do not fabricate client results: until verified, Proof uses qualitative outcomes.
8. **QA** — `npm run dev` and verify: all three atmospheres render with correct contrast; `prefers-reduced-motion` disables marquees/particles/sticky; keyboard navigation works for the industry selector, accordion, menu, switcher; Lighthouse mobile ≥ 90; CLS < 0.1; LCP < 2.5s. Fix anything that breaks the live preview (bind to 0.0.0.0, no localhost calls from browser code, no host allowlists that reject the preview origin).

Constraints: CSS + SVG + Canvas 2D for ~90% of motion (Three.js ONLY in /lab); one family (Archivo Variable) for all type; every animation honors `useReducedMotion`; `data-cursor` labels on all interactive targets; sections use `py-24 md:py-36`, `max-w-[1400px] px-5 md:px-10`, kicker `✦` pattern. Do not ship any copy that claims unverifiable client results (see OD-1 in the spec).

Acceptance: the homepage reads **show → intrigue → explain → prove → convert**; the site feels like "this could only be Greene Studios"; the existing routes keep working; the build passes `npm run lint` and `npm run typecheck`.

---

## 16. Implementation roadmap & acceptance criteria

| Phase | Scope | Acceptance |
|---|---|---|
| **0 · Foundation** (0.5 day) | Appendix A tokens, context renames + persistence, GSMark + GenerativeCanvas + AtmosphSwitcher | Modes switch with 0.8s morph; accents tint studio; tokens drive existing components |
| **1 · Chrome** (1–1.5 days) | Loader, Navbar frame, FullscreenMenu, Footer v2, PageTransition, cursor v2, FloatingButtons/ScrollProgress restyle | Menu/footer/loader work in all 3 modes; monogram transition on route change; keyboard + reduced-motion verified |
| **2 · Homepage core** (2–3 days) | S01–S04 (Hero, Manifesto, We build for, StickyWork) | Hero choreography clean; sticky work walk tracks 4 projects; mobile fallbacks correct |
| **3 · Homepage body** (1.5–2 days) | S05–S10 (How we think, Capabilities, Lab, Process, Built with, About) | All sections animate once; hover demos work; content matches §1.3 copy |
| **4 · Homepage close** (0.5–1 day) | S11–S14 (Proof, FAQ, Contact, Footer) + remove Testimonials | No unverified numbers; FAQ accessible; CTA paths verified |
| **5 · Sub-pages** (2–3 days) | Case-study chapters, Work index, Services + aliases, Lab page, Studio/About, Process page, Contact, 404 | Every route renders in all modes; case studies follow chapter structure |
| **6 · Data & content** (0.5–1 day) | `data.ts` additions, copy pass, OD-1–6 decisions applied | No fabricated claims; data model documented |
| **7 · QA & perf** (1 day) | Lighthouse, CLS/LCP/INP, reduced-motion audit, cross-browser, preview check | Budgets in §12.2 hold; a11y audit passes; live preview works |

**Total ≈ 9–13 focused days** for one developer; the phases are independently shippable.

---

## Appendix A. CSS token block

Paste-ready draft for `src/app/globals.css` (replaces the v1 token values; keep `@theme` and utilities):

```css
/* ─── Brand core ─────────────────────────────────────────────── */
:root {
  --gs-green: #1F3D3A;      /* Greene Green — identity, never changes */
  --gs-green-soft: #526B65; /* Secondary Green */
  --gs-warm-white: #F5F4EF; /* Warm White */
  --gs-ink: #0B0D0C;        /* Ink */
  --gs-lime: #C9F24B;       /* electric moments only */
}

/* ─── CLEAN (default) ────────────────────────────────────────── */
:root, .mode-clean, .mode-paper {
  --brand-bg: var(--gs-warm-white);
  --brand-surface: #FBFAF6;
  --brand-surface-secondary: #E9E6DB;
  --brand-border: #DAD6C8;
  --brand-text: var(--gs-ink);
  --brand-text-secondary: #5D655F;
  --brand-accent: var(--gs-green);
  --brand-on-accent: var(--gs-warm-white);
  --cta-bg: var(--brand-accent); --cta-fg: var(--brand-bg);
  --cta-btn-bg: var(--brand-bg); --cta-btn-fg: var(--brand-accent);
  --cta-border: var(--brand-bg);
  --grain-opacity: 0.03;
}

/* ─── MIDNIGHT ───────────────────────────────────────────────── */
.mode-midnight {
  --brand-bg: var(--gs-ink);
  --brand-surface: rgba(18, 22, 21, 0.72);
  --brand-surface-secondary: #191E1C;
  --brand-border: rgba(245, 244, 239, 0.14);
  --brand-text: var(--gs-warm-white);
  --brand-text-secondary: rgba(245, 244, 239, 0.58);
  --brand-accent: #6E9E8B;
  --brand-on-accent: var(--gs-ink);
  --cta-bg: var(--brand-accent); --cta-fg: var(--brand-bg);
  --cta-btn-bg: var(--brand-bg); --cta-btn-fg: var(--brand-accent);
  --cta-border: var(--brand-bg);
  --grain-opacity: 0.05;
}

/* ─── STUDIO ─────────────────────────────────────────────────── */
.mode-studio {
  --brand-bg: #0C1613;
  --brand-surface: #13211B;
  --brand-surface-secondary: #19291F;
  --brand-border: rgba(245, 244, 239, 0.16);
  --brand-text: var(--gs-warm-white);
  --brand-text-secondary: rgba(245, 244, 239, 0.62);
  --brand-accent: var(--studio-accent, var(--gs-lime));
  --brand-on-accent: var(--gs-ink);
  --cta-bg: var(--studio-accent, var(--gs-lime));
  --cta-fg: var(--brand-ink); --cta-btn-bg: var(--brand-ink);
  --cta-btn-fg: var(--studio-accent, var(--gs-lime));
  --cta-border: var(--brand-ink);
  --grain-opacity: 0.04;
}

/* Studio accent values (set on <html> by AtmosphereContext) */
[data-studio-accent="forest"] { --studio-accent: #2F5D4E; }
[data-studio-accent="moss"]   { --studio-accent: #8FAE7B; }
[data-studio-accent="teal"]   { --studio-accent: #2EC4B6; }
[data-studio-accent="lime"]   { --studio-accent: #C9F24B; }
[data-studio-accent="amber"]  { --studio-accent: #FFB25C; }
[data-studio-accent="violet"] { --studio-accent: #8B7CF6; }
[data-studio-accent="coral"]  { --studio-accent: #FF6F61; }

/* ─── Motion ─────────────────────────────────────────────────── */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-io-quint: cubic-bezier(0.83, 0, 0.17, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --dur-micro: 0.2s; --dur-fast: 0.4s; --dur-base: 0.7s;
  --dur-slow: 1.1s; --dur-cinematic: 1.8s;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.4s !important; transition-duration: 0.4s !important; }
}
```
