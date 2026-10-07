import { CountUp } from "@/components/effects/TextFx";
import { PlateLink } from "@/components/ui/Tag";
import Price from "@/components/ui/Price";
import BrandLottie from "@/components/brand/BrandLottie";
import Pic from "@/components/ui/Pic";

/**
 * Who we are, in one sentence, then
 * the plain facts of working with us. Every number here is from the
 * offer itself, nothing invented.
 */
const FACTS = [
  { pre: "", value: "", usd: 480, label: "Brand identity, starting price" },
  { pre: "", value: "4", usd: 0, label: "Ways to work with us" },
  { pre: "", value: "1–3", usd: 0, label: "Weeks to launch a website" },
  { pre: "", value: "2", usd: 0, label: "Revision rounds included" },
  { pre: "", value: "30", usd: 0, label: "Days of support after launch" },
];

/** Sizes per card, in the order of FACTS: deliberately uneven. All on the
 *  one neutral surface (the 30%); only the price takes the accent (the 10%). */
const CARD = [
  "col-span-2 min-h-[224px] sm:col-span-4 sm:row-span-2 sm:min-h-[304px]",
  "min-h-[152px] sm:col-span-2",
  "min-h-[152px] sm:col-span-2",
  "min-h-[168px] sm:col-span-2",
  "col-span-2 min-h-[152px] sm:col-span-4",
];

export default function About() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <p className="max-w-[24ch] text-display font-semibold leading-[1.04] tracking-[-0.035em]">Greene Studios designs and builds brands, websites and apps. One team from the first sketch to launch day, so nothing gets lost between design and code.</p>

          {/* the facts as cards of different sizes: the price leads, the rest fall in around it */}
          <dl className="m-0 mt-16 grid grid-cols-2 gap-3 sm:grid-cols-6">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={[
                  "relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6",
                  CARD[i],
                ].join(" ")}
              >
                {f.usd > 0 && (
                  <div aria-hidden="true" className="pointer-events-none absolute -right-2 bottom-2 w-[52%] max-w-[230px] sm:-right-4 sm:bottom-4">
                    <BrandLottie name="hero-brands" className="aspect-[4/3] w-full" />
                  </div>
                )}
                <dt className="relative order-2 mt-8 max-w-[18ch] text-sm font-semibold leading-snug opacity-80">{f.label}</dt>
                <dd className={["relative order-1 m-0 text-display font-semibold leading-none tracking-[-0.045em]", f.usd ? "text-[var(--logo)]" : ""].join(" ")}>
                  {f.usd ? (
                    <Price usd={f.usd} />
                  ) : (
                    <>
                      {f.pre}
                      {/^\d+$/.test(f.value) ? <CountUp to={Number(f.value)} /> : f.value}
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <PlateLink href="/studio">More about the studio</PlateLink>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Pic
            src="/images/real/aipal/08.webp"
            alt="The AiPal app on a phone, held over a cup of coffee"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="block h-auto w-full rounded-[12px]"
          />
        </div>
      </div>
    </section>
  );
}
