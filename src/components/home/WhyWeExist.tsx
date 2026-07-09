"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function WhyWeExist() {
  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-6">
          Why We Exist
        </span>
        <h2 className="text-[clamp(1.75rem,5vw,5rem)] font-black leading-[1.05] tracking-tight text-[var(--brand-text)] max-w-5xl mx-auto uppercase break-words hyphens-auto">
          <TextReveal>We believe standard templates dilute your brand value. We build custom-crafted products that make you unforgettable.</TextReveal>
        </h2>
      </div>
    </section>
  );
}
