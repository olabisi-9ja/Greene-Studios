"use client";

import Link from "next/link";
import { IconMoon, IconSun, IconClover, IconBone } from "@/components/icons/GreeneIcons";
import Runner from "@/components/brand/Runner";
import { useAtmosphere, type VisualMode } from "@/lib/context/AtmosphereContext";
import { useChromeHidden } from "@/lib/hooks/useChromeHidden";
import { cn } from "@/lib/utils";

/** Tapping the switch steps through the themes in this order. */
const THEMES: { mode: VisualMode; name: string; Icon: typeof IconMoon }[] = [
  { mode: "dark", name: "Moon", Icon: IconMoon },
  { mode: "light", name: "Sun", Icon: IconSun },
  { mode: "studio", name: "Studio", Icon: IconClover },
  { mode: "raw", name: "Raw", Icon: IconBone },
];

/**
 * Top of every page: the running mark (left), the wordmark (centre) and one
 * theme switch (right) that steps moon → sun → studio → raw. No navigation here; that lives in the dock.
 */
export default function TopBar() {
  const hidden = useChromeHidden();
  const { effectiveMode, setMode } = useAtmosphere();
  const i = Math.max(0, THEMES.findIndex((t) => t.mode === effectiveMode));
  const current = THEMES[i];
  const next = THEMES[(i + 1) % THEMES.length];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        hidden && "-translate-y-full",
      )}
    >
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" aria-label="Greene Studios, home" className="text-[var(--logo)]">
          <Runner mode="scroll" className="h-11 w-auto sm:h-14" title="Greene Studios" />
        </Link>

        <Link href="/" className="wordmark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.45rem] sm:text-[2.1rem]" aria-hidden="true" tabIndex={-1}>
          Greene
        </Link>

        <button
          type="button"
          onClick={() => setMode(next.mode)}
          aria-label={`Theme: ${current.name}. Switch to ${next.name}.`}
          title={`${current.name} theme (tap for ${next.name})`}
          className="grid size-10 place-items-center rounded-[6px] border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-bg)_80%,transparent)] text-[var(--brand-text)] backdrop-blur-md transition-colors hover:border-[var(--brand-text)] sm:size-11"
        >
          <current.Icon className="size-5" />
        </button>
      </div>
    </header>
  );
}
