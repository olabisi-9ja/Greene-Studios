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

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 px-3 py-1.5">
      <span className="w-16 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--brand-border)] accent-[var(--brand-accent)]"
      />
      <span className="w-7 text-right font-mono text-[10px] text-[var(--brand-text-secondary)]">
        {value}
      </span>
    </label>
  );
}

export default function AtmosphereSwitcher() {
  const {
    mode,
    setMode,
    effectiveMode,
    accent,
    setAccent,
    config,
    setConfig,
    resetConfig,
    setFocus,
  } = useAtmosphere();
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

  const showStudioPanel = effectiveMode === "studio";
  const label = mode === "auto" ? `AUTO · ${MODE_LABELS[effectiveMode]}` : MODE_LABELS[mode];

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="MODE"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Atmosphere: ${label}`}
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
            background:
              effectiveMode === "studio" ? accentHexMap[accent] : "var(--brand-accent)",
          }}
          aria-hidden="true"
        />
        <span className="hidden sm:inline">{label}</span>
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
                  {m === "auto" ? "★" : `0${i}`}
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
                  {m === "auto" && (
                    <span className="ml-2 font-mono text-[9px] text-[var(--brand-text-secondary)]">
                      → {MODE_LABELS[effectiveMode]}
                    </span>
                  )}
                </span>
                {mode === m && (
                  <span className="text-[10px] text-[var(--brand-accent)]" aria-hidden="true">
                    ●
                  </span>
                )}
              </button>
            ))}

            {/* Advanced: RAW + FOCUS — discovered, not front-and-center */}
            <p className="px-3 pb-1 pt-4 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              Experimental
            </p>
            <button
              role="menuitemradio"
              aria-checked={mode === "raw"}
              onClick={() => setMode("raw")}
              className={cn(
                "flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200",
                mode === "raw"
                  ? "bg-[var(--brand-accent)]/10"
                  : "hover:bg-[var(--brand-surface-secondary)]"
              )}
            >
              <span className="font-mono text-[10px] text-[var(--brand-text-secondary)]">04</span>
              <span className="flex-1">
                <span
                  className={cn(
                    "font-display text-sm font-black uppercase tracking-tight",
                    mode === "raw" ? "text-[var(--brand-accent)]" : "text-[var(--brand-text)]"
                  )}
                >
                  RAW
                </span>
                <span className="ml-3 hidden text-[10px] text-[var(--brand-text-secondary)] md:inline">
                  Workshop / behind the scenes
                </span>
              </span>
              {mode === "raw" && (
                <span className="text-[10px] text-[var(--brand-accent)]" aria-hidden="true">
                  ●
                </span>
              )}
            </button>
            <button
              role="menuitem"
              onClick={() => {
                setFocus(true);
                setOpen(false);
              }}
              className="flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-[var(--brand-surface-secondary)]"
            >
              <span className="font-mono text-[10px] text-[var(--brand-text-secondary)]">05</span>
              <span className="flex-1">
                <span className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                  FOCUS
                </span>
                <span className="ml-3 hidden text-[10px] text-[var(--brand-text-secondary)] md:inline">
                  Presentation mode
                </span>
              </span>
              <span className="text-[10px] text-[var(--brand-text-secondary)]" aria-hidden="true">
                ↗
              </span>
            </button>

            {showStudioPanel && (
              <>
                <div className="my-2 h-px bg-[var(--brand-border)]" />
                <p className="px-3 pb-2 pt-1 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
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
                        accent === a &&
                          "ring-2 ring-[var(--brand-text)] ring-offset-2 ring-offset-[var(--brand-surface)]"
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

                <p className="px-3 pb-1 pt-3 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                  Environment
                </p>
                <Slider label="Grain" value={config.grain} onChange={(v) => setConfig({ grain: v })} />
                <Slider label="Motion" value={config.motion} onChange={(v) => setConfig({ motion: v })} />
                <Slider label="Particles" value={config.particles} onChange={(v) => setConfig({ particles: v })} />
                <button
                  onClick={resetConfig}
                  className="mt-2 w-full rounded-xl border border-[var(--brand-border)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                >
                  Reset
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
