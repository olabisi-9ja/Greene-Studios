"use client";

import { useElementScroll } from "@/lib/hooks/useElementScroll";

type Props = {
  text: string;
  className?: string;
  /** How fast words light up relative to scroll progress. */
  boost?: number;
};

/**
 * Paragraph whose words light up one by one as the block crosses the
 * viewport. Dimmed words use a low-opacity mix of the theme ink so it
 * adapts to light, dark and studio modes.
 */
export default function HighlightWords({ text, className = "", boost = 1.5 }: Props) {
  const { ref, progress } = useElementScroll<HTMLParagraphElement>();
  const words = text.split(" ");
  const highlightIndex = Math.floor(progress * words.length * boost);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="transition-colors duration-200"
          style={{
            color:
              i < highlightIndex
                ? "var(--brand-text)"
                : "color-mix(in srgb, var(--brand-text) 26%, transparent)",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
