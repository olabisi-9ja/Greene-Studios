"use client";

import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

const TIMELINE_DATA = [
  {
    year: "2022",
    events: [
      "Greene Studios founded as a solo practice. One rule from day one, design and production code leave together.",
      "Built early websites for startups, learning to understand businesses deeply before touching a design file.",
    ],
  },
  {
    year: "2023",
    events: [
      "Expanded from brand and web into product design, supporting teams from first prototype to launch.",
      "Standardised on a token-driven design system so every build starts from a system, not a blank file.",
    ],
  },
  {
    year: "2024",
    events: [
      "Launched Greene Journal, writing on design systems, motion and performance from real project work.",
      "Set 95 plus Lighthouse as the floor for anything that ships. Performance became part of the design brief, not a ticket after.",
    ],
  },
  {
    year: "2026",
    events: [
      "Six concept brand systems built and published as live sites, each one a full system to learn from.",
      "Remote by design, available worldwide. Open for select projects with teams who care about craft.",
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
      <h2 className="font-display text-4xl font-black tracking-tight text-[var(--brand-text)] md:text-5xl">
        How we got here
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
        Four years of choosing craft over shortcuts. Each chapter shaped how we work today, remote, focused, and invested in work that lasts.
      </p>

      <div className="space-y-32 relative mt-24">
        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-[var(--brand-border)] hidden md:block" />

        {TIMELINE_DATA.map((group) => (
          <div key={group.year} className="flex flex-col md:flex-row gap-8 md:gap-24 relative">
            <div className="md:w-1/4 relative">
              <div className="sticky top-32 flex items-center gap-6">
                <div className="w-20 h-20 flex-shrink-0 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-full flex items-center justify-center shadow-sm z-10 relative">
                  <span className="text-[var(--brand-text)] text-lg font-semibold">{group.year}</span>
                </div>
              </div>
            </div>

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
