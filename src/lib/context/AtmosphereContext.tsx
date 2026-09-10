"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  ReactNode,
} from "react";

/**
 * Greene Studios theme.
 *
 * Two themes: LIGHT and DARK. AUTO is the default and follows the visitor's
 * OS preference. FOCUS is a separate presentation state (fullscreen, minimal),
 * not a theme.
 *
 * The name `Atmosphere` is kept so call sites stay stable; the four-mode
 * atmosphere system (STUDIO / RAW, per-route theming, accent picker, grain and
 * particle controls) was removed.
 */
export type ThemeMode = "auto" | "light" | "dark";
export type VisualMode = "light" | "dark";

export const MODE_LABELS: Record<ThemeMode, string> = {
  auto: "AUTO",
  light: "LIGHT",
  dark: "DARK",
};

const MODE_CLASSES: Record<VisualMode, string> = {
  light: "mode-light",
  dark: "mode-dark",
};

/** Every theme class this app has ever written to <html>. */
const ALL_MODE_CLASSES = [
  "mode-light",
  "mode-dark",
  "mode-day",
  "mode-night",
  "mode-paper",
  "mode-midnight",
  "mode-studio",
  "mode-raw",
];

export const STORAGE_MODE = "greene:atmosphere";

function normalizeMode(v: string | null): ThemeMode {
  // Legacy values from the four-mode system.
  if (v === "paper" || v === "day") return "light";
  if (v === "midnight" || v === "night" || v === "studio" || v === "raw") return "dark";
  if (v === "auto" || v === "light" || v === "dark") return v;
  return "auto";
}

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

interface AtmosphereContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** The theme actually applied (AUTO resolved against the OS preference). */
  effectiveMode: VisualMode;
  /** Flips between light and dark, leaving AUTO behind. */
  toggle: () => void;
  modeLabel: string;
  /** FOCUS presentation state */
  focus: boolean;
  setFocus: (on: boolean) => void;
}

const AtmosphereContext = createContext<AtmosphereContextProps | undefined>(undefined);

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [systemDark, setSystemDark] = useState(false);
  const [focus, setFocusState] = useState(false);

  // Adopt persisted preference synchronously (before paint).
  useLayoutEffect(() => {
    try {
      setModeState(normalizeMode(window.localStorage.getItem(STORAGE_MODE)));
    } catch {
      /* storage unavailable — default to auto */
    }
    setSystemDark(systemPrefersDark());
  }, []);

  // Track the OS preference so AUTO stays live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const effectiveMode: VisualMode =
    mode === "auto" ? (systemDark ? "dark" : "light") : mode;

  // Keep the <html> theme class in sync.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...ALL_MODE_CLASSES);
    root.classList.add(MODE_CLASSES[effectiveMode]);
    root.setAttribute("data-mode", effectiveMode);
  }, [effectiveMode]);

  // FOCUS locks scroll.
  useLayoutEffect(() => {
    document.body.classList.toggle("focus-active", focus);
    return () => document.body.classList.remove("focus-active");
  }, [focus]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_MODE, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(effectiveMode === "dark" ? "light" : "dark");
  }, [effectiveMode, setMode]);

  return (
    <AtmosphereContext.Provider
      value={{
        mode,
        setMode,
        effectiveMode,
        toggle,
        modeLabel: MODE_LABELS[mode],
        focus,
        setFocus: setFocusState,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (context === undefined) {
    throw new Error("useAtmosphere must be used within an AtmosphereProvider");
  }
  return context;
}
