import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";

/** 404: the lost-page animation, a plain line, and two ways back. */
export default function NotFound() {
  return (
    <div className="pb-32">
      <PageIntro lottie="not-found" label="Page not found" title="This page isn't here." lead="It may have moved, or the link may be wrong. These will get you back on track." />
      <div className="flex flex-wrap justify-center gap-3 px-5">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-[6px] bg-[var(--brand-accent)] px-6 font-semibold text-[var(--brand-on-accent)] transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/work"
          className="inline-flex h-12 items-center rounded-[6px] border border-[var(--brand-text)] px-6 font-semibold hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
        >
          See the work
        </Link>
      </div>
    </div>
  );
}
