/**
 * Builds GS monogram candidates from real glyph outlines.
 *
 *   node scripts/make-monogram.mjs
 *
 * The brief was a monogram set in a geometric sans. Tracing letterforms by eye
 * reliably gets the curves and the joins subtly wrong, and SVG <text> is no use
 * either — a <text> element inside an <img>-loaded SVG will not resolve a
 * webfont, and loading a whole typeface site-wide for two letters is not a
 * trade worth making.
 *
 * So the outlines come straight out of the font binary: fontkit instances the
 * variable weight axis, lays "GS" out with the font's own kerning, and the
 * resulting contours are emitted as vector paths. Genuine letterforms, a few
 * hundred bytes, and `currentColor` so the mark takes the colour of whatever
 * surface it sits on — the same contract the six concept-brand marks honour.
 *
 * Candidates land in .asset-check/ for judgement. Nothing here touches
 * public/brand until one has been picked.
 */
import { create } from "fontkit";
import { decompress } from "wawoff2";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
/** Candidate faces, all already installed for the concept sites.
 *  Archivo is the site's own display typeface — a monogram set in it matches
 *  the wordmark in the footer and the headings on every page, which is a
 *  stronger system argument than matching a generated PNG exactly. */
const FACES = [
  { key: "outfit", label: "Outfit", file: "outfit/files/outfit-latin-wght-normal.woff2" },
  { key: "archivo", label: "Archivo", file: "archivo/files/archivo-latin-wght-normal.woff2" },
  { key: "grotesk", label: "Space Grotesk", file: "space-grotesk/files/space-grotesk-latin-wght-normal.woff2" },
];
const OUT = path.join(ROOT, ".asset-check/monogram");

const WEIGHTS = [600, 700];
/** Extra letter-spacing, in em. Negative pulls the pair together. */
const TRACKING = [0, -0.03];
const TEXT = "GS";
/** Padding around the ink, in em, so the mark has breathing room in a chip. */
const PAD = 0.08;

// fontkit can read woff2, but `getVariation()` on a woff2-backed font comes
// back without its tables — the instance throws on unitsPerEm and returns null
// glyphs. Decompressing to TTF first makes axis instancing work properly.
// This matters: Outfit's default weight is 100, so without instancing the mark
// would come out hairline.


/**
 * Lays the text out at one weight and returns tight-cropped SVG.
 *
 * fontkit works in font units with y pointing up from the baseline; SVG points
 * y down. The whole run is therefore drawn inside one `scale(1,-1)` group, and
 * the viewBox is derived from the union of the glyph bounding boxes rather than
 * from the font's line metrics — line metrics include ascender and descender
 * space that neither of these two letters occupies, which would leave the mark
 * floating in its own box.
 */
function monogram(base, weight, tracking) {
  const font = base.getVariation({ wght: weight });
  const upm = font.unitsPerEm;
  const run = font.layout(TEXT);
  const extra = tracking * upm;

  let pen = 0;
  const parts = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    const x = pen + (pos.xOffset ?? 0);
    const y = pos.yOffset ?? 0;

    const d = glyph.path.toSVG();
    if (d) parts.push(`<path d="${d}" transform="translate(${round(x)} ${round(y)})"/>`);

    const bb = glyph.path.bbox;
    if (Number.isFinite(bb.minX)) {
      minX = Math.min(minX, bb.minX + x);
      maxX = Math.max(maxX, bb.maxX + x);
      minY = Math.min(minY, bb.minY + y);
      maxY = Math.max(maxY, bb.maxY + y);
    }

    pen += (pos.xAdvance ?? 0) + (i < run.glyphs.length - 1 ? extra : 0);
  });

  const pad = PAD * upm;
  const inkW = maxX - minX + pad * 2;
  const inkH = maxY - minY + pad * 2;
  // Square box, ink centred — a chip is round, so an off-centre mark reads as
  // a mistake even when the glyphs themselves are right.
  const side = Math.max(inkW, inkH);
  const offsetX = minX - pad - (side - inkW) / 2;
  const offsetY = minY - pad - (side - inkH) / 2;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(side)} ${round(side)}" ` +
    `fill="currentColor" role="img" aria-label="Greene Studios">` +
    `<g transform="translate(${round(-offsetX)} ${round(offsetY + side)}) scale(1 -1)">` +
    parts.join("") +
    `</g></svg>`;

  return { svg, weight, tracking, side: round(side) };
}

const round = (n) => Math.round(n * 100) / 100;

await mkdir(OUT, { recursive: true });

const made = [];
for (const face of FACES) {
  const file = path.join(ROOT, "node_modules/@fontsource-variable", face.file);
  const ttf = Buffer.from(await decompress(await readFile(file)));
  const base = create(ttf);

  for (const weight of WEIGHTS) {
    for (const tracking of TRACKING) {
      const m = monogram(base, weight, tracking);
      const name = `${face.key}-${weight}${tracking ? "-tight" : ""}`;
      await writeFile(path.join(OUT, `${name}.svg`), m.svg + "\n");
      made.push({ ...m, name, face: face.label });
      console.log(
        `  ✓ ${name.padEnd(20)} ${face.label.padEnd(14)} ${weight}  ` +
          `${String(tracking).padStart(5)}em  ${(m.svg.length / 1024).toFixed(2)}kB`
      );
    }
  }
}

await writeFile(path.join(OUT, "index.json"), JSON.stringify(made, null, 2) + "\n");
console.log(`\n✓ ${made.length} candidates → ${path.relative(ROOT, OUT)}`);
