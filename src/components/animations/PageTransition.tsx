"use client";

import { usePathname } from "next/navigation";

/**
 * Fades each route in on mount. Keyed on pathname so React remounts the
 * wrapper — the CSS animation then replays. No animation library.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
