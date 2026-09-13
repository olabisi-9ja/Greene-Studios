"use client";

import { useRef, useState } from "react";

export type DockItem = {
  /** Short glyph or monogram shown in the tile. */
  glyph: string;
  label: string;
};

type Props = {
  items: DockItem[];
  className?: string;
};

function DockTile({ glyph, label, mouseX }: { glyph: string; label: string; mouseX: number | null }) {
  const ref = useRef<HTMLButtonElement>(null);
  let scale = 1;
  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    scale = Math.max(1, 1.55 - dist / 90);
  }
  return (
    <button
      ref={ref}
      type="button"
      title={label}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] font-mono text-sm font-bold text-[var(--brand-text)] transition-transform duration-150"
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}
    >
      {glyph}
    </button>
  );
}

/**
 * macOS-style dock: tiles magnify as the cursor sweeps across them.
 */
export default function Dock({ items, className = "" }: Props) {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div className={`max-w-full overflow-x-auto ${className}`}>
      <div
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="inline-flex items-end gap-2 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]/90 px-3 py-2 backdrop-blur-sm"
      >
        {items.map((item) => (
          <DockTile key={item.label} glyph={item.glyph} label={item.label} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}
