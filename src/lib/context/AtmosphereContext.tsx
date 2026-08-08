"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type AtmosphereMode = "paper" | "midnight" | "studio";
export type AccentColor =
  | "forest"
  | "moss"
  | "teal"
  | "lime"
  | "amber"
  | "violet"
  | "coral";

export const accentHexMap: Record<AccentColor, string> = {
  forest: "#2F5D4E",
  moss: "#8FAE7B",
  teal: "#2EC4B6",
  lime: "#C9F24B",
  amber: "#FFB25C",
  violet: "#8B7CF6",
  coral: "#FF6F61",
};

export const MODE_LABELS: Record<AtmosphereMode, string> = {
  paper: "CLEAN",
  midnight: "MIDNIGHT",
  studio: "STUDIO",
};

export const MODE_OPTIONS: { mode: AtmosphereMode; tagline: string }[] = [
  { mode: "paper", tagline: "Editorial / professional" },
  { mode: "midnight", tagline: "Cinematic / premium" },
  { mode: "studio", tagline: "Experimental / interactive" },
];

const MODE_CLASSES: Record<AtmosphereMode, string> = {
  paper: "mode-paper",
  midnight: "mode-midnight",
  studio: "mode-studio",
};

const STORAGE_MODE = "greene:atmosphere";
const STORAGE_ACCENT = "greene:studio-accent";

interface AtmosphereContextProps {
  mode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentHex: string;
  modeLabel: string;
}

const AtmosphereContext = createContext<AtmosphereContextProps | undefined>(undefined);

function isMode(v: string | null): v is AtmosphereMode {
  return v === "paper" || v === "midnight" || v === "studio";
}
function isAccent(v: string | null): v is AccentColor {
  return !!v && v in accentHexMap;
}

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AtmosphereMode>("paper");
  const [accent, setAccentState] = useState<AccentColor>("lime");
  const pathname = usePathname();

  // Adopt persisted preferences synchronously (before paint) so there's no
  // flash of the wrong atmosphere after hydration.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedMode = window.localStorage.getItem(STORAGE_MODE);
      const storedAccent = window.localStorage.getItem(STORAGE_ACCENT);
      setModeState(isMode(storedMode) ? storedMode : "paper");
      setAccentState(isAccent(storedAccent) ? storedAccent : "lime");
    } catch {
      /* storage unavailable — fall back to defaults */
    }
  }, []);

  // Keep <html> mode class + studio accent variable in sync.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("mode-paper", "mode-midnight", "mode-studio");
    root.classList.add(MODE_CLASSES[mode]);

    if (mode === "studio") {
      root.setAttribute("data-studio-accent", accent);
      root.style.setProperty("--studio-accent", accentHexMap[accent]);
    } else {
      root.removeAttribute("data-studio-accent");
      root.style.removeProperty("--studio-accent");
    }
  }, [mode, accent, pathname]);

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

  const value: AtmosphereContextProps = {
    mode,
    setMode,
    accent,
    setAccent,
    accentHex: accentHexMap[accent],
    modeLabel: MODE_LABELS[mode],
  };

  return (
    <AtmosphereContext.Provider value={value}>
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
