import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — What We Offer",
  description:
    "Full-service digital design and development: Web Design, UI/UX, Branding, Frontend Development, Motion Design, AI Integration, and more.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
            Services
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight">
            Everything
            <br />
            you need to
            <br />
            <span className="text-[#F7F5F2]/30">compete.</span>
          </h1>
          <div>
            <p className="text-[#F7F5F2]/50 text-xl leading-relaxed mb-8">
              From first sketch to final deployment, we offer the complete
              creative and technical suite. One studio, end to end.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold px-8 py-4 rounded-full transition-all"
            >
              Discuss Your Needs →
            </Link>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="space-y-0">
          {SERVICES.map((service, i) => (
            <Link key={service.id} href={service.href} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 py-10 border-b border-white/5 hover:border-[#12372A]/40 transition-all duration-300">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-[#F7F5F2]/20 text-sm font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="lg:col-span-3 flex items-center gap-4">
                  <span className="text-2xl text-[#6B8F71] group-hover:text-[#F7F5F2] transition-colors">
                    {service.icon}
                  </span>
                  <h2 className="text-2xl font-black text-[#F7F5F2] tracking-tight group-hover:text-[#6B8F71] transition-colors">
                    {service.title}
                  </h2>
                </div>

                {/* Short description */}
                <div className="lg:col-span-4">
                  <p className="text-[#F7F5F2]/40 text-sm leading-relaxed group-hover:text-[#F7F5F2]/60 transition-colors">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-3 flex flex-wrap gap-2 justify-end">
                  {service.deliverables.slice(0, 2).map((d) => (
                    <span
                      key={d}
                      className="text-[#F7F5F2]/30 text-xs px-3 py-1 border border-white/5 rounded-full"
                    >
                      {d}
                    </span>
                  ))}
                  <span className="text-[#6B8F71] text-sm group-hover:translate-x-1 transition-transform ml-auto">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Packages reference */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-10 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl">
            <h3 className="text-[#F7F5F2] text-2xl font-black mb-4 tracking-tight">Not sure where to start?</h3>
            <p className="text-[#F7F5F2]/50 text-base mb-6 leading-relaxed">
              We&apos;ll scope your project together during a free 30-minute discovery
              call. No hard sell, just clarity.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold px-6 py-3 rounded-full transition-all text-sm">
              Book Discovery Call →
            </Link>
          </div>
          <div className="p-10 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h3 className="text-[#F7F5F2] text-2xl font-black mb-4 tracking-tight">Have a specific budget?</h3>
            <p className="text-[#F7F5F2]/50 text-base mb-6 leading-relaxed">
              View our transparent pricing packages from $4,800 — or get a
              custom quote for enterprise projects.
            </p>
            <Link href="/pricing" className="inline-flex items-center gap-2 border border-white/15 hover:border-[#6B8F71]/50 text-[#F7F5F2] font-medium px-6 py-3 rounded-full transition-all text-sm">
              View Pricing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
