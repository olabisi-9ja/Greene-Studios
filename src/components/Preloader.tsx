"use client";

import { useEffect, useState } from "react";

/* ─── The wordmark, with custom kerning ─────────────────────────────
   The logo is not the site font typed out: each pair is nudged so the
   lockup's rhythm becomes part of the identity. */
const GREENE = [
  { ch: "G", mr: "0.015em" },
  { ch: "R", mr: "-0.045em" },
  { ch: "E", mr: "-0.01em" },
  { ch: "E", mr: "0.005em" },
  { ch: "N", mr: "-0.055em" },
  { ch: "E", mr: "0" },
];
const STUDIOS = "STUDIOS".split("");

/* Deep Greene field — the brand's identity moment is theme-independent */
const FIELD = "#263B38";
const PAPER = "#F5F4EF";

/**
 * Cinematic window-load built around the studio's visual device: the G.
 *
 *   Act 1  ·  the outlined G appears, its aperture cut drawn as a mark
 *   Act 2  ·  S joins it — the GS monogram
 *   Act 3  ·  the full GREENE STUDIOS® lockup
 *
 * The entire show is pure CSS keyframes: it plays from first paint and
 * never depends on hydration or an animation library waking up, so the
 * panel can never sit as an empty green field. React only owns the
 * session bookkeeping, the scroll lock and the exit wipe. Add
 * ?replay-loader to the URL to watch it again any time.
 */
const LOADER_CSS = `
.gl-root{position:fixed;inset:0;z-index:100;overflow:hidden;transition:transform .9s cubic-bezier(.16,1,.3,1)}
.gl-out{transform:translateY(-100%)}
.gl-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0}
.gl-act1{animation:gl-a1 1.3s cubic-bezier(.16,1,.3,1) 0s both}
.gl-act2{animation:gl-a2 .9s cubic-bezier(.16,1,.3,1) .85s both}
.gl-act3{flex-direction:column;animation:gl-fade .55s cubic-bezier(.16,1,.3,1) 1.45s both}
.gl-tick{transform:scaleX(0);transform-origin:left;animation:gl-grow .4s cubic-bezier(.16,1,.3,1) .5s both}
.gl-s{opacity:0;display:inline-block;animation:gl-sin .4s cubic-bezier(.16,1,.3,1) 1.07s both}
.gl-l{opacity:0;display:inline-block;animation:gl-rise .55s cubic-bezier(.16,1,.3,1) both}
.gl-rule{transform:scaleX(0);transform-origin:left;animation:gl-grow .55s cubic-bezier(.16,1,.3,1) 2.3s both}
.gl-tag{opacity:0;animation:gl-tag .45s ease 2.55s both}
.gl-bar{transform:scaleX(0);transform-origin:left;animation:gl-bar 2.7s linear 0s both}
@keyframes gl-a1{0%{opacity:0;transform:translateY(16px);filter:blur(12px)}28%{opacity:1;transform:none;filter:none}78%{opacity:1}100%{opacity:0;transform:translateY(-10px);filter:blur(8px)}}
@keyframes gl-a2{0%{opacity:0;transform:translateY(14px);filter:blur(10px)}30%{opacity:1;transform:none;filter:none}75%{opacity:1}100%{opacity:0;transform:translateY(-8px);filter:blur(6px)}}
@keyframes gl-fade{from{opacity:0;transform:translateY(14px);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
@keyframes gl-rise{from{opacity:0;transform:translateY(.55em) rotate(5deg)}to{opacity:1;transform:none}}
@keyframes gl-sin{from{opacity:0;transform:translateX(.2em);filter:blur(8px)}to{opacity:.92;transform:none;filter:none}}
@keyframes gl-grow{to{transform:scaleX(1)}}
@keyframes gl-tag{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes gl-bar{to{transform:scaleX(1)}}
@media (prefers-reduced-motion: reduce){
.gl-act1,.gl-act2,.gl-bar{display:none}
.gl-act3,.gl-act3 *{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}
.gl-root{transition-duration:.3s}
}
`;

export default function Preloader() {
  const [state, setState] = useState<"pending" | "showing" | "exiting" | "done">("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const replay =
      window.location.search.includes("replay-loader") ||
      window.location.hash === "#loader";

    let shown = false;
    if (!replay) {
      try {
        shown = !!sessionStorage.getItem("loader_shown");
      } catch {
        /* storage unavailable (e.g. sandboxed iframe) — show the loader */
      }
    }
    if (shown) {
      setState("done");
      return;
    }

    setState("showing");
    document.body.style.overflow = "hidden";

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const holdMs = reduced ? 900 : 2925;

    const exitTimer = setTimeout(() => setState("exiting"), holdMs);
    const doneTimer = setTimeout(() => {
      setState("done");
      try {
        if (!replay) sessionStorage.setItem("loader_shown", "true");
      } catch {
        /* ignore — storage unavailable */
      }
      document.body.style.overflow = "";
    }, holdMs + 950);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // SSR + pre-hydration always render the loader; post-mount it may bail.
  if (state === "done") return null;

  return (
    <div
      className={`gl-root${state === "exiting" ? " gl-out" : ""}`}
      style={{ backgroundColor: FIELD }}
      role="status"
      aria-label="Greene Studios"
    >
      <style>{LOADER_CSS}</style>

      {/* quiet vignette — depth without new colours */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(10,10,10,0.35) 100%)",
        }}
      />

      {/* ── Act 1 · the G device, outlined, aperture drawn ── */}
      <div className="gl-layer gl-act1" aria-hidden="true">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/g-outline-light.svg"
            alt=""
            style={{ height: "clamp(7rem, 22vw, 15rem)", width: "auto" }}
          />
          {/* the aperture cut — the recurring brand shape */}
          <span
            className="gl-tick absolute block"
            style={{
              backgroundColor: PAPER,
              height: 3,
              width: "clamp(1rem, 3.2vw, 2.2rem)",
              right: "7%",
              top: "58%",
            }}
          />
        </div>
      </div>

      {/* ── Act 2 · the monogram: the GS ligature ── */}
      <div className="gl-layer gl-act2" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/gs-monogram-light.svg"
          alt=""
          style={{ height: "clamp(6.5rem, 19vw, 13rem)", width: "auto" }}
        />
      </div>

      {/* ── Act 3 · the full lockup ── */}
      <div className="gl-layer gl-act3 px-6">
        {/* GREENE — custom-kerned wordmark */}
        <h1
          aria-label="GREENE STUDIOS"
          className="flex overflow-hidden font-display font-black uppercase leading-none"
          style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)", color: PAPER }}
        >
          {GREENE.map(({ ch, mr }, i) => (
            <span
              key={`g${i}`}
              className="gl-l"
              style={{ marginRight: mr, animationDelay: `${1.57 + i * 0.05}s` }}
            >
              {ch}
            </span>
          ))}
        </h1>

        {/* STUDIOS® */}
        <div className="mt-3 flex items-center overflow-hidden">
          {STUDIOS.map((ch, i) => (
            <span
              key={`s${i}`}
              className="gl-l font-display font-bold uppercase"
              style={{
                fontSize: "clamp(1rem, 4vw, 2.4rem)",
                letterSpacing: "0.34em",
                color: `${PAPER}B3`,
                marginRight: i === STUDIOS.length - 1 ? "-0.34em" : 0,
                animationDelay: `${1.87 + i * 0.045}s`,
              }}
            >
              {ch}
            </span>
          ))}
          <span
            className="gl-l ml-6 align-super font-display font-black"
            style={{
              fontSize: "clamp(0.6rem, 1.6vw, 1rem)",
              color: `${PAPER}B3`,
              animationDelay: "2.3s",
            }}
          >
            ®
          </span>
        </div>

        {/* expanding rule */}
        <div
          className="gl-rule mt-8 h-[3px] w-48 rounded-full md:w-72"
          style={{ backgroundColor: PAPER }}
        />

        {/* tagline */}
        <p
          className="gl-tag mt-5 text-[10px] font-bold uppercase"
          style={{ letterSpacing: "0.45em", color: `${PAPER}8C` }}
        >
          Design that can&apos;t be ignored
        </p>
      </div>

      {/* bottom progress line */}
      <div
        className="gl-bar absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: `${PAPER}40` }}
      />
    </div>
  );
}
