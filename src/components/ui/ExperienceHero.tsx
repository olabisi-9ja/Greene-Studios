"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAtmosphere, AccentColor, accentHexMap } from '@/lib/context/AtmosphereContext';
import TextReveal from '@/components/animations/TextReveal';

export const ExperienceHero = () => {
  const { mode, setMode, accent, setAccent, accentHex } = useAtmosphere();
  const [showreelIndex, setShowreelIndex] = useState(0);

  // High quality abstract images/animations for showreel
  const showreelItems = [
    { type: "color", color: "#1F3D3A", text: "Crafting digital systems" },
    { type: "color", color: "#0F1113", text: "Aesthetics meet performance" },
    { type: "color", color: "#6324D6", text: "Award-winning layouts" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowreelIndex((prev) => (prev + 1) % showreelItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showreelItems.length]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-12 bg-[var(--brand-bg)] transition-colors duration-1000">
      
      {/* Dynamic Grid Background (changes opacity based on mode) */}
      <div 
        className="absolute inset-0 opacity-[0.03] transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(var(--brand-text) 1px, transparent 1px), linear-gradient(90deg, var(--brand-text) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
        
        {/* Left Content (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-[var(--brand-accent)] text-xs tracking-[0.25em] uppercase font-bold transition-colors duration-500">
              Creative atmosphere engine active
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight text-[var(--brand-text)] mb-6 text-balance uppercase">
            We build <br />
            <TextReveal className="text-[var(--brand-accent)] transition-colors duration-500">digital products</TextReveal> <br />
            people remember.
          </h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-lg text-[var(--brand-text-secondary)] leading-relaxed max-w-lg mb-8"
          >
            Greene Studios is an award-winning creative agency designing custom branding, high-conversion marketing sites, and full-stack applications.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
          >
            <Link 
              href="/contact"
              data-cursor="HI"
              className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-8 py-4 rounded-full text-base font-medium hover:bg-[var(--brand-accent)] hover:text-white transition-all duration-300 shadow-md text-center"
            >
              Start a Project
            </Link>
            <Link 
              href="/work"
              data-cursor="VIEW"
              className="border border-[var(--brand-border)] text-[var(--brand-text)] px-8 py-4 rounded-full text-base font-medium hover:border-[var(--brand-text)] transition-colors text-center"
            >
              Our Work
            </Link>
          </motion.div>



        </div>

        {/* Right Content (5 Cols) - Large looping showreel */}
        <div className="lg:col-span-5 h-[350px] md:h-[500px] w-full relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--brand-border)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={showreelIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col justify-end p-8"
              style={{ backgroundColor: showreelItems[showreelIndex].color }}
            >
              {/* Subtle glass overlay inside showcase */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[1]" />
              
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-2">Showcase</span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                  {showreelItems[showreelIndex].text}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[var(--brand-text-secondary)] text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--brand-text)] to-transparent" />
      </div>

    </section>
  );
};
