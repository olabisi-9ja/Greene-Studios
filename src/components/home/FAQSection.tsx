"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";
import BrandLottie from "@/components/brand/BrandLottie";

/** Questions: one open at a time, big type, plain answers. */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--brand-surface-secondary)] px-5 py-24 sm:px-8 sm:py-36">
      <div className="relative mx-auto grid max-w-[1400px] gap-10 ">
        <div className="pointer-events-none absolute right-0 top-0 hidden w-[200px] md:block">
          <BrandLottie name="questions" className="aspect-square w-full" />
        </div>
        <div>
          <h2 className="max-w-[16ch] text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Asked before every project.
          </h2>
          <div className="mt-14 border-t border-[var(--brand-border)]">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="border-b border-[var(--brand-border)]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[clamp(1.15rem,2vw,1.5rem)] font-semibold tracking-[-0.02em]">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-[4px] bg-[var(--brand-text)] text-[var(--brand-bg)] transition-transform duration-300",
                        isOpen && "rotate-45 bg-[var(--logo)]",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-lg leading-relaxed text-[var(--brand-text-secondary)]">{faq.answer}</p>
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
