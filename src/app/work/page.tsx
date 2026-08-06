"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Web Design", "Branding", "Product", "Development", "Motion"];

export default function WorkPage() {
 const [activeFilter, setActiveFilter] = useState("All");

 const filteredProjects = PROJECTS.filter(project => {
 if (activeFilter === "All") return true;
 return project.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
 project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
 });

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32">
 {/* Header */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">
 Our Work
 </span>
 </div>
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
 <h1 className="text-6xl lg:text-8xl font-semibold text-[var(--brand-text)] leading-[1.1] tracking-tight">
 Projects that
 <br />
 <span className="text-[var(--brand-text)]/30">define the craft.</span>
 </h1>
 <p className="text-[var(--brand-text-secondary)] text-lg leading-relaxed max-w-sm">
 A curated selection of work across web design, branding, product,
 and development.
 </p>
 </div>
 </div>

 {/* Filter Tabs */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
 <div className="flex flex-wrap gap-3">
 {FILTERS.map((filter) => (
 <button
 key={filter}
 onClick={() => setActiveFilter(filter)}
 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
 activeFilter === filter
 ? "bg-[var(--brand-text)] text-white"
 : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
 }`}
 >
 {filter}
 </button>
 ))}
 </div>
 </div>

 {/* Projects Grid */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
 {filteredProjects.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {filteredProjects.map((project, i) => (
 <Link
 key={project.id}
 href={`/work/${project.slug}`}
 className={`group block ${i === 0 && activeFilter === "All" ? "md:col-span-2" : ""}`}
 >
 <div className="relative overflow-hidden rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
 <div
 className="relative overflow-hidden rounded-[24px] bg-[#1A1A1A] group"
 style={{ aspectRatio: i === 0 && activeFilter === "All" ? "16/7" : "4/3" }}
 >
 <Image
 src={project.image}
 alt={project.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 priority={i < 4}
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

 {/* Content */}
 <div className="absolute inset-0 flex flex-col justify-between p-8">
 <div className="flex items-start justify-between">
 <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full font-medium">
 {project.category}
 </span>
 <span className="text-white/80 text-sm font-mono bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">{project.year}</span>
 </div>
 <div>
 <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-2 tracking-tight">
 {project.title}
 </h2>
 <p className="text-white/80 text-sm mb-4 max-w-lg leading-relaxed">
 {project.description}
 </p>
 <div className="flex flex-wrap gap-2">
 {project.tags.map((tag) => (
 <span
 key={tag}
 className="text-white/70 text-xs px-3 py-1 border border-white/20 rounded-full backdrop-blur-sm"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="text-center py-24 bg-[var(--brand-bg)] rounded-[24px] border border-[var(--brand-border)]">
 <h3 className="text-2xl font-semibold text-[var(--brand-text)] mb-2">No projects found</h3>
 <p className="text-[var(--brand-text-secondary)]">Try adjusting your filters or checking back later.</p>
 <button 
 onClick={() => setActiveFilter("All")}
 className="mt-6 text-[var(--brand-accent)] font-medium hover:text-[var(--brand-text)] transition-colors"
 >
 Clear filters
 </button>
 </div>
 )}

 {/* Experiments CTA */}
 <div className="mt-16 p-12 bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-[24px] text-center shadow-sm">
 <h3 className="text-[var(--brand-text)] text-3xl font-semibold mb-4 tracking-tight">
 Curious about how we experiment?
 </h3>
 <p className="text-[var(--brand-text-secondary)] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
 Explore our lab of creative coding, 3D experiments, and interactive playgrounds.
 </p>
 <Link
 href="/experiments"
 className="inline-flex items-center gap-3 bg-[var(--brand-text)] hover:bg-[var(--brand-accent)] text-white text-base font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_color-mix(in srgb, var(--brand-accent) 30%, transparent)] hover:-translate-y-0.5"
 >
 View Experiments →
 </Link>
 </div>
 </div>
 </div>
 );
}
