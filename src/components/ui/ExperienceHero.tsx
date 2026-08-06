"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/animations/Magnetic";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useHeroAnimation } from "@/lib/hooks/useHeroAnimation";

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];

export const ExperienceHero = () => {
  const {
    sectionRef,
    headlineRef,
    kickerRef,
    descRef,
    ctasRef,
    metaRef,
    visualRef,
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
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-16 px-5 pb-10 pt-32 md:px-10 md:pt-36 lg:grid-cols-12 lg:gap-12">
        {/* Left — statement */}
        <div className="lg:col-span-7">
          <div ref={kickerRef} className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--brand-accent)]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              Digital design studio · Lagos
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="hero-headline font-display text-[clamp(3rem,7.2vw,7.2rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-[var(--brand-text)]"
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

          <p
            ref={descRef}
            className="mt-8 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg"
          >
            Greene Studios is a digital design studio in Lagos. We design and build brands,
            websites, and digital products that make people stop scrolling, and start paying attention.
          </p>

          <div ref={ctasRef} className="mt-10 flex flex-wrap items-center gap-4">
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

          <div
            ref={metaRef}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]"
          >
            <span>Lagos, Nigeria</span>
            <span className="text-[var(--brand-border)]" aria-hidden="true">/</span>
            <span>Working worldwide</span>
            <span className="text-[var(--brand-border)]" aria-hidden="true">/</span>
            <span className="text-[var(--brand-text)]">Booking Q3 2026</span>
          </div>
        </div>

        {/* Right — layered visual */}
        <div ref={visualRef} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:max-w-none">
            {/* main image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
              <Image
                src="https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=960"
                alt="Selected work — Luminary"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* featured chip */}
              <Link
                href="/work/luminary-saas"
                data-cursor="VIEW"
                className="group absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl bg-[var(--brand-bg)]/95 px-5 py-4 backdrop-blur transition-transform duration-300 hover:scale-[1.02]"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                    Featured work
                  </p>
                  <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                    Luminary · 2024
                  </p>
                </div>
                <span
                  className="text-xl text-[var(--brand-text)] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>

            {/* rotating badge */}
            <div className="absolute -top-9 right-2 md:-right-9">
              <RotatingBadge
                text="GREENE STUDIOS ✦ WEB DESIGN ✦ BRANDING ✦ MOTION ✦ "
                className="h-28 w-28 md:h-36 md:w-36"
                centerImage="/logo.png"
              />
            </div>

            {/* overlapping tile */}
            <div className="absolute -bottom-10 -left-4 hidden w-40 overflow-hidden rounded-2xl border-4 border-[var(--brand-bg)] bg-[var(--brand-surface-secondary)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:block lg:-left-8">
              <div className="relative aspect-square">
                <Image
                  src="https://images.pexels.com/photos/6892716/pexels-photo-6892716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400"
                  alt="Selected work — Vera"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Marquee strip ─────────────────────────────────────────── */}
      <div ref={marqueeRef} className="marquee-strip-hero relative z-10 border-t border-[var(--brand-border)] bg-[var(--brand-accent)] py-3">
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
