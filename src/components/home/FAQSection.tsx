"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#BFA36A]" />
              <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
                FAQ
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#101010] leading-[1.1] tracking-tight mb-8">
              Questions <br /> worth asking.
            </h2>
            <p className="text-[#757575] text-lg leading-relaxed mb-8">
              We believe informed clients make better partners. These are the
              questions we hear most often — and honest answers to each.
            </p>
            <p className="text-[#757575] text-sm">
              Don&apos;t see your question here?{" "}
              <a href="mailto:hello@greenestudios.co" className="text-[#101010] font-medium hover:text-[#BFA36A] transition-colors underline underline-offset-4">
                Email us directly.
              </a>
            </p>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border-b border-[#E6E6E6]"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-[#101010] font-medium text-lg tracking-tight group-hover:text-[#BFA36A] transition-colors pr-4">
                    {faq.question}
                  </span>
                  {open === i ? (
                    <Minus size={20} className="text-[#BFA36A] flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-[#757575] flex-shrink-0 group-hover:text-[#101010] transition-colors" />
                  )}
                </button>
                {open === i && (
                  <div className="pb-8">
                    <p className="text-[#757575] text-base leading-relaxed">
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
