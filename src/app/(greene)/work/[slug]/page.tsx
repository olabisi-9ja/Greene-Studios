import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShotImage } from "@/components/work/ShotImage";
import { notFound } from "next/navigation";
import { BRANDS, BRANDS_BY_SLUG } from "@/lib/brands";
import { CASE_STUDIES } from "@/lib/brands/casestudy";
import { BrandMark } from "@/components/demo/BrandMark";
import measured from "@/lib/measured.json";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug];
  if (!brand) return { title: "Not found" };
  return {
    title: `${brand.name} · Case study`,
    description: brand.direction,
  };
}

type Measured = { lcp: number; cls: number; jsKb: number; totalKb: number };
const PAGES = measured.pages as Record<string, Measured>;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug];
  const study = CASE_STUDIES[slug];
  if (!brand || !study) notFound();

  const perf = PAGES[slug];
  const index = BRANDS.findIndex((b) => b.slug === slug);
  const next = BRANDS[(index + 1) % BRANDS.length];
  const palette = brand.palette.light;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      {/* Fourmula.ai inspired header: centered, massive, lots of whitespace */}
      <header className="mx-auto max-w-[1400px] px-5 pb-10 pt-28 text-center md:px-10 md:pb-14 md:pt-36">
        <div className="mx-auto flex max-w-fit items-center justify-center gap-3 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-1.5">
          <Link
            href="/work"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]"
          >
            ← Work
          </Link>
          <span className="h-3 w-px bg-[var(--brand-border)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
            Concept · self-initiated
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)]">
            <BrandMark slug={brand.slug} size={28} />
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.52rem, 8vw, 5.33rem)] font-black uppercase leading-[0.9] tracking-tight">
            {brand.name}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-snug text-[var(--brand-text-secondary)] md:text-xl">
            {brand.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[var(--brand-text-secondary)]">
            {brand.direction}
          </p>
        </div>
      </header>

      {/* Hero duo — fourmula grid: screenshot + generated lifestyle (no more placeholder box) */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-4 md:grid-cols-[1.7fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]">
            <ShotImage
              src={`/images/work/${brand.slug}/home-desktop.webp`}
              alt={`${brand.name} homepage`}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/work/${brand.slug}/cover-lifestyle.jpg`}
                alt={`${brand.name} lifestyle visual`}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                Generated visual
              </span>
            </div>
          </div>
        </div>
      </div>

      {perf && (
        <section className="mx-auto mt-10 max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-border)] md:grid-cols-4">
            {[
              { v: `${perf.lcp}ms`, k: "LCP" },
              { v: perf.cls.toFixed(3), k: "CLS" },
              { v: `${perf.jsKb}kB`, k: "JS" },
              { v: `${perf.totalKb}kB`, k: "Total" },
            ].map((m) => (
              <div key={m.k} className="bg-[var(--brand-surface)] p-5 text-center md:p-6">
                <p className="font-display text-2xl font-black tracking-tight md:text-3xl">{m.v}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
                  {m.k}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="chip-mono">Brief</span>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--brand-text)] lg:col-span-8 md:text-xl">
            {study.brief}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="chip-mono">Decisions</span>
            <h2 className="headline mt-4 text-3xl md:text-4xl">Choices worth defending</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
              No templates. Every decision earns its place — like Fourmula&apos;s PDPs, each visual is generated to a purpose.
            </p>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-[var(--brand-border)] border-y border-[var(--brand-border)]">
              {study.decisions.map((d) => (
                <div key={d.title} className="py-7 md:py-8">
                  <dt className="font-display text-lg font-black uppercase tracking-tight md:text-xl">
                    {d.title}
                  </dt>
                  <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--brand-text-secondary)]">
                    {d.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
        <span className="chip-mono">System</span>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--brand-border)]">
          <ShotImage
            src={`/images/work/${brand.slug}/identity.webp`}
            alt={`${brand.name} identity system: logo, palette, type scale, radius and grid`}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {Object.entries(palette).map(([name, hex]) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] py-1.5 pl-1.5 pr-3.5 text-xs"
            >
              <span
                className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10"
                style={{ background: hex }}
                aria-hidden="true"
              />
              <span className="font-mono text-[var(--brand-text-secondary)]">{hex}</span>
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-2xl leading-relaxed text-[var(--brand-text-secondary)]">{study.build}</p>
      </section>

      {/* Horizontal scroll — karolinahess.com inspired */}
      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="chip-mono">Pages</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
            Drag to explore
          </span>
        </div>
        <div data-h-scroll className="mt-6 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {study.gallery.map((g) => (
            <figure key={g.file} className="m-0 w-[84vw] max-w-[520px] shrink-0">
              <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]">
                <ShotImage
                  src={`/images/work/${brand.slug}/${g.file}.webp`}
                  alt={`${brand.name}, ${g.label}`}
                  sizes="520px"
                />
              </div>
              <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
                {g.label}
              </figcaption>
            </figure>
          ))}
          {/* Extra lifestyle card at end to ensure no placeholder box remains */}
          <figure className="m-0 w-[84vw] max-w-[520px] shrink-0">
            <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
              <div className="relative aspect-[16/10] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/work/${brand.slug}/cover-lifestyle.jpg`}
                  alt={`${brand.name} lifestyle`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
              Lifestyle · generated
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
        <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 md:p-10">
          <span className="chip-mono">Learned</span>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed md:text-2xl">{study.learned}</p>
          <div className="mt-8 flex items-center gap-3 border-t border-[var(--brand-border)] pt-6 text-sm text-[var(--brand-text-secondary)]">
            <span className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/character/greene-mascot.png" alt="" className="h-full w-full object-cover" />
            </span>
            <span>Greene character — appears consistently across the site, like Cardtonic&apos;s Upskill.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 pb-24 md:mt-24 md:px-10">
        <div className="flex items-center justify-end gap-6 border-t border-[var(--brand-border)] pt-10">
          <Link
            href={`/work/${next.slug}`}
            data-cursor="NEXT"
            className="group flex items-center gap-4 text-right"
          >
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-text-secondary)] md:inline">
              Next case study
            </span>
            <span className="font-display text-2xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
              {next.name} →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
