import Link from "next/link";
import { SHIPPED } from "@/lib/shipped";
import { BRANDS } from "@/lib/brands";
import { ShippedCard, ConceptCard, WorkSectionHeading } from "@/components/work/WorkCards";

/**
 * The homepage's work section — the same two tiers as /work, cut down.
 *
 * Six shipped, three concept, then a link to the rest. Shipped leads here for
 * the same reason it leads on /work: it is the only work a visitor can verify
 * in one click.
 */
export default function SelectedWork() {
  const shipped = SHIPPED.slice(0, 6);
  const concept = BRANDS.slice(0, 3);

  return (
    <section className="bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> Selected work
            </span>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              Live sites,
              <br />
              <span className="font-serif-i lowercase normal-case tracking-normal">not mockups.</span>
            </h2>
          </div>
          <Link
            href="/work"
            data-cursor="SEE"
            className="btn-outline shrink-0"
          >
            All work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shipped.map((project) => (
            <li key={project.slug}>
              <ShippedCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <WorkSectionHeading title="Concept systems" meta="Self-initiated" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {concept.map((brand) => (
              <li key={brand.slug}>
                <ConceptCard brand={brand} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
