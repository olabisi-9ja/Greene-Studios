"use client";

import AnimatedNumbers from "@/components/animations/AnimatedNumbers";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

const CLIENTS = ["LUMINARY", "VERA", "ARC COMMERCE", "BLOOM HEALTH", "ONYX", "PRISM"];

export default function SocialProof() {
  const stats = [
    { value: "40+", label: "Projects delivered" },
    { value: "15+", label: "Industries served" },
    { value: "98%", label: "Client satisfaction" },
  ];

  return (
    <section className="overflow-hidden border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-20 text-[var(--brand-text)] transition-colors duration-1000 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4 md:divide-x md:divide-[var(--brand-border)]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center md:px-8">
              <AnimatedNumbers
                value={stat.value}
                className="font-display text-6xl font-black tracking-tighter text-[var(--brand-text)] md:text-7xl lg:text-8xl"
              />
              <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)] md:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Client marquee */}
        <div className="mt-16 border-t border-[var(--brand-border)] pt-8 md:mt-20">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            Trusted by founders & teams at
          </p>
          <Marquee>
            <MarqueeContent speed={30} autoFill>
              {CLIENTS.map((client, i) => (
                <MarqueeItem key={i} className="mx-8 flex items-center gap-8">
                  <span className="font-display text-xl font-black uppercase tracking-tight text-[var(--brand-text-secondary)] opacity-70 md:text-2xl">
                    {client}
                  </span>
                  <span className="text-sm text-[var(--brand-accent)]" aria-hidden="true">✦</span>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
