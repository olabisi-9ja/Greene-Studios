import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#BFA36A]" />
          <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
            Client Voices
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#101010] leading-[1.1] tracking-tight">
            Words from <br className="hidden md:block" /> the people we serve.
          </h2>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[#BFA36A] text-xl">★</span>
            ))}
            <span className="text-[#101010] font-semibold text-sm ml-2">5.0 average</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`p-10 rounded-[24px] border transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${
                i === 0
                  ? "bg-[#FAFAFA] border-[#E6E6E6] md:col-span-2 lg:p-16"
                  : "bg-white border-[#E6E6E6]"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-[#BFA36A] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className={`font-medium leading-relaxed mb-10 text-[#101010] ${
                  i === 0
                    ? "text-3xl lg:text-4xl tracking-tight"
                    : "text-xl tracking-tight"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white text-sm font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[#101010] font-semibold text-base">{t.author}</div>
                  <div className="text-[#757575] text-sm">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
