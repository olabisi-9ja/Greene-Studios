import { CountUp } from "@/components/effects/TextFx";
import { PlateLink } from "@/components/ui/Tag";

/**
 * Who we are, in one sentence, then
 * the plain facts of working with us. Every number here is from the
 * offer itself, nothing invented.
 */
const FACTS = [
  { pre: "$", value: "480", label: "Brand identity, starting price" },
  { pre: "", value: "4", label: "Ways to work with us" },
  { pre: "", value: "1–3", label: "Weeks to launch a website" },
  { pre: "", value: "2", label: "Revision rounds included" },
  { pre: "", value: "30", label: "Days of support after launch" },
];

/** Sizes and colours per card, in the order of FACTS: deliberately uneven. */
const CARD = [
  "col-span-2 min-h-[220px] bg-[var(--logo)] text-[var(--brand-bg)] sm:col-span-4 sm:row-span-2 sm:min-h-[300px]",
  "min-h-[150px] bg-[var(--brand-surface)] sm:col-span-2",
  "min-h-[150px] bg-[var(--brand-surface)] sm:col-span-2",
  "min-h-[170px] bg-[var(--brand-surface)] sm:col-span-2",
  "col-span-2 min-h-[150px] bg-[var(--brand-text)] text-[var(--brand-bg)] sm:col-span-4",
];

export default function About() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <p className="max-w-[24ch] text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">Greene designs and builds brands, websites and apps. One team from the first sketch to launch day, so nothing gets lost between design and code.</p>

          {/* the facts as cards of different sizes: the price leads, the rest fall in around it */}
          <dl className="m-0 mt-16 grid grid-cols-2 gap-3 sm:grid-cols-6">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={[
                  "flex flex-col justify-between rounded-[18px] p-6",
                  CARD[i],
                ].join(" ")}
              >
                <dt className="order-2 mt-8 max-w-[18ch] text-sm font-medium leading-snug opacity-80">{f.label}</dt>
                <dd className="order-1 m-0 text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none tracking-[-0.045em]">
                  {f.pre}
                  {/^\d+$/.test(f.value) ? <CountUp to={Number(f.value)} /> : f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <PlateLink href="/studio">More about the studio</PlateLink>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/greene/06.webp"
            alt="A Greene Studios card held up to the light"
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[12px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
