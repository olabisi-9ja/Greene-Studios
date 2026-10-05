"use client";

import {
  SiFigma, SiFramer, SiWebflow, SiBlender, SiLottiefiles, SiNotion, SiLinear, SiGreensock, SiThreedotjs, SiSanity, SiShopify,
  SiNextdotjs, SiReact, SiExpo, SiTypescript, SiTailwindcss, SiNodedotjs, SiSupabase, SiPostgresql, SiVercel, SiFirebase, SiStripe, SiGithub, SiSwift, SiKotlin,
} from "react-icons/si";
import type { IconType } from "react-icons";
import LogoLoop from "@/components/effects/LogoLoop";

/** Design and motion tools on the top row, the build stack underneath. */
const DESIGN: [IconType, string][] = [
  [SiFigma, "Figma"], [SiFramer, "Framer"], [SiWebflow, "Webflow"], [SiBlender, "Blender"], [SiLottiefiles, "LottieFiles"],
  [SiGreensock, "GSAP"], [SiThreedotjs, "Three.js"], [SiNotion, "Notion"], [SiLinear, "Linear"], [SiSanity, "Sanity"], [SiShopify, "Shopify"],
];
const BUILD: [IconType, string][] = [
  [SiNextdotjs, "Next.js"], [SiReact, "React"], [SiExpo, "Expo"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"],
  [SiNodedotjs, "Node.js"], [SiSupabase, "Supabase"], [SiPostgresql, "PostgreSQL"], [SiVercel, "Vercel"], [SiFirebase, "Firebase"],
  [SiStripe, "Stripe"], [SiGithub, "GitHub"], [SiSwift, "Swift"], [SiKotlin, "Kotlin"],
];

const toLogos = (list: [IconType, string][]) =>
  list.map(([Icon, name]) => ({ node: <Icon aria-hidden="true" />, ariaLabel: name }));

/**
 * The tools we work in: two rows of logos, no names, drifting in opposite
 * directions and fading out at the edges.
 */
export default function ToolMarquee() {
  const row = {
    speed: 36,
    logoHeight: 30,
    gap: 56,
    fadeOut: true,
    fadeOutColor: "var(--brand-bg)",
    scaleOnHover: true,
  };
  return (
    <section aria-label="Tools we use" className="space-y-8 py-10 text-[var(--brand-text-secondary)] sm:space-y-10">
      <LogoLoop logos={toLogos(DESIGN)} direction="left" ariaLabel="Design tools" {...row} />
      <LogoLoop logos={toLogos(BUILD)} direction="right" ariaLabel="Build tools" {...row} />
    </section>
  );
}
