import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import CTASection from "@/components/home/CTASection";
import TimelineSection from "@/components/about/TimelineSection";

export const metadata: Metadata = {
 title: "About · Our Story",
 description:
 "Greene Studios is a premium digital design and development studio. Learn about our mission, values, and the people behind the work.",
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

export default function AboutPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="About the studio"
 title={
 <>
 We believe design
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">is a business tool.</span>
 </>
 }
 description="Not decoration. Not art for art's sake. Design, done well, changes how people feel about a company, how quickly they trust it, and how confidently they spend money with it."
 right={
 <div className="flex items-center gap-6">
 <div>
 <p className="font-display text-5xl font-black leading-none text-[var(--brand-text)]">40+</p>
 <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">Projects shipped</p>
 </div>
 <span className="h-12 w-px bg-[var(--brand-border)]" />
 <div>
 <p className="font-display text-5xl font-black leading-none text-[var(--brand-text)]">$50M+</p>
 <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">Client revenue</p>
 </div>
 </div>
 }
 />

 {/* Mission */}
 <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-24 md:py-32">
 <div className="mx-auto max-w-5xl px-5 text-center md:px-10">
 <p className="font-serif-i text-[clamp(1.8rem,3.6vw,3rem)] leading-snug text-[var(--brand-text)]">
 “Greene Studios exists to build digital experiences that give ambitious brands an unfair competitive advantage through design excellence.”
 </p>
 </div>
 </section>

 {/* Founder */}
 <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
 <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* Portrait */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
              <Image
                src="/images/hero/team-2.jpg"
                alt="The Greene Studios team"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-[var(--brand-bg)]/95 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                  The people
                </p>
                <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                  The mind behind the work
                </p>
              </div>
            </div>
 <div className="absolute -bottom-6 -left-4 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-6 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:-left-8">
 <p className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">Founded 2022</p>
 <p className="mt-1 text-xs font-medium text-[var(--brand-text-secondary)]">Remote · Working worldwide</p>
 </div>
 </div>

 {/* Story */}
 <div>
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> The story
 </span>
 <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-black uppercase leading-[0.95] tracking-tight">
 Meet the mind
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">behind Greene.</span>
 </h2>
 <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
 <p>
 Greene Studios was born from a simple belief: that the gap between how most companies present themselves online and how good their actual product is, is an enormous opportunity.
 </p>
 <p>
 We started as a solo design practice in 2022, building websites for early-stage startups. What set us apart wasn&apos;t the tools we used or the style we had, it was the commitment to understanding businesses deeply before touching a design file.
 </p>
 <p>
 Today, Greene Studios works with ambitious companies globally, from seed-stage startups to Series B companies, helping them close the gap between their product quality and their digital presence.
 </p>
 </div>

 <div className="mt-12 grid grid-cols-2 gap-4">
 {[
 { value: "40+", label: "Projects" },
 { value: "$50M+", label: "Revenue generated" },
 { value: "98%", label: "Client satisfaction" },
 { value: "3+", label: "Years of craft" },
 ].map((stat) => (
 <div key={stat.label} className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
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
 Principles we refuse to <span className="font-serif-i lowercase normal-case tracking-normal">compromise.</span>
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

 {/* Technologies */}
 <section className="py-24 md:py-32">
 <div className="mx-auto max-w-[1400px] px-5 text-center md:px-10">
 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Toolbox
 </span>
 <h2 className="mb-12 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight">
 Our tech <span className="font-serif-i lowercase normal-case tracking-normal">stack.</span>
 </h2>
 <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
 {TECHNOLOGIES.map((tech) => (
 <span
 key={tech}
 className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-6 py-3 text-sm font-semibold text-[var(--brand-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
 >
 {tech}
 </span>
 ))}
 </div>
 <Link href="/careers" data-cursor="JOIN" className="btn-outline mt-14">
 See open roles <span aria-hidden="true">→</span>
 </Link>
 </div>
 </section>

 <CTASection />
 </div>
 );
}
