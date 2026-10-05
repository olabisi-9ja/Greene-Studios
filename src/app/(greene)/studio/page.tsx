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
    title: "Find the real problem",
    body: "Before touching a screen, we work out what's actually wrong. A slow download can turn out to be a distribution problem, and that changes the whole product.",
  },
  {
    title: "Turn it into a system",
    body: "A messy idea becomes clear parts that can each be designed, built and changed on their own.",
  },
  {
    title: "Put it in people's hands",
    body: "Ship it, watch how people use it, and improve it. Design and code come from the same hands, so nothing gets lost between them.",
  },
];

/** The road to the studio, year by year. */
const JOURNEY = [
  { year: "2022", title: "Started with design", body: "Typography, layout and visual systems. Still how every product here is looked at." },
  { year: "2023", title: "Freelancing", body: "Real clients and real briefs, and learning to turn ideas into products people use." },
  { year: "2024", title: "Software", body: "Deeper into engineering, to build complete products, not just screens." },
  { year: "2025", title: "First startup", body: "MeshLearn: shipping, failing and improving in public." },
  { year: "2026", title: "Greene Studios", body: "AI, fintech and offline-first products, and a studio for founders who want design and code from one team." },
];

const RECOGNITION = [
  { award: "First place", event: "Build with Gemma", project: "Sentry", year: "2026" },
  { award: "Runner-up", event: "KWASU Tech Conference", project: "MeshLearn", year: "2026" },
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

      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <p className="font-mono text-sm text-[var(--brand-text-secondary)]">Why Greene exists</p>
        <p className="mt-6 max-w-[22ch] text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          To help ambitious internet products look and feel as good as they actually are.
        </p>
        <div className="mt-12 grid gap-8 text-lg leading-relaxed text-[var(--brand-text-secondary)] md:grid-cols-2 md:gap-16">
          <p>
            Most founders build something genuinely interesting, then present it in a way that undersells it. We work with startups and founders in
            their first 18 months, when the brand is still taking shape and the design decisions will compound for years.
          </p>
          <p>
            And we don&apos;t hand over a design file and wish you luck. We build it, so good design has to work in production. Small and selective
            by choice: closer to an architect&apos;s practice than an agency.
          </p>
        </div>
        <Link href="/journal/building-greene-studios" className="mt-10 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
          Read the full story <span aria-hidden="true">→</span>
        </Link>
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
        <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">The journey</h2>
        <ol className="m-0 mt-10 list-none border-t border-[var(--brand-border)] p-0">
          {JOURNEY.map((j) => (
            <li key={j.year} className="grid gap-2 border-b border-[var(--brand-border)] py-6 md:grid-cols-[8rem_14rem_1fr] md:items-baseline md:gap-8">
              <span className="font-mono text-sm text-[var(--brand-text-secondary)]">{j.year}</span>
              <span className="text-xl font-semibold tracking-[-0.02em]">{j.title}</span>
              <span className="text-[var(--brand-text-secondary)]">{j.body}</span>
            </li>
          ))}
        </ol>

        <h3 className="mt-20 text-2xl font-semibold tracking-[-0.03em]">Recognition</h3>
        <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
          {RECOGNITION.map((r) => (
            <li key={r.event} className="rounded-[12px] bg-[var(--brand-surface)] p-7 shadow-[0_1px_0_var(--brand-border)]">
              <p className="text-3xl font-semibold tracking-[-0.03em]">{r.award}</p>
              <p className="mt-2">{r.event}</p>
              <p className="mt-1 text-sm text-[var(--brand-text-secondary)]">
                {r.project} · {r.year}
              </p>
            </li>
          ))}
        </ul>
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
