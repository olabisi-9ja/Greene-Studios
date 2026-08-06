import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team at Greene Studios.",
};

const POSITIONS = [
  {
    title: "Senior Product Designer",
    location: "Remote / Lagos",
    type: "Full-time",
  },
  {
    title: "Frontend Engineer (React/Next.js)",
    location: "Remote",
    type: "Contract",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="Careers"
        title={
          <>
            Join the <span className="font-serif-i lowercase normal-case tracking-normal">team.</span>
          </>
        }
        description="We're always looking for talented designers, developers, and strategists who are passionate about building exceptional digital experiences."
        right={
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-accent)]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
              {POSITIONS.length} open roles
            </span>
          </div>
        }
      />

      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> Open positions
        </span>

        <div className="flex flex-col border-t border-[var(--brand-border)]">
          {POSITIONS.map((job, i) => (
            <div
              key={job.title}
              className="group flex flex-col justify-between gap-6 border-b border-[var(--brand-border)] py-8 transition-all duration-300 sm:flex-row sm:items-center"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-display text-xl font-black uppercase tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:text-2xl">
                    {job.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                      {job.location}
                    </span>
                    <span className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={`mailto:${BRAND.email}?subject=Application for ${job.title}`}
                data-cursor="APPLY"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--brand-text)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]"
              >
                Apply now <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-10 text-center md:p-14">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-3xl">
            Don&apos;t see a fit?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
            We&apos;re always open to meeting interesting people. Send us your portfolio and a brief intro.
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            data-cursor="MAIL"
            className="mt-6 inline-flex items-center gap-2 font-display text-lg font-black tracking-tight text-[var(--brand-text)] underline decoration-[var(--brand-accent)] decoration-4 underline-offset-8 transition-colors hover:text-[var(--brand-accent)]"
          >
            {BRAND.email} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
