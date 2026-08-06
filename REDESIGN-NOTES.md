# Greene Studios — Site Redesign Notes

## Direction

**Concept:** *"The studio that makes brands impossible to ignore."*

The redesign moves Greene Studios from a generic premium-agency look to a confident,
editorial studio identity: warm paper canvas, ink-black display type, one loud lime
accent, playful sticker details, giant marquees, and premium motion. It is built to
feel like the site itself is the studio's best portfolio piece.

---

## What was studied & borrowed

| Reference | Borrowed idea |
|---|---|
| **Google Antigravity** | Letter-by-letter hero reveal, "liftoff" entrance timeline, glow/atmosphere layers |
| **Buck Sauce** | Loud one-line copy, sticker/badge details, marquee strips, personality |
| **Cardtonic Upskill** | Big color-blocked CTA section, badge + burst stickers, "✦" separators |
| **FunTown Studio** | Playful energy, floating shapes/stamps, confident short headlines |
| **No Football Colors** | Editorial giant type, "No. Clubs. No Colors." style repeated marquees, warm paper background |
| **Red Antler** | Statement hero ("We partner with rule-breakers…"), big project list with hover preview images |
| **Karolina Hess** | Minimal hero statement, serif-italic accent lines ("No templates, no shortcuts.") |
| **Noomo / DeepMind / Google Labs** | Immersive backgrounds, card systems, premium motion pacing |
| **Umano** | Clear value-prop hierarchy, trust chips |
| **Bloom / Westwing** | (Content/e-commerce references) — informed editorial layout restraint |

---

## Design system

### Palette (CSS tokens — three atmospheres)

| Token | Paper (default) | Midnight | Studio (greenhouse) |
|---|---|---|---|
| `--brand-bg` | `#F1EEE5` warm paper | `#10110C` | `#10241A` |
| `--brand-surface` | `#FAF8F1` | `#171812` | `#183221` |
| `--brand-border` | `#D8D1BF` | `#2C2D22` | `#36533F` |
| `--brand-text` (ink) | `#14120E` | `#F1EEE5` | `#EEF6E8` |
| `--brand-accent` (lime) | `#D9F42C` | `#D9F42C` | `#D9F42C` |
| `--brand-primary` (deep green) | `#173A2E` | `#D9F42C` | `#D9F42C` |

### Typography (self-hosted via Fontsource — no external font CDN needed at build)
- **Display:** Archivo Variable — giant uppercase headlines (`font-display`)
- **Editorial accent:** Instrument Serif italic — emphasis words (`font-serif-i`)
- **Body:** Inter Variable

### Signature moves
- Giant `GREENE` hero word, letters rise & straighten one by one (animejs timeline)
- Rotating circular-text stickers (hero + footer)
- Lime marquee strips between sections
- Hover-preview work list (Red Antler style)
- Outlined step numbers in the process timeline
- Inverted (ink) footer with giant interactive wordmark
- Lime color-blocked CTA section
- `data-cursor` labels rendered inside the custom cursor
- Three atmospheres: **paper → midnight → studio**, cycled from the nav button

---

## What changed

- **Design system:** `src/app/globals.css` (tokens, fonts, utilities), `src/app/layout.tsx`
- **Chrome:** Navbar, FullscreenMenu, Footer, Preloader, DynamicCursor, FloatingButtons, ScrollProgress, PageTransition, NoiseTexture
- **Home page:** Hero (`ExperienceHero` + `useHeroAnimation`), WhyWeExist, Philosophy, SelectedWork, Services, Process, SocialProof, Testimonials, FAQ, CTA
- **Site-wide palette migration:** all inner pages (work, services, about, journal, contact, pricing, careers, legal, resources, not-found, work/service detail pages) — legacy hexes replaced with brand tokens
- **Fonts:** `next/font/google` removed (blocked in sandbox at build time) → `@fontsource-variable/archivo`, `@fontsource-variable/inter`, `@fontsource/instrument-serif`

## Run

```bash
npm install
npm run dev    # http://localhost:3000
```
