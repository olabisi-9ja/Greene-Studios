"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Manifesto — redesigned in the adcker.school editorial style.
 *
 * Structure:
 *   1. A large centered serif statement (the studio's core belief)
 *   2. A simple underlined "More about us" link
 *   3. A numbered image strip that runs edge-to-edge
 *      — each item: (NN) label above, image/color-plate below
 *      — hover: subtle scale + border highlight
 *      — fallback: coloured plate with principle title until photos are dropped in
 *
 * Motion notes (Jakub primary, Jhey secondary — creative portfolio context):
 *   - Statement text: no animation (Frequent/scannable content, Emil gate)
 *   - Strip items: spring scale on hover (Jakub polish, bounce: 0)
 *   - Image inner: parallax-lite scale for depth
 */

// ─── Strip items ─────────────────────────────────────────────────────────────
// Each maps to a design principle and a brand whose work illustrates it.
// `img` paths resolve once photos exist; until then the `color` plate shows.
const STRIP = [
  {
    num: "01",
    label: "Clarity",
    sub: "Signal over noise",
    color: "#1a2744",
    img: "/images/work/luminary/home-desktop.webp",
  },
  {
    num: "02",
    label: "Character",
    sub: "Brand-native, not trend-chasing",
    color: "#b89a7e",
    img: "/images/work/vera/home-desktop.webp",
  },
  {
    num: "03",
    label: "Performance",
    sub: "95+ Lighthouse, every build",
    color: "#111111",
    img: "/images/work/arc/home-desktop.webp",
  },
  {
    num: "04",
    label: "Longevity",
    sub: "Systems, not disposable pages",
    color: "#3b5c52",
    img: "/images/work/bloom/home-desktop.webp",
  },
  {
    num: "05",
    label: "Craft",
    sub: "Production code = design intent",
    color: "#0d1117",
    img: "/images/work/onyx/home-desktop.webp",
  },
] as const;

// ─── Single strip card ────────────────────────────────────────────────────────
function StripCard({
  num,
  label,
  sub,
  color,
  img,
}: (typeof STRIP)[number]) {
  const [err, setErr] = useState(false);

  return (
    <motion.div
      className="group relative shrink-0 cursor-default"
      style={{ width: "clamp(200px, 22vw, 320px)" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", duration: 0.45, bounce: 0 }}
    >
      {/* Number label — sits above the image like the reference */}
      <span className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-[var(--brand-text-secondary)]">
        ({num})
      </span>

      {/* Image frame */}
      <div
        className="relative overflow-hidden rounded-xl border border-[var(--brand-border)]"
        style={{ height: "clamp(220px, 26vw, 380px)" }}
      >
        {!err ? (
          <Image
            src={img}
            alt={label}
            fill
            sizes="(max-width: 768px) 60vw, 24vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setErr(true)}
          />
        ) : (
          /* Coloured plate until the photo is dropped in */
          <div
            className="absolute inset-0 flex flex-col items-start justify-end p-5"
            style={{ background: color }}
          >
            <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white/75">
              {label}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              {sub}
            </p>
          </div>
        )}

        {/* Hover overlay — label surfaces on image hover */}
        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-end p-5"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
            {label}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            {sub}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Manifesto() {
  return (
    <section className="overflow-hidden bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] md:py-32">

      {/* ── Editorial statement ──────────────────────────────────────── */}
      {/*
          Font: font-serif-i — the Greene brand's expressive serif/italic.
          Sized to feel cinematic: clamp allows it to breathe at any breakpoint.
          Center-aligned, max-width constrains the line-length to ~16 words per
          line at desktop, which sits in the readable sweet-spot for display text.
      */}
      <div className="mx-auto max-w-[900px] px-5 text-center md:px-10">
        <p className="font-serif-i text-[clamp(1.9rem,4.2vw,3.75rem)] leading-[1.18] text-[var(--brand-text)]">
          In a world where everyone is trying to do everything, we choose to
          obsess over one thing — digital work that moves{" "}
          <span className="italic">people.</span>
        </p>

        {/* Underlined link — exact adcker pattern */}
        <Link
          href="/about"
          data-cursor="READ"
          className="mt-10 inline-block border-b border-current pb-0.5 font-mono text-[13px] uppercase tracking-[0.18em] text-[var(--brand-text)] transition-opacity duration-300 hover:opacity-50"
        >
          More about us
        </Link>
      </div>

      {/* ── Numbered image strip ─────────────────────────────────────── */}
      {/*
          Runs edge-to-edge: no max-width, minimal horizontal padding.
          Horizontal scroll on small screens so all items are reachable.
          Items are slightly wider than viewport/5 so the last one bleeds
          off-screen — hinting at more content.
      */}
      <div className="mt-20 overflow-x-auto md:mt-24" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-3 px-5 pb-4 md:gap-4 md:px-10">
          {STRIP.map((item) => (
            <StripCard key={item.num} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
