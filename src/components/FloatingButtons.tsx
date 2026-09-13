"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const vh = window.innerHeight || 0;
      setPastHero(scrolled > vh * 0.85);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    // poll lenis scroll as fallback, lenis updates transform, not scrollTop
    let lastY = 0;
    const interval = setInterval(() => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        0;
      if (y !== lastY) {
        lastY = y;
        handleScroll();
      }
      // also check lenis instance directly if available
      const lenisVal = (window as unknown as { __lenis?: { scroll?: number } }).__lenis?.scroll;
      if (typeof lenisVal === "number" && Math.abs(lenisVal - lastY) > 2) {
        setPastHero(lenisVal > (window.innerHeight || 0) * 0.85);
      }
    }, 250);

    // also listen to lenis custom event if it emits
    const onLenisScroll = () => handleScroll();
    window.addEventListener("lenis-scroll" as never, onLenisScroll as never);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("lenis-scroll" as never, onLenisScroll as never);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const visible = pastHero && !footerInView;

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: unknown) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      try {
        lenis.scrollTo(0, { duration: 1.1 });
        return;
      } catch {
        // fallthrough
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2 transition-all duration-500 md:bottom-7 md:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      {/* Contact Button - rounded */}
      <Link
        href="/contact"
        data-cursor="CONTACT"
        className={cn(
          "rounded-full bg-[var(--brand-text)] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-[var(--brand-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]",
          visible ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        Contact
      </Link>

      {/* Back to Top Button - rounded */}
      <button
        onClick={scrollToTop}
        data-cursor="UP"
        aria-label="Back to top"
        type="button"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]",
          visible ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
