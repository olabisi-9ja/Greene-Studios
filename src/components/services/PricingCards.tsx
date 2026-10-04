import Link from "next/link";
import { ADD_ONS, PACKAGES } from "@/lib/offer";
import { IconArrow } from "@/components/icons/GreeneIcons";

/**
 * Four ways to work with the studio, laid out like a rate card: number,
 * name, one line, price, timeline, what's in it, one button each.
 * Then the smaller jobs as add-ons, and a route for the undecided.
 */
export default function PricingCards() {
  return (
    <div>
      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((p, i) => {
          const featured = Boolean(p.note);
          return (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-[6px] border p-7 ${
                featured
                  ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-on-accent)]"
                  : "border-[var(--brand-border)] bg-[var(--brand-surface)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-sm opacity-70">{String(i + 1).padStart(2, "0")}</span>
                {p.note && (
                  <span className="rounded-[3px] bg-[var(--brand-on-accent)] px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-[var(--brand-accent)]">
                    {p.note}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-[1.9rem] font-semibold leading-none tracking-[-0.035em]">{p.name}</h3>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${featured ? "opacity-85" : "text-[var(--brand-text-secondary)]"}`}>
                {p.pitch}
              </p>
              <div className={`my-6 border-t ${featured ? "border-current/25" : "border-[var(--brand-border)]"}`} />
              <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em]">{p.price}</p>
              <p className={`mt-2 text-sm ${featured ? "opacity-80" : "text-[var(--brand-text-secondary)]"}`}>{p.timeline}</p>
              <ul className="mt-6 flex-1 list-none space-y-2.5 p-0 text-[0.95rem]">
                {p.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-[0.55em] size-1.5 shrink-0 bg-current" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?package=${p.id}`}
                className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[4px] font-medium transition-opacity hover:opacity-90 ${
                  featured
                    ? "bg-[var(--brand-on-accent)] text-[var(--brand-accent)]"
                    : "bg-[var(--brand-text)] text-[var(--brand-bg)]"
                }`}
              >
                {p.cta} <IconArrow className="size-4" />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">Smaller jobs</h3>
          <p className="mt-3 max-w-[34ch] text-[var(--brand-text-secondary)]">
            Just need one thing?
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2">
          {ADD_ONS.map((a) => (
            <li key={a.name} className="flex items-baseline justify-between gap-4 border-b border-[var(--brand-border)] py-4">
              <span>{a.name}</span>
              <span className="font-mono text-sm text-[var(--brand-text-secondary)]">from {a.from}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[6px] bg-[var(--brand-surface-secondary)] p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">Not sure which fits?</h3>
          <p className="mt-2 text-[var(--brand-text-secondary)]">
            Answer six questions. Get a recommendation.
          </p>
        </div>
        <Link
          href="/start"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[4px] bg-[var(--brand-accent)] px-6 font-medium text-[var(--brand-on-accent)]"
        >
          Take the 2-minute quiz <IconArrow className="size-4" />
        </Link>
      </div>
    </div>
  );
}
