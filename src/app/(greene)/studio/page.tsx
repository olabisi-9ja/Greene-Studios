/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageIntro from "@/components/ui/PageIntro";
import BrandLottie from "@/components/brand/BrandLottie";
import ToolMarquee from "@/components/home/ToolMarquee";
import NextPage from "@/components/home/NextPage";
import { TEAM } from "@/lib/team";
import { PROJECTS } from "@/lib/work";

export const metadata: Metadata = {
  title: "Studio",
  description: "Greene Studios is a digital design studio. We design and build brands, websites and apps, from the first sketch to launch day.",
  alternates: { canonical: "/studio" },
};

const WAYS = [
  {
    title: "Design and code in one place",
    body: "The people who design your product build it, so nothing gets lost between a design file and the code.",
  },
  {
    title: "Plain updates",
    body: "You always know where the project stands, what it costs and what comes next.",
  },
  {
    title: "Built to last",
    body: "We would rather take an extra week and ship something that holds up for years.",
  },
];

/** Three pictures from different projects, placed unevenly. */
const PEEK = PROJECTS.slice(0, 3).map((p) => ({ src: p.images[0], name: p.name }));
const PEEK_PLACE = ["md:col-span-7", "md:col-start-9 md:col-span-4 md:mt-32", "md:col-start-3 md:col-span-6 md:-mt-10"];

/** Studio: who we are, the founder, how we work, a look at the work. */
export default function StudioPage() {
  const founder = TEAM[0];
  return (
    <>
      <PageIntro
        lottie="studio"
        label="Studio"
        title="Design and code, one team."
        lead="Greene Studios is a digital design studio. We design and build brands, websites and apps, from the first sketch to launch day."
      />

      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[5fr_6fr] md:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
          {founder.image && <Image src={founder.image} alt={founder.name} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />}
        </div>
        <div>
          <p className="font-mono text-sm text-[var(--brand-text-secondary)]">{founder.role}</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{founder.name}</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed">{founder.bio}</p>
          <Link href="/team" className="mt-8 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
            Meet the team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-[6fr_5fr] md:gap-20">
        <div>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">How we work</h2>
          <ul className="m-0 mt-10 list-none p-0">
            {WAYS.map((w) => (
              <li key={w.title} className="border-t border-[var(--brand-border)] py-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{w.title}</h3>
                <p className="mt-2 max-w-[48ch] text-[var(--brand-text-secondary)]">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none mx-auto w-full max-w-[420px]">
          <BrandLottie name="services" className="aspect-square w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">The work</h2>
          <div className="flex gap-8 font-semibold">
            <Link href="/work" className="underline-offset-4 hover:underline">
              Projects <span aria-hidden="true">→</span>
            </Link>
            <Link href="/gallery" className="underline-offset-4 hover:underline">
              Everything <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <ul className="m-0 mt-12 grid list-none gap-8 p-0 md:grid-cols-12 md:gap-x-6">
          {PEEK.map((p, i) => (
            <li key={p.src} className={PEEK_PLACE[i]}>
              <img src={p.src} alt={`${p.name}, picture`} loading="lazy" decoding="async" className="block h-auto w-full rounded-[8px] bg-[var(--brand-surface-secondary)]" />
            </li>
          ))}
        </ul>
      </section>

      <ToolMarquee />

      <NextPage />
    </>
  );
}
