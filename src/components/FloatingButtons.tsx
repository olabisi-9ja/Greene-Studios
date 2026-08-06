"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Lenis smooth-scroll keeps window.scrollY at 0, so read the actual
      // scrolled distance from the page body / scrollTop of any scroller.
      const scrolled =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const vh = window.innerHeight || 0;
      setPastHero(scrolled > vh * 0.85);
    };

    // Listen on window + document + capture phase so we catch both
    // native scroll and Lenis-driven scroll events.
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    // Also re-check periodically in case Lenis doesn't emit a scroll event
    const interval = setInterval(handleScroll, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // If Lenis smooth scroll is present, drive it instead of native scroll
    window.__lenis?.scrollTo(0, { immediate: false });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3 transition-all duration-500 md:bottom-8 md:right-8",
        pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      {/* Contact Button */}
      <Link
        href="/contact"
        data-cursor="CONTACT"
        className={cn(
          "rounded-full bg-[var(--brand-text)] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]",
          pastHero ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        Contact
      </Link>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        data-cursor="UP"
        aria-label="Back to top"
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]",
          pastHero ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
