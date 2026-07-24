"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { BRAND } from '@/lib/data';
import { useHeroAnimation } from '@/lib/hooks/useHeroAnimation';

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { headlineRef, textRef, buttonRef } = useHeroAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Subtle parallax for the giant background text
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleEffect = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacityEffect = useTransform(scrollYProgress, [0, 1], [1, 0.1]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 p-6 md:p-12 pt-32 md:pt-36 pb-8 z-0">
      
      {/* Top Row */}
      <div className="flex justify-between items-start w-full relative z-20 mt-4 md:mt-8">
        <div className="max-w-md pointer-events-auto flex flex-col items-start gap-4 md:gap-6">
          <h2 ref={headlineRef} className="text-xl md:text-3xl font-bold leading-[1.1] tracking-tight">
            Not a style, a perspective.<br />
            Because Greene is Everything.
          </h2>
          <div ref={buttonRef}>
            <Link 
              href="/contact"
              data-cursor="CALL"
              className="inline-flex items-center justify-center gap-3 bg-[var(--brand-text)] text-[var(--brand-bg)] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              BOOK A CALL &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Massive Center Text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex w-full pointer-events-none select-none relative z-10 overflow-hidden"
      >
        <motion.h1 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black leading-[0.8] tracking-tighter text-[var(--brand-text)] whitespace-nowrap uppercase transition-colors duration-1000 origin-center"
          style={{ 
            fontSize: "clamp(6rem, 24vw, 35rem)", 
            y: yParallax,
            scale: scaleEffect,
            opacity: opacityEffect
          }}
        >
          GREENE
        </motion.h1>
      </motion.div>

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full font-bold gap-4 pointer-events-auto relative z-20">
        <div ref={textRef} className="flex items-center gap-2 text-sm md:text-base font-bold tracking-tight whitespace-nowrap">
          Creative studio in Nigeria
        </div>
        
        <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase">
          <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
            LINKEDIN
          </a>
          <span className="opacity-50 mx-1">/</span>
          <a href={BRAND.instagram || "#"} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
            INSTAGRAM
          </a>
          <span className="opacity-50 mx-1"></span>
          <span className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-2 py-1 rounded-sm text-[10px] leading-none ml-2">
            EN
          </span>
        </div>
      </div>
    </section>
  );
};
