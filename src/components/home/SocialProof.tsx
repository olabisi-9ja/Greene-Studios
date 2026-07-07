"use client";

import AnimatedNumbers from "@/components/animations/AnimatedNumbers";

export default function SocialProof() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Industries" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "Worldwide", label: "Remote Collaboration" },
  ];

  return (
    <section className="py-20 bg-[var(--brand-surface)] border-y border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-y-0 md:divide-x divide-[var(--brand-border)]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-4">
              <AnimatedNumbers 
                value={stat.value} 
                className="text-4xl md:text-5xl font-semibold text-[var(--brand-text)] tracking-tight mb-2" 
              />
              <span className="text-[var(--brand-text-secondary)] text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
