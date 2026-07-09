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
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Letter G */}
      <path
        d="M 45 35 A 25 25 0 1 0 45 65 L 45 50 L 25 50 L 25 59 L 37 59 A 15 15 0 1 0 37 41 Z"
      />
      {/* Hyphen - */}
      <path
        d="M 47 45 L 57 45 L 57 55 L 47 55 Z"
      />
      {/* Letter S */}
      <path
        d="M 94 30 C 90 22, 82 20, 74 20 C 66 20, 60 26, 60 36 L 60 42 L 88 52 C 90 54, 94 60, 94 70 C 94 78, 86 80, 78 80 C 70 80, 64 76, 60 70 L 66 64 C 70 72, 76 74, 82 74 C 88 74, 88 70, 88 58 L 66 48 L 66 36 C 66 28, 74 26, 80 26 C 86 26, 88 28, 88 34 Z"
      />
    </svg>
  );
}
