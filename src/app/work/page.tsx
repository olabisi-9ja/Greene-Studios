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
    <div className="min-h-screen bg-white pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#BFA36A]" />
          <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
            Our Work
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h1 className="text-6xl lg:text-8xl font-semibold text-[#101010] leading-[1.1] tracking-tight">
            Projects that
            <br />
            <span className="text-[#101010]/30">define the craft.</span>
          </h1>
          <p className="text-[#757575] text-lg leading-relaxed max-w-sm">
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
                    ? "bg-[#101010] text-white"
                    : "border border-[#E6E6E6] text-[#757575] hover:border-[#101010] hover:text-[#101010]"
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
              <div className="relative overflow-hidden rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="relative"
                  style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex items-start justify-between">
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full font-medium">
                        {project.category}
                      </span>
                      <span className="text-white/80 text-sm font-mono bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">{project.year}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-2 tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-white/80 text-sm mb-4 max-w-lg leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-white/70 text-xs px-3 py-1 border border-white/20 rounded-full backdrop-blur-sm"
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
        <div className="mt-16 p-12 bg-[#FAFAFA] border border-[#E6E6E6] rounded-[24px] text-center shadow-sm">
          <h3 className="text-[#101010] text-3xl font-semibold mb-4 tracking-tight">
            Curious about how we experiment?
          </h3>
          <p className="text-[#757575] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Explore our lab of creative coding, 3D experiments, and interactive
            playgrounds.
          </p>
          <Link
            href="/experiments"
            className="inline-flex items-center gap-3 bg-[#111111] hover:bg-[#BFA36A] text-white text-base font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(191,163,106,0.3)] hover:-translate-y-0.5"
          >
            View Experiments →
          </Link>
        </div>
      </div>
    </div>
  );
}
