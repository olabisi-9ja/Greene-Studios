import type { BrandSystem } from "./types";
import { luminary } from "./luminary";
import { vera } from "./vera";
import { arc } from "./arc";
import { bloom } from "./bloom";
import { onyx } from "./onyx";
import { prism } from "./prism";
import { pace } from "./pace";
import { chopbox } from "./chopbox";
import { kora } from "./kora";

export type { BrandSystem, BrandPalette, BrandType } from "./types";

export const BRANDS: BrandSystem[] = [luminary, vera, arc, bloom, onyx, prism, pace, chopbox, kora];

export const BRANDS_BY_SLUG: Record<string, BrandSystem> = Object.fromEntries(
  BRANDS.map((b) => [b.slug, b])
);

export { luminary, vera, arc, bloom, onyx, prism, pace, chopbox, kora };
