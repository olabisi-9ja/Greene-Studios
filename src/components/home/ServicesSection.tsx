"use client";

import Link from "next/link";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

const SERVICES = [
 {
 id: "web-design",
 title: "Web Design",
 desc: "Websites that stop the scroll and start conversations.",
 tags: ["UI", "Design systems", "Prototyping"],
 },
 {
 id: "ui-ux",
 title: "UI/UX Design",
 desc: "Interfaces that feel inevitable, designed for outcomes, not aesthetics alone.",
 tags: ["Research", "Flows", "Testing"],
 },
 {
 id: "branding",
 title: "Branding",
 desc: "Identity systems that outlast trends and command trust.",
 tags: ["Strategy", "Identity", "Guidelines"],
 },
 {
 id: "frontend-dev",
 title: "Frontend Development",
 desc: "Pixel-perfect React & Next.js code, built for motion and performance.",
 tags: ["React", "Next.js", "Motion"],
 },
 {
 id: "motion-design",
 title: "Motion Design",
 desc: "Motion that communicates, from micro-interactions to full brand films.",
 tags: ["UI motion", "Scroll", "Lottie"],
 },
];

export default function ServicesSection() {
 const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

 return (
 <section className="bg-[var(--brand-surface)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 {/* Header */}
 <div className="mb-14 max-w-3xl md:mb-20">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Services
 </span>
 <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
 Capabilities built <span className="font-serif-i lowercase normal-case tracking-normal">for ambition.</span>
 </h2>
 </div>

 {/* Rows */}
 <div ref={containerRef} className="flex flex-col border-t border-[var(--brand-border)]">
 {SERVICES.map((service, i) => (
 <Link
 key={service.id}
 href={`/services/${service.id}`}
 className="stagger-item group relative block border-b border-[var(--brand-border)]"
 data-cursor="VIEW"
 >
 <div className="relative z-10 grid grid-cols-12 items-center gap-3 px-1 py-7 transition-all duration-500 md:px-4 md:py-9 md:group-hover:px-8">
 <span className="col-span-2 font-mono text-xs text-[var(--brand-text-secondary)] md:col-span-1 md:text-sm">
 0{i + 1}
 </span>
 <h3 className="col-span-10 font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:col-span-4">
 {service.title}
 </h3>
 <p className="col-span-12 mt-2 max-w-md text-sm leading-relaxed text-[var(--brand-text-secondary)] md:col-span-5 md:mt-0 md:text-[15px]">
 {service.desc}
 </p>
 <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-2 md:justify-end">
 {service.tags.map((tag) => (
 <span
 key={tag}
 className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)]"
 >
 {tag}
 </span>
 ))}
 <span
 className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-ink)] md:ml-2"
 aria-hidden="true"
 >
 →
 </span>
 </div>
 </div>
 </Link>
 ))}
 </div>

 {/* CTA */}
 <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
 <p className="font-serif-i text-xl text-[var(--brand-text-secondary)] md:text-2xl">
 Something more custom in mind?
 </p>
 <Link href="/services" data-cursor="GO" className="btn-primary">
 Explore all services <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </section>
 );
}
