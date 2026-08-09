"use client";

import { motion } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

/**
 * Why Greene — the honest answer to "why you, out of 500 other studios?"
 * Five differentiators, each an operating principle a client can feel.
 */
const REASONS = [
  {
    num: "01",
    title: "Design that ships",
    desc: "We don't stop at Figma. Strategy, pixels and production code leave our studio together, so what you approve is exactly what your users touch.",
    wide: true,
  },
  {
    num: "02",
    title: "Motion with purpose",
    desc: "Animation isn't decoration here. It communicates hierarchy, personality and cause-and-effect. Choreographed, never bolted on.",
    wide: false,
  },
  {
    num: "03",
    title: "Engineers in the room",
    desc: "Design decisions account for technical reality from day one. No handoff cliff, no “that can't be built” surprises mid-project.",
    wide: false,
  },
  {
    num: "04",
    title: "Built to perform",
    desc: "Fast, responsive, accessible experiences aren't a phase in our process. They are the process. 95+ Lighthouse is the floor, not the ceiling.",
    wide: false,
  },
  {
    num: "05",
    title: "One team, one roof",
    desc: "Strategy, design, motion and development under one roof. One brief, one point of contact, zero telephone game.",
    wide: false,
  },
];

export default function WhyGreene() {
  const gridRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <section className="bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> Why Greene
            </span>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              Five hundred studios.<br />
              Here&apos;s why <span className="font-serif-i lowercase normal-case tracking-normal">us.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--brand-text-secondary)]">
            Not slogans. Operating principles. This is how the work actually gets made, every week, on every project.
          </p>
        </div>

        {/* Bento — first reason leads, the rest follow in pairs */}
        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {REASONS.map((r) => (
            <motion.div
              key={r.num}
              className={`stagger-item group relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--brand-accent)]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-10 ${
                r.wide ? "md:col-span-2" : ""
              }`}
            >
              {/* hover accent wash */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 60% 50% at 100% 0%, color-mix(in srgb, var(--brand-accent) 10%, transparent), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className={`relative flex ${r.wide ? "flex-col gap-6 md:flex-row md:items-end md:justify-between" : "flex-col gap-6"}`}>
                <div>
                  <span className="font-mono text-sm text-[var(--brand-accent)]">{r.num}</span>
                  <h3 className={`mt-3 font-display font-black uppercase leading-[0.95] tracking-tight ${r.wide ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                    {r.title}
                  </h3>
                </div>
                <p className={`leading-relaxed text-[var(--brand-text-secondary)] ${r.wide ? "max-w-md text-base md:text-lg" : "max-w-md text-sm md:text-[15px]"}`}>
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
