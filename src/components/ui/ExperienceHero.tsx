"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import Magnetic from "@/components/animations/Magnetic";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CLIENTS = ["LUMINARY", "VERA", "ARC", "ONYX", "PRISM", "BLOOM"];
const WORD = "GREENE";

/**
 * One material, sampled across the word: every letter carries the SAME
 * moss texture but crops a different region of it, so GREENE reads as a
 * single wordmark rather than a six-panel mood board.
 */
const LETTER_TEXTURE = "/images/hero/letters/wordmark-texture.webp";
const LETTER_BASE_Y = [5, 18, 32, 55, 72, 88]; // % crop start per letter
const LETTER_DRIFT = 34; // % the crops slide on scroll

/* ─── Entrance variants ─────────────────────────────────────────── */
const letters: Variants = {
  hidden: { y: "118%", rotate: 5, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.35 } },
};

/**
 * The hero does exactly four jobs:
 *   eyebrow → statement → subhead + CTA pair → the GREENE wordmark.
 * Everything else (mockups, badge, stats, tickers) has been demoted to
 * sections below the fold so the first screen is one dominant statement
 * with one visual anchor — the moss-material wordmark that subtly
 * follows the cursor and slides its grain as you scroll.
 */
export const ExperienceHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── Cursor → normalized -0.5…0.5, spring-smoothed (wordmark only) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 0.7 });
  const typeX = useTransform(sx, (v) => v * 14);
  const typeY = useTransform(sy, (v) => v * 10);

  /* ── Scroll camera — the whole scene eases away as you scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /* The moss crops drift inside the letters, all at the same rate. */
  const letterBg = [
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[0]}%`, `50% ${LETTER_BASE_Y[0] + LETTER_DRIFT}%`]),
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[1]}%`, `50% ${LETTER_BASE_Y[1] + LETTER_DRIFT}%`]),
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[2]}%`, `50% ${LETTER_BASE_Y[2] + LETTER_DRIFT}%`]),
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[3]}%`, `50% ${LETTER_BASE_Y[3] + LETTER_DRIFT}%`]),
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[4]}%`, `50% ${LETTER_BASE_Y[4] + LETTER_DRIFT}%`]),
    useTransform(scrollYProgress, [0, 1], [`50% ${LETTER_BASE_Y[5]}%`, `50% ${LETTER_BASE_Y[5] + LETTER_DRIFT}%`]),
  ];

  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)]"
    >
      {/* atmosphere — quiet by design: faint grid, two soft glows, nothing else */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-soft opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_15%,color-mix(in_srgb,var(--brand-accent)_12%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_90%,color-mix(in_srgb,var(--brand-accent)_8%,transparent),transparent_70%)]" />
      </div>

      {/* ═══ Scroll camera ═══ */}
      <motion.div
        className="relative z-10 flex h-full flex-col"
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
      >
        {/* ── Statement block — vertically centered in the free space,
               with guaranteed headroom below the fixed navbar ── */}
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-center px-5 pt-24 md:px-10 md:pt-32">
          <div className="w-full">
            {/* the one dominant statement */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
              className="font-display text-[clamp(2.75rem,6.4vw,6rem)] font-black uppercase leading-[1.04] tracking-tight"
            >
              Design that can&apos;t
              <br />
              be <span className="font-serif-i lowercase normal-case tracking-normal">ignored.</span>
            </motion.h1>

            {/* one-line subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg"
            >
              Greene Studios designs and builds brands, websites &amp; digital products with uncommon presence.
            </motion.p>

            {/* one CTA pair: primary action + quiet text link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Magnetic>
                <Link
                  href="/contact"
                  data-cursor="HELLO"
                  className="btn-primary transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Book a call
                  <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <Link
                href="/work"
                data-cursor="SEE"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--brand-text)]"
              >
                <span className="border-b-2 border-[var(--brand-accent)] pb-0.5 transition-colors group-hover:border-[var(--brand-text)]">
                  See the work
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
              </Link>
            </motion.div>

            {/* the studio's numbers, one quiet line instead of floating chips */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="mt-9 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-text-secondary)]"
            >
              40+ projects shipped
              <span className="mx-3 text-[var(--brand-accent)]" aria-hidden="true">✦</span>
              98% client satisfaction
            </motion.p>
          </div>
        </div>

        {/* ── The visual anchor — GREENE in a single living material ── */}
        <motion.div
          style={prefersReduced ? undefined : { x: typeX, y: typeY }}
          className="mx-auto w-full max-w-[1600px] shrink-0 px-5 md:px-10"
          aria-hidden="true"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="hero-headline group select-none whitespace-nowrap font-display font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ fontSize: "clamp(4rem, 16.5vw, 20rem)" }}
          >
            {WORD.split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">
                <motion.span
                  variants={letters}
                  whileHover={{ filter: "brightness(1.25)" }}
                  transition={{ duration: 0.35 }}
                  className="inline-block will-change-transform transition-[filter] duration-300"
                  style={{
                    backgroundImage: `url(${LETTER_TEXTURE})`,
                    backgroundSize: "cover",
                    backgroundPosition: prefersReduced ? `50% ${LETTER_BASE_Y[i]}%` : letterBg[i],
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-top">
              <motion.span
                variants={letters}
                className="inline-block align-super text-[0.16em] font-bold tracking-normal text-[var(--brand-accent)] will-change-transform"
              >
                ®
              </motion.span>
            </span>
          </motion.div>
        </motion.div>

        {/* ── Foot — the logo strip, clearly separated below everything ── */}
        <motion.div
          className="mt-10 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        >
          <div className="border-t border-[var(--brand-border)]/60 bg-[var(--brand-bg)]/50 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-8 px-5 py-4 md:px-10">
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]">
                  Trusted by ambitious teams
                </p>
                <Marquee>
                  <MarqueeContent speed={28} autoFill>
                    {CLIENTS.map((client, i) => (
                      <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                        <span className="font-display text-sm font-black uppercase tracking-widest text-[var(--brand-text)] opacity-60 md:text-base">
                          {client}
                        </span>
                        <span className="text-[10px] text-[var(--brand-accent)]" aria-hidden="true">✦</span>
                      </MarqueeItem>
                    ))}
                  </MarqueeContent>
                </Marquee>
              </div>

              {/* scroll cue */}
              <div className="hidden shrink-0 items-center gap-4 md:flex">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-text-secondary)]">
                  Scroll to explore
                </span>
                <span className="relative block h-10 w-px overflow-hidden bg-[var(--brand-border)]" aria-hidden="true">
                  <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-[var(--brand-accent)]" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
