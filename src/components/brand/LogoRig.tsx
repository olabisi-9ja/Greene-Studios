"use client";

import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import { RUNNER_D, RUNNER_VIEWBOX } from "./runnerPath";

/**
 * The real Greene logo, cut at its joints so it can run.
 *
 * The traced logo path is drawn several times, each copy clipped to one
 * piece: torso (with hips), head, curled arm, clover arm, and for each leg
 * a thigh, a shin and a foot. Pieces hang in a hierarchy
 * (hip → knee → ankle) and turn about joint pivots measured off the logo,
 * so the body bends instead of sliding cut-outs around. Joint discs in the
 * same colour sit under the seams. At pose(REST) every angle is zero and
 * the drawing is exactly the logo.
 *
 * Coordinates: logo units, viewBox 0 0 693 715, y down.
 */

// ── joints, measured off the logo ─────────────────────────────────────
const J = {
  backHip: [272, 505],
  backKnee: [178, 570],
  backAnkle: [96, 566],
  frontHip: [322, 498],
  frontKnee: [446, 526],
  frontAnkle: [514, 636],
  shoulderBack: [328, 384],
  shoulderFront: [378, 382],
  neck: [348, 344],
  hand: [545, 292],
  pelvis: [300, 500],
} as const;

// ── pieces ────────────────────────────────────────────────────────────
// Each limb piece is a rough region (to keep it off its neighbours) cut by
// half-planes through the joint centres, square to the limb. A round cap the
// width of the limb sits on every joint, so a bending joint stays round.
type V = readonly [number, number];
const unit = (x: number, y: number): V => {
  const l = Math.hypot(x, y);
  return [x / l, y / l];
};
const dir = (a: readonly number[], b: readonly number[]) => unit(b[0] - a[0], b[1] - a[1]);
const bis = (u: V, v: V) => unit(u[0] + v[0], u[1] + v[1]);
const neg = (u: V): V => [-u[0], -u[1]];
/** Everything on the side of the line through c that n points to. */
const half = (c: readonly number[], n: V) => {
  const t: V = [-n[1], n[0]];
  const P = (k: number, m: number) => `${(c[0] + t[0] * k + n[0] * m).toFixed(1)} ${(c[1] + t[1] * k + n[1] * m).toFixed(1)}`;
  return `M${P(3000, 0)}L${P(3000, 3000)}L${P(-3000, 3000)}L${P(-3000, 0)}Z`;
};

const bThigh = dir(J.backHip, J.backKnee);
const bShin = dir(J.backKnee, J.backAnkle);
const bFoot = dir(J.backAnkle, [30, 630]);
const fThigh = dir(J.frontHip, J.frontKnee);
const fShin = dir(J.frontKnee, J.frontAnkle);
const fFoot = dir(J.frontAnkle, [635, 585]);
const bKneeN = bis(bThigh, bShin);
const bAnkleN = bis(bShin, bFoot);
const fKneeN = bis(fThigh, fShin);
const fAnkleN = bis(fShin, fFoot);

const BACK_LEG = "M200 468L312 494L306 532L240 662H0V468Z";
const FRONT_LEG = "M300 466L346 460L693 460V715H440L404 604L300 530Z";

/** Clip chains: a piece is the intersection of all its regions. */
const CLIPS: Record<string, string[]> = {
  head: ["M262 222H445V318L392 330L338 352L300 346L262 330Z"],
  backArm: ["M95 322H326L344 346L336 392L298 402L232 470H95Z"],
  frontArm: ["M356 352L384 342L470 300L470 0H693V430L470 432L388 420L372 400Z"],
  /** The same arm with an empty fist: no clover stem above, no nib below. */
  frontArmBare: ["M356 352L384 342L470 300L508 271L586 271L590 312L572 324L548 328L506 412L470 432L388 420L372 400Z"],
  torso: [
    "M326 340L360 352L372 400L388 420L392 448L346 466L330 520L296 528L240 506L222 480L250 432L298 402L336 392Z",
  ],
  backThigh: [BACK_LEG, half(J.backHip, bThigh), half(J.backKnee, neg(bKneeN))],
  backShin: [BACK_LEG, half(J.backKnee, bKneeN), half(J.backAnkle, neg(bAnkleN))],
  backFoot: [BACK_LEG, half(J.backAnkle, bAnkleN)],
  frontThigh: [FRONT_LEG, half(J.frontHip, fThigh), half(J.frontKnee, neg(fKneeN))],
  frontShin: [FRONT_LEG, half(J.frontKnee, fKneeN), half(J.frontAnkle, neg(fAnkleN))],
  frontFoot: [FRONT_LEG, half(J.frontAnkle, fAnkleN)],
  shadow: ["M90 674H470V715H90Z"],
};

/** Joint caps: radius = half the limb's width at the joint. */
const CAP = { backHip: 34, backKnee: 35, backAnkle: 29, frontHip: 33, frontKnee: 36, frontAnkle: 33 };

// ── the run cycle ──────────────────────────────────────────────────────
// Each leg follows a foot path, in units of its own length, relative to its
// own hip (y down): on the ground it slides back in a straight line (stance),
// then the heel kicks up behind, folds under, the knee drives forward and
// the foot paws back down to strike. A two-bone solver bends the knee to
// reach the path, so the knee and thigh angles come from the path, not from
// hand-set keys. q = 0 is foot strike.
type PathKey = [q: number, x: number, y: number, foot: number];
const PATH: PathKey[] = [
  [0.0, 0.5, 0.76, 92],
  [0.16, 0.0, 0.76, 92],
  [0.32, -0.5, 0.76, 70],
  [0.43, -0.9, 0.31, 48.4], // heel up behind: the logo's back leg
  [0.6, -0.24, 0.42, 56],
  [0.78, 0.52, 0.5, 74],
  [0.93, 0.75, 0.54, 80.1], // knee driven through: the logo's front leg
  [1.0, 0.5, 0.76, 92],
];
const DUTY = 0.32;
const STANCE_Y = 0.76;
export const REST = 0.43;

function along(q: number, ground: number): [number, number, number] {
  q = ((q % 1) + 1) % 1;
  let i = 0;
  while (i < PATH.length - 2 && PATH[i + 1][0] <= q) i++;
  const n = PATH.length - 1;
  const p0 = PATH[(i - 1 + n) % n];
  const p1 = PATH[i];
  const p2 = PATH[i + 1];
  const p3 = PATH[(i + 2) % n];
  const t = (q - p1[0]) / (p2[0] - p1[0] || 1);
  if (i < 2) {
    // stance: a straight line along the ground
    const a = PATH[0];
    const b = PATH[2];
    const u = q / DUTY;
    return [a[1] + (b[1] - a[1]) * u, ground, p1[3] + (p2[3] - p1[3]) * t];
  }
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  // ground keys take this leg's own ground line
  const y = (k: PathKey) => (k[2] === STANCE_Y ? ground : k[2]);
  return [cr(p0[1], p1[1], p2[1], p3[1]), cr(y(p0), y(p1), y(p2), y(p3)), cr(p0[3], p1[3], p2[3], p3[3])];
}

/** ground: ankle height on the ground, logo units. The near leg is drawn longer, so it lands lower (perspective). */
type LegDef = { hip: readonly number[]; knee: readonly number[]; ankle: readonly number[]; ground: number };
const len = (a: readonly number[], b: readonly number[]) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const deg = (dx: number, dy: number) => (Math.atan2(dx, dy) * 180) / Math.PI; // from straight down, + forward

/** Thigh angle, knee flexion and foot angle for a leg at phase q, lifted by bob (logo units). */
function solve(leg: LegDef, q: number, bob: number): [number, number, number] {
  const a = len(leg.hip, leg.knee);
  const b = len(leg.ankle, leg.knee);
  const L = a + b;
  const [px, py, foot] = along(q, (leg.ground - leg.hip[1]) / L);
  // on the ground the foot holds still in the world, so cancel the body's bob
  const onGround = (((q % 1) + 1) % 1) < DUTY;
  const tx = px * L;
  const ty = py * L - (onGround ? bob : 0);
  let d = Math.hypot(tx, ty);
  d = Math.min(a + b - 0.5, Math.max(Math.abs(a - b) + 1, d));
  const toward = deg(tx, ty);
  const alpha = (Math.acos((a * a + d * d - b * b) / (2 * a * d)) * 180) / Math.PI;
  const thigh = toward + alpha; // knee forward of the hip-to-foot line
  const beta = (Math.acos((a * a + b * b - d * d) / (2 * a * b)) * 180) / Math.PI;
  return [thigh, 180 - beta, foot];
}

const BACK: LegDef = { hip: [272, 505], knee: [178, 570], ankle: [96, 566], ground: 652 };
const FRONT: LegDef = { hip: [322, 498], knee: [446, 526], ankle: [514, 636], ground: 676 };

/** Linger in the two long strides (the logo and its mirror), pass quickly under the body. */
const warp = (p: number) => p - (0.5 * Math.sin(4 * Math.PI * (p - REST))) / (4 * Math.PI);

// + = lower. The body rides highest as the legs pass under it and lowest in the long strides,
// which keeps the logo's long near leg from folding into a crouch.
const bobAt = (p: number) => -24 * Math.cos(4 * Math.PI * (p - 0.16));
const BACK_REST = solve(BACK, REST, bobAt(REST) - bobAt(REST));
const FRONT_REST = solve(FRONT, REST + 0.5, 0);

/**
 * A body state as changes from the drawn logo (all zero = the logo).
 * Angles in degrees: thighs + forward, knees + more bent, feet + toe up,
 * lean/head + tipping forward, arms + swinging down/back. bob + = lower,
 * in logo units. shadow 0..1.
 */
export type Rig = {
  bt: number; bk: number; bf: number;
  ft: number; fk: number; ff: number;
  bob: number; lean: number; head: number;
  backArm: number; frontArm: number; shadow: number;
};

export const ZERO: Rig = { bt: 0, bk: 0, bf: 0, ft: 0, fk: 0, ff: 0, bob: 0, lean: 0, head: 0, backArm: 0, frontArm: 0, shadow: 1 };

/** The run cycle at phase p, scaled by amount (0 = still logo, ~0.5 = a jog). */
export function runRig(p: number, amount = 1): Rig {
  const a = amount;
  p = warp(p);
  const d = p - REST;
  const bob = (bobAt(p) - bobAt(REST)) * a;
  const b = solve(BACK, p, bob);
  const f = solve(FRONT, p + 0.5, bob);
  return {
    bt: (b[0] - BACK_REST[0]) * a,
    bk: (b[1] - BACK_REST[1]) * a,
    bf: (b[2] - BACK_REST[2]) * a,
    ft: (f[0] - FRONT_REST[0]) * a,
    fk: (f[1] - FRONT_REST[1]) * a,
    ff: (f[2] - FRONT_REST[2]) * a,
    bob,
    lean: 2.5 * Math.sin(4 * Math.PI * d) * a,
    head: -2 * Math.sin(4 * Math.PI * d) * a,
    backArm: -22 * Math.sin(2 * Math.PI * d) * a,
    frontArm: (5 * Math.sin(2 * Math.PI * d + 0.6) - 5 * Math.sin(0.6)) * a,
    shadow: 1 - 0.35 * (Math.max(0, -bob) / 48),
  };
}

/** Standing tall, feet under the hips. */
const STAND: Rig = { bt: 55, bk: -30, bf: 42, ft: -79, fk: -32, ff: 10, bob: -62, lean: -16, head: 4, backArm: -18, frontArm: 0, shadow: 1 };

const POSTURE_SIT = (t: number): Rig => ({
  bt: 140, bk: 56 + 14 * Math.sin(t * 2.4), bf: 42,
  ft: 6, fk: 49 + 14 * Math.sin(t * 2.4 + 1.7), ff: 10,
  bob: 186, lean: -22 + Math.sin(t * 1.3), head: 6, backArm: 30, frontArm: 18, shadow: 0,
});
const POSTURE_CROSS = (t: number): Rig => ({
  bt: 140, bk: 150, bf: 30, ft: 6, fk: 150, ff: 10,
  bob: 186 + Math.sin(t * 1.6) * 1.5, lean: -14, head: 4, backArm: 40, frontArm: 60, shadow: 0,
});

/** Other postures for the mascot, at time t (seconds) so they can breathe. */
export const POSTURE = {
  stand: (t: number): Rig => ({ ...STAND, lean: STAND.lean + Math.sin(t * 2) * 0.8, bob: STAND.bob + Math.sin(t * 2) * 2 }),
  /** Sat on the ledge, legs over the edge, swinging out of step. */
  sit: (t: number): Rig => ({
    bt: 140, bk: 56 + 14 * Math.sin(t * 2.4), bf: 42,
    ft: 6, fk: 49 + 14 * Math.sin(t * 2.4 + 1.7), ff: 10,
    bob: 186, lean: -22 + Math.sin(t * 1.3), head: 6, backArm: 30, frontArm: 18, shadow: 0,
  }),
  /** Clover held up and waved. */
  wave: (t: number): Rig => ({ ...STAND, frontArm: -14 + 16 * Math.sin(t * 9), head: -4, lean: -18 }),
  /** Looking around: head turns, body shifts its weight. */
  look: (t: number): Rig => ({
    ...STAND,
    head: 10 * Math.sin(t * 1.6),
    lean: STAND.lean + 3 * Math.sin(t * 0.8),
    bt: STAND.bt + 4 * Math.sin(t * 0.8),
  }),
  /** Both arms up, up on the toes, a long stretch. */
  stretch: (t: number): Rig => ({ ...STAND, frontArm: -48 + 4 * Math.sin(t * 2), backArm: 150 + 6 * Math.sin(t * 2), lean: -24, head: -10, bob: STAND.bob - 6, bf: STAND.bf - 18, ff: STAND.ff - 18 }),
  /** Looking down at whatever is in the hand (phone, cup). */
  read: (t: number): Rig => ({ ...STAND, frontArm: 34 + 2 * Math.sin(t * 1.5), head: 14 + 2 * Math.sin(t * 0.7), lean: -10 }),
  /** Hand to mouth: a sip. */
  sip: (t: number): Rig => ({ ...STAND, frontArm: -62 + 6 * Math.max(0, Math.sin(t * 1.3)), head: -8, lean: -20 }),
  /** Asleep sat on the ledge, head dropped, breathing slowly. */
  nap: (t: number): Rig => ({
    bt: 140, bk: 60, bf: 42, ft: 6, fk: 54, ff: 10,
    bob: 186 + Math.sin(t * 1.4) * 2, lean: 6 + Math.sin(t * 1.4) * 1.5, head: 24, backArm: 50, frontArm: 70, shadow: 0,
  }),
  /** A little hop on the spot: crouch, spring, tuck, land. */
  hop: (t: number): Rig => {
    const c = (t * 1.6) % 1;
    const up = c > 0.3 && c < 0.8 ? Math.sin(((c - 0.3) / 0.5) * Math.PI) : 0;
    const squat = c < 0.3 ? Math.sin((c / 0.3) * Math.PI) : c > 0.8 ? Math.sin(((c - 0.8) / 0.2) * Math.PI) : 0;
    return {
      ...STAND,
      bob: STAND.bob - up * 110 + squat * 26,
      bk: STAND.bk + squat * 40 + up * 50,
      fk: STAND.fk + squat * 40 + up * 50,
      bt: STAND.bt + squat * 22 + up * 30,
      ft: STAND.ft + squat * 22 + up * 30,
      backArm: STAND.backArm + up * 60,
      frontArm: -up * 30,
      shadow: 1 - up * 0.5,
    };
  },
  /** Knees bent, about to spring (or just landed). */
  crouch: (): Rig => ({ ...STAND, bk: 20, fk: 25, bt: 75, ft: -55, bob: -10, lean: 4, backArm: 24 }),
  /** Hand over hand, knee over knee: going up a ladder. */
  climb: (t: number): Rig => {
    const s = Math.sin(t * 6);
    return {
      ...STAND,
      frontArm: -70 + 25 * s,
      backArm: 160 - 25 * s,
      bt: STAND.bt + 34 * Math.max(0, s),
      bk: STAND.bk + 50 * Math.max(0, s),
      ft: STAND.ft + 34 * Math.max(0, -s),
      fk: STAND.fk + 50 * Math.max(0, -s),
      lean: -10,
      head: -6,
    };
  },
  /** Leaning into something heavy, legs driving. */
  push: (t: number): Rig => ({ ...runRig(t, 0.5), lean: 20, frontArm: 34, backArm: -30, head: 6 }),
  /** Sat cross-legged on the ledge itself. */
  crossSit: (t: number): Rig => ({
    bt: 140, bk: 150, bf: 30, ft: 6, fk: 150, ff: 10,
    bob: 186 + Math.sin(t * 1.6) * 1.5, lean: -14, head: 4, backArm: 40, frontArm: 60, shadow: 0,
  }),
  /** Hand to the back of the head, thinking it over. */
  scratch: (t: number): Rig => ({ ...STAND, frontArm: -100 + 6 * Math.sin(t * 12), head: 10, lean: -12 }),
  /** Brush strokes in front of him. */
  paint: (t: number): Rig => ({ ...STAND, frontArm: 55 + 14 * Math.sin(t * 5), lean: 8, head: 8 }),
  /** Flick of the wrist (k 0..1 is the flick). */
  flick: (k: number): Rig => ({ ...STAND, frontArm: 40 - 60 * Math.sin(Math.PI * k), head: -10 * Math.sin(Math.PI * k) }),
  /** Fishing off the edge, rod out. */
  fish: (t: number): Rig => ({ ...POSTURE_SIT(t), frontArm: -6 + 3 * Math.sin(t * 1.2), head: 12 }),
  /** Cross-legged at a laptop, both hands busy. */
  type: (t: number): Rig => ({ ...POSTURE_CROSS(t), frontArm: 72 + 3 * Math.sin(t * 15), backArm: 62 + 3 * Math.sin(t * 13 + 1), head: 14 }),
  /** Walking with something held overhead (the ladder). */
  carry: (p: number): Rig => ({ ...runRig(p, 0.45), frontArm: -46, backArm: 150, lean: -4, head: 0 }),
  /** Steadying a ladder with both hands. */
  brace: (t: number): Rig => ({ ...STAND, frontArm: -18 + 3 * Math.sin(t * 2), backArm: 130, lean: 6, head: -12 }),
  /** A kick: k 0..1 through the swing. */
  kick: (k: number): Rig => ({ ...STAND, ft: STAND.ft + 95 * Math.sin(Math.PI * k), fk: STAND.fk + 30 * Math.sin(Math.PI * k), lean: -10, backArm: 40 }),
  /** Floating cross-legged, arms out. */
  float: (t: number): Rig => ({ ...POSTURE_CROSS(t), frontArm: 20 + 4 * Math.sin(t * 2), backArm: -40 - 4 * Math.sin(t * 2), head: -4, lean: -16 }),
  /** Crouched at something low, working at it. */
  tinker: (t: number): Rig => ({ ...STAND, bk: 60, fk: 70, bt: 95, ft: -40, bob: 20, lean: 22, frontArm: 70 + 10 * Math.sin(t * 7), backArm: 30, head: 14 }),
};

export function mixRig(x: Rig, y: Rig, t: number): Rig {
  const o = {} as Rig;
  (Object.keys(x) as (keyof Rig)[]).forEach((k) => (o[k] = x[k] + (y[k] - x[k]) * t));
  return o;
}

/** What the near hand holds. The logo holds the clover pen. */
export type Prop =
  | "clover" | "none" | "phone" | "cup" | "balloon" | "flag"
  | "ladder" | "brush" | "torch" | "key" | "rod" | "laptop" | "box";

/** Where the near fist is, in logo units, for a body state (for threads, lines, thrown things). */
export function handPoint(r: Rig): [number, number] {
  const turn = ([x, y]: [number, number], deg: number, [cx, cy]: readonly number[]): [number, number] => {
    const a = (deg * Math.PI) / 180;
    return [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
  };
  let p = turn([552, 296], r.frontArm, J.shoulderFront);
  p = turn(p, r.lean, J.pelvis);
  return [p[0], p[1] + r.bob];
}

export type LogoRigHandle = {
  /** Draw the runner at cycle phase p. amount 0 = the still logo. */
  pose: (p: number, amount?: number) => void;
  /** Draw any body state. */
  apply: (r: Rig) => void;
  /** Put something else in the near hand. */
  hold: (p: Prop) => void;
};

const rot = (deg: number, [x, y]: readonly number[]) => `rotate(${deg.toFixed(2)} ${x} ${y})`;

const LogoRig = forwardRef<LogoRigHandle, { className?: string; title?: string; debug?: boolean }>(function LogoRig(
  { className = "", title, debug = false },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const g = {
    bob: useRef<SVGGElement>(null),
    upper: useRef<SVGGElement>(null),
    head: useRef<SVGGElement>(null),
    backArm: useRef<SVGGElement>(null),
    frontArm: useRef<SVGGElement>(null),
    backThigh: useRef<SVGGElement>(null),
    backShin: useRef<SVGGElement>(null),
    backFoot: useRef<SVGGElement>(null),
    frontThigh: useRef<SVGGElement>(null),
    frontShin: useRef<SVGGElement>(null),
    frontFoot: useRef<SVGGElement>(null),
    shadow: useRef<SVGGElement>(null),
  };

  useImperativeHandle(ref, () => {
    const set = (r: React.RefObject<SVGGElement | null>, t: string) => r.current?.setAttribute("transform", t);
    const apply = (r: Rig) => {
      // SVG rotate is clockwise; a forward swing is counter-clockwise when facing right
      set(g.backThigh, rot(-r.bt, J.backHip));
      set(g.backShin, rot(r.bk, J.backKnee));
      set(g.backFoot, rot(-r.bf, J.backAnkle));
      set(g.frontThigh, rot(-r.ft, J.frontHip));
      set(g.frontShin, rot(r.fk, J.frontKnee));
      set(g.frontFoot, rot(-r.ff, J.frontAnkle));
      set(g.bob, `translate(0 ${r.bob.toFixed(2)})`);
      set(g.upper, rot(r.lean, J.pelvis));
      set(g.head, rot(r.head, J.neck));
      set(g.backArm, rot(r.backArm, J.shoulderBack));
      set(g.frontArm, rot(r.frontArm, J.shoulderFront));
      set(g.shadow, `translate(280 694) scale(${Math.max(0, r.shadow).toFixed(3)} 1) translate(-280 -694)`);
    };
    const hold = (p: Prop) => {
      const root = g.frontArm.current;
      if (!root) return;
      root.querySelectorAll<SVGGElement>("[data-prop]").forEach((el) => {
        el.style.display = el.dataset.prop === p || (el.dataset.prop === "bare" && p !== "clover") ? "" : "none";
      });
    };
    return { apply, hold, pose: (p: number, amount = 1) => apply(runRig(p, amount)) };
  });

  const C = (id: keyof typeof CLIPS, tint?: string) =>
    CLIPS[id].reduceRight<React.ReactNode>(
      (inner, _r, i) => <g clipPath={`url(#${uid}${id}${i})`}>{inner}</g>,
      <path d={RUNNER_D} fillRule="evenodd" fill={debug && tint ? tint : undefined} />,
    );
  const disc = (c: readonly number[], r: number) => <circle cx={c[0]} cy={c[1]} r={r} fill={debug ? "#111" : undefined} opacity={debug ? 0.35 : undefined} />;

  return (
    <svg
      viewBox={RUNNER_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
      overflow="visible"
    >
      <defs>
        {Object.entries(CLIPS).flatMap(([k, list]) =>
          list.map((d, i) => (
            <clipPath key={k + i} id={`${uid}${k}${i}`}>
              <path d={d} />
            </clipPath>
          )),
        )}
      </defs>
      <g ref={g.shadow}>{C("shadow")}</g>
      <g ref={g.bob}>
        {/* back leg sits behind the body */}
        <g ref={g.backThigh}>
          {C("backThigh", "#2563eb")}
          {disc(J.backHip, CAP.backHip)}
          <g ref={g.backShin}>
            {C("backShin", "#7c3aed")}
            {disc(J.backKnee, CAP.backKnee)}
            <g ref={g.backFoot}>
              {C("backFoot", "#db2777")}
              {disc(J.backAnkle, CAP.backAnkle)}
            </g>
          </g>
        </g>
        <g ref={g.upper}>
          <g ref={g.backArm}>{C("backArm", "#f59e0b")}</g>
          {C("torso", "#0f5132")}
          <g ref={g.head}>{C("head", "#10b981")}</g>
          <g ref={g.frontArm}>
            <g data-prop="clover">{C("frontArm", "#ef4444")}</g>
            <g data-prop="bare" style={{ display: "none" }}>
              {C("frontArmBare", "#ef4444")}
            </g>
            {/* props sit in the fist at about (552, 296) */}
            <g data-prop="phone" style={{ display: "none" }}>
              <rect x="526" y="196" width="50" height="92" rx="10" />
              <rect x="533" y="205" width="36" height="66" rx="4" fill="var(--brand-bg)" opacity="0.85" />
            </g>
            <g data-prop="cup" style={{ display: "none" }}>
              <path d="M520 232h66l-8 62h-50Z" />
              <path d="M586 244c22 0 22 30 0 30" fill="none" stroke="currentColor" strokeWidth="9" />
              <path d="M538 214c-8-14 8-18 0-34M560 214c-8-14 8-18 0-34" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
            </g>
            <g data-prop="balloon" style={{ display: "none" }}>
              <path d="M556 284C566 200 540 140 585 70" fill="none" stroke="currentColor" strokeWidth="5" />
              <ellipse cx="600" cy="10" rx="58" ry="68" />
              <path d="M590 74l10 -4 10 4-10 10Z" />
            </g>
            <g data-prop="flag" style={{ display: "none" }}>
              <path d="M556 300V40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              <path d="M560 44c40-14 70 18 118 0v74c-48 18-78-14-118 0Z" />
            </g>
            <g data-prop="ladder" style={{ display: "none" }} fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
              <path d="M180 250H860M180 318H860" />
              <path d="M240 250v68M330 250v68M420 250v68M510 250v68M600 250v68M690 250v68M780 250v68" strokeWidth="10" />
            </g>
            <g data-prop="brush" style={{ display: "none" }}>
              <path d="M556 300L650 410" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
              <path d="M640 396l34-10 30 50c8 14-12 26-22 14Z" fill="#ff6a1a" />
            </g>
            <g data-prop="torch" style={{ display: "none" }}>
              <path d="M690 250L1100 120L1160 420Z" fill="#ffe07a" opacity="0.28" />
              <rect x="540" y="262" width="150" height="46" rx="12" transform="rotate(-18 552 296)" />
            </g>
            <g data-prop="key" style={{ display: "none" }} fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round">
              <circle cx="600" cy="250" r="30" />
              <path d="M622 272L690 340M664 314l-18 18M682 332l-18 18" />
            </g>
            <g data-prop="laptop" style={{ display: "none" }}>
              {/* open laptop held out, screen up */}
              <path d="M520 312L740 300L748 322L528 334Z" />
              <path d="M600 306L640 150L860 140L820 296Z" />
              <path d="M622 286L652 168L836 160L806 280Z" fill="var(--brand-bg)" opacity="0.8" />
            </g>
            <g data-prop="box" style={{ display: "none" }}>
              {/* a parcel held up, lid tape across */}
              <path d="M470 170L560 128L650 170V286L560 328L470 286Z" />
              <path d="M470 170L560 212L650 170M560 212V328" fill="none" stroke="var(--brand-bg)" strokeWidth="10" />
            </g>
            <g data-prop="rod" style={{ display: "none" }}>
              <path d="M520 330L1150 -60" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
            </g>
          </g>
        </g>
        <g ref={g.frontThigh}>
          {C("frontThigh", "#0891b2")}
          {disc(J.frontHip, CAP.frontHip)}
          <g ref={g.frontShin}>
            {C("frontShin", "#65a30d")}
            {disc(J.frontKnee, CAP.frontKnee)}
            <g ref={g.frontFoot}>
              {C("frontFoot", "#c2410c")}
              {disc(J.frontAnkle, CAP.frontAnkle)}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});

export default LogoRig;
