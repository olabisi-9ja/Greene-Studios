# Lottie animations

Lottie JSON files, loaded by name (`<BrandLottie name="hero-brands" />`
loads `hero-brands.json`). Each file is recoloured to the current theme when
it loads (`src/lib/brand-lottie.ts`): black and white become the theme's ink
and paper, every other colour becomes a shade of the theme's accent, and skin
tones are left alone. Animations load only when near the screen and pause
when off it.

| File | Where it shows |
|---|---|
| `hero-brands/websites/apps/products.json` | Home hero, one per word (also the service pages and the price card) |
| `next.json` | "Got something to build?" on the home and inner pages |
| `questions.json` | Home, Questions |
| `footer.json` | Footer |
| `work.json` | Work page title |
| `pricing.json`, `contact.json`, `start.json` | Those pages' openings |
| `studio.json`, `services.json` | Studio page |
| `about.json` | Team page |
| `services-intro.json` | Services page |
| `journal.json` | Journal |
| `not-found.json` | 404 |

Adding one: download "Lottie JSON" from LottieFiles (check the licence allows
commercial use), remove any background layer, and keep the file small.
