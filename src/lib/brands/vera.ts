import type { BrandSystem } from "./types";

/**
 * VERA — wellness, without the pharmacy aisle.
 *
 * Direction: warm and tactile. Clay, sand and moss instead of clinical white
 * and blue; a high-contrast variable serif set large and loose; generous air;
 * long, soft easing. Corners are round because the products are.
 */
export const vera: BrandSystem = {
  slug: "vera",
  name: "Vera",
  wordmark: "VERA",
  sector: "Wellness · Brand & Commerce",
  tagline: "Made from things you can name.",
  direction:
    "Warm and tactile. A palette taken from clay, sand and moss, a high-contrast serif given room to breathe, and easing slow enough to lower a heart rate.",
  palette: {
    light: {
      bg: "#f6f1e8",
      surface: "#fffdf9",
      surfaceAlt: "#ece4d6",
      border: "#ddd2be",
      text: "#2b241c",
      textMuted: "#7b6d5c",
      accent: "#8a6a4b",
      onAccent: "#fffdf9",
    },
  },
  type: {
    display: '"Fraunces Variable", "Fraunces", Georgia, serif',
    body: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    displayTracking: "-0.02em",
    displayWeight: 400,
    displayCase: "none",
    bodyLeading: "1.75",
  },
  radius: { sm: 8, md: 18, lg: 32, pill: 999 },
  grid: 8,
  motion: { duration: 600, ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
  voice: [
    "Plain nouns. If an ingredient has a common name, use it.",
    "Never claims a health outcome. Describes what is in the jar.",
    "Sentences run long and settle. No urgency, no countdowns.",
  ],
  nav: [
    { label: "Shop", href: "/demo/vera/shop" },
    { label: "Ritual", href: "/demo/vera/ritual" },
    { label: "Ingredients", href: "/demo/vera/ingredients" },
    { label: "Journal", href: "/demo/vera/journal" },
  ],
};
