import type { BrandSystem } from "./types";

/**
 * KORA — one gateway for every AI model a product calls.
 *
 * Direction: calm infrastructure. Ink and paper with a single lime signal,
 * Manrope for warmth, mono for anything a developer would copy. No gradients,
 * no glow, no robot imagery: the product is plumbing and says so.
 */
export const kora: BrandSystem = {
  slug: "kora",
  name: "Kora",
  wordmark: "kora",
  sector: "AI · Developer platform",
  tagline: "Ship AI features without the surprises.",
  direction:
    "Calm infrastructure. Ink and paper, one lime signal, mono for anything you would copy, and no gradients or glow.",
  palette: {
    light: {
      bg: "#f7f7f2",
      surface: "#ffffff",
      surfaceAlt: "#efefe8",
      border: "#deded5",
      text: "#0d0f0c",
      textMuted: "#5c6058",
      accent: "#c6f432",
      onAccent: "#0d0f0c",
    },
    dark: {
      bg: "#0b0c0a",
      surface: "#121411",
      surfaceAlt: "#181b16",
      border: "#262a23",
      text: "#eef0e8",
      textMuted: "#959b8e",
      accent: "#d4ff4a",
      onAccent: "#0b0c0a",
    },
  },
  type: {
    display: '"Manrope Variable", "Manrope", system-ui, sans-serif',
    body: '"Manrope Variable", "Manrope", system-ui, sans-serif',
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.04em",
    displayWeight: 700,
    displayCase: "none",
    bodyLeading: "1.6",
  },
  radius: { sm: 6, md: 10, lg: 14, pill: 999 },
  grid: 4,
  motion: { duration: 160, ease: "cubic-bezier(0.2, 0, 0, 1)" },
  voice: [
    "Plain verbs. Route, log, cap, retry.",
    "Show the request, not a metaphor for it.",
    "No 'magic', no 'revolutionary', no robots.",
  ],
  nav: [
    { label: "Platform", href: "/demo/kora/platform" },
    { label: "Pricing", href: "/demo/kora/pricing" },
  ],
};
