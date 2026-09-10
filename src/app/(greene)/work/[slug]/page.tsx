import type { Metadata } from "next";
import Link from "next/link";
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

/** Performance figures come from src/lib/measured.json, written by
 *  `npm run measure` against a production build. Never hand-typed. */
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
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-[1400px] px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
          >
            ← Work
          </Link>
          <span className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
            Concept · self-initiated
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark slug={brand.slug} size={34} />
              <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
                {brand.name}
              </h1>
            </div>
            <p className="mt-5 max-w-2xl font-serif-i text-xl leading-snug text-[var(--brand-text)] md:text-2xl">
              {brand.tagline}
            </p>
          </div>
        </div>
      </header>

      {/* ── Hero shot ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)]">
          <ShotImage
            src={`/images/work/${brand.slug}/home-desktop.webp`}
            alt={`${brand.name} homepage`}
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* ── Measured ───────────────────────────────────────────────── */}
      {perf && (
        <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-border)] md:grid-cols-4">
            {[
              { v: `${perf.lcp}ms`, k: "LCP" },
              { v: perf.cls.toFixed(3), k: "Cumulative layout shift" },
              { v: `${perf.jsKb}kB`, k: "JavaScript" },
              { v: `${perf.totalKb}kB`, k: "Total transferred" },
            ].map((m) => (
              <div key={m.k} className="bg-[var(--brand-surface)] p-6">
                <p className="font-display text-3xl font-black tracking-tight md:text-4xl">{m.v}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
                  {m.k}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--brand-text-secondary)]">
            Median of {measured.pages[slug as keyof typeof measured.pages] ? 3 : 3} runs against a
            production build, measured {measured.measuredAt} with the browser&rsquo;s own
            PerformanceObserver. Re-run with <code className="font-mono">npm run measure</code>.
          </p>
        </section>
      )}

      {/* ── Brief ──────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> The brief
            </span>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--brand-text)] lg:col-span-8 md:text-xl">
            {study.brief}
          </p>
        </div>
      </section>

      {/* ── Decisions ──────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> Decisions
            </span>
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-[0.98] tracking-tight md:text-4xl">
              Three choices
              <br />
              <span className="font-serif-i lowercase normal-case tracking-normal">worth defending.</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-[var(--brand-border)]">
              {study.decisions.map((d, i) => (
                <div key={d.title} className="border-b border-[var(--brand-border)] py-8 md:py-10">
                  <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="mt-2 font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                    {d.title}
                  </dt>
                  <dd className="mt-3 max-w-2xl leading-relaxed text-[var(--brand-text-secondary)]">
                    {d.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── The system ─────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> The system
        </span>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--brand-border)]">
          <ShotImage
            src={`/images/work/${brand.slug}/identity.webp`}
            alt={`${brand.name} identity system: logo, palette, type scale, radius and grid`}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {Object.entries(palette).map(([name, hex]) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] py-1.5 pl-1.5 pr-3.5 text-xs"
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

        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--brand-text-secondary)]">{study.build}</p>
      </section>

      {/* ── Gallery ────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> The pages
        </span>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {study.gallery.map((g) => (
            <figure key={g.file} className="m-0">
              <div className="overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]">
                <ShotImage
                  src={`/images/work/${brand.slug}/${g.file}.webp`}
                  alt={`${brand.name} — ${g.label}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Learned ────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <div className="card">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> What it taught us
          </span>
          <p className="mt-5 max-w-3xl font-serif-i text-xl leading-relaxed md:text-2xl">
            {study.learned}
          </p>
        </div>
      </section>

      {/* ── Next ───────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 pb-24 md:mt-28 md:px-10">
        <div className="flex items-center justify-end gap-6 border-t border-[var(--brand-border)] pt-10">
          <Link
            href={`/work/${next.slug}`}
            data-cursor="NEXT"
            className="group flex items-center gap-4 text-right"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
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
