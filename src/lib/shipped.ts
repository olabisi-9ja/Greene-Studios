/**
 * Work that is live on the internet right now.
 *
 * This is the real portfolio: sites built for people, deployed and running.
 * It sits ahead of the concept systems in `src/lib/brands/` everywhere the two
 * appear together, because a link a visitor can open outranks anything the
 * studio made for itself.
 *
 * `summary` is intentionally short and factual. Nothing in this file describes
 * a result, a metric or a client relationship that has not been confirmed —
 * the whole point of the last pass was removing claims of that kind.
 */
export interface ShippedProject {
  slug: string;
  name: string;
  /** Live URL. Every entry here must resolve. */
  url: string;
  /** What the site is, in a few words. */
  summary: string;
  /** Discipline tags. */
  tags: string[];
  /** Where it runs. */
  platform: "Vercel" | "Cloudflare Workers";
  /** Screenshot, produced by `npm run shoot:live`. Absent until that has run. */
  shot?: string;
}

export const SHIPPED: ShippedProject[] = [
  {
    slug: "aipal-assist",
    name: "AIPal Assist",
    url: "https://www.aipalassist.com/",
    summary: "Product site for an AI assistant, on its own domain.",
    tags: ["Web design", "Product marketing"],
    platform: "Vercel",
  },
  {
    slug: "crypto-with-shola",
    name: "Crypto with Shola",
    url: "https://crypto-with-shola.vercel.app/",
    summary: "Creator site for a crypto educator.",
    tags: ["Brand", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "adetayo-studios",
    name: "Adetayo Studios",
    url: "https://adetayo-studios.vercel.app/",
    summary: "Studio site.",
    tags: ["Brand", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "self-made-socials",
    name: "Self Made Socials",
    url: "https://self-made-socials.vercel.app/",
    summary: "Site for a social media agency.",
    tags: ["Web design", "Agency"],
    platform: "Vercel",
  },
  {
    slug: "phay-shot-it",
    name: "Phay Shot It",
    url: "https://phay-shot-it.vercel.app/",
    summary: "Photographer's portfolio.",
    tags: ["Portfolio", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "akpaka",
    name: "Akpaka",
    url: "https://akpaka-ng.vercel.app/",
    summary: "Site for a Nigerian brand.",
    tags: ["Brand", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "nelson-bay",
    name: "Nelson Bay",
    url: "https://nelson-bay.vercel.app/",
    summary: "Brand site.",
    tags: ["Brand", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "tee-dan",
    name: "Tee Dan",
    url: "https://tee-dan.vercel.app/",
    summary: "Brand site.",
    tags: ["Brand", "Web design"],
    platform: "Vercel",
  },
  {
    slug: "str-ke",
    name: "Strke",
    url: "https://str-ke.vercel.app/",
    summary: "Web project.",
    tags: ["Web design"],
    platform: "Vercel",
  },
  {
    slug: "figma-tool",
    name: "Figma Tool",
    url: "https://my-figma.abeladigun11.workers.dev/",
    summary: "An internal design tool, running on Cloudflare Workers.",
    tags: ["Product", "Engineering"],
    platform: "Cloudflare Workers",
  },
];

export const SHIPPED_BY_SLUG: Record<string, ShippedProject> = Object.fromEntries(
  SHIPPED.map((p) => [p.slug, p])
);
