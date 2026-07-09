import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
 title: "Careers",
 description: "Join the team at Greene Studios.",
};

const POSITIONS = [
 {
 title: "Senior Product Designer",
 location: "Remote / Lagos",
 type: "Full-time",
 },
 {
 title: "Frontend Engineer (React/Next.js)",
 location: "Remote",
 type: "Contract",
 },
];

export default function CareersPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32 pb-24">
 <div className="max-w-4xl mx-auto px-6 lg:px-12">
 <h1 className="text-5xl md:text-6xl font-black text-[#F7F5F2] tracking-tight mb-6">
 Join the team
 </h1>
 <p className="text-[#F7F5F2]/50 text-xl leading-relaxed mb-16">
 We&apos;re always looking for talented designers, developers, and strategists 
 who are passionate about building exceptional digital experiences.
 </p>

 <div className="space-y-4">
 <h2 className="text-sm font-bold tracking-widest text-[#6B8F71] uppercase mb-8">Open Positions</h2>
 
 {POSITIONS.map((job) => (
 <div key={job.title} className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6">
 <div>
 <h3 className="text-xl font-bold text-[#F7F5F2] mb-2">{job.title}</h3>
 <div className="flex gap-3 text-sm text-[#F7F5F2]/40">
 <span>{job.location}</span>
 <span>&bull;</span>
 <span>{job.type}</span>
 </div>
 </div>
 <a 
 href={`mailto:${BRAND.email}?subject=Application for ${job.title}`}
 className="inline-flex items-center justify-center bg-[#12372A] hover:bg-[#6B8F71] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
 >
 Apply Now
 </a>
 </div>
 ))}
 </div>

 <div className="mt-24 p-8 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl text-center">
 <h3 className="text-[#F7F5F2] font-bold text-xl mb-3">Don&apos;t see a fit?</h3>
 <p className="text-[#F7F5F2]/50 mb-6">
 We&apos;re always open to meeting interesting people. Send us your portfolio and a brief intro.
 </p>
 <a href={`mailto:${BRAND.email}`} className="text-[#6B8F71] hover:text-white font-medium underline underline-offset-4">
 hello@greenestudios.co
 </a>
 </div>
 </div>
 </div>
 );
}
