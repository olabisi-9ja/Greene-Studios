import { RUNNER_D } from "@/components/brand/runnerPath";

/**
 * The Greene brand, as values: what the Blueprint page (/blueprint) shows
 * and lets people copy. Colours are the site's own theme tokens
 * (globals.css), so the guide and the site can't drift apart.
 */

export const BASICS = [
  { label: "Name", value: "Greene Studios" },
  { label: "Tagline", value: "Digital Design Studio" },
  { label: "Email", value: "hello@greenestudios.com" },
  { label: "Website", value: "greene-studios.vercel.app" },
];

export type Swatch = {
  name: string;
  role: string;
  hex: string;
  /** the CSS custom property that carries it on the site */
  token: string;
  /** text colour that reads on it */
  on: string;
};

export const COLOURS: Swatch[] = [
  { name: "Greene Green", role: "Primary brand colour: the logo, links and buttons on light pages", hex: "#0F5132", token: "--logo (Sun)", on: "#FAFAF7" },
  { name: "Studio Green", role: "Dark ground: the default page colour", hex: "#0B3D26", token: "--brand-bg (Studio)", on: "#FAFAF7" },
  { name: "Clover Yellow", role: "Accent: the logo and buttons on Studio Green", hex: "#FFD23F", token: "--logo (Studio)", on: "#0A0A0A" },
  { name: "Leaf Green", role: "Light accent for dark pages", hex: "#5FBF8A", token: "--logo (Moon)", on: "#1A1A1A" },
  { name: "Ink", role: "Text and dark grounds", hex: "#1A1A1A", token: "--brand-ink", on: "#FAFAF7" },
  { name: "Paper", role: "Light grounds and text on dark", hex: "#FAFAF7", token: "--brand-paper (Sun)", on: "#1A1A1A" },
  { name: "Raw Orange", role: "The Raw theme: a loud ground for campaigns", hex: "#FF6A1A", token: "--brand-bg (Raw)", on: "#1A1A1A" },
];

export const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};
export const rgbString = (hex: string) => `rgb(${rgb(hex).join(", ")})`;

/** A straight conversion from screen colour; printers should proof it against a swatch. */
export const cmykString = (hex: string) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return "cmyk(0, 0, 0, 100)";
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return `cmyk(${[c, m, y, k].map((v) => Math.round(v * 100)).join(", ")})`;
};

export const hslString = (hex: string) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

export const TYPEFACE = {
  name: "Montserrat",
  stack: '"Montserrat", system-ui, Arial, sans-serif',
  link: "https://fonts.google.com/specimen/Montserrat",
  css: '@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");',
  weights: [
    { name: "Light", value: 300 },
    { name: "Regular", value: 400 },
    { name: "Medium", value: 500 },
    { name: "SemiBold", value: 600 },
    { name: "Bold", value: 700 },
  ],
};

/** How the weights are used, as set on the site. */
export const HIERARCHY = [
  { level: "Headings", weight: "SemiBold 600", use: "Hero statements, page titles, section dividers", css: "font-weight: 600; font-size: clamp(2.4rem, 6vw, 5rem); letter-spacing: -0.045em; line-height: 0.95;", sample: "Design that moves", size: "text-[2.4rem]", w: 600, track: "-0.045em" },
  { level: "Subheadings", weight: "Medium 500", use: "Section titles, card titles, eyebrows", css: "font-weight: 500; font-size: clamp(1.4rem, 2.6vw, 2rem); letter-spacing: -0.03em; line-height: 1.1;", sample: "Brand identity", size: "text-[1.6rem]", w: 500, track: "-0.03em" },
  { level: "Body", weight: "Regular 400", use: "Paragraphs, descriptions, documents", css: "font-weight: 400; font-size: 1.125rem; line-height: 1.6;", sample: "We design and build brands, websites and apps.", size: "text-lg", w: 400, track: "0" },
  { level: "Label", weight: "SemiBold 600 / Medium 500", use: "Buttons, tags, navigation, captions on cards", css: "font-weight: 600; font-size: 0.875rem; letter-spacing: -0.01em; line-height: 1;", sample: "Start a project", size: "text-sm", w: 600, track: "-0.01em" },
  { level: "Caption", weight: "Light 300", use: "Footnotes, image credits, fine print", css: "font-weight: 300; font-size: 0.75rem; line-height: 1.5;", sample: "© 2026 Greene Studios", size: "text-xs", w: 300, track: "0" },
];

const svg = (inner: string, viewBox: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${inner}</svg>`;

/** The runner: the logomark, one colour. */
export const runnerSvg = (fill: string) => svg(`<path fill="${fill}" fill-rule="evenodd" d="${RUNNER_D}"/>`, "0 0 693 715");

/** The runner with the Greene wordmark beside it. The wordmark is live text in Montserrat SemiBold: outline it before sending to print. */
export const lockupSvg = (fill: string) =>
  svg(
    `<path fill="${fill}" fill-rule="evenodd" d="${RUNNER_D}"/><text x="800" y="560" fill="${fill}" font-family="Montserrat, sans-serif" font-weight="600" font-size="500" letter-spacing="-5">Greene</text>`,
    "0 0 2780 715",
  );

/** The dot matrix from the footer globe, as a CSS background. */
export const dotPatternCss = (dot: string, ground: string) =>
  `background-color: ${ground};\nbackground-image: radial-gradient(circle, ${dot} 1.4px, transparent 1.7px);\nbackground-size: 14px 14px;`;

export const SOCIAL_SIZES = [
  { name: "Instagram / Facebook post", size: "1080 × 1080" },
  { name: "Instagram portrait", size: "1080 × 1350" },
  { name: "LinkedIn banner", size: "1584 × 396" },
  { name: "X (Twitter) header", size: "1500 × 500" },
];
