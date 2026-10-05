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
 * theme switch (right) that steps moon → sun → studio → raw. No bar behind
 * them: the mark and the switch are solid like the dock's buttons, the
 * wordmark is bare text with a halo in the page colour. Always in
 * place; only the dock at the bottom hides on scroll.
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
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 ${overDark ? "[--logo:#5fbf8a]" : ""}`}>
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" aria-label="Greene Studios, home" className="pointer-events-auto grid size-12 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-bg)] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 active:scale-90 sm:size-14">
          <span data-slot="logo" className="block">
          <Runner mode="scroll" className="h-8 w-auto sm:h-9" title="Greene Studios" />
          </span>
        </Link>

        <Link href="/" data-slot="wordmark" className="wordmark wordmark-float pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.45rem] leading-none sm:text-[2.1rem]" aria-hidden="true" tabIndex={-1}>
          Greene
        </Link>

        <button
          type="button"
          onClick={() => setMode(next.mode)}
          data-tour="theme"
          aria-label={`Theme: ${current.name}. Switch to ${next.name}.`}
          title={`${current.name} theme (tap for ${next.name})`}
          className="pointer-events-auto grid size-12 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-bg)] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 active:scale-90 sm:size-14"
        >
          <current.Icon className="size-5 sm:size-6" />
        </button>
      </div>
    </header>
  );
}
