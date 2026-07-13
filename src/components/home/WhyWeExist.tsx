"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  {
    id: 1,
    title: "Retail & Hospitality",
    description: "We believe standard templates dilute your brand value. We build custom-crafted products tailored to your unique identity.",
    color: "#5294A8", // Teal blue from fauna
    borderRadius: "1rem",
  },
  {
    id: 2,
    title: "Consumer & Home",
    description: "Create experiences in real spaces by transforming Sprout into a personal assistant, a companion for family members, or a friendly concierge for the home.",
    color: "#DAB758", // Mustard yellow from fauna
    borderRadius: "50%",
  },
  {
    id: 3,
    title: "Research & Education",
    description: "Built on modern stacks. We ensure your digital presence is scalable, fast, and ready for whatever comes next.",
    color: "#9C5248", // Rust red from fauna
    borderRadius: "1rem",
  },
  {
    id: 4,
    title: "Entertainment & Experiences",
    description: "Make every touchpoint an opportunity. Keep your users engaged with beautiful micro-interactions and immersive storytelling.",
    color: "#46A98F", // Green from fauna
    borderRadius: "10rem",
  }
];

export default function WhyWeExist() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[var(--brand-bg)] transition-colors duration-1000 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 relative z-10">
        <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
          Why We Exist
        </span>
        <h2 className="text-3xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--brand-text)] max-w-4xl mx-auto uppercase">
          We build custom products that make you unforgettable.
        </h2>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-4 h-auto md:h-[500px]">
        {CARDS.map((card) => {
          const isHovered = hovered === card.id;
          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              layout
              initial={{ borderRadius: card.borderRadius }}
              animate={{ 
                flex: isHovered ? 2.5 : 1,
                borderRadius: isHovered ? "2rem" : card.borderRadius,
                backgroundColor: card.color
              }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full h-[250px] md:h-full flex flex-col items-center justify-center p-6 md:p-10 text-white cursor-pointer overflow-hidden origin-center will-change-[flex,border-radius]"
            >
              <motion.div layout className="text-center z-10 flex flex-col items-center justify-center w-full">
                <motion.h3 
                  layout 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-0 max-w-[200px] md:max-w-none"
                  animate={{ y: isHovered ? 0 : 10 }}
                >
                  {card.title}
                </motion.h3>
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0, y: 10 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "1rem", y: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-sm md:text-base font-medium max-w-[280px] text-white/90 leading-relaxed"
                    >
                      {card.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Subtle hover overlay effect */}
              <motion.div 
                className="absolute inset-0 bg-black pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0 : 0.05 }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
