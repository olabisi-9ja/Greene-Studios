import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";
import TimelineSection from "@/components/about/TimelineSection";

export const metadata: Metadata = {
 title: "About — Our Story",
 description:
 "Greene Studios is a premium digital design and development studio. Learn about our mission, values, and the people behind the work.",
};

const VALUES = [
 {
 title: "Craft Over Speed",
 desc: "We take the time to do things properly. A project that takes two extra weeks but stands for five years is the right call.",
 icon: "◉",
 },
 {
 title: "Radical Transparency",
 desc: "No smoke and mirrors. You always know where your project stands, what it costs, and why we made every decision.",
 icon: "◆",
 },
 {
 title: "Substance Over Style",
 desc: "Beautiful things that don't work are failures. We design for outcomes first, aesthetics second — and they're not in conflict.",
 icon: "✦",
 },
 {
 title: "Long-Term Thinking",
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
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32">
 {/* Hero */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">About</span>
 </div>
 <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold text-[var(--brand-text)] leading-[1.05] tracking-tight mb-8 max-w-4xl text-balance">
 We believe design
 <br className="hidden md:block" />
 <span className="text-[var(--brand-text-secondary)]"> is a business tool.</span>
 </h1>
 <p className="text-[var(--brand-text-secondary)] text-lg lg:text-xl leading-relaxed max-w-2xl text-balance">
 Not decoration. Not art for art&apos;s sake. Design — done well — changes
 how people feel about a company, how quickly they trust it, and how
 confidently they spend money with it.
 </p>
 </div>

 {/* Mission */}
 <div className="bg-[var(--brand-bg)] border-y border-[var(--brand-border)] py-24">
 <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
 <p className="text-[var(--brand-text)] text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight text-balance">
 &ldquo;Greene Studios exists to build digital experiences that give
 ambitious brands an unfair competitive advantage through design
 excellence.&rdquo;
 </p>
 </div>
 </div>

 {/* Meet the Founder */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 border-b border-[var(--brand-border)]">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
 {/* Image placeholder */}
 <div className="relative">
 <div
 className="w-full rounded-[24px] overflow-hidden bg-[var(--brand-bg)] border border-[var(--brand-border)]"
 style={{ aspectRatio: "4/5" }}
 >
 <div className="w-full h-full flex flex-col items-center justify-center">
 <div className="text-center">
 <div className="w-24 h-24 rounded-full bg-white border border-[var(--brand-border)] shadow-sm mx-auto mb-6 flex items-center justify-center">
 <span className="text-[var(--brand-text)] text-3xl font-semibold">G</span>
 </div>
 <p className="text-[var(--brand-text-secondary)] text-sm font-medium tracking-wide uppercase">Founder Photo</p>
 </div>
 </div>
 </div>
 {/* Badge */}
 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-[var(--brand-border)] p-5 rounded-2xl shadow-sm">
 <p className="text-[var(--brand-text)] font-semibold text-sm mb-1">Founded 2022</p>
 <p className="text-[var(--brand-text-secondary)] text-xs font-medium">Lagos, Nigeria</p>
 </div>
 </div>

 {/* Story */}
 <div>
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">Founder</span>
 </div>
 <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--brand-text)] mb-8 tracking-tight leading-tight">
 Meet the mind
 <br />behind Greene.
 </h2>
 <div className="space-y-6 text-[var(--brand-text-secondary)] text-lg leading-relaxed">
 <p>
 Greene Studios was born from a simple belief: that the gap between
 how most companies present themselves online and how good their
 actual product is — is an enormous opportunity.
 </p>
 <p>
 We started as a solo design practice in 2022, building websites for
 Lagos-based startups. What set us apart wasn&apos;t the tools we used
 or the style we had — it was the commitment to understanding
 businesses deeply before touching a design file.
 </p>
 <p>
 Today, Greene Studios works with ambitious companies globally — from
 seed-stage startups to Series B companies — helping them close the
 gap between their product quality and their digital presence.
 </p>
 </div>

 <div className="mt-12 grid grid-cols-2 gap-6">
 {[
 { value: "40+", label: "Projects" },
 { value: "$50M+", label: "Revenue Generated" },
 { value: "98%", label: "Client Satisfaction" },
 { value: "3+", label: "Years of Craft" },
 ].map((stat) => (
 <div key={stat.label} className="p-6 bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-2xl">
 <div className="text-3xl font-semibold text-[var(--brand-text)] tracking-tight">{stat.value}</div>
 <div className="text-[var(--brand-text-secondary)] text-sm font-medium mt-2">{stat.label}</div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Values */}
 <div className="bg-white py-32 border-b border-[var(--brand-border)]">
 <div className="max-w-7xl mx-auto px-6 lg:px-12">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">Values</span>
 </div>
 <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--brand-text)] mb-16 tracking-tight">
 Principles we
 <br /><span className="text-[var(--brand-text-secondary)]">refuse to compromise.</span>
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {VALUES.map((value) => (
 <div key={value.title} className="p-10 bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
 <div className="text-2xl mb-6 text-[var(--brand-accent)]">{value.icon}</div>
 <h3 className="text-[var(--brand-text)] font-semibold text-2xl mb-4 tracking-tight">{value.title}</h3>
 <p className="text-[var(--brand-text-secondary)] text-base leading-relaxed">{value.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Timeline Section */}
 <TimelineSection />

 {/* Technologies */}
 <div className="bg-[var(--brand-bg)] py-32">
 <div className="max-w-7xl mx-auto px-6 lg:px-12">
 <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--brand-text)] mb-12 tracking-tight text-center">
 Our Tech Stack
 </h2>
 <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
 {TECHNOLOGIES.map((tech) => (
 <span key={tech} className="bg-white border border-[var(--brand-border)] text-[var(--brand-text)] font-medium text-sm px-6 py-3 rounded-full hover:border-[var(--brand-text)] transition-all duration-300 shadow-sm">
 {tech}
 </span>
 ))}
 </div>
 </div>
 </div>

 <CTASection />
 </div>
 );
}
