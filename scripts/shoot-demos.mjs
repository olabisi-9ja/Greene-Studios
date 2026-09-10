/**
 * Photographs the running concept sites.
 *
 *   npm run build && npx next start -p 3111
 *   node scripts/shoot-demos.mjs [--brand=luminary] [--out=dir] [--base=url]
 *
 * These screenshots become the case study imagery, which is why they are taken
 * from the live site rather than mocked up: the picture and the thing it
 * depicts cannot drift apart.
 */
import path from "node:path";
import { withBrowser, shootUrl } from "./lib/render.mjs";
import { BRANDS } from "./lib/brands.mjs";

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--brand="))?.split("=")[1];
const base = args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:3111";
const outRoot = args.find((a) => a.startsWith("--out="))?.split("=")[1] ?? "public/images/work";

const VIEWPORTS = [
  { key: "desktop", width: 1440, height: 900, scale: 2 },
  { key: "tablet", width: 834, height: 1112, scale: 2 },
  { key: "mobile", width: 390, height: 844, scale: 3 },
];

const targets = only ? BRANDS.filter((b) => b.slug === only) : BRANDS;
if (!targets.length) {
  console.error(`No brand matching --brand=${only}`);
  process.exit(1);
}

await withBrowser(async (browser) => {
  for (const brand of targets) {
    const pages = [{ label: "home", href: `/demo/${brand.slug}` }, ...brand.nav.map((n) => ({
      label: n.href.split("/").pop(),
      href: n.href,
    }))];

    // A brand that defines a dark palette gets photographed in it too — for
    // Onyx and Arc that scheme *is* the identity, so a light-only gallery
    // would misrepresent the work.
    const schemes = brand.palette.dark ? ["light", "dark"] : ["light"];

    for (const vp of VIEWPORTS) {
      for (const scheme of schemes) {
        const suffix = scheme === "dark" ? "-dark" : "";
        const out = path.join(outRoot, brand.slug, `home-${vp.key}${suffix}.png`);
        await shootUrl(browser, {
          url: base + pages[0].href,
          out,
          width: vp.width,
          height: vp.height,
          scale: vp.scale,
          colorScheme: scheme,
        });
        console.log(`✓ ${brand.slug} home @${vp.key} ${scheme}`);
      }
    }

    // One full-page desktop shot per inner page — the case study gallery.
    for (const page of pages.slice(1)) {
      const out = path.join(outRoot, brand.slug, `${page.label}.png`);
      await shootUrl(browser, { url: base + page.href, out, width: 1440, height: 900, scale: 2, fullPage: true });
      console.log(`✓ ${brand.slug} ${page.label} (full page)`);
    }
  }
});
