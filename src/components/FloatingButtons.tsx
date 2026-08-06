"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {/* Contact Button */}
      <Link
        href="/contact"
        data-cursor="CONTACT"
        className={cn(
          "pointer-events-auto rounded-full bg-[var(--brand-text)] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
          "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] shadow-lg transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
