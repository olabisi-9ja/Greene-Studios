"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRANDS } from "@/lib/brands";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BRANDS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BRANDS.length) % BRANDS.length);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--brand-bg)] py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center">
        
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {BRANDS.map((brand, i) => {
              const diff = i - currentIndex;
              let offset = diff;
              // Handle wrap-around
              if (diff === BRANDS.length - 1) offset = -1;
              if (diff === -(BRANDS.length - 1)) offset = 1;
              // If there are more than 3 items, wrap remaining appropriately or hide them
              if (diff < -(BRANDS.length - 1) + 1 && diff < -1) offset = diff + BRANDS.length;
              if (diff > BRANDS.length - 1 - 1 && diff > 1) offset = diff - BRANDS.length;

              if (Math.abs(offset) > 1) return null;

              const isCenter = offset === 0;

              return (
                <motion.div
                  key={brand.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: `${offset > 0 ? 100 : -100}%` }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.85,
                    x: `${offset * 75}%`,
                    zIndex: isCenter ? 20 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: `${offset > 0 ? -100 : 100}%` }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute top-0 h-full w-[80%] md:w-[60%] lg:w-[45%] overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                  onClick={() => {
                     if (offset === 1) next();
                     if (offset === -1) prev();
                  }}
                >
                  <Image
                    src={`/images/work/${brand.slug}/hero-lifestyle.jpg`}
                    alt={brand.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 45vw"
                    priority={isCenter}
                  />
                  {/* Subtle overlay for inactive */}
                  {!isCenter && <div className="absolute inset-0 bg-black/30 transition-opacity" />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dots Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {BRANDS.map((brand, i) => (
            <button
              key={`dot-${brand.slug}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-[var(--brand-text)]" : "w-2 bg-[var(--brand-textMuted)] hover:bg-[var(--brand-text)]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Text Area & Navigation */}
        <div className="mt-12 flex w-full max-w-4xl items-center justify-between">
          <button
            onClick={prev}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] transition-colors hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] focus:outline-none"
            aria-label="Previous brand"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--brand-text)] group-hover:text-[var(--brand-bg)] transition-colors" />
          </button>

          <div className="flex-1 px-4 sm:px-8 text-center h-32 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={BRANDS[currentIndex].slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-text)] mb-2">
                  {BRANDS[currentIndex].name}
                </h3>
                <p className="text-[var(--brand-textMuted)] max-w-md mx-auto mb-6 text-sm md:text-base">
                  {BRANDS[currentIndex].tagline || BRANDS[currentIndex].direction}
                </p>
                <Link
                  href={`/work/${BRANDS[currentIndex].slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-6 py-2 text-sm font-medium transition-colors hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] text-[var(--brand-text)]"
                >
                  Learn More
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] transition-colors hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] focus:outline-none"
            aria-label="Next brand"
          >
            <ArrowRight className="h-5 w-5 text-[var(--brand-text)] group-hover:text-[var(--brand-bg)] transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
