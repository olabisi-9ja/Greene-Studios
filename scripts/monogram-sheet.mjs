/**
 * Contact sheet for the monogram candidates.
 *
 * Every mark gets checked at 72/32/24/16px in both themes before it goes near
 * the site — the same pass that caught Arc filling into a blob and Prism's rays
 * merging. A monogram that reads at 72px and closes up at 16px is a favicon
 * that looks like a smudge.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { withBrowser, renderHtml } from "./lib/render.mjs";

const DIR = path.join(process.cwd(), ".asset-check/monogram");
const files = (await readdir(DIR)).filter((f) => f.endsWith(".svg")).sort();

const svgs = await Promise.all(
  files.map(async (f) => ({ name: path.basename(f, ".svg"), svg: await readFile(path.join(DIR, f), "utf8") }))
);

const GREEN = "#374F48"; // sampled from the supplied artwork
const INK = "#0a0a0a";
const PAPER = "#f3f2ee";
const DARK_BG = "#080a09";
const CREAM = "#f2efe6";

const row = (dark) => svgs.map(({ name, svg }) => `
  <div class="card${dark ? " dark" : ""}">
    <div class="big" style="color:${dark ? CREAM : GREEN}">${svg}</div>
    <div class="chip" style="background:${dark ? CREAM : INK}">
      <span style="color:${dark ? GREEN : PAPER}">${svg}</span>
    </div>
    <div class="sizes" style="color:${dark ? CREAM : INK}">
      <span class="s32">${svg}</span><span class="s24">${svg}</span><span class="s16">${svg}</span>
    </div>
    <div class="name">${name}</div>
  </div>`).join("");

const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#e9e8e4;font:12px/1.4 system-ui;padding:26px}
h2{font:700 11px/1 system-ui;letter-spacing:.18em;text-transform:uppercase;color:#666;margin:0 0 14px}
.row{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:26px}
.card{background:${PAPER};border:1px solid #d7d6d1;padding:16px;width:176px;text-align:center}
.card.dark{background:${DARK_BG};border-color:#2a2f2c}
.big{height:84px;display:flex;align-items:center;justify-content:center}
.big svg{width:72px;height:72px;display:block}
.chip{width:44px;height:44px;border-radius:999px;display:flex;align-items:center;justify-content:center;margin:12px auto 0}
.chip svg{width:26px;height:26px;display:block}
.sizes{display:flex;gap:14px;align-items:flex-end;justify-content:center;margin:14px 0 10px;height:34px}
.s32 svg{width:32px;height:32px;display:block}
.s24 svg{width:24px;height:24px;display:block}
.s16 svg{width:16px;height:16px;display:block}
.name{font:700 10px/1 ui-monospace,monospace;letter-spacing:.06em;color:#888;margin-top:6px}
.card.dark .name{color:#777}
</style>
<h2>Light — mark on paper, then reversed in an ink chip</h2>
<div class="row">${row(false)}</div>
<h2>Dark — mark on near-black, then reversed in a cream chip</h2>
<div class="row">${row(true)}</div>`;

await withBrowser(async (browser) => {
  const out = path.join(process.cwd(), ".asset-check/monogram-candidates.png");
  await renderHtml(browser, { html, out, width: 1220, height: 900, fullPage: true });
  console.log(`✓ ${svgs.length} candidates → ${path.relative(process.cwd(), out)}`);
});
