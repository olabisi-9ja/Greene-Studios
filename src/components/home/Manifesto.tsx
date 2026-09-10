"use client";

import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

/**
 * One manifesto section, replacing the three overlapping "why us" blocks
 * (WhyWeExist / Philosophy / WhyGreene) the homepage used to run back to back.
 *
 * Deliberately quiet: a statement, then the four things every project is
 * measured against. No hover cards, no colour swatches — the claim is
 * restraint, so the section has to demonstrate it.
 */
const PRINCIPLES = [
  {
    num: "01",
    title: "Clarity",
    desc: "If an element doesn't help someone understand, decide, or act, it's noise. Noise gets deleted.",
  },
  {
    num: "02",
    title: "Character",
    desc: "A visual language built for one brand and no other. Cohesive systems, never off-the-shelf trends.",
  },
  {
    num: "03",
    title: "Performance",
    desc: "Speed and accessibility are designed in from day one, not patched in before launch. 95+ Lighthouse is the floor.",
  },
  {
    num: "04",
    title: "Longevity",
    desc: "Systems, not disposable pages. Architectures that stay relevant for years, not until the next redesign.",
  },
];

export default function Manifesto() {
  const gridRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

  return (
    <section className="bg-sand py-20 text-[var(--brand-text)] md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Statement */}
          <div className="self-start lg:sticky lg:top-32 lg:col-span-5">
            <span className="chip-mono">02 · How we work</span>
            <h2 className="headline mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)]">
              Good design isn&apos;t decoration.
            </h2>
            <p className="mt-6 max-w-md text-base leading-snug text-[var(--brand-text-secondary)]">
              It should make a business clearer, a product easier to use, and a brand harder to forget.
              Strategy, design and production code leave the studio together — so what you approve is
              exactly what your users touch.
            </p>
          </div>

          {/* Principles */}
          <div ref={gridRef} className="lg:col-span-7">
            <dl className="border-t border-[var(--brand-border)]">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.num}
                  className="stagger-item grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-[var(--brand-border)] py-8 md:grid-cols-[4rem_10rem_1fr] md:py-10"
                >
                  <span className="font-mono text-xs text-[var(--brand-text-secondary)]">{p.num}</span>
                  <dt className="headline text-xl md:text-2xl">{p.title}</dt>
                  <dd className="col-span-2 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:col-span-1 md:text-[15px]">
                    {p.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
