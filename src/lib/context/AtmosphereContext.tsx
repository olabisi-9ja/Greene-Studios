"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

/**
 * Greene Studios atmosphere system.
 *
 * Visual modes: DAY · NIGHT · STUDIO · RAW
 * AUTO is the default "mode" — it resolves to a visual mode per route so the
 * themes become part of the storytelling (Home=DAY, Work=NIGHT, Lab=STUDIO…).
 * FOCUS is a separate presentation state (fullscreen, minimal), not a theme.
 */
export type AtmosphereMode = "auto" | "day" | "night" | "studio" | "raw";
export type VisualMode = Exclude<AtmosphereMode, "auto">;
export type AccentColor =
  | "forest"
  | "moss"
  | "teal"
  | "lime"
  | "amber"
  | "violet"
  | "coral"
  | "blue";

export const accentHexMap: Record<AccentColor, string> = {
  forest: "#2F5D4E",
  moss: "#8FAE7B",
  teal: "#2EC4B6",
  lime: "#C9F24B",
  amber: "#FFB25C",
  violet: "#8B7CF6",
  coral: "#FF6F61",
  blue: "#3AA6FF",
};

export const MODE_LABELS: Record<AtmosphereMode, string> = {
  auto: "AUTO",
  day: "DAY",
  night: "NIGHT",
  studio: "STUDIO",
  raw: "RAW",
};

export const MODE_OPTIONS: { mode: AtmosphereMode; tagline: string }[] = [
  { mode: "auto", tagline: "Context-aware · recommended" },
  { mode: "day", tagline: "Professional / editorial" },
  { mode: "night", tagline: "Premium / cinematic" },
  { mode: "studio", tagline: "Generative / interactive" },
];

const MODE_CLASSES: Record<VisualMode, string> = {
  day: "mode-day",
  night: "mode-night",
  studio: "mode-studio",
  raw: "mode-raw",
};

const STORAGE_MODE = "greene:atmosphere";
const STORAGE_ACCENT = "greene:studio-accent";
const STORAGE_CONFIG = "greene:studio-config";

/** AUTO route map — the theme journey through the site. */
function resolveAuto(pathname: string): VisualMode {
  if (pathname.startsWith("/work")) return "night";
  if (pathname.startsWith("/lab") || pathname.startsWith("/experiments")) return "studio";
  if (pathname === "/contact") return "night";
  return "day";
}

function normalizeMode(v: string | null): AtmosphereMode {
  // legacy values from earlier builds
  if (v === "paper") return "day";
  if (v === "midnight") return "night";
  if (v === "auto" || v === "day" || v === "night" || v === "studio" || v === "raw") return v;
  return "auto";
}
function isAccent(v: string | null): v is AccentColor {
  return !!v && v in accentHexMap;
}

interface StudioConfig {
  grain: number; // 0–100
  motion: number; // 0–100
  particles: number; // 0–100
}

interface AtmosphereContextProps {
  mode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
  /** The visual mode actually applied (AUTO resolved against the route). */
  effectiveMode: VisualMode;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentHex: string;
  modeLabel: string;
  /** FOCUS presentation state */
  focus: boolean;
  setFocus: (on: boolean) => void;
  /** Studio control panel */
  config: StudioConfig;
  setConfig: (patch: Partial<StudioConfig>) => void;
  resetConfig: () => void;
}

const AtmosphereContext = createContext<AtmosphereContextProps | undefined>(undefined);

const DEFAULT_CONFIG: StudioConfig = { grain: 50, motion: 100, particles: 60 };

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AtmosphereMode>("auto");
  const [accent, setAccentState] = useState<AccentColor>("lime");
  const [config, setConfigState] = useState<StudioConfig>(DEFAULT_CONFIG);
  const [focus, setFocusState] = useState(false);
  const pathname = usePathname();

  // Adopt persisted preferences synchronously (before paint).
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedMode = window.localStorage.getItem(STORAGE_MODE);
      const storedAccent = window.localStorage.getItem(STORAGE_ACCENT);
      const storedConfig = window.localStorage.getItem(STORAGE_CONFIG);
      setModeState(normalizeMode(storedMode));
      setAccentState(isAccent(storedAccent) ? storedAccent : "lime");
      if (storedConfig) {
        const parsed = JSON.parse(storedConfig);
        setConfigState({
          grain: clamp(parsed.grain ?? 50),
          motion: clamp(parsed.motion ?? 100),
          particles: clamp(parsed.particles ?? 60),
        });
      }
    } catch {
      /* storage unavailable — defaults */
    }
  }, []);

  const effectiveMode: VisualMode =
    mode === "auto" ? resolveAuto(pathname) : mode;

  // Keep <html> mode class + studio variables in sync.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("mode-day", "mode-night", "mode-studio", "mode-raw");
    root.classList.add(MODE_CLASSES[effectiveMode]);
    root.setAttribute("data-mode", effectiveMode);

    if (effectiveMode === "studio") {
      root.setAttribute("data-studio-accent", accent);
      root.style.setProperty("--studio-accent", accentHexMap[accent]);
    } else {
      root.removeAttribute("data-studio-accent");
      root.style.removeProperty("--studio-accent");
    }

    // Studio control panel outputs
    root.style.setProperty("--studio-grain", (0.02 + (config.grain / 100) * 0.06).toFixed(3));
    root.setAttribute(
      "data-motion",
      config.motion < 30 ? "none" : config.motion < 70 ? "reduced" : "full"
    );
  }, [effectiveMode, accent, config, pathname]);

  // FOCUS locks scroll
  useLayoutEffect(() => {
    document.body.classList.toggle("focus-active", focus);
    return () => document.body.classList.remove("focus-active");
  }, [focus]);

  const setMode = (next: AtmosphereMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_MODE, next);
    } catch {
      /* ignore */
    }
  };

  const setAccent = (next: AccentColor) => {
    setAccentState(next);
    try {
      window.localStorage.setItem(STORAGE_ACCENT, next);
    } catch {
      /* ignore */
    }
  };

  const setConfig = (patch: Partial<StudioConfig>) => {
    setConfigState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_CONFIG, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const resetConfig = () => setConfig(DEFAULT_CONFIG);

  const value: AtmosphereContextProps = {
    mode,
    setMode,
    effectiveMode,
    accent,
    setAccent,
    accentHex: accentHexMap[accent],
    modeLabel: MODE_LABELS[mode],
    focus,
    setFocus: setFocusState,
    config,
    setConfig,
    resetConfig,
  };

  return (
    <AtmosphereContext.Provider value={value}>
      {children}
    </AtmosphereContext.Provider>
  );
}

function clamp(n: number) {
  if (Number.isNaN(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (context === undefined) {
    throw new Error("useAtmosphere must be used within an AtmosphereProvider");
  }
  return context;
}
