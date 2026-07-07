"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedCounter = ({ value, label }: { value: string, label: string }) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    // Check if the value contains a number
    const match = value.match(/(\d+)(.*)/);
    
    if (match) {
      const targetNum = parseInt(match[1], 10);
      const suffix = match[2];
      
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetNum,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true
        },
        onUpdate: () => {
          if (el) {
            el.innerText = Math.floor(obj.val) + suffix;
          }
        }
      });
    } else {
      // Just fade in for text without numbers (e.g., "Worldwide")
      gsap.fromTo(el, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          }
        }
      );
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <span ref={numberRef} className="text-4xl md:text-5xl font-semibold text-[#101010] tracking-tight mb-2">
        {matchNumberString(value) ? "0" : value}
      </span>
      <span className="text-[#757575] text-sm md:text-base font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
};

// Helper to determine initial render state
const matchNumberString = (str: string) => {
  return /(\d+)/.test(str);
};

export default function SocialProof() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Industries" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "Worldwide", label: "Remote Collaboration" },
  ];

  return (
    <section className="py-20 bg-white border-y border-[#E6E6E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x-0 md:divide-x divide-[#E6E6E6]">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
