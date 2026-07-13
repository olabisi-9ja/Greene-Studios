"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Side: Sticky Text */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 self-start">
          <div className="mb-8 max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">
                Process
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-text)] leading-[1.1] tracking-tight mb-6 uppercase">
              How we work.
            </h2>
            <p className="text-[var(--brand-text-secondary)] text-lg leading-relaxed">
              We believe that exceptional products are the result of an exceptional process. We work systematically, sequentially, and transparently.
            </p>
          </div>
        </div>
          
        {/* Right Side: Scrolling Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col bg-[var(--brand-surface)] p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
            >
              <div className="w-12 h-12 rounded-full border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-text)] font-mono text-sm mb-6 bg-[var(--brand-surface-secondary)] flex-shrink-0">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-text)] tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed mb-6 flex-1">
                {step.description}
              </p>
              <span className="text-[var(--brand-accent)] text-xs font-semibold tracking-wide uppercase mt-auto">
                {step.duration}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
