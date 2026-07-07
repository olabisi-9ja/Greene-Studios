import Link from "next/link";

const SERVICES_LIST = [
  {
    title: "Product Design",
    items: [
      "UX Research",
      "Wireframes",
      "Prototypes",
      "Design Systems",
      "Dashboard Design",
      "Mobile Apps",
    ],
  },
  {
    title: "Web Design",
    items: [
      "Landing Pages",
      "Business Websites",
      "Corporate Sites",
      "CMS",
      "SEO",
      "Performance",
    ],
  },
  {
    title: "Brand Identity",
    items: [
      "Logo",
      "Visual Identity",
      "Typography",
      "Brand Guidelines",
      "Marketing Assets",
    ],
  },
  {
    title: "Development",
    items: [
      "Next.js",
      "React",
      "Supabase",
      "Firebase",
      "Node.js",
      "Deployment",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#BFA36A]" />
            <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
              Services
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#101010] leading-[1.1] tracking-tight mb-8">
            Capabilities built <br /> for ambition.
          </h2>
          <p className="text-[#757575] text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
            From brand strategy to full-stack development, we offer the complete range of capabilities an ambitious digital product needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {SERVICES_LIST.map((service, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-8 border-b border-[#E6E6E6] pb-6">
                <span className="text-[#BFA36A] font-mono text-sm tracking-widest mb-4 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[#101010] font-semibold text-2xl tracking-tight">
                  {service.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#757575] group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6E6E6] group-hover:bg-[#BFA36A] transition-colors" />
                    <span className="text-base font-medium transition-colors group-hover:text-[#101010]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-[#E6E6E6] flex justify-between items-center flex-col sm:flex-row gap-6">
          <p className="text-[#757575] text-lg font-medium">Looking for something specific?</p>
          <Link
            href="/services"
            className="group relative px-8 py-4 bg-[#111111] text-white text-sm font-medium rounded-full overflow-hidden transition-shadow hover:shadow-[0_8px_25px_rgba(17,17,17,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <div className="absolute inset-0 bg-[#BFA36A] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
