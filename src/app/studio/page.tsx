"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExperienceHero } from "@/components/ui/ExperienceHero";

export default function StudioDemoPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--brand-bg)] pb-32 font-sans text-[var(--brand-text)]">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-12">
        <div className="font-display text-xl font-black uppercase tracking-tight">Greene<span>®</span></div>
        <button className="rounded-full bg-[var(--color-abstract-green)] px-8 py-3 font-medium text-[var(--brand-ink)] shadow-lg transition-transform hover:scale-105">
          Menu
        </button>
      </nav>

      {/* Hero Section */}
      <ExperienceHero />

      {/* CTA Section */}
      <section className="mb-8 px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-abstract-lemon)] p-12 text-[var(--brand-ink)] md:p-24">
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="mb-6 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--color-abstract-lemon)]">
              ✦ Studio energy
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-tight md:text-6xl">
              Where function meets <span className="font-serif-i lowercase normal-case tracking-normal">fun.</span>
            </h2>
            <p className="mt-6 text-lg font-medium md:text-xl">
              Join the rush and experience a cleaner, brighter energy.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-[var(--brand-ink)] px-8 py-4 font-bold uppercase tracking-wider text-[var(--color-abstract-lemon)] transition-transform hover:scale-105">
                Shop Now
              </button>
              <button className="rounded-full border-2 border-[var(--brand-ink)] px-8 py-4 font-bold uppercase tracking-wider transition-colors hover:bg-[var(--brand-ink)] hover:text-[var(--color-abstract-lemon)]">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="mb-24 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--color-abstract-green)] p-8 text-[var(--brand-ink)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-ink)]/15 text-2xl">🌿</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Clean & Functional</h3>
          </div>

          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--color-abstract-yellow)] p-8 text-[var(--brand-ink)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-ink)]/10 text-2xl">☀️</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Feel Good Energy</h3>
          </div>

          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--color-abstract-lemon)] p-8 text-[var(--brand-ink)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-ink)]/10 text-2xl">✨</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Enhance Joy</h3>
          </div>

          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--color-abstract-teal)] p-8 text-[var(--brand-ink)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-ink)]/15 text-2xl">🌊</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Fresh & Fluid</h3>
          </div>

          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--color-abstract-blue)] p-8 text-[var(--brand-ink)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-ink)]/15 text-2xl">💧</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Calm & Clear</h3>
          </div>

          <div className="group relative flex aspect-square flex-col justify-between rounded-[2rem] bg-[var(--brand-ink)] p-8 text-[var(--color-abstract-lemon)] shadow-md transition-transform duration-500 hover:-translate-y-2">
            <div className="self-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-abstract-lemon)]/15 text-2xl">🎈</div>
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Dream Big</h3>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12">
        <div className="flex flex-col justify-between rounded-[2rem] border-2 border-[var(--brand-border)] bg-[var(--brand-surface)] p-10 text-[var(--brand-text)] md:p-14">
          <div>
            <div className="mb-6 h-12 font-serif text-8xl leading-none text-[var(--color-abstract-green)]">
              &quot;
            </div>
            <p className="mb-12 text-lg font-medium leading-relaxed md:text-xl">
              &quot;We fell in love with this design, which definitely matches the vibes and energy that we want in our space. Your work is the first real step in this crazy adventure.&quot;
            </p>
          </div>
          <div>
            <div className="mb-1 font-bold uppercase tracking-widest">KARIM & AURELIE</div>
            <div className="text-xs font-medium uppercase tracking-widest text-[var(--brand-text-secondary)]">Verified Buyer</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[2rem] bg-[var(--brand-ink)] p-10 text-[var(--color-abstract-lemon)] md:p-14">
          <div>
            <div className="mb-6 h-12 font-serif text-8xl leading-none text-[var(--color-abstract-yellow)]">
              &quot;
            </div>
            <p className="mb-12 text-lg font-medium leading-relaxed md:text-xl">
              &quot;Absolutely incredible flavor and the perfect amount of buzz. It has completely replaced my evening routine and I feel so much better the next day.&quot;
            </p>
          </div>
          <div>
            <div className="mb-1 font-bold uppercase tracking-widest text-[var(--brand-text)]">JORIS VAN HOECKE</div>
            <div className="text-xs font-medium uppercase tracking-widest text-[var(--brand-text-secondary)]">Verified Buyer</div>
          </div>
        </div>
      </section>

    </div>
  );
}
