/**
 * Turns the raw logo exports into assets the site can actually use.
 *
 *   Drop your files in public/brand/_src/ :
 *     gs-mark.(png|jpg|svg)         the GS monogram
 *     greene-wordmark.(png|jpg|svg) the stacked "Greene Studios" wordmark
 *
 *   node scripts/prepare-brand.mjs
 *
 * The exports arrive as dark green artwork on a white square, which cannot be
 * dropped into the nav as-is: on a dark theme it paints a white block, and the
 * green is baked in so it can never follow the theme.
 *
 * So each one is converted to an ALPHA MASK — white pixels become fully
 * transparent, dark pixels fully opaque, and the anti-aliased edge in between
 * is preserved as partial alpha. The component then paints it with
 * `background: currentColor` through `mask-image`, so the mark inherits
 * whatever colour the surface needs. Same behaviour as the hand-drawn SVGs it
 * replaces, without needing the vector source.
 *
 * If you can export real SVG from the design file, drop that in instead — it
 * is copied through untouched and beats any raster at favicon sizes.
 */
import { readdir, mkdir, copyFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public/brand/_src");
const OUT = path.join(ROOT, "public/brand");

const TARGETS = [
  { name: "gs-mark", label: "GS monogram", sizes: [512, 192, 64, 32] },
  { name: "greene-wordmark", label: "Stacked wordmark", sizes: [1024, 512] },
];

if (!existsSync(SRC)) {
  await mkdir(SRC, { recursive: true });
}

const files = await readdir(SRC).catch(() => []);
const find = (base) =>
  files.find((f) => path.parse(f).name === base && /\.(png|jpg|jpeg|svg|webp)$/i.test(f));

let produced = 0;
/** name → public path, for the manifest. */
const made = new Map();

for (const target of TARGETS) {
  const file = find(target.name);
  if (!file) {
    console.log(`  – ${target.label}: no public/brand/_src/${target.name}.(png|svg) yet, skipped`);
    continue;
  }

  const src = path.join(SRC, file);

  if (file.toLowerCase().endsWith(".svg")) {
    // Vector wins; pass it straight through.
    await copyFile(src, path.join(OUT, `${target.name}.svg`));
    made.set(target.name, `/brand/${target.name}.svg`);
    console.log(`  ✓ ${target.label}: SVG copied to /brand/${target.name}.svg`);
    produced += 1;
    continue;
  }

  // Trim the white margin, then rebuild as a mask: alpha from darkness,
  // colour flattened to white so `mask-image` + currentColor can tint it.
  const trimmed = await sharp(src)
    .flatten({ background: "#ffffff" })
    .trim({ threshold: 12 })
    .toBuffer();

  const { data, info } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  const mask = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i += 1) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    // Rec. 709 luminance; white → 0 alpha, ink → 255.
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const alpha = Math.max(0, Math.min(255, Math.round(255 - lum)));
    mask[i * 4] = 255;
    mask[i * 4 + 1] = 255;
    mask[i * 4 + 2] = 255;
    mask[i * 4 + 3] = alpha;
  }

  const base = sharp(mask, { raw: { width: info.width, height: info.height, channels: 4 } });

  for (const size of target.sizes) {
    const out = path.join(OUT, `${target.name}-${size}.png`);
    await base
      .clone()
      .resize({ width: size, height: size, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
  }
  // The canonical one the components point at.
  await copyFile(
    path.join(OUT, `${target.name}-${target.sizes[0]}.png`),
    path.join(OUT, `${target.name}.png`)
  );

  made.set(target.name, `/brand/${target.name}.png`);
  console.log(
    `  ✓ ${target.label}: ${info.width}×${info.height} → mask at ${target.sizes.join(", ")}px`
  );
  produced += 1;
}

// A manifest so components can check what exists without touching the disk.
// Only paths this run produced — the repo already contains older marks under
// similar names, and reporting one of those as "the new logo" would mean the
// site quietly kept serving the artwork we are replacing.
const available = Object.fromEntries(TARGETS.map((t) => [t.name, made.get(t.name) ?? null]));
await writeFile(
  path.join(ROOT, "src/lib/brand-assets.json"),
  JSON.stringify(available, null, 2) + "\n"
);

console.log(
  produced
    ? `\n✓ ${produced} mark(s) prepared → src/lib/brand-assets.json`
    : "\nNothing to do. Drop your exports in public/brand/_src/ and run this again."
);
