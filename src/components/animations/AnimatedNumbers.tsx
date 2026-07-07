"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface AnimatedNumbersProps {
  value: string;
  className?: string;
}

export default function AnimatedNumbers({ value, className = "" }: AnimatedNumbersProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const match = value.match(/(\d+)(.*)/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && match) {
      motionValue.set(targetNum);
    }
  }, [isInView, targetNum, motionValue, match]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  if (!match) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={className}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
