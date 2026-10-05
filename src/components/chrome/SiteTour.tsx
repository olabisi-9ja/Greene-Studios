"use client";

import { HUMP_PATH } from "@/components/chrome/BackToTop";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const DONE = "greene-tour-done";

type Step = {
  /** data-tour value of the element to light up; null for the back-to-top demo */
  target: string | null;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    target: "theme",
    title: "Four themes",
    body: "Tap here and the page peels away to the next one. Studio green, sun, moon and raw orange.",
  },
  {
    target: "dock",
    title: "Your way around",
    body: "Home, work and contact live down here. The dock tucks away while you scroll down and comes back when you scroll up.",
  },
  {
    target: null,
    title: "Back to the top",
    body: "At the very bottom of every page, tap this tab to go back up.",
  },
];

const PAD = 8;

/**
 * A short first-visit tour of the site's chrome: the theme switch, the dock
 * and the back-to-top tab. It lights each one up in turn with a card
 * beside it, shows once per browser, and can be skipped at any step.
 */
export default function SiteTour() {
  const [step, setStep] = useState<number | null>(null);
  const [box, setBox] = useState<DOMRect | null>(null);

  // start once the loader has gone, on a first visit only
  useEffect(() => {
    try {
      if (localStorage.getItem(DONE) === "1") return;
    } catch {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const begin = () => {
      timer = setTimeout(() => setStep(0), 1200);
    };
    const root = document.documentElement;
    if (root.classList.contains("loader-done")) begin();
    const watch = new MutationObserver(() => {
      if (root.classList.contains("loader-done")) {
        watch.disconnect();
        begin();
      }
    });
    watch.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      watch.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const finish = useCallback(() => {
    setStep(null);
    try {
      localStorage.setItem(DONE, "1");
    } catch {
      /* storage unavailable: the tour may show again, which is fine */
    }
  }, []);

  const current = step === null ? null : STEPS[step];

  // measure the lit-up element, and keep measuring while the page moves
  useLayoutEffect(() => {
    if (!current) return;
    const measure = () => {
      const el = current.target ? document.querySelector(`[data-tour="${current.target}"]`) : null;
      setBox(el ? el.getBoundingClientRect() : null);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [current]);

  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, finish]);

  if (!current || step === null) return null;
  const last = step === STEPS.length - 1;

  // the card sits below a target in the top half, above one in the bottom half
  const below = box ? box.top < window.innerHeight / 2 : false;
  const cardStyle: React.CSSProperties = box
    ? below
      ? { top: box.bottom + PAD + 14, right: Math.max(16, window.innerWidth - box.right - PAD) }
      : { bottom: window.innerHeight - box.top + PAD + 14, left: "50%", transform: "translateX(-50%)" }
    : { bottom: 120, left: "50%", transform: "translateX(-50%)" };
  // the back-to-top step: the card sits centred, clear above the demo tab
  if (!current.target) Object.assign(cardStyle, { bottom: 128, left: "50%", right: "auto", transform: "translateX(-50%)" });

  return (
    <div className="site-tour fixed inset-0 z-[400]" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      {/* the spotlight: a hole in a dim veil, around the element */}
      {box ? (
        <div
          className="site-tour-hole pointer-events-none fixed rounded-[14px]"
          style={{ top: box.top - PAD, left: box.left - PAD, width: box.width + PAD * 2, height: box.height + PAD * 2 }}
        />
      ) : (
        <div className="fixed inset-0 bg-black/55" />
      )}
      <button type="button" className="fixed inset-0 cursor-default" aria-label="Close tour" onClick={finish} />

      {/* the tab demo: the same shape as the real one, shown here because the real one is at the very bottom */}
      {!current.target && (
        <div className="site-tour-tab pointer-events-none fixed inset-x-0 bottom-0 mx-auto w-[min(800px,100%)]" aria-hidden="true">
          <svg viewBox="0 0 800 96" preserveAspectRatio="none" className="block h-[84px] w-full sm:h-[96px]">
            <path d={HUMP_PATH} className="fill-[var(--brand-text)]" />
          </svg>
          <span className="absolute inset-x-0 bottom-[22px] text-center font-semibold text-[var(--brand-bg)] sm:bottom-[26px]">Back to top</span>
        </div>
      )}

      <div
        className="site-tour-card fixed w-[min(320px,calc(100vw-32px))] rounded-[6px] bg-[var(--brand-surface)] p-5 text-[var(--brand-text)] shadow-[0_18px_50px_rgb(0_0_0/0.25)]"
        style={cardStyle}
        key={step}
      >
        <p className="text-xs font-semibold text-[var(--brand-text-secondary)]">
          {step + 1} of {STEPS.length}
        </p>
        <h2 id="tour-title" className="mt-1 text-lg font-semibold tracking-[-0.02em]">
          {current.title}
        </h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--brand-text-secondary)]">{current.body}</p>
        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={finish} className="text-sm text-[var(--brand-text-secondary)] underline-offset-4 hover:underline">
            Skip
          </button>
          <button
            type="button"
            autoFocus
            onClick={() => (last ? finish() : setStep(step + 1))}
            className="h-10 rounded-[4px] bg-[var(--brand-accent)] px-5 text-sm font-semibold text-[var(--brand-on-accent)]"
          >
            {last ? "Got it" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
