import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/offer";
import { IconArrow } from "@/components/icons/GreeneIcons";

/** What the studio does, as four plain lists. Pricing is one quiet link. */
export default function ServicesOverview() {
  return (
    <section className="border-t border-[var(--brand-border)] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-none tracking-[-0.04em]">What we do</h2>
          <p className="text-lg text-[var(--brand-text-secondary)] lg:justify-self-end">Designed and built in-house.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_GROUPS.map((g, i) => (
            <div key={g.id} className="border-t-2 border-[var(--brand-text)] pt-5">
              <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.02em]">
                <span className="font-mono text-xs text-[var(--brand-text-secondary)]">{String(i + 1).padStart(2, "0")}</span>
                {g.title}
              </h3>
              <ul className="mt-5 list-none space-y-2.5 p-0 text-[var(--brand-text-secondary)]">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <Link href="/start" className="inline-flex items-center gap-1.5 font-medium text-[var(--brand-accent)] underline-offset-4 hover:underline">
            Find the right starting point <IconArrow className="size-4" />
          </Link>
          <Link href="/pricing" className="text-[var(--brand-text-secondary)] underline-offset-4 hover:underline">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
