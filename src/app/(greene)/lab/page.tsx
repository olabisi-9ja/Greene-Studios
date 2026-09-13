import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import LabExperiments from "@/components/lab/LabExperiments";

export const metadata: Metadata = {
  title: "Lab · Experiments",
  description:
    "The Greene Studios lab, a small digital laboratory of cursor, typography, motion, interaction, WebGL and AI experiments.",
};

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)]">
      <PageHeader
        kicker="The lab"
        title={
          <>
            We like
            <br /> to experiment
          </>
        }
        description="A small digital laboratory. Unconstrained by client briefs, this is where we break things to see how they work, and prove the craft before we ship it."
        right={
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            Concepts, always iterating
          </p>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <LabExperiments />

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> More experiments shipping soon
        </p>

        <div className="mt-24 border-t border-[var(--brand-border)] pt-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                GREENE / RAW
              </span>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight">
                The workshop
                <br /> Unpolished, on purpose
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--brand-text-secondary)]">
              Sketches, type tests, failed concepts, wireframes and prototypes. The
              working files behind the finished work. Switch to{" "}
              <span className="font-display font-black text-[var(--brand-accent)]">RAW</span>{" "}
              atmosphere in the nav to browse in workshop style.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              "PROJECT 014",
              "TYPE TEST",
              "REJECTED",
              "MOTION TEST",
              "COLOR STUDY",
              "CLIENT EXPLORATION",
              "BUILD",
              "WIREFRAME",
              "MOODBOARD",
              "PROTOTYPE",
              "CODE SNIPPET",
            ].map((label) => (
              <span
                key={label}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                data-cursor="EXPLORE"
              >
                {label}
                <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-60" aria-hidden="true">
                  ↗
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-[var(--brand-border)] pt-12 text-center">
          <p className="text-xl text-[var(--brand-text-secondary)] md:text-2xl">
            Want this energy on your product?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" data-cursor="HELLO" className="inline-flex items-center justify-center rounded-full bg-[var(--brand-text)] px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <Link href="/work" data-cursor="VIEW" className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] transition-colors hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
