"use client";

import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { useSectionAnimation } from "@/lib/hooks/useSectionAnimation";

const MARQUEE_WORDS = ["LET'S TALK", "LET'S BUILD", "LET'S START", "LET'S MAKE WAVES"];

export default function CTASection() {
 const sectionRef = useSectionAnimation<HTMLElement>();

 return (
 <section ref={sectionRef} className="relative overflow-hidden bg-[var(--brand-accent)] text-[var(--brand-ink)]">
 {/* Giant CTA */}
 <div className="mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
 <span className="mb-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em]">
 <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-ink)]" />
 Let&apos;s build together
 <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-ink)]" />
 </span>

 <h2 className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-black uppercase leading-[0.92] tracking-tight">
 Ready to build something
 <br />
 people <span className="font-serif-i lowercase normal-case tracking-normal">can&apos;t ignore?</span>
 </h2>

 <p className="mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed md:text-lg">
 Tell us about your project. We&apos;ll respond within 24 hours with a clear path forward, no fluff, no pressure.
 </p>

 <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
 <Magnetic>
 <Link
 href="/contact"
 data-cursor="HELLO"
 className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--brand-ink)] px-10 py-5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-accent)] transition-transform duration-300 hover:scale-[1.04]"
 >
 Start a project <span aria-hidden="true">→</span>
 </Link>
 </Magnetic>
 <Magnetic>
 <a
 href="mailto:hello@greenestudios.co"
 className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[var(--brand-ink)] px-10 py-5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-ink)] transition-colors duration-300 hover:bg-[var(--brand-ink)] hover:text-[var(--brand-accent)]"
 >
 hello@greenestudios.co
 </a>
 </Magnetic>
 </div>

 <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.15em]">
 <span>✓ Response within 24h</span>
 <span>✓ No commitment required</span>
 <span>✓ NDA on request</span>
 </div>
 </div>

 {/* Bottom marquee */}
 <div className="border-t-2 border-[var(--brand-ink)] bg-[var(--brand-ink)] py-3 text-[var(--brand-accent)]">
 <Marquee>
 <MarqueeContent speed={40} autoFill>
 {MARQUEE_WORDS.map((word, i) => (
 <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
 <span className="font-display text-lg font-black uppercase tracking-wide md:text-xl">{word}</span>
 <span className="text-base" aria-hidden="true">✦</span>
 </MarqueeItem>
 ))}
 </MarqueeContent>
 </Marquee>
 </div>
 </section>
 );
}
