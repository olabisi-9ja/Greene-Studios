import Image from "next/image";
import Link from "next/link";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

/* Pexels free-to-use loop (visitor's browser loads it, like the project
   images). Multiple <source>s: browser falls through if one 404s. */
const VIDEO_INK_HD = "https://videos.pexels.com/video-files/6067847/6067847-hd_1920_1080_30fps.mp4";
const VIDEO_INK_SD = "https://videos.pexels.com/video-files/6068178/6068178-sd_640_360_30fps.mp4";

const CAPABILITIES = ["WEB DESIGN", "BRANDING", "UI/UX", "MOTION", "DEVELOPMENT", "AI", "PRODUCT"];

/**
 * Inside the studio — a first glimpse of the craft, one screen below
 * the hero. This is where the motion panel, the browser mockup and the
 * identity tile live now, instead of crowding the opening statement.
 */
export default function WorkPreview() {
  return (
    <section className="bg-[var(--brand-bg)] py-20 text-[var(--brand-text)] transition-colors duration-1000 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
            <span className="text-[var(--brand-accent)]">✦</span> Inside the studio
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-right">
            Interfaces, identities &amp; motion systems, imagined, prototyped and built in-house.
          </p>
        </div>

        {/* Collage — one dominant panel, two supporting cards */}
        <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* rotating stamp — has room to breathe here */}
          <div className="pointer-events-none absolute -top-12 right-4 z-20 hidden lg:block" aria-hidden="true">
            <RotatingBadge
              text="GREENE STUDIOS ✦ WEB DESIGN ✦ BRANDING ✦ MOTION ✦ "
              className="h-28 w-28 md:h-32 md:w-32"
              centerImage="/logo.png"
            />
          </div>

          {/* Dominant: live ink study */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] shadow-[0_40px_100px_rgba(0,0,0,0.18)] lg:col-span-7">
            <div className="relative aspect-[16/11] md:aspect-[16/10]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero/team.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={VIDEO_INK_HD} type="video/mp4" />
                <source src={VIDEO_INK_SD} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[var(--brand-bg)] px-5 py-4 md:inset-x-6 md:bottom-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                    The process
                  </p>
                  <p className="mt-0.5 font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                    Ink &amp; ideas
                  </p>
                </div>
                <span className="text-xl text-[var(--brand-text)]" aria-hidden="true">✦</span>
              </div>
            </div>
          </div>

          {/* Supporting rail */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* browser mockup */}
            <div className="flex-1 overflow-hidden rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-[0_28px_70px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--brand-border)] bg-[var(--brand-surface-secondary)] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 rounded-md bg-[var(--brand-bg)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                  luminary.co
                </span>
              </div>
              <div className="space-y-3 p-6 md:p-7">
                <div className="skeleton-bar h-3.5 w-3/4 rounded-md" />
                <div className="skeleton-bar h-3.5 w-1/2 rounded-md" />
                <div className="mt-4 flex gap-2">
                  <div className="skeleton-bar h-11 w-24 rounded-lg" />
                  <div className="skeleton-bar h-11 w-16 rounded-lg" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="skeleton-bar h-16 rounded-lg" />
                  <div className="skeleton-bar h-16 rounded-lg" />
                  <div className="skeleton-bar h-16 rounded-lg" />
                </div>
              </div>
            </div>

            {/* identity tile */}
            <Link
              href="/work"
              data-cursor="VIEW"
              className="group relative flex items-center gap-5 overflow-hidden rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 pr-6 shadow-[0_28px_70px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:border-[var(--brand-accent)]/60"
            >
              <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl md:h-24 md:w-24">
                <Image src="/images/hero/branding-2.jpg" alt="Greene Studios brand identity work" fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </span>
              <span className="min-w-0">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                  Brand identity
                </span>
                <span className="block font-display text-lg font-black uppercase leading-tight tracking-tight text-[var(--brand-text)] md:text-xl">
                  Systems, not just logos
                </span>
              </span>
              <span
                className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-on-accent)]"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* capability ticker — demoted here from the hero's top strip */}
        <div className="mt-14 border-t border-[var(--brand-border)] pt-6 md:mt-20">
          <Marquee>
            <MarqueeContent speed={45} autoFill>
              {CAPABILITIES.map((cap, i) => (
                <MarqueeItem key={i} className="mx-6 flex items-center gap-6">
                  <span className="font-display text-sm font-black uppercase tracking-wide text-[var(--brand-text-secondary)] opacity-70 md:text-base">
                    {cap}
                  </span>
                  <span className="text-xs text-[var(--brand-accent)] opacity-60" aria-hidden="true">✦</span>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
