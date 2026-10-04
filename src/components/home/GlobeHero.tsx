import Link from "next/link";
import { IconArrow } from "@/components/icons/GreeneIcons";
import DotGlobe from "./DotGlobe";

/** The globe leads. One line says what we are; two buttons say where to go. */
export default function GlobeHero() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 pb-36 pt-24 text-center sm:px-8">
      <div className="w-full max-w-[min(540px,50svh)]">
        <DotGlobe />
      </div>
      <h1 className="mt-6 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">
        Brand, web and product design.
      </h1>
      <p className="mt-2 text-[var(--brand-text-secondary)]">Independent studio. Working worldwide.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="#work"
          className="inline-flex h-12 items-center rounded-[4px] bg-[var(--brand-accent)] px-6 font-medium text-[var(--brand-on-accent)] transition-transform hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center gap-2 rounded-[4px] border border-[var(--brand-text)] px-6 font-medium transition-colors hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
        >
          Start a project <IconArrow className="size-4" />
        </Link>
      </div>
    </section>
  );
}
