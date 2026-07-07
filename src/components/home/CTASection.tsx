import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #12372A 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
            Let&apos;s Build Together
          </span>
          <div className="w-6 h-px bg-[#6B8F71]" />
        </div>

        <h2 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight mb-8">
          Ready to build
          <br />
          <span className="text-gradient-forest">something</span>
          <br />
          <span className="text-[#F7F5F2]/30">extraordinary?</span>
        </h2>

        <p className="text-[#F7F5F2]/50 text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Tell us about your project. We&apos;ll respond within 24 hours with a
          clear path forward.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] text-lg font-semibold px-10 py-5 rounded-full transition-all duration-300"
          >
            Start a Project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="mailto:hello@greenestudios.co"
            className="flex items-center gap-3 border border-white/15 hover:border-[#6B8F71]/50 text-[#F7F5F2] text-lg font-medium px-10 py-5 rounded-full transition-all"
          >
            Send an Email
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#F7F5F2]/30 text-sm">
          <span>✓ Response within 24 hours</span>
          <span>✓ No commitment required</span>
          <span>✓ NDA available on request</span>
        </div>
      </div>
    </section>
  );
}
