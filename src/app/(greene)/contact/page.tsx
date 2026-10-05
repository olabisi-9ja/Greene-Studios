import type { Metadata } from "next";
import { Suspense } from "react";
import { BRAND } from "@/lib/data";
import ProjectIntake from "@/components/contact/ProjectIntake";
import BrandLottie from "@/components/brand/BrandLottie";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Greene Studios what you need: four quick questions, then we reply by email.",
  alternates: { canonical: "/contact" },
};

const SOCIALS = [
  { label: "Instagram", href: BRAND.instagram },
  { label: "X", href: BRAND.twitter },
  { label: "LinkedIn", href: BRAND.linkedin },
];

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-16 text-center sm:px-8">
        <div className="pointer-events-none mb-6 w-[min(200px,50vw)]">
          <BrandLottie name="contact" className="aspect-square w-full" />
        </div>
        <h1 className="max-w-[12ch] text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Start a project
        </h1>
        <p className="mt-5 text-lg text-[var(--brand-text-secondary)]">Four quick questions. We reply within hours, and always within one working day.</p>
      </div>

      <section className="bg-[#141414] px-5 py-20 text-white [--logo:#5fbf8a] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={null}>
            <ProjectIntake />
          </Suspense>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline justify-between gap-6 px-5 py-16 sm:px-8">
        <a href={`mailto:${BRAND.email}`} className="text-xl font-semibold underline decoration-[var(--logo)] decoration-2 underline-offset-[6px]">
          {BRAND.email}
        </a>
        <ul className="m-0 flex list-none gap-8 p-0">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--logo)]">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
