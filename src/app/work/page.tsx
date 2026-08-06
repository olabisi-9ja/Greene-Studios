"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web Design", "Branding", "Product", "Development", "Motion"];

export default function WorkPage() {
 const [activeFilter, setActiveFilter] = useState("All");

 const filteredProjects = PROJECTS.filter((project) => {
 if (activeFilter === "All") return true;
 return (
 project.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
 project.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()))
 );
 });

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Our work · 2023 → 2026"
 title={
 <>
 Projects that
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">define the craft.</span>
 </>
 }
 description="A curated selection of work across web design, branding, product, and development."
 right={
 <p className="font-display text-6xl font-black leading-none text-outline md:text-7xl">
 0{PROJECTS.length}
 </p>
 }
 />

 {/* Filters */}
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <div className="flex flex-wrap items-center gap-2 border-b border-[var(--brand-border)] pb-6">
 {FILTERS.map((filter) => (
 <button
 key={filter}
 onClick={() => setActiveFilter(filter)}
 data-cursor="FILTER"
 className={cn(
 "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300",
 activeFilter === filter
 ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
 : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
 )}
 >
 {filter}
 </button>
 ))}
 <span className="ml-auto hidden text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] sm:block">
 {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
 </span>
 </div>
 </div>

 {/* Grid */}
 <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-10 md:px-10">
 {filteredProjects.length > 0 ? (
 <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
 {filteredProjects.map((project, i) => (
 <Link
 key={project.id}
 href={`/work/${project.slug}`}
 className={cn("group", i === 0 && activeFilter === "All" && "md:col-span-2")}
 data-cursor="VIEW"
 >
 <div
 className={cn(
 "relative overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]",
 i === 0 && activeFilter === "All" ? "aspect-[21/9]" : "aspect-[4/3]"
 )}
 >
 <Image
 src={project.image}
 alt={project.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 priority={i < 2}
 className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
 />
 {/* hover sweep */}
 <div
 className="work-sweep absolute inset-0 scale-x-0 opacity-90 mix-blend-overlay group-hover:scale-x-100"
 aria-hidden="true"
 />
 <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[var(--brand-ink)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
 →
 </span>
 </div>

 <div className="mt-5 flex items-baseline justify-between gap-4">
 <div className="flex items-baseline gap-4">
 <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
 0{i + 1}
 </span>
 <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:text-3xl">
 {project.title}
 </h2>
 </div>
 <div className="flex shrink-0 items-center gap-3">
 <span className="hidden text-xs font-semibold text-[var(--brand-text-secondary)] sm:block">
 {project.category}
 </span>
 <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
 {project.year}
 </span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 text-center">
 <h3 className="font-display text-2xl font-black uppercase text-[var(--brand-text)]">
 No projects found
 </h3>
 <p className="mt-2 text-sm text-[var(--brand-text-secondary)]">
 Try adjusting your filters or checking back later.
 </p>
 <button
 onClick={() => setActiveFilter("All")}
 className="btn-primary mt-8"
 >
 Clear filters
 </button>
 </div>
 )}

 {/* Experiments CTA */}
 <div className="mt-24 flex flex-col items-start justify-between gap-8 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-10 md:flex-row md:items-center md:p-14">
 <div>
 <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ The lab
 </span>
 <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-[var(--brand-text)] md:text-4xl">
 Curious how we <span className="font-serif-i lowercase normal-case tracking-normal">experiment?</span>
 </h3>
 </div>
 <Link href="/experiments" data-cursor="GO" className="btn-primary shrink-0">
 Explore the lab <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </div>
 );
}
