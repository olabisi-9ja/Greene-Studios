import type { BrandSystem } from "./types";

/**
 * Font families used by the demo brands, mapped to the self-hosted woff2
 * that `npm run fonts` copies into public/demo/_fonts/.
 *
 * Only the faces a brand actually references get preloaded, so a visitor to
 * one demo never downloads another brand's typeface.
 */
export interface FontFace {
  family: string;
  file: string;
  style: "normal" | "italic";
  /** Variation axis the file carries — decides the src format hint. */
  variable: boolean;
}

export const FONT_FACES: Record<string, FontFace[]> = {
  "Inter Tight Variable": [
    { family: "Inter Tight Variable", file: "inter-tight-latin-wght-normal.woff2", style: "normal", variable: true },
    { family: "Inter Tight Variable", file: "inter-tight-latin-wght-italic.woff2", style: "italic", variable: true },
  ],
  "JetBrains Mono Variable": [
    { family: "JetBrains Mono Variable", file: "jetbrains-mono-latin-wght-normal.woff2", style: "normal", variable: true },
  ],
  "Fraunces Variable": [
    { family: "Fraunces Variable", file: "fraunces-latin-opsz-normal.woff2", style: "normal", variable: true },
    { family: "Fraunces Variable", file: "fraunces-latin-opsz-italic.woff2", style: "italic", variable: true },
  ],
  "Bodoni Moda Variable": [
    { family: "Bodoni Moda Variable", file: "bodoni-moda-latin-opsz-normal.woff2", style: "normal", variable: true },
    { family: "Bodoni Moda Variable", file: "bodoni-moda-latin-opsz-italic.woff2", style: "italic", variable: true },
  ],
  "Public Sans Variable": [
    { family: "Public Sans Variable", file: "public-sans-latin-wght-normal.woff2", style: "normal", variable: true },
  ],
  "Space Grotesk Variable": [
    { family: "Space Grotesk Variable", file: "space-grotesk-latin-wght-normal.woff2", style: "normal", variable: true },
  ],
  "Outfit Variable": [
    { family: "Outfit Variable", file: "outfit-latin-wght-normal.woff2", style: "normal", variable: true },
  ],
  "Archivo Variable": [
    { family: "Archivo Variable", file: "archivo-latin-standard-normal.woff2", style: "normal", variable: true },
  ],
  "Bricolage Grotesque Variable": [
    { family: "Bricolage Grotesque Variable", file: "bricolage-grotesque-latin-standard-normal.woff2", style: "normal", variable: true },
  ],
  "Manrope Variable": [
    { family: "Manrope Variable", file: "manrope-latin-wght-normal.woff2", style: "normal", variable: true },
  ],
};

/** The first family in a CSS stack, unquoted. */
export function primaryFamily(stack: string): string {
  return stack.split(",")[0].trim().replace(/^["']|["']$/g, "");
}

/** Every self-hosted face this brand needs, de-duplicated, display first. */
export function facesFor(brand: BrandSystem): FontFace[] {
  const stacks = [brand.type.display, brand.type.body, brand.type.mono].filter(Boolean) as string[];
  const seen = new Set<string>();
  const out: FontFace[] = [];
  for (const stack of stacks) {
    for (const face of FONT_FACES[primaryFamily(stack)] ?? []) {
      const key = `${face.file}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(face);
    }
  }
  return out;
}

export const FONT_DIR = "/demo/_fonts";

/** @font-face block for this brand only. Inlined into the demo's <head>. */
export function fontFaceCss(brand: BrandSystem): string {
  return facesFor(brand)
    .map(
      (f) =>
        `@font-face{font-family:"${f.family}";font-style:${f.style};font-weight:100 900;font-display:swap;` +
        // "standard" files carry a width axis as well as weight
        (f.file.includes("-standard-") ? "font-stretch:62% 125%;" : "") +
        `src:url("${FONT_DIR}/${f.file}") format("woff2${f.variable ? "-variations" : ""}")}`
    )
    .join("");
}
