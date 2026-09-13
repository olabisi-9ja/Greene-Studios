import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";
import StickyCards from "@/components/effects/StickyCards";
import { PROCESS_PHASES } from "@/lib/data";

const PHASE_DECK = [
 { from: "#1f3d3a", to: "#0b1f1c" },
 { from: "#2e7d74", to: "#0e2a33" },
 { from: "#3f6fa8", to: "#122138" },
 { from: "#c2541e", to: "#3a160a" },
];

const PHASE_CARDS = PROCESS_PHASES.map((phase, i) => ({
 num: String(i + 1).padStart(2, "0"),
 title: phase.title,
 desc: phase.description,
 ...PHASE_DECK[i % PHASE_DECK.length],
}));

export const metadata: Metadata = {
 title: "Process · How We Work",
 description: "Our systematic, transparent approach to digital design and development.",
};

export default function ProcessPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
 <PageHeader
 kicker="Process"
 title={
 <>
 From hello
 <br />
 to launch
 </>
 }
 description="Exceptional products come from an exceptional process. We work systematically, sequentially, and transparently, with you in the loop at every step."
 right={
 <div className="flex items-center gap-3">
 <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-base font-black text-[var(--brand-on-accent)]">
 ✦
 </span>
 <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
 Clear steps,
 <br />
 no guesswork
 </span>
 </div>
 }
 />
 {/* The four phases as a scroll-driven stack */}
 <section className="mx-auto max-w-md px-5 pb-10 md:px-10" aria-label="Process phases at a glance">
 <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 Scroll to peel through the phases
 </p>
 <StickyCards items={PHASE_CARDS} />
 </section>

 <ProcessSection showHeader={false} />
 <CTASection />
 </div>
 );
}
