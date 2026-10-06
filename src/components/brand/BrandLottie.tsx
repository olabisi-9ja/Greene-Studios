"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AnimationItem } from "lottie-web";
import { recolorLottie } from "@/lib/brand-lottie";
import { useMotionOff } from "@/lib/motion-pref";

// lottie-web's light build: the SVG renderer only, no expression engine (the
// recolour strips expressions anyway), about half the full player. Fetching
// starts as soon as this module runs (during hydration), not when the first
// animation asks for it.
type Player = typeof import("lottie-web/build/player/lottie_light").default;
let player: Promise<Player> | null = null;
const getPlayer = () => (player ??= import("lottie-web/build/player/lottie_light").then((m) => m.default));
if (typeof window !== "undefined") getPlayer();

/** Parsed and recoloured files, shared by every slot that uses them. */
const cache = new Map<string, Promise<object>>();
function load(name: string) {
  let p = cache.get(name);
  if (!p) {
    p = fetch(`/lottie/${name}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => recolorLottie(json));
    p.catch(() => cache.delete(name));
    cache.set(name, p);
  }
  return p;
}

/** Fetch and prepare an animation ahead of time (the loader waits on the hero's). */
export function preloadLottie(name: string) {
  return load(name);
}

/**
 * A Lottie animation from /public/lottie, recoloured into the Greene
 * palette (see lib/brand-lottie). Nothing is fetched until the slot is near
 * the screen, and it pauses while off screen or when `paused`. With
 * animations switched off (footer setting, or reduced motion) it shows the
 * first frame, still. If the file isn't there it shows the fallback.
 */
export default function BrandLottie({
  name,
  fallback = null,
  loop = true,
  paused = false,
  eager = false,
  className = "",
}: {
  /** File name in /public/lottie, without .json */
  name: string;
  fallback?: ReactNode;
  loop?: boolean;
  /** hold still even when on screen (e.g. a hero picture not currently shown) */
  paused?: boolean;
  /** load straight away instead of waiting until it's near the screen (the hero) */
  eager?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const handle = useRef<AnimationItem | null>(null);
  const [near, setNear] = useState(eager);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<object | null>(null);
  const [missing, setMissing] = useState(false);
  const still = useMotionOff();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let live = true;
    load(name)
      .then((json) => live && setData(structuredClone(json)))
      .catch(() => live && setMissing(true));
    return () => {
      live = false;
    };
  }, [name, near]);

  // mount the player once the data is in
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = holder.current;
    if (!data || !el) return;
    let anim: AnimationItem | null = null;
    let live = true;
    getPlayer().then((lottie) => {
      if (!live) return;
      anim = lottie.loadAnimation({ container: el, renderer: "svg", loop, autoplay: false, animationData: data });
      handle.current = anim;
      setReady(true);
    });
    return () => {
      live = false;
      anim?.destroy();
      handle.current = null;
      setReady(false);
    };
  }, [data, loop]);

  // play only while on screen, not paused, and with animations on;
  // switching animations off returns it to its first frame
  useEffect(() => {
    const p = handle.current;
    if (!p) return;
    if (still) p.goToAndStop(0, true);
    else if (visible && !paused) p.play();
    else p.pause();
  }, [visible, paused, ready, still]);

  if (missing) return <>{fallback}</>;
  return (
    <div ref={box} className={className} aria-hidden="true">
      <div ref={holder} className="brand-lottie h-full w-full" />
    </div>
  );
}
