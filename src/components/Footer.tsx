"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/data";
import RotatingBadge from "@/components/ui/RotatingBadge";

/**
 * Footer — the studio's giant wordmark, layered with the minimal
 * invitation + link columns. One footer, three signatures:
 *   1. The invitation (adcker school): kicker, headline, email, CTAs
 *   2. Quiet columns + the rotating stamp
 *   3. The giant interactive GREENE® wordmark
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--brand-text)] pb-6 pt-20 text-[var(--brand-bg)] md:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
        {/* ─── The invitation ─────────────────────────────────────── */}
        <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-bg)]/60">
          <span className="text-[var(--brand-accent)]">✦</span> Next step
        </span>

        <h2 className="max-w-5xl font-display text-[clamp(2.8rem,7.5vw,7rem)] font-black uppercase leading-[0.92] tracking-tight">
          Let&apos;s create something{" "}
          <span className="font-serif-i lowercase normal-case tracking-normal">unforgettable.</span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--brand-bg)]/60 md:text-lg">
          Tell us what you&apos;re trying to build. We&apos;ll take it from there.
        </p>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
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

        {/* ─── Columns ────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-[var(--brand-bg)]/20 pt-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="relative block h-9 w-9 overflow-hidden rounded-full bg-[var(--brand-bg)]">
                <Image
                  src="/logo.png"
                  alt="Greene Studios logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </span>
              <span className="font-display text-sm font-black uppercase tracking-tight">Greene®</span>
            </div>
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-[var(--brand-bg)]/60">
              Independent digital design studio, working with ambitious brands worldwide.
            </p>
            <span className="mt-5 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-bg)]/50">
              Available for select projects
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-bg)]/50">Menu</span>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} data-cursor="GO" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">
                {item.label}
              </Link>
            ))}
            <Link href="/industries" data-cursor="GO" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">
              Industries
            </Link>
            <Link href="/contact" data-cursor="GO" className="w-fit text-sm font-semibold transition-colors hover:text-[var(--brand-accent)]">
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
              text="GREENE STUDIOS ✦ EST. 2022 ✦ WORLDWIDE ✦ "
              className="h-28 w-28 text-[var(--brand-bg)]"
              centerText="✦"
            />
          </div>
        </div>
      </div>

      {/* ─── Giant wordmark — the studio name, very big ───────────── */}
      <div className="relative z-10 mb-4 mt-16 select-none overflow-hidden text-center md:mt-24">
        <h1
          aria-hidden="true"
          className="font-display whitespace-nowrap font-black uppercase leading-[0.85] tracking-tight text-[var(--brand-bg)]"
          style={{ fontSize: "clamp(4.5rem, 16vw, 24rem)" }}
        >
          {"GREENE".split("").map((letter, i) => (
            <motion.span
              key={`g-${i}`}
              whileHover={{
                scale: 1.08,
                color: "var(--brand-accent)",
                y: -14,
                rotate: i % 2 === 0 ? 4 : -4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {"STUDIOS®".split("").map((letter, i) => (
            <motion.span
              key={`s-${i}`}
              whileHover={{
                scale: 1.08,
                color: "var(--brand-accent)",
                y: -14,
                rotate: i % 2 === 0 ? -4 : 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 text-xs font-medium text-[var(--brand-bg)]/60 md:flex-row md:items-center md:justify-between md:px-10">
        <span>©{currentYear} Greene Studios. All rights reserved.</span>
        <span>Design &amp; build by Greene Studios</span>
      </div>
    </footer>
  );
}
