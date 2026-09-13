"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress of a single element through the viewport.
 *
 * 0 → the element's top edge is at the viewport bottom.
 * 1 → the element's bottom edge has left the viewport top.
 *
 * rAF-throttled; works with Lenis since it drives native window scroll.
 */
export function useElementScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - (rect.top + rect.height) / (vh + rect.height);
      setProgress(Math.max(0, Math.min(1, p)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
