"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui/Logo";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if we've already shown the loader this session
    if (sessionStorage.getItem("loader_shown")) {
      setHasShown(true);
      return;
    }
    
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Timing to match the SVG drawing animation + a slight pause
    const timer = setTimeout(() => {
      setIsComplete(true);
      sessionStorage.setItem("loader_shown", "true");
      document.body.style.overflow = "";
    }, 1800);

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        >
          {/* Rolling tire color burst behind logo */}
          <motion.div 
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl opacity-70"
            style={{
              background: "conic-gradient(from 0deg, #F3B700, #12372A, #5294A8, #F3B700)"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 3, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="relative z-10"
          >
            {/* The Logo component will display /logo.png */}
            <Logo className="w-32 h-32 md:w-48 md:h-48" />
          </motion.div>
          
          <motion.div
            className="mt-8 text-white tracking-widest text-sm uppercase font-semibold opacity-0"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Greene Studios
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
