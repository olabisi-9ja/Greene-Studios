import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/data";
import PageIntro from "@/components/ui/PageIntro";
import Price from "@/components/ui/Price";
import NextPage from "@/components/home/NextPage";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => SERVICES.find((s) => s.href === `/services/${slug}`);

/** Each service opens with the hero animation of its discipline. */
const LOTTIE: Record<string, string> = {
  "web-design": "hero-websites",
  "frontend-dev": "hero-websites",
  "seo-geo-aeo": "hero-websites",
  branding: "hero-brands",
  "motion-design": "hero-brands",
  "ui-ux": "hero-apps",
  "product-design": "hero-apps",
  "design-systems": "hero-apps",
  "web-applications": "hero-products",
  "ai-integration": "hero-products",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = find((await params).slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.description, alternates: { canonical: service.href } };
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.href.replace("/services/", "") }));
}

const h2 = "text-title font-semibold leading-[1] tracking-[-0.04em]";

/** One service: what it is, who it's for, how we go about it, what you get. */
export default async function ServicePage({ params }: Props) {
  const service = find((await params).slug);
  if (!service) notFound();
  const others = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Services", item: `${base}/services` },
              { "@type": "ListItem", position: 2, name: service.title, item: `${base}${service.href}` },
            ],
          }),
        }}
      />

      <PageIntro lottie={LOTTIE[service.id]} label="Service" title={service.title} lead={service.description} />

      <div className="mx-auto -mt-4 flex max-w-[1400px] flex-wrap items-center justify-center gap-6 px-5 pb-20 sm:px-8">
        <p className="text-title font-semibold tracking-[-0.03em]">
          <Price usd={service.fromUsd} from />
        </p>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center rounded-[6px] bg-[var(--brand-accent)] px-6 font-semibold text-[var(--brand-on-accent)] transition-opacity hover:opacity-90"
        >
          Start a project
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className={h2}>What it is</h2>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed">{service.whatIsIt}</p>
        </div>
        <div>
          <h2 className={h2}>Who it&apos;s for</h2>
          <ul className="m-0 mt-6 list-none border-t border-[var(--brand-border)] p-0">
            {service.whoItsFor.map((w) => (
              <li key={w} className="border-b border-[var(--brand-border)] py-4">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <h2 className={h2}>How we go about it</h2>
        <ul className="m-0 mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
          {service.approach.map((a) => (
            <li key={a.title} className="rounded-[12px] bg-[var(--brand-surface)] p-7 shadow-[0_1px_0_var(--brand-border)]">
              <h3 className="text-title font-semibold tracking-[-0.02em]">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--brand-text-secondary)]">{a.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className={h2}>What you get</h2>
          <ul className="m-0 mt-6 list-none border-t border-[var(--brand-border)] p-0">
            {service.deliverables.map((d) => (
              <li key={d} className="border-b border-[var(--brand-border)] py-4">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={h2}>Also from the studio</h2>
          <ul className="m-0 mt-6 list-none border-t border-[var(--brand-border)] p-0">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={o.href} className="flex items-baseline justify-between gap-4 border-b border-[var(--brand-border)] py-4 hover:text-[var(--logo)]">
                  <span className="font-semibold">{o.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="flex items-baseline justify-between gap-4 border-b border-[var(--brand-border)] py-4 hover:text-[var(--logo)]">
                <span className="font-semibold">All services</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <NextPage />
    </>
  );
}
