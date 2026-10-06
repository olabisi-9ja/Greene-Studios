import type { ReactNode } from "react";

/**
 * A hover label that pours out of its button: a drop in the button's colour
 * stretches out of the circle, pinches off and settles beside it, then the
 * words appear. The liquid is a goo filter (blur, then a hard alpha cut) on a
 * layer behind the button that holds a disc under the button and the label's
 * backing, so the two melt together while they're close and part as the label
 * moves off. The button's icon and the words sit outside the filter and stay
 * sharp. Shows on hover (devices that hover) and on keyboard focus; the
 * button keeps its own aria-label, so the words here are hidden from
 * assistive tech. Styles: .liquid-* in globals.css; the filter is
 * <LiquidFilter />, mounted once (TopBar).
 */
export default function LiquidTip({
  label,
  side = "up",
  align = "center",
  children,
}: {
  label: string;
  /** which way the label pours: above the button or below it */
  side?: "up" | "down";
  /** line the label up with the button's centre, or its left or right edge (for buttons at the screen's edges) */
  align?: "center" | "start" | "end";
  children: ReactNode;
}) {
  return (
    <span className={`liquid-tip liquid-${side} liquid-${align}`}>
      <span className="liquid-goo" aria-hidden="true">
        <span className="liquid-drop">{label}</span>
      </span>
      {children}
      <span className="liquid-label" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}

/** The goo filter the labels pour through. Mount once per page. */
export function LiquidFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <filter id="greene-goo" x="-150%" y="-150%" width="400%" height="400%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
      </filter>
    </svg>
  );
}
