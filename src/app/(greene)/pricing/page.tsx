import type { Metadata } from "next";
import PricingCards from "@/components/services/PricingCards";
import BrandLottie from "@/components/brand/BrandLottie";
import { FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Four ways to work with Greene Studios: brand identity, website, product build and monthly retainer, with price ranges and timelines.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <div className="px-5 pb-32 pt-32 sm:px-8 sm:pt-40">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
        <div className="pointer-events-none mb-6 w-[min(220px,55vw)]">
          <BrandLottie name="pricing" className="aspect-square w-full" />
        </div>
        <p className="font-mono text-sm text-[var(--brand-text-secondary)]">Pricing</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Choose how we work together.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg text-[var(--brand-text-secondary)]">
          Every project is quoted after a short call. Prices are converted from USD at today&apos;s rate; change the currency at the bottom of the page.
        </p>
        </div>

        <div className="mt-16">
          <PricingCards />
        </div>

        <section className="mx-auto mt-28 max-w-3xl" aria-labelledby="pricing-faq">
          <h2 id="pricing-faq" className="text-3xl font-semibold tracking-[-0.03em]">
            Questions
          </h2>
          <div className="mt-8 border-t border-[var(--brand-border)]">
            {FAQS.slice(0, 5).map((faq) => (
              <details key={faq.question} className="group border-b border-[var(--brand-border)] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="font-mono text-xl text-[var(--brand-text-secondary)] transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--brand-text-secondary)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
