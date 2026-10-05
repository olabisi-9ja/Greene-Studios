import type { Metadata } from "next";
import StartQuiz from "@/components/start/StartQuiz";
import BrandLottie from "@/components/brand/BrandLottie";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "Six quick questions about your business. Greene Studios recommends where to start: brand, website, product build or retainer.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <div className="px-5 pb-40 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="pointer-events-none mb-8 w-[min(180px,45vw)]">
          <BrandLottie name="start" className="aspect-square w-full" />
        </div>
        <p className="font-mono text-sm text-[var(--brand-text-secondary)]">Start here · about 2 minutes</p>
        <h1 className="mt-4 text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Let&apos;s find the right place to start.
        </h1>
        <p className="mt-5 max-w-[50ch] text-lg text-[var(--brand-text-secondary)]">
          Six questions. Instant answer. No sign-up.
        </p>
        <div className="mt-16">
          <StartQuiz />
        </div>
      </div>
    </div>
  );
}
