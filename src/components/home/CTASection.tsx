import Link from "next/link";
import { BRAND } from "@/lib/data";
import { IconArrow } from "@/components/icons/GreeneIcons";

export default function CTASection() {
  return (
    <section className="px-5 sm:px-8" style={{ backgroundColor: "var(--cta-bg)", color: "var(--cta-fg)" }}>
      <div className="mx-auto max-w-[1400px] py-24 md:py-32">
        <h2 className="max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Tell us what you&apos;re building.
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg opacity-80">
          We reply within one working day.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-[4px] px-6 font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--cta-btn-bg)", color: "var(--cta-btn-fg)" }}
          >
            Start your brief <IconArrow className="size-4" />
          </Link>
          <Link
            href="/start"
            className="inline-flex h-12 items-center rounded-[4px] border px-6 font-medium"
            style={{ borderColor: "color-mix(in srgb, var(--cta-fg) 40%, transparent)" }}
          >
            Not sure yet? Take the quiz
          </Link>
        </div>
        <p className="mt-10 text-sm opacity-70">
          Or email{" "}
          <a href={`mailto:${BRAND.email}`} className="underline underline-offset-4">
            {BRAND.email}
          </a>
        </p>
      </div>
    </section>
  );
}
