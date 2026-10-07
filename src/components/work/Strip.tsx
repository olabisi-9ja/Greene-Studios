"use client";

import { useEffect, useRef, useState } from "react";
import Pic, { ratioOf } from "@/components/ui/Pic";

/**
 * A project's pictures in a sideways row: swipe or trackpad, or the two
 * arrows (which step one picture at a time and grey out at either end).
 * A picture too wide for the screen becomes a panorama, the way Instagram
 * does it: cut into slides that sit flush, so the arrow (or a swipe) brings
 * in the rest of the same picture. Picture shapes come from lib/image-dims,
 * so the row is laid out before anything loads.
 */
export default function Strip({
  images,
  name,
  kind,
  priority = false,
}: {
  images: string[];
  name: string;
  kind: string;
  /** the first strip on the page: its first picture loads straight away */
  priority?: boolean;
}) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length < 2);
  /** arrows only when the row is wider than the screen */
  const [scrollable, setScrollable] = useState(false);
  /** natural width / height of each picture: known up front, or once loaded */
  const [ratios, setRatios] = useState<Record<string, number>>(() =>
    Object.fromEntries(images.flatMap((src) => (ratioOf(src) ? [[src, ratioOf(src)!]] : []))),
  );
  /** visible width of the row and the picture height, for panorama maths */
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const w = el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      setBox({ w, h: Math.min(window.innerHeight * 0.62, 560) });
    };
    measure();
    // a ResizeObserver, not just window resize: the section may be skipped
    // while off screen (content-visibility) and only get a width later
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const check = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
      setScrollable(el.scrollWidth > el.clientWidth + 8);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    el.addEventListener("scroll", check, { passive: true });
    // pictures change the row's width as they load
    el.addEventListener("load", check, true);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", check);
      el.removeEventListener("load", check, true);
      window.removeEventListener("resize", check);
    };
  }, [ratios]);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    const left = el.scrollLeft;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const target =
      dir > 0
        ? items.find((li) => li.offsetLeft - pad > left + 4)
        : [...items].reverse().find((li) => li.offsetLeft - pad < left - 4);
    el.scrollTo({ left: target ? target.offsetLeft - pad : dir > 0 ? el.scrollWidth : 0, behavior: "smooth" });
  };

  const arrow = "grid size-11 place-items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] text-[var(--brand-text)] transition-[opacity,transform] hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={row}
        className="relative m-0 mt-8 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        aria-label={`${name} pictures`}
      >
        {images.map((src, i) => {
          const ratio = ratios[src];
          // how much wider than the screen the picture is at full height:
          // a little over just fits to the width, clearly wider becomes a
          // panorama of two or three slides at about full height
          const over = ratio && box.w ? (ratio * box.h) / box.w : 0;
          const fit = over > 1.04 && over < 1.6;
          const parts = over >= 1.6 ? Math.min(3, Math.round(over)) : 1;
          // slides keep the row's height; each takes an equal share of the
          // picture's width, which lands within a few percent of the screen
          const slideW = parts > 1 ? (ratio * box.h) / parts : 0;
          // the first slide is the same element whether or not the picture
          // turns into a panorama after hydration, so the picture painted
          // from the server stays on screen (and counts as the page's
          // largest paint) instead of being swapped for a new one; both ask
          // for the same size, so it isn't fetched twice
          return (
            <li key={src} className="flex shrink-0">
              {Array.from({ length: parts }, (_, k) =>
                parts > 1 ? (
                  // each slide is a window onto its share of the one picture
                  <div
                    key={k}
                    data-slide
                    role="img"
                    aria-label={k === 0 ? `${name}, part ${k + 1} of ${parts}` : `part ${k + 1} of ${parts}`}
                    className="relative snap-start overflow-hidden bg-[var(--brand-surface-secondary)] first:rounded-l-[8px] last:rounded-r-[8px]"
                    style={{ width: slideW, height: box.h }}
                  >
                    <Pic
                      src={src}
                      alt=""
                      sizes={`${Math.round((ratio ?? 1.5) * 560)}px`}
                      priority={priority && i === 0}
                      className="absolute top-0 h-full max-w-none"
                      style={{ width: slideW * parts, left: -k * slideW }}
                    />
                  </div>
                ) : (
                  <div key={k} data-slide className="snap-start">
                    <Pic
                      src={src}
                      alt={i === 0 ? `${name}, ${kind}` : ""}
                      sizes={`${Math.round((ratio ?? 1.5) * 560)}px`}
                      priority={priority && i === 0}
                      onLoad={(e) => {
                        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                        if (w && h) setRatios((r) => (r[src] ? r : { ...r, [src]: w / h }));
                      }}
                      style={fit ? { width: box.w, height: "auto" } : undefined}
                      className="h-[min(62vh,560px)] w-auto rounded-[8px] bg-[var(--brand-surface-secondary)] object-contain"
                    />
                  </div>
                ),
              )}
            </li>
          );
        })}
      </ul>
      {scrollable && (
        <div className="mx-auto mt-5 flex max-w-[1400px] justify-end gap-2 px-5 sm:px-8">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label={`Previous ${name} picture`} className={arrow}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label={`Next ${name} picture`} className={arrow}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
