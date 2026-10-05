"use client";

import { useEffect, useState } from "react";
import BrandLottie from "@/components/brand/BrandLottie";
import { useMotionOff } from "@/lib/motion-pref";
import { HERO_WORDS as WORDS } from "@/lib/hero-words";

/**
 * Hero, after Hello Monday: a clean page, an illustration, and a word that
 * comes round with a line of its own (lib/hero-words). Each word has its own
 * animation, recoloured to the theme. Each picture mounts one word before its
 * turn and then stays, so they cross-fade without ever blinking empty and the
 * later ones don't weigh on the first load; only the one showing plays.
 */
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

  // how far round the words have come: everything up to the next word is mounted
  const [reach, setReach] = useState(1);
  useEffect(() => setReach((r) => Math.max(r, Math.min(job + 1, WORDS.length - 1))), [job]);

  const { word, line } = WORDS[job];

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-24 text-center sm:px-8">
      <div className="grid w-[min(560px,92vw,calc((100svh-24rem)*4/3))] min-w-[220px] text-[var(--logo)]">
        {WORDS.map((w, i) => (i > reach && i !== job ? null : (
          <div
            key={w.slug}
            className={`col-start-1 row-start-1 transition-opacity duration-500 ${i === job ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          >
            <BrandLottie name={`hero-${w.slug}`} paused={i !== job} eager className="aspect-[4/3] w-full" />
          </div>
        )))}
      </div>

      <p className="mt-8 text-base text-[var(--brand-text-secondary)] sm:text-lg">We design and build</p>
      {/* clipped top and bottom for the roll-in only, never sideways, so the
          tight tracking can't shave the last letter */}
      <h1 className="mt-1 h-[1.3em] pr-[0.08em] whitespace-nowrap text-[clamp(2.4rem,9vw,6.5rem)] font-semibold leading-[1.3] tracking-[-0.045em] [overflow:visible_clip]">
        <span className="sr-only">We design and build {WORDS.map((w) => w.word.toLowerCase()).join(", ")}.</span>
        <span key={word} aria-hidden="true" className={`block ${still ? "" : "fx-roll-in"}`}>
          {word}
        </span>
      </h1>
      <p key={line} aria-hidden="true" className={`mt-2 min-h-[3.2em] max-w-[34ch] text-lg leading-snug sm:text-xl ${still ? "" : "fx-fade-up"}`}>
        {line}
      </p>
    </section>
  );
}
