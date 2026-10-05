/**
 * What the studio sells, in one place: the service groups on the home page,
 * the four packages and the add-ons on /pricing, and the quiz's recommendation.
 * Prices are in USD.
 */

export const SERVICE_GROUPS = [
  {
    id: "brand",
    title: "Brand",
    items: ["Brand identity", "Logo design", "Naming and copywriting", "Brand guidelines", "Packaging and print", "Pitch decks", "Social media kits"],
  },
  {
    id: "web",
    title: "Web",
    items: ["Marketing websites", "Landing pages", "E-commerce stores", "SEO and analytics setup", "Hosting and domain setup"],
  },
  {
    id: "product",
    title: "Product",
    items: ["UI/UX design", "Web apps", "Mobile apps (iOS and Android)", "Design systems", "Prototypes for investors"],
  },
  {
    id: "ongoing",
    title: "Ongoing",
    items: ["Monthly retainers", "New features and pages", "Fixes and maintenance", "Motion and logo animation"],
  },
] as const;

export type PackageId = "identity" | "website" | "product" | "retainer";

export const PACKAGES: {
  id: PackageId;
  name: string;
  pitch: string;
  /** What the client walks away with, one sentence. */
  outcome: string;
  price: string;
  timeline: string;
  note?: string;
  includes: string[];
  cta: string;
}[] = [
  {
    id: "identity",
    name: "Brand Identity",
    pitch: "For new businesses, and ones that have outgrown the logo they started with.",
    outcome: "A distinctive logo and visual system, ready to use everywhere the business shows up.",
    price: "$800 – $1.2k",
    timeline: "1 – 3 weeks",
    includes: [
      "Logo suite and marks",
      "Colour and type system",
      "Brand guidelines (PDF)",
      "Social and stationery starter kit",
      "All source files",
      "Two rounds of revisions",
    ],
    cta: "Start a brand",
  },
  {
    id: "website",
    name: "Website",
    pitch: "A site that explains what you do clearly and gets people to act.",
    outcome: "A fast, custom website that explains what you do in one look and turns visitors into enquiries.",
    price: "$1k – $1.5k",
    timeline: "1 – 3 weeks",
    includes: [
      "Custom design, up to 6 pages",
      "Responsive build",
      "SEO foundations",
      "Analytics setup",
      "Hosting and domain support",
      "Performance tuning",
    ],
    cta: "Build my website",
  },
  {
    id: "product",
    name: "Product Build",
    pitch: "For startups that need a web or mobile product built properly, start to launch.",
    outcome: "A working web or mobile product, designed and engineered by one team, live in the stores.",
    price: "$3k – $6k",
    timeline: "3 – 6 months",
    note: "Best for MVPs and rebuilds",
    includes: [
      "MVPs, major features or rebuilds",
      "iOS, Android and web",
      "Design system and Figma-to-code",
      "API, auth and payments integrations",
      "App Store and Play Store launch",
      "30 days post-launch support",
    ],
    cta: "Discuss your product",
  },
  {
    id: "retainer",
    name: "Monthly Retainer",
    pitch: "Design and engineering capacity on tap, so your team keeps shipping.",
    outcome: "Design and development every month, without hiring, so your team keeps shipping.",
    price: "From $1k / month",
    timeline: "Contract based",
    includes: [
      "Design and development each month",
      "New features and pages",
      "Fixes and maintenance",
      "Code and design reviews",
      "Monthly planning call",
      "Priority response",
    ],
    cta: "Work with us",
  },
];

export const ADD_ONS = [
  { name: "Logo only", from: "$300" },
  { name: "Landing page", from: "$500" },
  { name: "Pitch deck", from: "$350" },
  { name: "Social media kit", from: "$250" },
  { name: "Logo animation", from: "$200" },
  { name: "Naming and copy", from: "$250" },
  { name: "SEO and analytics setup", from: "$200" },
  { name: "E-commerce store", from: "$1.8k" },
];
