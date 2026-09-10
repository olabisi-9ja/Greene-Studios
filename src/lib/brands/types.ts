/**
 * A concept brand system.
 *
 * Every demo site under /demo is driven entirely by one of these. Nothing in
 * a demo may reach for a Greene token (`--brand-*`) — the whole point is that
 * six systems sit side by side and look like six different studios made them.
 */
export interface BrandPalette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  onAccent: string;
}

export interface BrandType {
  /** CSS font-family stack for display/headings. */
  display: string;
  /** CSS font-family stack for body copy. */
  body: string;
  /** CSS font-family stack for figures and code, when the brand uses one. */
  mono?: string;
  /** Heading tracking, e.g. "-0.04em". */
  displayTracking: string;
  /** Heading weight — part of the brand's voice, not a default. */
  displayWeight: number;
  /** Heading case treatment. */
  displayCase: "uppercase" | "none";
  /** Body line-height. */
  bodyLeading: string;
}

export interface BrandSystem {
  slug: string;
  name: string;
  /** Shown in the demo's own chrome. */
  wordmark: string;
  sector: string;
  tagline: string;
  /** One line on the identity direction, used on the case study. */
  direction: string;
  palette: { light: BrandPalette; dark?: BrandPalette };
  type: BrandType;
  /** Corner radius scale, in px. 0 is a legitimate answer. */
  radius: { sm: number; md: number; lg: number; pill: number };
  /** Base grid unit in px. */
  grid: number;
  /** The brand's motion character — duration in ms and an easing curve. */
  motion: { duration: number; ease: string };
  /** Voice notes that drove the copy on the demo. */
  voice: string[];
  /** Nav for the demo site. */
  nav: { label: string; href: string }[];
}
