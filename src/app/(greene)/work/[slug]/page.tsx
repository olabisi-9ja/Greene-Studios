/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, BRANDS_BY_SLUG } from "@/lib/brands";
import { CASE_STUDIES } from "@/lib/brands/casestudy";
import { IconArrow } from "@/components/icons/GreeneIcons";

/**
 * Case study, media first (after Onda Studio's project pages): a full-bleed
 * opener, the facts as tags, one line of intro with the full story folded
 * away, then the work itself, frame after frame.
 */
type Props = { params: Promise<{ slug: string }> };

const HAS_DARK = new Set(["luminary", "arc", "bloom", "onyx", "prism", "pace", "chopbox", "kora"]);
const SCOPE = ["Brand identity", "Design system", "Web design", "Front-end build"];

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug];
  if (!brand) return { title: "Not found" };
  return {
    title: `${brand.name} · Case study`,
    description: `${brand.tagline} ${brand.direction}`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [`/images/work/${slug}/identity.webp`] },
  };
}

function Frame({ src, alt, caption, tall = false }: { src: string; alt: string; caption?: string; tall?: boolean }) {
  return (
    <figure className="m-0">
      <div
        className={`relative overflow-hidden rounded-[4px] bg-[var(--brand-surface-secondary)] ${
          tall ? "aspect-[16/11]" : "aspect-[16/9]"
        }`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-[var(--brand-text-secondary)]">{caption}</figcaption>}
    </figure>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-[1170/2532] w-full rounded-[2.4rem] bg-[#0b0b0b] p-[0.5rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
      <div className="relative h-full overflow-hidden rounded-[1.95rem]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <span className="absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  );
}

const Chip = ({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) => (
  <span
    className={`inline-flex h-8 items-center rounded-[3px] px-3 text-xs font-semibold uppercase tracking-[0.04em] ${
      strong ? "bg-[var(--brand-accent)] text-[var(--brand-on-accent)]" : "bg-[var(--brand-surface-secondary)]"
    }`}
  >
    {children}
  </span>
);

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const brand = BRANDS_BY_SLUG[slug];
  const study = CASE_STUDIES[slug];
  if (!brand || !study) notFound();

  const index = BRANDS.findIndex((b) => b.slug === slug);
  const next = BRANDS[(index + 1) % BRANDS.length];
  const img = (f: string) => `/images/work/${slug}/${f}`;
  const dark = HAS_DARK.has(slug);
  const [g1, g2, ...rest] = study.gallery;

  return (
    <article>
      {/* Opener */}
      <div className="px-3 pt-[72px] sm:px-5 sm:pt-[84px]">
        <div className="relative mx-auto aspect-[16/9] max-h-[calc(100svh-100px)] w-full max-w-[1600px] overflow-hidden rounded-[4px] bg-[var(--brand-surface-secondary)]">
          <img src={img("identity.webp")} alt={`${brand.name} identity`} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>

      {/* Facts */}
      <div className="px-5 pt-20 sm:px-8 md:pt-28">
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--brand-text-secondary)]">
            <Link href="/work" className="hover:text-[var(--brand-text)]">
              Work
            </Link>{" "}
            / <span aria-current="page">{brand.name}</span>
          </nav>
          <h1 className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">{brand.name}</h1>

          <div className="mt-14 grid border-t border-[var(--brand-text)] lg:grid-cols-[1.4fr_1fr]">
            <dl className="m-0">
              <div className="border-b border-[var(--brand-border)] py-7">
                <dt className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">Industry</dt>
                <dd className="m-0 flex flex-wrap gap-2">
                  {brand.sector.split("·").map((s) => (
                    <Chip key={s} strong>
                      {s.trim()}
                    </Chip>
                  ))}
                </dd>
              </div>
              <div className="border-b border-[var(--brand-border)] py-7">
                <dt className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">What we did</dt>
                <dd className="m-0 flex flex-wrap gap-2">
                  {SCOPE.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </dd>
              </div>
              <div className="py-7">
                <dt className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">Type</dt>
                <dd className="m-0">
                  <Chip>Studio concept</Chip>
                </dd>
              </div>
            </dl>

            <div className="border-[var(--brand-border)] py-7 lg:border-l lg:pl-10">
              <h2 className="text-xl font-semibold tracking-[-0.02em]">{brand.tagline}</h2>
              <p className="mt-3 text-[var(--brand-text-secondary)]">{brand.direction}</p>

              <Link
                href={`/demo/${slug}`}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-[4px] bg-[var(--brand-accent)] px-5 text-sm font-medium text-[var(--brand-on-accent)]"
              >
                Visit the live site <IconArrow className="size-4" />
              </Link>

              <details className="group mt-3">
                <summary className="inline-flex h-11 cursor-pointer list-none items-center rounded-[4px] bg-[var(--brand-text)] px-5 text-sm font-medium text-[var(--brand-bg)] [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Read the full story</span>
                  <span className="hidden group-open:inline">Close the story</span>
                </summary>
                <div className="mt-6 space-y-5 text-[var(--brand-text-secondary)]">
                  <div>
                    <h3 className="font-semibold text-[var(--brand-text)]">The brief</h3>
                    <p className="mt-1">{study.brief}</p>
                  </div>
                  {study.decisions.map((d) => (
                    <div key={d.title}>
                      <h3 className="font-semibold text-[var(--brand-text)]">{d.title}</h3>
                      <p className="mt-1">{d.body}</p>
                    </div>
                  ))}
                  <div>
                    <h3 className="font-semibold text-[var(--brand-text)]">The build</h3>
                    <p className="mt-1">{study.build}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--brand-text)]">What we learned</h3>
                    <p className="mt-1">{study.learned}</p>
                  </div>
                </div>
              </details>

            </div>
          </div>
        </div>
      </div>

      {/* The work */}
      <div className="px-5 pb-24 pt-16 sm:px-8 md:pt-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Frame src={img("home-desktop.webp")} alt={`${brand.name} home page on desktop`} />

          <div className="grid items-center gap-8 rounded-[4px] bg-[var(--brand-surface-secondary)] p-8 md:grid-cols-[1fr_1.1fr] md:p-16">
            <div className="mx-auto grid w-full max-w-[460px] grid-cols-2 gap-5">
              <Phone src={img("home-mobile.webp")} alt={`${brand.name} on mobile, light`} />
              <div className="mt-16">
                <Phone src={img(dark ? "home-mobile-dark.webp" : "home-mobile.webp")} alt={`${brand.name} on mobile${dark ? ", dark" : ""}`} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">{study.decisions[0]?.title}</h2>
              <p className="mt-3 max-w-[40ch] text-[var(--brand-text-secondary)]">Built mobile first, light and dark.</p>
            </div>
          </div>

          {dark && <Frame src={img("home-desktop-dark.webp")} alt={`${brand.name} home page, dark`} />}

          <div className="grid gap-5 md:grid-cols-2">
            {g1 && <Frame src={img(`${g1.file}.webp`)} alt={`${brand.name} ${g1.label} page`} caption={g1.label} tall />}
            {g2 && <Frame src={img(`${g2.file}.webp`)} alt={`${brand.name} ${g2.label} page`} caption={g2.label} tall />}
          </div>

          <Frame src={img("home-tablet.webp")} alt={`${brand.name} on tablet`} />

          {rest.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {rest.map((g) => (
                <Frame key={g.file} src={img(`${g.file}.webp`)} alt={`${brand.name} ${g.label} page`} caption={g.label} tall />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next */}
      <Link href={`/work/${next.slug}`} className="group block border-t border-[var(--brand-border)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6">
          <div>
            <p className="text-sm text-[var(--brand-text-secondary)]">Next project</p>
            <p className="mt-2 text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em] transition-colors group-hover:text-[var(--brand-accent)]">
              {next.name}
            </p>
          </div>
          <IconArrow className="mb-3 size-10 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}
