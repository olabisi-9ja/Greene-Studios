"use client";

import {
  SiFigma, SiFramer, SiWebflow, SiBlender, SiLottiefiles, SiNotion, SiLinear, SiGreensock, SiThreedotjs, SiSanity, SiShopify,
  SiNextdotjs, SiReact, SiExpo, SiTypescript, SiTailwindcss, SiNodedotjs, SiSupabase, SiPostgresql, SiVercel, SiFirebase, SiStripe, SiGithub, SiSwift, SiKotlin,
} from "react-icons/si";
import type { IconType } from "react-icons";
import LogoLoop, { type LogoItem } from "@/components/effects/LogoLoop";

/**
 * Tool: icon, name (screen readers only) and brand colour. A null colour
 * means a black or white mark, which takes the page's text colour instead.
 */
type Tool = [IconType, string, string | null];

/** Design and motion tools on the top row, the build stack underneath. */
const DESIGN: Tool[] = [
  [SiFigma, "Figma", "#F24E1E"], [SiFramer, "Framer", "#0055FF"], [SiWebflow, "Webflow", "#146EF5"], [SiBlender, "Blender", "#E87D0D"],
  [SiLottiefiles, "LottieFiles", "#00DDB3"], [SiGreensock, "GSAP", "#88CE02"], [SiThreedotjs, "Three.js", null], [SiNotion, "Notion", null],
  [SiLinear, "Linear", "#5E6AD2"], [SiSanity, "Sanity", "#F03E2F"], [SiShopify, "Shopify", "#7AB55C"],
];
const BUILD: Tool[] = [
  [SiNextdotjs, "Next.js", null], [SiReact, "React", "#61DAFB"], [SiExpo, "Expo", null], [SiTypescript, "TypeScript", "#3178C6"],
  [SiTailwindcss, "Tailwind CSS", "#06B6D4"], [SiNodedotjs, "Node.js", "#5FA04E"], [SiSupabase, "Supabase", "#3FCF8E"], [SiPostgresql, "PostgreSQL", "#4169E1"],
  [SiVercel, "Vercel", null], [SiFirebase, "Firebase", "#FFCA28"], [SiStripe, "Stripe", "#635BFF"], [SiGithub, "GitHub", null],
  [SiSwift, "Swift", "#F05138"], [SiKotlin, "Kotlin", "#7F52FF"],
];

const toLogos = (list: Tool[]): LogoItem[] =>
  list.map(([Icon, name, color]) => ({ node: <Icon aria-hidden="true" style={color ? { color } : undefined} />, ariaLabel: name }));

/** Each logo sits on its own app-icon tile that lifts and tips on hover. */
const tile = (item: LogoItem, key: string) => (
  <span
    key={key}
    role="img"
    aria-label={"ariaLabel" in item ? item.ariaLabel : undefined}
    className="grid size-[72px] place-items-center rounded-[20px] bg-[var(--brand-surface)] text-[34px] text-[var(--brand-text)] shadow-[0_1px_0_var(--brand-border),0_10px_24px_-14px_rgb(0_0_0/0.35)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:rotate-[-6deg] sm:size-[84px] sm:text-[40px]"
  >
    {"node" in item ? item.node : null}
  </span>
);

/**
 * The tools we work in: two rows of logo tiles, no names, drifting in
 * opposite directions at different speeds and fading out at the edges.
 */
export default function ToolMarquee() {
  const row = { logoHeight: 84, gap: 18, fadeOut: true, fadeOutColor: "var(--brand-bg)", hoverSpeed: 8, renderItem: tile };
  return (
    <section aria-label="Tools we use" className="space-y-5 overflow-hidden py-12">
      <LogoLoop logos={toLogos(DESIGN)} direction="left" speed={34} ariaLabel="Design tools" {...row} />
      <LogoLoop logos={toLogos(BUILD)} direction="right" speed={24} ariaLabel="Build tools" {...row} />
    </section>
  );
}
