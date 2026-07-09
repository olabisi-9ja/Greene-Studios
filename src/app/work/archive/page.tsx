import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
 title: "Work Archive — All Projects",
 description: "The complete archive of Greene Studios projects from 2022 to present.",
};

export default function ArchivePage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32">
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
 <Link href="/work" className="inline-flex items-center gap-2 text-[#F7F5F2]/40 hover:text-[#F7F5F2] text-sm mb-8 transition-colors">
 ← Back to Work
 </Link>
 <div className="flex items-center gap-3 mb-4">
 <div className="w-6 h-px bg-[#6B8F71]" />
 <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">Archive</span>
 </div>
 <h1 className="text-6xl font-black text-[#F7F5F2] mb-16 tracking-tight">
 All Projects.
 </h1>

 {/* Table view */}
 <div className="space-y-0">
 {PROJECTS.map((project, i) => (
 <Link key={project.id} href={`/work/${project.slug}`} className="group block">
 <div className="grid grid-cols-12 items-center gap-4 py-5 border-b border-white/5 hover:border-[#12372A]/40 transition-all">
 <div className="col-span-1">
 <span className="text-[#F7F5F2]/20 text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
 </div>
 <div className="col-span-4">
 <h2 className="text-[#F7F5F2] font-bold text-lg group-hover:text-[#6B8F71] transition-colors tracking-tight">{project.title}</h2>
 </div>
 <div className="col-span-3 hidden md:block">
 <span className="text-[#F7F5F2]/40 text-sm">{project.category}</span>
 </div>
 <div className="col-span-2 hidden lg:flex flex-wrap gap-1">
 {project.tags.slice(0, 1).map((tag) => (
 <span key={tag} className="text-[#F7F5F2]/25 text-xs px-2 py-1 border border-white/5 rounded">{tag}</span>
 ))}
 </div>
 <div className="col-span-1 text-right hidden sm:block">
 <span className="text-[#F7F5F2]/30 text-sm font-mono">{project.year}</span>
 </div>
 <div className="col-span-1 text-right">
 <span className="text-[#6B8F71] opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </div>
 );
}
