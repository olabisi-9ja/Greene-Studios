"use client";

import { useRef, useState } from "react";

export type SpotlightItem = {
  icon: string;
  title: string;
  desc: string;
};

type Props = {
  items: SpotlightItem[];
  className?: string;
};

/**
 * Grid of tiles with a radial spotlight that follows the cursor. Themed
 * with brand tokens so it reads softly in light mode and glows in dark.
 */
export default function SpotlightGrid({ items, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 240, y: 160 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative grid grid-cols-1 gap-3 overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 sm:grid-cols-2 ${className}`}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--brand-accent) 20%, transparent), transparent 70%)`,
        }}
      />
      {items.map((item) => (
        <div
          key={item.title}
          className="relative rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)]/80 p-6 transition-colors duration-300 hover:border-[var(--brand-accent)]"
        >
          <span className="text-xl text-[var(--brand-accent)]" aria-hidden="true">
            {item.icon}
          </span>
          <h3 className="mt-3 font-display text-base font-black uppercase tracking-tight text-[var(--brand-text)]">
            {item.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--brand-text-secondary)]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
