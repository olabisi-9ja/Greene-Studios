import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/ui/PageIntro";
import NextPage from "@/components/home/NextPage";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Greene Studios. The people who design and build your project are the ones you talk to.",
  alternates: { canonical: "/team" },
};

/** Team: a portrait, a name, a role and a line, for each real person. */
export default function TeamPage() {
  return (
    <>
      <PageIntro
        lottie="about"
        label="Team"
        title="Who you'll work with."
        lead="No layers. The people who design and build your project are the ones you talk to."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
        <ul className="m-0 grid list-none gap-x-8 gap-y-16 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((p, i) => (
            <li key={p.name} className={i === 0 && TEAM.length === 1 ? "sm:col-span-2 lg:col-start-2 lg:col-span-1" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
                {p.image && (
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                )}
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{p.name}</h2>
              <p className="mt-1 text-[var(--brand-text-secondary)]">{p.role}</p>
              <p className="mt-4 max-w-[42ch] leading-relaxed">{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <NextPage />
    </>
  );
}
