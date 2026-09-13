"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
};

/**
 * Pointer-tracked 3D tilt with a glare hotspot that follows the cursor.
 * Wrap any card; the wrapper owns perspective, the child keeps its look.
 */
export default function TiltCard({ children, className = "", maxTilt = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * maxTilt * 2,
      ry: (px - 0.5) * maxTilt * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <div style={{ perspective: "900px" }} className={className}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative h-full overflow-hidden transition-transform duration-150 will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.14), transparent 55%)`,
          }}
        />
      </div>
    </div>
  );
}
