"use client";

import { useEffect } from "react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

export default function NoiseTexture() {
  const { effectiveMode } = useAtmosphere();

  useEffect(() => {
    // re-render when mode changes so the CSS var is re-read
  }, [effectiveMode]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[50]"
      aria-hidden="true"
      style={{
        opacity: "var(--studio-grain, 0.035)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}
