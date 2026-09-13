"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* The identity moment is theme-independent: it is the same green field and
   the same cream whichever theme the visitor lands in. */
const FIELD = "#263B38";
const PAPER = "#F5F4EF";

/** Where the count stops. Deliberately short of 100, it hands off mid-climb. */
const TARGET = 99;
const FLOOR_MS = 950;
const FLOOR_MS_REDUCED = 350;
const CEILING_MS = 1100;
const HOLD_MS = 150;
const WIPE_MS = 480;
const WIPE_MS_REDUCED = 250;

const LOADER_CSS = `
.gl-root{position:fixed;inset:0;z-index:100;overflow:hidden;
  transition:transform ${WIPE_MS}ms cubic-bezier(.16,1,.3,1)}
.gl-out{transform:translateY(-100%)}
.gl-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.9rem;padding:2rem;text-align:center}
.gl-brand-wrap{display:flex;align-items:baseline;gap:.4rem;font-size:clamp(2.6rem, 9vw, 5.6rem);line-height:.9;letter-spacing:-.04em;white-space:nowrap}
.gl-word{display:inline-flex;align-items:baseline;overflow:hidden}
.gl-letter{will-change:transform}
.gl-rest{will-change:transform,opacity}
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

export default function Preloader() {
  const [state, setState] = useState<"pending" | "showing" | "exiting" | "done">("pending");
  const [count, setCount] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const replay =
      window.location.search.includes("replay-loader") || window.location.hash === "#loader";

    let shown = false;
    if (!replay) {
      try {
        shown = !!sessionStorage.getItem("loader_shown");
      } catch {}
    }
    if (shown) {
      setState("done");
      return;
    }

    setState("showing");
    const fullTimer = window.setTimeout(() => setShowFull(true), 480);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const floor = reduced ? FLOOR_MS_REDUCED : FLOOR_MS;
    const wipe = reduced ? WIPE_MS_REDUCED : WIPE_MS;
    const start = performance.now();

    const readiness = () => {
      let done = 0;
      let total = 3;
      if (document.readyState === "complete") done += 1;
      else if (document.readyState === "interactive") done += 0.5;
      if (fontsReady.current) done += 1;
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
      const t = Math.min(1, elapsed / floor);
      const timeProgress = 1 - (1 - t) * (1 - t);
      const cap = elapsed >= CEILING_MS ? 1 : 0.85 + 0.15 * readiness();
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
            } catch {}
            document.body.style.overflow = previousOverflow;
          }, HOLD_MS + wipe);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    let exitTimer = 0;
    let doneTimer = 0;
    // Safety: force exit after 2.6s even if tick stalls (ensures loader never sticks)
    const safetyTimer = window.setTimeout(() => {
      if (!finished) {
        finished = true;
        setState("exiting");
        window.setTimeout(() => {
          setState("done");
          document.body.style.overflow = previousOverflow;
        }, wipe);
      }
    }, 2600);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      clearTimeout(fullTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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

      <div className="gl-center" aria-hidden="true">
        <div className="gl-brand-wrap font-display font-black uppercase">
          <span className="gl-word">
            <motion.span
              className="gl-letter"
              animate={{ x: showFull ? -6 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              G
            </motion.span>
            <motion.span
              className="gl-rest"
              initial={{ opacity: 0, x: 10, width: 0 }}
              animate={showFull ? { opacity: 1, x: 0, width: "auto" } : { opacity: 0, x: 10, width: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
            >
              reene
            </motion.span>
          </span>
          <span className="gl-word">
            <motion.span
              className="gl-letter"
              animate={{ x: showFull ? -6 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              S
            </motion.span>
            <motion.span
              className="gl-rest"
              initial={{ opacity: 0, x: 10, width: 0 }}
              animate={showFull ? { opacity: 1, x: 0, width: "auto" } : { opacity: 0, x: 10, width: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              tudios
            </motion.span>
          </span>
        </div>
      </div>

      <div
        className="gl-count font-display font-black"
        style={
          {
            fontSize: "clamp(1.8rem, 6.6vw, 6rem)",
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

      <span
        ref={ruleRef}
        className="gl-rule"
        style={{ backgroundColor: PAPER, opacity: 0.28 }}
        aria-hidden="true"
      />
    </div>
  );
}
