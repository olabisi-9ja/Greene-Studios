"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { BRAND } from '@/lib/data';

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 p-6 md:p-12 pt-32 md:pt-40 pb-6 md:pb-12 z-0">
      
      {/* Top Row */}
      <div className="flex justify-between items-start w-full relative z-20 mt-4 md:mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md pointer-events-auto flex flex-col items-start gap-6"
        >
          <p className="text-xl md:text-3xl font-medium leading-[1.2] tracking-tight text-[var(--brand-text)]">
            Not a style, a perspective.<br />
            Because Greene is Everything.
          </p>
          <Link 
            href="/contact"
            data-cursor="CALL"
            className="inline-flex items-center justify-center gap-3 bg-[var(--brand-text)] text-[var(--brand-bg)] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
          >
            BOOK A CALL &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Massive Center Text (Overflowing) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-center justify-center w-full pointer-events-none select-none my-8 relative z-10"
      >
        <div className="relative w-full flex flex-col items-center">
          <motion.h1 
            className="font-black leading-[0.8] tracking-tighter text-[var(--brand-text)] whitespace-nowrap"
            style={{ fontSize: "clamp(10rem, 26vw, 40rem)", marginLeft: "-2vw", x: x1 }}
          >
            GREENE
          </motion.h1>
          <div className="w-full flex justify-start pl-[5vw] md:pl-[12vw]">
            <motion.div 
              className="font-black tracking-widest text-[var(--brand-text)] uppercase opacity-90"
              style={{ fontSize: "clamp(3rem, 7vw, 10rem)", marginTop: "-1vw", x: x2 }}
            >
              STUDIOS
            </motion.div>
          </div>
          
        </div>
      </motion.div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full font-bold gap-6 md:gap-0 pointer-events-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-2 text-sm md:text-base font-semibold tracking-tight text-[var(--brand-text)] whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Creative studio in Nigeria
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-4 text-xs md:text-sm tracking-widest uppercase text-[var(--brand-text)]"
        >
          <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity font-bold">
            LINKEDIN
          </a>
          <span className="opacity-50">/</span>
          <Link href="/contact" className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-5 py-2.5 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center">
            CONTACT
          </Link>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-[var(--brand-text)] text-[var(--brand-bg)] w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="Scroll to top">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
