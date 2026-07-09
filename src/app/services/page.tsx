import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import PricingTiers from "@/components/services/PricingTiers";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
 title: "Services — What We Offer",
 description:
 "Full-service digital design and development: Web Design, UI/UX, Branding, Frontend Development, Motion Design, AI Integration, and more.",
};

export default function ServicesPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32">
 {/* Header */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[#BFA36A]" />
 <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
 Services
 </span>
 </div>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
 <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold text-[#101010] leading-[1.05] tracking-tight text-balance">
 Capabilities <br className="hidden lg:block" /> built for <br className="hidden lg:block" /> ambition.
 </h1>
 <div className="pb-4">
 <p className="text-[#757575] text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
 From first sketch to final deployment, we offer the complete
 creative and technical suite. One studio, end to end.
 </p>
 <Link
 href="/contact"
 className="inline-flex items-center gap-3 bg-[#111111] hover:bg-[#BFA36A] text-white text-base font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(191,163,106,0.3)] hover:-translate-y-0.5"
 >
 Discuss Your Needs
 <span className="transition-transform group-hover:translate-x-1">→</span>
 </Link>
 </div>
 </div>
 </div>

 {/* Services List */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
 <div className="flex flex-col border-t border-[#E6E6E6]">
 {SERVICES.map((service, i) => (
 <div key={service.id} className="group border-b border-[#E6E6E6] hover:bg-[#FAFAFA] transition-colors duration-300">
 <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 py-12 px-4 lg:px-8">
 {/* Number */}
 <div className="lg:col-span-1 pt-1">
 <span className="text-[#BFA36A] text-sm font-mono tracking-widest">
 {String(i + 1).padStart(2, "0")}
 </span>
 </div>

 {/* Title */}
 <div className="lg:col-span-3">
 <h2 className="text-3xl font-semibold text-[#101010] tracking-tight group-hover:text-[#BFA36A] transition-colors">
 {service.title}
 </h2>
 </div>

 {/* Description */}
 <div className="lg:col-span-4">
 <p className="text-[#757575] text-base leading-relaxed">
 {service.shortDesc || service.description}
 </p>
 </div>

 {/* Deliverables */}
 <div className="lg:col-span-4 lg:pl-8">
 <ul className="space-y-3">
 {service.deliverables.map((d) => (
 <li key={d} className="flex items-center gap-3 text-[#101010] font-medium text-sm">
 <span className="w-1.5 h-1.5 rounded-full bg-[#E6E6E6] group-hover:bg-[#BFA36A] transition-colors" />
 {d}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Pricing Section */}
 <PricingTiers />

 {/* Packages Reference / FAQ */}
 <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div className="p-10 lg:p-14 bg-[#FAFAFA] border border-[#E6E6E6] rounded-[24px]">
 <h3 className="text-[#101010] text-3xl font-semibold mb-6 tracking-tight">Not sure where to start?</h3>
 <p className="text-[#757575] text-lg mb-8 leading-relaxed">
 We&apos;ll scope your project together during a free 30-minute discovery
 call. No hard sell, just clarity.
 </p>
 <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-[#E6E6E6] hover:border-[#101010] text-[#101010] font-medium px-8 py-4 rounded-full transition-all text-sm">
 Book Discovery Call →
 </Link>
 </div>
 <div className="p-10 lg:p-14 bg-[#111111] rounded-[24px] flex flex-col justify-center">
 <h3 className="text-white text-3xl font-semibold mb-6 tracking-tight">Enterprise & Custom</h3>
 <p className="text-white/70 text-lg mb-8 leading-relaxed">
 Have complex requirements? We build custom retainers and dedicated team extensions for high-growth companies.
 </p>
 <Link href="/contact" className="inline-flex items-center gap-2 bg-[#BFA36A] hover:bg-white text-[#111111] font-medium px-8 py-4 rounded-full transition-all text-sm self-start">
 Get Custom Quote →
 </Link>
 </div>
 </div>
 </div>

 <CTASection />
 </div>
 );
}
