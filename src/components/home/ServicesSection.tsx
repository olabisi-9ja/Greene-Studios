"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStaggerAnimation } from "@/lib/hooks/useStaggerAnimation";

/**
 * Services — the review's consolidation. Greene's differentiator is
 * Brand → Interface → Motion → Code under one roof, so the section is
 * built around that pipeline: four core pillars, in order, with the
 * supporting disciplines (research, systems, AI, strategy) demoted to
 * a quiet row instead of competing for attention.
 *
 * Each pillar DEMONSTRATES itself: hovering (or focusing) a row lifts a
 * cursor-following visual of that craft, so the section shows the work
 * instead of only describing it.
 */
const CORE = [
  {
    href: "/services/branding",
    stage: "Brand",
    title: "Branding",
    from: "from $6,000",
    desc: "Identity systems that outlast trends and command trust.",
    tags: ["Strategy", "Identity", "Guidelines"],
    preview: "/images/services/brand.jpg",
  },
  {
    href: "/services/web-design",
    stage: "Interface",
    title: "Web Design",
    from: "from $4,800",
    desc: "Websites that stop the scroll and start conversations.",
    tags: ["UI", "Design systems", "Prototyping"],
    preview: "/images/services/interface.jpg",
  },
  {
    href: "/services/motion-design",
    stage: "Motion",
    title: "Motion Design",
    from: "from $2,500",
    desc: "Motion that communicates, from micro-interactions to full brand films.",
    tags: ["UI motion", "Scroll", "Lottie"],
    preview: "/images/services/motion.jpg",
  },
  {
    href: "/services/frontend-development",
    stage: "Code",
    title: "Frontend Development",
    from: "from $6,000",
    desc: "Pixel-perfect React & Next.js code, built for motion and performance.",
    tags: ["React", "Next.js", "Performance"],
    preview: "/images/services/code.jpg",
  },
];

const SUPPORTING = [
  { label: "UX research & testing", href: "/services/ui-ux-design" },
  { label: "Product design", href: "/services/product-design" },
  { label: "Design systems", href: "/services/design-systems" },
  { label: "Web applications", href: "/services/web-applications" },
  { label: "AI integration", href: "/services/ai-integration" },
  { label: "SEO · GEO · AEO", href: "/services/seo-geo-aeo" },
];

export default function ServicesSection() {
  const containerRef = useStaggerAnimation<HTMLDivElement>({}, ".stagger-item");
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /* Cursor-follow springs for the floating preview (desktop only) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.6 });
  const py = useSpring(my, { stiffness: 180, damping: 24, mass: 0.6 });

  const trackCursor = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section className="bg-[var(--brand-surface)] py-24 text-[var(--brand-text)] transition-colors duration-1000 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> Services
          </span>
          <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
            Brand to code,
            <br />
            one <span className="font-serif-i lowercase normal-case tracking-normal">team.</span>
          </h2>
        </div>

        {/* The pipeline — how the four pillars connect */}
        <div className="mb-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[var(--brand-border)] py-5 md:mb-20" aria-hidden="true">
          {["Brand", "Interface", "Motion", "Code"].map((stage, i) => (
            <span key={stage} className="flex items-center gap-4">
              <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] md:text-base">
                {stage}
              </span>
              {i < 3 ? (
                <span className="text-[var(--brand-accent)]">→</span>
              ) : null}
            </span>
          ))}
        </div>

        {/* Core pillars, in pipeline order — the stage the preview floats over */}
        <div
          ref={stageRef}
          className="relative"
          onMouseMove={trackCursor}
          onMouseLeave={() => setActive(null)}
        >
          <div ref={containerRef} className="flex flex-col border-t border-[var(--brand-border)]">
            {CORE.map((service, i) => (
              <Link
                key={service.href}
                href={service.href}
                className="stagger-item group relative block border-b border-[var(--brand-border)]"
                data-cursor="VIEW"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <div className="relative z-10 grid grid-cols-12 items-center gap-3 px-1 py-7 transition-colors duration-300 md:px-4 md:py-9">
                  <span className="col-span-2 font-mono text-xs text-[var(--brand-text-secondary)] md:col-span-1 md:text-sm">
                    0{i + 1}
                  </span>
                  <div className="col-span-10 md:col-span-4">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
                      {service.stage}
                    </span>
                    <h3 className="font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="col-span-12 mt-2 max-w-md text-sm leading-relaxed text-[var(--brand-text-secondary)] md:col-span-5 md:mt-0 md:text-[15px]">
                    {service.desc}
                  </p>
                  <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-2 md:justify-end">
                    <span className="font-mono text-[11px] font-bold tracking-wide text-[var(--brand-accent)]">
                      {service.from}
                    </span>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-on-accent)] md:ml-2"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating craft preview — demonstrates the capability on hover.
              Desktop pointers only; keyboard focus reveals it too. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            style={{ x: px, y: py }}
          >
            <motion.div
              animate={{
                opacity: active !== null ? 1 : 0,
                scale: active !== null ? 1 : 0.85,
                rotate: active !== null ? -4 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative -ml-40 -mt-28 h-[220px] w-[340px] overflow-hidden rounded-2xl border border-[var(--brand-border)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              {CORE.map((service, i) => (
                <Image
                  key={service.preview}
                  src={service.preview}
                  alt=""
                  fill
                  sizes="340px"
                  className={`object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                {active !== null ? CORE[active].stage : ""}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Supporting disciplines — demoted, not deleted */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            Supporting every project
          </span>
          {SUPPORTING.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              data-cursor="GO"
              className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] transition-all duration-300 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-serif-i text-xl text-[var(--brand-text-secondary)] md:text-2xl">
            Something more custom in mind?
          </p>
          <Link href="/services" data-cursor="GO" className="btn-primary">
            Explore all services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
