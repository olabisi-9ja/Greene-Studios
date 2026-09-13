"use client";

import Link from "next/link";
import ScrollRails from "@/components/scroll/ScrollRails";
import RollLabel from "@/components/ui/RollLabel";

export const ExperienceHero = () => {
  return (
    <section className="relative w-full bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <ScrollRails variant="lens" height={360} className="mt-20 md:mt-24" />

      <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 md:px-10 md:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h1 className="headline col-span-1 text-[clamp(2.25rem, 5vw, 3.89rem)] lg:col-span-7">
            We build digital things worth remembering.
          </h1>

          <div className="col-span-1 flex flex-col gap-8 lg:col-span-5 lg:pt-3">
            <p className="max-w-md text-lg leading-snug text-[var(--brand-text)]">
              Greene Studios designs and builds brands, websites and digital products with
              uncommon presence.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                data-cursor="HELLO"
                className="group inline-flex items-center justify-center rounded-full bg-[var(--brand-text)] px-7 py-3.5 text-[14px] font-medium text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
              >
                <RollLabel text="Book a call" />
              </Link>
              <Link href="/work" data-cursor="SEE" className="group inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-7 py-3.5 text-[14px] font-medium text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]">
                <RollLabel text="See the work" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">
          Brand • Web • Product, Available worldwide, working remotely
        </p>
      </div>

      <div className="border-y border-[var(--brand-border)]">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-8 px-5 py-3.5 md:px-10">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
            Concept brands, built end to end
          </span>
          <div className="min-w-0 flex-1 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
            Luminary • Vera • Arc • Bloom • Onyx • Prism
          </div>
        </div>
      </div>
    </section>
  );
};
