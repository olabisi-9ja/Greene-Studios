import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free design and development resources from Greene Studios.",
};

const RESOURCES = [
  {
    category: "UI Kits",
    title: "Minimal Design System",
    description: "A comprehensive Figma UI kit for modern web applications.",
    type: "Figma",
    link: "#",
  },
  {
    category: "Checklists",
    title: "Website Launch Checklist",
    description: "Everything you need to verify before taking your Next.js site live.",
    type: "PDF",
    link: "#",
  },
  {
    category: "Figma Files",
    title: "SaaS Landing Page Template",
    description: "High-converting layout template with full auto-layout support.",
    type: "Figma",
    link: "#",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl md:text-6xl font-black text-[#101010] tracking-tight mb-6">
          Resources
        </h1>
        <p className="text-[#757575] text-xl leading-relaxed mb-16 max-w-2xl">
          We believe in giving back to the community. Here are some free tools, 
          templates, and guides to help you build better digital products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES.map((item, i) => (
            <div key={i} className="group flex flex-col p-8 bg-white border border-[#E6E6E6] rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[#BFA36A] text-xs font-bold tracking-widest uppercase bg-[#BFA36A]/10 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-[#A3A3A3] text-xs font-medium">
                  {item.type}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101010] mb-3 group-hover:text-[#BFA36A] transition-colors">{item.title}</h3>
              <p className="text-[#757575] text-sm leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>
              <a href={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] group-hover:gap-3 transition-all">
                Download <span className="text-[#BFA36A]">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
