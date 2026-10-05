"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";

/**
 * Image parallax in a clipped frame: the picture is a little taller than
 * its frame and drifts slower than the page as the frame crosses the
 * viewport. Driven straight from scroll on the compositor (no React state).
 */
export default function Parallax({
  src,
  alt,
  className = "",
  imgClassName = "",
  strength = 0.14,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Share of the frame height the image travels. */
  strength?: number;
  priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const f = frame.current;
      if (!f || !img.current) return;
      const r = f.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
      img.current.style.transform = `translate3d(0, ${(p * strength * 50).toFixed(2)}%, 0) scale(${1 + strength})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [strength]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover will-change-transform ${imgClassName}`}
        style={{ transform: `scale(${1 + strength})` }}
      />
    </div>
  );
}
