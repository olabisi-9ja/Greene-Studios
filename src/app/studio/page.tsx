"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { ExperienceHero } from "@/components/ui/ExperienceHero";

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
      <ExperienceHero />

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
