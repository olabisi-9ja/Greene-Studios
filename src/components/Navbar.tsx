"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import SideMenu from "./SideMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/data";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setFocus } = useAtmosphere();
  const pathname = usePathname();

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
        <div
          className={cn(
            "transition-all duration-500",
            isScrolled && !menuOpen
              ? "border-b border-[var(--brand-border)] bg-[var(--brand-bg)]/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
            {/* Logo / wordmark — double-click toggles FOCUS presentation mode */}
            <Link
              href="/"
              onDoubleClick={(e) => {
                e.preventDefault();
                setFocus(true);
              }}
              className="group flex items-center gap-3 py-4 md:py-5"
              data-cursor="HOME"
              aria-label="Greene Studios, home (double-click for presentation mode)"
              title="Double-click for Focus Mode"
            >
              <span className="relative block h-8 w-8 overflow-hidden rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)] md:h-9 md:w-9">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/gs-chip.svg"
                  alt="Greene Studios logo"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)] md:text-base">
                Greene
                <span className="align-super text-[8px] font-bold">®</span>
              </span>
            </Link>

            {/* Center links — desktop */}
            <nav
              className="hidden items-center gap-7 lg:flex xl:gap-9"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor={item.label.toUpperCase()}
                    className={cn(
                      "nav-link text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[var(--brand-accent)] xl:text-xs",
                      isActive
                        ? "is-active text-[var(--brand-text)]"
                        : "text-[var(--brand-text-secondary)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2.5 md:gap-3">
              <ThemeToggle />

              {/* Start a project — desktop */}
              <Link
                href="/contact"
                data-cursor="HELLO"
                className="hidden items-center gap-2 rounded-full bg-[var(--brand-text)] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)] sm:inline-flex"
              >
                Start a project
                <span aria-hidden="true">→</span>
              </Link>

              {/* MENU button · mobile + tablet */}
              <button
                onClick={() => setMenuOpen(true)}
                data-cursor="MENU"
                aria-label="Open menu"
                className="flex h-10 items-center gap-2 rounded-full border border-[var(--brand-border)] px-4 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] lg:hidden"
              >
                <Menu size={15} strokeWidth={2.5} />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
