"use client";

import { useEffect, useState } from "react";
import BrandLottie from "@/components/brand/BrandLottie";

/**
 * Hero, after Hello Monday: a clean page, an illustration, and a word that
 * comes round. Each word has its own animation: /public/lottie/hero-<word>.json
 * (recoloured to the brand).
 */
const WORDS = ["Brands", "Websites", "Apps", "Products"];
const HOLD = 3.6; // seconds per word

export default function Hero() {
  const [job, setJob] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    const tick = (now: number) => {
      clock += Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      setJob(Math.floor(clock / HOLD) % WORDS.length);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = WORDS[job];

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-28 text-center sm:px-8">
      <div className="w-[min(560px,92vw)] text-[var(--logo)]">
        <BrandLottie key={word} name={`hero-${word.toLowerCase()}`} className="mx-auto aspect-[4/3] w-full" />
      </div>

      <p className="mt-10 text-base text-[var(--brand-text-secondary)] sm:text-lg">We design and build</p>
      <h1 className="mt-2 h-[1.1em] overflow-hidden text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
        <span className="sr-only">Brands, websites, apps and products.</span>
        <span key={word} aria-hidden="true" className="fx-roll-in block">
          {word}
        </span>
      </h1>
      <span aria-hidden="true" className="mt-10 size-1.5 animate-bounce rounded-full bg-[var(--brand-text)]" />
    </section>
  );
}
