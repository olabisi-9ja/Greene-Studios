import type { BrandSystem } from "./types";

/**
 * ONYX — money, handled quietly.
 *
 * Direction: dark and confident. A near-black ground with a single warm
 * metallic accent, tabular figures everywhere a number appears, tight
 * grotesk headings, and motion kept short — nothing about money should
 * bounce.
 */
export const onyx: BrandSystem = {
  slug: "onyx",
  name: "Onyx",
  wordmark: "ONYX",
  sector: "Fintech · Product",
  tagline: "Your money, in plain sight.",
  direction:
    "Dark and confident. One warm metallic against near-black, tabular figures wherever a number appears, and motion short enough that nothing about money bounces.",
  palette: {
    light: {
      bg: "#f5f5f4",
      surface: "#ffffff",
      surfaceAlt: "#eaeae8",
      border: "#d6d6d2",
      text: "#14140f",
      textMuted: "#63635c",
      accent: "#83682d",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#0a0a09",
      surface: "#121211",
      surfaceAlt: "#1a1a18",
      border: "#2a2a27",
      text: "#f0efe9",
      textMuted: "#8f8f86",
      accent: "#c9a227",
      onAccent: "#0a0a09",
    },
  },
  type: {
    display: '"Space Grotesk Variable", "Space Grotesk", system-ui, sans-serif',
    body: '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif',
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.03em",
    displayWeight: 600,
    displayCase: "none",
    bodyLeading: "1.6",
  },
  radius: { sm: 4, md: 10, lg: 16, pill: 999 },
  grid: 4,
  motion: { duration: 200, ease: "cubic-bezier(0.32, 0, 0.24, 1)" },
  voice: [
    "Exact. Amounts, dates and fees stated, never rounded for comfort.",
    "No hype about wealth. The product is a ledger, not a lifestyle.",
    "Every fee named on the page that charges it.",
  ],
  nav: [
    { label: "Accounts", href: "/demo/onyx/accounts" },
    { label: "Pricing", href: "/demo/onyx/pricing" },
    { label: "Security", href: "/demo/onyx/security" },
  ],
};
