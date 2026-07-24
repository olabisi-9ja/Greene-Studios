"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { useScroll, useTransform, motion } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

export default function SelectedWork() {
  const targetRef = useRef<HTMLDivElement>(null);
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);
  const [isMobile, setIsMobile] = useState(false);
  const mobileListRef = useStaggerAnimation<HTMLDivElement>({}, '.stagger-item');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate translation range for horizontal scroll
  // We have 4 items. Let's make it scroll -75% to leave the last item fully visible
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  if (isMobile) {
    // Normal vertical layout on mobile devices
    return (
      <section className="py-20 bg-[var(--brand-bg)] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-semibold block mb-4">
              Selected Work
            </span>
            <h2 className="text-3xl font-bold text-[var(--brand-text)] tracking-tight">
              Projects that define us.
            </h2>
          </div>
          <div ref={mobileListRef} className="flex flex-col gap-12">
            {featured.map((project) => (
              <Link 
                href={`/work/${project.slug}`} 
                key={project.id} 
                className="stagger-item group block"
                data-cursor="VIEW"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[var(--brand-surface-secondary)] mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-text-secondary)]">{project.category}</span>
                <h3 className="text-xl font-bold text-[var(--brand-text)] mt-2">{project.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[var(--brand-bg)] transition-colors duration-1000">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header inside sticky container */}
        <div className="max-w-7xl mx-auto w-full px-12 mb-12 flex justify-between items-end">
          <div>
            <span className="text-[var(--brand-accent)] text-xs tracking-widest uppercase font-bold block mb-4">
              Selected Work
            </span>
            <h2 className="text-5xl font-black text-[var(--brand-text)] leading-none uppercase tracking-tighter">
              Projects that define us.
            </h2>
          </div>
          <Link
            href="/work"
            data-cursor="GO"
            className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            All projects →
          </Link>
        </div>

        {/* Horizontal Moving Window */}
        <div className="relative w-full flex items-center">
          <motion.div style={{ x }} className="flex gap-8 px-12 w-max">
            {featured.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group block w-[500px] flex-shrink-0"
                data-cursor="VIEW"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[var(--brand-surface-secondary)] mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-text-secondary)]">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--brand-text)] mt-1 group-hover:text-[var(--brand-accent)] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-[var(--brand-text-secondary)]">{project.year}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
