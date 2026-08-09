"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useHeroAnimation } from "@/lib/hooks/useHeroAnimation";

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];
const CLIENTS = ["LUMINARY", "VERA", "ARC", "ONYX", "PRISM", "BLOOM"];

/**
 * Showcase hero — full-bleed media with giant display type (02px school).
 * The studio photograph sits behind the type as an atmosphere layer and
 * melts into the page background; the bottom edge carries the client
 * marquee and a "scroll to explore" cue.
 */
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
      {/* ─── Full-bleed media layer ─────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/team.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media-img object-cover"
        />
        {/* melt into the page background in both directions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/45 to-[var(--brand-bg)]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-bg)]/75 via-[var(--brand-bg)]/25 to-transparent" />
      </div>

      {/* subtle grid, kept very faint */}
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-25" aria-hidden="true" />

      {/* ─── Statement ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-10 pt-32 md:px-10 md:pt-36">
        <div ref={kickerRef} className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-[var(--brand-accent)]" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            Digital design studio — independent &amp; worldwide
          </span>
          <span className="text-[var(--brand-accent)]" aria-hidden="true">✦</span>
        </div>

        <h1
          ref={headlineRef}
          className="hero-headline font-display text-[clamp(3.4rem,10.5vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.02em] text-[var(--brand-text)]"
        >
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">We make</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">digital</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">
              feel <span className="font-serif-i lowercase normal-case tracking-normal">alive.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              ref={descRef}
              className="max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg"
            >
              Greene Studios is an independent digital design studio building
              brands, websites, and digital products for ambitious teams —
              identities people remember, interfaces people love.
            </p>

            <div ref={ctasRef} className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>

          <div
            ref={metaRef}
            className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]"
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
        </div>
      </div>

      {/* ─── Bottom edge: clients + scroll cue ─────────────────────── */}
      <div
        ref={marqueeRef}
        className="relative z-10 border-t border-[var(--brand-border)]/60 bg-[var(--brand-bg)]/40 backdrop-blur-sm"
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-8 px-5 py-4 md:px-10 md:py-5">
          <div ref={clientsRef} className="min-w-0 flex-1">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]">
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

          {/* Scroll cue */}
          <div ref={visualRef} className="hidden shrink-0 items-center gap-4 md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]">
              Scroll to explore
            </span>
            <span className="relative block h-10 w-px overflow-hidden bg-[var(--brand-border)]" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-[var(--brand-accent)]" />
            </span>
          </div>
        </div>
      </div>

      {/* Capability ticker — 02px-style footer strip of the hero */}
      <div className="relative z-10 border-t border-[var(--brand-border)]/40 py-2.5">
        <Marquee>
          <MarqueeContent speed={45} autoFill>
            {CAPABILITIES.map((cap, i) => (
              <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                <span className="font-display text-sm font-black uppercase tracking-wide text-[var(--brand-text-secondary)] md:text-base">
                  {cap}
                </span>
                <span className="text-xs opacity-50" aria-hidden="true">✦</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
};
