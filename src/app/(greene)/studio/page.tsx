import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { StudioHero } from "@/components/about/StudioHero";
import CTASection from "@/components/home/CTASection";
import TimelineSection from "@/components/about/TimelineSection";
import RotatingGlobe from "@/components/ui/RotatingGlobe";

export const metadata: Metadata = {
 title: "Studio · Greene Studios",
 description:
 "Greene Studios is an independent design studio crafting brands, websites and digital products. Remote, available worldwide.",
};

const VALUES = [
 {
 title: "Craft over speed",
 desc: "We take the time to do things properly. A project that takes two extra weeks but stands for five years is the right call.",
 icon: "◉",
 },
 {
 title: "Radical transparency",
 desc: "No smoke and mirrors. You always know where your project stands, what it costs, and why we made every decision.",
 icon: "◆",
 },
 {
 title: "Substance over style",
 desc: "Beautiful things that don't work are failures. We design for outcomes first, aesthetics second, and they're not in conflict.",
 icon: "✦",
 },
 {
 title: "Long-term thinking",
 desc: "We measure success in years, not deliverables. The relationships we build outlast every project we ship.",
 icon: "◈",
 },
];

const TECHNOLOGIES = [
 "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
 "GSAP", "Three.js", "Figma", "Framer", "Webflow", "PostgreSQL",
 "Drizzle ORM", "Vercel", "Storybook", "Lottie",
];

function founderPortrait(): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    const rel = `/images/studio/founder.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function StudioPage() {
 const portrait = founderPortrait();
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
  <StudioHero portrait={portrait} />

 {/* Mission */}
 <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 md:py-32">
 <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
 <p className="text-[clamp(1.6rem,3.2vw,2.6rem)] leading-snug tracking-tight text-[var(--brand-text)]">
 Greene Studios exists to build digital experiences that give ambitious brands an unfair advantage through design excellence.
 </p>
 </div>
 </section>

 {/* Founder */}
 <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
 <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
              {portrait ? (
                <Image
                  src={portrait}
                  alt="Olabisi Adigun, founder of Greene Studios"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-10 text-center">
                  <p className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)]/25">
                    Greene
                    <br />
                    Studios
                  </p>
                </div>
              )}
              {portrait ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              ) : null}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-[var(--brand-bg)]/95 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                  Founder
                </p>
                <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                  Olabisi Adigun
                </p>
              </div>
            </div>
 <div className="absolute -bottom-6 -left-4 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-6 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:-left-8">
 <p className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">Founded 2022</p>
 <p className="mt-1 text-xs font-medium text-[var(--brand-text-secondary)]">Remote • Available worldwide</p>
 </div>
 </div>

 <div>
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> The story
 </span>
 <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-black uppercase leading-[0.95] tracking-tight">
 Meet the mind behind Greene
 </h2>
 <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
 <p>
 Greene Studios was born from a simple belief: that the gap between how most companies present themselves online and how good their actual product is, is an enormous opportunity.
 </p>
 <p>
 We started as a solo design practice in 2022, building websites for early-stage startups. What set us apart was not the tools we used or the style we had, it was the commitment to understanding businesses deeply before touching a design file.
 </p>
 <p>
 Today, Greene Studios works with ambitious companies globally, from seed-stage startups to Series B companies, helping them close the gap between their product quality and their digital presence.
 </p>
 </div>

 <div className="mt-12 grid grid-cols-2 gap-4">
 {[
 { value: "6", label: "Brand systems" },
 { value: "95+", label: "Lighthouse floor" },
 { value: "<1.2s", label: "Target LCP" },
 { value: "2022", label: "Founded" },
 ].map((stat) => (
 <div key={stat.label} className="card">
 <div className="font-display text-3xl font-black tracking-tight text-[var(--brand-text)] md:text-4xl">
 {stat.value}
 </div>
 <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 {stat.label}
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Values */}
 <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 md:py-32">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Values
 </span>
 <h2 className="mb-14 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight md:mb-16">
 Principles we refuse to compromise
 </h2>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
 {VALUES.map((value) => (
 <div
 key={value.title}
 className="group rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-10"
 >
 <div className="mb-6 flex items-center justify-between">
 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-accent)] text-lg text-[var(--brand-on-accent)]">
 {value.icon}
 </span>
 <span className="font-mono text-xs text-[var(--brand-text-secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
 ✦
 </span>
 </div>
 <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)]">
 {value.title}
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
 {value.desc}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <TimelineSection />

 {/* Remote / Globe, replaces location */}
 <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
  <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
    <div>
      <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
        <span className="text-[var(--brand-accent)]">✦</span> Remote
      </span>
      <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-black uppercase leading-[0.95] tracking-tight">
        Available worldwide, working remotely
      </h2>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
        We work fully remote and collaborate across time zones. No matter where you are, we bring senior craft, clear communication and reliable delivery, as if we were in the room next door.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-xs font-semibold">Async-friendly process</span>
        <span className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-xs font-semibold">Overlap hours for reviews</span>
        <span className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-xs font-semibold">English, clear comms</span>
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-2 w-fit">
        <span className="relative h-7 w-7 overflow-hidden rounded-full bg-[var(--brand-surface-secondary)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/character/greene-mascot.png" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="text-xs font-medium">Greene character — your guide across studio mode</span>
      </div>
      <Link href="/contact" className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--brand-text)] px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]">
        Start a project <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </div>
    <div className="relative">
      <RotatingGlobe className="mx-auto w-full max-w-[520px] aspect-square" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
    </div>
  </div>
 </section>

 {/* Technologies */}
 <section className="border-t border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 md:py-32">
 <div className="mx-auto max-w-[1400px] px-5 text-center md:px-10">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Toolbox
 </span>
 <h2 className="mb-12 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
 Our tech stack
 </h2>
 <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
 {TECHNOLOGIES.map((tech) => (
 <span
 key={tech}
 className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg)] px-6 py-3 text-sm font-semibold text-[var(--brand-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
 >
 {tech}
 </span>
 ))}
 </div>
 <div className="mt-14 flex flex-wrap justify-center gap-3">
  <Link href="/team" className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-7 py-3 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] transition-colors hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]">
    Meet the team <span aria-hidden="true" className="ml-2">→</span>
  </Link>
  <Link href="/careers" data-cursor="JOIN" className="inline-flex items-center justify-center rounded-full bg-[var(--brand-text)] px-7 py-3 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]">
    See open roles <span aria-hidden="true" className="ml-2">→</span>
  </Link>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
}
