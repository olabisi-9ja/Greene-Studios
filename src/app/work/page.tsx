"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { cn, colorBlurDataURL } from "@/lib/utils";

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

  {/* Grid — Lightship-style panels: full-bleed image, giant title over a scrim */}
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
                "relative overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] md:rounded-3xl",
                i === 0 && activeFilter === "All" ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"
              )}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={colorBlurDataURL(project.color)}
                className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              {/* scrim for type legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25 transition-opacity duration-700 group-hover:opacity-90" />

              <span className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-white/80 backdrop-blur-sm">
                0{i + 1}
              </span>

              <span
                className="absolute right-5 top-5 flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <span className="text-lg">→</span>
              </span>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:flex-row md:items-end md:justify-between md:gap-8 md:p-8">
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                    {project.category} · {project.year}
                  </span>
                  <h2
                    className={cn(
                      "font-display font-black uppercase leading-[0.9] tracking-tight text-white",
                      i === 0 && activeFilter === "All"
                        ? "text-[clamp(2.2rem,5vw,5rem)]"
                        : "text-[clamp(1.9rem,3.6vw,3.4rem)]"
                    )}
                  >
                    {project.title}
                  </h2>
                </div>
                <span className="hidden shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white md:flex">
                  Explore
                  <span className="border-b-2 border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-[var(--brand-accent)]" aria-hidden="true" />
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
        <div className="mt-24 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 md:grid-cols-[240px_1fr_auto] md:p-6 md:pl-10">
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl md:block">
            <Image
              src="/images/hero/mockup-1.jpg"
              alt="A Greene Studios experiment"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
              ✦ The lab
            </span>
            <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-[var(--brand-text)] md:text-4xl">
              Curious how we <span className="font-serif-i lowercase normal-case tracking-normal">experiment?</span>
            </h3>
          </div>
          <Link href="/experiments" data-cursor="GO" className="btn-primary w-fit shrink-0">
            Explore the lab <span aria-hidden="true">→</span>
          </Link>
        </div>
 </div>
 </div>
 );
}
