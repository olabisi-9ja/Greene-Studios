"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  animateOnMount?: boolean;
  color?: string;
  triggerRedrawOnHover?: boolean;
}

export function Logo({ 
  className = "w-12 h-12", 
  animateOnMount = false, 
  color = "currentColor",
  triggerRedrawOnHover = true
}: LogoProps) {
  const [shouldAnimate, setShouldAnimate] = useState(animateOnMount);
  const [redrawKey, setRedrawKey] = useState(0);

  useEffect(() => {
    if (animateOnMount) {
      setShouldAnimate(true);
    }
  }, [animateOnMount]);

  // Framer motion variants for the path drawing
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: custom, type: "spring" as const, duration: 1.2, bounce: 0 },
        opacity: { delay: custom, duration: 0.1 }
      }
    })
  };

  const handleMouseEnter = () => {
    if (triggerRedrawOnHover) {
      setShouldAnimate(true);
      setRedrawKey(prev => prev + 1);
    }
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={handleMouseEnter}
    >
      {/* Outer loop of G */}
      <motion.path
        key={`g-${redrawKey}`}
        d="M 55 25 C 40 10, 15 20, 15 50 C 15 80, 40 90, 55 75 C 65 65, 60 50, 45 50"
        variants={pathVariants}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        custom={0}
      />
      {/* Center connector and S */}
      <motion.path
        key={`s-${redrawKey}`}
        d="M 45 50 L 50 50 C 65 50, 85 45, 85 65 C 85 85, 65 90, 55 80 C 45 70, 50 50, 65 45 C 80 40, 80 20, 65 15 C 55 10, 45 15, 40 25"
        variants={pathVariants}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        custom={0.9} // Starts drawing right after G finishes
      />
    </svg>
  );
}
