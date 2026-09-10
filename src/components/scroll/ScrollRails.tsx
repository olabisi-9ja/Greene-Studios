"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * The rail system — full-bleed lines that draw themselves as the page scrolls.
 *
 * Five figures, one engine. Each is a circuit-diagram move rather than an
 * ornament, so the seam between two sections can carry an idea:
 *
 *   rail    a single line across the page                     (a beat)
 *   lens    separate rails meet in a ring and leave as one     (many → one)
 *   bypass  a line splits, runs wide, and rejoins              (a detour)
 *   fork    two lines descend and merge, pointing down         (converging)
 *   braid   one line unbraids into strands, then gathers up    (a spread)
 *
 * Geometry is generated from the band's measured pixel width, so the SVG's
 * coordinate space is 1:1 with CSS pixels — a ring stays round and a 2px
 * stroke stays 2px at every viewport, with no viewBox scaling to fight.
 */

export type RailVariant = "rail" | "lens" | "bypass" | "fork" | "braid";

type Figure = {
  d: string;
  /** Where in the band's own 0…1 scroll progress this stroke starts drawing. */
  from: number;
  /** …and where it finishes. */
  to: number;
  /** Filled rather than stroked — the arrowhead. */
  solid?: boolean;
};

type Props = {
  variant?: RailVariant;
  /** Band height in px; also the figure's whole vertical space. */
  height?: number;
  /** Strands in a braid, lines in a `rail` band. Ignored elsewhere. */
  lanes?: number;
  className?: string;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const n = (v: number) => v.toFixed(1);

/* ── rail ───────────────────────────────────────────────────────────── */
function rail(w: number, h: number, lanes: number): Figure[] {
  return Array.from({ length: lanes }, (_, i) => {
    const y = h * ((i + 1) / (lanes + 1));
    return { d: `M 0 ${n(y)} L ${n(w)} ${n(y)}`, from: 0.06 * i, to: 0.55 + 0.1 * i };
  });
}

/* ── lens ────────────────────────────────────────────────────────────
   Three rails arrive at three heights; inside the ring the outer two bend
   into the middle one and the page continues as a single line. */
function lens(w: number, h: number): Figure[] {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const r = Math.min(h * 0.46, w * 0.2);
  const jx = cx + r * 0.42; // where a curve rejoins the middle rail
  const sx = cx - r * 0.75; // where it leaves its own rail

  const merge = (y: number) =>
    `M 0 ${n(y)} L ${n(sx)} ${n(y)}` +
    ` C ${n(cx - r * 0.1)} ${n(y)}, ${n(cx - r * 0.05)} ${n(cy)}, ${n(jx)} ${n(cy)}`;

  /* Two arcs rather than a <circle>, so the dash reveal traces the ring in
     one continuous stroke instead of fading a shape in. */
  const ring =
    `M ${n(cx - r)} ${n(cy)}` +
    ` a ${n(r)} ${n(r)} 0 1 1 ${n(r * 2)} 0` +
    ` a ${n(r)} ${n(r)} 0 1 1 ${n(-r * 2)} 0`;

  const head = Math.max(6, r * 0.055);
  const arrow =
    `M ${n(jx + head * 1.8)} ${n(cy)}` +
    ` L ${n(jx - head * 0.4)} ${n(cy - head * 0.75)}` +
    ` L ${n(jx - head * 0.4)} ${n(cy + head * 0.75)} Z`;

  return [
    { d: `M 0 ${n(cy)} L ${n(w)} ${n(cy)}`, from: 0, to: 0.5 },
    { d: ring, from: 0.08, to: 0.66 },
    { d: merge(cy - r * 0.82), from: 0.2, to: 0.8 },
    { d: merge(cy + r * 0.82), from: 0.26, to: 0.86 },
    { d: arrow, from: 0.84, to: 0.93, solid: true },
  ];
}

/* ── bypass ──────────────────────────────────────────────────────────
   The rail keeps going; two strands peel off it, run wide with rounded
   shoulders, and come back down to it. */
function bypass(w: number, h: number): Figure[] {
  const cy = h * 0.5;
  const d = h * 0.34; // how far the loop stands off the rail
  const sx = w * 0.18; // split
  const ex = w * 0.82; // rejoin
  const k = w * 0.09; // shoulder radius, as a control-point reach

  const loop = (sign: 1 | -1) => {
    const y = cy + sign * d;
    return (
      `M ${n(sx)} ${n(cy)}` +
      ` C ${n(sx + k * 0.7)} ${n(cy)}, ${n(sx + k * 0.5)} ${n(y)}, ${n(sx + k * 1.4)} ${n(y)}` +
      ` L ${n(ex - k * 1.4)} ${n(y)}` +
      ` C ${n(ex - k * 0.5)} ${n(y)}, ${n(ex - k * 0.7)} ${n(cy)}, ${n(ex)} ${n(cy)}`
    );
  };

  return [
    { d: `M 0 ${n(cy)} L ${n(w)} ${n(cy)}`, from: 0, to: 0.42 },
    { d: loop(-1), from: 0.16, to: 0.88 },
    { d: loop(1), from: 0.22, to: 0.94 },
  ];
}

/* ── fork ────────────────────────────────────────────────────────────
   Two lines come down the page, bend toward each other and leave as one,
   pointing at whatever sits beneath the band. */
function fork(w: number, h: number): Figure[] {
  const cx = w * 0.5;
  const gap = Math.min(w * 0.07, 130);
  const meet = h * 0.62;

  const arm = (sign: 1 | -1) =>
    `M ${n(cx + sign * gap)} 0` +
    ` C ${n(cx + sign * gap)} ${n(h * 0.42)}, ${n(cx)} ${n(h * 0.36)}, ${n(cx)} ${n(meet)}`;

  return [
    { d: arm(-1), from: 0, to: 0.62 },
    { d: arm(1), from: 0.05, to: 0.67 },
    { d: `M ${n(cx)} ${n(meet)} L ${n(cx)} ${n(h)}`, from: 0.62, to: 0.95 },
  ];
}

/* ── braid ───────────────────────────────────────────────────────────
   One rail across the top; below it the line unbraids to the left of the
   content and gathers itself back up to the right of it. */
function braid(w: number, h: number, lanes: number): Figure[] {
  const ry = h * 0.16;
  const drop = h * 0.62;
  const figures: Figure[] = [{ d: `M 0 ${n(ry)} L ${n(w)} ${n(ry)}`, from: 0, to: 0.42 }];

  for (let i = 0; i < lanes; i++) {
    const y = ry + drop * ((i + 1) / lanes);
    const stagger = 0.012 * i;

    figures.push({
      d:
        `M ${n(w * 0.05)} ${n(ry)}` +
        ` C ${n(w * 0.22)} ${n(ry)}, ${n(w * 0.28)} ${n(y)}, ${n(w * (0.46 - 0.012 * i))} ${n(y)}`,
      from: 0.16 + stagger,
      to: 0.7 + stagger,
    });

    figures.push({
      d:
        `M ${n(w * (0.54 + 0.012 * i))} ${n(y)}` +
        ` C ${n(w * 0.72)} ${n(y)}, ${n(w * 0.78)} ${n(ry)}, ${n(w * 0.95)} ${n(ry)}`,
      from: 0.28 + stagger,
      to: 0.85 + stagger,
    });
  }

  return figures;
}

const NARROW = 640;

export default function ScrollRails({
  variant = "rail",
  height = 300,
  lanes = 5,
  className,
}: Props) {
  const bandRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const next = entry.contentRect.width;
      setWidth((prev) => (Math.abs(prev - next) < 1 ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* A braid needs width to splay into and a lens needs width to be round in.
     Below ~640px neither has it, so both fall back to the plain rail rather
     than becoming a tangle nobody can read. */
  const narrow = width > 0 && width < NARROW;
  const shape: RailVariant = narrow && (variant === "braid" || variant === "lens") ? "rail" : variant;
  const bandHeight = narrow ? Math.round(height * 0.62) : height;
  const laneCount = narrow ? Math.min(lanes, 2) : lanes;

  const figures = useMemo(() => {
    if (!width) return [];
    switch (shape) {
      case "lens":
        return lens(width, bandHeight);
      case "bypass":
        return bypass(width, bandHeight);
      case "fork":
        return fork(width, bandHeight);
      case "braid":
        return braid(width, bandHeight, laneCount);
      default:
        return rail(width, bandHeight, shape === "rail" && variant !== "rail" ? 1 : laneCount);
    }
  }, [shape, variant, width, bandHeight, laneCount]);

  /* Drawn across the stretch where the band is actually on screen: from just
     after it enters the viewport to a little past the middle. */
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start 92%", "end 40%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 32,
    restDelta: 0.0004,
  });

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className={["pointer-events-none relative w-full select-none overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      style={{ height: bandHeight }}
    >
      {width > 0 ? (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${bandHeight}`}
          width={width}
          height={bandHeight}
          fill="none"
          focusable="false"
        >
          {figures.map((figure, i) =>
            figure.solid ? (
              <ArrowHead key={i} figure={figure} progress={progress} still={!!prefersReduced} />
            ) : (
              <DrawnPath key={i} figure={figure} progress={progress} still={!!prefersReduced} />
            ),
          )}
        </svg>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function DrawnPath({
  figure,
  progress,
  still,
}: {
  figure: Figure;
  progress: ReturnType<typeof useSpring>;
  still: boolean;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  /* A cubic has no closed-form arc length — the browser has to measure it,
     and it has to be re-measured whenever the geometry changes or the dash
     maths runs against a path that no longer exists. */
  useEffect(() => {
    if (ref.current) setLength(ref.current.getTotalLength());
  }, [figure.d]);

  const offset = useTransform(progress, (p) => {
    const local = clamp01((p - figure.from) / Math.max(figure.to - figure.from, 0.001));
    return length * (1 - local);
  });

  const inert = still || !length;

  return (
    <motion.path
      ref={ref}
      d={figure.d}
      stroke="var(--rail)"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeDasharray={inert ? undefined : length}
      style={inert ? undefined : { strokeDashoffset: offset }}
    />
  );
}

function ArrowHead({
  figure,
  progress,
  still,
}: {
  figure: Figure;
  progress: ReturnType<typeof useSpring>;
  still: boolean;
}) {
  const opacity = useTransform(progress, [figure.from, figure.to], [0, 1]);

  if (still) return <path d={figure.d} fill="var(--rail)" />;
  return <motion.path d={figure.d} fill="var(--rail)" style={{ opacity }} />;
}
