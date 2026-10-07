import Link from "next/link";
import RollLabel from "@/components/ui/RollLabel";

/**
 * The label button: text on a light plate, an arrow in a dark square.
 * The label rolls on hover.
 */
export function PlateLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-11 items-stretch overflow-hidden rounded-[4px] bg-[var(--brand-surface)] font-mono text-sm font-semibold uppercase tracking-[0.06em] text-[var(--brand-text)] shadow-[0_1px_0_rgba(0,0,0,0.04)] ${className}`}
    >
      <span className="flex items-center px-4">
        <RollLabel text={children} />
      </span>
      <span className="m-1 grid aspect-square place-items-center rounded-[3px] bg-[var(--brand-text)] text-[var(--brand-bg)] transition-transform duration-300 group-hover:translate-x-0.5">
        <svg viewBox="0 0 10 10" className="size-2.5" fill="currentColor" aria-hidden="true">
          <path d="M2 1l6 4-6 4z" />
        </svg>
      </span>
    </Link>
  );
}
