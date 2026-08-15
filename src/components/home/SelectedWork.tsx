"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { colorBlurDataURL } from "@/lib/utils";

type Project = (typeof PROJECTS)[number];

/**
 * Selected work — full-bleed case-study presentations.
 * Each project pairs a cinematic image panel with its story and the
 * measurable outcome it produced, so the proof is visible before
 * anyone even clicks through.
 */
export default function SelectedWork() {
  // Featured projects: the three flagged + Bloom Health to round out a strong four
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const bloom = PROJECTS.find((p) => p.id === "bloom-health");
  const projects: Project[] = bloom ? [...featured, bloom] : featured;

  return (
    <section className="relative bg-[var(--brand-bg)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
              <span className="text-[var(--brand-accent)]">✦</span> Selected work · 2023 → 2026
            </span>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              Work that <span className="font-serif-i lowercase normal-case tracking-normal">works.</span>
            </h2>
          </div>
          <Link
            href="/work"
            data-cursor="GO"
            className="group inline-flex w-fit items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--brand-text)]"
          >
            <span className="border-b-2 border-[var(--brand-accent)] pb-0.5 transition-colors group-hover:border-[var(--brand-text)]">
              All projects
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {/* Case-study panels */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor="VIEW"
                className={`group relative block overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] ${i % 3 === 1 ? "md:ml-[8%] md:w-[92%]" : i % 3 === 2 ? "md:mr-[8%] md:w-[92%]" : ""}`}
              >
                {/* Media */}
                <div className="relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 90vw"
                    placeholder="blur"
                    blurDataURL={colorBlurDataURL(project.color)}
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  {/* scrim for type legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-opacity duration-700 group-hover:opacity-90" />

                  {/* Index */}
                  <span className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-white/80 backdrop-blur-sm md:left-8 md:top-8">
                    0{i + 1}
                  </span>

                  {/* Arrow affordance */}
                  <span
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-on-accent)] md:right-8 md:top-8 md:h-14 md:w-14"
                    aria-hidden="true"
                  >
                    <span className="text-lg transition-transform duration-500 group-hover:translate-x-0.5 md:text-xl">→</span>
                  </span>

                  {/* Title block */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:flex-row md:items-end md:justify-between md:gap-8 md:p-10">
                    <div>
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 md:text-[11px]">
                        {project.category} · {project.year}
                      </span>
                      <h3 className="font-display text-[clamp(2.2rem,5.5vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
                        {project.title}
                      </h3>
                    </div>
                    <span className="hidden shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white md:flex">
                      Explore case study
                      <span className="border-b-2 border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-[var(--brand-accent)]" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Story, sitting under the picture */}
              <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
                <p className="max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                  {project.description}
                </p>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="READ"
                  className="group/link inline-flex w-fit shrink-0 items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--brand-text)]"
                >
                  <span className="border-b-2 border-[var(--brand-accent)] pb-0.5 transition-colors group-hover/link:border-[var(--brand-text)]">
                    The story
                  </span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
