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
    role: "Founder · Designer and full-stack engineer",
    bio: "Olabisi started with typography and layout, moved into freelance work, then into software. Today Olabisi designs and builds AI and offline-first products end to end, from the brand to the database, and leads every Greene project from the first sketch to launch day.",
    image: "/images/studio/founder.webp",
  },
];
