"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** How strongly the child is pulled toward the cursor (0–1). */
  strength?: number;
};

/**
 * Magnetic wrapper: while the cursor is over the zone, the child is pulled
 * toward it; on leave it springs back. Drop around any button or link.
 */
export default function MagneticPull({ children, className = "", strength = 0.35 }: Props) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const zone = zoneRef.current;
    if (!zone) return;
    const rect = zone.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const reset = () => {
    setOffset({ x: 0, y: 0 });
    setHot(false);
  };

  return (
    <div
      ref={zoneRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={reset}
      className={`inline-flex ${className}`}
    >
      <div
        className="transition-transform ease-out will-change-transform"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${hot ? 1.05 : 1})`,
          transitionDuration: hot ? "150ms" : "450ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
