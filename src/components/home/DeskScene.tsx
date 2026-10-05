"use client";

import { useEffect, useState } from "react";

/**
 * The hero illustrations: one character, a different little scene for each
 * word, each acted out and cross-faded into the next.
 *
 *   0 Brands    at an easel, painting the clover mark onto a canvas
 *   1 Websites  at his desk, typing, a page building on the laptop
 *   2 Apps      beside a giant phone, tapping app tiles into place
 *   3 Products  wheeling in a hand truck stacked with boxes
 *
 * The character is drawn whole from smooth shapes (no cut-outs, so no
 * seams): capsule body, round limbs solved to where his hands and feet
 * need to be, a capped head like the logo's. Far-side limbs are a lighter
 * shade of the same colour so nothing overlaps transparently.
 */
type V = { x: number; y: number };
const GROUND = 288;
const ARM = [36, 34];
const LEG = [46, 46];

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const smooth = (k: number) => k * k * (3 - 2 * k);
const clamp01 = (k: number) => Math.min(1, Math.max(0, k));

/** Two-bone chain from a to b. bend: +1 joint falls below/forward, -1 the other way. */
function chain(a: V, b: V, l1: number, l2: number, bend: 1 | -1): V {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  d = Math.min(l1 + l2 - 0.5, Math.max(Math.abs(l1 - l2) + 1, d));
  const cos = Math.min(1, Math.max(-1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)));
  const ang = bend * Math.acos(cos);
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: a.x + (ux * c - uy * s) * l1, y: a.y + (ux * s + uy * c) * l1 };
}

type Pose = {
  hip: V;
  shoulder: V;
  head: V;
  tilt: number;
  hand: V; // near
  farHand: V;
  foot: V; // near
  farFoot: V;
};

/** The man, facing right. */
function Person({ p }: { p: Pose }) {
  const elbow = chain(p.shoulder, p.hand, ARM[0], ARM[1], 1);
  const farShoulder = { x: p.shoulder.x - 6, y: p.shoulder.y - 2 };
  const farElbow = chain(farShoulder, p.farHand, ARM[0], ARM[1], 1);
  const knee = chain(p.hip, p.foot, LEG[0], LEG[1], -1);
  const farKnee = chain({ x: p.hip.x - 4, y: p.hip.y }, p.farFoot, LEG[0], LEG[1], -1);
  const far = "color-mix(in srgb, currentColor 62%, var(--brand-bg))";
  const shoe = (f: V, fill: string) => <path d={`M${f.x - 6} ${f.y - 7}Q${f.x + 8} ${f.y - 12} ${f.x + 20} ${f.y - 2}Q${f.x + 12} ${f.y + 2} ${f.x - 6} ${f.y}Z`} fill={fill} stroke="none" />;
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* far side */}
      <path d={`M${p.hip.x - 4} ${p.hip.y}L${farKnee.x} ${farKnee.y}L${p.farFoot.x} ${p.farFoot.y - 4}`} stroke={far} strokeWidth="17" />
      {shoe(p.farFoot, far)}
      <path d={`M${farShoulder.x} ${farShoulder.y}L${farElbow.x} ${farElbow.y}L${p.farHand.x} ${p.farHand.y}`} stroke={far} strokeWidth="12" />
      <circle cx={p.farHand.x} cy={p.farHand.y} r="7" fill={far} />
      {/* body */}
      <path d={`M${p.hip.x} ${p.hip.y - 4}L${p.shoulder.x} ${p.shoulder.y + 6}`} stroke="currentColor" strokeWidth="34" />
      {/* near leg */}
      <path d={`M${p.hip.x} ${p.hip.y}L${knee.x} ${knee.y}L${p.foot.x} ${p.foot.y - 4}`} stroke="currentColor" strokeWidth="19" />
      {shoe(p.foot, "currentColor")}
      {/* head and cap */}
      <g transform={`translate(${p.head.x} ${p.head.y}) rotate(${p.tilt})`}>
        <circle r="21" fill="currentColor" />
        <path d="M-22 -1A22 22 0 0 1 21 -6L43 -12Q39 0 19 2Z" fill="currentColor" />
        <path d="M-20 2Q0 -3 19 3" stroke="var(--brand-bg)" strokeWidth="2.5" />
      </g>
      {/* near arm */}
      <path d={`M${p.shoulder.x} ${p.shoulder.y}L${elbow.x} ${elbow.y}L${p.hand.x} ${p.hand.y}`} stroke="currentColor" strokeWidth="13" />
      <circle cx={p.hand.x} cy={p.hand.y} r="7.5" fill="currentColor" />
    </g>
  );
}

/** A standing pose at x, breathing. */
function standing(x: number, t: number, hand: V, farHand: V, tilt = 0): Pose {
  const b = Math.sin(t * 2) * 0.8;
  return {
    hip: { x, y: 198 + b * 0.3 },
    shoulder: { x: x + 6, y: 128 + b },
    head: { x: x + 12, y: 96 + b },
    tilt,
    hand,
    farHand,
    foot: { x: x + 4, y: GROUND },
    farFoot: { x: x - 12, y: GROUND },
  };
}

const BG = "var(--brand-bg)";

// ── 0 Brands: the easel ───────────────────────────────────────────────
function Easel({ t, since }: { t: number; since: number }) {
  const paint = clamp01((since - 0.3) / 2.4);
  const hand = { x: 262 + Math.sin(t * 3.1) * 12, y: 150 + Math.cos(t * 2.3) * 12 };
  return (
    <g>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M262 288L290 96M330 288L300 96M296 288V200" />
      </g>
      <rect x="232" y="104" width="122" height="102" rx="4" fill={BG} stroke="currentColor" strokeWidth="4" />
      {/* the clover painting itself onto the canvas */}
      <g transform="translate(293 155)">
        {[45, 135, 225, 315].map((a, i) => (
          <path
            key={a}
            d="M0 0C-3-5-15-8-15-18C-15-25-7-27 0-21C7-27 15-25 15-18C15-8 3-5 0 0Z"
            transform={`rotate(${a})`}
            fill="currentColor"
            fillOpacity={clamp01(paint * 4 - i) * 0.9}
            stroke="currentColor"
            strokeWidth="2.5"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - clamp01(paint * 4 - i)}
          />
        ))}
      </g>
      <Person p={standing(150, t, hand, { x: 112, y: 176 }, 4)} />
      {/* brush and palette */}
      <path d={`M${hand.x} ${hand.y}L${hand.x + 18} ${hand.y - 10}`} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="104" cy="180" rx="20" ry="8" fill="currentColor" />
      <circle cx="98" cy="178" r="2.5" fill={BG} />
      <circle cx="108" cy="181" r="2.5" fill={BG} />
    </g>
  );
}

// ── 1 Websites: the desk ──────────────────────────────────────────────
function Desk({ t, since }: { t: number; since: number }) {
  const tap = (o: number) => Math.max(0, Math.sin(t * 18 + o)) * 4;
  const p: Pose = {
    hip: { x: 126, y: 200 },
    shoulder: { x: 146, y: 130 + Math.sin(t * 2) * 0.8 },
    head: { x: 160, y: 98 + Math.sin(t * 2) * 0.8 },
    tilt: 8,
    hand: { x: 284, y: 160 - tap(0) },
    farHand: { x: 262, y: 160 - tap(Math.PI) },
    foot: { x: 200, y: GROUND },
    farFoot: { x: 184, y: GROUND },
  };
  return (
    <g>
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55">
        <path d="M92 206H158M100 208L94 288M150 208L156 288M98 252H152" />
      </g>
      <Person p={p} />
      <rect x="196" y="166" width="196" height="9" rx="3" fill="currentColor" />
      <path d="M212 175V288M376 175V288" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M240 166H336L330 160H246Z" fill="currentColor" />
      <path d="M250 160L262 96H354L342 160Z" fill="currentColor" />
      <path d="M260 154L270 102H348L338 154Z" fill={BG} opacity="0.9" />
      {[0, 1, 2, 3].map((n) => {
        const show = clamp01(since * 1.6 - n * 0.45);
        return <rect key={n} x={276 - n * 1.6} y={108 + n * 11} width={(n === 0 ? 30 : 52 - n * 6) * show} height={n === 0 ? 5 : 4} rx="2" fill="currentColor" opacity={n === 0 ? 1 : 0.55} />;
      })}
      {/* near arm over the desk edge */}
      <path d={`M${p.shoulder.x} ${p.shoulder.y}L${chain(p.shoulder, p.hand, ARM[0], ARM[1], 1).x} ${chain(p.shoulder, p.hand, ARM[0], ARM[1], 1).y}L${p.hand.x} ${p.hand.y}`} stroke="currentColor" strokeWidth="13" strokeLinecap="round" fill="none" />
      <circle cx={p.hand.x} cy={p.hand.y} r="7.5" fill="currentColor" />
    </g>
  );
}

// ── 2 Apps: the giant phone ───────────────────────────────────────────
const TILES = Array.from({ length: 9 }, (_, i) => ({ x: 252 + (i % 3) * 26, y: 98 + Math.floor(i / 3) * 30 }));
function Phone({ t, since }: { t: number; since: number }) {
  const n = Math.min(TILES.length, Math.floor(clamp01(since / 2.6) * TILES.length) + 1);
  const target = TILES[Math.min(TILES.length - 1, n - 1)];
  const reach = { x: target.x + 9, y: target.y + 12 };
  const press = Math.max(0, Math.sin(t * 9)) * 3;
  return (
    <g>
      <rect x="236" y="58" width="104" height="226" rx="20" fill="currentColor" />
      <rect x="244" y="72" width="88" height="198" rx="12" fill={BG} />
      <rect x="276" y="64" width="24" height="5" rx="2.5" fill={BG} opacity="0.5" />
      {TILES.map((tile, i) => {
        const k = clamp01((since - (i / TILES.length) * 2.6) * 4);
        const s = k < 1 ? 0.6 + 0.55 * Math.sin((k * Math.PI) / 1.2) : 1;
        return (
          <rect
            key={i}
            x={tile.x + 9 - 9 * s}
            y={tile.y + 9 - 9 * s}
            width={18 * s}
            height={18 * s}
            rx={5 * s}
            fill="currentColor"
            opacity={k > 0 ? (i % 3 === 1 ? 0.55 : 0.9) : 0}
          />
        );
      })}
      <Person p={standing(170, t, { x: reach.x - press * 0.3, y: reach.y + press }, { x: 150, y: 206 }, -10)} />
    </g>
  );
}

// ── 3 Products: the hand truck ────────────────────────────────────────
function Truck({ t, since }: { t: number; since: number }) {
  const k = smooth(clamp01(since / 1.6));
  const x = lerp(-60, 132, k);
  const moving = k < 1;
  const step = (x + 60) / 30; // stride matched to ground covered
  const s = Math.sin(step * Math.PI);
  const foot = { x: x + 4 + (moving ? s * 16 : 0), y: GROUND - (moving ? Math.max(0, Math.cos(step * Math.PI)) * 8 : 0) };
  const farFoot = { x: x - 10 - (moving ? s * 16 : 0), y: GROUND - (moving ? Math.max(0, -Math.cos(step * Math.PI)) * 8 : 0) };
  const tx = x + 78;
  const lean = moving ? 6 : 0;
  const p: Pose = {
    hip: { x, y: 198 },
    shoulder: { x: x + 8 + lean, y: 130 },
    head: { x: x + 15 + lean, y: 98 },
    tilt: moving ? 6 : -6 + Math.sin(t * 2) * 2,
    hand: { x: tx - 6, y: 132 },
    farHand: { x: tx - 10, y: 136 },
    foot,
    farFoot,
  };
  const wheel = ((x + 60) / 14) * (180 / Math.PI);
  return (
    <g>
      <Person p={p} />
      {/* the truck: handle, upright, toe plate, wheel; three boxes */}
      <path d={`M${tx - 8} 128L${tx} 128L${tx + 12} 282H${tx + 70}`} stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform={`translate(${tx + 14} 278) rotate(${wheel})`}>
        <circle r="10" fill="currentColor" />
        <path d="M-6 0H6" stroke={BG} strokeWidth="2.5" />
      </g>
      {[
        { y: 230, w: 54, h: 50 },
        { y: 186, w: 46, h: 44 },
        { y: 148, w: 38, h: 38 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={tx + 16} y={b.y} width={b.w} height={b.h} rx="2" fill="currentColor" opacity={i === 1 ? 0.72 : 0.9} />
          <path d={`M${tx + 16 + b.w / 2} ${b.y}V${b.y + 12}`} stroke={BG} strokeWidth="3" />
        </g>
      ))}
      {/* near arm drawn again over the boxes' edge */}
      <circle cx={p.hand.x} cy={p.hand.y} r="7.5" fill="currentColor" />
    </g>
  );
}

const SCENES = [Easel, Desk, Phone, Truck];

export default function DeskScene({ job, since }: { job: number; since: number }) {
  const [t, setT] = useState(0);
  const [prev, setPrev] = useState(job);
  const [shown, setShown] = useState(job);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    const tick = (now: number) => {
      clock += Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      setT(clock);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (job !== shown) {
      setPrev(shown);
      setShown(job);
    }
  }, [job, shown]);

  const fade = smooth(clamp01(since / 0.45));
  const Cur = SCENES[job];
  const Prev = SCENES[prev];

  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full overflow-visible" aria-hidden="true">
      <ellipse cx="200" cy={GROUND + 4} rx="160" ry="4" fill="currentColor" opacity="0.18" />
      {fade < 1 && prev !== job && (
        <g opacity={1 - fade} transform={`translate(0 ${-6 * fade})`}>
          <Prev t={t} since={10} />
        </g>
      )}
      <g opacity={fade} transform={`translate(0 ${8 * (1 - fade)})`}>
        <Cur t={t} since={since} />
      </g>
    </svg>
  );
}
