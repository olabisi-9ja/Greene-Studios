/**
 * The three nav icons: home, work, start a project. 24px grid, 1.6
 * rounded strokes, each with a solid twin for the page you are on.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const line = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});
const solid = (p: P) => ({ viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...p });

const HOUSE =
  "M4 10.4 10.9 4.6a1.7 1.7 0 0 1 2.2 0L20 10.4V19a1.8 1.8 0 0 1-1.8 1.8H15.2v-4.6a1.2 1.2 0 0 0-1.2-1.2h-4a1.2 1.2 0 0 0-1.2 1.2v4.6H5.8A1.8 1.8 0 0 1 4 19Z";

export const NavHome = (p: P) => (
  <svg {...line(p)}>
    <path d={HOUSE} />
  </svg>
);
export const NavHomeOn = (p: P) => (
  <svg {...solid(p)}>
    <path d={HOUSE} />
  </svg>
);

/** A small stack of finished pieces. */
export const NavWork = (p: P) => (
  <svg {...line(p)}>
    <rect x="3.5" y="8" width="13.5" height="12.5" rx="2.2" />
    <path d="M7.5 4.8h10.7A2.3 2.3 0 0 1 20.5 7.1v9.7" />
    <path d="M6.5 17.5l3-3.2 2.2 2.2 1.6-1.6 2 2.6" />
  </svg>
);
export const NavWorkOn = (p: P) => (
  <svg {...solid(p)}>
    <path d="M5.7 7.2h9.1a3 3 0 0 1 3 3v8.6a3 3 0 0 1-3 3H5.7a3 3 0 0 1-3-3v-8.6a3 3 0 0 1 3-3Z" />
    <path d="M7.5 4h10.7a3.1 3.1 0 0 1 3.1 3.1v9.7a.8.8 0 0 1-1.6 0V7.1c0-.8-.7-1.5-1.5-1.5H7.5a.8.8 0 0 1 0-1.6Z" />
  </svg>
);

/** A paper plane: send us the brief. */
const PLANE = "M20.6 3.4 3.9 10.1c-.6.2-.6 1.1 0 1.3l6.2 2.5 2.5 6.2c.2.6 1.1.6 1.3 0Z";
export const NavSend = (p: P) => (
  <svg {...line(p)}>
    <path d={PLANE} />
    <path d="m10.1 13.9 10.5-10.5" />
  </svg>
);
export const NavSendOn = (p: P) => (
  <svg {...solid(p)}>
    <path d={PLANE} />
  </svg>
);
