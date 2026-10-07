import BrandLottie from "@/components/brand/BrandLottie";
import { PlateLink } from "@/components/ui/Tag";

/** The next step, full bleed: one animation, one line, one button. */
export default function NextPage() {
  return (
    <section className="lottie-on-dark relative isolate overflow-hidden bg-[#111] text-[#fafaf7] [--logo:#5fbf8a]">
      <div className="mx-auto flex min-h-[86svh] max-w-[1400px] flex-col px-5 py-16 sm:px-8">
        <div className="m-auto flex flex-col items-center text-center">
          <div className="pointer-events-none w-[min(420px,80vw)] [--brand-bg:#111] [--brand-text:#fafaf7]">
            <BrandLottie name="next" className="aspect-square w-full" />
          </div>
          <h2 className="mt-4 max-w-[15ch] text-display font-semibold leading-[0.95] tracking-[-0.045em]">
            Got something to build?
          </h2>
          <p className="mt-5 text-base text-white/70">Tell us about it. Two minutes.</p>
          <div className="mt-10">
            <PlateLink href="/contact">Start a project</PlateLink>
          </div>
        </div>
      </div>
    </section>
  );
}
