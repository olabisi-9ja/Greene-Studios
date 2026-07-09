"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon, PaintBucket } from "lucide-react";
import FullscreenMenu from "./FullscreenMenu";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { Logo } from "./ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { mode, setMode } = useAtmosphere();

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
          !menuOpen
            ? "bg-[var(--brand-surface)] border border-[var(--brand-border)] shadow-lg" 
            : "bg-transparent border border-transparent"
        )}>
          {/* Logo (No words next to it, only the drawing monogram) */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group pointer-events-auto"
            data-cursor="HOME"
          >
            <Logo className="w-12 h-12 transition-colors duration-300" color={menuOpen ? "white" : "var(--brand-text)"} animateOnMount={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden md:flex items-center gap-1 pointer-events-auto transition-opacity duration-300",
            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
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
                      : "text-[var(--brand-text)]/70 hover:text-[var(--brand-text)] hover:bg-[var(--brand-text)]/5"
                  )}
                  data-cursor={item.label.toUpperCase()}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Menu Button */}
          <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
            <Link
              href="/contact"
              data-cursor="HI"
              className={cn(
                "hidden lg:flex px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                "bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-white",
                menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              Start a Project
            </Link>

            <button
              onClick={() => {
                if (mode === "clean") setMode("midnight");
                else if (mode === "midnight") setMode("studio");
                else setMode("clean");
              }}
              className={cn(
                "flex items-center justify-center transition-all duration-300 pointer-events-auto rounded-full w-10 h-10",
                menuOpen ? "opacity-0 pointer-events-none text-white" : "opacity-100 text-[var(--brand-text)] hover:bg-[var(--brand-text)]/10"
              )}
              title="Toggle Theme"
              data-cursor="THEME"
            >
              {mode === "clean" && <Sun size={20} />}
              {mode === "midnight" && <Moon size={20} />}
              {mode === "studio" && <PaintBucket size={20} />}
            </button>

            <button 
              className={cn(
                "flex items-center justify-center transition-all duration-300 pointer-events-auto rounded-full w-10 h-10",
                menuOpen ? "text-white hover:bg-white/10" : "text-[var(--brand-text)] hover:bg-[var(--brand-text)]/10"
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor={menuOpen ? "CLOSE" : "MENU"}
              style={{ pointerEvents: "auto" }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
