"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIMELINE_DATA = [
  {
    year: "2022",
    events: [
      "Greene Studios founded. First client: a Lagos-based fintech startup.",
      "Shipped 8 projects in year one. Developed our signature process framework.",
    ],
  },
  {
    year: "2023",
    events: [
      "Expanded into product design and AI integration services.",
      "First Awwwards nomination. Crossed $1M in client revenue generated.",
    ],
  },
  {
    year: "2024",
    events: [
      "Launched Greene Journal. 40+ published case studies and articles.",
    ],
  },
  {
    year: "2025",
    events: [
      "Opening 2–3 new project slots for ambitious brands worldwide.",
    ],
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    // We select all event text elements
    const events = containerRef.current.querySelectorAll(".timeline-event");
    
    events.forEach((event) => {
      // Create a scroll trigger for each event text
      gsap.fromTo(
        event,
        { opacity: 0.3, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: event,
            start: "top 75%", // when top of event hits 75% of viewport
            end: "bottom 40%", // when bottom of event hits 40% of viewport
            toggleActions: "play reverse play reverse", // Play when entering, reverse when leaving
            // markers: false, // useful for debugging
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 border-b border-[#E6E6E6]" ref={containerRef}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-px bg-[#BFA36A]" />
        <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
          Timeline
        </span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-semibold text-[#101010] mb-24 tracking-tight">
        How we got here.
      </h2>

      <div className="space-y-32 relative">
        {/* A subtle line connecting all the years */}
        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-[#E6E6E6] hidden md:block" />

        {TIMELINE_DATA.map((group, i) => (
          <div key={group.year} className="flex flex-col md:flex-row gap-8 md:gap-24 relative">
            {/* Sticky Year Column */}
            <div className="md:w-1/4 relative">
              <div className="sticky top-32 flex items-center gap-6">
                <div className="w-20 h-20 flex-shrink-0 bg-white border border-[#E6E6E6] rounded-full flex items-center justify-center shadow-sm z-10 relative">
                  <span className="text-[#101010] text-lg font-semibold">{group.year}</span>
                </div>
              </div>
            </div>

            {/* Events for the year */}
            <div className="md:w-3/4 flex flex-col justify-center space-y-16 py-8">
              {group.events.map((event, j) => (
                <p
                  key={j}
                  className="timeline-event text-[#101010] text-2xl lg:text-3xl leading-relaxed tracking-tight font-medium max-w-2xl"
                >
                  {event}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
