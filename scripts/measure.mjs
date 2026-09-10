/**
 * Measures the live sites and writes the numbers the case studies cite.
 *
 *   npm run build && npx next start -p 3111
 *   node scripts/measure.mjs [--base=url] [--runs=3]
 *
 * Everything here is observed, not estimated: LCP and CLS come from the browser's
 * own PerformanceObserver, transfer weight from the network, and the JS figure
 * counts only scripts the page actually requested. Writes src/lib/measured.json,
 * which is the single source for every performance number the site claims.
 */
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { BRANDS } from "./lib/brands.mjs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:3111";
const runs = Number(args.find((a) => a.startsWith("--runs="))?.split("=")[1] ?? 3);

async function measure(browser, url, warm = false) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  if (warm) {
    // Set the loader's session flag before any script runs, rather than
    // priming with a first visit and a sleep — that raced the loader's own
    // timers and gave a warm number that was sometimes the cold one.
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("loader_shown", "true");
      } catch {
        /* storage unavailable — the loader will play and the number says so */
      }
    });
  }
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });

  const result = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0;
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) lcp = Math.max(lcp, e.startTime);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });

        setTimeout(() => {
          const nav = performance.getEntriesByType("navigation")[0];
          const fcp = performance.getEntriesByName("first-contentful-paint")[0];

          // Resource timing, not content-length: Next serves compressed chunks
          // without a content-length header, which reported ~1kB of JS on every
          // page. transferSize is what actually crossed the wire.
          const bytes = { total: nav?.transferSize ?? 0, js: 0, css: 0, font: 0, img: 0 };
          for (const r of performance.getEntriesByType("resource")) {
            const size = r.transferSize || r.encodedBodySize || 0;
            bytes.total += size;
            if (r.initiatorType === "script" || /\.js(\?|$)/.test(r.name)) bytes.js += size;
            else if (r.initiatorType === "css" || /\.css(\?|$)/.test(r.name)) bytes.css += size;
            else if (/\.woff2?(\?|$)/.test(r.name)) bytes.font += size;
            else if (r.initiatorType === "img" || /\.(webp|png|jpe?g|avif|svg)(\?|$)/.test(r.name)) bytes.img += size;
          }

          resolve({
            lcp: Math.round(lcp),
            cls: Number(cls.toFixed(4)),
            fcp: Math.round(fcp?.startTime ?? 0),
            ttfb: Math.round(nav?.responseStart ?? 0),
            bytes,
          });
        }, 2500);
      })
  );

  await context.close();
  return result;
}

const targets = [
  // The homepage is measured twice: once cold (the identity loader plays and
  // gates LCP) and once warm (sessionStorage suppresses it). Publishing only
  // the warm number would flatter the site; only the cold one would misdescribe
  // what a returning visitor experiences. So both get recorded.
  { key: "greene-home", url: `${base}/`, warm: false },
  { key: "greene-home-return", url: `${base}/`, warm: true },
  { key: "greene-work", url: `${base}/work` },
  ...BRANDS.map((b) => ({ key: b.slug, url: `${base}/demo/${b.slug}` })),
];

const browser = await chromium.launch();
const out = {};

for (const t of targets) {
  const samples = [];
  for (let i = 0; i < runs; i += 1) samples.push(await measure(browser, t.url));
  // Median, so one cold run cannot flatter or spoil the number we publish.
  const med = (pick) => {
    const xs = samples.map(pick).sort((a, b) => a - b);
    return xs[Math.floor(xs.length / 2)];
  };
  out[t.key] = {
    url: t.url.replace(base, ""),
    lcp: med((s) => s.lcp),
    fcp: med((s) => s.fcp),
    cls: med((s) => s.cls),
    ttfb: med((s) => s.ttfb),
    jsKb: Math.round(med((s) => s.bytes.js) / 1024),
    fontKb: Math.round(med((s) => s.bytes.font) / 1024),
    imgKb: Math.round(med((s) => s.bytes.img) / 1024),
    totalKb: Math.round(med((s) => s.bytes.total) / 1024),
    runs,
  };
  const m = out[t.key];
  console.log(
    `${t.key.padEnd(13)} LCP ${String(m.lcp).padStart(5)}ms  FCP ${String(m.fcp).padStart(5)}ms  CLS ${String(m.cls).padStart(6)}  JS ${String(m.jsKb).padStart(4)}kB  total ${String(m.totalKb).padStart(5)}kB`
  );
}

await browser.close();
await writeFile(
  "src/lib/measured.json",
  JSON.stringify({ measuredAt: new Date().toISOString().slice(0, 10), base: "local production build", pages: out }, null, 2) + "\n"
);
console.log("\n✓ src/lib/measured.json written");
