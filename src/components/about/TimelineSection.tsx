"use client";

import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

const TIMELINE_DATA = [
  {
    year: "2022",
    events: [
      "Greene Studios founded in Lagos.",
      "Set the operating rule the studio still runs on: design and production code leave together.",
    ],
  },
  {
    year: "2023",
    events: [
      "Extended the practice from brand and web into product design.",
      "Standardised on a token-driven design system so every build starts from a system, not a blank file.",
    ],
  },
  {
    year: "2024",
    events: [
      "Launched Greene Journal — writing on design systems, motion and performance.",
      "Set 95+ Lighthouse as the floor for anything that ships.",
    ],
  },
  {
    year: "2026",
    events: [
      "Six concept brand systems built and published as live sites.",
      "Open for select projects worldwide.",
    ],
  },
];

export default function TimelineSection() {
  const listRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <div
      ref={listRef}
      className="mx-auto max-w-7xl border-b border-[var(--brand-border)] bg-[var(--brand-bg)] px-6 py-32 lg:px-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">
          Timeline
        </span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-text)] mb-24 tracking-tight uppercase">
        How we got here.
      </h2>

      <div className="space-y-32 relative">
        {/* A subtle line connecting all the years */}
        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-[var(--brand-border)] hidden md:block" />

        {TIMELINE_DATA.map((group) => (
          <div key={group.year} className="flex flex-col md:flex-row gap-8 md:gap-24 relative">
            {/* Sticky Year Column */}
            <div className="md:w-1/4 relative">
              <div className="sticky top-32 flex items-center gap-6">
                <div className="w-20 h-20 flex-shrink-0 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-full flex items-center justify-center shadow-sm z-10 relative">
                  <span className="text-[var(--brand-text)] text-lg font-semibold">{group.year}</span>
                </div>
              </div>
            </div>

            {/* Events for the year */}
            {/* Body copy used to sit at opacity 0.3 until scrolled into view,
                which reads as 2.4:1 against the page — below AA. The shared
                reveal starts hidden and is forced visible under
                prefers-reduced-motion. */}
            <div className="flex flex-col justify-center space-y-16 py-8 md:w-3/4">
              {group.events.map((event, j) => (
                <p
                  key={j}
                  className="stagger-item timeline-event max-w-2xl text-2xl font-medium leading-relaxed tracking-tight text-[var(--brand-text)] lg:text-3xl"
                >
                  {event}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
