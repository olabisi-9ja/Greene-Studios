import Link from "next/link";
import { SHIPPED } from "@/lib/shipped";
import { BRANDS } from "@/lib/brands";
import { ShippedCard, ConceptCard, WorkSectionHeading } from "@/components/work/WorkCards";
import SectionHead from "@/components/ui/SectionHead";
import RollLabel from "@/components/ui/RollLabel";

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
    <section className="bg-[var(--brand-bg)] py-20 text-[var(--brand-text)] md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="01 · Selected work"
          title={<>Live sites, not mockups.</>}
          action={
            <Link href="/work" data-cursor="SEE" className="group btn-block btn-block-ghost">
              <RollLabel text="All work" />
            </Link>
          }
        />

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
