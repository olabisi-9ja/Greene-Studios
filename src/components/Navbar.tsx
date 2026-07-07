"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import FullscreenMenu from "./FullscreenMenu";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { Logo } from "./ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { mode } = useAtmosphere();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hiding logic when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isDark = mode === "midnight" || mode === "studio";

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 w-[95%] max-w-7xl",
          menuOpen ? "pointer-events-none" : "",
          isVisible ? "top-4" : "-top-[100px]"
        )}
      >
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3",
          isScrolled || isDark
            ? "bg-[var(--brand-surface)] border border-[var(--brand-border)] shadow-lg" 
            : "bg-transparent"
        )}>
          {/* Logo (No words next to it, only the drawing monogram) */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group pointer-events-auto"
            data-cursor="HOME"
          >
            <Logo className="w-8 h-8" color="var(--brand-text)" animateOnMount={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
                      : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-text)]/5"
                  )}
                  data-cursor={item.label.toUpperCase()}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Menu Button */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <Link
              href="/contact"
              data-cursor="HI"
              className={cn(
                "hidden lg:flex px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                "bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-white"
              )}
            >
              Start a Project
            </Link>

            <button 
              className={cn(
                "flex items-center justify-center transition-all duration-300 text-[var(--brand-text)] pointer-events-auto rounded-full w-10 h-10 hover:bg-[var(--brand-text)]/10"
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor={menuOpen ? "CLOSE" : "MENU"}
              style={{ pointerEvents: "auto" }}
            >
              {menuOpen ? <X size={24} className="text-[var(--brand-bg)] mix-blend-difference" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
