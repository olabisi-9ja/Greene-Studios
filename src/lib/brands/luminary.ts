import type { BrandSystem } from "./types";

/**
 * LUMINARY — analytics for people who read numbers all day.
 *
 * Direction: precision instrument. Cool graphite neutrals so data carries the
 * colour, one electric accent used only for the live value, tabular mono
 * figures, and a dense 4px grid. Square-ish corners: this is a tool, not an
 * app-store card.
 */
export const luminary: BrandSystem = {
  slug: "luminary",
  name: "Luminary",
  wordmark: "LUMINARY",
  sector: "SaaS · Analytics",
  tagline: "Every number, one keystroke away.",
  direction:
    "A precision instrument. Neutral graphite so the data is the only thing with colour, tabular figures throughout, and a 4px grid that never breaks.",
  palette: {
    light: {
      bg: "#fbfbfc",
      surface: "#ffffff",
      surfaceAlt: "#f4f5f7",
      border: "#e3e5ea",
      text: "#0e1116",
      textMuted: "#5b6472",
      accent: "#2c65f0",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#0b0d11",
      surface: "#12151b",
      surfaceAlt: "#171b23",
      border: "#242a35",
      text: "#eef1f6",
      textMuted: "#8b95a6",
      accent: "#5b8cff",
      onAccent: "#0b0d11",
    },
  },
  type: {
    display: '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif',
    body: '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif',
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.035em",
    displayWeight: 600,
    displayCase: "none",
    bodyLeading: "1.6",
  },
  radius: { sm: 4, md: 8, lg: 12, pill: 999 },
  grid: 4,
  motion: { duration: 180, ease: "cubic-bezier(0.2, 0, 0, 1)" },
  voice: [
    "Declarative. States what the product does, never how it feels.",
    "Numbers in the copy wherever a number is the honest answer.",
    "No exclamation marks. No 'powerful'. No 'seamless'.",
  ],
  nav: [
    { label: "Product", href: "/demo/luminary/product" },
    { label: "Pricing", href: "/demo/luminary/pricing" },
    { label: "Docs", href: "/demo/luminary/docs" },
    { label: "Company", href: "/demo/luminary/company" },
  ],
};
