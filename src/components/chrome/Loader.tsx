"use client";

import { useEffect, useRef, useState } from "react";
import Runner from "@/components/brand/Runner";
import { preloadLottie } from "@/components/brand/BrandLottie";

/** On the home page the loader holds until the hero's animations are in. */
const HERO_LOTTIES = ["hero-brands", "hero-websites", "hero-apps", "hero-products"];

const SEEN = "greene:loaded";

/**
 * Window-load screen: the runner, running, and a counter. No wordmark.
 * It waits for the page to load and, on the home page, for the hero's
 * four animations, so the hero is complete the moment it shows.
 *
 * When the page has loaded the counter reaches 100, then the runner flies
 * up and shrinks into its place in the top bar (measured, so it lands
 * exactly), while the screen behind fades. The top bar's own logo and
 * wordmark stay hidden until the hand-off, so there is never two of
 * anything. Plays once per browser session.
 */
export default function Loader() {
  const [phase, setPhase] = useState<"show" | "fly" | "gone">("show");
  const count = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {
      /* storage blocked: just play it */
    }
    const root = document.documentElement;
    if (seen) {
      root.classList.remove("is-loading");
      root.classList.add("loader-done");
      setPhase("gone");
      return;
    }
    root.classList.add("is-loading");

    const started = performance.now();
    let pageLoaded = document.readyState === "complete";
    let heroReady = window.location.pathname !== "/";
    if (!heroReady) {
      Promise.allSettled(HERO_LOTTIES.map(preloadLottie)).then(() => (heroReady = true));
    }
    let shown = 0;
    let raf = 0;
    const onLoad = () => (pageLoaded = true);
    window.addEventListener("load", onLoad, { once: true });
    // never hold anyone longer than this, whatever is still on its way
    const failsafe = setTimeout(() => {
      pageLoaded = true;
      heroReady = true;
    }, 8000);

    const step = (now: number) => {
      const t = (now - started) / 1000;
      // creep towards 90 while assets arrive, then run home once loaded (and at least 1.2s in)
      const target = pageLoaded && heroReady && t > 1.2 ? 100 : 90 * (1 - Math.exp(-t * 1.4));
      shown += (target - shown) * 0.12;
      if (target === 100 && 100 - shown < 0.6) shown = 100;
      if (count.current) count.current.textContent = `${Math.floor(shown)}`.padStart(2, "0");
      if (shown >= 100) {
        fly();
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const toSlot = (el: HTMLElement | null, slot: string) => {
      const target = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
      if (!el || !target) return;
      const a = el.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const s = b.height / a.height;
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    };

    let t1: ReturnType<typeof setTimeout>;
    const fly = () => {
      setPhase("fly");
      requestAnimationFrame(() => {
        toSlot(mark.current, "logo");
      });
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {
        /* ignore */
      }
      t1 = setTimeout(() => {
        root.classList.remove("is-loading");
        root.classList.add("loader-done");
        setPhase("gone");
      }, 950);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      clearTimeout(t1);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "gone") return null;
  const flying = phase === "fly";
  const move = "transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] origin-center will-change-transform";

  return (
    <div role="status" data-loader aria-label="Loading Greene Studios" className="fixed inset-0 z-[200]">
      <div
        className={`absolute inset-0 bg-[var(--brand-bg)] transition-opacity duration-500 ${flying ? "opacity-0 delay-500" : ""}`}
      />
      <div className="relative grid h-full place-items-center">
        <div className="flex flex-col items-center">
          <div ref={mark} className={`text-[var(--logo)] ${move}`}>
            <Runner mode="loop" className="h-[clamp(5rem,14vw,8.5rem)] w-auto" title="" />
          </div>
          <span
            className={`mt-6 font-mono text-sm tabular-nums text-[var(--brand-text-secondary)] transition-opacity duration-300 ${flying ? "opacity-0" : ""}`}
          >
            <span ref={count}>00</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
