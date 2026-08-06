"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export type AtmosphereMode = "paper" | "midnight" | "studio";
export type AccentColor =
  | "emerald"
  | "forest"
  | "teal"
  | "electric"
  | "purple"
  | "orange"
  | "rose"
  | "lime"
  | "gold";

export const accentHexMap: Record<AccentColor, string> = {
  emerald: "#173A2E",
  forest: "#11472B",
  teal: "#0D5C58",
  electric: "#1A49E6",
  purple: "#6324D6",
  orange: "#FF5C28",
  rose: "#D6245F",
  lime: "#D9F42C",
  gold: "#E6AE1A"
};

interface AtmosphereContextProps {
  mode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentHex: string;
}

const AtmosphereContext = createContext<AtmosphereContextProps | undefined>(undefined);

const MODE_CLASSES: Record<AtmosphereMode, string> = {
  paper: "mode-paper",
  midnight: "mode-midnight",
  studio: "mode-studio",
};

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AtmosphereMode>("paper");
  const [accent, setAccent] = useState<AccentColor>("lime");

  const pathname = usePathname();

  useEffect(() => {
    // Apply the active mode class to the document root so CSS tokens cascade
    const root = document.documentElement;
    root.classList.remove("mode-paper", "mode-midnight", "mode-studio");
    root.classList.add(MODE_CLASSES[mode]);
    root.style.removeProperty("--studio-dynamic-bg");
  }, [mode, pathname]);

  const value = {
    mode,
    setMode,
    accent,
    setAccent,
    accentHex: accentHexMap[accent],
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
