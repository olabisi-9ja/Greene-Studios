"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  color?: string; // Kept for backwards compatibility if needed, though unused by img
  animateOnMount?: boolean;
  triggerRedrawOnHover?: boolean;
}

export function Logo({ 
  className = "w-12 h-12", 
  color,
  animateOnMount,
  triggerRedrawOnHover
}: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* We use the next/image component for optimization, relying on the parent's width/height via className */}
      <Image 
        src="/logo.png" 
        alt="Greene Studios Logo" 
        fill
        className="object-contain"
        sizes="(max-width: 768px) 150px, 250px"
      />
    </div>
  );
}
