"use client";

import React from "react";

interface LogoProps {
  className?: string;
  color?: string;
  animateOnMount?: boolean;
  triggerRedrawOnHover?: boolean;
}

export function Logo({ 
  className = "w-12 h-12", 
  color = "currentColor",
  animateOnMount,
  triggerRedrawOnHover
}: LogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="50%" 
        y="53%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="var(--font-inter), sans-serif" 
        fontSize="36" 
        fontWeight="500" 
        letterSpacing="1"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      >
        G-S
      </text>
    </svg>
  );
}
