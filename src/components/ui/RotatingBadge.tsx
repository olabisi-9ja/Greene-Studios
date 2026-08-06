"use client";

import { useId } from "react";

interface RotatingBadgeProps {
  text: string;
  className?: string;
  centerText?: string;
}

/**
 * Circular rotating "sticker" badge — the playful stamp you see on
 * studio sites (Buck Sauce / Cardtonic / FunTown energy).
 */
export default function RotatingBadge({
  text,
  className = "w-28 h-28",
  centerText = "✦",
}: RotatingBadgeProps) {
  const pathId = `badge-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={`relative select-none ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-current font-display font-bold uppercase"
          style={{ fontSize: "10.5px", letterSpacing: "0.18em" }}>
          <textPath href={`#${pathId}`}>
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[var(--brand-ink)] text-sm">
          {centerText}
        </div>
      </div>
    </div>
  );
}
