"use client";

import { useState } from "react";

const TIP_KEY = "greene-blueprint-tip";

/** Copy text to the clipboard, with a fallback for browsers that block the API. */
async function write(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/**
 * One copyable brand value: tap it and the exact value is on the clipboard,
 * ready to paste into Figma, code, a doc or a print order. Shows what it
 * holds (`children`, or the value itself) with a copy mark; says "Copied"
 * for a moment after. The first copy also retires the first-visit hints.
 */
export default function Copy({
  value,
  label,
  children,
  className = "",
  tone = "default",
}: {
  value: string;
  /** what is being copied, announced once it's done ("Greene Green HEX") */
  label: string;
  children?: React.ReactNode;
  className?: string;
  /** "on-color": sits on a swatch, so it takes the swatch's text colour */
  tone?: "default" | "on-color";
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`bp-copy ${tone === "on-color" ? "bp-copy-on" : ""} ${className}`}
      // no aria-label: the spoken name is "Copy" plus the visible text, so voice
      // control ("click HEX…") works; the announcement after says what was copied
      onClick={async () => {
        if (!(await write(value))) return;
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
        try {
          localStorage.setItem(TIP_KEY, "1");
        } catch {
          /* fine */
        }
        document.documentElement.classList.remove("bp-new");
      }}
    >
      <span className="sr-only">Copy </span>
      <span className="bp-copy-text">{children ?? value}</span>
      <span className="bp-copy-mark" aria-hidden="true">
        {done ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
            <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
          </svg>
        )}
      </span>
      <span className="bp-copy-hint" aria-hidden="true">
        {done ? "Copied" : "Tap to copy"}
      </span>
      <span className="sr-only" aria-live="polite">
        {done ? `Copied ${label}` : ""}
      </span>
    </button>
  );
}
