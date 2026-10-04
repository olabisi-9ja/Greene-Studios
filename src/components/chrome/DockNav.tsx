"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconHomeFill,
  IconWork,
  IconWorkFill,
  IconNib,
  IconNibFill,
  IconMail,
  IconMailFill,
} from "@/components/icons/GreeneIcons";
import { useChromeHidden } from "@/lib/hooks/useChromeHidden";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", Icon: IconHome, Active: IconHomeFill },
  { href: "/work", label: "Work", Icon: IconWork, Active: IconWorkFill },
  { href: "/services", label: "Services", Icon: IconNib, Active: IconNibFill },
  { href: "/contact", label: "Start a project", Icon: IconMail, Active: IconMailFill },
];

/**
 * Four separate floating tiles, icons only. The current page shows a filled
 * icon. Hides while scrolling down; returns on any scroll up.
 */
export default function DockNav() {
  const hidden = useChromeHidden();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        hidden && "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0",
      )}
    >
      <ul className="m-0 flex list-none items-center gap-2 p-0">
        {LINKS.map(({ href, label, Icon, Active }) => {
          const on = href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));
          const Glyph = on ? Active : Icon;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                title={label}
                aria-current={on ? "page" : undefined}
                className="grid size-[58px] place-items-center rounded-[18px] bg-[var(--dock-bg)] text-[var(--dock-fg)] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 sm:size-16 sm:rounded-[20px]"
              >
                <Glyph className={cn("size-[26px]", !on && "opacity-90")} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
