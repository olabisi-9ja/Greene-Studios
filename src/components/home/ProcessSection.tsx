"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { PROCESS_STEPS, PROCESS_PHASES } from "@/lib/data";

type ProcessItem = {
  number: string;
  title: string;
  description: string;
  duration: string;
  stages?: string;
};

type Props = {
  showHeader?: boolean;
  /**
   * "full"      → all 10 stages (the /process page).
   * "condensed" → 6 headline phases + a link to the full methodology (homepage).
   */
  variant?: "full" | "condensed";
};

export default function ProcessSection({ showHeader = true, variant = "full" }: Props) {
  const condensed = variant === "condensed";
  const items: ProcessItem[] = condensed ? PROCESS_PHASES : PROCESS_STEPS;

  /* Scroll-driven progression: the accent line grows down the timeline
     as you read through the phases. Skipped for reduced-motion users. */
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="relative bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 px-5 md:px-10 lg:flex-row lg:gap-24">
        {/* Left · sticky header */}
        <div className="self-start lg:sticky lg:top-32 lg:w-1/3">
          {showHeader ? (
            <>
              <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                <span className="text-[var(--brand-accent)]">✦</span> Process
              </span>
              <h2 className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
                From hello
                <br />
                to <span className="font-serif-i lowercase normal-case tracking-normal">launch.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--brand-text-secondary)]">
                Exceptional products come from an exceptional process. We work systematically, sequentially, and transparently, with you in the loop at every step.
              </p>
            </>
          ) : null}
          <div className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-sm font-black text-[var(--brand-on-accent)]">
              {condensed ? "4" : "10"}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
              {condensed ? "Phases, zero guesswork" : "Steps, zero guesswork"}
            </span>
          </div>
          {condensed ? (
            <Link
              href="/process"
              data-cursor="GO"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--brand-text)]"
            >
              <span className="border-b-2 border-[var(--brand-accent)] pb-0.5 transition-colors group-hover:border-[var(--brand-text)]">
                The full 10-step methodology
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        {/* Right · timeline */}
        <div ref={timelineRef} className="relative flex-1 border-l border-[var(--brand-border)] pl-6 md:pl-10">
          {/* progression line — fills as you scroll through the phases */}
          {!prefersReduced ? (
            <motion.span
              aria-hidden="true"
              className="absolute -left-px top-0 h-full w-0.5 origin-top bg-[var(--brand-accent)]"
              style={{ scaleY: lineScale }}
            />
          ) : null}
          {items.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: 0.05 * (i % 3), ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-b border-[var(--brand-border)] py-7 last:border-b-0 md:py-9"
            >
              {/* timeline dot */}
              <span className="absolute -left-[31px] top-9 h-3 w-3 rounded-full border-2 border-[var(--brand-accent)] bg-[var(--brand-bg)] transition-all duration-300 group-hover:bg-[var(--brand-accent)] md:-left-[47px]" />

              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                <span className="font-display text-4xl font-black leading-none text-outline md:w-20 md:text-5xl">
                  {step.number}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-[var(--brand-surface-secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
                      {step.duration}
                    </span>
                  </div>
                  {step.stages ? (
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                      {step.stages}
                    </p>
                  ) : null}
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
