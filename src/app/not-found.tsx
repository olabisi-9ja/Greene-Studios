import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--brand-bg)] px-6 text-center text-[var(--brand-text)] transition-colors duration-1000">
      {/* Big 404 */}
      <div className="font-display select-none text-[22vw] font-black uppercase leading-none tracking-tight text-outline">
        404
      </div>

      <div className="relative z-10 -mt-6 md:-mt-10">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[var(--brand-accent)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--brand-accent)]">
            Page not found
          </span>
          <span className="h-px w-10 bg-[var(--brand-accent)]" />
        </div>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
          This page doesn&apos;t <span className="font-serif-i lowercase normal-case tracking-normal">exist.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--brand-text-secondary)]">
          But our portfolio does. Head back to explore work that actually exists.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" data-cursor="HOME" className="btn-primary">
            Back to home <span aria-hidden="true">→</span>
          </Link>
          <Link href="/work" data-cursor="VIEW" className="btn-outline">
            View work
          </Link>
        </div>
      </div>

      <p className="absolute bottom-8 text-xs font-medium text-[var(--brand-text-secondary)]/60">
        psst — try the Konami Code ↑↑↓↓←→←→BA
      </p>
    </div>
  );
}
