"use client";

import { motion } from "framer-motion";

const STORIES = [
  {
    id: 1,
    client: "Acme Corp",
    author: "Jane Doe, CEO",
    metrics: { revenue: "+140% YOY", traffic: "+3x Increase", conversion: "+45% growth" },
    story: "Greene Studios helped redesign our corporate hub. The launch resulted in a complete rebranding that resonated perfectly with enterprise leads, significantly boosting our sales pipeline velocity.",
    quote: "The team delivered beyond expectation, crafting a digital brand presence that has permanently leveled up our business.",
    color: "rgba(31, 61, 58, 0.05)"
  },
  {
    id: 2,
    client: "Pulse Media",
    author: "John Smith, Head of Product",
    metrics: { revenue: "+85% sales", traffic: "+200k visits", conversion: "+30% engagement" },
    story: "Redesigning our media platform was a huge task. The new bento grid layout and smooth transitions kept readers on site longer, decreasing bounce rates immediately.",
    quote: "Antigravity UI design that completely transformed customer trust in our new content offerings.",
    color: "rgba(99, 36, 214, 0.05)"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
            Success Stories
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-text)] leading-[1.1] tracking-tight uppercase">
            Results that speak <br /> for themselves.
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {STORIES.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-10 md:p-12 rounded-[32px] border border-[var(--brand-border)] bg-[var(--brand-surface)] flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              {/* Highlight Background Burst */}
              <div 
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                style={{ backgroundColor: item.id === 1 ? "var(--brand-accent)" : "#6324D6", opacity: 0.1 }}
              />

              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[var(--brand-border)] pb-6">
                  <span className="text-xl font-bold text-[var(--brand-text)]">{item.client}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)]">{item.author}</span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                  {Object.entries(item.metrics).map(([key, val]) => (
                    <div key={key} className="bg-[var(--brand-surface-secondary)] p-4 rounded-2xl text-center border border-[var(--brand-border)]">
                      <div className="text-lg md:text-xl font-black text-[var(--brand-text)]">{val}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--brand-text-secondary)] mt-1">{key}</div>
                    </div>
                  ))}
                </div>

                <p className="text-[var(--brand-text)] text-lg font-medium leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-6 border-t border-[var(--brand-border)]">
                <span className="text-xs uppercase tracking-widest text-[var(--brand-text-secondary)] block mb-2">Launch Story</span>
                <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed">
                  {item.story}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
