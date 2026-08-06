import type { Metadata } from "next";
import Link from "next/link";
import PricingTiers from "@/components/services/PricingTiers";
import PageHeader from "@/components/ui/PageHeader";
import { FAQS } from "@/lib/data";

export const metadata: Metadata = {
 title: "Pricing",
 description: "Transparent pricing for world-class digital design and development.",
};

export default function PricingPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Pricing"
 title={
 <>
 Simple, transparent
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">pricing.</span>
 </>
 }
 description="No hidden fees, no surprise invoices. Pick the tier that matches your stage, or let us scope something custom."
 />

 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <PricingTiers />

 {/* FAQ */}
 <div className="mx-auto mt-8 max-w-3xl">
 <span className="mb-8 block text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Frequently asked
 </span>
 <div className="flex flex-col border-t border-[var(--brand-border)]">
 {FAQS.slice(0, 5).map((faq, index) => (
 <div key={index} className="border-b border-[var(--brand-border)] py-6">
 <h3 className="font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)] md:text-xl">
 {faq.question}
 </h3>
 <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
 {faq.answer}
 </p>
 </div>
 ))}
 </div>
 </div>

 {/* CTA */}
        <div className="relative mt-24 overflow-hidden rounded-2xl bg-[var(--brand-text)] p-10 text-center text-[var(--brand-bg)] md:p-20">
          <div className="relative z-10">
 <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
 Ready to invest in <span className="font-serif-i lowercase normal-case tracking-normal">your brand?</span>
 </h2>
 <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--brand-bg)]/70">
 Book a free discovery call. We&apos;ll discuss your goals and find the best package for your needs.
 </p>
 <Link
 href="/contact"
 data-cursor="HELLO"
 className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--brand-accent)] px-10 py-5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-ink)] transition-colors duration-300 hover:bg-[var(--brand-bg)]"
 >
 Book a discovery call <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
}
