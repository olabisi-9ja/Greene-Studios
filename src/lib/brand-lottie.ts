/**
 * Recolours a Lottie animation into the Greene palette, so animations from
 * anywhere sit in the brand.
 *
 * Every solid colour in the file (fills, strokes, gradient stops, and their
 * keyframes) is sorted into one of three kinds:
 *   - neutrals (greys, near-white, near-black) stay neutral, nudged to the
 *     brand's off-white and charcoal at the ends;
 *   - skin tones are left alone, so people still look like people;
 *   - every other colour becomes the accent (or the soft accent for pale
 *     tints), which globals.css swaps for the theme's own accent colour.
 */

type RGB = [number, number, number];

function toHsl([r, g, b]: RGB): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60;
  return [h, s, l];
}


// lottie-web truncates to integers, so +0.2 lands exactly on 31,157,99 / 207,238,221
const ACCENT: RGB = [31.2 / 255, 157.2 / 255, 99.2 / 255];
const ACCENT_SOFT: RGB = [207.2 / 255, 238.2 / 255, 221.2 / 255];

export function brandColor(c: RGB): RGB {
  const [h, s, l] = toHsl(c);
  if (s < 0.14) {
    // neutrals: pull the extremes onto the brand's off-white and charcoal
    // exact 250,250,247 and 26,26,26 once lottie-web truncates; globals.css
    // swaps these two values for the theme's paper and ink
    if (l > 0.93) return [250.2 / 255, 250.2 / 255, 247.2 / 255];
    if (l < 0.14) return [26.2 / 255, 26.2 / 255, 26.2 / 255];
    return c;
  }
  const skin = h >= 12 && h <= 42 && s >= 0.2 && s <= 0.8 && l >= 0.45 && l <= 0.88;
  if (skin) return c;
  // every other colour is the accent: pale tints become the soft accent.
  // Both are exact values globals.css swaps for the theme's accent.
  return l > 0.8 ? ACCENT_SOFT : ACCENT;
}

const isRgbArray = (v: unknown): v is number[] =>
  Array.isArray(v) && (v.length === 3 || v.length === 4) && v.every((n) => typeof n === "number" && n >= 0 && n <= 1);

/** Walks a Lottie JSON and recolours it in place. Returns the same object. */
export function recolorLottie<T>(data: T): T {
  const visit = (node: unknown, key?: string): void => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((n) => visit(n));
      return;
    }
    const o = node as Record<string, unknown>;
    // solid colour property: { c: { k: [r,g,b,a] } } or keyframed { c: { k: [{ s: [...] }, …] } }
    if ((key === "c" || key === "sc" || key === "fc") && "k" in o) {
      // some files drive colours by expression from a hidden control layer,
      // which would override the recoloured value
      delete o.x;
      const k = o.k;
      if (isRgbArray(k)) {
        const [r, g, b] = brandColor([k[0], k[1], k[2]]);
        o.k = k.length === 4 ? [r, g, b, k[3]] : [r, g, b];
      } else if (Array.isArray(k)) {
        k.forEach((kf) => {
          if (kf && typeof kf === "object") {
            for (const p of ["s", "e"] as const) {
              const v = (kf as Record<string, unknown>)[p];
              if (isRgbArray(v)) {
                const [r, g, b] = brandColor([v[0], v[1], v[2]]);
                (kf as Record<string, unknown>)[p] = v.length === 4 ? [r, g, b, v[3]] : [r, g, b];
              }
            }
          }
        });
      }
    }
    // gradients: { g: { p: count, k: { k: [pos,r,g,b, pos,r,g,b, …, opacities…] } } }
    if (key === "g" && typeof o.p === "number" && o.k && typeof o.k === "object") {
      const stops = o.p as number;
      const inner = (o.k as Record<string, unknown>).k;
      if (Array.isArray(inner) && inner.every((n) => typeof n === "number")) {
        for (let i = 0; i < stops; i++) {
          const at = i * 4;
          const [r, g, b] = brandColor([inner[at + 1] as number, inner[at + 2] as number, inner[at + 3] as number]);
          inner[at + 1] = r;
          inner[at + 2] = g;
          inner[at + 3] = b;
        }
      }
    }
    for (const [k, v] of Object.entries(o)) visit(v, k);
  };
  visit(data);
  return data;
}
