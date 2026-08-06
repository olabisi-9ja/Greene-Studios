"use client";

import Image from "next/image";
import { useId } from "react";

interface RotatingBadgeProps {
 text: string;
 className?: string;
 centerText?: string;
 /** Optional logo mark to place in the middle of the badge */
 centerImage?: string;
}

/**
 * Circular rotating "sticker" badge, the playful stamp you see on
 * studio sites (Buck Sauce / Cardtonic / FunTown energy).
 */
export default function RotatingBadge({
 text,
 className = "w-28 h-28",
 centerText = "✦",
 centerImage,
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
 <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)]">
 {centerImage ? (
 <Image
 src={centerImage}
 alt=""
 width={44}
 height={44}
 className="h-full w-full object-contain"
 />
 ) : (
 <span className="text-sm text-[var(--brand-text)]">{centerText}</span>
 )}
 </div>
 </div>
 </div>
 );
}
