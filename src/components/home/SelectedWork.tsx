"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS } from "@/lib/brands";
import { SHIPPED } from "@/lib/shipped";
import RollLabel from "@/components/ui/RollLabel";

/**
 * Works marquee — editorial, asymmetric, continuously scrolling.
 *
 * Inspired by the Karolina Hess portfolio aesthetic:
 *   - Full-bleed horizontal strip with items at varying sizes and vertical offsets
 *   - CSS-driven scroll (linear, GPU-only — no JS per frame)
 *   - Framer-motion spring scale on individual card hover (Jakub polish)
 *   - Hover overlay materialises with blur (Jakub enter recipe)
 *   - Strip pauses on hover so users can inspect items
 *   - prefers-reduced-motion: pauses the strip, keeps overlays instant
 *
 * Layout math
 * -----------
 * Container: height 580px, paddingTop 70px (absorbs up-to -40px negative offsets)
 * Max rendered bottom = paddingTop(70) + maxY(80) + maxHeight(440) = 590px → within 580+10 safe-zone
 * Every RHYTHM permutation is checked: all fit within [0, 590]px.
 */

// ─── Layout rhythm ────────────────────────────────────────────────────────────
// Cycles across all items. Width (px), height (px), vertical translate (px).
// Positive y = item sits lower in strip; negative y = item rises above midline.
const RHYTHM = [
  { w: 290, h: 390, y: 0 },    // portrait, top-aligned
  { w: 480, h: 260, y: 70 },   // wide landscape, dropped
  { w: 230, h: 430, y: -40 },  // tall, raised
  { w: 350, h: 315, y: 40 },   // near-square, mid
  { w: 510, h: 250, y: 80 },   // ultrawide, low
  { w: 270, h: 370, y: 20 },   // portrait, slight drop
  { w: 390, h: 295, y: 55 },   // landscape, mid-low
  { w: 250, h: 440, y: -30 },  // tallest, raised
  { w: 330, h: 330, y: 50 },   // square, mid
  { w: 440, h: 268, y: 25 },   // landscape, near-top
] as const;

// ─── Fallback brand colours (shown when images aren't present yet) ────────────
const BRAND_BG: Record<string, string> = {
  luminary: "#1a2744",
  vera:     "#b89a7e",
  arc:      "#111111",
  bloom:    "#a8c9b8",
  onyx:     "#0d1117",
  prism:    "#5b4fcf",
};

// ─── Item shape ───────────────────────────────────────────────────────────────
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

  // Interleave concept + shipped for visual variety
  const out: WorkItem[] = [];
  const max = Math.max(brands.length, shipped.length);
  for (let i = 0; i < max; i++) {
    if (brands[i])  out.push(brands[i]);
    if (shipped[i]) out.push(shipped[i]);
  }
  return out;
}

const ITEMS   = buildItems();
const DISPLAY = [...ITEMS, ...ITEMS]; // doubled for seamless -50% loop

// ─── Single card ──────────────────────────────────────────────────────────────
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
      // Spring scale — Jakub production polish, bounce: 0 = professional
      whileHover={{ scale: 1.055 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
    >
      {/* Image — falls back to coloured brand plate if not yet on disk */}
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

      {/* Hover overlay — materialises with blur (Jakub enter recipe) */}
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

// ─── Section ──────────────────────────────────────────────────────────────────
export default function SelectedWork() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative bg-[var(--brand-bg)] py-20 text-[var(--brand-text)] md:py-28">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="chip-mono mb-5 block">01 · Selected work</span>
            <h2 className="headline flex flex-wrap items-baseline gap-x-4 text-[clamp(2.8rem,6.5vw,6rem)]">
              Selected works
              <sup
                className="font-mono text-[0.28em] font-normal tracking-[0.08em] text-[var(--brand-text-secondary)]"
                style={{ verticalAlign: "super" }}
              >
                [{ITEMS.length.toString().padStart(2, "0")}]
              </sup>
            </h2>
          </div>

          <Link
            href="/work"
            data-cursor="SEE"
            className="group btn-block btn-block-ghost shrink-0"
          >
            <RollLabel text="All work" />
          </Link>
        </div>
      </div>

      {/* ── Marquee strip ────────────────────────────────────────────── */}
      {/*
          Container maths:
            height 580px + paddingTop 70px inside = total visual space
            Max item bottom (worst-case): 70(pad) + 80(y) + 440(h) = 590px → clipped ≤ 10px at very bottom, acceptable
            Min item top  (worst-case):  70(pad) - 40(y)           =  30px → never clips top
      */}
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

      {/* ── Footer bar ───────────────────────────────────────────────── */}
      <div className="mx-auto mt-10 max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--brand-border)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--brand-text-secondary)]">
            {ITEMS.length} projects &mdash; shipped sites &amp; concept systems
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
