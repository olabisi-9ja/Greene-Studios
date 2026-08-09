import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Industries · Sectors We Serve",
  description:
    "SaaS, e-commerce, startups, finance, healthcare, education, personal brands and agencies. See how Greene Studios approaches the specific problems of your industry.",
  alternates: { canonical: "/industries" },
};

/**
 * Industries index — eight sectors, each a real destination with its
 * own challenges, approach and relevant work. Sector depth sells better
 * than generic "we work with everyone" agency copy.
 */
export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker={`Industries · ${String(INDUSTRIES.length).padStart(2, "0")} sectors`}
        title={
          <>
            Where we do our
            <br />
            <span className="font-serif-i lowercase normal-case tracking-normal">best work.</span>
          </>
        }
        description="Every sector has its own failure modes. We design for yours, specifically. Pick your industry to see the problems we fix and the work that proves it."
        right={
          <p className="max-w-xs text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-right">
            Deep sector knowledge beats generic agency process. Every time.
          </p>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              data-cursor="VIEW"
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--brand-accent)]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 70% 50% at 100% 0%, color-mix(in srgb, var(--brand-accent) 10%, transparent), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                <span className="text-2xl text-[var(--brand-accent)]" aria-hidden="true">{ind.icon}</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-on-accent)]"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <div className="relative">
                <h2 className="font-display text-2xl font-black uppercase tracking-tight">
                  {ind.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                  {ind.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
