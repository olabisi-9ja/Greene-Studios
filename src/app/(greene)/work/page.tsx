import type { Metadata } from "next";
import Link from "next/link";
import Work from "@/components/home/Work";
import { SHIPPED } from "@/lib/shipped";

export const metadata: Metadata = {
  title: "Work",
  description: "Brands, websites and apps by Greene Studios, and the sites we have running live.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <Work title="Work" all={false} lottie="work" heading="h1" />

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8">
        <h2 className="text-display font-semibold leading-none tracking-[-0.04em]">Live sites</h2>
        <ul className="m-0 mt-10 list-none border-t border-[var(--brand-border)] p-0">
          {SHIPPED.map((p) => (
            <li key={p.slug}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid gap-1 border-b border-[var(--brand-border)] py-5 transition-colors hover:text-[var(--logo)] sm:grid-cols-[1fr_1.4fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="text-title font-semibold tracking-[-0.02em]">{p.name}</span>
                <span className="text-[var(--brand-text-secondary)]">{p.summary}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
        <Link
          href="/gallery"
          className="group flex items-end justify-between gap-6 border-t border-[var(--brand-border)] pt-10 text-display font-semibold leading-[0.95] tracking-[-0.045em] hover:text-[var(--logo)]"
        >
          See everything
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </section>
    </div>
  );
}
