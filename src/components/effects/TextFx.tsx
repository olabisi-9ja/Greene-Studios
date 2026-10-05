"use client";

import { useEffect, useRef, useState } from "react";
import { useElementScroll } from "@/lib/hooks/useElementScroll";

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

/** Letter shuffle: characters decode from noise into the label when it comes into view. */
export function ScrambleText({ text, className = "", speed = 28 }: { text: string; className?: string; speed?: number }) {
  const { ref, seen } = useInViewOnce<HTMLSpanElement>();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!seen || reduced()) return;
    const glyphs = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&";
    let frame = 0;
    const total = text.length + 8;
    const id = setInterval(() => {
      frame++;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < frame - 8 ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(""),
      );
      if (frame >= total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [seen, text, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Rotating text: one word at a time, letters rolling in on a stagger. */
export function RotatingWords({ words, className = "", every = 2200 }: { words: string[]; className?: string; every?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), every);
    return () => clearInterval(id);
  }, [words.length, every]);
  const w = words[i];
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`} aria-label={words.join(", ")}>
      <span key={w} aria-hidden="true" className="inline-flex">
        {w.split("").map((c, k) => (
          <span
            key={k}
            className="fx-roll-in inline-block"
            style={{ animationDelay: `${k * 28}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Shimmer: a light band sweeps across the letters. */
export function ShimmerText({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`fx-shimmer ${className}`}>{children}</span>;
}

/** Gradient flow: the brand colours drift through the letters. */
export function GradientText({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`fx-gradient ${className}`}>{children}</span>;
}

/** Wavy text: letters bob in a slow continuous wave. */
export function WaveText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden="true" className="fx-wave inline-block" style={{ animationDelay: `${i * 70}ms` }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

/** Typing: types the line once when it comes into view, caret blinking after. */
export function TypingText({ text, className = "", speed = 42 }: { text: string; className?: string; speed?: number }) {
  const { ref, seen } = useInViewOnce<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) {
      setN(text.length);
      return;
    }
    const id = setInterval(() => setN((k) => (k >= text.length ? (clearInterval(id), k) : k + 1)), speed);
    return () => clearInterval(id);
  }, [seen, text, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span aria-hidden="true" className="fx-caret">
        |
      </span>
    </span>
  );
}

/**
 * Move text on scroll: rows of words that slide in opposite directions as
 * the block scrolls through the viewport. Driven by scroll, so it never
 * runs on its own and never scrolls sideways.
 */
export function ScrollRows({ rows, className = "", distance = 260 }: { rows: string[]; className?: string; distance?: number }) {
  const { ref, progress } = useElementScroll<HTMLDivElement>();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-label={rows.join(". ")}>
      {rows.map((r, i) => {
        const dir = i % 2 ? 1 : -1;
        const x = (progress - 0.5) * distance * dir;
        return (
          <div
            key={r}
            aria-hidden="true"
            className="whitespace-nowrap will-change-transform"
            style={{ transform: `translate3d(${x.toFixed(1)}px,0,0)` }}
          >
            {Array.from({ length: 4 }, () => r).join("  ·  ")}
          </div>
        );
      })}
    </div>
  );
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
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={String(to)}>
      <span aria-hidden="true">{n}</span>
    </span>
  );
}
