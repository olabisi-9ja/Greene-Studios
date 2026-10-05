import Parallax from "@/components/effects/Parallax";
import { PlateLink } from "@/components/ui/Tag";

/** The next step, full bleed: one picture, one line, one button. */
export default function NextPage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#111] text-[#fafaf7] [--logo:#5fbf8a]">
      <Parallax src="/images/real/greene/04.webp" alt="" strength={0.2} className="!absolute inset-0 -z-10" imgClassName="opacity-55" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.35),rgba(10,10,10,0.85))]" />
      <div className="mx-auto flex min-h-[86svh] max-w-[1400px] flex-col px-5 py-16 sm:px-8">
        <div className="m-auto flex flex-col items-center text-center">
          <h2 className="max-w-[15ch] text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            Got something to build?
          </h2>
          <p className="mt-5 text-lg text-white/70">Tell us about it. Two minutes.</p>
          <div className="mt-10">
            <PlateLink href="/contact">Start a project</PlateLink>
          </div>
        </div>
      </div>
    </section>
  );
}
