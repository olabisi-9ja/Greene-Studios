/**
 * Node-side view of src/lib/brands/*.ts.
 *
 * The scripts run outside the Next build, so rather than add a TS runtime just
 * for them, the brand objects are parsed out of the TypeScript sources: strip
 * the type annotations and evaluate the object literal. One source of truth,
 * no duplication, no extra dependency.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "src/lib/brands");

async function load(slug) {
  const src = await readFile(path.join(DIR, `${slug}.ts`), "utf8");
  const start = src.indexOf("= {", src.indexOf("export const"));
  const body = src.slice(start + 2, src.lastIndexOf("};") + 1);
  return new Function(`return (${body})`)();
}

/** Explicit, ordered — the directory also holds types.ts, index.ts, fonts.ts
 *  and css.ts, none of which export a brand. */
const ORDER = ["luminary", "vera", "arc", "bloom", "onyx", "prism"];

export const BRANDS = await Promise.all(ORDER.map(load));
export const BRANDS_BY_SLUG = Object.fromEntries(BRANDS.map((b) => [b.slug, b]));
