/**
 * Photographs the live shipped sites listed in src/lib/shipped.ts.
 *
 *   node scripts/shoot-live.mjs [--slug=aipal-assist] [--timeout=30000]
 *
 * Unlike scripts/shoot-demos.mjs this reaches the public internet, so it has to
 * run somewhere with outbound access — a local machine or CI, not a sandbox
 * with a restrictive egress policy. Output lands in public/images/shipped/,
 * ready for `npm run images` to convert to WebP.
 *
 * Sites it cannot reach are reported and skipped rather than failing the run,
 * so one dead host never costs you the other nine.
 */
import path from "node:path";
import { readFile } from "node:fs/promises";
import { withBrowser, shootUrl } from "./lib/render.mjs";

const ROOT = process.cwd();
const OUT = "public/images/shipped";
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--slug="))?.split("=")[1];
const timeout = Number(args.find((a) => a.startsWith("--timeout="))?.split("=")[1] ?? 30_000);

// Parsed out of the TypeScript source, same approach as scripts/lib/brands.mjs:
// one source of truth, and no TS runtime just for the scripts.
const src = await readFile(path.join(ROOT, "src/lib/shipped.ts"), "utf8");
const body = src.slice(src.indexOf("[", src.indexOf("export const SHIPPED")), src.indexOf("];", src.indexOf("export const SHIPPED")) + 1);
const SHIPPED = new Function(`return (${body})`)();

const targets = only ? SHIPPED.filter((p) => p.slug === only) : SHIPPED;
if (!targets.length) {
  console.error(`No shipped project matching --slug=${only}`);
  process.exit(1);
}

const VIEWPORTS = [
  { key: "desktop", width: 1440, height: 900, scale: 2 },
  { key: "mobile", width: 390, height: 844, scale: 3 },
];

const failed = [];

await withBrowser(async (browser) => {
  for (const project of targets) {
    for (const vp of VIEWPORTS) {
      const out = path.join(OUT, project.slug, `${vp.key}.png`);
      try {
        await shootUrl(browser, {
          url: project.url,
          out,
          width: vp.width,
          height: vp.height,
          scale: vp.scale,
        });
        console.log(`✓ ${project.name} @${vp.key}`);
      } catch (err) {
        console.warn(`✗ ${project.name} @${vp.key} — ${String(err).split("\n")[0]}`);
        failed.push(`${project.slug}@${vp.key}`);
        break; // one viewport failing means the host is unreachable
      }
    }
  }
});

if (failed.length) {
  console.log(`\n${failed.length} shot(s) could not be taken: ${failed.join(", ")}`);
  console.log("If every one failed, check outbound network access — a sandboxed");
  console.log("environment will block these even though the sites are up.");
} else {
  console.log(`\n✓ all ${targets.length} sites photographed → ${OUT}`);
  console.log("Next: npm run images -- --dir=public/images/shipped");
}
