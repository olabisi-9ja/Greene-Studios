"use client";

import React from "react";
import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useHeroAnimation } from "@/lib/hooks/useHeroAnimation";

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];

export const ExperienceHero = () => {
  const { sectionRef, wordRef, lineRef, ctasRef, badgesRef, marqueeRef } = useHeroAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)] pb-0 pt-6"
    >
      {/* ─── Atmosphere: subtle grid only ───────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40" aria-hidden="true" />

      {/* ─── Giant word ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-16 text-center">
        <h1
          ref={wordRef}
          aria-label="Greene"
          className="font-display select-none font-black uppercase leading-[0.88] tracking-[-0.045em] text-[var(--brand-text)]"
        >
          <span className="block whitespace-nowrap text-[clamp(4.6rem,22vw,36rem)]">
            {"GREENE".split("").map((ch, i) => (
              <span key={i} className="hero-char">
                <span className="hero-char-inner">{ch}</span>
              </span>
            ))}
          </span>
        </h1>

        <div ref={lineRef} className="mt-8 flex items-center justify-center gap-4 md:mt-10 md:gap-8">
          <span className="h-px w-10 bg-[var(--brand-border)] md:w-28" />
          <p className="font-serif-i text-[clamp(1.35rem,2.8vw,2.5rem)] text-[var(--brand-text)]">
            not a style, a perspective.
          </p>
          <span className="h-px w-10 bg-[var(--brand-border)] md:w-28" />
        </div>
      </div>

      {/* ─── Rotating sticker ──────────────────────────────────────── */}
      <div ref={badgesRef} className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <RotatingBadge
          text="GREENE STUDIOS ✦ WEB DESIGN ✦ BRANDING ✦ MOTION ✦ "
          className="h-32 w-32"
          centerImage="/logo.png"
        />
      </div>

      {/* ─── Bottom row ────────────────────────────────────────────── */}
      <div ref={ctasRef} className="relative z-10 flex flex-col items-start justify-between gap-6 px-5 pb-8 md:flex-row md:items-end md:px-10">
        <p className="max-w-sm text-sm font-medium leading-relaxed text-[var(--brand-text-secondary)] md:text-base">
          We design &amp; build brands, websites and digital products that make people stop scrolling, and start paying attention.
        </p>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Magnetic>
            <Link href="/contact" data-cursor="HELLO" className="btn-primary">
              Book a call
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/work" data-cursor="SEE" className="btn-outline">
              See the work
            </Link>
          </Magnetic>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="https://linkedin.com/company/greenestudios" target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
            LinkedIn
          </a>
          <span className="text-[var(--brand-border)]">/</span>
          <a href="https://instagram.com/greenestudios" target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
            Instagram
          </a>
          <span className="text-[var(--brand-border)]">/</span>
          <span className="rounded bg-[var(--brand-text)] px-2 py-1 text-[10px] font-black leading-none text-[var(--brand-bg)]">
            EN
          </span>
        </div>
      </div>

      {/* ─── Marquee strip ─────────────────────────────────────────── */}
      <div ref={marqueeRef} className="relative z-10 border-t border-[var(--brand-border)] bg-[var(--brand-accent)] py-3">
        <Marquee>
          <MarqueeContent speed={45} autoFill>
            {CAPABILITIES.map((cap, i) => (
              <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                <span className="font-display text-lg font-black uppercase tracking-wide text-[var(--brand-ink)] md:text-xl">
                  {cap}
                </span>
                <span className="text-base text-[var(--brand-ink)]/60" aria-hidden="true">✦</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
};
