"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

type Project = (typeof PROJECTS)[number];

export default function SelectedWork() {
 const [active, setActive] = useState<Project | null>(null);
 const sectionRef = useRef<HTMLDivElement>(null);
 const listRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

 // Featured projects: the three flagged + Bloom Health to round out a strong four
 const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
 const bloom = PROJECTS.find((p) => p.id === "bloom-health");
 const projects = bloom ? [...featured, bloom] : featured;

 // Floating preview follows the cursor
 const mx = useMotionValue(0);
 const my = useMotionValue(0);
 const sx = useSpring(mx, { damping: 28, stiffness: 260, mass: 0.6 });
 const sy = useSpring(my, { damping: 28, stiffness: 260, mass: 0.6 });

 const handleMove = (e: React.MouseEvent) => {
 mx.set(e.clientX);
 my.set(e.clientY);
 };

 return (
 <section
 ref={sectionRef}
 onMouseMove={handleMove}
 className="relative bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36"
 >
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 {/* Header */}
 <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
 <div>
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Selected work · 2023 → 2026
 </span>
 <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
 Work that <span className="font-serif-i lowercase normal-case tracking-normal">works.</span>
 </h2>
 </div>
 <Link
 href="/work"
 data-cursor="GO"
 className="group inline-flex w-fit items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--brand-text)]"
 >
 <span className="border-b-2 border-[var(--brand-accent)] pb-0.5 transition-colors group-hover:border-[var(--brand-text)]">
 All projects
 </span>
 <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
 </Link>
 </div>

 {/* Rows */}
 <div ref={listRef} className="flex flex-col">
 {projects.map((project, i) => (
 <Link
 key={project.id}
 href={`/work/${project.slug}`}
 onMouseEnter={() => setActive(project)}
 onMouseLeave={() => setActive(null)}
 className="stagger-item group relative block border-t border-[var(--brand-border)] last:border-b"
 data-cursor="VIEW"
 >
 {/* lime sweep */}
 <div
 className="work-sweep absolute inset-0 scale-x-0 bg-[var(--brand-accent)] group-hover:scale-x-100"
 aria-hidden="true"
 />

 <div className="relative z-10 grid grid-cols-12 items-center gap-3 px-1 py-7 md:py-10">
 <span className="col-span-2 font-mono text-xs text-[var(--brand-text-secondary)] transition-colors duration-300 group-hover:text-[var(--brand-bg)] md:col-span-1 md:text-sm">
 0{i + 1}
 </span>
 <h3 className="col-span-10 font-display text-[clamp(2rem,4.8vw,4.4rem)] font-black uppercase leading-[0.9] tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-bg)] md:col-span-7">
 {project.title}
 </h3>
 <span className="hidden text-sm font-medium text-[var(--brand-text-secondary)] transition-colors duration-300 group-hover:text-[var(--brand-bg)] md:col-span-3 md:block">
 {project.category}
 </span>
 <span className="hidden text-right text-sm font-semibold text-[var(--brand-text-secondary)] transition-colors duration-300 group-hover:text-[var(--brand-bg)] lg:col-span-1 lg:block">
 {project.year}
 </span>
 </div>
 </Link>
 ))}
 </div>
 </div>

 {/* Floating preview image */}
 <motion.div
 className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
 style={{ x: sx, y: sy, marginLeft: -210, marginTop: -150 }}
 aria-hidden="true"
 >
 <div
 className={`relative h-[300px] w-[420px] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${
 active ? "opacity-100" : "opacity-0"
 }`}
 >
 {active && (
 <Image
 src={active.image}
 alt=""
 fill
 className="object-cover"
 sizes="420px"
 />
 )}
 </div>
 </motion.div>
 </section>
 );
}
