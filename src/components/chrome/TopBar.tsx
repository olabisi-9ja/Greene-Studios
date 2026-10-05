"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconMoon, IconSun, IconClover, IconBone } from "@/components/icons/GreeneIcons";
import Runner from "@/components/brand/Runner";
import { useAtmosphere, type VisualMode } from "@/lib/context/AtmosphereContext";

/** Tapping the switch steps through the themes in this order. */
const THEMES: { mode: VisualMode; name: string; Icon: typeof IconMoon }[] = [
  { mode: "dark", name: "Moon", Icon: IconMoon },
  { mode: "light", name: "Sun", Icon: IconSun },
  { mode: "studio", name: "Studio", Icon: IconClover },
  { mode: "raw", name: "Raw", Icon: IconBone },
];

/**
 * Top of every page: the running mark (left), the wordmark (centre) and one
 * theme switch (right) that steps moon → sun → studio → raw. Always in
 * place; only the dock at the bottom hides on scroll. A solid bar in the
 * page colour (clear only over a dark full-bleed hero).
 */
export default function TopBar() {
  const { effectiveMode, setMode } = useAtmosphere();
  // over a dark full-bleed hero the brand green lifts so it stays readable
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const on = () => {
      const hero = document.querySelector("[data-dark-hero]");
      setOverDark(Boolean(hero && hero.getBoundingClientRect().bottom > 70));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);
  const i = Math.max(0, THEMES.findIndex((t) => t.mode === effectiveMode));
  const current = THEMES[i];
  const next = THEMES[(i + 1) % THEMES.length];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${overDark ? "[--logo:#5fbf8a]" : "bg-[var(--brand-bg)]"}`}>
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" aria-label="Greene Studios, home" className="text-[var(--logo)]">
          <span data-slot="logo" className="block">
          <Runner mode="scroll" className="h-11 w-auto sm:h-14" title="Greene Studios" />
          </span>
        </Link>

        <Link href="/" data-slot="wordmark" className="wordmark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.45rem] leading-none sm:text-[2.1rem]" aria-hidden="true" tabIndex={-1}>
          Greene
        </Link>

        <button
          type="button"
          onClick={() => setMode(next.mode)}
          data-tour="theme"
          aria-label={`Theme: ${current.name}. Switch to ${next.name}.`}
          title={`${current.name} theme (tap for ${next.name})`}
          className="grid size-10 place-items-center text-[var(--logo)] transition-transform hover:rotate-12 active:scale-90 sm:size-11"
        >
          <current.Icon className="size-6" />
        </button>
      </div>
    </header>
  );
}
