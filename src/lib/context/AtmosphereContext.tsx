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
 * Three visual themes: LIGHT / DARK / STUDIO.
 * AUTO follows OS preference (light/dark only — studio is opt-in).
 * STUDIO is the warm, tactile mode inspired by warmnfuzzy.tv — cream, burnt
 * orange, grain, bolder radiuses. FOCUS is still a separate presentation state.
 */
export type ThemeMode = "auto" | "light" | "dark" | "studio";
export type VisualMode = "light" | "dark" | "studio";

export const MODE_LABELS: Record<ThemeMode, string> = {
  auto: "AUTO",
  light: "LIGHT",
  dark: "DARK",
  studio: "STUDIO",
};

const MODE_CLASSES: Record<VisualMode, string> = {
  light: "mode-light",
  dark: "mode-dark",
  studio: "mode-studio",
};

/** Every theme class this app has ever written to <html>. */
const ALL_MODE_CLASSES = [
  "mode-light",
  "mode-dark",
  "mode-studio",
  "mode-day",
  "mode-night",
  "mode-paper",
  "mode-midnight",
  "mode-raw",
];

export const STORAGE_MODE = "greene:atmosphere";

function normalizeMode(v: string | null): ThemeMode {
  if (v === "paper" || v === "day") return "light";
  if (v === "midnight" || v === "night") return "dark";
  if (v === "raw") return "dark";
  if (v === "studio") return "studio";
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
  /** Cycles light → dark → studio → light, leaving AUTO behind. */
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
      /* storage unavailable, default to auto */
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
    mode === "studio" ? "studio" : mode === "auto" ? (systemDark ? "dark" : "light") : mode;

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
    // light → dark → studio → light
    const order: VisualMode[] = ["light", "dark", "studio"];
    const idx = order.indexOf(effectiveMode);
    const next = order[(idx + 1) % order.length] as ThemeMode;
    setMode(next);
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
