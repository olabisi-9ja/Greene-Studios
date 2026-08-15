"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

const CARDS = [
 {
 id: "01",
 title: "Strategy before decoration",
 description: "We find the signal first: what matters, who it is for, and why it deserves attention. The visual system follows the idea.",
 color: "#87FF5A",
 },
 {
 id: "02",
 title: "Design and code together",
 description: "The people shaping the experience are close to the people building it. That is how ambitious ideas survive contact with production.",
 color: "#A8D8A0",
 },
 {
 id: "03",
 title: "Every interaction earns its place",
 description: "Motion is not decoration. It should clarify, guide, or create a feeling worth remembering — otherwise it does not belong.",
 color: "#D7E8A0",
 },
 {
 id: "04",
 title: "Quiet structure. Loud work.",
 description: "The interface stays precise and editorial so the work can be expressive, cinematic, and unmistakably itself.",
 color: "#6FA878",
 },
];

export default function WhyWeExist() {
 const [hovered, setHovered] = useState<string | null>(null);
 const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");

 return (
 <section className="relative py-24 md:py-36 bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 {/* Header */}
 <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
 <div className="max-w-4xl">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> How we work
 </span>
 <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
 We design for <span className="font-serif-i lowercase normal-case tracking-normal">memory.</span>
 </h2>
 </div>
 <div className="hidden shrink-0 md:block">
 <RotatingStamp />
 </div>
 </div>

 {/* Rows */}
 <div ref={containerRef} className="flex w-full flex-col border-t-2 border-[var(--brand-text)]">
 {CARDS.map((card) => {
 const isHovered = hovered === card.id;
 return (
 <div
 key={card.id}
 onMouseEnter={() => setHovered(card.id)}
 onMouseLeave={() => setHovered(null)}
 className="stagger-item group relative w-full overflow-hidden border-b-2 border-[var(--brand-text)]"
 data-cursor="EXPLORE"
 >
 {/* hover fill */}
 <motion.div
 initial={{ height: "0%" }}
 animate={{ height: isHovered ? "100%" : "0%" }}
 transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
 className="absolute bottom-0 left-0 z-0 w-full opacity-[0.08]"
 style={{ backgroundColor: card.color }}
 />

 <div className="relative z-10 grid grid-cols-12 items-center gap-4 px-1 py-8 md:py-12">
 <span className="col-span-2 font-mono text-sm text-[var(--brand-text-secondary)] md:col-span-1 md:text-base">
 {card.id}
 </span>

 <h3
 className="col-span-10 font-display text-[clamp(1.9rem,4.6vw,4.2rem)] font-black uppercase leading-[0.92] tracking-tight transition-colors duration-500 md:col-span-7"
 style={{ color: isHovered ? card.color : "var(--brand-text)" }}
 >
 {card.title}
 </h3>

 <div className="col-span-12 flex items-start justify-start md:col-span-4 md:justify-end">
 <AnimatePresence mode="wait">
 {isHovered ? (
 <motion.p
 key="desc"
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -16 }}
 transition={{ duration: 0.3 }}
 className="max-w-sm pt-1 text-sm font-medium leading-relaxed text-[var(--brand-text)] md:text-right md:text-[15px]"
 >
 {card.description}
 </motion.p>
 ) : (
 <motion.div
 key="arrow"
 initial={{ opacity: 0, x: -16 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 16 }}
 className="hidden h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--brand-text)] transition-transform duration-500 group-hover:rotate-45 md:flex"
 >
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <line x1="5" y1="12" x2="19" y2="12" />
 <polyline points="12 5 19 12 12 19" />
 </svg>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>
 );
}

function RotatingStamp() {
 return (
 <svg viewBox="0 0 100 100" className="h-24 w-24 animate-spin-slow" aria-hidden="true">
 <defs>
 <path id="why-stamp" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
 </defs>
 <text className="fill-[var(--brand-text)] font-display font-bold uppercase" style={{ fontSize: "9.5px", letterSpacing: "0.2em" }}>
 <textPath href="#why-stamp">
 UNFORGETTABLE ✦ UNFORGETTABLE ✦
 </textPath>
 </text>
 <circle cx="50" cy="50" r="8" fill="none" stroke="var(--brand-accent)" strokeWidth="2" />
 <circle cx="50" cy="50" r="3" fill="var(--brand-accent)" />
 </svg>
 );
}
