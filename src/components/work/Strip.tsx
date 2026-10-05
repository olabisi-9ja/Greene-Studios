"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

/**
 * A project's pictures in a sideways row: swipe or trackpad, or the two
 * arrows (which step one picture at a time and grey out at either end).
 */
export default function Strip({ images, name, kind }: { images: string[]; name: string; kind: string }) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length < 2);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const check = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
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
        className="m-0 mt-8 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        aria-label={`${name} pictures`}
      >
        {images.map((src, i) => (
          <li key={src} className="shrink-0 snap-start">
            <img
              src={src}
              alt={i === 0 ? `${name}, ${kind}` : ""}
              loading="lazy"
              decoding="async"
              className="h-[min(62vh,560px)] w-auto rounded-[8px] bg-[var(--brand-surface-secondary)] object-cover"
            />
          </li>
        ))}
      </ul>
      {images.length > 1 && (
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
