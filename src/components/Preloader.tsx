"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip if we've already shown the loader this session
    if (sessionStorage.getItem("loader_shown")) {
      setHasShown(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsComplete(true);
      sessionStorage.setItem("loader_shown", "true");
      document.body.style.overflow = "";
    }, 1700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hasShown) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--brand-bg)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* lime flash behind */}
          <motion.div
            className="absolute -bottom-[30vh] h-[70vh] w-[70vw] rounded-full blur-[110px] glow-lime"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-lg font-black text-[var(--brand-ink)]"
            >
              G
            </motion.span>

            <h1 className="flex overflow-hidden font-display text-4xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-6xl">
              {"GREENE".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-text-secondary)]"
            >
              Studios
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[3px] w-40 origin-left rounded-full bg-[var(--brand-accent)] md:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
