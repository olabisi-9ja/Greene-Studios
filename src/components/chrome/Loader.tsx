"use client";

import { useEffect, useRef, useState } from "react";
import Runner from "@/components/brand/Runner";

const SEEN = "greene:loaded";

/**
 * Window-load screen: the wordmark, the runner running between the lines,
 * "Studios" at a third of the size, and a counter.
 *
 * When the page has loaded the counter reaches 100, then the wordmark and
 * the runner fly up and shrink into their places in the top bar (measured,
 * so they land exactly), while the screen behind them fades. The top bar's
 * own wordmark and logo stay hidden until the hand-off, so there is never
 * two of anything. Plays once per browser session.
 */
export default function Loader() {
  const [phase, setPhase] = useState<"show" | "fly" | "gone">("show");
  const count = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
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
    let loaded = document.readyState === "complete";
    let shown = 0;
    let raf = 0;
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad, { once: true });
    const failsafe = setTimeout(() => (loaded = true), 6000);

    const step = (now: number) => {
      const t = (now - started) / 1000;
      // creep towards 90 while assets arrive, then run home once loaded (and at least 1.2s in)
      const target = loaded && t > 1.2 ? 100 : 90 * (1 - Math.exp(-t * 1.4));
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
        toSlot(word.current, "wordmark");
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
          <span ref={word} className={`wordmark text-[clamp(3.5rem,11vw,7.5rem)] leading-none ${move}`}>
            Greene
          </span>
          <div ref={mark} className={`my-4 text-[var(--logo)] ${move}`}>
            <Runner mode="loop" className="h-[clamp(5rem,14vw,8.5rem)] w-auto" title="" />
          </div>
          <span
            className={`wordmark text-[clamp(1.17rem,3.67vw,2.5rem)] tracking-[0.02em] transition-opacity duration-300 ${flying ? "opacity-0" : ""}`}
          >
            Studios
          </span>
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
