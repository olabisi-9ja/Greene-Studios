import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Work Archive — All Projects",
  description: "The complete archive of Greene Studios projects from 2022 to present.",
};

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="Archive"
        title={
          <>
            All <span className="font-serif-i lowercase normal-case tracking-normal">projects.</span>
          </>
        }
        right={
          <Link
            href="/work"
            data-cursor="BACK"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
          >
            <span aria-hidden="true">←</span> Back to work
          </Link>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col border-t border-[var(--brand-border)]">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block border-b border-[var(--brand-border)]"
              data-cursor="VIEW"
            >
              <div className="grid grid-cols-12 items-center gap-3 py-6 md:py-8">
                <span className="col-span-1 font-mono text-xs text-[var(--brand-text-secondary)] md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="col-span-6 font-display text-xl font-black uppercase tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:col-span-4 md:text-3xl">
                  {project.title}
                </h2>
                <span className="col-span-3 hidden text-sm font-medium text-[var(--brand-text-secondary)] md:col-span-4 md:block">
                  {project.category}
                </span>
                <span className="col-span-4 text-xs font-semibold text-[var(--brand-text-secondary)] md:col-span-2">
                  {project.tags.slice(0, 2).join(" · ")}
                </span>
                <span className="col-span-1 text-right font-mono text-xs text-[var(--brand-text-secondary)] md:text-sm">
                  {project.year}
                </span>
                <span
                  className="hidden text-right text-[var(--brand-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
