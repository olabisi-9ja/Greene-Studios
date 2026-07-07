"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export default function TextReveal({ children, className = "", as = "span" }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const MotionComponent = motion(as);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }, // easeOutCubic
    },
  };

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {children.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}>
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={childVariants}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}
