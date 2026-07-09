"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { NAV_LINKS } from "@/lib/data";

const pillColors = [
  "#2D4BFF", // Bright Blue
  "#FF7B54", // Coral
  "#98B4A6", // Muted Green
  "#111111", // Black
  "#F3B700", // Yellow
];

export default function StudioSideMenu() {
  const { mode } = useAtmosphere();
  const pathname = usePathname();

  if (mode !== "studio") return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-2 pr-4 md:pr-8 pointer-events-auto">
      {NAV_LINKS.map((item, i) => {
        const isActive = pathname === item.href;
        const color = pillColors[i % pillColors.length];
        
        return (
          <Link
            key={item.label}
            href={item.href}
            data-cursor={item.label.toUpperCase()}
            className="group flex justify-end"
          >
            <div
              className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 transform group-hover:-translate-x-2 shadow-lg`}
              style={{
                backgroundColor: color,
                color: color === "#111111" || color === "#2D4BFF" ? "#FFFFFF" : "#111111",
                opacity: isActive ? 1 : 0.85,
              }}
            >
              {item.label.toLowerCase()}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
