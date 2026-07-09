"use client";

import AnimatedNumbers from "@/components/animations/AnimatedNumbers";

export default function SocialProof() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Industries" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--brand-surface)] border-y border-[var(--brand-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center gap-16 md:gap-20">
        
        {/* Main Stats Row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--brand-border)]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-4 pt-12 md:pt-0 first:pt-0">
              <AnimatedNumbers 
                value={stat.value} 
                className="text-6xl md:text-7xl lg:text-8xl font-medium text-[var(--brand-text)] tracking-tighter mb-4" 
              />
              <span className="text-[var(--brand-text-secondary)] text-sm md:text-base uppercase tracking-widest font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Worldwide Collaboration Feature */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-8 py-5 rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg)] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-accent)]"></span>
            </div>
            <span className="text-lg md:text-xl font-bold text-[var(--brand-text)] uppercase tracking-tight">Worldwide</span>
          </div>
          <span className="hidden sm:block w-px h-6 bg-[var(--brand-border)]" />
          <span className="text-sm md:text-base text-[var(--brand-text-secondary)] tracking-wide">
            Seamless Remote Collaboration
          </span>
        </div>

      </div>
    </section>
  );
}
