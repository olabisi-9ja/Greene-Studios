"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
          
          <div className="w-full md:w-1/3 relative">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold">
                  Process
                </span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-text)] leading-[1.1] tracking-tight mb-6">
                How we work.
              </h2>
              <p className="text-[var(--brand-text-secondary)] text-lg leading-relaxed">
                We believe that exceptional products are the result of an exceptional process. We work systematically, sequentially, and transparently.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex flex-col gap-16 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-[23px] top-4 bottom-12 w-px bg-[var(--brand-border)] hidden sm:block" />

              {PROCESS_STEPS.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0.3, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ duration: 0.6 }}
                  className="flex gap-8 relative z-10"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-text)] font-mono text-sm bg-[var(--brand-surface)] transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[var(--brand-text)] tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--brand-text-secondary)] text-lg leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                    <span className="inline-block mt-4 text-[var(--brand-accent)] text-sm font-semibold tracking-wide uppercase">
                      {step.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
