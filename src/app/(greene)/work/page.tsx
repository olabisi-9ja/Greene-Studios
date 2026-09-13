import type { Metadata } from "next";
import { SHIPPED } from "@/lib/shipped";
import { BRANDS } from "@/lib/brands";
import { ShippedCard, ConceptCard, WorkSectionHeading } from "@/components/work/WorkCards";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live sites built for people, and six concept brand systems built end to end. Greene Studios, available worldwide.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <PageHeader
        kicker="Work"
        title={
          <>
            Things we made
            <br />
            that are live
          </>
        }
        description={`${SHIPPED.length} sites running on the internet right now, and ${BRANDS.length} concept brand systems built end to end. Every link opens the real thing.`}
        right={
          <p className="font-display text-6xl font-black leading-none text-outline md:text-7xl">
            {SHIPPED.length + BRANDS.length}
          </p>
        }
      />

      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <WorkSectionHeading title="Shipped" meta={`${SHIPPED.length} live sites`} />
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPPED.map((project) => (
            <li key={project.slug}>
              <ShippedCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-5 pb-24 md:px-10">
        <WorkSectionHeading title="Concept systems" meta={`Self-initiated, ${BRANDS.length} brands`} />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
          Six brands invented and built end to end, identity, interface, copy and code, to work
          through problems a client brief rarely leaves room for. Each one is a running site, not a
          mockup. None of them is a company you can buy from.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((brand) => (
            <li key={brand.slug}>
              <ConceptCard brand={brand} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
