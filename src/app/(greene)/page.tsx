import GlobeHero from "@/components/home/GlobeHero";
import WorkPhones from "@/components/home/WorkPhones";
import BrandGallery from "@/components/home/BrandGallery";
import ServicesOverview from "@/components/home/ServicesOverview";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { FAQS } from "@/lib/data";

/**
 * Homepage: hero, work, identity gallery, services, questions, next step.
 * Pricing lives on /pricing and is linked, not pushed.
 */
export default function HomePage() {
  return (
    <>
      <GlobeHero />
      <WorkPhones />
      <BrandGallery />
      <ServicesOverview />
      <FAQSection />
      <CTASection />

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
