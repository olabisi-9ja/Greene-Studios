import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Our Story",
  description:
    "Greene Studios is a premium digital design and development studio. Learn about our mission, values, and the people behind the work.",
};

const TIMELINE = [
  { year: "2022", event: "Greene Studios founded. First client: a Lagos-based fintech startup." },
  { year: "2022", event: "Shipped 8 projects in year one. Developed our signature process framework." },
  { year: "2023", event: "Expanded into product design and AI integration services." },
  { year: "2023", event: "First Awwwards nomination. Crossed $1M in client revenue generated." },
  { year: "2024", event: "Launched Greene Journal. 40+ published case studies and articles." },
  { year: "2025", event: "Opening 2–3 new project slots for ambitious brands worldwide." },
];

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
    <div className="min-h-screen bg-[#0e0e0e] pt-32">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">About</span>
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight mb-8 max-w-4xl">
          We believe design
          <br />
          <span className="text-[#F7F5F2]/30">is a business tool.</span>
        </h1>
        <p className="text-[#F7F5F2]/50 text-xl leading-relaxed max-w-2xl">
          Not decoration. Not art for art&apos;s sake. Design — done well — changes
          how people feel about a company, how quickly they trust it, and how
          confidently they spend money with it.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#12372A]/10 border-y border-[#12372A]/20 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#F7F5F2] text-3xl lg:text-4xl font-light leading-relaxed">
            &ldquo;Greene Studios exists to build digital experiences that give
            ambitious brands an unfair competitive advantage through design
            excellence.&rdquo;
          </p>
        </div>
      </div>

      {/* Meet the Founder */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#12372A] to-[#0e0e0e] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#12372A] border-2 border-[#6B8F71]/40 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-[#6B8F71] text-3xl font-black">G</span>
                  </div>
                  <p className="text-[#F7F5F2]/20 text-sm">Founder Photo</p>
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 left-6 bg-[#0e0e0e]/90 backdrop-blur border border-white/10 p-4 rounded-xl">
              <p className="text-[#F7F5F2] font-bold text-sm">Founded 2022</p>
              <p className="text-[#6B8F71] text-xs">Lagos, Nigeria</p>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#6B8F71]" />
              <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">Founder</span>
            </div>
            <h2 className="text-4xl font-black text-[#F7F5F2] mb-6 tracking-tight leading-tight">
              Meet the mind
              <br />behind Greene.
            </h2>
            <div className="space-y-4 text-[#F7F5F2]/50 text-base leading-relaxed">
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

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "40+", label: "Projects" },
                { value: "$50M+", label: "Revenue Generated" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "3+", label: "Years of Craft" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="text-2xl font-black text-[#F7F5F2]">{stat.value}</div>
                  <div className="text-[#F7F5F2]/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#141414] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#6B8F71]" />
            <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">Values</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#F7F5F2] mb-12 tracking-tight">
            Principles we
            <br /><span className="text-[#F7F5F2]/30">refuse to compromise.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value) => (
              <div key={value.title} className="p-8 bg-[#0e0e0e] border border-white/5 rounded-2xl hover:border-[#12372A]/40 transition-all">
                <div className="text-2xl mb-4 text-[#6B8F71]">{value.icon}</div>
                <h3 className="text-[#F7F5F2] font-bold text-xl mb-3 tracking-tight">{value.title}</h3>
                <p className="text-[#F7F5F2]/40 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">Timeline</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-[#F7F5F2] mb-12 tracking-tight">
          How we got here.
        </h2>
        <div className="max-w-3xl space-y-0">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-8 pb-10 relative">
              {i < TIMELINE.length - 1 && (
                <div className="absolute left-[34px] top-12 bottom-0 w-px bg-gradient-to-b from-[#12372A] to-transparent" />
              )}
              <div className="w-16 h-8 flex-shrink-0 bg-[#12372A]/20 border border-[#12372A]/40 rounded-full flex items-center justify-center mt-2">
                <span className="text-[#6B8F71] text-xs font-bold">{item.year}</span>
              </div>
              <p className="text-[#F7F5F2]/60 text-base leading-relaxed pt-1">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-[#141414] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-[#F7F5F2] mb-10 tracking-tight text-center">
            Our Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {TECHNOLOGIES.map((tech) => (
              <span key={tech} className="bg-[#0e0e0e] border border-white/10 text-[#F7F5F2]/60 text-sm px-5 py-2.5 rounded-full hover:border-[#6B8F71]/40 hover:text-[#F7F5F2] transition-all">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2 className="text-5xl font-black text-[#F7F5F2] mb-6 tracking-tight">
          Let&apos;s build something<br /><span className="text-[#F7F5F2]/30">that matters.</span>
        </h2>
        <p className="text-[#F7F5F2]/50 text-lg mb-8 leading-relaxed">
          We take on 2–3 new projects per quarter. If our approach resonates,
          let&apos;s start a conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold px-10 py-5 rounded-full transition-all"
        >
          Start a Conversation →
        </Link>
      </div>
    </div>
  );
}
