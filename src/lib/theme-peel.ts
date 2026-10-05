/**
 * The theme switch as a page peel, the same fold as the back-to-top corner
 * but across the whole screen: the current theme is a sheet whose top-right
 * corner curls down and across, uncovering the next theme beneath.
 *
 * Runs inside a View Transition. The old page's snapshot is clipped to the
 * part not yet peeled, and a flap (the back of the sheet) is the peeled part
 * reflected across the fold line. Both are animated frame by frame with
 * exact polygons, since the shapes change vertex count as the fold travels.
 */

type Pt = [number, number];

const FRAMES = 48;
const DURATION = 1100;
const POINTS = 6; // every polygon is padded to this many vertices so frames interpolate

/** ease-in-out: the corner lifts slowly, sweeps, then settles */
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Clip a polygon to the half-plane where side(p) >= 0 (Sutherland–Hodgman). */
function clip(poly: Pt[], side: (p: Pt) => number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = side(a);
    const sb = side(b);
    if (sa >= 0) out.push(a);
    if ((sa >= 0) !== (sb >= 0)) {
      const k = sa / (sa - sb);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
    }
  }
  return out;
}

function toClipPath(poly: Pt[]): string {
  const pts = poly.length ? poly : ([[0, 0]] as Pt[]);
  const padded = [...pts];
  while (padded.length < POINTS) padded.push(pts[pts.length - 1]);
  return `polygon(${padded.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(", ")})`;
}

/**
 * Keyframes for the page still lying flat (old theme) and for the flap.
 * The fold line is x - y = W - t, with t running from 0 (nothing peeled)
 * to W + H (the whole sheet turned over).
 */
function frames(W: number, H: number) {
  const sheet: Pt[] = [
    [0, 0],
    [W, 0],
    [W, H],
    [0, H],
  ];
  const flat: Keyframe[] = [];
  const flap: Keyframe[] = [];
  for (let i = 0; i <= FRAMES; i++) {
    const t = ease(i / FRAMES) * (W + H) * 1.02;
    const c = W - t;
    const still = clip(sheet, ([x, y]) => c - (x - y));
    const peeled = clip(sheet, ([x, y]) => x - y - c);
    // reflect the peeled part across the fold: (x, y) -> (y + c, x - c)
    const back = peeled.map(([x, y]) => [y + c, x - c] as Pt);
    flat.push({ clipPath: toClipPath(still) });
    flap.push({ clipPath: toClipPath(back) });
  }
  return { flat, flap };
}

type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => ViewTransition };

/**
 * Switch the theme with a page peel. `apply` must change the theme
 * synchronously (wrap state updates in flushSync). Falls back to a plain
 * switch without the View Transitions API or with reduced motion.
 */
export function peelTheme(apply: () => void) {
  const doc = document as DocWithVT;
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  // the flap is the back of the current sheet, so it takes the current
  // theme's paper, a touch shaded by its ink
  const root = document.documentElement;
  const css = getComputedStyle(root);
  const paper = css.getPropertyValue("--brand-bg").trim() || "#fafaf7";
  const ink = css.getPropertyValue("--brand-text").trim() || "#1a1a1a";
  const flapEl = document.createElement("div");
  flapEl.className = "theme-flap";
  flapEl.style.background = `linear-gradient(135deg, color-mix(in srgb, ${paper} 94%, ${ink}), color-mix(in srgb, ${paper} 84%, ${ink}))`;

  const t = doc.startViewTransition(() => {
    apply();
    document.body.appendChild(flapEl);
  });

  t.ready
    .then(() => {
      const { flat, flap } = frames(window.innerWidth, window.innerHeight);
      const timing = { duration: DURATION, easing: "linear", fill: "both" as const };
      root.animate(flat, { ...timing, pseudoElement: "::view-transition-old(root)" });
      root.animate(flap, { ...timing, pseudoElement: "::view-transition-new(theme-flap)" });
    })
    .catch(() => {});
  t.finished.catch(() => {}).finally(() => flapEl.remove());
}
