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
      <div className="flex items-center gap-3 animate-pulse opacity-80">
        <div className="w-10 h-10 bg-[#F7F5F2] rounded-full flex items-center justify-center">
          <span className="text-[#0e0e0e] font-black text-lg tracking-tighter italic-none">G</span>
        </div>
        <span className="text-[#F7F5F2] font-semibold text-2xl tracking-tight">
          Greene.
        </span>
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

