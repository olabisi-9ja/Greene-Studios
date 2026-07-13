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
        <button className="bg-[var(--color-abstract-green)] text-[var(--brand-bg)] px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform shadow-lg">
          Menu
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-12 pb-32 max-w-[1600px] mx-auto">
        {/* Abstract Background Shapes */}
        <div className="absolute top-10 left-[10%] w-[30vw] h-[30vw] bg-[var(--color-abstract-lemon)] rounded-full mix-blend-multiply opacity-60 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-[20%] w-[25vw] h-[25vw] bg-[var(--color-abstract-yellow)] rounded-full mix-blend-multiply opacity-60 blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-[50%] w-[20vw] h-[20vw] bg-[var(--color-abstract-green)] rounded-full mix-blend-multiply opacity-20 blur-3xl -z-10"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase font-serif"
          >
            Joyful
            <br />
            <span className="ml-[10vw] text-[var(--color-abstract-green)]">Moments</span>
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
                  <textPath href="#circlePath">Don't take our word for it • </textPath>
                </text>
              </svg>
              <div className="w-12 h-12 bg-[var(--color-abstract-yellow)] text-black rounded-full flex items-center justify-center font-bold text-xl">
                ↓
              </div>
            </div>

            <p className="text-xl md:text-2xl font-medium max-w-sm text-left">
              Drinks and gummies as delicious as they are delightful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 mb-8">
        <div className="bg-[var(--color-abstract-lemon)] text-black rounded-[2rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase font-serif">
              Where Function Meets Fun
            </h2>
            <p className="text-lg md:text-xl mb-12 font-medium">
              Join the rush and experience a cleaner, brighter energy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform uppercase tracking-wider">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="bg-[var(--color-abstract-green)] text-white rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500 shadow-md">
            <div className="self-end">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🌿</div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase leading-none">Clean & Functional</h3>
          </div>

          <div className="bg-[var(--color-abstract-yellow)] text-black rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500 shadow-md">
            <div className="self-end">
               <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center text-2xl">☀️</div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase leading-none">Feel Good Energy</h3>
          </div>

          <div className="bg-black text-white rounded-[2rem] aspect-square p-8 flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-500 shadow-md">
            <div className="self-end">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">✨</div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase leading-none">Enhance Joy</h3>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="bg-[var(--brand-bg)] border-2 border-black text-black rounded-[2rem] p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="text-[var(--color-abstract-green)] text-8xl leading-none font-serif mb-6 h-12">
              &quot;
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12">
              &quot;We fell in love with this design, which definitely matches the vibes and energy that we want in our space. Your work is the first real step in this crazy adventure.&quot;
            </p>
          </div>
          <div>
            <div className="font-bold tracking-widest uppercase mb-1">KARIM & AURELIE</div>
            <div className="font-medium opacity-80 uppercase tracking-widest text-xs">Verified Buyer</div>
          </div>
        </div>

        <div className="bg-black text-[var(--color-abstract-lemon)] rounded-[2rem] p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="text-[var(--color-abstract-yellow)] text-8xl leading-none font-serif mb-6 h-12">
              &quot;
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12">
              &quot;Absolutely incredible flavor and the perfect amount of buzz. It has completely replaced my evening routine and I feel so much better the next day.&quot;
            </p>
          </div>
          <div>
            <div className="font-bold tracking-widest uppercase mb-1">JORIS VAN HOECKE</div>
            <div className="font-medium opacity-80 uppercase tracking-widest text-xs">Verified Buyer</div>
          </div>
        </div>
      </section>

    </div>
  );
}
