import type { BrandSystem } from "./types";

/**
 * PRISM — learning software that doesn't talk down.
 *
 * Direction: bright and structured. A primary-leaning palette used in flat
 * blocks, a geometric sans, and a hard 8px grid holding the colour in place —
 * playful because of the colour, credible because of the structure.
 */
export const prism: BrandSystem = {
  slug: "prism",
  name: "Prism",
  wordmark: "PRISM",
  sector: "Education · Web app",
  tagline: "One subject at a time.",
  direction:
    "Bright and structured. Flat primary blocks and a geometric sans, held together by a hard 8px grid so the colour reads as a system, not as decoration.",
  palette: {
    light: {
      bg: "#fdfcf7",
      surface: "#ffffff",
      surfaceAlt: "#f1eee2",
      border: "#ded9c8",
      text: "#1b1a17",
      textMuted: "#5f5c52",
      accent: "#c34727",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#141310",
      surface: "#1c1b17",
      surfaceAlt: "#24221d",
      border: "#35322a",
      text: "#f6f4ec",
      textMuted: "#a5a094",
      accent: "#ff7a52",
      onAccent: "#141310",
    },
  },
  type: {
    display: '"Outfit Variable", "Outfit", system-ui, sans-serif',
    body: '"Outfit Variable", "Outfit", system-ui, sans-serif',
    displayTracking: "-0.03em",
    displayWeight: 700,
    displayCase: "none",
    bodyLeading: "1.65",
  },
  radius: { sm: 6, md: 16, lg: 28, pill: 999 },
  grid: 8,
  motion: { duration: 300, ease: "cubic-bezier(0.34, 1.2, 0.64, 1)" },
  voice: [
    "Direct and unpatronising. Never 'fun!', never 'gamified'.",
    "Says what a learner will be able to do, not what the platform offers.",
    "Progress described in work completed, not in streaks or points.",
  ],
  nav: [
    { label: "Courses", href: "/demo/prism/courses" },
    { label: "For schools", href: "/demo/prism/schools" },
    { label: "Pricing", href: "/demo/prism/pricing" },
  ],
};
