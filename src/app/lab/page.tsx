import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import LabExperiments from "@/components/lab/LabExperiments";

export const metadata: Metadata = {
  title: "Lab · Experiments",
  description:
    "The Greene Studios lab — a small digital laboratory of cursor, typography, motion, interaction, WebGL and AI experiments.",
};

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="The lab"
        title={
          <>
            We like
            <br />
            <span className="font-serif-i lowercase normal-case tracking-normal">to experiment.</span>
          </>
        }
        description="A small digital laboratory. Unconstrained by client briefs, this is where we break things to see how they work — and prove the craft before we ship it."
        right={
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            06 concepts · always iterating
          </p>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <LabExperiments />

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> More experiments shipping soon
        </p>

        {/* GREENE / RAW — the workshop */}
        <div className="mt-24 border-t border-[var(--brand-border)] pt-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                GREENE / RAW
              </span>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight">
                The workshop.
                <br />
                <span className="font-serif-i lowercase normal-case tracking-normal">Unpolished, on purpose.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--brand-text-secondary)]">
              Sketches, type tests, failed concepts, wireframes and prototypes — the
              working files behind the finished work. Switch to{" "}
              <span className="font-display font-black text-[var(--brand-accent)]">RAW</span>{" "}
              atmosphere in the nav to browse in workshop style.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              "PROJECT 014",
              "TYPE TEST_03",
              "REJECTED",
              "MOTION TEST_07",
              "COLOR STUDY",
              "CLIENT EXPLORATION",
              "BUILD_002",
              "WIREFRAME_11",
              "MOODBOARD_04",
              "PROTOTYPE_09",
              "CODE_SNIPPET_16",
            ].map((label, i) => (
              <span
                key={label}
                className="group inline-flex items-center gap-2 rounded-md border border-[var(--brand-border)] bg-[var(--brand-surface)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--brand-text)] transition-colors duration-300 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                data-cursor="EXPLORE"
              >
                <span className="text-[9px] text-[var(--brand-text-secondary)]">{String(i + 1).padStart(2, "0")}</span>
                {label}
                <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-60" aria-hidden="true">
                  ↗
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-[var(--brand-border)] pt-12 text-center">
          <p className="font-serif-i text-xl text-[var(--brand-text-secondary)] md:text-2xl">
            Want this energy on your product?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" data-cursor="HELLO" className="btn-primary">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <Link href="/work" data-cursor="VIEW" className="btn-outline">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
