"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon, PaintBucket } from "lucide-react";
import FullscreenMenu from "./FullscreenMenu";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

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

      if (currentScrollY > lastScrollY && currentScrollY > 140) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 60);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-transform duration-500",
          (isVisible || menuOpen) ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div
            className={cn(
              "mt-3 md:mt-4 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5",
              isScrolled && !menuOpen
                ? "glass-pill shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                : "border border-transparent"
            )}
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="group flex items-center gap-2"
              data-cursor="HOME"
              aria-label="Greene Studios — home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-sm font-black text-[var(--brand-ink)] transition-transform duration-300 group-hover:rotate-[18deg]">
                G
              </span>
              <span className="font-display text-[15px] font-black uppercase tracking-tight text-[var(--brand-text)]">
                Greene
                <span className="align-super text-[8px] font-bold text-[var(--brand-accent)]">®</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className={cn(
              "hidden items-center gap-1 md:flex transition-opacity duration-300",
              menuOpen ? "opacity-0" : "opacity-100"
            )}>
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "nav-link px-4 py-1.5 text-[13px] font-semibold tracking-wide transition-colors duration-300",
                      isActive
                        ? "is-active text-[var(--brand-text)]"
                        : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]"
                    )}
                    data-cursor={item.label.toUpperCase()}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => {
                  if (mode === "paper") setMode("midnight");
                  else if (mode === "midnight") setMode("studio");
                  else setMode("paper");
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300",
                  menuOpen
                    ? "text-[var(--brand-bg)] hover:bg-white/10"
                    : "text-[var(--brand-text)] hover:bg-[var(--brand-text)]/10"
                )}
                title="Toggle atmosphere"
                data-cursor="MOOD"
                aria-label="Toggle atmosphere"
              >
                {mode === "paper" && <Sun size={18} />}
                {mode === "midnight" && <Moon size={18} />}
                {mode === "studio" && <PaintBucket size={18} />}
              </button>

              <Link
                href="/contact"
                data-cursor="HELLO"
                className={cn(
                  "hidden items-center rounded-full bg-[var(--brand-text)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)] lg:inline-flex",
                  menuOpen && "opacity-0"
                )}
              >
                Start a project
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                data-cursor={menuOpen ? "CLOSE" : "MENU"}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300",
                  menuOpen
                    ? "text-[var(--brand-bg)] hover:bg-white/10"
                    : "text-[var(--brand-text)] hover:bg-[var(--brand-text)]/10"
                )}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
