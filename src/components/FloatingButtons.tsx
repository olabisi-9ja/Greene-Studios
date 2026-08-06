"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only reveal once the user has scrolled away from the hero
      const vh = typeof window !== "undefined" ? window.innerHeight : 0;
      setPastHero(window.scrollY > vh * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3 transition-all duration-500 md:bottom-8 md:right-8",
        pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      {/* Contact Button */}
      <Link
        href="/contact"
        data-cursor="CONTACT"
        className="rounded-full bg-[var(--brand-text)] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]"
      >
        Contact
      </Link>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        data-cursor="UP"
        aria-label="Back to top"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
