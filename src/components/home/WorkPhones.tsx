"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconArrow } from "@/components/icons/GreeneIcons";
import { BRANDS } from "@/lib/brands";
import { cn } from "@/lib/utils";

/**
 * Selected work, told with the phone rather than with paragraphs.
 *
 * Desktop: the project list scrolls on the left while a pair of phones stays
 * pinned on the right; each project that reaches the middle of the screen
 * swaps the screens (light build in front, dark build tilted behind).
 * Mobile: each project carries its own pair of phones inline.
 * No horizontal scrolling anywhere.
 */
const HAS_DARK = new Set(["luminary", "arc", "bloom", "onyx", "prism"]);

const shots = (slug: string) => ({
  front: `/images/work/${slug}/home-mobile.webp`,
  back: HAS_DARK.has(slug) ? `/images/work/${slug}/home-mobile-dark.webp` : `/images/work/${slug}/home-mobile.webp`,
});

function Phone({ src, className = "", alt }: { src: string; className?: string; alt: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[1170/2532] w-full rounded-[2.6rem] bg-[#0b0b0b] p-[0.55rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-neutral-900">
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        <span className="absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  );
}

function PhonePair({ slug, name, stacked = false }: { slug: string; name: string; stacked?: boolean }) {
  const s = shots(slug);
  return (
    <div className={cn("relative mx-auto", stacked ? "w-[min(78vw,330px)] pb-6 pr-10" : "w-full")}>
      <Phone
        src={s.back}
        alt=""
        className="absolute right-0 top-[6%] w-[78%] rotate-[8deg] opacity-95"
      />
      <Phone src={s.front} alt={`${name} home screen on mobile`} className="relative w-[78%] -rotate-[3deg]" />
    </div>
  );
}

export default function WorkPhones() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-none tracking-[-0.04em]">Selected work</h2>
          <Link href="/work" className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline">
            All projects <IconArrow className="size-4" />
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16 lg:pb-24">
          <ol className="m-0 list-none p-0">
            {BRANDS.map((b, i) => (
              <li
                key={b.slug}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-i={i}
                className="flex min-h-[auto] flex-col justify-center border-t border-[var(--brand-border)] py-10 lg:min-h-[78vh] lg:py-0"
              >
                <div
                  className={cn(
                    "transition-opacity duration-500",
                    active === i ? "lg:opacity-100" : "lg:opacity-30",
                  )}
                >
                  <span className="font-mono text-sm text-[var(--brand-text-secondary)]">
                    {String(i + 1).padStart(2, "0")} · {b.sector}
                  </span>
                  <h3 className="mt-3 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                    {b.name}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-lg text-[var(--brand-text-secondary)]">{b.tagline}</p>
                  <Link
                    href={`/work/${b.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 font-medium text-[var(--brand-accent)] underline-offset-4 hover:underline"
                  >
                    View case <IconArrow className="size-4" />
                  </Link>
                </div>
                <div className="mt-10 lg:hidden">
                  <PhonePair slug={b.slug} name={b.name} stacked />
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh]">
              {BRANDS.map((b, i) => (
                <div
                  key={b.slug}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
                    active === i
                      ? "translate-y-0 opacity-100"
                      : i < active
                        ? "pointer-events-none -translate-y-16 opacity-0"
                        : "pointer-events-none translate-y-16 opacity-0",
                  )}
                >
                  <div className="h-full max-h-[700px] aspect-[0.62]">
                    <PhonePair slug={b.slug} name={b.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
