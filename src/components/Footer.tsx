"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-white flex flex-col justify-between pt-24 pb-8 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col lg:flex-row justify-between items-start z-10">
        
        {/* Left Section */}
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tighter">
            Let&apos;s start<br />
            from Greene.
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="group flex items-center justify-between border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              <span className="text-xs font-bold tracking-widest uppercase mr-8">Book a call</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <a 
              href={`mailto:${BRAND.email}`} 
              className="group flex items-center justify-between border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              <span className="text-xs font-bold tracking-widest uppercase mr-8">Drop us an email</span>
              <span className="font-bold">@</span>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-16 lg:mt-0 flex flex-col gap-2">
          <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-medium hover:opacity-70 transition-opacity">Linkedin</a>
          <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-medium hover:opacity-70 transition-opacity">Instagram</a>
          <a href={BRAND.twitter} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-medium hover:opacity-70 transition-opacity">Behance</a>
        </div>
      </div>

      {/* Massive Text */}
      <div className="w-full mt-24 mb-16 flex justify-center px-4 z-10 overflow-visible">
        <h1 
          className="font-black leading-none tracking-tighter text-white text-center w-full flex justify-center cursor-default"
          style={{ fontSize: "clamp(4rem, 24vw, 38rem)" }}
        >
          {"GREENE".split("").map((letter, i) => (
            <motion.span
              key={i}
              whileHover={{ 
                scale: 1.1, 
                color: "var(--brand-accent)", 
                y: -10,
                rotate: i % 2 === 0 ? 5 : -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/70 font-medium z-10 gap-4">
        <div>©{currentYear} — Founded by Greene Studios</div>
        <div>Site by Greene Studios</div>
        <div className="flex items-center gap-4">
          <span>Visuals by Greene Studios</span>
          <span className="bg-white text-black px-2 py-1 rounded font-black tracking-normal">EN</span>
        </div>
      </div>
    </footer>
  );
}
