import type { Metadata } from "next";
import { PROJECTS, allPictures } from "@/lib/work";
import Pic from "@/components/ui/Pic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every picture from Greene Studios' work, in one scroll.",
  alternates: { canonical: "/gallery" },
};

/** Projects take turns, so the scroll mixes the work instead of grouping it. */
function interleave(): { src: string; name: string }[] {
  const lists = PROJECTS.map((p) => allPictures(p).map((src) => ({ src, name: p.name })));
  const out: { src: string; name: string }[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const l of lists) if (l[i]) out.push(l[i]);
  }
  return out;
}

/**
 * A run of placements on a 12-column grid that never mirrors itself: wide
 * then narrow, offset starts, some pictures dropped lower than their
 * neighbour, one full-width breather. It repeats every nine pictures.
 */
const PLACE = [
  "col-span-6 md:col-start-1 md:col-span-7",
  "col-start-3 col-span-4 md:col-start-9 md:col-span-4 md:mt-40",
  "col-span-5 md:col-start-3 md:col-span-5",
  "col-start-2 col-span-5 md:col-start-9 md:col-span-4 md:-mt-12",
  "col-span-6 md:col-start-2 md:col-span-10",
  "col-span-4 md:col-start-1 md:col-span-4 md:mt-48",
  "col-start-2 col-span-5 md:col-start-6 md:col-span-7",
  "col-span-5 md:col-start-4 md:col-span-6",
  "col-start-3 col-span-4 md:col-start-8 md:col-span-5 md:mt-28",
];

/** Gallery: the work and nothing else. */
export default function GalleryPage() {
  const pictures = interleave();
  return (
    <div className="px-5 pb-40 pt-32 sm:px-8 sm:pt-40">
      <h1 className="sr-only">Gallery</h1>
      <ul className="m-0 mx-auto grid max-w-[1400px] list-none grid-cols-6 gap-x-4 gap-y-10 p-0 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
        {pictures.map((p, i) => (
          <li key={p.src} className={PLACE[i % PLACE.length]}>
            <Pic
              src={p.src}
              alt={`${p.name}, picture`}
              sizes="(min-width: 768px) 45vw, 70vw"
              priority={i < 2}
              className="block h-auto w-full rounded-[8px] bg-[var(--brand-surface-secondary)]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
