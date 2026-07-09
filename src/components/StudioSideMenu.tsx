"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { NAV_LINKS } from "@/lib/data";

const pillColors = [
  "#2D8B57", // Artistic Green
  "#F3B700", // Yellow
  "#111111", // Black
  "#E65A1A", // Orange
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
                color: (color === "#111111" || color === "#2D8B57" || color === "#E65A1A") ? "#FFFFFF" : "#111111",
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
