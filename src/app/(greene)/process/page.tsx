import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
 title: "Process · How We Work",
 description: "Our systematic, transparent approach to digital design and development.",
};

export default function ProcessPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Process"
 title={
 <>
 From hello
 <br />
 to <span className="font-serif-i lowercase normal-case tracking-normal">launch.</span>
 </>
 }
 description="Exceptional products come from an exceptional process. We work systematically, sequentially, and transparently, with you in the loop at every step."
 right={
 <div className="flex items-center gap-3">
 <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-base font-black text-[var(--brand-on-accent)]">
 10
 </span>
 <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
 Steps,
 <br />
 zero guesswork
 </span>
 </div>
 }
 />
 <ProcessSection showHeader={false} />
 <CTASection />
 </div>
 );
}
