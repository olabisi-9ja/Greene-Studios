import type { BrandSystem } from "./types";
import { luminary } from "./luminary";
import { vera } from "./vera";
import { arc } from "./arc";
import { bloom } from "./bloom";
import { onyx } from "./onyx";
import { prism } from "./prism";

export type { BrandSystem, BrandPalette, BrandType } from "./types";

export const BRANDS: BrandSystem[] = [luminary, vera, arc, bloom, onyx, prism];

export const BRANDS_BY_SLUG: Record<string, BrandSystem> = Object.fromEntries(
  BRANDS.map((b) => [b.slug, b])
);

export { luminary, vera, arc, bloom, onyx, prism };
