"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS } from "@/lib/brands";
import { SHIPPED } from "@/lib/shipped";
import RollLabel from "@/components/ui/RollLabel";

const RHYTHM = [
  { w: 290, h: 390, y: 0 },
  { w: 480, h: 260, y: 70 },
  { w: 230, h: 430, y: -40 },
  { w: 350, h: 315, y: 40 },
  { w: 510, h: 250, y: 80 },
  { w: 270, h: 370, y: 20 },
  { w: 390, h: 295, y: 55 },
  { w: 250, h: 440, y: -30 },
  { w: 330, h: 330, y: 50 },
  { w: 440, h: 268, y: 25 },
] as const;

const BRAND_BG: Record<string, string> = {
  luminary: "#1a2744",
  vera:     "#b89a7e",
  arc:      "#111111",
  bloom:    "#a8c9b8",
  onyx:     "#0d1117",
  prism:    "#5b4fcf",
};

type WorkItem = {
  name:  string;
  href:  string;
  src:   string;
  label: string;
  bg:    string;
};

function buildItems(): WorkItem[] {
  const brands: WorkItem[] = BRANDS.map((b) => ({
    name:  b.name,
    href:  `/work/${b.slug}`,
    src:   `/images/work/${b.slug}/home-desktop.webp`,
    label: "Case study",
    bg:    BRAND_BG[b.slug] ?? "#1f3d3a",
  }));

  const shipped: WorkItem[] = SHIPPED.slice(0, 4).map((p) => ({
    name:  p.name,
    href:  p.url,
    src:   `/images/shipped/${p.slug}/desktop.webp`,
    label: "Live site",
    bg:    "#1f3d3a",
  }));

  const out: WorkItem[] = [];
  const max = Math.max(brands.length, shipped.length);
  for (let i = 0; i < max; i++) {
    if (brands[i])  out.push(brands[i]);
    if (shipped[i]) out.push(shipped[i]);
  }
  return out;
}

const ITEMS   = buildItems();
const DISPLAY = [...ITEMS, ...ITEMS];

function WorkCard({
  item,
  r,
}: {
  item: WorkItem;
  r: (typeof RHYTHM)[number];
}) {
  const [imgError, setImgError] = useState(false);
  const isExternal = item.href.startsWith("http");

  const card = (
    <motion.div
      className="relative shrink-0 overflow-hidden rounded-2xl"
      style={{ width: r.w, height: r.h, y: r.y }}
      whileHover={{ scale: 1.055 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
    >
      {!imgError ? (
        <Image
          src={item.src}
          alt={item.name}
          fill
          sizes="520px"
          className="object-cover object-top"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end p-5"
          style={{ background: item.bg }}
        >
          <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white/70">
            {item.name}
          </p>
        </div>
      )}

      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)",
        }}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        whileHover={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {item.label}
        </span>
        <span className="font-display text-lg font-black uppercase leading-tight tracking-tight text-white">
          {item.name}
        </span>
        <span className="mt-2 font-mono text-[10px] tracking-[0.1em] text-white/50">
          View →
        </span>
      </motion.div>
    </motion.div>
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
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative bg-[var(--brand-bg)] py-20 text-[var(--brand-text)] md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="chip-mono mb-5 block">Selected work</span>
            <h2 className="headline text-[clamp(2.8rem,6.5vw,6rem)]">
              Selected works
            </h2>
          </div>

          <Link
            href="/work"
            data-cursor="SEE"
            className="group inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-6 py-3 text-[14px] font-medium transition-colors duration-300 hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
          >
            <RollLabel text="All work" />
          </Link>
        </div>
      </div>

      <div
        className="mt-14 overflow-hidden md:mt-20"
        style={{ height: "590px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Scrolling portfolio preview"
      >
        <div
          className="marquee-track flex items-start gap-4 px-4"
          style={{
            paddingTop: "70px",
            "--marquee-duration": "65s",
            animationPlayState: paused ? "paused" : "running",
          } as React.CSSProperties}
        >
          {DISPLAY.map((item, i) => (
            <WorkCard
              key={`${item.name}-${i}`}
              item={item}
              r={RHYTHM[i % RHYTHM.length]}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--brand-border)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--brand-text-secondary)]">
            Shipped sites and concept systems
          </p>
          <Link
            href="/work"
            data-cursor="SEE"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-text-secondary)] transition-colors duration-300 hover:text-[var(--brand-text)]"
          >
            See all →
          </Link>
        </div>
      </div>
    </section>
  );
}
