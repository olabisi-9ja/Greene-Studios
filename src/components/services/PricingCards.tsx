import Link from "next/link";
import { ADD_ONS, PACKAGES } from "@/lib/offer";

/**
 * The rate card: a row of package cards. Each leads with the price and the
 * button, then what's included. The package with a note is lifted out with
 * a coloured band and a filled button. Below, one full-width bar for anyone
 * unsure, then the smaller jobs.
 */
export default function PricingCards() {
  return (
    <div>
      <ol className="m-0 grid list-none grid-cols-1 items-start gap-5 p-0 md:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((p) => {
          const lifted = Boolean(p.note);
          return (
            <li
              key={p.id}
              className={`flex h-full flex-col overflow-hidden rounded-[14px] border bg-[var(--brand-surface)] ${
                lifted ? "border-[var(--brand-accent)] shadow-[0_20px_50px_-24px_rgb(15_81_50/0.45)]" : "border-[var(--brand-border)]"
              }`}
            >
              {lifted ? (
                <p className="m-0 bg-[var(--brand-accent)] py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-on-accent)]">
                  {p.note}
                </p>
              ) : (
                <p className="m-0 py-2 text-xs max-xl:hidden" aria-hidden="true">
                  &nbsp;
                </p>
              )}

              <div className="flex flex-1 flex-col px-7 pb-8 pt-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-4 text-[clamp(2rem,2.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]">{p.price}</p>
                <p className="mt-3 min-h-[3.2em] text-sm leading-relaxed text-[var(--brand-text-secondary)]">{p.pitch}</p>

                <Link
                  href={`/contact?package=${p.id}`}
                  className={`mt-6 flex h-12 items-center justify-center rounded-[6px] font-medium transition-opacity hover:opacity-90 ${
                    lifted
                      ? "bg-[var(--brand-accent)] text-[var(--brand-on-accent)]"
                      : "border border-[var(--brand-text)] text-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
                  }`}
                >
                  {p.cta}
                </Link>
                <p className="mt-3 text-center text-sm text-[var(--brand-text-secondary)]">{p.timeline}</p>

                <p className="mt-8 rounded-[6px] bg-[var(--brand-surface-secondary)] py-2 text-center text-xs font-semibold text-[var(--brand-text-secondary)]">
                  What you get
                </p>
                <ul className="m-0 mt-2 list-none p-0">
                  {p.includes.map((x) => (
                    <li key={x} className="border-b border-[var(--brand-border)] py-3 text-[0.95rem] last:border-b-0">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <Link
        href="/start"
        className="mt-5 flex flex-col items-start justify-between gap-2 rounded-[14px] border border-[var(--brand-border)] px-7 py-5 transition-colors hover:border-[var(--brand-text)] sm:flex-row sm:items-center"
      >
        <span className="font-semibold">Not sure which fits? Answer six questions and get a recommendation.</span>
        <span className="text-[var(--brand-text-secondary)]">Take the quiz →</span>
      </Link>

      <p className="mt-8 text-center text-sm text-[var(--brand-text-secondary)]">
        Every project is quoted after a short call. Two rounds of revisions included. You own all the files.
      </p>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">Smaller jobs</h3>
          <p className="mt-3 max-w-[34ch] text-[var(--brand-text-secondary)]">Just need one thing?</p>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2">
          {ADD_ONS.map((a) => (
            <li key={a.name} className="flex items-baseline justify-between gap-4 border-b border-[var(--brand-border)] py-4">
              <span>{a.name}</span>
              <span className="text-sm text-[var(--brand-text-secondary)]">from {a.from}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
