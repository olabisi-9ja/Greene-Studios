import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ToolMarquee from "@/components/home/ToolMarquee";
import Work from "@/components/home/Work";
import Services from "@/components/home/Services";
import FAQSection from "@/components/home/FAQSection";
import NextPage from "@/components/home/NextPage";
import { preload } from "react-dom";
import { FAQS } from "@/lib/data";

/**
 * Homepage: the hero, the tools we use, the studio, the work, what we do, questions, and the
 * next step. The footer carries the globe.
 */
export default function HomePage() {
  // the hero's animations download alongside the page, so they're ready the
  // moment it draws (same credentials mode as BrandLottie's fetch)
  for (const w of ["brands", "websites", "apps", "products"]) {
    preload(`/lottie/hero-${w}.json`, { as: "fetch", crossOrigin: "anonymous" });
  }
  return (
    <>
      <Hero />
      <ToolMarquee />
      <About />
      <Work />
      <Services />
      <FAQSection />
      <NextPage />

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
