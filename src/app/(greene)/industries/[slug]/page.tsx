import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { INDUSTRIES, SERVICES } from "@/lib/data";
import { ConceptCard } from "@/components/work/WorkCards";
import { BRANDS_BY_SLUG } from "@/lib/brands";
import PageHeader from "@/components/ui/PageHeader";
import CTASection from "@/components/home/CTASection";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name} · Design & Development for ${industry.name}`,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  const index = INDUSTRIES.findIndex((i) => i.slug === slug);
  const next = INDUSTRIES[(index + 1) % INDUSTRIES.length];
  const services = industry.services
    .map((href) => SERVICES.find((s) => s.href === href))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const work = industry.work
    .map((w) => BRANDS_BY_SLUG[w])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Industries", item: `${base}/industries` },
              { "@type": "ListItem", position: 2, name: industry.name, item: `${base}/industries/${industry.slug}` },
            ],
          }),
        }}
      />
      <PageHeader
        kicker={`Industries · ${industry.name}`}
        title={
          <>
            {industry.tagline.split(".")[0]} .
          </>
        }
        description={industry.description}
        right={
          <div className="flex flex-col md:items-end md:text-right">
            <span className="font-display text-6xl font-black leading-none tracking-tight md:text-7xl">
              {industry.stat.value}
            </span>
            <span className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
              {industry.stat.label}
            </span>
          </div>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Challenges */}
        <section className="border-t border-[var(--brand-border)] py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ The symptoms
              </span>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-4xl">
                What {industry.name.toLowerCase()} teams hire us to fix
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col border-t border-[var(--brand-border)]">
                {industry.challenges.map((c, i) => (
                  <div key={c.title} className="flex flex-col gap-2 border-b border-[var(--brand-border)] py-7 md:flex-row md:items-baseline md:gap-10">
                    <span className="font-mono text-sm text-[var(--brand-accent)]">
                      
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-black uppercase tracking-tight md:text-2xl">{c.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Moves */}
        <section className="border-t border-[var(--brand-border)] py-16 md:py-24">
          <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
            ✦ The response
          </span>
          <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-4xl">
            How we move
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {industry.moves.map((m, i) => (
              <div
                key={m.title}
                className="group card card-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--brand-accent)]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
<h3 className="mt-4 font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Relevant services */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
              Capabilities we bring
            </span>
            {services.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                data-cursor="GO"
                className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] transition-all duration-300 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Related work */}
        {work.length > 0 ? (
          <section className="border-t border-[var(--brand-border)] py-16 md:py-24">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-4xl">
                Proof in {industry.name.toLowerCase()}.
              </h2>
              <Link
                href="/work"
                data-cursor="GO"
                className="hidden text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] sm:block"
              >
                All projects →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {work.map((p) => (
                <ConceptCard key={p.slug} brand={p} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Next industry */}
        <section className="border-t border-[var(--brand-border)] py-14">
          <Link href={`/industries/${next.slug}`} data-cursor="NEXT" className="group flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              Next sector
            </span>
            <span className="flex items-baseline gap-4">
              <span className="font-display text-[clamp(1.8rem, 5vw, 3.28rem)] font-black uppercase leading-none tracking-tight transition-colors group-hover:text-[var(--brand-accent)]">
                {next.name}
              </span>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      </div>

      <CTASection />
    </div>
  );
}
