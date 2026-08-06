import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import PricingTiers from "@/components/services/PricingTiers";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
 title: "Services · What We Offer",
 description:
 "Full-service digital design and development: Web Design, UI/UX, Branding, Frontend Development, Motion Design, AI Integration, and more.",
};

export default function ServicesPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Services"
 title={
 <>
 Capabilities built
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">for ambition.</span>
 </>
 }
 description="From first sketch to final deployment, we offer the complete creative and technical suite. One studio, end to end."
 right={
 <Link href="/contact" data-cursor="HELLO" className="btn-primary">
 Discuss your needs <span aria-hidden="true">→</span>
 </Link>
 }
 />

 {/* Services list */}
 <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
 <div className="flex flex-col border-t border-[var(--brand-border)]">
 {SERVICES.map((service, i) => (
 <Link
 key={service.id}
 href={`/services/${service.id}`}
 className="group relative block border-b border-[var(--brand-border)]"
 data-cursor="VIEW"
 >
              <div className="relative z-10 grid grid-cols-12 items-center gap-3 px-1 py-7 transition-colors duration-300 md:px-4 md:py-9">
 <span className="col-span-2 font-mono text-xs text-[var(--brand-text-secondary)] md:col-span-1 md:text-sm">
 0{i + 1}
 </span>
 <h2 className="col-span-10 font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:col-span-4">
 {service.title}
 </h2>
 <p className="col-span-12 mt-2 max-w-md text-sm leading-relaxed text-[var(--brand-text-secondary)] md:col-span-5 md:mt-0 md:text-[15px]">
 {service.shortDesc || service.description}
 </p>
 <div className="col-span-12 flex items-center gap-2 md:col-span-2 md:justify-end">
 <span className="hidden text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] md:block">
 {service.deliverables.length} deliverables
 </span>
 <span
 className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-on-accent)] md:ml-2"
 aria-hidden="true"
 >
 →
 </span>
 </div>
 </div>
 </Link>
 ))}
 </div>

 <PricingTiers />

 {/* Two CTA cards */}
 <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
 <div className="flex flex-col justify-between gap-8 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-10 lg:p-12">
 <div>
 <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Not sure where to start?
 </span>
 <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-[var(--brand-text)]">
 Let&apos;s scope it <span className="font-serif-i lowercase normal-case tracking-normal">together.</span>
 </h3>
 <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--brand-text-secondary)]">
 We&apos;ll scope your project during a free 30-minute discovery call. No hard sell, just clarity.
 </p>
 </div>
 <Link href="/contact" data-cursor="HELLO" className="btn-outline w-fit">
 Book discovery call <span aria-hidden="true">→</span>
 </Link>
 </div>

 <div className="flex flex-col justify-between gap-8 rounded-2xl bg-[var(--brand-text)] p-10 text-[var(--brand-bg)] lg:p-12">
 <div>
 <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Enterprise & custom
 </span>
 <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight">
 Complex requirements?
 </h3>
 <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--brand-bg)]/70">
 We build custom retainers and dedicated team extensions for high-growth companies.
 </p>
 </div>
 <Link
 href="/contact"
 data-cursor="HELLO"
 className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--brand-accent)] px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-on-accent)] transition-colors duration-300 hover:bg-[var(--brand-bg)] hover:text-[var(--brand-accent)]"
 >
 Get custom quote <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </div>

 <CTASection />
 </div>
 );
}
