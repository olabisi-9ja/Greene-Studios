export default function SectionHead({
  index,
  title,
  note,
  action,
  className,
}: {
  index: string;
  title: React.ReactNode;
  note?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  const label = index.includes("·") ? index.split("·")[1]?.trim() || index : index;
  const cleanLabel = label.replace(/^\d+\s*·?\s*/, "").trim() || label;

  return (
    <div className={["mb-12 md:mb-16", className].filter(Boolean).join(" ")}>
      <span className="chip-mono">{cleanLabel}</span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2 className="headline max-w-3xl text-[clamp(1.89rem, 4.4vw, 3.07rem)]">{title}</h2>

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
