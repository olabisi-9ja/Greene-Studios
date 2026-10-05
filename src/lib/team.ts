/**
 * The people at Greene. Real people only: add someone here (with a
 * picture in /public/images/team/) and they appear on /team and /studio.
 */
export type Person = {
  name: string;
  role: string;
  bio: string;
  image: string | null;
};

export const TEAM: Person[] = [
  {
    name: "Olabisi Adigun",
    role: "Founder, Creative Director",
    bio: "Leads brand and product direction, and designs and builds alongside every client. Obsessed with systems that make good work repeatable.",
    image: "/images/studio/founder.webp",
  },
];
