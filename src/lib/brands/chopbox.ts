import type { BrandSystem } from "./types";

/**
 * CHOPBOX — food delivery across Lagos.
 *
 * Direction: warm and quick. Pepper red, palm green and cream, a chunky
 * Bricolage Grotesque that reads at a glance, and buttons sized for a thumb
 * on a moving bus.
 */
export const chopbox: BrandSystem = {
  slug: "chopbox",
  name: "Chopbox",
  wordmark: "chopbox",
  sector: "Food · Delivery",
  tagline: "Hot food from your area, fast.",
  direction:
    "Warm and quick. Pepper red, palm green and cream, type that reads at a glance, and buttons sized for a thumb on a moving bus.",
  palette: {
    light: {
      bg: "#fff8ef",
      surface: "#ffffff",
      surfaceAlt: "#fbead6",
      border: "#efd9bf",
      text: "#1d1410",
      textMuted: "#6e5a4c",
      accent: "#d93a1c",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#160f0b",
      surface: "#21170f",
      surfaceAlt: "#2b1e14",
      border: "#3a2a1d",
      text: "#fbefe2",
      textMuted: "#bba48f",
      accent: "#ff6242",
      onAccent: "#160f0b",
    },
  },
  type: {
    display: '"Bricolage Grotesque Variable", "Bricolage Grotesque", system-ui, sans-serif',
    body: '"Bricolage Grotesque Variable", "Bricolage Grotesque", system-ui, sans-serif',
    displayTracking: "-0.03em",
    displayWeight: 800,
    displayCase: "none",
    bodyLeading: "1.55",
  },
  radius: { sm: 10, md: 16, lg: 24, pill: 999 },
  grid: 8,
  motion: { duration: 240, ease: "cubic-bezier(0.34, 1.4, 0.64, 1)" },
  voice: [
    "Talk like a friend who knows every buka in the area.",
    "Times and prices up front, always in naira.",
    "Pidgin welcome in small doses; never in the checkout.",
  ],
  nav: [
    { label: "Restaurants", href: "/demo/chopbox/restaurants" },
    { label: "Ride with us", href: "/demo/chopbox/riders" },
  ],
};
