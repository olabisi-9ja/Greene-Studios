import { ExperienceHero } from "@/components/ui/ExperienceHero";
import SocialProof from "@/components/home/SocialProof";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import ClientWrapper from "@/components/ClientWrapper";

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

  return (
    <>
      <ClientWrapper fallback={heroFallback}>
        <ExperienceHero />
      </ClientWrapper>
      <ClientWrapper>
        <SocialProof />
      </ClientWrapper>
      <SelectedWork />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

