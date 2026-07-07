"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  const principles = [
    {
      num: "01",
      title: "Function Over Fluff",
      desc: "Every interaction must serve a functional purpose. High aesthetics are non-negotiable, but usability and speed come first."
    },
    {
      num: "02",
      title: "Authentic Design",
      desc: "We don't copy trends blindly. We construct cohesive systems custom-tailored to the brand's true voice and target market."
    },
    {
      num: "03",
      title: "Long-term Value",
      desc: "We build clean architectures that scale. Our designs survive standard market cycles, keeping your brand relevant for years."
    }
  ];

  return (
    <section className="py-32 bg-[var(--brand-surface-secondary)] border-y border-[var(--brand-border)] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4">
            <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--brand-text)] uppercase tracking-tight leading-none mb-6">
              Principles <br /> we work by.
            </h2>
            <p className="text-[var(--brand-text-secondary)] text-lg">
              We follow a strict set of design and architectural values to ensure every project aligns with global creative standards.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-2xl"
              >
                <span className="text-sm font-mono text-[var(--brand-accent)]">{p.num}</span>
                <h3 className="text-xl font-bold text-[var(--brand-text)]">{p.title}</h3>
                <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
