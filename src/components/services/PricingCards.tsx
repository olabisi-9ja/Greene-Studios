import Link from "next/link";
import { ADD_ONS, PACKAGES } from "@/lib/offer";

/**
 * The rate card, laid out like a pricing deck: one panel, a column per
 * package split by thin rules. Each column: the name, the outcome, the
 * scope, then the price, the timeline and one button.
 */
const label = "text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]";

export default function PricingCards() {
  return (
    <div>
      <div className="overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[var(--brand-surface)]">
        <ol className="m-0 grid list-none grid-cols-1 p-0 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <li
              key={p.id}
              className="flex flex-col border-[var(--brand-border)] p-8 max-xl:border-b md:[&:nth-child(odd)]:border-r xl:border-r xl:last:border-r-0 sm:p-10"
            >
              <h3 className="text-[clamp(1.9rem,2.6vw,2.4rem)] font-extrabold leading-none tracking-[-0.04em]">{p.name}</h3>

              <p className={`${label} mt-10`}>Outcome</p>
              <p className="mt-3 leading-relaxed">{p.outcome}</p>

              <p className={`${label} mt-10`}>Scope breakdown</p>
              <ul className="mt-4 flex-1 list-disc space-y-2 pl-5 marker:text-[var(--brand-text-secondary)]">
                {p.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              <div className="mt-10 border-t border-[var(--brand-border)] pt-6">
                <p className="text-[1.9rem] font-extrabold leading-none tracking-[-0.03em]">{p.price}</p>
                <p className="mt-2 text-sm text-[var(--brand-text-secondary)]">{p.timeline}</p>
                <Link
                  href={`/contact?package=${p.id}`}
                  className="mt-6 flex h-12 items-center justify-center rounded-[6px] bg-[var(--brand-text)] font-medium text-[var(--brand-bg)] transition-opacity hover:opacity-90"
                >
                  {p.cta}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>

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

      <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[20px] bg-[var(--brand-surface-secondary)] p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">Not sure which fits?</h3>
          <p className="mt-2 text-[var(--brand-text-secondary)]">Answer six questions. Get a recommendation.</p>
        </div>
        <Link href="/start" className="inline-flex h-12 shrink-0 items-center rounded-[6px] bg-[var(--logo)] px-6 font-medium text-[var(--brand-bg)]">
          Take the quiz
        </Link>
      </div>
    </div>
  );
}
