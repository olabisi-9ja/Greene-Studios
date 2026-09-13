"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

/**
 * Light/dark toggle. Icon-only, it shows the theme you'd switch TO, which is
 * the convention every visitor already knows.
 */
export default function ThemeToggle() {
  const { effectiveMode, toggle } = useAtmosphere();
  const next = effectiveMode === "dark" ? "light" : "dark";
  const Icon = next === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="THEME"
      aria-label={`Switch to ${next} theme`}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={next}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center justify-center"
        >
          <Icon size={16} strokeWidth={2} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
