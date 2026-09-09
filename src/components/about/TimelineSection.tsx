"use client";

import { motion } from "framer-motion";

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
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 border-b border-[var(--brand-border)] bg-[var(--brand-bg)] transition-colors duration-1000">
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
            <div className="md:w-3/4 flex flex-col justify-center space-y-16 py-8">
              {group.events.map((event, j) => (
                <motion.p
                  key={j}
                  initial={{ opacity: 0.3, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6 }}
                  className="timeline-event text-[var(--brand-text)] text-2xl lg:text-3xl leading-relaxed tracking-tight font-medium max-w-2xl"
                >
                  {event}
                </motion.p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
