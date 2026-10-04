import type { BrandSystem } from "./types";

/**
 * PACE — running gear for people who log the miles.
 *
 * Direction: track lane. Chalk and charcoal, one signal orange, condensed
 * Archivo for anything that should feel fast, and lane lines as the only
 * ornament. Product first, spec second, story last.
 */
export const pace: BrandSystem = {
  slug: "pace",
  name: "Pace",
  wordmark: "PACE",
  sector: "Sportswear · Commerce",
  tagline: "Built for the long way round.",
  direction:
    "Track lane. Chalk and charcoal, one signal orange, condensed type for speed, and lane lines as the only ornament.",
  palette: {
    light: {
      bg: "#f4f3ef",
      surface: "#ffffff",
      surfaceAlt: "#e9e7e1",
      border: "#d8d5cd",
      text: "#111111",
      textMuted: "#5d5a54",
      accent: "#ff4f1a",
      onAccent: "#111111",
    },
    dark: {
      bg: "#0e0e0d",
      surface: "#171716",
      surfaceAlt: "#1f1f1d",
      border: "#2e2d2a",
      text: "#f2f0ea",
      textMuted: "#9a978f",
      accent: "#ff6a3d",
      onAccent: "#0e0e0d",
    },
  },
  type: {
    display: '"Archivo Variable", "Archivo", "Arial Narrow", sans-serif',
    body: '"Archivo Variable", "Archivo", system-ui, sans-serif',
    displayTracking: "-0.02em",
    displayWeight: 800,
    displayCase: "uppercase",
    bodyLeading: "1.55",
  },
  radius: { sm: 0, md: 2, lg: 4, pill: 2 },
  grid: 8,
  motion: { duration: 220, ease: "cubic-bezier(0.3, 0, 0, 1)" },
  voice: [
    "Short. Write like a coach between intervals.",
    "Specs are numbers: grams, millimetres, kilometres.",
    "Never 'unleash', never 'beast mode'.",
  ],
  nav: [
    { label: "Shop", href: "/demo/pace/shop" },
    { label: "Club", href: "/demo/pace/club" },
  ],
};
