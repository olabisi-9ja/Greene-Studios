import type { BrandSystem } from "./types";

/**
 * BLOOM — healthcare software people use on a bad day.
 *
 * Direction: calm and legible, accessibility first. Every body pairing clears
 * AAA, base text is 18px rather than 16, targets are 48px minimum, and the
 * accent is a low-saturation blue-green that never has to carry meaning on its
 * own. Motion is short and never decorative.
 */
export const bloom: BrandSystem = {
  slug: "bloom",
  name: "Bloom",
  wordmark: "BLOOM",
  sector: "Healthcare · Product",
  tagline: "Care that keeps up with you.",
  direction:
    "Calm and legible. AAA contrast on body text, an 18px base, 48px touch targets, and colour that never carries meaning on its own.",
  palette: {
    light: {
      bg: "#f4f8f9",
      surface: "#ffffff",
      surfaceAlt: "#e6eff2",
      border: "#cbdbe1",
      text: "#10262d",
      textMuted: "#41616b",
      accent: "#0f6b7d",
      onAccent: "#ffffff",
    },
    dark: {
      bg: "#08171b",
      surface: "#0e2229",
      surfaceAlt: "#132d36",
      border: "#1f4551",
      text: "#eaf4f7",
      textMuted: "#a3c0c9",
      accent: "#4fb8cd",
      onAccent: "#08171b",
    },
  },
  type: {
    display: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    body: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    displayTracking: "-0.02em",
    displayWeight: 700,
    displayCase: "none",
    bodyLeading: "1.7",
  },
  radius: { sm: 8, md: 14, lg: 20, pill: 999 },
  grid: 8,
  motion: { duration: 220, ease: "cubic-bezier(0.3, 0, 0.2, 1)" },
  voice: [
    "Second person, present tense. 'You have an appointment', not 'appointment scheduled'.",
    "No medical claims, no jargon a patient would have to look up.",
    "Every error says what happened and what to do next.",
  ],
  nav: [
    { label: "For patients", href: "/demo/bloom/patients" },
    { label: "For clinics", href: "/demo/bloom/clinics" },
    { label: "Security", href: "/demo/bloom/security" },
    { label: "Support", href: "/demo/bloom/support" },
  ],
};
