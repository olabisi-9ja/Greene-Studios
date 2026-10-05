import Link from "next/link";

/**
 * What a project is, as small chips with an icon each (brand, app, site,
 * apparel, shop, print…), and the solid "View project" button.
 */
const I = (d: string) => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS: [RegExp, React.ReactNode][] = [
  [/brand|wordmark|identity/i, I("M12 21 6.5 12 9 3h6l2.5 9ZM12 21v-8M12 13a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z")],
  [/mobile|app$/i, I("M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5ZM11 18.5h2")],
  [/web app|dashboard|product design/i, I("M3.5 4.5h17v13h-17ZM3.5 8.5h17M8 21h8M12 17.5V21M7 12h4M7 14.5h7")],
  [/website|web|membership/i, I("M3 5h18v14H3ZM3 9h18M6 7h.01M8.5 7h.01")],
  [/apparel/i, I("M8 3 3.5 6l2 4 2-1V21h9V9l2 1 2-4L16 3a4 4 0 0 1-8 0Z")],
  [/commerce|shop|store/i, I("M5 8h14l-1 13H6ZM9 8V6a3 3 0 0 1 6 0v2")],
  [/print|poster|card/i, I("M6 2.5h9l3 3V21.5H6ZM9 10h6M9 13.5h6M9 17h4")],
  [/design system|system/i, I("M4 4h7v7H4ZM13 4h7v7h-7ZM4 13h7v7H4ZM13 13h7v7h-7Z")],
];

const iconFor = (label: string) => ICONS.find(([re]) => re.test(label))?.[1] ?? ICONS[0][1];

export function KindChips({ kind }: { kind: string }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="What we made">
      {kind.split("·").map((k) => k.trim()).map((k) => (
        <li
          key={k}
          className="inline-flex items-center gap-1.5 rounded-[6px] border border-[var(--brand-border)] bg-[var(--brand-surface)] px-2.5 py-1.5 text-sm text-[var(--brand-text)]"
        >
          <span className="text-[var(--logo)]">{iconFor(k)}</span>
          {k}
        </li>
      ))}
    </ul>
  );
}

export function ViewProject({ href }: { href: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 font-medium">
      View project
      <span className="grid size-10 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-bg)] transition-transform duration-300 group-hover:translate-x-1">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
