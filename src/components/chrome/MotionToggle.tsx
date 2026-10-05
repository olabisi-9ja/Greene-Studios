"use client";

import { setMotionOff, useMotionOff } from "@/lib/motion-pref";

/** The footer's animations switch: stops every looping animation on the site. */
export default function MotionToggle() {
  const off = useMotionOff();
  return (
    <button
      type="button"
      aria-pressed={off}
      onClick={() => setMotionOff(!off)}
      className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--brand-border)] px-2 py-1 text-[var(--brand-text)] hover:border-[var(--brand-text)]"
    >
      Animations {off ? "off" : "on"}
    </button>
  );
}
