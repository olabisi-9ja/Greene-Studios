"use client";

import { useEffect, useRef } from "react";
import LogoRig, { type LogoRigHandle, REST } from "./LogoRig";

/**
 * The Greene runner, animated as a body (see LogoRig.tsx): feet plant and push
 * off, knees fold in the swing, hips dip on landing and lift in flight,
 * the free arm pumps against the legs, the clover hand rides the motion.
 *
 * mode="scroll": runs while the page scrolls, faster when the scroll is
 * faster, and when scrolling stops it decelerates and settles on the
 * logo's own stride (back leg pushing off, front knee driven up).
 * mode="loop": runs continuously (the loader).
 * Reduced motion: holds the logo stride.
 */
const BASE_RATE = 1.3; // strides per second at an easy scroll

export default function Runner({
  mode = "scroll",
  className = "",
  title = "Greene Studios",
}: {
  mode?: "scroll" | "loop";
  className?: string;
  title?: string;
}) {
  const fig = useRef<LogoRigHandle>(null);

  useEffect(() => {
    let phase = REST;
    const draw = () => fig.current?.pose(phase);
    draw();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let vel = mode === "loop" ? BASE_RATE : 0; // strides per second
    let lastScrollAt = -1e9;
    let lastY = window.scrollY;
    let push = 0; // scroll speed, px per frame, smoothed
    let goal: number | null = null; // the rest stride we're coasting into

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const running = mode === "loop" || now - lastScrollAt < 140;

      if (running) {
        goal = null;
        const target = mode === "loop" ? BASE_RATE : BASE_RATE + Math.min(push, 60) * 0.035;
        vel += (target - vel) * Math.min(1, dt * 6);
        phase += vel * dt;
      } else {
        // coast to the next rest stride: a critically damped spring on phase
        if (goal === null) goal = phase + ((((REST - phase) % 1) + 1) % 1);
        const k = 30;
        const acc = k * (goal - phase) - 2 * Math.sqrt(k) * vel;
        vel += acc * dt;
        phase += vel * dt;
        if (Math.abs(goal - phase) < 0.0015 && Math.abs(vel) < 0.02) {
          phase = goal;
          vel = 0;
          goal = null;
          draw();
          raf = 0;
          return;
        }
      }
      push *= 0.88;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      push = Math.max(push, Math.abs(y - lastY));
      lastY = y;
      lastScrollAt = performance.now();
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    if (mode === "loop") raf = requestAnimationFrame(tick);
    else window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode]);

  return <LogoRig ref={fig} className={className} title={title} />;
}
