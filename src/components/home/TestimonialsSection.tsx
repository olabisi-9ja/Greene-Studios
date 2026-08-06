"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

export default function TestimonialsSection() {
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <section className="bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 max-w-3xl md:mb-20">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> Testimonials
          </span>
          <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
            People we&apos;ve worked <span className="font-serif-i lowercase normal-case tracking-normal">with.</span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.id}
              className="stagger-item group flex flex-col justify-between gap-10 rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-10"
            >
              <div>
                <div className="mb-6 flex gap-1 text-sm text-[var(--brand-accent)]" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                  <span className="text-[var(--brand-border)]">{"★".repeat(5 - t.rating)}</span>
                </div>
                <blockquote className="font-serif-i text-[clamp(1.3rem,2vw,1.8rem)] leading-snug text-[var(--brand-text)]">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="flex items-center gap-4 border-t border-[var(--brand-border)] pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-sm font-black text-[var(--brand-on-accent)]">
                  {t.avatar}
                </span>
                <div>
                  <div className="font-display text-sm font-black uppercase tracking-tight">{t.author}</div>
                  <div className="text-xs font-medium text-[var(--brand-text-secondary)]">{t.title}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
