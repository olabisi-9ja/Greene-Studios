"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useAtmosphere,
  MODE_LABELS,
  MODE_OPTIONS,
  accentHexMap,
  type AccentColor,
} from "@/lib/context/AtmosphereContext";
import { cn } from "@/lib/utils";

export default function AtmosphereSwitcher() {
  const { mode, setMode, accent, setAccent } = useAtmosphere();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="MODE"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Atmosphere: ${MODE_LABELS[mode]}`}
        className={cn(
          "flex h-10 items-center gap-2 rounded-full px-4 text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300",
          open
            ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
            : "border border-[var(--brand-border)] text-[var(--brand-text)] hover:border-[var(--brand-accent)]"
        )}
      >
        <span
          className="h-2 w-2 rounded-full transition-colors duration-500"
          style={{
            background: mode === "studio" ? accentHexMap[accent] : "var(--brand-accent)",
          }}
          aria-hidden="true"
        />
        <span className="hidden sm:inline">{MODE_LABELS[mode]}</span>
        <span aria-hidden="true" className="text-[8px]">
          {open ? "✕" : "▾"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Atmosphere selector"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-[95] w-[19rem] origin-top-right rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
          >
            <p className="px-3 pb-2 pt-1 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              Atmosphere
            </p>

            {MODE_OPTIONS.map(({ mode: m, tagline }, i) => (
              <button
                key={m}
                role="menuitemradio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200",
                  mode === m
                    ? "bg-[var(--brand-accent)]/10"
                    : "hover:bg-[var(--brand-surface-secondary)]"
                )}
              >
                <span className="font-mono text-[10px] text-[var(--brand-text-secondary)]">
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "font-display text-sm font-black uppercase tracking-tight",
                      mode === m ? "text-[var(--brand-accent)]" : "text-[var(--brand-text)]"
                    )}
                  >
                    {MODE_LABELS[m]}
                  </span>
                  <span className="ml-3 hidden text-[10px] text-[var(--brand-text-secondary)] md:inline">
                    {tagline}
                  </span>
                </span>
                {mode === m && (
                  <span className="text-[10px] text-[var(--brand-accent)]" aria-hidden="true">
                    ●
                  </span>
                )}
              </button>
            ))}

            {mode === "studio" && (
              <>
                <p className="px-3 pb-2 pt-4 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                  Studio accent
                </p>
                <div className="flex flex-wrap gap-2 px-3 pb-2">
                  {(Object.keys(accentHexMap) as AccentColor[]).map((a) => (
                    <button
                      key={a}
                      onClick={() => setAccent(a)}
                      aria-label={`Accent ${a}`}
                      aria-pressed={accent === a}
                      title={a}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110",
                        accent === a && "ring-2 ring-[var(--brand-text)] ring-offset-2 ring-offset-[var(--brand-surface)]"
                      )}
                      style={{ background: accentHexMap[a] }}
                    >
                      {accent === a && (
                        <span className="text-[10px] font-black text-[var(--brand-ink)]" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
