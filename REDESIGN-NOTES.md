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

### Typography (single self-hosted family via Fontsource — no external font CDN needed at build)
- **Everything:** Archivo Variable (`font-display` for giant uppercase headlines, `font-body` for text)
- **Editorial accent:** Archivo Variable italic — emphasis words (`font-serif-i`), same family, one font total

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
- **Sub-pages:** all rebuilt around a shared editorial `PageHeader` (✦ kicker + giant display title + italic accent) — Work, Services (+detail), About, Process, Journal (+article), Contact, Pricing, Careers, Resources, Legal, Archive, Experiments, Not-found, Creator. Fixed every dark-background assumption that rendered as invisible/faded text on the light paper (e.g. `text-[var(--brand-surface)]`, `text-white/5`, `bg-white/[0.02]`).
- **Journal articles:** installed `@tailwindcss/typography` (the `prose` classes were no-ops before) and themed prose to the brand tokens.
- **Site-wide palette migration:** legacy hexes replaced with brand tokens
- **Fonts:** consolidated to a single family — `@fontsource-variable/archivo` (wght + italic) — removed `next/font/google` (blocked in sandbox at build time) and the extra Inter / Instrument Serif packages
- **Images:** remote images served directly (`unoptimized`) so Pexels photos load in the preview despite the sandbox network block

## Run

```bash
npm install
npm run dev    # http://localhost:3000
```
