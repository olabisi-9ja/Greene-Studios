"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, Palette } from "lucide-react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

/**
 * Theme toggle that cycles Light → Dark → Studio → Light.
 * Studio is the warm & fuzzy mode (cream / burnt orange, inspired by warmnfuzzy.tv).
 * Icon shows the *current* mode, label hints the next.
 */
export default function ThemeToggle() {
  const { effectiveMode, toggle, mode } = useAtmosphere();

  const current = effectiveMode;
  const nextMap: Record<string, string> = { light: "dark", dark: "studio", studio: "light" };
  const next = nextMap[current] ?? "light";

  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Palette;
  const label = `Switch to ${next} mode (now ${current})`;

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="THEME"
      aria-label={label}
      title={label}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center justify-center"
        >
          <Icon size={16} strokeWidth={2} />
        </motion.span>
      </AnimatePresence>
      {current === "studio" && (
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--brand-accent)] shadow-sm" aria-hidden />
      )}
    </button>
  );
}
