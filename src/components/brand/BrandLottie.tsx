"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { LottieHandle } from "lottie-react";
import { recolorLottie } from "@/lib/brand-lottie";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), { ssr: false });

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

/**
 * A Lottie animation from /public/lottie, recoloured into the Greene
 * palette (see lib/brand-lottie). Nothing is fetched until the slot is near
 * the screen, and it pauses while off screen. If the file isn't there it
 * shows the fallback. Reduced motion: the first frame, still.
 */
export default function BrandLottie({
  name,
  fallback = null,
  loop = true,
  className = "",
}: {
  /** File name in /public/lottie, without .json */
  name: string;
  fallback?: ReactNode;
  loop?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<LottieHandle>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<object | null>(null);
  const [missing, setMissing] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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

  // play only while on screen
  useEffect(() => {
    if (!player.current || still) return;
    if (visible) player.current.play();
    else player.current.pause();
  }, [visible, data, still]);

  if (missing) return <>{fallback}</>;
  return (
    <div ref={box} className={className} aria-hidden="true">
      {data && <Lottie lottieRef={player} src={data} loop={loop} autoplay={!still} className="brand-lottie h-full w-full" />}
    </div>
  );
}
