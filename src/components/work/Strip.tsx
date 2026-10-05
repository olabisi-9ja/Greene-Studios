"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

/**
 * A project's pictures in a sideways row: swipe or trackpad, or the two
 * arrows (which step one picture at a time and grey out at either end).
 * A picture too wide for the screen becomes a panorama, the way Instagram
 * does it: cut into slides that sit flush, so the arrow (or a swipe) brings
 * in the rest of the same picture.
 */
export default function Strip({ images, name, kind }: { images: string[]; name: string; kind: string }) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length < 2);
  /** arrows only when the row is wider than the screen */
  const [scrollable, setScrollable] = useState(false);
  /** natural width / height of each picture, once loaded */
  const [ratios, setRatios] = useState<Record<string, number>>({});
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
    // pictures that finished loading before hydration never fire onLoad
    const ready: Record<string, number> = {};
    el.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth) ready[img.getAttribute("src") ?? ""] = img.naturalWidth / img.naturalHeight;
    });
    if (Object.keys(ready).length) setRatios((r) => ({ ...ready, ...r }));
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
    el.addEventListener("scroll", check, { passive: true });
    // pictures change the row's width as they load
    el.addEventListener("load", check, true);
    window.addEventListener("resize", check);
    return () => {
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
          if (parts > 1) {
            // slides keep the row's height; each takes an equal share of the
            // picture's width, which lands within a few percent of the screen
            const slideW = (ratio * box.h) / parts;
            return (
              <li key={src} className="flex shrink-0" aria-label={i === 0 ? `${name}, ${kind}` : undefined}>
                {Array.from({ length: parts }, (_, k) => (
                  <div
                    key={k}
                    data-slide
                    role="img"
                    aria-label={k === 0 ? `${name}, part ${k + 1} of ${parts}` : `part ${k + 1} of ${parts}`}
                    className="snap-start bg-[var(--brand-surface-secondary)] bg-no-repeat first:rounded-l-[8px] last:rounded-r-[8px]"
                    style={{
                      width: slideW,
                      height: box.h,
                      backgroundImage: `url(${src})`,
                      backgroundSize: `${parts * 100}% 100%`,
                      backgroundPosition: `${(k / (parts - 1)) * 100}% 0`,
                    }}
                  />
                ))}
              </li>
            );
          }
          return (
            <li key={src} data-slide className="shrink-0 snap-start">
              <img
                src={src}
                alt={i === 0 ? `${name}, ${kind}` : ""}
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                  if (w && h) setRatios((r) => (r[src] ? r : { ...r, [src]: w / h }));
                }}
                style={fit ? { width: box.w, height: "auto" } : undefined}
                className="h-[min(62vh,560px)] w-auto rounded-[8px] bg-[var(--brand-surface-secondary)] object-cover"
              />
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
