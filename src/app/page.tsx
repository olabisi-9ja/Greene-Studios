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
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center">
      <div className="flex items-center gap-3 animate-pulse opacity-80">
        <div className="w-10 h-10 bg-[#101010] rounded-full flex items-center justify-center">
          <span className="text-white font-black text-lg tracking-tighter italic-none">G</span>
        </div>
        <span className="text-[#101010] font-semibold text-2xl tracking-tight">
          Greene.
        </span>
      </div>
    </div>
  );

  const marqueeWords = ["WEB DESIGN", "BRANDING", "UI UX", "NEXTJS", "REACT", "DEVELOPMENT"];

  return (
    <>
      <ClientWrapper fallback={heroFallback}>
        <ExperienceHero />
      </ClientWrapper>

      <WhyWeExist />
      
      <Philosophy />

      {/* Infinite Marquee between Philosophy & Portfolio */}
      <div className="py-8 bg-[var(--brand-surface-secondary)] border-y border-[var(--brand-border)] overflow-hidden">
        <Marquee>
          <MarqueeContent speed={40}>
            {marqueeWords.map((word, i) => (
              <MarqueeItem key={i} className="text-xl font-bold tracking-widest text-[var(--brand-text-secondary)] mx-8 uppercase">
                {word} ·
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <SelectedWork />
      
      <ServicesSection />
      
      <ProcessSection />

      {/* Reverse Marquee between Process & Stats */}
      <div className="py-8 bg-[var(--brand-surface-secondary)] border-y border-[var(--brand-border)] overflow-hidden">
        <Marquee>
          <MarqueeContent speed={40} direction="right">
            {marqueeWords.map((word, i) => (
              <MarqueeItem key={i} className="text-xl font-bold tracking-widest text-[var(--brand-text-secondary)] mx-8 uppercase">
                {word} ·
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
