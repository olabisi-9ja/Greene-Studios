"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HighlightWords from "@/components/effects/HighlightWords";

const STRIP = [
  {
    label: "Clarity",
    sub: "Signal over noise",
    color: "#1a2744",
    img: "/images/work/luminary/home-desktop.webp",
  },
  {
    label: "Character",
    sub: "Brand-native, not trend-chasing",
    color: "#b89a7e",
    img: "/images/work/vera/home-desktop.webp",
  },
  {
    label: "Performance",
    sub: "95+ Lighthouse, every build",
    color: "#111111",
    img: "/images/work/arc/home-desktop.webp",
  },
  {
    label: "Longevity",
    sub: "Systems, not disposable pages",
    color: "#3b5c52",
    img: "/images/work/bloom/home-desktop.webp",
  },
  {
    label: "Craft",
    sub: "Production code equals design intent",
    color: "#0d1117",
    img: "/images/work/onyx/home-desktop.webp",
  },
] as const;

function StripCard({
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
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--brand-border)]"
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

export default function Manifesto() {
  return (
    <section className="overflow-hidden bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] md:py-32">
      <div className="mx-auto max-w-[900px] px-5 text-center md:px-10">
        <HighlightWords
          text="In a world where everyone is trying to do everything, we choose to obsess over one thing, digital work that moves people."
          className="font-display text-[clamp(1.9rem,4.2vw,3.75rem)] font-medium leading-[1.18] tracking-tight text-[var(--brand-text)]"
        />

        <Link
          href="/studio"
          data-cursor="READ"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-7 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
        >
          More about us
        </Link>
      </div>

      <div className="mt-20 overflow-x-auto md:mt-24" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-3 px-5 pb-4 md:gap-4 md:px-10">
          {STRIP.map((item) => (
            <StripCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
