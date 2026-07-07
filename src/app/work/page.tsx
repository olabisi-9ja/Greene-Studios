import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work — Our Projects",
  description:
    "Explore Greene Studios' portfolio of websites, brands, and digital products.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
            Our Work
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight">
            Projects that
            <br />
            <span className="text-[#F7F5F2]/30">define the craft.</span>
          </h1>
          <p className="text-[#F7F5F2]/50 text-lg leading-relaxed max-w-sm">
            A curated selection of work across web design, branding, product,
            and development.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-wrap gap-3">
          {["All", "Web Design", "Branding", "Product", "Development", "Motion"].map(
            (filter) => (
              <button
                key={filter}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === "All"
                    ? "bg-[#12372A] text-[#F7F5F2]"
                    : "border border-white/10 text-[#F7F5F2]/50 hover:border-[#6B8F71]/50 hover:text-[#F7F5F2]"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className={`group block ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="relative overflow-hidden rounded-2xl card-hover">
                <div
                  className="relative"
                  style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex items-start justify-between">
                      <span className="bg-white/10 backdrop-blur border border-white/20 text-[#F7F5F2] text-xs px-4 py-2 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-[#F7F5F2]/50 text-sm font-mono">{project.year}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-black text-[#F7F5F2] mb-2 tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-[#F7F5F2]/60 text-sm mb-4 max-w-lg leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[#F7F5F2]/40 text-xs px-3 py-1 border border-white/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Experiments CTA */}
        <div className="mt-16 p-10 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl text-center">
          <h3 className="text-[#F7F5F2] text-2xl font-bold mb-3">
            Curious about how we experiment?
          </h3>
          <p className="text-[#F7F5F2]/50 text-base mb-6">
            Explore our lab of creative coding, 3D experiments, and interactive
            playgrounds.
          </p>
          <Link
            href="/experiments"
            className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold px-8 py-4 rounded-full transition-all"
          >
            View Experiments →
          </Link>
        </div>
      </div>
    </div>
  );
}
