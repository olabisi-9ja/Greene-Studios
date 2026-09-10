# Greene Studios

Independent digital design studio. Lagos, working worldwide.

Next.js 14 (App Router) · Tailwind v4 · TypeScript · one animation library.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

---

## Layout

```
src/app/
├── (greene)/          The studio site. All Greene chrome lives in this group's layout.
├── demo/              Six concept brands, each a complete site. No Greene chrome.
│   ├── _fonts/        (in public/) self-hosted woff2, copied by `npm run fonts`
│   └── <brand>/       one folder per brand, own layout, own metadata
├── layout.tsx         Root: <html>/<body>, metadata, pre-hydration theme script
└── globals.css        Greene design tokens only — nothing under /demo reads these
```

The route-group split is deliberate. A concept site that inherited Greene's
navigation, footer or cursor would stop reading as a separate brand the moment
someone looked at the top of the page.

## Concept sites

Six self-initiated brand systems, each published as a working site so the work
can be clicked rather than described:

| Brand | Sector | Direction |
|---|---|---|
| Luminary | SaaS analytics | Precision instrument. Inter Tight + JetBrains Mono, 4px grid |
| Vera | Wellness commerce | Warm and tactile. Fraunces, clay/sand/moss, slow easing |
| Arc | Fashion commerce | Editorial monochrome. Bodoni Moda, zero radius |
| Bloom | Healthcare product | Calm and legible. AAA body contrast, 18px base, 48px targets |
| Onyx | Fintech product | Dark and confident. Space Grotesk, tabular figures |
| Prism | Education web app | Bright and structured. Outfit, flat blocks on an 8px grid |

Systems live in `src/lib/brands/`. Each drives its site's palette, type, radius,
grid and motion through `--b-*` custom properties; no demo may reference a
Greene `--brand-*` token.

Index at [`/demo`](http://localhost:3000/demo).

### Concept site subdomains

`src/middleware.ts` maps `<brand>.greenestudios.co` onto `/demo/<brand>`, so all
six run from this one app and deploy. Everything stays reachable at
`/demo/<brand>` too, which means local development and preview builds need no DNS.

**Production needs one manual step:** add the wildcard domain `*.greenestudios.co`
to the project in the Vercel dashboard (Settings → Domains) and point a wildcard
CNAME at Vercel. Until that exists the subdomains will not resolve, though every
concept site is still reachable at its `/demo/<brand>` path.

Unknown subdomains and `www` fall through to the Greene site.

## Image pipeline

No external image model, no API key, no network — headless Chromium is the
rasteriser, driven by Playwright.

```bash
npm run fonts          # copy woff2 out of node_modules into public/demo/_fonts
npm run assets         # render the six brand identity boards
npm run assets:check   # mark contact sheet at 72/32/24/16px, light and dark
npm run covers         # generative cover art for the journal and lab
npm run shoot          # photograph the running demo sites (needs a server, below)
npm run shoot:live     # photograph the shipped sites (needs outbound network)
npm run brand          # turn public/brand/_src exports into usable marks
npm run images         # PNG → WebP, and write src/lib/image-manifest.json
npm run assets:all     # fonts → assets → shoot → images, in order
```

`npm run shoot` screenshots the **live** concept sites at desktop, tablet and
mobile, and those screenshots become the case study imagery. The picture and the
thing it depicts therefore cannot drift apart — one is a photograph of the other.

```bash
npm run build && npx next start -p 3111
npm run shoot
```

Brand marks for the concept sites are hand-authored SVG in
`public/demo/<brand>/mark.svg` (all under 750 bytes) and mirrored as JSX in
`src/components/demo/BrandMark.tsx` so they can resolve `currentColor` and
`--b-accent` against the page.

### Greene's own logo

Drop the exports in `public/brand/_src/` as `gs-mark.*` and
`greene-wordmark.*`, then run `npm run brand`. SVG passes straight through;
a PNG or JPG is trimmed and rebuilt as an **alpha mask**, which
`src/components/ui/GreeneMark.tsx` paints with `background: currentColor`
through `mask-image`. That is what lets a raster export behave like the SVGs
it replaces — one file that takes the colour of whatever surface it sits on,
with no white box on a dark theme.

Until those files exist nothing breaks mid-swap: the monogram falls back to
the generated mark below, and the wordmark to the hand-drawn
`greene-stacked.svg` already in `public/brand/`.

### The GS monogram

```bash
npm run monogram        # glyph outlines → .asset-check/monogram/ (12 candidates)
npm run monogram:sheet  # contact sheet at 72/32/24/16px, light and dark
```

Candidates are laid out from the real font binaries — fontkit instances the
variable weight axis and emits the contours, so the letterforms are the
typeface's own rather than a trace. Nothing is promoted automatically.

**Currently in use: `outfit-700-tight`** (Outfit, 700, -0.03em tracking),
committed as `public/brand/gs-monogram-outfit.svg` and mirrored as JSX in
`GreeneMark.tsx`. It is inlined rather than loaded through `<img>` for the same
reason the concept marks are: an SVG loaded as an image is an isolated
document, so `currentColor` resolves against nothing and the mark paints black
— invisible on the dark theme. Inline, it takes the colour of whatever chip it
sits in.

To switch candidates, copy another SVG out of `.asset-check/monogram/` and
replace the two paths in `MonogramGlyphs`. A real export dropped in
`public/brand/_src/` still wins over both.

### The founder portrait

Save it as `public/images/studio/founder.jpg`, then
`npm run images -- --dir=public/images/studio`. The About page picks it up
automatically and shows a typographic plate until it is there.

## Checks

```bash
npm run build && npx next start -p 3111   # both of the below need a server
npm run measure          # LCP/FCP/CLS and transfer weight → src/lib/measured.json
npm run audit:contrast   # every route, both themes, against WCAG AA
```

`measure` is the only source for the performance figures the case studies
quote — they are never hand-typed. `audit:contrast` walks the real DOM,
resolves the effective background through transparent ancestors, and exits
non-zero on any failure. It found 94 the first time it ran, including a page
of white-on-white text; it should stay at zero.

## Conventions

- **One animation library.** framer-motion, and only where a spring or an
  exit animation genuinely earns it. Reveals, marquees, scroll progress and page
  transitions are CSS.
- **Two themes.** Light and dark; `auto` follows `prefers-color-scheme`. Legacy
  `mode-paper` / `mode-midnight` / `mode-studio` / `mode-raw` classes survive as
  CSS aliases only.
- **No stock photography.** Every figure on a concept site is generated from that
  brand's own tokens (`src/components/demo/Figure.tsx`).
- **Claims must be checkable.** Performance numbers on the case studies are
  measured from the live demos, not estimated. Nothing on this site attributes a
  quote or a result to a person or company that does not exist.
