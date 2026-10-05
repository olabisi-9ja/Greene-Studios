"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's "animations off" setting. Looping animations (illustrations,
 * the hero's rotating word, the logo marquee) stop when it's on. It starts
 * on for anyone whose device asks for reduced motion, and the footer switch
 * changes it (remembered per browser). Meets WCAG 2.2.2: anything that moves
 * for more than five seconds can be paused.
 */
const KEY = "greene-motion";
const EVENT = "greene-motion";

function read(): boolean {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "off") return true;
    if (saved === "on") return false;
  } catch {
    /* storage blocked: fall back to the device setting */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setMotionOff(off: boolean) {
  try {
    localStorage.setItem(KEY, off ? "off" : "on");
  } catch {
    /* applies for this page view only */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(EVENT, cb);
  mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    mq.removeEventListener("change", cb);
  };
}

/** True when looping animations should stay still. False during server render. */
export function useMotionOff(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}
