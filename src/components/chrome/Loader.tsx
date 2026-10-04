"use client";

import { useEffect, useState } from "react";
import Runner from "@/components/brand/Runner";

const SEEN = "greene:loaded";

/**
 * Window-load screen: the wordmark, the runner running between the lines,
 * and "Studios" at a third of the wordmark's size. Holds until the window
 * has loaded (and at least ~1.1s, so it reads as intentional), then lifts.
 * Plays once per browser session.
 */
export default function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {
      /* storage blocked: just play it */
    }
    if (seen) {
      setPhase("gone");
      return;
    }

    const started = performance.now();
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const finish = () => {
      const wait = Math.max(0, 1100 - (performance.now() - started));
      t1 = setTimeout(() => {
        setPhase("leave");
        try {
          sessionStorage.setItem(SEEN, "1");
        } catch {
          /* ignore */
        }
        t2 = setTimeout(() => setPhase("gone"), 750);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Never trap the visitor behind a stalled asset.
    const failsafe = setTimeout(finish, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(failsafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("is-loading", phase === "show" && !root.classList.contains("loader-seen"));
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      data-loader
      aria-label="Loading Greene Studios"
      className={`fixed inset-0 z-[200] grid place-items-center bg-[var(--brand-bg)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
        phase === "leave" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-[opacity,transform] duration-300 ${
          phase === "leave" ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <span className="wordmark text-[clamp(3.5rem,11vw,7.5rem)]">Greene</span>
        <Runner mode="loop" className="my-3 h-[clamp(5rem,14vw,8.5rem)] w-auto text-[var(--logo)]" title="" />
        <span className="wordmark text-[clamp(1.17rem,3.67vw,2.5rem)] tracking-[0.02em]">Studios</span>
      </div>
    </div>
  );
}
