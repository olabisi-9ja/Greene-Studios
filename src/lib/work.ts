import { IMAGE_DIMS } from "@/lib/image-dims";
/**
 * The studio's own work: real projects only. Images live in
 * public/images/real/<slug>/: NN.webp are the presentation pictures (01 is
 * the cover), live-desktop/live-mobile are screenshots of the live site.
 * Copy is kept short and factual; edit it freely.
 */
export type Project = {
  slug: string;
  name: string;
  kind: string;
  /** One line under the name. */
  line: string;
  /** A short paragraph for the project page. */
  about: string;
  /** What we made. */
  made: string[];
  images: string[];
  /** Screenshots of the live site, when there is one. */
  live?: { desktop: string; mobile: string };
  url?: string;
};

// only pictures that exist (lib/image-dims lists every file in /public/images), so a deleted
// picture drops out of its project instead of showing as a broken image
const imgs = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/images/real/${slug}/${String(i + 1).padStart(2, "0")}.webp`).filter((src) => src in IMAGE_DIMS);
const shots = (slug: string) => ({ desktop: `/images/real/${slug}/live-desktop.webp`, mobile: `/images/real/${slug}/live-mobile.webp` });

export const PROJECTS: Project[] = [
  {
    slug: "aipal",
    name: "AiPal",
    kind: "Brand identity · Mobile app · Website",
    line: "A voice-first personal assistant, from the mark to every screen.",
    about: "AiPal helps people stay organised and supported by talking to it. We made the brand, the app and the site that sells it, in one calm green system.",
    made: ["Logo and app icon", "Mobile app design", "Website", "Brand system"],
    images: imgs("aipal", 10),
    live: shots("aipal"),
    url: "https://www.aipalassist.com/",
  },
  {
    slug: "payvault",
    name: "PayVault",
    kind: "Brand identity · Website",
    line: "A secure fintech brand that looks as safe as it is.",
    about: "A payments company that needed to feel solid from the first look. A shield mark, a strict type system and a site built around trust.",
    made: ["Logo", "Website design", "Brand applications"],
    images: imgs("payvault", 3),
  },
  {
    slug: "strike",
    name: "Strike",
    kind: "Brand identity · Apparel · E-commerce",
    line: "Heavyweight streetwear, built for concrete.",
    about: "A clothing label with a hard edge. The wordmark, the apparel graphics and an online store that feels like the clothes.",
    made: ["Wordmark", "Apparel graphics", "E-commerce website"],
    images: imgs("strike", 4),
    live: shots("strike"),
    url: "https://str-ke.vercel.app/",
  },
  {
    slug: "safe",
    name: "S.A.F.E.",
    kind: "Product design · Web app · Mobile app",
    line: "A safety dashboard and SOS app, built for quick decisions.",
    about: "Security teams watch the dashboard; people in trouble press one button on their phone. Both had to be clear under pressure.",
    made: ["Web dashboard", "Mobile SOS app", "Design system"],
    images: imgs("safe", 1),
  },
  {
    slug: "crypto-with-shola",
    name: "Crypto with Shola",
    kind: "Brand · Website",
    line: "Live trading and mentorship, without the hype.",
    about: "A crypto educator's home online: lessons, signals and a community to join. Warm, plain and easy to trust.",
    made: ["CWS mark", "Website", "Membership pages"],
    images: imgs("crypto-with-shola", 1),
    live: shots("crypto-with-shola"),
    url: "https://crypto-with-shola.vercel.app/",
  },
  {
    slug: "greene",
    name: "Greene Studios",
    kind: "Brand identity",
    line: "Our own identity: the runner, the type and the posts.",
    about: "The studio's own brand: the running mark with the clover pen, Montserrat, the greens and Clover Yellow, and the posts and guide that carry them.",
    made: ["Logo and runner", "Social posts", "Brand guide"],
    images: imgs("greene", 2),
  },
];

export const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

/** Every picture of a project, presentation first, then the live site. */
export const allPictures = (p: Project) => [...p.images, ...(p.live ? [p.live.desktop, p.live.mobile] : [])];
