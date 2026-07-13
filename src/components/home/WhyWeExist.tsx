"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  {
    id: 1,
    title: "Retail & Hospitality",
    description: "We build custom-crafted products tailored to your unique identity.",
    color: "#5294A8", 
    borderRadius: "2.5rem", 
    zIndex: 10,
    marginLeft: "0",
  },
  {
    id: 2,
    title: "Consumer & Home",
    description: "Create experiences in real spaces by transforming interfaces.",
    color: "#DAB758", 
    borderRadius: "100%", // Oval
    zIndex: 20,
    marginLeft: "-2rem",
  },
  {
    id: 3,
    title: "Research & Education",
    description: "Built on modern stacks. We ensure your digital presence is scalable.",
    color: "#9C5248", 
    borderRadius: "2.5rem", 
    zIndex: 15,
    marginLeft: "-2rem",
  },
  {
    id: 4,
    title: "Entertainment & Experiences",
    description: "Make every touchpoint an opportunity. Keep your users engaged.",
    color: "#46A98F", 
    borderRadius: "10rem", // Vertical Pill
    zIndex: 5,
    marginLeft: "-2rem",
  }
];

export default function WhyWeExist() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[var(--brand-bg)] transition-colors duration-1000 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 relative z-10">
        <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
          Why We Exist
        </span>
        <h2 className="text-3xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--brand-text)] max-w-4xl mx-auto uppercase">
          We build custom products that make you unforgettable.
        </h2>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-stretch justify-center h-auto md:h-[600px] py-10">
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
                flex: isHovered ? 1.8 : 1,
                zIndex: isHovered ? 50 : card.zIndex,
                borderRadius: card.borderRadius, // keep organic shapes
                scale: isHovered ? 1.05 : 1, // slight pop out effect
              }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="relative w-full h-[300px] md:h-full flex flex-col items-center justify-center p-6 md:p-10 text-white cursor-none overflow-hidden origin-center will-change-[flex,transform]"
              style={{ 
                backgroundColor: card.color,
                marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? card.marginLeft : '0',
                marginTop: typeof window !== 'undefined' && window.innerWidth < 768 && card.id > 1 ? "-2rem" : '0',
              }}
              data-cursor="EXPLORE"
            >
              <motion.div layout className="text-center z-10 flex flex-col items-center justify-center w-full relative">
                <motion.h3 
                  layout 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight max-w-[220px]"
                  animate={{ y: isHovered ? -10 : 0 }}
                >
                  {card.title}
                </motion.h3>
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: 20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-sm md:text-base font-medium max-w-[280px] text-white/90 leading-relaxed mt-4"
                    >
                      {card.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
