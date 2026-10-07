"use client";

import { useEffect, useState } from "react";

const key = (path: string) => `greene-seen:${path}`;

/** A small "New" next to a link until the visitor has opened that page once. */
export function NewMark({ path }: { path: string }) {
  const [fresh, setFresh] = useState(false);
  useEffect(() => {
    try {
      setFresh(localStorage.getItem(key(path)) !== "1");
    } catch {
      /* storage blocked: say nothing */
    }
  }, [path]);
  if (!fresh) return null;
  return <span className="ml-2 align-middle text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--logo)]">New</span>;
}

/** Put on a page so its NewMark goes quiet once it's been seen. */
export function MarkSeen({ path }: { path: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(key(path), "1");
    } catch {
      /* fine */
    }
  }, [path]);
  return null;
}
