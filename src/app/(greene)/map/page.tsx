import type { Metadata } from "next";
import Link from "next/link";
import RollLabel from "@/components/ui/RollLabel";
import { JOURNAL_ARTICLES, SERVICES } from "@/lib/data";
import { PROJECTS } from "@/lib/work";
import { MarkSeen } from "@/components/chrome/NewMark";

export const metadata: Metadata = {
  title: "Map",
  description: "Every page on the Greene Studios site, in one place.",
  alternates: { canonical: "/map" },
};

type Group = { title: string; links: { label: string; href: string }[] };

/** Everything on the site, grouped. Lists come from the same data as the pages, so new ones show up here by themselves. */
const GROUPS: Group[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Gallery", href: "/gallery" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Studio", href: "/studio" },
      { label: "Team", href: "/team" },
      { label: "Journal", href: "/journal" },
      { label: "Start here", href: "/start" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { title: "Work", links: PROJECTS.map((p) => ({ label: p.name, href: `/work/${p.slug}` })) },
  { title: "Services", links: SERVICES.map((s) => ({ label: s.title, href: s.href })) },
  { title: "Journal", links: JOURNAL_ARTICLES.map((a) => ({ label: a.title, href: `/journal/${a.slug}` })) },
  {
    title: "Also",
    links: [
      { label: "Blueprint", href: "/blueprint" },
      { label: "Privacy", href: "/legal#privacy" },
      { label: "Terms", href: "/legal#terms" },
      { label: "Map", href: "/map" },
    ],
  },
];

/**
 * Map: a plain index of every page. No pictures, no cards; just the links,
 * set large, with the roll-over from the effect set and an arrow that slides
 * in, so even the plainest page moves when you point at it.
 */
export default function MapPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-40 pt-32 sm:px-8 sm:pt-40">
      <MarkSeen path="/map" />
      <h1 className="text-[clamp(3.2rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">Map</h1>
      <p className="mt-6 max-w-[40ch] text-lg text-[var(--brand-text-secondary)]">Every page on the site, in one place.</p>

      <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="border-b border-[var(--brand-border)] pb-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">
              {g.title}
            </h2>
            <ul className="m-0 mt-2 list-none p-0">
              {g.links.map((l) => (
                <li key={l.href}>
                  {/* no prefetch: a page of nothing but links would otherwise
                      download most of the site the moment it opens */}
                  <Link href={l.href} prefetch={false} className="map-link group">
                    <RollLabel text={l.label} stagger={12} />
                    <svg viewBox="0 0 24 24" className="map-arrow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </div>
  );
}
