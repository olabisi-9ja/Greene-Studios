"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/data";
import RotatingBadge from "@/components/ui/RotatingBadge";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--brand-text)] pb-6 pt-20 text-[var(--brand-bg)] md:pt-28">
      {/* soft glow */}
      <div
        className="pointer-events-none absolute -left-[15vw] top-[10vh] h-[40vh] w-[40vw] rounded-full opacity-30 blur-[120px] glow-lime"
        aria-hidden="true"
      />

      {/* Top */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-bg)]/60">
          <span className="text-[var(--brand-accent)]">✦</span> Next step
        </span>

        <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-black uppercase leading-[0.9] tracking-tight">
          Let&apos;s start
          <br />
          from <span className="font-serif-i lowercase normal-case tracking-normal">Greene.</span>
        </h2>

        <div className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${BRAND.email}`}
            data-cursor="MAIL"
            className="group font-display text-2xl font-black tracking-tight underline decoration-[var(--brand-accent)] decoration-4 underline-offset-8 transition-colors hover:text-[var(--brand-accent)] md:text-4xl"
          >
            {BRAND.email}
            <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              data-cursor="HELLO"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--brand-bg)] px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]"
            >
              Book a call <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-3 rounded-full border-[1.5px] border-[var(--brand-bg)]/40 px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors duration-300 hover:border-[var(--brand-bg)] hover:bg-[var(--brand-bg)] hover:text-[var(--brand-text)]"
            >
              Drop us an email
            </a>
          </div>
        </div>

        {/* Middle columns */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-[var(--brand-bg)]/20 pt-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-xs font-black text-[var(--brand-ink)]">
                G
              </span>
              <span className="font-display text-sm font-black uppercase tracking-tight">Greene®</span>
            </div>
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-[var(--brand-bg)]/60">
              Independent digital design studio. {BRAND.location}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-bg)]/50">Menu</span>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-bg)]/50">Socials</span>
            <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">LinkedIn</a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">Instagram</a>
            <a href={BRAND.twitter} target="_blank" rel="noreferrer" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">X / Twitter</a>
            <a href={BRAND.github} target="_blank" rel="noreferrer" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">GitHub</a>
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-bg)]/50">Since</span>
            <RotatingBadge
              text="GREENE STUDIOS ✦ EST. 2022 ✦ LAGOS ✦ "
              className="h-28 w-28 text-[var(--brand-bg)]"
              centerText="✦"
            />
          </div>
        </div>
      </div>

      {/* Giant word */}
      <div className="relative z-10 mb-4 mt-16 select-none overflow-hidden text-center md:mt-24">
        <h1
          aria-hidden="true"
          className="font-display inline-block whitespace-nowrap font-black uppercase leading-none tracking-tight text-[var(--brand-bg)]"
          style={{ fontSize: "clamp(6rem, 23vw, 36rem)" }}
        >
          {"GREENE".split("").map((letter, i) => (
            <motion.span
              key={i}
              whileHover={{
                scale: 1.08,
                color: "var(--brand-accent)",
                y: -12,
                rotate: i % 2 === 0 ? 4 : -4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 text-xs font-medium text-[var(--brand-bg)]/60 md:flex-row md:items-center md:justify-between md:px-10">
        <span>©{currentYear} — Greene Studios. All rights reserved.</span>
        <span>Design &amp; build by Greene Studios</span>
        <span className="flex items-center gap-3">
          Lagos, Nigeria <span className="rounded bg-[var(--brand-bg)] px-1.5 py-0.5 text-[10px] font-black text-[var(--brand-text)]">EN</span>
        </span>
      </div>
    </footer>
  );
}
