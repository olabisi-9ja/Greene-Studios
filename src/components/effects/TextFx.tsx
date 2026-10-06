"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text effects from the GS Labs gallery, ported for the site.
 * All of them keep the real text readable to screen readers (aria-label on
 * the wrapper, the animated glyphs hidden) and sit still under
 * prefers-reduced-motion.
 */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInViewOnce<T extends Element>(margin = "-10% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, seen };
}

/** Animated counter: counts up to the number once, when it scrolls into view. */
export function CountUp({ to, className = "", duration = 1400 }: { to: number; className?: string; duration?: number }) {
  const { ref, seen } = useInViewOnce<HTMLSpanElement>("0px");
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    // screen readers get the final number; the count-up is for the eyes only
    // (aria-label isn't allowed on a plain span)
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{to}</span>
      <span aria-hidden="true">{n}</span>
    </span>
  );
}
