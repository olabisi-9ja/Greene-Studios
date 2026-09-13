"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RollLabel from "@/components/ui/RollLabel";
import { GreeneMonogram } from "@/components/ui/GreeneMark";
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
      setIsScrolled(currentScrollY > 12);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 transition-transform duration-500 md:px-6",
          (isVisible || menuOpen) ? "translate-y-0" : "-translate-y-[120%]"
        )}
      >
        {/* Floating pill — fourmula.ai inspired: centered, rounded-full, soft shadow, minimal */}
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-[1280px] items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-500 md:px-5 md:py-2.5",
            isScrolled
              ? "border-[var(--brand-border)] bg-[var(--brand-bg)]/85 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              : "border-transparent bg-[var(--brand-bg)]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
            "supports-[backdrop-filter]:bg-[var(--brand-bg)]/70"
          )}
        >
          <Link
            href="/"
            onDoubleClick={(e) => {
              e.preventDefault();
              setFocus(true);
            }}
            className="group flex items-center gap-2.5 py-1"
            data-cursor="HOME"
            aria-label="Greene Studios, home (double-click for presentation mode)"
            title="Double-click for Focus Mode"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] ring-1 ring-[var(--brand-border)] transition-transform duration-500 group-hover:scale-105 md:h-9 md:w-9">
              <GreeneMonogram fill className="h-full w-full p-[3px]" />
            </span>
            <span className="headline text-[17px] text-[var(--brand-text)] md:text-[19px]">
              Greene
              <span className="align-super text-[8px] font-bold">®</span>
            </span>
          </Link>

          {/* Center links — pill style, minimal, large whitespace like expo/deepmind */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const isExternal = item.href.startsWith("http");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  data-cursor={item.label.toUpperCase()}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300",
                    isActive
                      ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
                      : "text-[var(--brand-text-secondary)] hover:bg-[var(--brand-surface-secondary)] hover:text-[var(--brand-text)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-2.5">
            <ThemeToggle />
            <Link
              href="/contact"
              data-cursor="HELLO"
              className="group hidden items-center gap-2 rounded-full bg-[var(--brand-text)] px-5 py-2.5 text-[14px] font-medium text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)] sm:inline-flex"
            >
              <RollLabel text="Start a project" />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="MENU"
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)] lg:hidden"
            >
              <Menu size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
