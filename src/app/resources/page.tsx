import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CTASection from "@/components/home/CTASection";

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
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="Resources"
        title={
          <>
            Free tools for
            <br />
            <span className="font-serif-i lowercase normal-case tracking-normal">builders.</span>
          </>
        }
        description="We believe in giving back to the community. Here are some free tools, templates, and guides to help you build better digital products."
        right={
          <p className="font-display text-6xl font-black leading-none text-outline md:text-7xl">
            0{RESOURCES.length}
          </p>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="group flex flex-col rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
              data-cursor="DOWNLOAD"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="rounded-full bg-[var(--brand-accent)]/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
                  0{i + 1} · {item.type}
                </span>
              </div>
              <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)]">
                {item.title}
              </h2>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                {item.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)]">
                Download
                <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
