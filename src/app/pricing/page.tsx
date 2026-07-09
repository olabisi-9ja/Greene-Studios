import type { Metadata } from "next";
import PricingTiers from "@/components/services/PricingTiers";
import Link from "next/link";
import { FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for world-class digital design and development.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <PricingTiers />

        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#101010] mb-12 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.slice(0, 5).map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-[#E6E6E6]">
                <h3 className="text-lg font-semibold text-[#101010] mb-3">{faq.question}</h3>
                <p className="text-[#757575] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center bg-[#111111] rounded-[32px] p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
              Ready to invest in your brand?
            </h2>
            <p className="text-[#A3A3A3] text-lg max-w-xl mx-auto mb-10">
              Book a free discovery call. We&apos;ll discuss your goals and find the best package for your needs.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#BFA36A] hover:bg-white hover:text-[#111111] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
