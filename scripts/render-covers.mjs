/**
 * Generative cover art for the journal and the lab, replacing the Pexels
 * photography those sections used to hot-link from a CDN.
 *
 *   node scripts/render-covers.mjs
 *
 * Each cover is deterministic: the slug seeds the composition, so a given
 * article keeps the same artwork across builds. Drawn in the Greene palette,
 * rendered through headless Chromium like everything else.
 */
import path from "node:path";
import { withBrowser, renderHtml } from "./lib/render.mjs";

const OUT = "public/images/covers";

const COVERS = [
  { slug: "why-motion-matters", tone: "ink" },
  { slug: "design-systems-at-scale", tone: "paper" },
  { slug: "ai-in-product-design", tone: "ink" },
  { slug: "typography-that-converts", tone: "paper" },
  { slug: "the-0-seo-strategy", tone: "ink" },
  { slug: "freelance-to-studio", tone: "paper" },
  { slug: "lab-cursor", tone: "paper" },
  { slug: "lab-typography", tone: "ink" },
  { slug: "lab-motion", tone: "paper" },
  { slug: "lab-interaction", tone: "ink" },
];

/** Deterministic 32-bit hash → a small PRNG, so a slug always draws the same art. */
function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = {
  paper: { bg: "#f3f2ee", ink: "#0a0a0a", accent: "#1f3d3a", soft: "#d7d6d1" },
  ink: { bg: "#080a09", ink: "#f2efe6", accent: "#8fb3a6", soft: "#1c2320" },
};

function cover(slug, tone) {
  const p = PALETTES[tone];
  const rand = rng(slug);
  const W = 1200;
  const H = 800;

  // Concentric arcs, offset by the seed — structural rather than decorative,
  // which keeps it on-brand for a studio whose pitch is restraint.
  const cx = 180 + rand() * 240;
  const cy = 200 + rand() * 400;
  const rings = Array.from({ length: 9 }, (_, i) => {
    const r = 90 + i * (70 + rand() * 26);
    const w = i % 3 === 0 ? 2.4 : 1;
    const stroke = i % 4 === 1 ? p.accent : p.soft;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${w}" opacity="${(0.9 - i * 0.07).toFixed(2)}"/>`;
  }).join("");

  const bars = Array.from({ length: 5 }, (_, i) => {
    const y = 120 + i * 130;
    const w = 120 + rand() * 380;
    return `<rect x="${(W - 120 - w).toFixed(0)}" y="${y}" width="${w.toFixed(0)}" height="10" fill="${i === 2 ? p.accent : p.ink}" opacity="${i === 2 ? 1 : 0.14}"/>`;
  }).join("");

  return `<!doctype html><meta charset="utf-8"><style>html,body{margin:0}</style>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${p.bg}"/>
  <g clip-path="inset(0)">${rings}</g>
  ${bars}
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${p.accent}"/>
</svg>`;
}

await withBrowser(async (browser) => {
  for (const { slug, tone } of COVERS) {
    const out = path.join(OUT, `${slug}.png`);
    await renderHtml(browser, { html: cover(slug, tone), out, width: 1200, height: 800, scale: 1 });
    console.log(`✓ ${slug}`);
  }
});
