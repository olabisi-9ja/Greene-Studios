"use client";

import Link from "next/link";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useSectionAnimation } from "@/lib/hooks/useSectionAnimation";
import RollLabel from "@/components/ui/RollLabel";

const MARQUEE_WORDS = ["LET'S TALK", "LET'S BUILD", "LET'S START", "LET'S MAKE WAVES"];

export default function CTASection() {
  const sectionRef = useSectionAnimation<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--cta-bg)", color: "var(--cta-fg)" }}
    >
      {/* Giant CTA */}
      <div className="mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
        <span
          className="mb-8 inline-block px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em]"
          style={{ backgroundColor: "color-mix(in srgb, var(--cta-fg) 16%, transparent)" }}
        >
          06 · Let&apos;s build together
        </span>

        <h2 className="headline text-[clamp(2.4rem,6vw,5.5rem)]">
          Ready to build something people can&apos;t ignore?
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-snug opacity-80 md:text-lg">
          Take the two-minute project brief: what you&apos;re building, the budget, the timeline. We&apos;ll respond within 24 hours with a clear path forward, no fluff, no pressure.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            data-cursor="START"
            className="group btn-block"
            style={{ backgroundColor: "var(--cta-btn-bg)", color: "var(--cta-btn-fg)" }}
          >
            <RollLabel text="Start your brief" />
          </Link>
          <a
            href="mailto:hello@greenestudios.co"
            className="group btn-block"
            style={{ borderColor: "color-mix(in srgb, var(--cta-fg) 40%, transparent)", color: "var(--cta-fg)" }}
          >
            <RollLabel text="hello@greenestudios.co" />
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">
          <span>✓ Two-minute brief</span>
          <span>✓ Response within 24h</span>
          <span>✓ No commitment required</span>
          <span>✓ NDA on request</span>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        className="border-t py-2.5"
        style={{ backgroundColor: "var(--cta-btn-bg)", color: "var(--cta-btn-fg)", borderColor: "var(--cta-border)" }}
      >
        <Marquee>
          <MarqueeContent speed={40} autoFill>
            {MARQUEE_WORDS.map((word, i) => (
              <MarqueeItem key={i} className="mx-5 flex items-center gap-5">
                <span className="font-mono text-xs uppercase tracking-[0.14em]">{word}</span>
                <span className="text-xs" aria-hidden="true">/</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}
