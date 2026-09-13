"use client";

import { useElementScroll } from "@/lib/hooks/useElementScroll";

type Props = {
  text: string;
  className?: string;
  /** Max horizontal offset per letter-step, in px. */
  spread?: number;
  /** Progress at which the spread starts. */
  start?: number;
  /** Progress window over which the spread completes. */
  window?: number;
};

/**
 * A display word whose letters slide apart as the element scrolls through
 * the viewport, then settle back together.
 */
export default function SpreadWord({
  text,
  className = "",
  spread = 48,
  start = 0.2,
  window: win = 0.6,
}: Props) {
  const { ref, progress } = useElementScroll<HTMLDivElement>();
  const t = Math.max(0, Math.min(1, (progress - start) / win));

  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => {
        const offset = (i - (text.length - 1) / 2) * t * spread;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block will-change-transform"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
}
