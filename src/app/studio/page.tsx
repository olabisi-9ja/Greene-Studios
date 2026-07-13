"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

export default function StudioDemoPage() {
  const { setMode } = useAtmosphere();

  useEffect(() => {
    // Force studio mode when landing on this demo page
    setMode("studio");
  }, [setMode]);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] overflow-hidden font-sans pb-32">
      
      {/* Navigation */}
      <nav className="p-6 md:p-12 flex justify-between items-center relative z-50">
        <div className="text-xl font-bold tracking-tight">Greene.</div>
        <button className="bg-[var(--brand-surface-secondary)] text-[var(--brand-text)] px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform">
          Menu
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-12 pb-32 max-w-[1600px] mx-auto">
        {/* Abstract Background Shapes */}
        <div className="absolute top-10 left-[10%] w-[40vw] h-[40vw] bg-[var(--brand-surface-secondary)] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-[20%] w-[30vw] h-[30vw] bg-[var(--brand-surface-secondary)] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter"
          >
            Studio
            <br />
            <span className="ml-[10vw]">Modular</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-8"
          >
            {/* Spinning Badge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text className="text-[10px] uppercase font-bold tracking-[0.2em]" fill="currentColor">
                  <textPath href="#circlePath">How we roll • How we roll • How we roll •</textPath>
                </text>
              </svg>
              <div className="w-12 h-12 bg-[var(--brand-primary)] text-[var(--brand-bg)] rounded-full flex items-center justify-center">
                ↓
              </div>
            </div>

            <p className="text-xl md:text-2xl font-medium max-w-sm text-left">
              Grafisch design voor ondernemers met een visie
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Baby Blue */}
      <section className="px-4 md:px-8 mb-8">
        <div className="bg-[var(--brand-surface-secondary)] rounded-[2rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -bottom-20 right-0 flex gap-2 opacity-50">
            <div className="w-40 h-40 bg-[var(--brand-bg)] rounded-tl-full"></div>
            <div className="w-40 h-40 bg-[var(--brand-bg)] rounded-tl-full"></div>
            <div className="w-64 h-64 bg-[var(--brand-bg)] rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Klaar om jouw merk een plek in de wereld te geven?
            </h2>
            <p className="text-lg md:text-xl mb-12">
              Laat ons eens samenzitten. Vertel me wat je in gedachten hebt, dan voelen we allebei snel of het klikt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[var(--brand-bg)] text-[var(--brand-text)] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Plan een babbel
              </button>
              <button className="bg-[var(--brand-primary)] text-[var(--brand-bg)] w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="bg-[var(--brand-primary)] text-[var(--brand-text-inverse)] rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="self-end">
              <div className="w-12 h-12 flex flex-col gap-1">
                <div className="flex-1 bg-[var(--brand-bg)] rounded-t-full"></div>
                <div className="flex-1 bg-[var(--brand-bg)] rounded-b-full"></div>
              </div>
            </div>
            <h3 className="text-3xl font-bold">Merkstrategie</h3>
          </div>

          <div className="bg-[var(--brand-primary)] text-[var(--brand-text-inverse)] rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="self-end">
               <div className="w-12 h-12 flex flex-wrap gap-1">
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-[var(--brand-bg)] rounded-tl-lg rounded-br-lg"></div>
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-[var(--brand-bg)] rounded-tr-lg rounded-bl-lg"></div>
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-[var(--brand-bg)] rounded-tr-lg rounded-bl-lg"></div>
                <div className="w-[calc(50%-2px)] h-[calc(50%-2px)] bg-[var(--brand-bg)] rounded-tl-lg rounded-br-lg"></div>
              </div>
            </div>
            <h3 className="text-3xl font-bold">Visuele identiteit</h3>
          </div>

          <div className="bg-[var(--brand-primary)] text-[var(--brand-text-inverse)] rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="self-end">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <div className="absolute w-full h-full bg-[var(--brand-bg)] rotate-45 star-shape" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
              </div>
            </div>
            <h3 className="text-3xl font-bold">Drukwerk</h3>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
        <div className="bg-[var(--brand-primary)] text-[var(--brand-text-inverse)] rounded-[2rem] p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="text-[var(--brand-surface-secondary)] text-8xl leading-none font-serif mb-6">
              "
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12">
              "We fell in love with this design, which definitely matches the vibes and energy that we want in our space. You understand what we want to create, and our project finds its place in the colors, in the typography, and in those beautiful icons. Your work is the first real step in this crazy adventure that we are starting, and we are so grateful that you made our ideas a reality with your talent."
            </p>
          </div>
          <div>
            <div className="font-bold tracking-widest uppercase mb-1">KARIM & AURELIE</div>
            <div className="font-medium opacity-80 uppercase tracking-widest">SABBAR</div>
          </div>
        </div>

        <div className="border-2 border-[var(--brand-primary)] text-[var(--brand-text)] rounded-[2rem] p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="text-[var(--brand-surface-secondary)] text-8xl leading-none font-serif mb-6">
              "
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12">
              "Janne heeft voor drie van onze bedrijven telkens onder de indruk van haar frisse ideeën. Wat haar echt onderscheidt zijn concepten met een feilloze opvolging. De communicatie maken van haar een partij. We zijn bijzonder tevreden over de samenwerking."
            </p>
          </div>
          <div>
            <div className="font-bold tracking-widest uppercase mb-1">JORIS VAN HOECKE</div>
            <div className="font-medium opacity-80 uppercase tracking-widest">DECORUS GROUP</div>
          </div>
        </div>

      </section>

    </div>
  );
}
