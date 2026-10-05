"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavHome, NavHomeOn, NavWork, NavWorkOn, NavSend, NavSendOn } from "@/components/icons/NavIcons";
import { useChromeHidden } from "@/lib/hooks/useChromeHidden";
import { cn } from "@/lib/utils";

/** Three places: home, the work, and starting a project. Everything else is a link away. */
const LINKS = [
  { href: "/", label: "Home", Icon: NavHome, Active: NavHomeOn },
  { href: "/work", label: "Work", Icon: NavWork, Active: NavWorkOn },
  { href: "/contact", label: "Start a project", Icon: NavSend, Active: NavSendOn },
];

/**
 * Three solid icons, each on a solid circle in the brand green so they read
 * over anything. The current page carries a ring. They step aside while you
 * scroll down and come back the moment you scroll up.
 */
export default function DockNav() {
  const hidden = useChromeHidden();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      data-tour="dock"
      className={cn(
        "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] sm:bottom-7",
        hidden && "pointer-events-none translate-y-[calc(100%+2.5rem)] opacity-0",
      )}
    >
      <ul className="m-0 flex list-none items-center gap-2 p-0">
        {LINKS.map(({ href, label, Active }) => {
          const on = href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));
          const Glyph = Active;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                title={label}
                aria-current={on ? "page" : undefined}
                className={cn("group grid size-9 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-bg)] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 active:scale-90", on && "ring-1 ring-[var(--logo)] ring-offset-[3px] ring-offset-[var(--brand-bg)]")}
              >
                <Glyph className="size-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
