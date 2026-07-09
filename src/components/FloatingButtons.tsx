"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const { mode } = useAtmosphere();

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = mode === "midnight" || mode === "studio";

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[70] flex items-center gap-3 pointer-events-none">
      
      {/* Contact Button */}
      <Link
        href="/contact"
        data-cursor="CONTACT"
        className={cn(
          "pointer-events-auto px-5 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-105",
          isDark
            ? "bg-white text-black hover:bg-white/90"
            : "bg-[#111111] text-white hover:bg-[#333333]"
        )}
      >
        Contact
      </Link>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        data-cursor="UP"
        className={cn(
          "pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all shadow-lg hover:scale-105",
          isDark
            ? "bg-white text-black hover:bg-white/90"
            : "bg-[#111111] text-white hover:bg-[#333333]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
}
