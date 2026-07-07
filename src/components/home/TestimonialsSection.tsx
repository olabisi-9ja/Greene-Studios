import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
            Client Voices
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <h2 className="text-5xl lg:text-6xl font-black text-[#F7F5F2] leading-tight tracking-tight">
            Words from
            <br />
            <span className="text-[#F7F5F2]/30">the people we serve.</span>
          </h2>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[#D9C9A3] text-xl">★</span>
            ))}
            <span className="text-[#F7F5F2]/50 text-sm ml-2">5.0 average</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                i === 0
                  ? "bg-[#12372A]/20 border-[#12372A]/40 md:col-span-2"
                  : "bg-white/[0.02] border-white/5"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-[#D9C9A3] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className={`font-medium leading-relaxed mb-8 ${
                  i === 0
                    ? "text-[#F7F5F2] text-2xl lg:text-3xl"
                    : "text-[#F7F5F2]/80 text-lg"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#12372A] border border-[#6B8F71]/30 flex items-center justify-center text-[#6B8F71] text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[#F7F5F2] font-semibold text-sm">{t.author}</div>
                  <div className="text-[#F7F5F2]/40 text-xs">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
