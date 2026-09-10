import type { BrandSystem } from "./types";

/**
 * The narrative behind each concept system.
 *
 * Kept out of the brand files themselves so those stay a pure description of
 * the system — palette, type, grid — while this holds the argument for why it
 * is shaped that way. Every claim here is about a decision, not an outcome:
 * a concept brand has no revenue, no users and no NPS, and saying otherwise
 * would put the site straight back where it started.
 */
export interface CaseStudy {
  slug: string;
  /** The problem the system was built to work through. */
  brief: string;
  /** Three decisions worth defending, each with the reason. */
  decisions: { title: string; body: string }[];
  /** What the build turned out to be about. */
  build: string;
  /** The honest thing learned. */
  learned: string;
  /** Pages in the demo, for the gallery. */
  gallery: { label: string; file: string }[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  luminary: {
    slug: "luminary",
    brief:
      "Analytics tools are built to demo well to an executive and then used all day by an analyst. Those are different jobs, and the second one loses. Luminary was an attempt to design for the person who has the tool open for eight hours rather than eight minutes.",
    decisions: [
      {
        title: "Neutral graphite, one accent",
        body: "If the interface has colour, the data cannot. Everything structural is graphite; the single electric blue is reserved for the live value and the primary action. On a dashboard, colour has to mean something.",
      },
      {
        title: "Tabular figures everywhere",
        body: "Proportional numerals make columns of numbers wobble, and a wobbling column is harder to scan. Every figure in the system is tabular, which is also why the type pairing includes a mono.",
      },
      {
        title: "Nothing longer than 180ms",
        body: "Motion that reads as elegant on a marketing page reads as lag in a tool you use all day. The whole system moves in 180ms on a near-linear curve, and the only thing that animates is state.",
      },
    ],
    build:
      "A 4px grid, four radius steps, and a type scale with one family doing display and body. The product page renders its interface as a diagram rather than a fake screenshot — this is a concept, and a mocked-up screenshot pretending to be software would be the wrong kind of persuasive.",
    learned:
      "Committing to a 4px grid made most layout decisions disappear. When every spacing value is a multiple of four, there is no argument about whether something should be 18 or 20 — it is 16 or 20, and one of them is obviously right.",
    gallery: [
      { label: "Product", file: "product" },
      { label: "Pricing", file: "pricing" },
      { label: "Docs", file: "docs" },
      { label: "Company", file: "company" },
    ],
  },
  vera: {
    slug: "vera",
    brief:
      "Wellness branding has converged on two looks: clinical white-and-blue, or a beige minimalism that says nothing at all. Vera was a test of whether a third option holds up — warm, tactile, specific — without sliding into the pseudo-scientific language the category is full of.",
    decisions: [
      {
        title: "A palette from materials, not moods",
        body: "Clay, sand and moss, sampled rather than invented. The result is warmer than the category default and, more usefully, it makes the product photography sit inside the brand instead of on top of it.",
      },
      {
        title: "One serif, given room",
        body: "Fraunces at 400 rather than a heavier weight, with generous leading and a long measure. The restraint is the luxury signal; a bolder setting would have read as a supermarket own-brand.",
      },
      {
        title: "600ms easing",
        body: "Three times slower than Luminary. Nothing on Vera snaps. The motion is doing brand work rather than feedback work, and a wellness brand that moves briskly is arguing against itself.",
      },
    ],
    build:
      "Centred compositions throughout — the opposite of Luminary's left-aligned grid — because a shop should feel arranged rather than laid out. Product imagery is generated from the brand's own tokens, so the range looks like a range without a single photograph.",
    learned:
      "Writing the ingredients page first fixed the rest of the voice. Once the constraint was 'name the thing, say where it is from, say why', the marketing copy had nowhere to hide, and it got much better.",
    gallery: [
      { label: "Shop", file: "shop" },
      { label: "Ritual", file: "ritual" },
      { label: "Ingredients", file: "ingredients" },
      { label: "Journal", file: "journal" },
    ],
  },
  arc: {
    slug: "arc",
    brief:
      "Most fashion e-commerce looks like software with clothes in it. Arc was an attempt to build a store that reads like a magazine — where the grid, the type and the restraint do the work that discounting usually does.",
    decisions: [
      {
        title: "Zero radius, everywhere",
        body: "Not a single rounded corner in the system. Rounded corners read as friendly, and friendly is not what this brand is selling. The hard edge is doing more work here than any colour choice could.",
      },
      {
        title: "A didone at magazine scale",
        body: "Bodoni Moda set large, where its thick-thin contrast actually shows. Below about 32px a didone is just a serif; the whole point is to run it at a size where the stroke modulation is visible.",
      },
      {
        title: "Monochrome, so the clothes carry the colour",
        body: "The entire palette is paper, near-black and one grey. Any accent colour would have to compete with the product, and the product should win.",
      },
    ],
    build:
      "Hairline rules instead of cards, full-bleed imagery, and a four-column grid that holds from the collection page to the stories. The mark is drawn as a filled path rather than a stroke so its own thick-thin contrast matches the typeface.",
    learned:
      "The first version of the mark was a uniform crescent and it filled into an unreadable blob at 16px. Building the contact sheet that renders every logo at 72, 32, 24 and 16px in both themes caught it — and caught two more in the same pass.",
    gallery: [
      { label: "Collection", file: "collection" },
      { label: "New in", file: "new" },
      { label: "Stories", file: "stories" },
      { label: "Atelier", file: "atelier" },
    ],
  },
  bloom: {
    slug: "bloom",
    brief:
      "People open healthcare software on their worst day, on an old phone, in a corridor with one bar of signal. Bloom was built to see how much of a design system falls out of taking that seriously as the primary case rather than the edge case.",
    decisions: [
      {
        title: "AAA body contrast, not AA",
        body: "The higher bar changed the palette rather than the other way round. Several colours that looked right had to go, which is the point — accessibility as a constraint you design inside, not a check you run at the end.",
      },
      {
        title: "18px base, 48px targets",
        body: "Two pixels of body copy and a larger tap target do not sound like brand decisions. On this product they are the brand decision, and every other spacing value follows from them.",
      },
      {
        title: "Colour never carries meaning alone",
        body: "Status is a word and a shape as well as a colour, throughout. It also means the system survives being printed, screenshotted, or read by someone who does not see the accent.",
      },
    ],
    build:
      "The calmest layout of the six: wide measure, generous vertical rhythm, and motion capped at 220ms. Numbered steps use a filled circle rather than a hairline outline because outlined numerals fail at small sizes for exactly the readers this product is for.",
    learned:
      "Designing to AAA made the whole thing look better, not worse. The constraint removed the low-contrast greys that every interface reaches for by default, and nothing was lost.",
    gallery: [
      { label: "Patients", file: "patients" },
      { label: "Clinics", file: "clinics" },
      { label: "Security", file: "security" },
      { label: "Support", file: "support" },
    ],
  },
  onyx: {
    slug: "onyx",
    brief:
      "Every bank publishes a fee schedule, and almost none of them put it on the homepage. Onyx started from the opposite premise: what does the design system look like if the fee table is the hero, and the brand has to survive that?",
    decisions: [
      {
        title: "The fee table on the homepage",
        body: "Sixteen lines, above the fold on the second screen. The entire brand argument is that the list is short enough to publish, so hiding it in a footer link would undercut the product.",
      },
      {
        title: "One warm metallic against near-black",
        body: "Money brands reach for either navy trust or neon disruption. A single warm gold on near-black is neither, and it survives being the only colour in a system full of numbers.",
      },
      {
        title: "Short motion, no bounce",
        body: "200ms on a curve that decelerates and stops. Nothing overshoots. A balance that springs into place is a balance you trust slightly less, and there is no upside to being playful with someone's money.",
      },
    ],
    build:
      "Tabular figures throughout, right-aligned in every table, with credits in the accent and debits in the text colour. The mark is a cut stone with one lit facet — enough structure to read at 16px, no gradient anywhere.",
    learned:
      "Writing the pricing page as four grouped tables rather than three marketing cards made the product clearer to design. When the copy has nowhere to be vague, the layout stops needing to compensate.",
    gallery: [
      { label: "Accounts", file: "accounts" },
      { label: "Pricing", file: "pricing" },
      { label: "Security", file: "security" },
    ],
  },
  prism: {
    slug: "prism",
    brief:
      "Education software has largely settled on gamification: streaks, points, badges for showing up. Prism was built to test whether a system can feel energetic through colour and structure alone, with none of that — and still hold a teenager's attention.",
    decisions: [
      {
        title: "Colour in flat blocks, on a hard grid",
        body: "The energy comes from large areas of flat primary held in strict alignment. Gradients and shadows would have made it decorative; the 8px grid is what keeps it reading as a system.",
      },
      {
        title: "Progress is work finished",
        body: "No streaks, no points, no leaderboards. A course is a fixed list, and the interface says how much of it is done. There is deliberately no way to look busy on Prism.",
      },
      {
        title: "A geometric sans doing both jobs",
        body: "Outfit for display and body. One family keeps the system light enough to load on a school laptop over 3G, which is the actual constraint the product has.",
      },
    ],
    build:
      "Course tiles are generated compositions rather than photographs — three deterministic layouts seeded by index, so a catalogue of six looks varied without a single asset to art-direct.",
    learned:
      "Removing every reward mechanic made the copy carry more weight, and it exposed how much of the category's writing exists to make a thin product feel eventful.",
    gallery: [
      { label: "Courses", file: "courses" },
      { label: "For schools", file: "schools" },
      { label: "Pricing", file: "pricing" },
    ],
  },
};

export function caseStudyFor(brand: BrandSystem): CaseStudy | undefined {
  return CASE_STUDIES[brand.slug];
}
