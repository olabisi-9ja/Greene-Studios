"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable heavy blob tracking on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const blob = container.querySelector(".hero-blob") as HTMLElement;
          if (blob) {
            blob.style.left = `${x * 100}%`;
            blob.style.top = `${y * 100}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0e0e0e]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(107,143,113,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,143,113,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient blob */}
      <div
        className="hero-blob absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(18,55,42,0.3) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-32 right-20 w-64 h-64 border border-[#12372A]/20 rounded-full" />
      <div className="absolute top-48 right-32 w-40 h-40 border border-[#6B8F71]/10 rounded-full" />
      <div className="absolute bottom-32 left-20 w-80 h-80 border border-[#12372A]/10 rounded-full" />

      {/* Floating label */}
      <div className="absolute top-28 left-6 lg:left-12 flex items-center gap-3">
        <span className="text-[#6B8F71] text-xs tracking-[0.2em] uppercase font-medium">
          Available for Projects · 2025
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#6B8F71]" />
            <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
              Design · Development · Strategy
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.92] tracking-tight text-[#F7F5F2] mb-8">
            We build digital{" "}
            <span className="relative inline-block">
              <span className="text-gradient-forest">experiences</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C60 4 130 2 200 6C270 10 340 8 398 4"
                  stroke="#6B8F71"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>{" "}
            that
            <br />
            <span className="text-[#F7F5F2]/30">move people.</span>
          </h1>

          {/* Sub */}
          <p className="text-[#F7F5F2]/60 text-xl font-light leading-relaxed max-w-xl mb-12">
            Greene Studios is a premium digital agency crafting world-class
            websites, brands, and products for ambitious companies.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="group flex items-center gap-3 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] text-base font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              View Our Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 border border-white/15 hover:border-[#6B8F71]/60 text-[#F7F5F2] text-base font-medium px-8 py-4 rounded-full transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center gap-8 mt-16 pt-16 border-t border-white/5">
            <div>
              <div className="text-3xl font-black text-[#F7F5F2]">40+</div>
              <div className="text-[#F7F5F2]/40 text-sm">Projects Shipped</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-3xl font-black text-[#F7F5F2]">$50M+</div>
              <div className="text-[#F7F5F2]/40 text-sm">Client Revenue</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-3xl font-black text-[#F7F5F2]">98%</div>
              <div className="text-[#F7F5F2]/40 text-sm">Satisfaction Rate</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex flex-wrap gap-2">
              {["Awwwards", "Behance", "Dribbble"].map((award) => (
                <span
                  key={award}
                  className="bg-white/5 border border-white/10 text-[#F7F5F2]/50 text-xs px-3 py-1.5 rounded-full"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#F7F5F2]/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#6B8F71] to-transparent" />
      </div>
    </section>
  );
}
