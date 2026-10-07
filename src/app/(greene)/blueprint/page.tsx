import type { Metadata } from "next";
import type { ReactNode } from "react";
import Copy from "@/components/blueprint/Copy";
import BlueprintTip from "@/components/blueprint/BlueprintTip";
import { MarkSeen } from "@/components/chrome/NewMark";
import Pic from "@/components/ui/Pic";
import { RUNNER_D, RUNNER_VIEWBOX } from "@/components/brand/runnerPath";
import {
  BASICS,
  COLOURS,
  HIERARCHY,
  SOCIAL_SIZES,
  TYPEFACE,
  cmykString,
  dotPatternCss,
  hslString,
  lockupSvg,
  rgbString,
  runnerSvg,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "Blueprint",
  description: "The Greene Studios brand guide: logo, logomark, type, colour, imagery, patterns and how they come together. Every value copies.",
  alternates: { canonical: "/blueprint" },
};

const YEAR = 2026;

/** The runner, drawn in the current text colour. */
function Runner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={RUNNER_VIEWBOX} className={className} fill="currentColor" aria-hidden="true">
      <path d={RUNNER_D} fillRule="evenodd" />
    </svg>
  );
}

/** Runner and wordmark side by side: the primary logo. */
function Lockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-[0.18em] ${className}`}>
      <Runner className="h-[1.15em] w-auto" />
      <span className="font-semibold leading-[0.8] tracking-[-0.01em]">Greene</span>
    </span>
  );
}

/**
 * One page of the guide, laid out like a slide: the rule on the left third
 * (title, a short paragraph, the copyright line at the foot) and the proof on
 * the right two thirds. Stacks on phones.
 */
function Slide({ id, title, body, children }: { id: string; title: string; body: ReactNode; children: ReactNode }) {
  return (
    // every slide but the first is skipped by the browser until scrolled near (.cv-auto)
    <section id={id} className={`${id === "primary-logo" ? "" : "cv-auto "}grid scroll-mt-24 gap-8 border-t border-[var(--brand-border)] py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-20`}>
      <div className="flex flex-col md:sticky md:top-28 md:min-h-[min(60vh,520px)] md:self-start">
        <h2 className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1] tracking-[-0.04em]">{title}</h2>
        <div className="mt-5 max-w-[42ch] space-y-3 leading-relaxed text-[var(--brand-text-secondary)]">{body}</div>
        <p className="mt-8 text-xs font-light text-[var(--brand-text-secondary)] md:mt-auto md:pt-10">Copyright © {YEAR} Greene Studios</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Phase({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="pb-6 pt-24">
      <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">{title}</h2>
      <p className="mt-4 max-w-[48ch] text-lg text-[var(--brand-text-secondary)]">{lead}</p>
    </div>
  );
}

/** Logo on a ground, with its copy and download actions underneath. */
function LogoTile({ ground, ink, name, children, svg, file }: { ground: string; ink: string; name: string; children: ReactNode; svg: string; file: string }) {
  return (
    <figure className="m-0">
      <div className="grid min-h-[220px] place-items-center rounded-[10px] p-10 shadow-[inset_0_0_0_1px_var(--brand-border)]" style={{ background: ground, color: ink }}>
        {children}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-auto text-[var(--brand-text-secondary)]">{name}</span>
        <Copy value={svg} label={`${name} SVG code`}>
          SVG code
        </Copy>
        <a href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} download={file} className="bp-copy">
          <span className="bp-copy-text">Download SVG</span>
        </a>
      </figcaption>
    </figure>
  );
}

export default function BlueprintPage() {
  const green = "#0F5132";
  const studio = "#0B3D26";
  const yellow = "#FFD23F";
  const ink = "#1A1A1A";
  const paper = "#FAFAF7";

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-40 pt-32 sm:px-8 sm:pt-40">
      <MarkSeen path="/blueprint" />
      <BlueprintTip />

      <header className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <h1 className="text-[clamp(3.2rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">Blueprint</h1>
          <p className="mt-6 max-w-[40ch] text-lg text-[var(--brand-text-secondary)]">
            The Greene brand in one place. Every colour, file, font and rule here copies with one tap, so it can go straight into your work.
          </p>
        </div>
        <dl className="m-0 grid content-end gap-3 sm:grid-cols-2">
          {BASICS.map((b) => (
            <div key={b.label} className="rounded-[10px] bg-[var(--brand-surface-secondary)] p-4">
              <dt className="text-xs text-[var(--brand-text-secondary)]">{b.label}</dt>
              <dd className="m-0 mt-1">
                <Copy value={b.value} label={b.label} className="text-lg font-semibold" />
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── Core identity ───────────────────────────────────────────── */}
      <Phase title="Core identity" lead="The marks and the type: the parts that say Greene before anything else does." />

      <Slide
        id="primary-logo"
        title="Primary logo"
        body={
          <>
            <p>The primary logo is the main picture of the brand: the runner, carrying the clover pen, beside the Greene wordmark. Use it wherever there is room for both.</p>
            <p>It comes in one colour at a time: Greene Green on light grounds, Paper on dark, Clover Yellow on Studio Green.</p>
            <p>Clear space: keep at least the height of the clover clear on every side. Smallest size: 24px tall on screen, 8mm in print.</p>
          </>
        }
      >
        <div className="grid gap-6">
          <LogoTile ground={paper} ink={green} name="On light" svg={lockupSvg(green)} file="greene-logo-green.svg">
            <Lockup className="text-[clamp(2.6rem,6vw,4.4rem)]" />
          </LogoTile>
          <LogoTile ground={ink} ink={paper} name="On dark" svg={lockupSvg(paper)} file="greene-logo-paper.svg">
            <Lockup className="text-[clamp(2.6rem,6vw,4.4rem)]" />
          </LogoTile>
          <LogoTile ground={studio} ink={yellow} name="On brand colour" svg={lockupSvg(yellow)} file="greene-logo-yellow.svg">
            <Lockup className="text-[clamp(2.6rem,6vw,4.4rem)]" />
          </LogoTile>
        </div>
      </Slide>

      <Slide
        id="logomark"
        title="Logomark"
        body={
          <>
            <p>The runner on its own: a symbol that stands for the brand without needing words. Use it where space is tight or the name is already clear: app icons, avatars, favicons, stamps.</p>
          </>
        }
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { ground: paper, ink: green, name: "Green", file: "greene-runner-green.svg" },
            { ground: ink, ink: paper, name: "Paper", file: "greene-runner-paper.svg" },
            { ground: studio, ink: yellow, name: "Yellow", file: "greene-runner-yellow.svg" },
          ].map((t) => (
            <LogoTile key={t.name} ground={t.ground} ink={t.ink} name={t.name} svg={runnerSvg(t.ink)} file={t.file}>
              <Runner className="h-24 w-auto" />
            </LogoTile>
          ))}
        </div>
      </Slide>

      <Slide
        id="typeface"
        title="Primary typeface"
        body={
          <>
            <p>Montserrat is the one family for everything. It&apos;s a geometric sans with a wide weight range, from Light to Bold in a single variable file, so it carries the whole hierarchy on its own: big confident titles, easy paragraphs, crisp labels.</p>
            <p>This page is set in it.</p>
          </>
        }
      >
        <div className="rounded-[10px] bg-[var(--brand-surface-secondary)] p-6 sm:p-10">
          <p className="text-[clamp(4rem,12vw,9rem)] font-semibold leading-none tracking-[-0.05em]">Aa</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Copy value={TYPEFACE.name} label="font name" className="text-lg font-semibold" />
            <Copy value={TYPEFACE.stack} label="CSS font stack">CSS font stack</Copy>
            <Copy value={TYPEFACE.css} label="web font import">Web font import</Copy>
            <Copy value={TYPEFACE.link} label="Google Fonts link">Google Fonts link</Copy>
          </div>
          <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
            {TYPEFACE.weights.map((w) => (
              <li key={w.value} className="rounded-[8px] bg-[var(--brand-bg)] p-4">
                <p className="text-3xl" style={{ fontWeight: w.value }}>
                  Ag
                </p>
                <p className="mt-2 text-sm" style={{ fontWeight: w.value }}>
                  {w.name}
                </p>
                <Copy value={String(w.value)} label={`${w.name} weight`} className="mt-2 text-sm" />
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2 break-words text-[clamp(1.1rem,2.2vw,1.6rem)] leading-snug">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>0123456789</p>
            <p className="text-[var(--brand-text-secondary)]">! ? &amp; @ # % ( ) [ ] / : ; , . £ $ € ₦</p>
          </div>
        </div>
      </Slide>

      <Slide
        id="hierarchy"
        title="Typeface hierarchy"
        body={<p>Each level has one weight and one job. Copy a row&apos;s CSS to set text exactly as the site does.</p>}
      >
        <div className="overflow-hidden rounded-[10px] border border-[var(--brand-border)]">
          {HIERARCHY.map((h) => (
            <div key={h.level} className="grid gap-4 border-b border-[var(--brand-border)] p-5 last:border-b-0 sm:grid-cols-[9rem_1fr_auto] sm:items-center">
              <div>
                <p className="font-semibold">{h.level}</p>
                <p className="text-sm text-[var(--brand-text-secondary)]">{h.weight}</p>
              </div>
              <div className="min-w-0">
                <p className={`${h.size} truncate leading-tight`} style={{ fontWeight: h.w, letterSpacing: h.track }}>
                  {h.sample}
                </p>
                <p className="mt-1 text-sm text-[var(--brand-text-secondary)]">{h.use}</p>
              </div>
              <Copy value={h.css} label={`${h.level} CSS`}>CSS</Copy>
            </div>
          ))}
        </div>
      </Slide>

      {/* ── Visual language ─────────────────────────────────────────── */}
      <Phase title="Visual language" lead="Colour, pictures and pattern: how Greene looks once the logo has done its job." />

      <Slide
        id="colour"
        title="Colour palette"
        body={
          <>
            <p>Greene Green and Studio Green lead; Clover Yellow is the spark; Ink and Paper do the reading. Leaf Green lifts the brand on dark pages, and Raw Orange is for loud moments.</p>
            <p>Every code copies. The CMYK values are straight conversions from screen colour, so ask the printer for a proof against a swatch.</p>
          </>
        }
      >
        <div className="grid gap-4">
          {COLOURS.map((c) => (
            <div key={c.hex} className="rounded-[10px] p-6 sm:p-8" style={{ background: c.hex, color: c.on, boxShadow: "inset 0 0 0 1px var(--brand-border)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <Copy value={c.name} label="colour name" tone="on-color" className="text-2xl font-semibold tracking-[-0.03em]" />
                <p className="text-sm opacity-80">{c.role}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Copy value={c.hex} label={`${c.name} HEX`} tone="on-color">HEX {c.hex}</Copy>
                <Copy value={rgbString(c.hex)} label={`${c.name} RGB`} tone="on-color">{rgbString(c.hex).replace("rgb", "RGB ")}</Copy>
                <Copy value={cmykString(c.hex)} label={`${c.name} CMYK`} tone="on-color">{cmykString(c.hex).replace("cmyk", "CMYK ")}</Copy>
                <Copy value={hslString(c.hex)} label={`${c.name} HSL`} tone="on-color">{hslString(c.hex).replace("hsl", "HSL ")}</Copy>
                <Copy value={`var(${c.token.split(" ")[0]})`} label={`${c.name} CSS variable`} tone="on-color">{c.token}</Copy>
              </div>
            </div>
          ))}
        </div>
      </Slide>

      <Slide
        id="imagery"
        title="Brand imagery"
        body={
          <>
            <p>Greene shows real work, never stock: finished products on soft, quiet grounds, with room around them. Devices and screens are shown straight and whole, so the work can be read, never cropped into a shape or zoomed past its edges.</p>
            <p>Warm, natural light; calm neutrals; one strong colour at most. The feeling is confident and calm: made with care, ready to use.</p>
          </>
        }
      >
        <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {[
            "/images/real/aipal/01.webp",
            "/images/real/strike/04.webp",
            "/images/real/payvault/01.webp",
            "/images/real/aipal/06.webp",
            "/images/real/safe/01.webp",
            "/images/real/crypto-with-shola/01.webp",
            "/images/real/strike/03.webp",
            "/images/real/aipal/09.webp",
            "/images/real/payvault/03.webp",
          ].map((src) => (
            <figure key={src} className="m-0 break-inside-avoid">
              <Pic src={src} alt="" sizes="(min-width: 1024px) 300px, 45vw" className="block h-auto w-full rounded-[8px]" />
              <Copy value={`https://greene-studios.vercel.app${src}`} label="picture link" className="mt-2 text-xs">
                Copy link
              </Copy>
            </figure>
          ))}
        </div>
      </Slide>

      <Slide
        id="patterns"
        title="Graphic patterns"
        body={
          <>
            <p>The dot matrix comes from the globe at the foot of every page. Use it as a quiet background texture behind headlines or empty space, never behind body text, and never louder than the content on top.</p>
            <p>A fine grain sits over the whole site at a few percent; it keeps flat colour from feeling digital.</p>
          </>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { name: "On brand colour", dot: "rgba(255, 210, 63, 0.55)", ground: studio },
            { name: "On dark", dot: "rgba(95, 191, 138, 0.5)", ground: ink },
          ].map((p) => (
            <figure key={p.name} className="m-0">
              <div
                className="aspect-square rounded-[10px]"
                style={{ backgroundColor: p.ground, backgroundImage: `radial-gradient(circle, ${p.dot} 1.4px, transparent 1.7px)`, backgroundSize: "14px 14px" }}
              />
              <figcaption className="mt-3 flex items-center justify-between gap-2 text-sm">
                <span className="text-[var(--brand-text-secondary)]">{p.name}</span>
                <Copy value={dotPatternCss(p.dot, p.ground)} label={`${p.name} pattern CSS`}>CSS</Copy>
              </figcaption>
            </figure>
          ))}
        </div>
      </Slide>

      {/* ── Applications ────────────────────────────────────────────── */}
      <Phase title="Applications" lead="Everything together, out in the world: on screens, on paper and in people's hands." />

      <Slide
        id="collateral"
        title="Mockups and collateral"
        body={
          <>
            <p>The same few parts every time: the mark, Montserrat, the greens and one picture. Out of doors, keep it to one line and the logo; on things people hold, like the card, let the runner and the colour do the talking.</p>
          </>
        }
      >
        {/* billboard, set live in the brand */}
        <figure className="m-0">
          <div className="relative overflow-hidden rounded-[10px] bg-[#0B3D26] p-6 text-[#FAFAF7] shadow-[inset_0_0_0_1px_var(--brand-border)] sm:p-10">
            <div className="grid items-center gap-6 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                  We design and build <span className="text-[#FFD23F]">brands.</span>
                </p>
                <Lockup className="mt-8 text-[clamp(1.4rem,2.6vw,2rem)] text-[#FFD23F]" />
              </div>
              <Pic src="/images/real/aipal/01.webp" alt="" sizes="(min-width: 1024px) 380px, 80vw" className="block h-auto w-full rounded-[6px]" />
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-[var(--brand-text-secondary)]">Billboard</figcaption>
        </figure>

        {/* business card, front and back */}
        <figure className="m-0 mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex aspect-[85/55] flex-col justify-between rounded-[8px] bg-[#0F5132] p-6 text-[#FAFAF7] shadow-[inset_0_0_0_1px_var(--brand-border)]">
              <Runner className="h-10 w-auto self-start text-[#FFD23F]" />
              <p className="text-xl font-semibold tracking-[-0.02em]">Greene Studios</p>
            </div>
            <div className="flex aspect-[85/55] flex-col justify-between rounded-[8px] bg-[#FAFAF7] p-6 text-[#1A1A1A] shadow-[inset_0_0_0_1px_var(--brand-border)]">
              <p className="text-xs font-light">Digital Design Studio</p>
              <div className="text-sm">
                <p className="font-semibold">hello@greenestudios.com</p>
                <p className="font-light">greene-studios.vercel.app</p>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-[var(--brand-text-secondary)]">Business card, 85 × 55 mm, front and back</figcaption>
        </figure>
      </Slide>

      <Slide
        id="social"
        title="Digital and social media"
        body={
          <>
            <p>Posts pair one picture with one bold line and the mark in a corner. Banners run wide and quiet: the line on the left, the logo on the right, lots of room.</p>
            <p>Copy the sizes below when setting up a canvas.</p>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {["/images/real/greene/01.webp", "/images/real/greene/02.webp"].map((src) => (
            <Pic key={src} src={src} alt="Greene social post" sizes="(min-width: 1024px) 300px, 90vw" className="block h-auto w-full rounded-[8px]" />
          ))}
        </div>
        <p className="mt-3 text-sm text-[var(--brand-text-secondary)]">Social creatives</p>

        {/* page banners, set live */}
        <div className="mt-8 grid gap-4">
          <div className="flex aspect-[1584/396] items-center justify-between gap-6 rounded-[8px] bg-[#0B3D26] px-[5%] text-[#FAFAF7] shadow-[inset_0_0_0_1px_var(--brand-border)]">
            <p className="text-[clamp(1rem,2.6vw,2rem)] font-semibold leading-[1] tracking-[-0.035em]">
              Design and code
              <br />
              <span className="text-[#FFD23F]">under one roof.</span>
            </p>
            <Lockup className="text-[clamp(1.1rem,2.6vw,2.2rem)] text-[#FFD23F]" />
          </div>
          <p className="text-sm text-[var(--brand-text-secondary)]">LinkedIn banner</p>
          <div className="flex aspect-[1500/500] items-center justify-between gap-6 rounded-[8px] bg-[#FAFAF7] px-[5%] text-[#1A1A1A] shadow-[inset_0_0_0_1px_var(--brand-border)]">
            <p className="text-[clamp(1rem,2.8vw,2.2rem)] font-semibold leading-[1] tracking-[-0.035em]">
              We design and build
              <br />
              <span className="text-[#0F5132]">brands, websites and apps.</span>
            </p>
            <Runner className="h-[45%] w-auto text-[#0F5132]" />
          </div>
          <p className="text-sm text-[var(--brand-text-secondary)]">X (Twitter) header</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {SOCIAL_SIZES.map((s) => (
            <Copy key={s.name} value={s.size.replace(" × ", "x")} label={`${s.name} size`}>
              {s.name}: {s.size}
            </Copy>
          ))}
        </div>
      </Slide>
    </div>
  );
}
