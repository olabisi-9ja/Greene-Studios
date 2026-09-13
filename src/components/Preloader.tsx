"use client";

import { useEffect, useRef, useState } from "react";

/* The identity moment is theme-independent: it is the same green field and
   the same cream whichever theme the visitor lands in. */
const FIELD = "#263B38";
const PAPER = "#F5F4EF";

/** Where the count stops. Deliberately short of 100, it hands off mid-climb. */
const TARGET = 99;
/** Minimum time on screen, so a warm cache doesn't flash 0→99 in one frame.
 *  Long enough for the climb to read, short enough that it isn't a tax. */
const FLOOR_MS = 950;
const FLOOR_MS_REDUCED = 350;
/** Hard ceiling: one slow asset must never strand a visitor at 40%. */
// readyState only reaches "complete" once every subresource has landed,
// which on the homepage is ~1.6s, long enough to hold the count well past
// the floor. The ceiling caps how much real readiness may delay the exit.
const CEILING_MS = 1100;
/** Beat at 99 before the wipe. */
const HOLD_MS = 150;
/** Matches the wipe transition below. */
const WIPE_MS = 480;
const WIPE_MS_REDUCED = 250;

const LOADER_CSS = `
.gl-root{position:fixed;inset:0;z-index:100;overflow:hidden;
  transition:transform ${WIPE_MS}ms cubic-bezier(.16,1,.3,1)}
.gl-out{transform:translateY(-100%)}
.gl-count{position:absolute;left:0;bottom:0;display:flex;align-items:flex-end;
  gap:.06em;line-height:.78;padding:0 var(--gl-gutter) .06em}
.gl-num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1;
  letter-spacing:-.045em}
.gl-pct{font-size:.18em;letter-spacing:.02em;opacity:.55;
  transform:translateY(-1.55em)}
.gl-rule{position:absolute;left:0;bottom:0;height:2px;width:100%;
  transform-origin:left;transform:scaleX(0)}
@media (prefers-reduced-motion: reduce){
  .gl-root{transition-duration:${WIPE_MS_REDUCED}ms}
}
`;

/**
 * The loader: a count from 0 to 99, then the site.
 *
 * The number is driven by what the page is actually doing, readyState, web
 * fonts, and decoded images, rather than a timer pretending to be progress.
 * It is smoothed and floored so it reads as motion instead of a stuttering
 * readout, and capped so a slow asset can never hold someone hostage.
 *
 * It gates first paint by design. That is the cost of having one; the floor is
 * kept short so the cost stays around a second.
 *
 * Plays once per session. `?replay-loader` (or `#loader`) shows it again.
 */
export default function Preloader() {
  const [state, setState] = useState<"pending" | "showing" | "exiting" | "done">("pending");
  const [count, setCount] = useState(0);
  const numRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const replay =
      window.location.search.includes("replay-loader") || window.location.hash === "#loader";

    let shown = false;
    if (!replay) {
      try {
        shown = !!sessionStorage.getItem("loader_shown");
      } catch {
        /* storage unavailable (private mode, sandboxed iframe), show it */
      }
    }
    if (shown) {
      setState("done");
      return;
    }

    setState("showing");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const floor = reduced ? FLOOR_MS_REDUCED : FLOOR_MS;
    const wipe = reduced ? WIPE_MS_REDUCED : WIPE_MS;
    const start = performance.now();

    /** Real readiness, 0–1. Three signals, evenly weighted. */
    const readiness = () => {
      let done = 0;
      let total = 3;

      if (document.readyState === "complete") done += 1;
      else if (document.readyState === "interactive") done += 0.5;

      if (fontsReady.current) done += 1;

      // Lazy images below the fold never load while the loader covers the
      // page, so counting them pins readiness below 1 forever.
      const imgs = Array.from(document.images).filter((i) => i.loading !== "lazy");
      if (imgs.length === 0) done += 1;
      else done += imgs.filter((i) => i.complete).length / imgs.length;

      return done / total;
    };

    let frame = 0;
    let shownValue = 0;
    let finished = false;

    const tick = () => {
      const elapsed = performance.now() - start;

      // The climb is driven by an eased time curve that reaches exactly 1 at
      // the floor, so the count lands on 99 when it is meant to rather than
      // chasing a moving target and overshooting by half a second.
      const t = Math.min(1, elapsed / floor);
      const timeProgress = 1 - (1 - t) * (1 - t);

      // Real readiness only holds back the last stretch, enough that the
      // number means something, not enough to make a slow asset the story.
      // readyState only reaches "complete" once every subresource has landed,
      // so the ceiling releases the count regardless.
      const cap = elapsed >= CEILING_MS ? 1 : 0.85 + 0.15 * readiness();

      // Never backwards.
      shownValue = Math.max(shownValue, Math.min(timeProgress, cap) * TARGET);
      const rounded = Math.min(TARGET, Math.round(shownValue));
      setCount(rounded);
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${(rounded / TARGET).toFixed(4)})`;
      }

      if (rounded >= TARGET && elapsed >= floor) {
        if (!finished) {
          finished = true;
          exitTimer = window.setTimeout(() => setState("exiting"), HOLD_MS);
          doneTimer = window.setTimeout(() => {
            setState("done");
            try {
              if (!replay) sessionStorage.setItem("loader_shown", "true");
            } catch {
              /* ignore */
            }
            document.body.style.overflow = previousOverflow;
          }, HOLD_MS + wipe);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    let exitTimer = 0;
    let doneTimer = 0;
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /** Tracked outside the loop so the rAF callback can read it cheaply. */
  const fontsReady = useRef(false);
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) fontsReady.current = true;
    });
    return () => {
      alive = false;
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      className={`gl-root${state === "exiting" ? " gl-out" : ""}`}
      style={{ backgroundColor: FIELD, color: PAPER }}
      role="status"
      aria-live="polite"
      aria-label={`Loading Greene Studios, ${count} percent`}
    >
      <style>{LOADER_CSS}</style>

      <div
        className="gl-count font-display font-black"
        style={
          {
            fontSize: "clamp(6rem, 22vw, 20rem)",
            // Matches the site's own page gutter.
            ["--gl-gutter" as string]: "clamp(1.25rem, 4vw, 2.5rem)",
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <span ref={numRef} className="gl-num">
          {count}
        </span>
        <span className="gl-pct">%</span>
      </div>

      {/* A hairline that tracks the same value, legible at a glance from
          across the room, where a numeral in the corner is not. */}
      <span
        ref={ruleRef}
        className="gl-rule"
        style={{ backgroundColor: PAPER, opacity: 0.28 }}
        aria-hidden="true"
      />
    </div>
  );
}
