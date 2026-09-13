import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import type { BrandSystem } from "@/lib/brands";
import type { ShippedProject } from "@/lib/shipped";
import { BrandMark } from "@/components/demo/BrandMark";

/**
 * The two card shapes the portfolio uses, in one place.
 *
 * Fourmula.ai inspired: minimal, large image, generous whitespace,
 * rounded-2xl, quiet border, hover lift. No heavy chrome.
 */

const CARD =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] transition-all duration-400 hover:-translate-y-1 hover:border-[var(--brand-text)]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]";
const MEDIA = "relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-[var(--brand-surface-secondary)]";
const IMG = "object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]";
const META = "text-[11px] font-semibold text-[var(--brand-text-secondary)]";
const CTA = "text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-accent)]";

/**
 * Screenshots of the shipped sites only exist once `npm run shoot:live` has run
 * somewhere with outbound network access. Until then the card shows a wordmark
 * plate rather than a broken image.
 */
export function shippedShot(slug: string): string | null {
  for (const ext of ["webp", "png"]) {
    const rel = `/images/shipped/${slug}/desktop.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

function conceptLifestyle(slug: string): string | null {
  const rel = `/images/work/${slug}/cover-lifestyle.jpg`;
  if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  return null;
}

export function ShippedCard({ project }: { project: ShippedProject }) {
  const shot = shippedShot(project.slug);
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="VISIT"
      className={CARD}
    >
      <div className={MEDIA}>
        {shot ? (
          <Image
            src={shot}
            alt={`${project.name} homepage`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={IMG}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6">
            <span className="text-center font-display text-xl font-black uppercase leading-tight tracking-tight text-[var(--brand-text)]/70">
              {project.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-black uppercase tracking-tight">{project.name}</h3>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
            {project.platform}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[var(--brand-text-secondary)]">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className={META}>{project.tags.join(" · ")}</span>
          <span className={CTA}>
            Visit <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export function ConceptCard({ brand }: { brand: BrandSystem }) {
  const lifestyle = conceptLifestyle(brand.slug);
  // Prefer lifestyle generated image if desktop screenshot missing; otherwise show screenshot with lifestyle as subtle overlay fallback
  const primary = `/images/work/${brand.slug}/home-desktop.webp`;
  return (
    <Link href={`/work/${brand.slug}`} data-cursor="READ" className={CARD}>
      <div className={MEDIA}>
        <Image
          src={primary}
          alt={`${brand.name} homepage`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={IMG}
        />
        {/* Generated lifestyle as gentle backdrop when screenshot is transparent areas — subtle */}
        {lifestyle && (
          <span className="pointer-events-none absolute inset-0 -z-10">
            {/* not visible, reserved for future composite */}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2.5">
          <span className="text-[var(--brand-text)]">
            <BrandMark slug={brand.slug} size={22} />
          </span>
          <h3 className="font-display text-lg font-black uppercase tracking-tight">{brand.name}</h3>
          <span className="ml-auto rounded-full border border-[var(--brand-border)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">
            Concept
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[var(--brand-text-secondary)]">{brand.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className={META}>{brand.sector}</span>
          <span className={CTA}>
            Case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Shared section heading for the two work tiers. */
export function WorkSectionHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--brand-border)] pb-5">
      <h2 className="headline text-2xl md:text-3xl">{title}</h2>
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">
        {meta}
      </p>
    </div>
  );
}
