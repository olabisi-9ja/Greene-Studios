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
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            backgroundColor: ["#111111", "#F3B700", "#12372A", "#FFFFFF", "rgba(255,255,255,0)"],
            opacity: [1, 1, 1, 1, 0],
            scale: [1, 1.02, 1.05, 1.08, 1.1],
            filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(5px)", "blur(10px)"],
            transition: { duration: 1.5, times: [0, 0.3, 0.6, 0.85, 1], ease: "easeInOut" }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 3, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            {/* The Logo handles its own drawing animation on mount */}
            <Logo className="w-32 h-32 md:w-48 md:h-48" color="#FFFFFF" animateOnMount={true} />
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
