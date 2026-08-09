"use client";

import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

/**
 * The Greene Methodology — our philosophy, codified.
 * Four non-negotiables that every project is measured against.
 */
const PRINCIPLES = [
  {
    num: "01",
    title: "Clarity",
    desc: "Remove everything that doesn't serve the user. If an element doesn't help people understand, decide, or act, it's noise. And noise gets deleted.",
  },
  {
    num: "02",
    title: "Character",
    desc: "Build a visual language that belongs to the brand. We construct cohesive systems tailored to your voice and market. Never off-the-shelf trends.",
  },
  {
    num: "03",
    title: "Performance",
    desc: "Beauty means nothing if the experience is slow. Usability, speed, and accessibility are designed from day one, not patched in before launch.",
  },
  {
    num: "04",
    title: "Longevity",
    desc: "Build systems, not disposable pages. Clean architectures that scale with you and stay relevant for years, not just until the next redesign.",
  },
];

export default function Philosophy() {
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        {/* Left · sticky statement */}
        <div className="self-start lg:sticky lg:top-32 lg:col-span-4">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> The Greene methodology
          </span>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
            No templates.
            <br />
            No <span className="font-serif-i lowercase normal-case tracking-normal">shortcuts.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--brand-text-secondary)]">
            Four non-negotiables every project is measured against, so the work lands at global creative standard, and stays there.
          </p>
          <div className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-sm font-black text-[var(--brand-on-accent)]">
              04
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
              Principles, zero compromise
            </span>
          </div>
        </div>

        {/* Right · principles list */}
        <div ref={containerRef} className="lg:col-span-8">
          <div className="flex flex-col border-t border-[var(--brand-border)]">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="stagger-item group flex flex-col gap-3 border-b border-[var(--brand-border)] py-8 transition-colors duration-500 hover:bg-[var(--brand-surface-secondary)] md:flex-row md:items-baseline md:gap-10 md:px-6"
              >
                <span className="font-mono text-sm text-[var(--brand-accent)]">{p.num}</span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                    {p.desc}
                  </p>
                </div>
                <span
                  className="hidden shrink-0 text-xl text-[var(--brand-accent)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
