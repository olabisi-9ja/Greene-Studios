"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  // Track the router history index so back/forward navigation can keep
  // Next.js's own scroll restoration instead of being forced to top.
  const lastIdxRef = useRef<number | undefined>(undefined);

  // Init Lenis once — it lives for the whole session (root layout).
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09, // Snappy linear interpolation instead of long duration
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    // Expose so FloatingButtons (back-to-top) can drive it
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.__lenis = undefined;
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  // When the route changes, start the new page at the top.
  // Lenis keeps its own scroll state across App Router navigations,
  // so without this, sub pages open from the middle or bottom.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Anchor links (e.g. /work#section) should jump to their target instead.
    if (window.location.hash) return;

    // Back/forward navigation: let Next.js restore the previous position.
    const idx = history.state?.idx as number | undefined;
    const isBackNav =
      lastIdxRef.current !== undefined &&
      idx !== undefined &&
      idx < lastIdxRef.current;
    lastIdxRef.current = idx;
    if (isBackNav) return;

    // Snap to top instantly — no smooth animation, no visible scroll.
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return <>{children}</>;
}
