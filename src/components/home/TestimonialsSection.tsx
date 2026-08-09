"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

/**
 * Testimonials — every quote is anchored to a real case study and its
 * headline result. Proof, not floating praise: each card carries the
 * client, the project, the outcome, and a path to verify it.
 */
export default function TestimonialsSection() {
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <section className="bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> Client proof
            </span>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              Words, backed by <span className="font-serif-i lowercase normal-case tracking-normal">work.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--brand-text-secondary)]">
            Every quote below belongs to a case study you can open, inspect, and judge for yourself.
          </p>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.id}
              className="stagger-item group flex flex-col justify-between gap-10 rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-10"
            >
              <div>
                {/* Headline result — the evidence, up front */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--brand-accent)] px-4 py-1.5 font-display text-xs font-black uppercase tracking-wider text-[var(--brand-on-accent)]">
                    {t.result}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                    {t.projectName} case study
                  </span>
                </div>
                <blockquote className="font-serif-i text-[clamp(1.3rem,2vw,1.7rem)] leading-snug text-[var(--brand-text)]">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--brand-border)] pt-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-text)] font-display text-sm font-black text-[var(--brand-bg)]">
                    {t.avatar}
                  </span>
                  <div>
                    <div className="font-display text-sm font-black uppercase tracking-tight">{t.author}</div>
                    <div className="text-xs font-medium text-[var(--brand-text-secondary)]">{t.title}</div>
                  </div>
                </div>
                <Link
                  href={`/work/${t.projectSlug}`}
                  data-cursor="VERIFY"
                  className="group/link inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
                >
                  <span className="border-b-2 border-[var(--brand-accent)] pb-0.5">
                    View case study
                  </span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
