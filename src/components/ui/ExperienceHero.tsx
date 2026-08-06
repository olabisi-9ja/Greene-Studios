"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useHeroAnimation } from "@/lib/hooks/useHeroAnimation";

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];
const CLIENTS = ["LUMINARY", "VERA", "ARC", "ONYX", "PRISM", "BLOOM"];

export const ExperienceHero = () => {
  const {
    sectionRef,
    headlineRef,
    kickerRef,
    descRef,
    ctasRef,
    metaRef,
    visualRef,
    clientsRef,
    marqueeRef,
  } = useHeroAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)]"
    >
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40" aria-hidden="true" />

      {/* ─── Split hero ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-16 px-5 pb-8 pt-28 md:px-10 md:pt-32 lg:grid-cols-12 lg:gap-12">
        {/* ── Left: statement ─────────────────────────────────────── */}
        <div className="lg:col-span-6 xl:col-span-7">
          <div ref={kickerRef} className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--brand-accent)]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              Digital design studio
            </span>
            <span className="text-[var(--brand-accent)]" aria-hidden="true">✦</span>
          </div>

          <h1
            ref={headlineRef}
            className="hero-headline font-display text-[clamp(2.9rem,6.8vw,6.8rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-[var(--brand-text)]"
          >
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">We build brands</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">
                people <span className="font-serif-i lowercase normal-case tracking-normal">can&apos;t ignore.</span>
              </span>
            </span>
          </h1>

          {/* hand-drawn underline doodle */}
          <svg
            className="mt-1 h-3 w-56 text-[var(--brand-accent)] md:h-4 md:w-72"
            viewBox="0 0 288 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 12 C 60 4, 140 4, 284 9"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="draw-path"
            />
          </svg>

          <p
            ref={descRef}
            className="mt-7 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg"
          >
            Greene Studios is a digital design studio. We design and build brands,
            websites, and digital products that make people stop scrolling, and start paying attention.
          </p>

          <div ref={ctasRef} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              data-cursor="HELLO"
              className="btn-primary transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a call
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/work"
              data-cursor="SEE"
              className="btn-outline transition-transform duration-300 hover:-translate-y-0.5"
            >
              See the work
            </Link>
          </div>

          <div
            ref={metaRef}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]"
          >
            <span>Working worldwide</span>
            <span className="text-[var(--brand-border)]" aria-hidden="true">/</span>
            <span className="text-[var(--brand-text)]">Booking Q3 2026</span>
            <span className="text-[var(--brand-border)]" aria-hidden="true">/</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
              </span>
              Available now
            </span>
          </div>

          {/* trusted-by strip */}
          <div ref={clientsRef} className="mt-10 border-t border-[var(--brand-border)] pt-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]">
              Trusted by ambitious teams
            </p>
            <Marquee>
              <MarqueeContent speed={28} autoFill>
                {CLIENTS.map((client, i) => (
                  <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                    <span className="font-display text-sm font-black uppercase tracking-widest text-[var(--brand-text)] opacity-60 md:text-base">
                      {client}
                    </span>
                    <span className="text-[10px] text-[var(--brand-accent)]" aria-hidden="true">✦</span>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>

        {/* ── Right: layered collage ──────────────────────────────── */}
        <div ref={visualRef} className="lg:col-span-6 xl:col-span-5">
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* main — agency team */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <Image
                src="/images/hero/team.jpg"
                alt="The Greene Studios team at work"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

              {/* bottom caption chip */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[var(--brand-bg)] px-5 py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                    The studio
                  </p>
                  <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                    People over pixels
                  </p>
                </div>
                <span className="text-xl text-[var(--brand-text)]" aria-hidden="true">✦</span>
              </div>
            </div>

            {/* browser mockup card */}
            <div className="animate-float absolute -left-6 bottom-24 w-56 rotate-[-4deg] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-[0_24px_60px_rgba(0,0,0,0.22)] md:-left-12">
              <div className="flex items-center gap-1.5 border-b border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 rounded-md bg-[var(--brand-bg)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                  luminary.co
                </span>
              </div>
              <div className="space-y-2.5 p-4">
                <div className="skeleton-bar h-3 w-3/4 rounded-md" />
                <div className="skeleton-bar h-3 w-1/2 rounded-md" />
                <div className="mt-3 flex gap-2">
                  <div className="skeleton-bar h-10 w-24 rounded-lg" />
                  <div className="skeleton-bar h-10 w-16 rounded-lg" />
                </div>
              </div>
            </div>

            {/* branding tile */}
            <div className="animate-float-slow absolute -right-4 -bottom-8 w-44 rotate-[3deg] overflow-hidden rounded-2xl border-4 border-[var(--brand-bg)] bg-[var(--brand-surface-secondary)] shadow-[0_24px_60px_rgba(0,0,0,0.22)] md:-right-8">
              <div className="relative aspect-square">
                <Image
                  src="/images/hero/branding.jpg"
                  alt="Brand identity mockup"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 bg-[var(--brand-bg)] px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[9px] font-black text-[var(--brand-on-accent)]">
                  G
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider text-[var(--brand-text)]">
                  Brand identity
                </span>
              </div>
            </div>

            {/* rotating badge */}
            <div className="absolute -top-9 right-3 md:-right-6">
              <RotatingBadge
                text="GREENE STUDIOS ✦ WEB DESIGN ✦ BRANDING ✦ MOTION ✦ "
                className="h-28 w-28 md:h-32 md:w-32"
                centerImage="/logo.png"
              />
            </div>

            {/* floating stat chip */}
            <div className="animate-float absolute -left-3 top-10 hidden items-center gap-2 rounded-full bg-[var(--brand-bg)] px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.14)] md:flex md:-left-8">
              <span className="font-display text-sm font-black text-[var(--brand-text)]">98%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                client satisfaction
              </span>
            </div>

            {/* floating stat chip */}
            <div className="animate-float-delay absolute right-2 top-1/2 hidden items-center gap-2 rounded-full bg-[var(--brand-bg)] px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.14)] md:flex md:-right-4">
              <span className="font-display text-sm font-black text-[var(--brand-text)]">40+</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                projects shipped
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom marquee strip ─────────────────────────────────── */}
      <div ref={marqueeRef} className="marquee-strip-hero relative z-10 border-t border-[var(--brand-border)] py-3">
        <Marquee>
          <MarqueeContent speed={45} autoFill>
            {CAPABILITIES.map((cap, i) => (
              <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                <span className="font-display text-lg font-black uppercase tracking-wide md:text-xl">
                  {cap}
                </span>
                <span className="text-base opacity-60" aria-hidden="true">✦</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
};
