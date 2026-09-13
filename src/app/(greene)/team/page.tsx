import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Team · Greene Studios",
  description: "The people behind Greene Studios. Remote, senior, focused on craft.",
};

const TEAM = [
  {
    name: "Olabisi Adigun",
    role: "Founder, Creative Director",
    bio: "Leads brand and product direction. Obsessed with systems that make good work repeatable.",
    image: null as string | null,
  },
  {
    name: "Team Member",
    role: "Role title",
    bio: "Short bio will go here. This card is a placeholder you can replace with your team details.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role title",
    bio: "Short bio will go here. This card is a placeholder you can replace with your team details.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role title",
    bio: "Short bio will go here. This card is a placeholder you can replace with your team details.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role title",
    bio: "Short bio will go here. This card is a placeholder you can replace with your team details.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Role title",
    bio: "Short bio will go here. This card is a placeholder you can replace with your team details.",
    image: null,
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <PageHeader
        kicker="Team"
        title={<>Meet the team</>}
        description="Small senior team, no layers. The people who research, design and build your project are the ones you talk to."
      />

      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] transition-colors duration-300 hover:border-[var(--brand-text)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--brand-surface-secondary)]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-center">
                    <div>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-accent)] text-xl font-black text-[var(--brand-on-accent)]">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-text-secondary)]">
                        Photo coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-black uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                  {member.bio}
                </p>
                {i === 0 ? (
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://olabisiadigun.xyz/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[var(--brand-text)] underline underline-offset-4"
                    >
                      Portfolio
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 card text-center md:p-14">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
            Want to join us?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
            We are a small team that prefers to stay small and senior. If you care about craft, check open roles or send your work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-text)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-bg)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
            >
              View open roles <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <a
              href="mailto:hello@greenestudios.com"
              className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] transition-colors hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
