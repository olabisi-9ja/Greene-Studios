/**
 * The one section header on the homepage: a numbered mono chip, a
 * sentence-case headline, and an optional note set beside it.
 *
 * Replaces the `✦ EYEBROW` + uppercase-black-display pair the sections each
 * hand-rolled. The chip numbers the page rather than decorating it, so a
 * reader always knows how far through they are.
 */
export default function SectionHead({
  index,
  title,
  note,
  action,
  className,
}: {
  /** Two-digit marker, e.g. "01". */
  index: string;
  title: React.ReactNode;
  /** Short paragraph set to the right of the title on wide screens. */
  note?: React.ReactNode;
  /** A link or button pinned to the end of the row. */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["mb-12 md:mb-16", className].filter(Boolean).join(" ")}>
      <span className="chip-mono">{index}</span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2 className="headline max-w-3xl text-[clamp(2.1rem,4.4vw,3.75rem)]">{title}</h2>

        {note ? (
          <p className="max-w-sm text-base leading-snug text-[var(--brand-text-secondary)] md:shrink-0">
            {note}
          </p>
        ) : null}

        {action ? <div className="md:shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
