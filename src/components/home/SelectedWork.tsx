"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS } from "@/lib/brands";
import { SHIPPED } from "@/lib/shipped";
import RollLabel from "@/components/ui/RollLabel";
import QuickInfoPanel from "./QuickInfoPanel";

/**
 * Selected work — fourmula.ai inspired: minimal, large images, generous whitespace,
 * no chrome. Layout is karolinahess.com inspired: sticky quick-info aside + horizontal scroll rail.
 */

type WorkItem = {
  name: string;
  href: string;
  src: string;
  lifestyle?: string;
  label: string;
  bg: string;
};

const BRAND_BG: Record<string, string> = {
  luminary: "#1a2744",
  vera: "#b89a7e",
  arc: "#111111",
  bloom: "#a8c9b8",
  onyx: "#0d1117",
  prism: "#5b4fcf",
};

function buildItems(): WorkItem[] {
  const brands: WorkItem[] = BRANDS.map((b) => ({
    name: b.name,
    href: `/work/${b.slug}`,
    src: `/images/work/${b.slug}/home-desktop.webp`,
    lifestyle: `/images/work/${b.slug}/cover-lifestyle.jpg`,
    label: "Concept",
    bg: BRAND_BG[b.slug] ?? "#1f3d3a",
  }));

  const shipped: WorkItem[] = SHIPPED.slice(0, 4).map((p) => ({
    name: p.name,
    href: p.url,
    src: `/images/shipped/${p.slug}/desktop.webp`,
    label: "Live",
    bg: "#1f3d3a",
  }));

  // Interleave like before but limit to 8 for horizontal rail (like karolina recent works)
  const out: WorkItem[] = [];
  const max = Math.max(brands.length, shipped.length);
  for (let i = 0; i < max; i++) {
    if (brands[i]) out.push(brands[i]);
    if (shipped[i]) out.push(shipped[i]);
  }
  return out.slice(0, 10);
}

const ITEMS = buildItems();

function WorkCard({ item }: { item: WorkItem }) {
  const [imgError, setImgError] = useState(false);
  const isExternal = item.href.startsWith("http");
  const displaySrc = imgError && item.lifestyle ? item.lifestyle : item.src;

  const card = (
    <div className="group relative flex w-[88vw] max-w-[420px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:w-[420px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--brand-surface-secondary)]">
        {!imgError || item.lifestyle ? (
          <Image
            src={displaySrc}
            alt={item.name}
            fill
            sizes="420px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6" style={{ background: item.bg }}>
            <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white/80">
              {item.name}
            </p>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[var(--brand-bg)]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text)] backdrop-blur">
          {item.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-lg font-black uppercase tracking-tight">{item.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--brand-text-secondary)] line-clamp-2">
          {isExternal ? "Live site — opens in new tab" : "Self-initiated concept system"}
        </p>
        <span className="mt-auto pt-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
          View →
        </span>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="block shrink-0">
        {card}
      </a>
    );
  }
  return (
    <Link href={item.href} className="block shrink-0">
      {card}
    </Link>
  );
}

export default function SelectedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  return (
    <section className="relative bg-[var(--brand-bg)] py-16 text-[var(--brand-text)] md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header — antigravity/expo/deepmind simplicity: large type, lots of whitespace */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="chip-mono mb-4 inline-block">Selected work</span>
            <h2 className="headline text-[clamp(2.16rem, 6vw, 4.1rem)] leading-[0.95]">
              Selected works
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
              A mix of live sites and self-initiated concept systems — each one a real site, not a mockup.
            </p>
          </div>
          <Link
            href="/work"
            data-cursor="SEE"
            className="group hidden items-center justify-center rounded-full border border-[var(--brand-border)] px-6 py-3 text-[14px] font-medium transition-colors duration-300 hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] md:inline-flex"
          >
            <RollLabel text="All work" />
          </Link>
        </div>
      </div>

      {/* Karolina-style two-column: quick info sticky + horizontal rail */}
      <div className="mx-auto mt-10 flex max-w-[1400px] flex-col gap-8 px-5 md:px-10 lg:flex-row lg:gap-8">
        <QuickInfoPanel />

        <div className="min-w-0 flex-1">
          {/* Horizontal scroll rail — karolinahess.com inspired */}
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            data-h-scroll
            className={`flex gap-5 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
            style={{ scrollSnapType: "x proximity" }}
            aria-label="Horizontal work gallery, drag to scroll"
          >
            {ITEMS.map((item) => (
              <div key={item.name} style={{ scrollSnapAlign: "start" }}>
                <WorkCard item={item} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--brand-text-secondary)]">
              Drag to explore · {ITEMS.length} projects
            </p>
            <Link
              href="/work"
              data-cursor="SEE"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)] lg:hidden"
            >
              See all →
            </Link>
          </div>
        </div>
      </div>

      {/* Mascot footer line — consistent 2D character like cardtonic/upskill */}
      <div className="mx-auto mt-12 hidden max-w-[1400px] items-center gap-3 px-5 opacity-60 md:flex md:px-10">
        <span className="h-px flex-1 bg-[var(--brand-border)]" />
        <motion.div
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 2, scale: 1.05 }}
          className="flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-2 text-xs"
        >
          <span className="relative h-6 w-6 overflow-hidden rounded-full bg-[var(--brand-surface-secondary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/character/greene-mascot.png" alt="" className="h-full w-full object-cover" />
          </span>
          <span className="font-medium tracking-[-0.01em]">Built with care — Greene character</span>
        </motion.div>
        <span className="h-px flex-1 bg-[var(--brand-border)]" />
      </div>
    </section>
  );
}
