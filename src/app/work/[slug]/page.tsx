import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, TESTIMONIALS } from "@/lib/data";
import { notFound } from "next/navigation";
import { colorBlurDataURL } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} · Case Study`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const quote = TESTIMONIALS.find((t) => t.projectSlug === slug);

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Work", item: `${base}/work` },
              { "@type": "ListItem", position: 2, name: project.title, item: `${base}/work/${project.slug}` },
            ],
          }),
        }}
      />
      {/* Hero · full-bleed image */}
      <div className="relative flex min-h-[70vh] items-end pb-16 pt-40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={colorBlurDataURL(project.color)}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <Link
            href="/work"
            data-cursor="BACK"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> Back to work
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--brand-on-accent)]">
              {project.category}
            </span>
            <span className="font-mono text-sm text-white/60">{project.year}</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.88] tracking-tight text-white">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {project.description}
          </p>
        </div>
      </div>

      {/* Results strip — the verdict up front */}
      <div className="border-b border-[var(--brand-border)] bg-[var(--brand-surface)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-[var(--brand-border)] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-start gap-2 py-8 sm:px-8 sm:py-10 sm:first:pl-0 sm:last:pr-0">
              <span className="font-display text-4xl font-black leading-none tracking-tight text-[var(--brand-text)] md:text-5xl">
                {m.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)] md:text-[11px]">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-16 lg:col-span-2">
            <section>
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ Overview
              </span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
                The project
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
                {project.description}
              </p>
            </section>

            <section>
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ The challenge
              </span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
                What we faced
              </h2>
              <p className="mt-6 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
                {project.challenge || "A unique challenge in the intersection of design and technology."}
              </p>
            </section>

            <section>
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ Goals
              </span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
                What success looked like
              </h2>
              <div className="mt-6 flex flex-col border-t border-[var(--brand-border)]">
                {(project.goals || []).map((goal: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 border-b border-[var(--brand-border)] py-5">
                    <span className="font-mono text-sm text-[var(--brand-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-[var(--brand-text)]">{goal}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ Approach
              </span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
                How we solved it
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(project.approach || []).map((item: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                  >
                    <span className="mb-4 block h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                    <p className="font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {quote ? (
              <section>
                <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                  ✦ The client
                </span>
                <figure className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 md:p-10">
                  <blockquote className="font-serif-i text-[clamp(1.3rem,2vw,1.8rem)] leading-snug text-[var(--brand-text)]">
                    “{quote.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-[var(--brand-border)] pt-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-text)] font-display text-sm font-black text-[var(--brand-bg)]">
                      {quote.avatar}
                    </span>
                    <div>
                      <div className="font-display text-sm font-black uppercase tracking-tight">{quote.author}</div>
                      <div className="text-xs font-medium text-[var(--brand-text-secondary)]">{quote.title}</div>
                    </div>
                    <span className="ml-auto rounded-full bg-[var(--brand-accent)] px-4 py-1.5 font-display text-xs font-black uppercase tracking-wider text-[var(--brand-on-accent)]">
                      {quote.result}
                    </span>
                  </figcaption>
                </figure>
              </section>
            ) : null}

            <section>
              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                ✦ Lessons
              </span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
                What we learned
              </h2>
              <p className="mt-6 font-serif-i text-xl leading-relaxed text-[var(--brand-text)] md:text-2xl">
                {project.lessons || "Every project teaches us something new. This was no exception."}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
              <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
                Project details
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Category", value: project.category },
                  { label: "Year", value: project.year },
                  { label: "Services", value: project.tags.join(", ") },
                  { label: "Timeline", value: "12 weeks" },
                  { label: "Status", value: "Launched" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-[var(--brand-border)] pb-4 last:border-b-0 last:pb-0">
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-[var(--brand-text)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[var(--brand-text)] p-8 text-[var(--brand-bg)]">
              <h3 className="font-display text-xl font-black uppercase tracking-tight">
                Start your project
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--brand-bg)]/70">
                Ready to build something this good? Take the two-minute brief.
              </p>
              <Link
                href="/contact"
                data-cursor="HELLO"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-on-accent)] transition-colors duration-300 hover:bg-[var(--brand-bg)] hover:text-[var(--brand-accent)]"
              >
                Start a project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next case study — cinematic hand-off */}
      <Link href={`/work/${next.slug}`} data-cursor="NEXT" className="group relative block overflow-hidden border-t border-[var(--brand-border)]">
        <div className="relative flex min-h-[46vh] items-end overflow-hidden md:min-h-[56vh]">
          <Image
            src={next.image}
            alt={next.title}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={colorBlurDataURL(next.color)}
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 transition-opacity duration-700" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
            <span className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
              Next case study
              <span className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">→</span>
            </span>
            <span className="block font-display text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
              {next.title}
            </span>
            <span className="mt-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
              {next.category} · {next.year}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
