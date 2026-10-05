/**
 * Greene's own icon set: 24px grid, 1.75 stroke, square caps.
 * Drawn for this site instead of pulling a stock icon library.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  ...props,
});

export const IconMoon = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 15.2A8 8 0 0 1 8.8 5 8 8 0 1 0 19 15.2Z" />
  </svg>
);

export const IconSun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
  </svg>
);

/** Four heart leaves, as on the runner's clover. */
export const IconClover = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 11.2C10.6 9.6 7.4 9 6.6 7.4 5.7 5.6 7.6 3.8 9.4 4.7c.4-1.9 3-2 3.4 0 .8 1.6-.2 4.7-.8 6.5Z" />
    <path d="M12.8 12c1.6-1.4 2.2-4.6 3.8-5.4 1.8-.9 3.6 1 2.7 2.8 1.9.4 2 3 0 3.4-1.6.8-4.7-.2-6.5-.8Z" />
    <path d="M12 12.8c1.4 1.6 4.6 2.2 5.4 3.8.9 1.8-1 3.6-2.8 2.7-.4 1.9-3 2-3.4 0-.8-1.6.2-4.7.8-6.5Z" />
    <path d="M11.2 12c-1.6 1.4-2.2 4.6-3.8 5.4-1.8.9-3.6-1-2.7-2.8-1.9-.4-2-3 0-3.4 1.6-.8 4.7.2 6.5.8Z" />
  </svg>
);

/** A bone: the skeleton of the site. */
export const IconBone = (p: P) => (
  <svg {...base(p)}>
    <path d="M8.6 15.4 15.4 8.6M15.4 8.6a2.4 2.4 0 1 1 3.3-3.3 2.4 2.4 0 1 1-3.3 3.3ZM8.6 15.4a2.4 2.4 0 1 1-3.3 3.3 2.4 2.4 0 1 1 3.3-3.3Z" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);
