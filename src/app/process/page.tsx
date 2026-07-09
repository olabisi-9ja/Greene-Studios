import type { Metadata } from "next";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
 title: "Process — How We Work",
 description: "Our systematic, transparent approach to digital design and development.",
};

export default function ProcessPage() {
 return (
 <div className="min-h-screen pt-20 bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <ProcessSection />
 <CTASection />
 </div>
 );
}
