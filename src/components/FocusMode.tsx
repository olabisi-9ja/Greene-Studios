"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { PROJECTS, NAV_LINKS } from "@/lib/data";

/** Title for the current route, used as the focus-screen statement. */
function routeTitle(pathname: string): string {
  const project = PROJECTS.find((p) => `/work/${p.slug}` === pathname);
  if (project) return project.title;
  if (pathname === "/") return "THE DIGITAL STUDIO";
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return "GREENE";
  return seg.toUpperCase();
}

export default function FocusMode() {
  const { focus, setFocus, modeLabel } = useAtmosphere();
  const pathname = usePathname();

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocus(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, setFocus]);

  return (
    <AnimatePresence>
      {focus && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Focus presentation mode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col bg-[var(--brand-bg)] text-[var(--brand-text)]"
        >
          {/* grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[var(--studio-grain,0.04)]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* top bar */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
            <span className="font-display text-sm font-black uppercase tracking-tight">
              GREENE<span className="align-super text-[8px]">®</span>
            </span>
            <button
              onClick={() => setFocus(false)}
              data-cursor="EXIT"
              className="rounded-full border border-[var(--brand-border)] px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
            >
              Exit focus · esc
            </button>
          </div>

          {/* center statement */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]"
            >
              {modeLabel} · presentation
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-tight"
            >
              {routeTitle(pathname)}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]"
            >
              <span>Brand Identity</span>
              <span className="opacity-40">/</span>
              <span>Digital Experience</span>
              <span className="opacity-40">/</span>
              <span>Development</span>
            </motion.div>
          </div>

          {/* presentation nav */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-[var(--brand-border)] px-6 py-6"
            aria-label="Focus navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="GO"
                className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)] opacity-70 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
