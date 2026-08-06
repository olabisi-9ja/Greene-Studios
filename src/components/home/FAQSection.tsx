"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--brand-surface)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        {/* Left */}
        <div className="lg:col-span-4">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> FAQ
          </span>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
            Questions worth <span className="font-serif-i lowercase normal-case tracking-normal">asking.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--brand-text-secondary)]">
            Informed clients make better partners. These are the questions we hear most — and the honest answers.
          </p>
        </div>

        {/* Right — accordion */}
        <div className="lg:col-span-8">
          <div className="flex flex-col border-t border-[var(--brand-border)]">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-[var(--brand-border)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    data-cursor="TOGGLE"
                  >
                    <span className={cn(
                      "font-display text-lg font-black uppercase tracking-tight transition-colors duration-300 md:text-2xl",
                      isOpen ? "text-[var(--brand-accent)]" : "text-[var(--brand-text)]"
                    )}>
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] text-lg transition-all duration-300",
                        isOpen && "rotate-45 border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-ink)]"
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-0 text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
