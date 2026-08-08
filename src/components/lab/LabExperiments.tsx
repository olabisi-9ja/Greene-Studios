"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Shared card shell ───────────────────────────────────────────────────── */

function LabCard({
  index,
  title,
  tech,
  status,
  children,
  className,
}: {
  index: number;
  title: string;
  tech: string;
  status: "LIVE" | "SOON";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] transition-colors duration-500",
        className
      )}
    >
      {/* demo stage */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] md:h-64">
        {children}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div>
          <p className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
            {title}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-text-secondary)]">
            {tech}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]",
            status === "LIVE"
              ? "bg-[var(--brand-accent)] text-[var(--brand-on-accent)]"
              : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)]"
          )}
        >
          {status}
        </span>
      </div>

      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
        style={{ background: "var(--brand-accent)" }}
      />
    </div>
  );
}

/* ─── Demo: cursor follow ─────────────────────────────────────────────────── */

function CursorDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const x = useSpring(mx, { damping: 24, stiffness: 300, mass: 0.4 });
  const y = useSpring(my, { damping: 24, stiffness: 300, mass: 0.4 });

  return (
    <div
      ref={ref}
      className="relative h-full w-full"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-4xl font-black uppercase tracking-tight text-[var(--brand-text)]/15">
        Move me
      </span>
      <motion.div
        className="pointer-events-none absolute h-4 w-4 rounded-full"
        style={{
          x,
          y,
          marginLeft: -8,
          marginTop: -8,
          background: "var(--brand-accent)",
          boxShadow: "0 0 24px var(--brand-accent)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute h-9 w-9 rounded-full border"
        style={{
          x,
          y,
          marginLeft: -18,
          marginTop: -18,
          borderColor: "var(--brand-accent)",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ─── Demo: typography wobble ─────────────────────────────────────────────── */

const TYPE_WORD = "GREENE".split("");

function TypographyDemo() {
  return (
    <div className="flex select-none items-center gap-1">
      {TYPE_WORD.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-pointer font-display text-5xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-6xl"
          whileHover={{ scale: 1.35, y: -10, rotate: i % 2 === 0 ? -10 : 10, color: "var(--brand-accent)" }}
          transition={{ type: "spring", stiffness: 320, damping: 12 }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Demo: easing playground ─────────────────────────────────────────────── */

const EASINGS = [
  { name: "expo", ease: [0.16, 1, 0.3, 1] },
  { name: "quint", ease: [0.83, 0, 0.17, 1] },
  { name: "quart", ease: [0.25, 1, 0.5, 1] },
] as const;

function MotionDemo() {
  const [key, setKey] = useState(0);
  const [easing, setEasing] = useState<(typeof EASINGS)[number]>(EASINGS[0]);
  const [running, setRunning] = useState(false);

  return (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-text-secondary)]">
          {easing.name}
        </span>
        <button
          onClick={() => {
            setRunning(true);
            setKey((k) => k + 1);
            window.setTimeout(() => setRunning(false), 1400);
          }}
          className="rounded-full bg-[var(--brand-text)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
        >
          {running ? "running…" : "run it"}
        </button>
      </div>

      <div className="flex gap-2">
        {EASINGS.map((e) => (
          <button
            key={e.name}
            onClick={() => setEasing(e)}
            className={cn(
              "rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-colors",
              easing.name === e.name
                ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-on-accent)]"
                : "border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]"
            )}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="relative h-10 w-full overflow-hidden">
        <motion.div
          key={key}
          className="absolute bottom-0 h-6 w-6 rounded-full"
          style={{ background: "var(--brand-accent)" }}
          initial={{ left: "0%" }}
          animate={key > 0 ? { left: "calc(100% - 24px)" } : {}}
          transition={{ duration: 1.1, ease: easing.ease }}
        />
      </div>
    </div>
  );
}

/* ─── Demo: magnetic button ───────────────────────────────────────────────── */

function MagneticDemo() {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { damping: 18, stiffness: 220, mass: 0.4 });
  const y = useSpring(my, { damping: 18, stiffness: 220, mass: 0.4 });

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.button
        ref={ref}
        style={{ x, y }}
        className="rounded-full bg-[var(--brand-text)] px-7 py-3.5 font-display text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
      >
        Catch me
      </motion.button>
    </div>
  );
}

/* ─── Demo: coming soon ───────────────────────────────────────────────────── */

function SoonDemo({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <span className="font-display text-4xl font-black uppercase tracking-tight text-[var(--brand-text)]/15">
        GS
      </span>
      <span className="rounded-full border border-[var(--brand-border)] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
        in the lab · soon
      </span>
      <span className="hidden text-center text-xs text-[var(--brand-text-secondary)] md:block">
        {label}
      </span>
    </div>
  );
}

/* ─── Export ──────────────────────────────────────────────────────────────── */

export default function LabExperiments() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <LabCard index={1} title="Cursor experiment" tech="CSS · MOTION" status="LIVE" className="lg:col-span-1">
        <CursorDemo />
      </LabCard>
      <LabCard index={2} title="Typography experiment" tech="SPLIT-TYPE" status="LIVE">
        <TypographyDemo />
      </LabCard>
      <LabCard index={3} title="Motion experiment" tech="FRAMER-MOTION" status="LIVE">
        <MotionDemo />
      </LabCard>
      <LabCard index={4} title="Interaction experiment" tech="FRAMER-MOTION" status="LIVE">
        <MagneticDemo />
      </LabCard>
      <LabCard index={5} title="WebGL experiment" tech="THREE.JS" status="SOON">
        <SoonDemo label="Distortion planes, particles and shaders — rendering on a machine near you." />
      </LabCard>
      <LabCard index={6} title="AI experiment" tech="LLM" status="SOON">
        <SoonDemo label="Prompt-to-prototype explorations with language models." />
      </LabCard>
    </div>
  );
}
