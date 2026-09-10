import type { BrandSystem } from "./types";

/**
 * ARC — fashion commerce that reads like a magazine.
 *
 * Direction: editorial monochrome. Bodoni at display sizes against near-black
 * and paper, hairline rules, no rounded corners anywhere, and imagery allowed
 * to run full bleed. The only colour in the system is the photography.
 */
export const arc: BrandSystem = {
  slug: "arc",
  name: "Arc",
  wordmark: "ARC",
  sector: "Fashion · Commerce",
  tagline: "Fewer, better, longer.",
  direction:
    "Editorial monochrome. A high-contrast didone at magazine scale, hairline rules, square corners throughout, and photography carrying every bit of the colour.",
  palette: {
    light: {
      bg: "#f7f6f4",
      surface: "#ffffff",
      surfaceAlt: "#eceae6",
      border: "#1a1a1a",
      text: "#111111",
      textMuted: "#6a6a6a",
      accent: "#111111",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#0d0d0d",
      surface: "#141414",
      surfaceAlt: "#1c1c1c",
      border: "#f2f2f2",
      text: "#f4f4f4",
      textMuted: "#9a9a9a",
      accent: "#f4f4f4",
      onAccent: "#0d0d0d",
    },
  },
  type: {
    display: '"Bodoni Moda Variable", "Bodoni Moda", "Didot", Georgia, serif',
    body: '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif',
    displayTracking: "-0.01em",
    displayWeight: 500,
    displayCase: "none",
    bodyLeading: "1.65",
  },
  radius: { sm: 0, md: 0, lg: 0, pill: 0 },
  grid: 8,
  motion: { duration: 450, ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
  voice: [
    "Short. Often a fragment. The photograph is doing the talking.",
    "Fabric, cut and origin named exactly. No 'elevated', no 'curated'.",
    "Prices shown plainly, never struck through.",
  ],
  nav: [
    { label: "New", href: "/demo/arc/new" },
    { label: "Collection", href: "/demo/arc/collection" },
    { label: "Stories", href: "/demo/arc/stories" },
    { label: "Atelier", href: "/demo/arc/atelier" },
  ],
};
