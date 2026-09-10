/**
 * Generates every non-photographic brand asset: identity boards, type
 * specimens, palette sheets, and the mark contact sheet used to check the
 * logos at real sizes.
 *
 *   node scripts/render-assets.mjs [--brand=luminary] [--check]
 *
 * Output → public/images/work/<slug>/
 * Fonts are read straight out of node_modules/@fontsource-variable and
 * inlined as data URIs, so rendering needs no network at all.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { withBrowser, renderHtml } from "./lib/render.mjs";
import { BRANDS } from "./lib/brands.mjs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/images/work");
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--brand="))?.split("=")[1];
const checkOnly = args.includes("--check");

/** Locates a fontsource variable woff2 and inlines it as a data URI. */
const fontCache = new Map();
async function fontFace(pkg, family, { italic = false } = {}) {
  const key = `${pkg}:${italic}`;
  if (fontCache.has(key)) return fontCache.get(key);
  const dir = path.join(ROOT, "node_modules", "@fontsource-variable", pkg, "files");
  if (!existsSync(dir)) {
    console.warn(`  ! font package missing: ${pkg} — falling back to system UI`);
    fontCache.set(key, "");
    return "";
  }
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(dir);
  const pick =
    files.find((f) => f.endsWith(".woff2") && f.includes("latin") && f.includes(italic ? "italic" : "wght") && !f.includes("subset")) ||
    files.find((f) => f.endsWith(".woff2") && f.includes("latin")) ||
    files.find((f) => f.endsWith(".woff2"));
  if (!pick) {
    fontCache.set(key, "");
    return "";
  }
  const b64 = (await readFile(path.join(dir, pick))).toString("base64");
  const css = `@font-face{font-family:"${family}";font-style:${italic ? "italic" : "normal"};font-weight:100 900;font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2-variations")}`;
  fontCache.set(key, css);
  return css;
}

/** fontsource package name → the family name our brand systems reference. */
const FONT_PACKAGES = {
  "inter-tight": "Inter Tight Variable",
  "jetbrains-mono": "JetBrains Mono Variable",
  fraunces: "Fraunces Variable",
  "bodoni-moda": "Bodoni Moda Variable",
  "public-sans": "Public Sans Variable",
  "space-grotesk": "Space Grotesk Variable",
  outfit: "Outfit Variable",
};

async function allFontCss() {
  const parts = [];
  for (const [pkg, family] of Object.entries(FONT_PACKAGES)) {
    parts.push(await fontFace(pkg, family));
  }
  return parts.filter(Boolean).join("\n");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The identity board: mark, palette, type scale and grid, on one sheet. */
function identityBoard(brand, mark, fontCss) {
  const p = brand.palette.light;
  const t = brand.type;
  const swatches = Object.entries(p)
    .map(
      ([name, hex]) => `
      <div class="sw">
        <div class="chip" style="background:${hex};${name === "surface" || name === "bg" ? "box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)" : ""}"></div>
        <div class="swname">${esc(name)}</div>
        <div class="swhex">${esc(hex.toUpperCase())}</div>
      </div>`
    )
    .join("");

  const radii = Object.entries(brand.radius)
    .filter(([k]) => k !== "pill")
    .map(
      ([k, v]) => `<div class="rad"><div class="radbox" style="border-radius:${v}px"></div><span>${k} · ${v}px</span></div>`
    )
    .join("");

  return `<!doctype html><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0}
body{width:1600px;height:900px;background:${p.bg};color:${p.text};
     font-family:${t.body};padding:56px 64px;display:grid;
     grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr;gap:36px 56px}
.head{grid-column:1/-1;display:flex;align-items:flex-end;justify-content:space-between;
      border-bottom:1px solid ${p.border};padding-bottom:28px}
.lock{display:flex;align-items:center;gap:18px}
.lock svg{width:56px;height:56px;color:${p.text}}
.wm{font-family:${t.display};font-size:46px;font-weight:${t.displayWeight};
    letter-spacing:${t.displayTracking};line-height:1;text-transform:${t.displayCase}}
.meta{text-align:right;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${p.textMuted};line-height:2}
.panel{display:flex;flex-direction:column;gap:20px;min-height:0;justify-content:space-between}
h3{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:${p.textMuted};font-weight:700;font-family:${t.body}}
.spec{font-family:${t.display};font-weight:${t.displayWeight};letter-spacing:${t.displayTracking};line-height:.98;text-transform:${t.displayCase}}
.s1{font-size:92px}.s2{font-size:48px}.s3{font-size:28px}
.body-spec{font-size:17px;line-height:${t.bodyLeading};max-width:58ch;color:${p.textMuted}}
.pal{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.chip{height:82px;border-radius:${brand.radius.sm}px}
.swname{margin-top:9px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${p.textMuted}}
.swhex{font-size:11px;font-family:${t.mono || "ui-monospace,monospace"};margin-top:2px}
.rads{display:flex;gap:22px;align-items:flex-end}
.rad{display:flex;flex-direction:column;gap:9px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:${p.textMuted}}
.radbox{width:66px;height:66px;background:${p.accent};opacity:.9}
.grid-demo{height:88px;background-image:repeating-linear-gradient(90deg,${p.border} 0 1px,transparent 1px ${brand.grid}px);
           border:1px solid ${p.border};border-radius:${brand.radius.sm}px}
.accentbar{height:6px;background:${p.accent};width:120px}
.dir{font-size:15px;line-height:1.65;color:${p.textMuted};max-width:62ch}
</style>
<div class="head">
  <div class="lock" style="--brand-accent:${p.accent}">${mark}<div class="wm">${esc(brand.wordmark)}</div></div>
  <div class="meta">${esc(brand.sector)}<br>${esc(brand.tagline)}<br>Greene Studios · concept</div>
</div>

<div class="panel">
  <h3>Typography</h3>
  <div class="spec s1">${esc(brand.name)}</div>
  <div class="spec s2">${esc(brand.tagline)}</div>
  <div class="spec s3">ABCDEFGHIJKLM · 0123456789</div>
  <div class="body-spec">${esc(brand.direction)}</div>
  <div class="accentbar"></div>
  <div class="dir">${esc(t.display.split(",")[0].replace(/"/g, ""))} · ${t.displayWeight} · ${t.displayTracking}<br>
       ${esc(t.body.split(",")[0].replace(/"/g, ""))} · ${t.bodyLeading} leading</div>
</div>

<div class="panel">
  <h3>Palette</h3>
  <div class="pal">${swatches}</div>
  <h3 style="margin-top:14px">Radius</h3>
  <div class="rads">${radii}</div>
  <h3 style="margin-top:14px">Grid · ${brand.grid}px</h3>
  <div class="grid-demo"></div>
</div>`;
}

/** Mark contact sheet — checks every logo at 72/32/24/16px, light and dark. */
function markSheet(entries) {
  const card = (b, mark, dark) => {
    const p = dark ? b.palette.dark || b.palette.light : b.palette.light;
    return `<div class="card" style="--brand-accent:${p.accent};background:${p.surface};color:${p.text};border-color:${p.border}">
      <div class="big">${mark}</div>
      <div class="sizes"><span class="s32">${mark}</span><span class="s24">${mark}</span><span class="s16">${mark}</span></div>
      <div class="name">${esc(b.name)}</div>
    </div>`;
  };
  return `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#eceae6;font:13px/1.4 system-ui;padding:30px}
.row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:22px}
.card{border:1px solid;padding:20px;width:200px;text-align:center}
.big{height:92px;display:flex;align-items:center;justify-content:center}
.big svg{width:72px;height:72px}
.sizes{display:flex;gap:14px;align-items:flex-end;justify-content:center;margin:16px 0 10px;height:34px}
.s32 svg{width:32px;height:32px}.s24 svg{width:24px;height:24px}.s16 svg{width:16px;height:16px}
.name{font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:10px;opacity:.6}
</style>
<div class="row">${entries.map(({ brand, mark }) => card(brand, mark, false)).join("")}</div>
<div class="row">${entries.map(({ brand, mark }) => card(brand, mark, true)).join("")}</div>`;
}

const targets = only ? BRANDS.filter((b) => b.slug === only) : BRANDS;
if (targets.length === 0) {
  console.error(`No brand matching --brand=${only}`);
  process.exit(1);
}

const fontCss = await allFontCss();
const entries = [];
for (const brand of targets) {
  entries.push({
    brand,
    mark: await readFile(path.join(ROOT, "public/demo", brand.slug, "mark.svg"), "utf8"),
  });
}

await withBrowser(async (browser) => {
  if (checkOnly) {
    await mkdir(path.join(ROOT, ".asset-check"), { recursive: true });
    const out = path.join(ROOT, ".asset-check/marks.png");
    await renderHtml(browser, { html: markSheet(entries), out, width: 1340, height: 900, fullPage: true });
    console.log(`✓ mark contact sheet → ${path.relative(ROOT, out)}`);
    return;
  }

  for (const { brand, mark } of entries) {
    const out = path.join(OUT, brand.slug, "identity.png");
    await renderHtml(browser, {
      html: identityBoard(brand, mark, fontCss),
      out,
      width: 1600,
      height: 900,
    });
    console.log(`✓ ${brand.name} identity board → ${path.relative(ROOT, out)}`);
  }
});
