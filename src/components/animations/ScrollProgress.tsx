"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress — always visible, follows reader.
 * Top horizontal bar for vertical scroll + left vertical rail for reading position.
 * Also listens to horizontal scroll containers (data-h-scroll) and drives a bottom bar if present.
 */
export default function ScrollProgress() {
  const hBarRef = useRef<HTMLDivElement>(null);
  const vBarRef = useRef<HTMLDivElement>(null);
  const hBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      if (hBarRef.current) hBarRef.current.style.transform = `scaleX(${clamped})`;
      if (vBarRef.current) vBarRef.current.style.transform = `scaleY(${clamped})`;

      // Horizontal: find the nearest scrollable rail in viewport and use its scroll
      const rails = document.querySelectorAll<HTMLElement>("[data-h-scroll]");
      let hProgress = 0;
      for (const el of rails) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const maxH = el.scrollWidth - el.clientWidth;
          if (maxH > 0) hProgress = el.scrollLeft / maxH;
          break;
        }
      }
      if (hBottomRef.current) hBottomRef.current.style.transform = `scaleX(${hProgress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const hInterval = window.setInterval(update, 80);
    const rails = document.querySelectorAll<HTMLElement>("[data-h-scroll]");
    rails.forEach((el) => el.addEventListener("scroll", onScroll, { passive: true }));

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearInterval(hInterval);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      rails.forEach((el) => el.removeEventListener("scroll", onScroll));
    };
  }, []);

  return (
    <>
      {/* Top horizontal — always visible track + moving fill */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] bg-[var(--brand-border)]/40">
        <div
          ref={hBarRef}
          aria-hidden="true"
          className="h-full w-full origin-left bg-[var(--brand-accent)] will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {/* Left vertical rail — subtle, follows vertical scroll */}
      <div className="pointer-events-none fixed bottom-0 left-0 top-0 z-[90] hidden w-[2px] bg-[var(--brand-border)]/30 md:block">
        <div
          ref={vBarRef}
          aria-hidden="true"
          className="h-full w-full origin-top bg-[var(--brand-accent)] will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      {/* Bottom horizontal for h-scroll sections — appears when a rail is in view */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[90] hidden h-[2px] bg-transparent md:block">
        <div
          ref={hBottomRef}
          aria-hidden="true"
          className="h-full w-full origin-left bg-[var(--brand-accent)] opacity-60 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}
