"use client";

import Link from "next/link";
import ScrollRails from "@/components/scroll/ScrollRails";
import RollLabel from "@/components/ui/RollLabel";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

const CLIENTS = ["LUMINARY", "VERA", "ARC", "ONYX", "PRISM", "BLOOM"];

/**
 * The hero, rebuilt around the rail system.
 *
 * What used to be here: a full-viewport scene with a soft grid, two radial
 * glows, a cursor-parallax camera and GREENE set at 20rem in a scrolling moss
 * texture — six letters, six background crops, six motion values. It was the
 * loudest thing on the site and the slowest: the texture was the LCP element.
 *
 * What is here now: a drawn line, one statement, one paragraph, two buttons.
 * The line does the work the wordmark was doing — it is the first thing that
 * moves, and it moves because the reader scrolled, not because a timer fired.
 */
export const ExperienceHero = () => {
  return (
    <section className="relative w-full bg-[var(--brand-bg)] text-[var(--brand-text)]">
      {/* The figure reads before the words do: three separate lines arriving
          at three heights, meeting in the ring, leaving as one. */}
      <ScrollRails variant="lens" height={360} className="mt-20 md:mt-24" />

      <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 md:px-10 md:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h1 className="headline col-span-1 text-[clamp(2.5rem,5vw,4.75rem)] lg:col-span-7">
            We build digital things worth remembering.
          </h1>

          <div className="col-span-1 flex flex-col gap-8 lg:col-span-5 lg:pt-3">
            <p className="max-w-md text-lg leading-snug text-[var(--brand-text)]">
              Greene Studios designs and builds brands, websites &amp; digital products with
              uncommon presence.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                data-cursor="HELLO"
                className="group btn-block btn-block-solid"
              >
                <RollLabel text="Book a call" />
              </Link>
              <Link href="/work" data-cursor="SEE" className="group btn-block btn-block-ghost">
                <RollLabel text="See the work" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">
          Brand · Web · Product — Lagos, working worldwide
        </p>
      </div>

      {/* Concept brands: kept, but demoted to a hairline strip so it reads as
          a footnote to the statement rather than competing with it. */}
      <div className="border-y border-[var(--brand-border)]">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-8 px-5 py-3.5 md:px-10">
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--brand-text-secondary)] sm:block">
            Concept brands, built end to end
          </span>
          <div className="min-w-0 flex-1">
            <Marquee>
              <MarqueeContent speed={26} autoFill>
                {CLIENTS.map((client) => (
                  <MarqueeItem key={client} className="mx-5">
                    <span className="font-mono text-xs tracking-[0.14em] text-[var(--brand-text-secondary)]">
                      {client}
                    </span>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};
