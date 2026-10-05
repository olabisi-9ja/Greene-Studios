import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import PageIntro from "@/components/ui/PageIntro";
import Price from "@/components/ui/Price";
import Services from "@/components/home/Services";
import NextPage from "@/components/home/NextPage";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand identity, websites, web and mobile apps, and ongoing design and development, from Greene Studios.",
  alternates: { canonical: "/services" },
};

/** Services: the four groups led by our work, then every service on its own line. */
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        lottie="services-intro"
        label="Services"
        title="What we can do for you."
        lead="Brands, websites and apps, designed and built by one team."
      />

      <Services />

      <section className="mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">Every service</h2>
          <Link href="/pricing" className="font-semibold underline-offset-4 hover:underline">
            See packages and prices <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="m-0 mt-10 list-none border-t border-[var(--brand-border)] p-0">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="group grid gap-2 border-b border-[var(--brand-border)] py-6 transition-colors hover:text-[var(--logo)] md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8"
              >
                <span className="text-2xl font-semibold tracking-[-0.03em]">{s.title}</span>
                <span className="text-[var(--brand-text-secondary)]">{s.shortDesc || s.description}</span>
                <span className="flex items-center gap-4 text-sm text-[var(--brand-text-secondary)]">
                  <Price usd={s.fromUsd} from />
                  <span aria-hidden="true" className="text-lg text-[var(--brand-text)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NextPage />
    </>
  );
}
