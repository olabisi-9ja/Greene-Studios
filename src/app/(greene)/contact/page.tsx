import type { Metadata } from "next";
import { Suspense } from "react";
import { BRAND } from "@/lib/data";
import ProjectIntake from "@/components/contact/ProjectIntake";
import BrandLottie from "@/components/brand/BrandLottie";
import SocialIcons from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Greene Studios what you need: four quick questions, then we reply by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-16 text-center sm:px-8">
        <div className="pointer-events-none mb-6 w-[min(340px,72vw)]">
          <BrandLottie name="contact" className="aspect-square w-full" />
        </div>
        <h1 className="max-w-[12ch] text-display font-semibold leading-[0.95] tracking-[-0.045em]">
          Start a project
        </h1>
        <p className="mt-5 text-base text-[var(--brand-text-secondary)]">Four quick questions. We reply within hours, and always within one working day.</p>
      </div>

      <section className="bg-[#141414] px-5 py-20 text-white [--logo:#5fbf8a] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={null}>
            <ProjectIntake />
          </Suspense>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline justify-between gap-6 px-5 py-16 sm:px-8">
        <a href={`mailto:${BRAND.email}`} className="text-title font-semibold underline decoration-[var(--logo)] decoration-2 underline-offset-[6px]">
          {BRAND.email}
        </a>
        <SocialIcons />
      </div>
    </div>
  );
}
