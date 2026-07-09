"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BRAND } from '@/lib/data';

export const ExperienceHero = () => {

  return (
    <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
      
      {/* Edge/Corner Content */}
      <div className="absolute inset-0 p-6 md:p-12 pointer-events-none flex flex-col justify-between z-10 pt-28 md:pt-32 pb-6 md:pb-12">
        {/* Top Row */}
        <div className="flex justify-between items-start w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md pointer-events-auto"
          >
            <p className="text-lg md:text-3xl font-semibold leading-tight mb-6 md:mb-8 tracking-tight text-[var(--brand-text)]">
              Not a style, a perspective.<br />
              Because Greene is Everything.
            </p>
            <Link 
              href="/contact"
              data-cursor="CALL"
              className="inline-flex items-center justify-center gap-3 bg-[var(--brand-text)] text-[var(--brand-bg)] px-8 py-4 rounded-[40px] text-sm font-semibold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              Book a Call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-end w-full font-bold gap-6 md:gap-0 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-2 text-sm md:text-base tracking-tight text-[var(--brand-text)] whitespace-nowrap"
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
            <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" data-cursor="LINK">
              <span className="md:hidden">LKDN</span>
              <span className="hidden md:inline">LINKEDIN</span>
            </a>
            <span>/</span>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" data-cursor="LINK">
              <span className="md:hidden">INSTA</span>
              <span className="hidden md:inline">INSTAGRAM</span>
            </a>
            <span className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-2 py-1 rounded-md ml-2 font-black tracking-normal">EN</span>
          </motion.div>
        </div>
      </div>
      
      {/* Massive Center Text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-0 flex flex-col items-start justify-center w-full pointer-events-none select-none overflow-visible pt-48"
      >
        <h1 
          className="font-black leading-none tracking-tighter text-[var(--brand-text)] whitespace-nowrap pl-[2vw]"
          style={{ fontSize: "clamp(5rem, 25vw, 40rem)" }}
        >
          GREENE
        </h1>
        <div 
          className="font-bold tracking-widest text-[var(--brand-text)] uppercase opacity-80 mt-[-2vw] pl-[8vw]"
          style={{ fontSize: "clamp(1.5rem, 5vw, 6rem)" }}
        >
          Studios
        </div>
      </motion.div>
    </section>
  );
};
