/**
 * Copies the woff2 files the demo brands reference out of node_modules and
 * into public/demo/_fonts/, so each demo self-hosts its own faces instead of
 * pulling a font CDN at runtime.
 *
 *   node scripts/copy-fonts.mjs
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { BRANDS } from "./lib/brands.mjs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/demo/_fonts");

// Family name → the fontsource package that ships it.
const PACKAGES = {
  "Inter Tight Variable": "inter-tight",
  "JetBrains Mono Variable": "jetbrains-mono",
  "Fraunces Variable": "fraunces",
  "Bodoni Moda Variable": "bodoni-moda",
  "Public Sans Variable": "public-sans",
  "Space Grotesk Variable": "space-grotesk",
  "Outfit Variable": "outfit",
};

// Mirrors FONT_FACES in src/lib/brands/fonts.ts.
const FILES = {
  "inter-tight": ["inter-tight-latin-wght-normal.woff2", "inter-tight-latin-wght-italic.woff2"],
  "jetbrains-mono": ["jetbrains-mono-latin-wght-normal.woff2"],
  fraunces: ["fraunces-latin-opsz-normal.woff2", "fraunces-latin-opsz-italic.woff2"],
  "bodoni-moda": ["bodoni-moda-latin-opsz-normal.woff2", "bodoni-moda-latin-opsz-italic.woff2"],
  "public-sans": ["public-sans-latin-wght-normal.woff2"],
  "space-grotesk": ["space-grotesk-latin-wght-normal.woff2"],
  outfit: ["outfit-latin-wght-normal.woff2"],
};

const primary = (stack) => stack.split(",")[0].trim().replace(/^["']|["']$/g, "");

const needed = new Set();
for (const brand of BRANDS) {
  for (const stack of [brand.type.display, brand.type.body, brand.type.mono].filter(Boolean)) {
    const pkg = PACKAGES[primary(stack)];
    if (!pkg) throw new Error(`No fontsource package mapped for "${primary(stack)}" (${brand.slug})`);
    for (const f of FILES[pkg]) needed.add(`${pkg}/${f}`);
  }
}

await mkdir(OUT, { recursive: true });
let bytes = 0;
for (const ref of [...needed].sort()) {
  const [pkg, file] = ref.split("/");
  const src = path.join(ROOT, "node_modules/@fontsource-variable", pkg, "files", file);
  const buf = await readFile(src);
  await writeFile(path.join(OUT, file), buf);
  bytes += buf.length;
  console.log(`  ${(buf.length / 1024).toFixed(0).padStart(4)}kB  ${file}`);
}
console.log(`✓ ${needed.size} faces → public/demo/_fonts (${(bytes / 1024).toFixed(0)}kB total)`);
