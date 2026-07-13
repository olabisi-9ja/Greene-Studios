"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function TestimonialsSection() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  interface StatItem {
    percentage: string;
    label: string;
    isIncrease: boolean;
    logo?: string;
  }

  const stats: StatItem[] = [
    {
      percentage: "140%",
      label: "YOY Revenue",
      isIncrease: true,
      logo: "Acme Corp",
    },
    {
      percentage: "3x",
      label: "Traffic Increase",
      isIncrease: true,
      logo: "Pulse Media",
    },
    {
      percentage: "45%",
      label: "Conversion Growth",
      isIncrease: true,
      logo: "Acme Corp",
    },
    {
      percentage: "85%",
      label: "Sales Increase",
      isIncrease: true,
      logo: "Pulse Media",
    },
  ];

  return (
    <div className="bg-[var(--brand-bg)] transition-colors duration-1000 min-h-screen w-full grid place-content-center py-32 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            Success Stories
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-[var(--brand-text)]">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight">
            Results that <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle relative cursor-pointer">
                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:w-24 rounded-full border-2 border-[var(--brand-text)] bg-[var(--brand-surface-secondary)]">
                      <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                        alt="Jane Doe"
                        className="object-cover w-full h-full grayscale"
                        style={{ objectPosition: "center" }}
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-[var(--brand-text)] text-[var(--brand-bg)] p-4 rounded-lg shadow-lg border-none z-50 animate-in fade-in zoom-in"
                >
                  <p className="mb-2 text-sm italic">
                    &quot;The team delivered beyond expectation, crafting a digital brand presence that has permanently leveled up our business.&quot;
                  </p>
                  <p className="font-medium text-xs tracking-widest uppercase">Jane Doe, CEO - Acme Corp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            speak for
          </h1>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
            themselves
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle cursor-pointer">
                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:w-20 rounded-full border-2 border-[var(--brand-text)] bg-[var(--brand-surface-secondary)]">
                      <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
                        alt="John Smith"
                        className="object-cover w-full h-full grayscale"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-[var(--brand-text)] text-[var(--brand-bg)] p-4 rounded-lg shadow-lg border-none z-50 animate-in fade-in zoom-in"
                >
                  <p className="mb-2 text-sm italic">
                    &quot;Antigravity UI design that completely transformed customer trust in our new content offerings.&quot;
                  </p>
                  <p className="font-medium text-xs tracking-widest uppercase">John Smith, Head of Product - Pulse Media</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            and for
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[var(--brand-text-secondary)] leading-tight mt-2">
            our partners.
          </h1>
        </div>
        
        {/* Stats Section */}
        <div className="sm:flex grid grid-cols-2 gap-8 bg-[var(--brand-surface)] mt-16 w-full mx-auto px-8 py-8 border rounded-3xl border-[var(--brand-border)] shadow-sm overflow-hidden">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-1 flex gap-4 pl-0 sm:pl-10 relative"
            >
              {index !== 0 && (
                <div className="w-0.5 h-12 border border-dashed border-[var(--brand-border)] absolute left-0 hidden sm:block opacity-30" />
              )}
              <div className="w-full h-full flex flex-col items-center justify-center py-4">
                <div className="flex items-center justify-center gap-2 relative">
                  {stat.isIncrease ? (
                    <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-red-500" />
                  )}
                  <span className="md:text-4xl text-2xl font-black text-[var(--brand-text)] tracking-tighter">
                    {stat.percentage}
                  </span>
                </div>
                <p className="text-[var(--brand-text-secondary)] md:text-sm text-xs text-center uppercase tracking-widest mt-2 font-medium">
                  {stat.label}
                </p>
                <div className="text-[10px] text-[var(--brand-text)]/50 uppercase tracking-widest mt-4">
                  {stat.logo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
