import Link from "next/link";
import { PROJECTS, allPictures } from "@/lib/work";
import Strip from "@/components/work/Strip";
import { KindChips, ViewProject } from "@/components/work/KindChips";
import BrandLottie from "@/components/brand/BrandLottie";

/**
 * Selected work: each project is a name, what it is, and a row of its
 * finished pictures to scroll through.
 */
export default function Work({
  title = "Selected work",
  all = true,
  lottie,
}: {
  title?: string;
  all?: boolean;
  /** a /public/lottie animation shown beside the title */
  lottie?: string;
}) {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {title}
          </h2>
          {lottie && (
            <div className="pointer-events-none -mb-4 w-[min(170px,38vw)] shrink-0">
              <BrandLottie name={lottie} className="aspect-[2/3] w-full" />
            </div>
          )}
          {all && (
            <Link href="/work" className="font-medium underline-offset-4 hover:underline">
              All projects
            </Link>
          )}
        </div>
      </div>

      <div className="mt-16 space-y-24 sm:space-y-28">
        {PROJECTS.map((p) => {
          return (
            <article key={p.slug}>
              <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div>
                  <h3 className="text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">
                    {p.name}
                  </h3>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
                    <KindChips kind={p.kind} />
                    <ViewProject href={`/work/${p.slug}`} />
                  </div>
                </div>
              </div>
              <Strip images={allPictures(p)} name={p.name} kind={p.kind} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
