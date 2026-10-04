"use client";

import { useEffect, useId, useRef } from "react";
import { RUNNER_D, RUNNER_VIEWBOX } from "./runnerPath";

/**
 * The Greene runner, animated.
 *
 * The traced logo is one path, so the parts that move are cut out of it with
 * clip-paths and pivoted at their joints:
 *   back leg  → hip at (240, 540)     front leg → hip at (350, 505)
 *   clover arm → shoulder at (480, 375)   shadow → scales under the feet
 * The body bobs, the legs swing in opposition and the clover sways.
 *
 * mode="scroll": runs while the page is scrolling and comes to rest when it
 * stops. mode="loop": runs continuously (the loader). Reduced motion: still.
 */

// Regions in viewBox units. They must not overlap; the body is everything else.
const BACK_LEG = "M0 470L238 470L262 540L225 672L0 672Z";
const FRONT_LEG = "M338 468L693 468L693 715L470 715L470 672L330 560Z";
const ARM = "M470 0L693 0L693 430L500 430L470 380Z";
const SHADOW = "M90 672L460 672L460 715L90 715Z";
const BODY = `M0 0H693V715H0Z${BACK_LEG}${FRONT_LEG}${ARM}${SHADOW}`;

type Mode = "scroll" | "loop";

export default function Runner({
  mode = "scroll",
  className = "",
  title = "Greene Studios",
}: {
  mode?: Mode;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const bob = useRef<SVGGElement>(null);
  const back = useRef<SVGGElement>(null);
  const front = useRef<SVGGElement>(null);
  const arm = useRef<SVGGElement>(null);
  const shadow = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let phase = 0;
    let amp = mode === "loop" ? 1 : 0;
    let lastScrollAt = -1e9;
    let lastY = window.scrollY;
    let speed = 0;

    const onScroll = () => {
      const y = window.scrollY;
      speed = Math.min(Math.abs(y - lastY), 80);
      lastY = y;
      lastScrollAt = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const apply = () => {
      const s = Math.sin(phase);
      const lift = Math.abs(Math.sin(phase));
      bob.current?.setAttribute("transform", `translate(0 ${(-14 * amp * lift).toFixed(2)})`);
      back.current?.setAttribute("transform", `rotate(${(16 * amp * s).toFixed(2)} 240 540)`);
      front.current?.setAttribute("transform", `rotate(${(-13 * amp * s).toFixed(2)} 350 505)`);
      arm.current?.setAttribute("transform", `rotate(${(5 * amp * Math.sin(phase + 1.2)).toFixed(2)} 480 375)`);
      shadow.current?.setAttribute(
        "transform",
        `translate(275 694) scale(${(1 - 0.22 * amp * lift).toFixed(3)} 1) translate(-275 -694)`,
      );
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const active = mode === "loop" || now - lastScrollAt < 160;
      amp += ((active ? 1 : 0) - amp) * Math.min(1, dt * (active ? 10 : 7));
      // stride rate rises a little with scroll speed
      const rate = mode === "loop" ? 11 : 9 + Math.min(speed, 60) * 0.12;
      phase += dt * rate * (0.35 + 0.65 * amp);
      speed *= 0.9;
      apply();
      if (mode === "loop" || amp > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        amp = 0;
        apply();
        raf = 0;
      }
    };

    if (mode === "loop") raf = requestAnimationFrame(tick);
    else window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode]);

  const part = (id: string) => (
    <path d={RUNNER_D} fillRule="evenodd" clipPath={`url(#${uid}-${id})`} />
  );

  return (
    <svg viewBox={RUNNER_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      <defs>
        <clipPath id={`${uid}-body`}>
          <path d={BODY} clipRule="evenodd" />
        </clipPath>
        <clipPath id={`${uid}-back`}>
          <path d={BACK_LEG} />
        </clipPath>
        <clipPath id={`${uid}-front`}>
          <path d={FRONT_LEG} />
        </clipPath>
        <clipPath id={`${uid}-arm`}>
          <path d={ARM} />
        </clipPath>
        <clipPath id={`${uid}-shadow`}>
          <path d={SHADOW} />
        </clipPath>
      </defs>
      <g ref={shadow}>{part("shadow")}</g>
      <g ref={bob}>
        <g ref={back}>{part("back")}</g>
        <g ref={front}>{part("front")}</g>
        {part("body")}
        <g ref={arm}>{part("arm")}</g>
      </g>
    </svg>
  );
}
