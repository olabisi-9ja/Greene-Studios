"use client";

import { useElementScroll } from "@/lib/hooks/useElementScroll";

type Props = {
  text: string;
  sub?: string;
  className?: string;
  /** Classes for the heading itself (size, weight…). */
  headingClassName?: string;
};

/**
 * Heading that starts blurred, oversized and letter-spaced, then sharpens
 * into place as the element crosses the middle of the viewport.
 */
export default function BlurReveal({ text, sub, className = "", headingClassName = "" }: Props) {
  const { ref, progress } = useElementScroll<HTMLDivElement>();
  const p = Math.max(0, Math.min(1, (progress - 0.25) / 0.4));
  const blur = (1 - p) * 12;
  const scale = 1.25 - p * 0.25;
  const spacing = (1 - p) * 14;

  return (
    <div ref={ref} className={className}>
      <h2
        className={`headline will-change-transform ${headingClassName}`}
        style={{
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
          opacity: 0.25 + p * 0.75,
          letterSpacing: `${spacing}px`,
          transition: "filter 0.15s linear",
        }}
      >
        {text}
      </h2>
      {sub ? (
        <p
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]"
          style={{ opacity: p }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
