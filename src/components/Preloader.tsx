"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if we've already shown the loader this session
    if (sessionStorage.getItem("loader_shown")) {
      setIsComplete(true);
      return;
    }
    
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        sessionStorage.setItem("loader_shown", "true");
        document.body.style.overflow = "";
      }
    });

    // Reveal logo
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    )
    // Hold
    .to({}, { duration: 0.3 })
    // Fade out logo
    .to(logoRef.current, {
      opacity: 0,
      y: -10,
      filter: "blur(5px)",
      duration: 0.4,
      ease: "power2.in"
    })
    // Slide up container
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.inOut"
    }, "-=0.2");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div 
        ref={logoRef}
        className="flex flex-col items-center justify-center opacity-0"
      >
        {/* Logo matching the provided image */}
        <div className="flex flex-col items-center font-bold tracking-[-0.02em] leading-[0.9] text-[#1E342F]" style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}>
          <span>Greene</span>
          <span>Studios</span>
        </div>
      </div>
    </div>
  );
}
