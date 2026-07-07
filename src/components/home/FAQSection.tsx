"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#6B8F71]" />
              <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
                FAQ
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-[#F7F5F2] leading-tight tracking-tight mb-8">
              Questions
              <br />
              <span className="text-[#F7F5F2]/30">worth asking.</span>
            </h2>
            <p className="text-[#F7F5F2]/50 text-lg leading-relaxed mb-8">
              We believe informed clients make better partners. These are the
              questions we hear most often — and honest answers to each.
            </p>
            <p className="text-[#F7F5F2]/30 text-sm">
              Don&apos;t see your question here?{" "}
              <a href="mailto:hello@greenestudios.co" className="text-[#6B8F71] hover:text-[#F7F5F2] transition-colors">
                Email us directly.
              </a>
            </p>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border-b border-white/5"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-[#F7F5F2] font-semibold text-base group-hover:text-[#6B8F71] transition-colors pr-4">
                    {faq.question}
                  </span>
                  {open === i ? (
                    <Minus size={16} className="text-[#6B8F71] flex-shrink-0" />
                  ) : (
                    <Plus size={16} className="text-[#F7F5F2]/40 flex-shrink-0" />
                  )}
                </button>
                {open === i && (
                  <div className="pb-6">
                    <p className="text-[#F7F5F2]/50 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
