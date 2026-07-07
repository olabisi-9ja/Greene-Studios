import Link from "next/link";
import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#12372A]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#6B8F71]" />
            <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
              Capabilities
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-[#F7F5F2] leading-[0.9] tracking-tighter mb-6">
            Services built
            <br />
            <span className="text-outline">for ambition.</span>
          </h2>
          <p className="text-[#F7F5F2]/50 text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            From brand strategy to full-stack development, we offer the complete range of capabilities an ambitious digital product needs.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {SERVICES.map((service, i) => {
            // Logic to create an asymmetrical bento layout
            const isLarge = i === 0 || i === 3;
            const isWide = i === 4;
            const spanClass = isLarge
              ? "md:col-span-2 md:row-span-2"
              : isWide
              ? "md:col-span-2 md:row-span-1"
              : "col-span-1 row-span-1";

            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group glass-panel p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.05] relative overflow-hidden ${spanClass}`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                     style={{
                       backgroundImage: 'radial-gradient(circle at 2px 2px, #6B8F71 1px, transparent 0)',
                       backgroundSize: '24px 24px'
                     }} 
                />

                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#6B8F71] group-hover:bg-[#6B8F71] group-hover:text-[#0e0e0e] transition-all duration-300">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <span className="text-[#F7F5F2]/10 text-4xl font-black leading-none group-hover:text-[#6B8F71]/30 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="z-10 mt-auto">
                  <h3 className="text-[#F7F5F2] font-bold text-2xl lg:text-3xl tracking-tight mb-2 group-hover:text-[#6B8F71] transition-colors">
                    {service.title}
                  </h3>
                  
                  {isLarge && (
                    <p className="text-[#F7F5F2]/60 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {service.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[#6B8F71] text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/services"
            className="group relative px-8 py-4 bg-[#F7F5F2] text-[#0e0e0e] text-sm font-bold uppercase tracking-widest rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <div className="absolute inset-0 bg-[#6B8F71] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
