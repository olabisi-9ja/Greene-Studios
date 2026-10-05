# Greene Studios

The website for Greene Studios, a digital design studio. Next.js 15 (App Router), React 19, Tailwind CSS 4.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck
npm run lint
```

## Layout

```
src/
├── app/
│   ├── (greene)/        every page, sharing one layout: top bar, dock, footer, loader, tour
│   ├── layout.tsx       html, fonts, site-wide metadata
│   ├── not-found.tsx    404 for unknown addresses (wraps the (greene) 404 in the site frame)
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx
│   └── globals.css      design tokens per theme, and the few global effects
├── components/          grouped by where they're used (home, work, chrome, brand, ui…)
└── lib/
    ├── work.ts          the projects and their pictures (public/images/real/<slug>/)
    ├── shipped.ts       live sites
    ├── offer.ts         packages, smaller jobs and service groups (prices in USD)
    ├── data.ts          services, journal articles, FAQs, contact details
    ├── team.ts          real people only; add someone here to show them on /team and /studio
    ├── currency.ts      prices in the visitor's currency
    ├── brand-lottie.ts  recolours Lottie files into the theme
    └── theme-peel.ts    the page-peel theme switch
```

## Content

- **Work**: edit `src/lib/work.ts`. Pictures go in `public/images/real/<slug>/` named `01.webp`, `02.webp`…
- **Prices**: `src/lib/offer.ts` (packages, smaller jobs) and `fromUsd` on each service in `src/lib/data.ts`. Set in USD; the site converts.
- **Animations**: Lottie JSON in `public/lottie/`, loaded by name. Any colours are mapped to the theme automatically (see `public/lottie/README.md`).
- **Social links**: hidden until real accounts are added to `SOCIAL` in `src/components/Footer.tsx`.

## Scripts

```bash
npm run images       # convert PNGs to WebP
npm run covers       # render the journal cover art
npm run shoot:live   # screenshot the live sites in src/lib/shipped.ts
```

## Security

Security headers (CSP, HSTS, frame and content-type protection) are set in `next.config.mjs`. The CSP allows scripts and assets from this site only, plus `open.er-api.com` for exchange rates. If you add a third-party service (analytics, embeds), add its origin there too.

## Deploy

Vercel. Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical links, the sitemap and share images use it.
