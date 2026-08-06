import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Experiments — Greene Studios",
  description: "A playground for creative coding, webGL, and interactive concepts.",
};

const EXPERIMENTS = [
  {
    id: 1,
    title: "Liquid Distortion",
    tech: "WebGL · Three.js",
    image: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    id: 2,
    title: "Typography Physics",
    tech: "Matter.js · Canvas",
    image: "https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    id: 3,
    title: "Infinite Scroll",
    tech: "GSAP · React",
    image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    id: 4,
    title: "Particle Systems",
    tech: "WebGL · Shaders",
    image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
];

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="The lab"
        title={
          <>
            <span className="font-serif-i lowercase normal-case tracking-normal">Experiments.</span>
          </>
        }
        description="Our playground for creative coding, unconstrained by client briefs. This is where we break things to see how they work."
        right={
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            0{EXPERIMENTS.length} concepts · always iterating
          </p>
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="group relative overflow-hidden rounded-2xl border border-[var(--brand-border)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
                      {exp.tech}
                    </span>
                    <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                      {exp.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-white/60">0{exp.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
          <span className="text-[var(--brand-accent)]">✦</span> More experiments shipping soon
        </p>
      </div>
    </div>
  );
}
