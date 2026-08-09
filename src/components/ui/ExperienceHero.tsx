"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];
const CLIENTS = ["LUMINARY", "VERA", "ARC", "ONYX", "PRISM", "BLOOM"];
const WORD = "GREENE";

/**
 * Masked text — each letter of GREENE is a window into a different
 * texture, and the textures drift inside the letters as you scroll.
 */
const LETTER_IMAGES = [
  "/images/hero/letters/letter-1.jpg",
  "/images/hero/letters/letter-2.jpg",
  "/images/hero/letters/letter-3.jpg",
  "/images/hero/letters/letter-4.jpg",
  "/images/hero/letters/letter-5.jpg",
  "/images/hero/letters/letter-6.jpg",
];

/* Pexels free-to-use loops (visitor's browser loads them, like the
   Pexels project images). Multiple <source>s: browser falls through if
   one 404s; poster covers total failure. */
const VIDEO_INK_HD = "https://videos.pexels.com/video-files/6067847/6067847-hd_1920_1080_30fps.mp4";
const VIDEO_INK_SD = "https://videos.pexels.com/video-files/6068178/6068178-sd_640_360_30fps.mp4";
const VIDEO_DUST = "https://videos.pexels.com/video-files/5561390/5561390-sd_640_360_25fps.mp4";

/* ─── Entrance variants ─────────────────────────────────────────── */
const letters: Variants = {
  hidden: { y: "118%", rotate: 7, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.3 } },
};

/**
 * Kinetic landing screen (02PX school) with masked-text animation.
 *
 *   background (dust video + grid + glow + outlined word)   parallax -14px
 *     → artwork composition (live ink video panel)          parallax  22px
 *       → giant GREENE — each letter masked with a texture  parallax  12px
 *         → floating objects                                parallax  40px
 *           → cursor layer + scroll camera
 *
 * Scrolling slides the textures INSIDE the letters, drifts the whole
 * scene (scale, rise, fade), and the next section emerges through it.
 */
export const ExperienceHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── Cursor → normalized -0.5…0.5, spring-smoothed ────────────── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 42, damping: 18, mass: 0.7 });

  // Layer intensities — background drifts against the camera, floats lead it.
  const bgX = useTransform(sx, (v) => v * -14);
  const bgY = useTransform(sy, (v) => v * -10);
  const artX = useTransform(sx, (v) => v * 22);
  const artY = useTransform(sy, (v) => v * 16);
  const typeX = useTransform(sx, (v) => v * 12);
  const typeY = useTransform(sy, (v) => v * 9);
  const floatX = useTransform(sx, (v) => v * 40);
  const floatY = useTransform(sy, (v) => v * 30);

  /* ── Scroll camera ─────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const typeScrollY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const artScrollY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  /* Textures inside the letters slide at slightly different rates. */
  const letterBg = [
    useTransform(scrollYProgress, [0, 1], ["50% 0%", "50% 55%"]),
    useTransform(scrollYProgress, [0, 1], ["50% 17%", "50% 68%"]),
    useTransform(scrollYProgress, [0, 1], ["50% 34%", "50% 79%"]),
    useTransform(scrollYProgress, [0, 1], ["50% 5%", "50% 62%"]),
    useTransform(scrollYProgress, [0, 1], ["50% 22%", "50% 87%"]),
    useTransform(scrollYProgress, [0, 1], ["50% 40%", "50% 60%"]),
  ];

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  /** Ambient drift — skipped for reduced-motion users. */
  const ambient = (distance: number, duration: number, rotate = 1.2) =>
    prefersReduced
      ? undefined
      : {
          y: [0, -distance, 0],
          rotate: [0, rotate, 0],
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-text)]"
    >
      {/* ═══ Scroll camera — the whole scene transforms as you scroll ═══ */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
      >
        {/* ── Layer 0 — background (parallax -14px, drifts against camera) ── */}
        <motion.div
          className="absolute inset-0"
          style={{ x: bgX, y: bgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          aria-hidden="true"
        >
          {/* ambient dust video — the world breathes (desktop) */}
          <div className="absolute inset-0 hidden lg:block">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover opacity-[0.14] mix-blend-screen"
            >
              <source src={VIDEO_DUST} type="video/mp4" />
            </video>
          </div>

          {/* ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,color-mix(in_srgb,var(--brand-accent)_16%,transparent),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_85%,color-mix(in_srgb,var(--brand-accent)_10%,transparent),transparent_70%)]" />

          {/* subtle grid */}
          <div className="absolute inset-0 bg-grid-soft opacity-30" />

          {/* giant outlined word — part of the world, not the message */}
          <div className="absolute -right-[4vw] bottom-[16vh] select-none">
            <motion.span
              animate={ambient(6, 11, -1)}
              className="font-display block whitespace-nowrap font-black uppercase leading-none tracking-tight text-outline opacity-[0.22]"
              style={{ fontSize: "clamp(6rem, 17vw, 17rem)" }}
            >
              STUDIOS®
            </motion.span>
          </div>

          {/* drifting ✦ glyphs */}
          <motion.span
            animate={ambient(10, 9, 6)}
            className="absolute left-[8%] top-[22%] font-display text-3xl text-[var(--brand-accent)] opacity-40 md:text-5xl"
          >
            ✦
          </motion.span>
          <motion.span
            animate={ambient(14, 13, -5)}
            className="absolute bottom-[30%] left-[42%] hidden font-display text-2xl text-[var(--brand-accent)] opacity-30 lg:block"
          >
            ✦
          </motion.span>
          <motion.span
            animate={ambient(8, 10, 4)}
            className="absolute right-[12%] top-[18%] hidden font-display text-4xl text-[var(--brand-accent)] opacity-25 md:block"
          >
            ✦
          </motion.span>
        </motion.div>

        {/* ── Layer 1 — artwork composition (parallax 22px) ── */}
        <motion.div
          className="absolute inset-0 z-[5] hidden lg:block"
          style={{ x: artX, y: artY }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
            style={{ y: artScrollY }}
            className="absolute right-[5%] top-[9%] bottom-[13%] w-[32vw] max-w-[480px]"
          >
            {/* main — live ink video panel */}
            <motion.div
              animate={ambient(7, 9)}
              className="relative h-full w-full overflow-hidden rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] shadow-[0_40px_100px_rgba(0,0,0,0.28)]"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero/team.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={VIDEO_INK_HD} type="video/mp4" />
                <source src={VIDEO_INK_SD} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[var(--brand-bg)] px-5 py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                    The process
                  </p>
                  <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                    Ink &amp; ideas
                  </p>
                </div>
                <span className="text-xl text-[var(--brand-text)]" aria-hidden="true">✦</span>
              </div>
            </motion.div>

            {/* floating — branding tile */}
            <motion.div
              animate={ambient(12, 8, -2)}
              className="absolute -bottom-10 -left-14 w-44 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-[var(--brand-bg)] bg-[var(--brand-surface-secondary)] shadow-[0_28px_70px_rgba(0,0,0,0.3)]"
            >
              <div className="relative aspect-square">
                <Image src="/images/hero/branding-2.jpg" alt="" fill sizes="176px" className="object-cover" />
              </div>
              <div className="flex items-center gap-2 bg-[var(--brand-bg)] px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[9px] font-black text-[var(--brand-on-accent)]">G</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-[var(--brand-text)]">Brand identity</span>
              </div>
            </motion.div>

            {/* floating — browser mockup */}
            <motion.div
              animate={ambient(9, 10, 2)}
              className="absolute -top-10 -right-10 w-52 rotate-[4deg] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-[0_28px_70px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-1.5 border-b border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 rounded-md bg-[var(--brand-bg)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                  luminary.co
                </span>
              </div>
              <div className="space-y-2.5 p-4">
                <div className="skeleton-bar h-3 w-3/4 rounded-md" />
                <div className="skeleton-bar h-3 w-1/2 rounded-md" />
                <div className="mt-3 flex gap-2">
                  <div className="skeleton-bar h-10 w-24 rounded-lg" />
                  <div className="skeleton-bar h-10 w-16 rounded-lg" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* mobile backdrop — the world, quieter */}
        <div className="absolute inset-0 z-[4] lg:hidden" aria-hidden="true">
          <Image
            src="/images/hero/team.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/60 to-[var(--brand-bg)]/40" />
        </div>

        {/* ── Layer 2 — giant masked type (parallax 12px) ── */}
        <motion.div className="absolute inset-0 z-10" style={{ y: typeScrollY }}>
          <motion.div className="flex h-full items-center" style={{ x: typeX, y: typeY }}>
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
              {/* kicker */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                className="mb-5 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-[var(--brand-accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                  Digital design studio — independent &amp; worldwide
                </span>
                <span className="text-[var(--brand-accent)]">✦</span>
              </motion.div>

              {/* GREENE — each letter is a mask over a different texture */}
              <h1 className="sr-only">Greene Studios — we make digital feel alive.</h1>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                aria-hidden="true"
                className="hero-headline group font-display text-[clamp(3.6rem,14.5vw,15rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]"
              >
                {WORD.split("").map((letter, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top">
                    <motion.span
                      variants={letters}
                      whileHover={{ filter: "brightness(1.35)" }}
                      transition={{ duration: 0.35 }}
                      className="inline-block will-change-transform transition-[filter] duration-300"
                      style={{
                        backgroundImage: `url(${LETTER_IMAGES[i]})`,
                        backgroundSize: "cover",
                        backgroundPosition: letterBg[i],
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
                    className="inline-block align-super text-[0.18em] font-bold tracking-normal text-[var(--brand-accent)] will-change-transform"
                  >
                    ®
                  </motion.span>
                </span>
              </motion.div>

              {/* statement — second line of type */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
                className="mt-4 font-display text-[clamp(1.15rem,2.6vw,2.4rem)] font-black uppercase leading-none tracking-tight text-[var(--brand-text)]"
              >
                We make digital{" "}
                <span className="font-serif-i lowercase normal-case tracking-normal text-[var(--brand-accent)]">
                  feel alive.
                </span>
              </motion.p>

              {/* CTAs + availability */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    data-cursor="HELLO"
                    className="btn-primary transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Book a call
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/work"
                    data-cursor="SEE"
                    className="btn-outline transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    See the work
                  </Link>
                </div>
                <span className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                  Available for select projects
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Layer 3 — floating objects (parallax 40px) ── */}
        <motion.div className="absolute inset-0 z-20 hidden lg:block" style={{ x: floatX, y: floatY }} aria-hidden="true">
          {/* rotating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.95 }}
            className="absolute right-[12%] top-[12%]"
          >
            <motion.div animate={ambient(8, 12, 3)}>
              <RotatingBadge
                text="GREENE STUDIOS ✦ WEB DESIGN ✦ BRANDING ✦ MOTION ✦ "
                className="h-28 w-28 md:h-32 md:w-32"
                centerImage="/logo.png"
              />
            </motion.div>
          </motion.div>

          {/* floating stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
            className="absolute bottom-[24%] right-[4%]"
          >
            <motion.div
              animate={ambient(10, 8, 1)}
              className="flex items-center gap-2 rounded-full bg-[var(--brand-bg)] px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.16)]"
            >
              <span className="font-display text-sm font-black text-[var(--brand-text)]">98%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                client satisfaction
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
            className="absolute left-[38%] top-[16%] hidden xl:block"
          >
            <motion.div
              animate={ambient(13, 11, -1)}
              className="flex items-center gap-2 rounded-full bg-[var(--brand-bg)] px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.16)]"
            >
              <span className="font-display text-sm font-black text-[var(--brand-text)]">40+</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                projects shipped
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Bottom edge — clients, scroll cue, capabilities ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.4 }}
        >
          <div className="border-t border-[var(--brand-border)]/60 bg-[var(--brand-bg)]/50 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-8 px-5 py-3.5 md:px-10">
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

          {/* capability ticker */}
          <div className="marquee-strip-hero border-t border-[var(--brand-border)]/40 py-2.5">
            <Marquee>
              <MarqueeContent speed={45} autoFill>
                {CAPABILITIES.map((cap, i) => (
                  <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                    <span className="font-display text-sm font-black uppercase tracking-wide md:text-base">
                      {cap}
                    </span>
                    <span className="text-xs opacity-60" aria-hidden="true">✦</span>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
