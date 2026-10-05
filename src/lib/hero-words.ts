/**
 * The words the home hero cycles through ("We design and build …"), each
 * with a line of its own and an illustration: /public/lottie/hero-<slug>.json.
 * Only things we actually offer (see lib/offer).
 */
export const HERO_WORDS = [
  { word: "Brands", slug: "brands", line: "with a look, a name and a voice people remember after one glance." },
  { word: "Logos", slug: "logos", line: "small enough for an app icon, bold enough for a billboard." },
  { word: "Websites", slug: "websites", line: "that feel like walking into your shop, not reading a brochure." },
  { word: "Landing pages", slug: "landing-pages", line: "that get to the point before the visitor gets bored." },
  { word: "Online stores", slug: "online-stores", line: "where checking out is the easiest part of the day." },
  { word: "Apps", slug: "apps", line: "people open because they want to, not because they have to." },
  { word: "Dashboards", slug: "dashboards", line: "that turn a wall of numbers into a decision." },
  { word: "Products", slug: "products", line: "that start as a napkin sketch and end up in people's pockets." },
  { word: "Pitch decks", slug: "pitch-decks", line: "that tell your story in ten slides, not forty." },
  { word: "Social kits", slug: "social-kits", line: "that keep every post looking like it came from the same place." },
] as const;

/** The animations the loader waits for: the first word, and the one after it. */
export const HERO_FIRST = HERO_WORDS.slice(0, 2).map((w) => `hero-${w.slug}`);
