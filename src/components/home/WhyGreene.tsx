const REASONS = [
  {
    title: "Strategy First",
    description:
      "We don't open Figma until we understand your business. Every design decision is anchored in research, not aesthetics.",
    icon: "◉",
  },
  {
    title: "Obsessive Craft",
    description:
      "We care about kerning, transitions, and the exact shade of green. The details aren't precious — they're the product.",
    icon: "✦",
  },
  {
    title: "Performance is Non-Negotiable",
    description:
      "Beautiful and fast. We target sub-1-second interactions and 95+ Lighthouse scores as baseline, not aspirational.",
    icon: "⬡",
  },
  {
    title: "You Own Everything",
    description:
      "Full IP transfer, your assets in your repository, complete handoff documentation. No lock-in, ever.",
    icon: "◆",
  },
  {
    title: "We Write, Too",
    description:
      "Strategy documents, UX copy, SEO content — we bring voice and story alongside visual craft.",
    icon: "◈",
  },
  {
    title: "True Partnership",
    description:
      "We don't do 'set and forget.' We track metrics post-launch and iterate based on real user behavior.",
    icon: "◎",
  },
];

export default function WhyGreene() {
  return (
    <section className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.015] whitespace-nowrap pointer-events-none select-none">
        GREENE
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#6B8F71]" />
              <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
                Why Greene
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-[#F7F5F2] leading-tight tracking-tight mb-8">
              Fewer clients.
              <br />
              <span className="text-[#F7F5F2]/30">More care.</span>
            </h2>
            <p className="text-[#F7F5F2]/50 text-lg leading-relaxed mb-8">
              We deliberately limit our client roster. Not because we can&apos;t
              handle more — but because we refuse to compromise the quality that
              has defined every project we&apos;ve shipped.
            </p>
            <p className="text-[#F7F5F2]/40 text-base leading-relaxed">
              When you work with Greene Studios, you get the founders — not a
              team of juniors. You get direct communication, obsessive
              attention, and a studio that treats your project like it&apos;s our
              only one. Because at that moment, it is.
            </p>

            {/* Availability */}
            <div className="mt-10 p-6 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#6B8F71] animate-pulse" />
                <span className="text-[#6B8F71] text-sm font-semibold">
                  Currently Accepting Projects
                </span>
              </div>
              <p className="text-[#F7F5F2]/50 text-sm">
                2–3 project slots open for Q1 2025. Early conversations
                encouraged.
              </p>
            </div>
          </div>

          {/* Right — Reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS.map((reason) => (
              <div
                key={reason.title}
                className="group p-6 bg-white/[0.02] hover:bg-[#12372A]/10 border border-white/5 hover:border-[#12372A]/30 rounded-2xl transition-all duration-300"
              >
                <div className="text-2xl mb-4 text-[#6B8F71]">{reason.icon}</div>
                <h3 className="text-[#F7F5F2] font-bold text-base mb-2 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-[#F7F5F2]/40 text-sm leading-relaxed group-hover:text-[#F7F5F2]/60 transition-colors">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
