"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RollLabel from "@/components/ui/RollLabel";
import { GreeneMonogram } from "@/components/ui/GreeneMark";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/data";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 transition-transform duration-500 md:px-6",
          isVisible || menuOpen ? "translate-y-0" : "-translate-y-[120%]"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-[1280px] items-center justify-between rounded-full border px-4 py-2 backdrop-blur-2xl transition-all duration-500",
            isScrolled
              ? "border-[rgba(0,0,0,0.08)] bg-[var(--brand-bg)]/65 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.12)]"
              : "border-transparent bg-[var(--brand-bg)]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
            "supports-[backdrop-filter]:bg-[var(--brand-bg)]/65"
          )}
        >
          <Link
            href="/"
            onDoubleClick={(e) => {
              e.preventDefault();
              setFocus(true);
            }}
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2 py-0.5"
            data-cursor="HOME"
            aria-label="Greene Studios, home"
            title="Double-click for Focus Mode"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[var(--brand-text)] text-[var(--brand-bg)] ring-1 ring-[var(--brand-border)] transition-transform duration-500 group-hover:scale-105 md:h-8 md:w-8">
              <GreeneMonogram fill className="h-full w-full p-[3px]" />
            </span>
            <span className="headline text-[15px] text-[var(--brand-text)] md:text-[17px]">
              Greene
              <span className="align-super text-[7px] font-bold">®</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="MENU"
              aria-label="Open menu"
              className="flex h-9 items-center justify-center gap-2 rounded-full bg-[var(--brand-text)] px-4 text-[13px] font-medium text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
            >
              Menu <Menu size={14} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[var(--brand-bg)]/95 backdrop-blur-3xl"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-surface)] text-[var(--brand-text)] transition-transform hover:scale-105 md:right-10 md:top-10"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col items-center justify-center gap-6 md:gap-8"
            >
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const isExternal = item.href.startsWith("http");
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      closed: { opacity: 0, y: 20 },
                      open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 1, 0.4, 1] } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      data-cursor={item.label.toUpperCase()}
                      className={cn(
                        "headline text-3xl transition-colors duration-300 hover:text-[var(--brand-accent)] md:text-5xl",
                        isActive ? "text-[var(--brand-text)]" : "text-[var(--brand-text-secondary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 1, 0.4, 1] } },
                }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  data-cursor="HELLO"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand-text)] px-8 py-4 text-[15px] font-medium text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
                >
                  <RollLabel text="Start a project" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
