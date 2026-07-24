"use client";

import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { Code2, Paintbrush, Monitor, Cpu } from "lucide-react";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

export default function ServicesSection() {
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, '.stagger-item');

  const services = [
    {
      title: "Product Design",
      description: "Crafting intuitive UX, wireframes, and scalable design systems for modern applications.",
      icon: <Paintbrush className="w-6 h-6 text-[var(--brand-text)]" />,
      className: "md:col-span-2",
      header: <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-[24px] bg-[var(--brand-text)]/5 border border-[var(--brand-border)]" />
    },
    {
      title: "Web Design",
      description: "High-conversion marketing landing pages and optimized business platforms.",
      icon: <Monitor className="w-6 h-6 text-[var(--brand-text)]" />,
      className: "md:col-span-1",
      header: <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-[24px] bg-[var(--brand-text)]/5 border border-[var(--brand-border)]" />
    },
    {
      title: "Frontend Development",
      description: "Stunning React and Next.js interfaces built for maximum performance and SEO.",
      icon: <Code2 className="w-6 h-6 text-[var(--brand-text)]" />,
      className: "md:col-span-1",
      header: <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-[24px] bg-[var(--brand-text)]/5 border border-[var(--brand-border)]" />
    },
    {
      title: "AI Integration",
      description: "Embedding custom intelligence, LLM agents, and vector databases into your products.",
      icon: <Cpu className="w-6 h-6 text-[var(--brand-text)]" />,
      className: "md:col-span-2",
      header: <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-[24px] bg-[var(--brand-text)]/5 border border-[var(--brand-border)]" />
    }
  ];

  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
            Services
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-text)] leading-[1.1] tracking-tight mb-6 uppercase">
            Capabilities built <br /> for ambition.
          </h2>
          <p className="text-[var(--brand-text-secondary)] text-lg leading-relaxed">
            From brand identity design to full-stack frontend engineering, we offer the complete range of services to launch your product.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={containerRef}>
          <BentoGrid className="mb-16">
            {services.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                className={`${item.className} stagger-item`}
              />
            ))}
          </BentoGrid>
        </div>

        {/* CTA */}
        <div className="pt-12 border-t border-[var(--brand-border)] flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[var(--brand-text-secondary)] text-lg font-medium">Looking for custom digital features?</p>
          <Link
            href="/services"
            data-cursor="GO"
            className="px-8 py-4 bg-[var(--brand-text)] text-[var(--brand-bg)] text-sm font-semibold rounded-full hover:bg-[var(--brand-accent)] hover:text-white transition-all duration-300"
          >
            All Services
          </Link>
        </div>

      </div>
    </section>
  );
}
