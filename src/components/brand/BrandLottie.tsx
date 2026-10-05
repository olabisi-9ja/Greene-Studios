"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { recolorLottie } from "@/lib/brand-lottie";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), { ssr: false });

/**
 * A Lottie animation from /public/lottie, recoloured into the Greene
 * palette (see lib/brand-lottie). If the file isn't there yet it shows the
 * fallback, so a slot can be wired before its animation is chosen.
 * Reduced motion: the first frame, still.
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
  const [data, setData] = useState<object | null>(null);
  const [missing, setMissing] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let live = true;
    fetch(`/lottie/${name}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => live && setData(recolorLottie(json)))
      .catch(() => live && setMissing(true));
    return () => {
      live = false;
    };
  }, [name]);

  if (missing) return <>{fallback}</>;
  if (!data) return <div className={className} aria-hidden="true" />;
  return <Lottie src={data} loop={loop} autoplay={!still} className={className} aria-hidden="true" />;
}
