import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-[#0e0e0e] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-widest uppercase font-semibold">
            Lab
          </span>
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[1.1] tracking-tight mb-8">
          Experiments.
        </h1>
        <p className="text-[#F7F5F2]/50 text-xl max-w-2xl leading-relaxed">
          Our playground for creative coding, unconstrained by client briefs. This is where we break things to see how they work.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp) => (
            <div key={exp.id} className="group relative overflow-hidden rounded-[24px] aspect-[4/3] bg-[#141414] border border-white/5 cursor-not-allowed">
              <Image 
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-[#6B8F71] text-sm font-mono mb-2">{exp.tech}</span>
                <h3 className="text-3xl font-bold text-[#F7F5F2] mb-2">{exp.title}</h3>
                <div className="inline-flex items-center gap-2 text-white/50 text-sm mt-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  Work in progress
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
        <div className="bg-[#141414] border border-white/5 rounded-[32px] p-12 lg:p-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-[#F7F5F2] mb-6 tracking-tight">
            Have a crazy idea?
          </h2>
          <p className="text-[#F7F5F2]/50 text-lg mb-8 max-w-xl mx-auto">
            We love pushing the boundaries of what's possible on the web. Let's build something that hasn't been done before.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#F7F5F2] hover:bg-[#6B8F71] hover:text-[#F7F5F2] text-[#0e0e0e] font-semibold px-10 py-5 rounded-full transition-all text-lg"
          >
            Start a Conversation →
          </Link>
        </div>
      </div>
    </div>
  );
}
