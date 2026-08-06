"use client";

import { ExperienceHero } from "@/components/ui/ExperienceHero";
import SocialProof from "@/components/home/SocialProof";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import WhyWeExist from "@/components/home/WhyWeExist";
import Philosophy from "@/components/home/Philosophy";
import ClientWrapper from "@/components/ClientWrapper";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

export default function HomePage() {
  const heroFallback = (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-lg font-black text-[var(--brand-ink)]">
          G
        </span>
        <span className="font-display text-2xl font-black uppercase tracking-tight">Greene.</span>
      </div>
    </div>
  );

  const stripWords = ["CREATIVE", "STRATEGIC", "TECHNICAL", "BESPOKE", "HUMAN", "BOLD"];

  return (
    <>
      <ClientWrapper fallback={heroFallback}>
        <ExperienceHero />
      </ClientWrapper>

      <WhyWeExist />

      <Philosophy />

      {/* Marquee strip between Philosophy & Work */}
      <div className="marquee-strip-plain py-4">
        <Marquee>
          <MarqueeContent speed={40} autoFill>
            {stripWords.map((word, i) => (
              <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                <span className="font-display text-lg font-black uppercase tracking-wide text-[var(--brand-text)] md:text-xl">
                  {word}
                </span>
                <span className="text-[var(--brand-accent)]" aria-hidden="true">✦</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <SelectedWork />

      <ServicesSection />

      <ProcessSection />

      {/* Reverse marquee strip between Process & Proof */}
      <div className="marquee-strip py-3">
        <Marquee>
          <MarqueeContent speed={40} direction="right" autoFill>
            {stripWords.map((word, i) => (
              <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                <span className="font-display text-lg font-black uppercase tracking-wide text-[var(--brand-ink)] md:text-xl">
                  {word}
                </span>
                <span className="text-[var(--brand-ink)]/50" aria-hidden="true">✦</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <ClientWrapper>
        <SocialProof />
      </ClientWrapper>

      <TestimonialsSection />

      <FAQSection />

      <CTASection />
    </>
  );
}
