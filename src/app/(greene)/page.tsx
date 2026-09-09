"use client";

import { ExperienceHero } from "@/components/ui/ExperienceHero";
import SelectedWork from "@/components/home/SelectedWork";
import Manifesto from "@/components/home/Manifesto";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import ClientWrapper from "@/components/ClientWrapper";
import { FAQS } from "@/lib/data";

/**
 * Homepage — seven sections, one idea each.
 *
 * Was thirteen: two separate work sections, three separate "why us" blocks,
 * two marquee strips and a testimonials wall. Work now appears once, the
 * three why-us blocks are one Manifesto, and the strips are gone.
 */
export default function HomePage() {
  const heroFallback = (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <div className="flex items-center gap-3">
        <span className="relative block h-10 w-10 overflow-hidden rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/gs-chip.svg" alt="" className="h-full w-full object-contain" />
        </span>
        <span className="font-display text-2xl font-black uppercase tracking-tight">Greene.</span>
      </div>
    </div>
  );

  return (
    <>
      <ClientWrapper fallback={heroFallback}>
        <ExperienceHero />
      </ClientWrapper>

      <SelectedWork />

      <Manifesto />

      <ServicesSection />

      <ProcessSection variant="condensed" />

      <FAQSection />

      <CTASection />

      {/* FAQ structured data — the on-page FAQ, machine-readable */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </>
  );
}
