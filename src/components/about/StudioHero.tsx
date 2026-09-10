import Image from "next/image";

/**
 * StudioHero — the About page's full-viewport opening statement.
 *
 * Inspired by adcker.school:
 *   - Massively oversized type (16–18vw) dominates the screen
 *   - A founder portrait is embedded *inside* the typographic composition,
 *     sitting inline between ✦ symbols — the image is a character, not a block
 *   - Two floating contextual labels mirror the reference's "Showreel" /
 *     "We're built for" pattern: one anchored bottom-left, one beside the image
 *   - The headline ends with a serif-italic word — a Greene brand signature
 *
 * The portrait resolves at build time in the parent page (founderPortrait()).
 * Until the file is dropped in, a typographic plate reads "GS".
 */

type Props = { portrait: string | null };

export function StudioHero({ portrait }: Props) {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--brand-bg)] px-5 pb-24 pt-28 text-center"
      aria-label="About Greene Studios"
    >
      {/* ── Floating bottom-left — "We're built for" equivalent ─────── */}
      <p className="absolute bottom-10 left-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] md:left-10">
        We&apos;re built for ambition
      </p>

      {/* ── Scroll cue ──────────────────────────────────────────────── */}
      <div className="absolute bottom-10 right-5 flex items-center gap-2 md:right-10">
        <div className="h-8 w-px overflow-hidden bg-[var(--brand-border)]">
          <div className="animate-scroll-cue h-full w-full bg-[var(--brand-accent)]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
          Scroll
        </span>
      </div>

      {/* ── Giant headline ───────────────────────────────────────────── */}
      {/*
          Font sizing: clamp keeps this readable at 375px but screen-filling
          at 1440px+. leading-[0.88] collapses the line gaps, making the
          text feel like a single typographic mass.
      */}
      <h1
        className="relative select-none font-display font-black uppercase leading-[0.88] tracking-[-0.02em] text-[var(--brand-text)]"
        style={{ fontSize: "clamp(3.8rem, 16vw, 18rem)" }}
      >
        {/* Line 1 */}
        <span className="block">The art</span>

        {/* ── Image line ────────────────────────────────────────────── */}
        {/*
            The image sits between the ✦ symbols as if it were a glyph.
            Width/height in `em` so the frame scales with the font size.
            0.64em wide × 0.86em tall ≈ 3:4 portrait ratio at every breakpoint.
        */}
        <span className="relative flex items-center justify-center gap-[0.05em]">
          <span
            className="text-[var(--brand-accent)]"
            aria-hidden="true"
          >
            ✦
          </span>

          <span
            className="relative inline-block overflow-hidden border border-[var(--brand-border)]"
            style={{
              width: "0.64em",
              height: "0.86em",
              borderRadius: "4px",
              flexShrink: 0,
            }}
          >
            {portrait ? (
              <Image
                src={portrait}
                alt="Olabisi Adigun — founder, Greene Studios"
                fill
                sizes="(max-width: 768px) 40vw, 320px"
                className="object-cover object-top"
                priority
              />
            ) : (
              /* Typographic plate until the photo is dropped in */
              <span className="absolute inset-0 flex items-end bg-[var(--brand-surface-secondary)] p-[0.06em]">
                <span
                  className="font-display font-black uppercase leading-tight text-[var(--brand-text-secondary)]"
                  style={{ fontSize: "0.14em" }}
                >
                  Olabisi
                  <br />
                  Adigun
                </span>
              </span>
            )}
          </span>

          <span
            className="text-[var(--brand-accent)]"
            aria-hidden="true"
          >
            ✦
          </span>

          {/*
              Floating label — echoes "Showreel" from the reference.
              Fixed font-size so it stays readable at any headline scale.
              Hidden on small screens where it would collide with the image.
          */}
          <span
            className="absolute hidden flex-col gap-0.5 text-left md:flex"
            style={{ left: "62%", top: "12%", pointerEvents: "none" }}
          >
            <span className="font-mono text-[clamp(0.6rem,1vw,0.875rem)] uppercase tracking-[0.18em] text-[var(--brand-text-secondary)]">
              Est. 2022
            </span>
            <span className="font-mono text-[clamp(0.55rem,0.85vw,0.75rem)] uppercase tracking-[0.15em] text-[var(--brand-accent)]">
              Lagos · Worldwide
            </span>
          </span>
        </span>

        {/* Lines 3 – 5 */}
        <span className="block">of</span>
        <span className="block">making</span>
        <span className="block">
          you{" "}
          <span className="font-serif-i normal-case tracking-normal">
            stop.
          </span>
        </span>
      </h1>
    </section>
  );
}
