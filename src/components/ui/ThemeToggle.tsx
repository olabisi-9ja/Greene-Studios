"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Sparkles, Hammer, type LucideIcon } from "lucide-react";
import { useAtmosphere, type VisualMode } from "@/lib/context/AtmosphereContext";

/**
 * Icon-only theme switcher.
 *
 * One tap cycles the atmosphere — DAY → NIGHT → STUDIO → RAW → DAY.
 * No labels, no dropdown, no description: just the icon of the current
 * atmosphere, and the tap takes you to the next one.
 */
const CYCLE: VisualMode[] = ["day", "night", "studio", "raw"];

const ICONS: Record<VisualMode, LucideIcon> = {
  day: Sun,
  night: Moon,
  studio: Sparkles,
  raw: Hammer,
};

export default function ThemeToggle() {
  const { effectiveMode, setMode } = useAtmosphere();

  const Icon = ICONS[effectiveMode];
  const next =
    CYCLE[(CYCLE.indexOf(effectiveMode) + 1) % CYCLE.length];

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      data-cursor="MODE"
      aria-label={`Switch atmosphere. Currently ${effectiveMode}, tap for ${next}`}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={effectiveMode}
          initial={{ rotate: -120, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 120, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="block"
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
