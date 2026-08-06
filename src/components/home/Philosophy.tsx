"use client";

import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

export default function Philosophy() {
 const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

 const principles = [
 {
 num: "01",
 title: "Function over fluff",
 desc: "Every interaction must serve a functional purpose. High aesthetics are non-negotiable, but usability and speed come first."
 },
 {
 num: "02",
 title: "No templates. No shortcuts.",
 desc: "We don't copy trends. We construct cohesive systems custom-tailored to a brand's true voice, market, and ambitions."
 },
 {
 num: "03",
 title: "Built for the long run",
 desc: "We build clean architectures that scale. Designs that survive market cycles and keep your brand relevant for years."
 }
 ];

 return (
 <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-32">
 <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
 {/* Left · sticky statement */}
 <div className="lg:col-span-4">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Our philosophy
 </span>
 <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
 No templates.
 <br />
 No <span className="font-serif-i lowercase normal-case tracking-normal">shortcuts.</span>
 </h2>
 <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--brand-text-secondary)]">
 We follow a strict set of design and architectural values so every project lands at global creative standard, and stays there.
 </p>
 </div>

 {/* Right · principles list */}
 <div ref={containerRef} className="lg:col-span-8">
 <div className="flex flex-col border-t border-[var(--brand-border)]">
 {principles.map((p) => (
 <div
 key={p.num}
 className="stagger-item group flex flex-col gap-3 border-b border-[var(--brand-border)] py-8 transition-colors duration-500 hover:bg-[var(--brand-surface-secondary)] md:flex-row md:items-baseline md:gap-10 md:px-6"
 >
 <span className="font-mono text-sm text-[var(--brand-accent)]">{p.num}</span>
 <div className="flex-1">
 <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
 {p.title}
 </h3>
 <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
 {p.desc}
 </p>
 </div>
 <span
 className="hidden shrink-0 text-xl text-[var(--brand-accent)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block"
 aria-hidden="true"
 >
 →
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
