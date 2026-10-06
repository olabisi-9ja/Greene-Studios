import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, PROJECTS_BY_SLUG, type Project } from "@/lib/work";
import Pic from "@/components/ui/Pic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS_BY_SLUG[slug];
  if (!p) return { title: "Not found" };
  return { title: p.name, description: `${p.name}: ${p.line}`, alternates: { canonical: `/work/${slug}` }, openGraph: { images: [p.images[0]] } };
}

/**
 * A case study, laid out like an agency case page: a full-bleed opener;
 * a band with the facts (type, client, what we made) and a link to the live
 * project; the title and the story; then the work as an editorial run of
 * pictures at different sizes, broken by short text; then two more projects.
 */
type Slot = { kind: "full" | "offset" | "pair" | "text"; src?: string[]; title?: string; body?: string; side?: "left" | "right" };

function run(p: Project): Slot[] {
  const pics = [...(p.live ? [p.live.desktop] : []), ...p.images.slice(1), ...(p.live ? [p.live.mobile] : [])];
  const out: Slot[] = [];
  const pattern: Slot["kind"][] = ["full", "pair", "offset", "pair"];
  let i = 0;
  let turn = 0;
  while (i < pics.length) {
    const kind = pattern[turn % pattern.length];
    if (kind === "pair" && i + 1 < pics.length) {
      out.push({ kind, src: [pics[i], pics[i + 1]] });
      i += 2;
    } else if (kind === "offset") {
      out.push({ kind, src: [pics[i]], side: turn % 8 < 4 ? "right" : "left" });
      i += 1;
    } else {
      out.push({ kind: "full", src: [pics[i]] });
      i += 1;
    }
    // a short text break after the first two pictures
    if (turn === 1) out.push({ kind: "text", title: "What we made", body: p.made.join(", ") + "." });
    turn++;
  }
  if (turn < 2) out.push({ kind: "text", title: "What we made", body: p.made.join(", ") + "." });
  return out;
}

const pic = "block w-full bg-[var(--brand-surface)] object-cover";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = PROJECTS_BY_SLUG[slug];
  if (!p) notFound();
  const i = PROJECTS.findIndex((x) => x.slug === slug);
  const related = [PROJECTS[(i + 1) % PROJECTS.length], PROJECTS[(i + 2) % PROJECTS.length]];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Work", item: `${SITE}/work` },
              { "@type": "ListItem", position: 2, name: p.name, item: `${SITE}/work/${p.slug}` },
            ],
          }),
        }}
      />
      {/* opener */}
      <div className="h-[86svh] min-h-[420px] w-full overflow-hidden bg-[var(--brand-surface-secondary)]">
        <Pic src={p.images[0]} alt={`${p.name}, ${p.kind}`} sizes="100vw" priority className="h-full w-full object-cover" />
      </div>

      {/* facts and story */}
      <section className="bg-[var(--brand-surface-secondary)] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <dl className="m-0 grid gap-1.5 text-sm">
              {[
                ["Type", p.kind],
                ["Client", p.name],
                ["Deliverables", p.made.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-[var(--brand-text-secondary)]">{k}:</dt>
                  <dd className="m-0 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline underline-offset-4 hover:text-[var(--logo)]">
                Launch project
              </a>
            )}
          </div>
          <h1 className="mt-14 max-w-[22ch] text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {p.name}: {p.line}
          </h1>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[var(--brand-text-secondary)]">{p.about}</p>
        </div>
      </section>

      {/* the work */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 sm:gap-10">
          {run(p).map((s, k) => {
            if (s.kind === "text")
              return (
                <div key={k} className="grid py-6 sm:grid-cols-12 sm:py-12">
                  <div className="sm:col-span-6 sm:col-start-4">
                    <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.03em]">{s.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[var(--brand-text-secondary)]">{s.body}</p>
                  </div>
                </div>
              );
            if (s.kind === "pair")
              return (
                <div key={k} className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                  {s.src!.map((src) => (
                    <Pic key={src} src={src} alt="" sizes="(min-width: 640px) 50vw, 100vw" className={`${pic} aspect-[4/5]`} />
                  ))}
                </div>
              );
            if (s.kind === "offset")
              return (
                <div key={k} className="grid sm:grid-cols-12">
                  <Pic
                    src={s.src![0]}
                    alt=""
                    sizes="(min-width: 640px) 66vw, 100vw"
                    className={`${pic} aspect-[4/3] sm:col-span-8 ${s.side === "right" ? "sm:col-start-5" : "sm:col-start-1"}`}
                  />
                </div>
              );
            return <Pic key={k} src={s.src![0]} alt="" sizes="(min-width: 1400px) 1400px, 100vw" className={`${pic} aspect-[16/9]`} />;
          })}
        </div>
      </section>

      {/* more work */}
      <section className="border-t border-[var(--brand-border)] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-sm text-[var(--brand-text-secondary)]">Related projects</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/work/${r.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-[var(--brand-surface-secondary)]">
                  <Pic src={r.images[0]} alt="" sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[var(--logo)]">
                  {r.name}: {r.line}
                </p>
                <p className="mt-1 text-sm text-[var(--brand-text-secondary)]">{r.kind}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
