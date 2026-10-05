import type { ReactNode } from "react";
import BrandLottie from "@/components/brand/BrandLottie";

/**
 * The opening of an inner page, centred like the home hero: an animation,
 * a small label, the title and one line under it.
 */
export default function PageIntro({
  lottie,
  label,
  title,
  lead,
}: {
  /** a /public/lottie animation */
  lottie?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-40">
      {lottie && (
        <div className="pointer-events-none mb-6 w-[min(240px,60vw)]">
          <BrandLottie name={lottie} className="aspect-square w-full" />
        </div>
      )}
      <p className="font-mono text-sm text-[var(--brand-text-secondary)]">{label}</p>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{title}</h1>
      {lead && <p className="mt-6 max-w-[52ch] text-lg text-[var(--brand-text-secondary)]">{lead}</p>}
    </header>
  );
}
