import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPED } from "@/lib/shipped";
import { BRANDS } from "@/lib/brands";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Work archive",
  description: "Every Greene Studios project in one list, shipped sites and concept systems.",
};

/**
 * The whole book as one scannable index. `/work` is the presented version;
 * this is the list you scroll when you want to see everything at once.
 */
type Row = {
  key: string;
  name: string;
  kind: string;
  meta: string;
  href: string;
  external: boolean;
};

const ROWS: Row[] = [
  ...SHIPPED.map((p) => ({
    key: p.slug,
    name: p.name,
    kind: "Shipped",
    meta: `${p.tags.join(" · ")}, ${p.platform}`,
    href: p.url,
    external: true,
  })),
  ...BRANDS.map((b) => ({
    key: b.slug,
    name: b.name,
    kind: "Concept",
    meta: b.sector,
    href: `/work/${b.slug}`,
    external: false,
  })),
];

function Row({ row, index }: { row: Row; index: number }) {
  const inner = (
    <div className="flex items-center gap-5 py-7 md:gap-8 md:py-9">
      <span className="flex h-2 w-2 shrink-0 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
          {row.name}
        </h2>
        <p className="mt-1.5 truncate text-xs text-[var(--brand-text-secondary)] md:text-sm">
          {row.meta}
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">
        {row.kind}
      </span>
      <span
        aria-hidden="true"
        className="hidden shrink-0 text-[var(--brand-text-secondary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand-accent)] sm:block"
      >
        {row.external ? "↗" : "→"}
      </span>
    </div>
  );

  const className = "group block border-b border-[var(--brand-border)]";

  return row.external ? (
    <a href={row.href} target="_blank" rel="noreferrer" data-cursor="VISIT" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={row.href} data-cursor="READ" className={className}>
      {inner}
    </Link>
  );
}

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)]">
      <PageHeader
        kicker="Archive"
        title={
          <>
            Everything, in one list.
          </>
        }
        description={`${SHIPPED.length} shipped sites and ${BRANDS.length} concept systems.`}
        right={
          <Link
            href="/work"
            data-cursor="BACK"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
          >
            <span aria-hidden="true">←</span> Back to work
          </Link>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col border-t border-[var(--brand-border)]">
          {ROWS.map((row, i) => (
            <Row key={`${row.kind}-${row.key}`} row={row} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
