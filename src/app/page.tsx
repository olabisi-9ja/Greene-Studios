import { ExperienceHero } from "@/components/ui/ExperienceHero";
import MarqueeSection from "@/components/home/MarqueeSection";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesSection from "@/components/home/ServicesSection";
import WhyGreene from "@/components/home/WhyGreene";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import ClientWrapper from "@/components/ClientWrapper";

export default function HomePage() {
  const heroFallback = (
    <div className="min-h-screen w-full bg-[#0e0e0e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-2 h-2 bg-[#6B8F71] rounded-full animate-pulse" />
        <span className="font-mono text-[11px] text-[#6B8F71] tracking-[0.3em] uppercase">Greene Studios</span>
      </div>
    </div>
  );

  return (
    <>
      <ClientWrapper fallback={heroFallback}>
        <ExperienceHero />
      </ClientWrapper>
      <ClientWrapper>
        <MarqueeSection />
      </ClientWrapper>
      <SelectedWork />
      <ServicesSection />
      <WhyGreene />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

