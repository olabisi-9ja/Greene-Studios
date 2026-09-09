/**
 * Converts the generated PNGs to WebP and drops the originals.
 *
 *   node scripts/optimise-images.mjs [--dir=public/images/work] [--keep-png]
 *
 * Playwright can only write PNG or JPEG; neither is the right format for a page
 * that has to hold a sub-1.2s LCP. This is the last step of the pipeline, so
 * `npm run assets:all` ends with WebP on disk and nothing else.
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const dir = args.find((a) => a.startsWith("--dir="))?.split("=")[1] ?? "public/images/work";
const keepPng = args.includes("--keep-png");

async function* walk(d) {
  for (const entry of await readdir(d, { withFileTypes: true })) {
    const full = path.join(d, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".png")) yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;

for await (const png of walk(dir)) {
  const webp = png.replace(/\.png$/, ".webp");
  const src = (await stat(png)).size;
  // quality 82 is indistinguishable on UI screenshots and roughly a fifth
  // the size; effort 6 costs build time we only pay when regenerating assets.
  await sharp(png).webp({ quality: 82, effort: 6 }).toFile(webp);
  const dst = (await stat(webp)).size;
  before += src;
  after += dst;
  count += 1;
  if (!keepPng) await unlink(png);
  console.log(
    `  ${(src / 1024).toFixed(0).padStart(5)}kB → ${(dst / 1024).toFixed(0).padStart(5)}kB  ${path.relative(dir, webp)}`
  );
}

const pct = before ? Math.round((1 - after / before) * 100) : 0;
console.log(
  `✓ ${count} images · ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (${pct}% smaller)`
);
