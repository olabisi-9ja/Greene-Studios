import { ExperienceHero } from "@/components/ui/ExperienceHero";
import ScrollRails from "@/components/scroll/ScrollRails";
import SelectedWork from "@/components/home/SelectedWork";
import Manifesto from "@/components/home/Manifesto";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { FAQS } from "@/lib/data";

/**
 * Homepage, seven sections, one idea each.
 *
 * Was thirteen: two separate work sections, three separate "why us" blocks,
 * two marquee strips and a testimonials wall. Work now appears once, the
 * three why-us blocks are one Manifesto, and the strips are gone.
 */
export default function HomePage() {
  return (
    <>
      {/* Rendered directly, not behind a mount gate. ClientWrapper served a
          placeholder until useEffect fired, which deferred the page's main
          content past hydration and made LCP 1.9s. */}
      <ExperienceHero />

      <SelectedWork />

      {/* Section seams carry the figure that matches the turn the page is
          taking: a detour before the principles, a spread before the price
          of the work, a fork pointing down into the process. */}
      <ScrollRails variant="bypass" height={300} className="bg-[var(--brand-bg)]" />

      <Manifesto />

      <ServicesSection />

      <ScrollRails variant="fork" height={260} className="bg-[var(--brand-bg)]" />

      <ProcessSection variant="condensed" />

      <ScrollRails variant="braid" height={320} lanes={5} className="bg-[var(--brand-bg)]" />

      <FAQSection />

      <CTASection />

      {/* FAQ structured data, the on-page FAQ, machine-readable */}
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
