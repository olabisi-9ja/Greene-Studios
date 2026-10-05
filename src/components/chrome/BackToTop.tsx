"use client";

import { useEffect, useRef } from "react";

/** The tab's outline: a long, soft hump rising from the bottom edge. */
export const HUMP_PATH = "M0 96 C 170 96 250 6 400 6 C 550 6 630 96 800 96 Z";

/**
 * Back to top, after Hello Monday: a dark tab rising from the very bottom of
 * the page, centred. While it's on screen the dock steps aside (it sits in
 * the same place), via a class on <html>.
 */
export default function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(([e]) => root.classList.toggle("at-page-end", e.isIntersecting), { rootMargin: "0px 0px 40px 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      root.classList.remove("at-page-end");
    };
  }, []);

  const toTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button ref={ref} type="button" onClick={toTop} className="back-to-top group relative mx-auto mt-16 block w-[min(800px,100%)]">
      <svg viewBox="0 0 800 96" preserveAspectRatio="none" aria-hidden="true" className="block h-[84px] w-full sm:h-[96px]">
        <path d={HUMP_PATH} className="fill-[var(--brand-text)]" />
      </svg>
      <span className="absolute inset-x-0 bottom-[22px] text-center font-semibold text-[var(--brand-bg)] sm:bottom-[26px]">Back to top</span>
    </button>
  );
}
