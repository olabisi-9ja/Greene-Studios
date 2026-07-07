"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const steps = containerRef.current.querySelectorAll(".process-step");

    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0.3, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="py-32 bg-[#FAFAFA]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
          <div className="w-full md:w-1/3 relative">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#BFA36A]" />
                <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
                  Process
                </span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#101010] leading-[1.1] tracking-tight mb-6">
                How we work.
              </h2>
              <p className="text-[#757575] text-lg leading-relaxed">
                We believe that exceptional products are the result of an exceptional process. We work systematically, sequentially, and transparently.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex flex-col gap-16 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-[23px] top-4 bottom-12 w-px bg-[#E6E6E6] hidden sm:block" />

              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="process-step flex gap-8 relative z-10">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-[#E6E6E6] flex items-center justify-center text-[#101010] font-mono text-sm bg-white group-hover:border-[#BFA36A] group-hover:bg-[#BFA36A] group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-semibold text-[#101010] tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#757575] text-lg leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                    <span className="inline-block mt-4 text-[#BFA36A] text-sm font-medium tracking-wide uppercase">
                      {step.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
