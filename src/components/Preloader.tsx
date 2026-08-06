"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD_ONE = "GREENE".split("");
const WORD_TWO = "STUDIOS".split("");

/**
 * Cinematic window-load: spells out GREENE STUDIOS letter by letter
 * with a light sweep, then wipes up to reveal the page.
 */
export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("loader_shown")) {
      setHasShown(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsComplete(true);
      sessionStorage.setItem("loader_shown", "true");
      document.body.style.overflow = "";
    }, 2700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hasShown) return null;

  const letterAnim = (i: number, base = 0) => ({
    initial: { opacity: 0, y: 46, rotate: 6, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
    },
    transition: {
      delay: base + i * 0.07,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--brand-bg)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* subtle grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-30" aria-hidden="true" />

          {/* light sweep across the whole loader */}
          <div className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center">
            {/* GREENE */}
            <h1
              aria-label="GREENE STUDIOS"
              className="flex overflow-hidden font-display text-[clamp(2.6rem,10vw,7rem)] font-black uppercase leading-none tracking-tight text-[var(--brand-text)]"
            >
              {WORD_ONE.map((ch, i) => (
                <motion.span key={`g${i}`} {...letterAnim(i)} className="inline-block">
                  {ch}
                </motion.span>
              ))}
            </h1>

            {/* STUDIOS */}
            <div className="mt-1 flex items-center overflow-hidden">
              {WORD_TWO.map((ch, i) => (
                <motion.span
                  key={`s${i}`}
                  {...letterAnim(i, 0.28)}
                  className="inline-block font-display text-[clamp(1rem,4vw,2.6rem)] font-bold uppercase tracking-[0.32em] text-[var(--brand-text-secondary)]"
                >
                  {ch}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="align-super font-display text-[clamp(0.6rem,1.6vw,1rem)] font-black text-[var(--brand-text-secondary)]"
              >
                ®
              </motion.span>
            </div>

            {/* expanding rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[3px] w-48 origin-left rounded-full bg-[var(--brand-accent)] md:w-72"
            />

            {/* tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="mt-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[var(--brand-text-secondary)]"
            >
              Design that can&apos;t be ignored
            </motion.p>
          </div>

          {/* bottom progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.6, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-[var(--brand-accent)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
