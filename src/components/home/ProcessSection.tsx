"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section className="relative bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 px-5 md:px-10 lg:flex-row lg:gap-24">
        {/* Left — sticky header */}
        <div className="self-start lg:sticky lg:top-32 lg:w-1/3">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> Process
          </span>
          <h2 className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
            From hello
            <br />
            to <span className="font-serif-i lowercase normal-case tracking-normal">launch.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--brand-text-secondary)]">
            Exceptional products come from an exceptional process. We work systematically, sequentially, and transparently — with you in the loop at every step.
          </p>
          <div className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-sm font-black text-[var(--brand-ink)]">
              10
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
              Steps, zero guesswork
            </span>
          </div>
        </div>

        {/* Right — timeline */}
        <div className="relative flex-1 border-l border-[var(--brand-border)] pl-6 md:pl-10">
          {PROCESS_STEPS.map((step, i) => (
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
