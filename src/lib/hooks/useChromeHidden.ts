"use client";

import { useEffect, useState } from "react";

/**
 * Pinterest-style chrome: scrolling down hides the top bar and the dock so
 * the content has the screen; any scroll up brings both back. Near the top
 * of the page the chrome always shows.
 */
export function useChromeHidden(threshold = 8) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (y < 80) setHidden(false);
      else if (dy > threshold) setHidden(true);
      else if (dy < -threshold) setHidden(false);
      if (Math.abs(dy) > threshold) lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
