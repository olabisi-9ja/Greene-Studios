"use client";

import { useState } from "react";

export type StackCard = {
  title: string;
  tag: string;
  from: string;
  to: string;
};

const DEFAULT_DECK: StackCard[] = [
  { title: "Cursor Lab", tag: "INTERACTION · 01", from: "#2e7d74", to: "#0c2723" },
  { title: "Type Motion", tag: "TYPOGRAPHY · 02", from: "#1f3d3a", to: "#0e1b22" },
  { title: "Scroll Physics", tag: "MOTION · 03", from: "#3f6fa8", to: "#0b1c30" },
  { title: "WebGL Fields", tag: "EXPERIMENT · 04", from: "#c2541e", to: "#38160b" },
];

type Props = {
  deck?: StackCard[];
  className?: string;
};

/**
 * A deck of cards; click to shuffle the top card to the back. Pure CSS
 * transitions carry the reorder.
 */
export default function CardStack({ deck = DEFAULT_DECK, className = "" }: Props) {
  const [order, setOrder] = useState(() => deck.map((_, i) => i));
  const shuffle = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={shuffle}
        aria-label="Shuffle the experiment deck"
        className="relative h-40 w-64 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-accent)]"
      >
        {order.map((cardIndex, pos) => {
          const card = deck[cardIndex];
          return (
            <div
              key={cardIndex}
              className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${card.from}, ${card.to})`,
                transform: `translateY(${pos * -12}px) scale(${1 - pos * 0.05})`,
                zIndex: deck.length - pos,
                opacity: pos > 2 ? 0 : 1,
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
              }}
            >
              <span className="text-[9px] tracking-[0.25em] text-white/70">{card.tag}</span>
              <span className="text-left font-display text-xl font-black text-white">{card.title}</span>
            </div>
          );
        })}
      </button>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
        Click to shuffle
      </p>
    </div>
  );
}
