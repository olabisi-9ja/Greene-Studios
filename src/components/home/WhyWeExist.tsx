"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

const CARDS = [
  {
    id: "01",
    title: "Retail & Hospitality",
    description: "We build custom-crafted products tailored to your unique identity, ensuring every physical and digital touchpoint resonates with your guests.",
    color: "#5294A8", 
  },
  {
    id: "02",
    title: "Consumer & Home",
    description: "Create experiences in real spaces by transforming standard interfaces into personal, seamless companions for everyday life.",
    color: "#DAB758", 
  },
  {
    id: "03",
    title: "Research & Education",
    description: "Built on modern stacks. We ensure your digital presence is scalable, accessible, and designed to foster learning and discovery.",
    color: "#9C5248", 
  },
  {
    id: "04",
    title: "Entertainment & Experiences",
    description: "Make every touchpoint an opportunity. We craft highly interactive platforms that keep your users engaged and coming back.",
    color: "#46A98F", 
  }
];

export default function WhyWeExist() {
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, '.stagger-item');

  return (
    <section className="py-32 bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-[var(--brand-text-secondary)] text-xs tracking-widest uppercase font-semibold block mb-6">
              Why We Exist
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase">
              We build custom products that make you unforgettable.
            </h2>
          </div>
          <div className="pb-4">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--brand-text)] flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="w-full flex flex-col border-t-2 border-[var(--brand-text)]">
          {CARDS.map((card) => {
            const isHovered = hovered === card.id;
            return (
              <div 
                key={card.id}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                className="stagger-item w-full group cursor-none border-b-2 border-[var(--brand-text)] relative overflow-hidden"
                data-cursor="EXPLORE"
              >
                {/* Hover Background Fill Effect */}
                <motion.div 
                  initial={{ height: "0%" }}
                  animate={{ height: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full z-0 opacity-10"
                  style={{ backgroundColor: card.color }}
                />

                <div className="py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10 w-full">
                  <div className="col-span-1 lg:col-span-1 pt-1 md:pt-2">
                    <span className="text-lg md:text-2xl font-bold opacity-30 font-serif block">
                      {card.id}
                    </span>
                  </div>
                  
                  <div className="col-span-1 lg:col-span-7">
                    <h3 
                      className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase transition-colors duration-500 leading-[0.9]"
                      style={{ color: isHovered ? card.color : 'var(--brand-text)' }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  
                  <div className="col-span-1 lg:col-span-4 flex items-start justify-start lg:justify-end min-h-[80px]">
                    <AnimatePresence mode="wait">
                      {isHovered ? (
                        <motion.p 
                          key="desc"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm md:text-base font-medium leading-relaxed max-w-sm lg:text-right pt-2"
                          style={{ color: 'var(--brand-text)' }}
                        >
                          {card.description}
                        </motion.p>
                      ) : (
                        <motion.div 
                          key="arrow"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="hidden lg:flex w-16 h-16 rounded-full border-2 border-[var(--brand-text)] items-center justify-center transition-transform duration-500 group-hover:rotate-45"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
