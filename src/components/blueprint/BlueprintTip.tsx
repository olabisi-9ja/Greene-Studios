"use client";

import { useEffect, useState } from "react";

const KEY = "greene-blueprint-tip";

/**
 * First visit to the Blueprint: a short how-to card, and every copyable
 * value shows a "Tap to copy" label (html.bp-new). Both go away for good
 * after "Got it" or the first copy.
 */
export default function BlueprintTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked: show it */
    }
    if (seen) return;
    const root = document.documentElement;
    root.classList.add("bp-new");
    setShow(true);
    // the first copy removes the class; follow it
    const mo = new MutationObserver(() => {
      if (!root.classList.contains("bp-new")) setShow(false);
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mo.disconnect();
      root.classList.remove("bp-new");
    };
  }, []);

  if (!show) return null;
  const done = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* fine */
    }
    document.documentElement.classList.remove("bp-new");
    setShow(false);
  };
  return (
    <div role="dialog" aria-labelledby="bp-tip-title" className="bp-tip fixed bottom-24 left-1/2 z-[60] w-[min(360px,calc(100vw-32px))] -translate-x-1/2 rounded-[12px] bg-[var(--logo)] p-5 text-[var(--brand-paper)] shadow-[0_18px_50px_rgb(0_0_0/0.3)] sm:bottom-28">
      <p id="bp-tip-title" className="font-semibold">Everything here copies</p>
      <p className="mt-2 text-sm leading-relaxed opacity-90">
        Tap any value with the copy mark: colour codes, logo files, font names and CSS. It lands on your clipboard, ready to paste into Figma, code or a print order.
      </p>
      <button type="button" onClick={done} className="mt-4 h-10 rounded-[6px] bg-[var(--brand-paper)] px-5 text-sm font-semibold text-[var(--logo)]">
        Got it
      </button>
    </div>
  );
}
