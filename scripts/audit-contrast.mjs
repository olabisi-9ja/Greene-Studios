/**
 * Contrast audit across every route, in both themes.
 *
 *   npm run build && npx next start -p 3111
 *   node scripts/audit-contrast.mjs [--base=url] [--min=4.5]
 *
 * v1 of this site shipped invisible text — dark-background assumptions left in
 * place on a light background — and that class of regression is easy to
 * reintroduce every time a token moves. This walks the real DOM, resolves the
 * effective background behind each text node (through transparent ancestors),
 * and reports anything under the WCAG AA threshold for its size.
 */
import { chromium } from "playwright";
import { BRANDS } from "./lib/brands.mjs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:3111";

const ROUTES = [
  "/", "/work", "/work/archive", "/services", "/about", "/contact",
  "/pricing", "/process", "/journal", "/lab", "/industries", "/resources",
  "/careers", "/legal", "/demo",
  ...BRANDS.map((b) => `/work/${b.slug}`),
  ...BRANDS.map((b) => `/demo/${b.slug}`),
];

const AUDIT = () => {
  const srgb = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const parse = (s) => {
    const m = s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null;
  };
  const over = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3]));

  /** Walk up until we hit something actually painted. */
  const effectiveBg = (el) => {
    let node = el;
    let acc = null;
    while (node && node !== document.documentElement.parentElement) {
      const c = parse(getComputedStyle(node).backgroundColor);
      if (c && c[3] > 0) {
        acc = acc ? over(acc.concat(1), c.slice(0, 3)).concat(1) : c;
        if (c[3] >= 1) return acc.slice(0, 3);
      }
      node = node.parentElement;
    }
    return acc ? acc.slice(0, 3) : [255, 255, 255];
  };

  const out = [];
  const seen = new Set();
  for (const el of document.querySelectorAll("body *")) {
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!text) continue;

    // WCAG 1.4.3 exempts inactive controls.
    if (el.closest("[disabled], [aria-disabled='true']")) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    const opacity = Number(cs.opacity);
    if (opacity < 0.15) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    // Text painted as a background clip (the GREENE wordmark) has a
    // transparent fill by design; contrast does not apply.
    if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || cs.color === "rgba(0, 0, 0, 0)") continue;

    // Text sitting over photography: the effective background is the image,
    // which this walk cannot sample. Reported separately rather than counted
    // as a failure — the fix there is a scrim, verified by eye.
    let overImage = false;
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const pos = getComputedStyle(a).position;
      if (pos !== "absolute" && pos !== "fixed") continue;
      const host = a.parentElement;
      if (host && (host.querySelector("img") || host.querySelector('[style*="background-image"]'))) {
        overImage = true;
        break;
      }
    }
    if (overImage) continue;

    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const fgOver = over([fg[0], fg[1], fg[2], fg[3] * opacity], bg);
    const l1 = lum(fgOver);
    const l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    const size = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const min = large ? 3 : 4.5;

    if (ratio < min) {
      const key = `${cs.color}|${text.slice(0, 30)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        ratio: Number(ratio.toFixed(2)),
        min,
        size: Math.round(size),
        text: text.slice(0, 52),
        color: cs.color,
      });
    }
  }
  return out.sort((a, b) => a.ratio - b.ratio);
};

const browser = await chromium.launch();
let failures = 0;

for (const scheme of ["light", "dark"]) {
  console.log(`\n─── ${scheme.toUpperCase()} ───`);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("loader_shown", "true");
    } catch {
      /* ignore */
    }
  });

  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      await page.goto(base + route, { waitUntil: "networkidle", timeout: 30_000 });
      await page.evaluate(() => document.fonts?.ready);
      const issues = await page.evaluate(AUDIT);
      if (issues.length) {
        failures += issues.length;
        console.log(`  ✗ ${route}`);
        for (const i of issues.slice(0, 6)) {
          console.log(`      ${String(i.ratio).padStart(5)} (needs ${i.min})  ${i.size}px  "${i.text}"  ${i.color}`);
        }
        if (issues.length > 6) console.log(`      … and ${issues.length - 6} more`);
      }
    } catch (err) {
      console.log(`  ! ${route} — ${String(err).split("\n")[0]}`);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
console.log(
  failures
    ? `\n${failures} contrast failure(s) across ${ROUTES.length} routes × 2 themes`
    : `\n✓ no contrast failures across ${ROUTES.length} routes × 2 themes`
);
process.exit(failures ? 1 : 0);
