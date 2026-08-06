interface PageHeaderProps {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  /** Optional right-hand column (meta, CTA, stats…) */
  right?: React.ReactNode;
  /** Optional content below the title/description row */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Shared editorial page header — used by every sub-page so the whole
 * site speaks one design language: ✦ kicker, giant Archivo display
 * title, italic accent words, glow atmosphere.
 */
export default function PageHeader({
  kicker,
  title,
  description,
  right,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* atmosphere */}
      <div
        className="pointer-events-none absolute -right-[14vw] -top-[30vh] h-[50vw] w-[50vw] rounded-full opacity-60 blur-[110px] glow-lime"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid-soft opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> {kicker}
        </span>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight text-[var(--brand-text)]">
            {title}
          </h1>
          {right ? (
            <div className="max-w-md lg:pb-2">{right}</div>
          ) : null}
        </div>

        {description ? (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
            {description}
          </p>
        ) : null}

        {children}
      </div>
    </div>
  );
}
