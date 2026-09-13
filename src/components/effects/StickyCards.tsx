"use client";

import { useElementScroll } from "@/lib/hooks/useElementScroll";

export type StickyCardItem = {
  num: string;
  title: string;
  desc: string;
  from: string;
  to: string;
};

type Props = {
  items: StickyCardItem[];
  className?: string;
};

/**
 * A stack of cards where scrolling peels the top card away and lifts the
 * next one up. Progress-driven, no scroll libraries needed.
 */
export default function StickyCards({ items, className = "" }: Props) {
  const { ref, progress } = useElementScroll<HTMLDivElement>();
  const f = progress * (items.length - 1);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="relative h-64">
        {items.map((card, i) => {
          const exit = Math.max(0, Math.min(1, f - i));
          const depth = Math.max(0, i - f);
          return (
            <div
              key={card.num}
              className="absolute inset-x-0 top-0 flex h-48 flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6"
              style={{
                background: `linear-gradient(135deg, ${card.from}, ${card.to})`,
                transform: `translateY(${depth * 14 - exit * 80}px) scale(${1 - depth * 0.06 + exit * 0.04})`,
                opacity: 1 - exit,
                zIndex: items.length - i,
                boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[9px] tracking-[0.25em] text-white/70">PHASE</span>
                <span className="font-display text-3xl font-black text-white/25">{card.num}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-white">{card.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
