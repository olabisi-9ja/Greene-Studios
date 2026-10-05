"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandLottie from "@/components/brand/BrandLottie";
import { useMotionOff } from "@/lib/motion-pref";

/**
 * Hero: who's behind the studio, a word that comes round, and an
 * illustration for each word (/public/lottie/hero-<word>.json, recoloured to
 * the theme). Words on the left and a large illustration on the right on wide
 * screens; stacked on phones. All four illustrations stay mounted and
 * cross-fade, so the picture never blinks empty; only the one showing plays.
 */
const WORDS = ["Brands", "Websites", "Apps", "Products"];
const HOLD = 3.6; // seconds per word

export default function Hero() {
  const [job, setJob] = useState(0);
  const still = useMotionOff();

  useEffect(() => {
    if (still) return;
    let raf = 0;
    let last = performance.now();
    let clock = job * HOLD;
    const tick = (now: number) => {
      clock += Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      setJob(Math.floor(clock / HOLD) % WORDS.length);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // the clock restarts from the current word when motion is turned back on
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);

  const word = WORDS[job];

  return (
    <section className="mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-4 px-5 pb-28 pt-20 sm:gap-6 sm:pb-32 sm:pt-24 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:pb-24">
      <div className="order-2 text-center lg:order-1 lg:text-left">
        <p className="font-mono text-sm text-[var(--brand-text-secondary)]">Greene Studios, by Olabisi Adigun</p>
        <p className="mt-3 text-lg text-[var(--brand-text-secondary)] sm:mt-5 sm:text-xl">We design and build</p>
        {/* clipped top and bottom for the roll-in only, never sideways, so the
            tight tracking can't shave the last letter */}
        <h1 className="h-[1.3em] pr-[0.08em] text-[clamp(3rem,8.4vw,7rem)] font-semibold leading-[1.3] tracking-[-0.045em] [overflow:visible_clip]">
          <span className="sr-only">We design and build brands, websites, apps and products.</span>
          <span key={word} aria-hidden="true" className={`block ${still ? "" : "fx-roll-in"}`}>
            {word}
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-[42ch] text-base leading-relaxed sm:text-lg lg:mx-0">
          Hi, I&apos;m Olabisi, a designer and full-stack engineer. I started Greene so founders get design and code from the same hands, from the
          first sketch to launch day.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-[6px] bg-[var(--brand-accent)] px-6 font-medium text-[var(--brand-on-accent)] transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
          <Link href="/studio" className="font-semibold underline-offset-4 hover:underline">
            Meet Olabisi <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* large on wide screens; on phones it shares the height with the words
          so the buttons always clear the dock */}
      <div className="order-1 mx-auto grid w-[min(100%,calc((100svh-31rem)*4/3))] min-w-[200px] text-[var(--logo)] lg:order-2 lg:w-full lg:max-w-[640px]">
        {WORDS.map((w, i) => (
          <div
            key={w}
            className={`col-start-1 row-start-1 transition-opacity duration-500 ${i === job ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          >
            <BrandLottie name={`hero-${w.toLowerCase()}`} paused={i !== job} eager className="aspect-[4/3] w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
