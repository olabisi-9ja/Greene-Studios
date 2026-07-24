"use client";

import Link from "next/link";
import { useSectionAnimation } from "@/lib/hooks/useSectionAnimation";

export default function CTASection() {
  const sectionRef = useSectionAnimation<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-32 bg-[#FAFAFA] relative overflow-hidden border-t border-[#E6E6E6]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-6 h-px bg-[#BFA36A]" />
          <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
            Let&apos;s Build Together
          </span>
          <div className="w-6 h-px bg-[#BFA36A]" />
        </div>

        <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-semibold text-[#101010] leading-[1.05] tracking-tight mb-8">
          Ready to build <br /> something extraordinary?
        </h2>

        <p className="text-[#757575] text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Tell us about your project. We&apos;ll respond within 24 hours with a
          clear path forward.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#BFA36A] text-white text-base font-medium px-10 py-5 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(191,163,106,0.3)] hover:-translate-y-0.5"
          >
            Start a Project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="mailto:hello@greenestudios.co"
            className="w-full sm:w-auto flex items-center justify-center gap-3 border border-[#E6E6E6] bg-white hover:border-[#101010] text-[#101010] text-base font-medium px-10 py-5 rounded-full transition-all"
          >
            Send an Email
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#757575] text-sm font-medium">
          <span>✓ Response within 24 hours</span>
          <span>✓ No commitment required</span>
          <span>✓ NDA available on request</span>
        </div>
      </div>
    </section>
  );
}
