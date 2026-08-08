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
