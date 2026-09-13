"use client";

import Image from "next/image";
import Link from "next/link";

export default function QuickInfoPanel() {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit lg:w-[300px] lg:shrink-0">
      <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand-accent)]">Quick info</p>
        <h3 className="mt-3 font-display text-xl font-black leading-tight tracking-tight">
          Designer / developer hybrid
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
          I design with care. No templates, no shortcuts — just custom-made, thoughtful work built and brought to life with code.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--brand-border)]">
          <Image
            src="/images/character/greene-mascot.png"
            alt="Greene mascot, flat 2D character"
            width={300}
            height={300}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="font-bold uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">Availability</p>
            <p className="mt-1 font-medium">Available worldwide</p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">Response</p>
            <p className="mt-1 font-medium">Under 24h</p>
          </div>
        </div>

        <Link
          href="/contact"
          data-cursor="HELLO"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-[var(--brand-text)] px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
        >
          Start a project →
        </Link>
      </div>

      <div className="mt-4 rounded-2xl bg-[var(--brand-text)] p-6 text-[var(--brand-bg)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">Currently</p>
        <p className="mt-2 text-sm leading-relaxed opacity-90">
          Taking on product and marketing sites for Q4. If you have a vague idea and a real deadline, we should talk.
        </p>
      </div>
    </aside>
  );
}
