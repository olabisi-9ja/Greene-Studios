"use client";

import Link from "next/link";
import { useSectionAnimation } from "@/lib/hooks/useSectionAnimation";
import RollLabel from "@/components/ui/RollLabel";
import BlurReveal from "@/components/effects/BlurReveal";
import MagneticPull from "@/components/effects/MagneticPull";

export default function CTASection() {
  const sectionRef = useSectionAnimation<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--cta-bg)", color: "var(--cta-fg)" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
        <BlurReveal
          text="Ready to build something people can't ignore?"
          headingClassName="text-[clamp(2.4rem,6vw,5.5rem)]"
        />

        <p className="mx-auto mt-8 max-w-xl text-base leading-snug opacity-80 md:text-lg">
          Take the two-minute project brief: what you are building, the budget, the timeline. We will respond within 24 hours with a clear path forward, no fluff, no pressure.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticPull strength={0.3}>
            <Link
              href="/contact"
              data-cursor="START"
              className="group inline-block rounded-full px-8 py-4 text-[14px] font-medium transition-colors duration-300"
              style={{ backgroundColor: "var(--cta-btn-bg)", color: "var(--cta-btn-fg)" }}
            >
              <RollLabel text="Start your brief" />
            </Link>
          </MagneticPull>
          <MagneticPull strength={0.3}>
            <a
              href="mailto:hello@greenestudios.com"
              className="group inline-block rounded-full border px-8 py-4 text-[14px] font-medium transition-colors duration-300"
              style={{ borderColor: "color-mix(in srgb, var(--cta-fg) 40%, transparent)", color: "var(--cta-fg)" }}
            >
              <RollLabel text="hello@greenestudios.com" />
            </a>
          </MagneticPull>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">
          <span>Two-minute brief</span>
          <span>Response within 24h</span>
          <span>No commitment required</span>
          <span>NDA on request</span>
        </div>
      </div>
    </section>
  );
}
