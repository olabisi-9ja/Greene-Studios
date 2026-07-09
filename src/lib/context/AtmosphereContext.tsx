"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export type AtmosphereMode = "clean" | "midnight" | "studio";
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
  emerald: "#1F3D3A", // Core Greene Studios green
  forest: "#11472B",
  teal: "#0D5C58",
  electric: "#1A49E6",
  purple: "#6324D6",
  orange: "#E65A1A",
  rose: "#D6245F",
  lime: "#BDE61A",
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

// No dynamic backgrounds for studio mode as requested

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AtmosphereMode>("clean");
  const [accent, setAccent] = useState<AccentColor>("emerald");

  const pathname = usePathname();

  useEffect(() => {
    // Add mode class to document body for global CSS targeting
    document.documentElement.classList.remove("mode-clean", "mode-midnight", "mode-studio");
    document.documentElement.classList.add(`mode-${mode}`);
    document.documentElement.style.removeProperty("--studio-dynamic-bg");
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
