import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export default function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-32 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#6B8F71]" />
              <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">
                Selected Work
              </span>
            </div>
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-black text-[#F7F5F2] leading-[0.9] tracking-tighter uppercase italic-none">
              Projects that
              <br />
              <span className="text-outline">define us.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[#6B8F71] hover:text-[#F7F5F2] text-sm font-medium transition-colors self-start lg:self-auto"
          >
            View all projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {featured.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div
                className="relative overflow-hidden rounded-2xl card-hover"
                style={{ aspectRatio: i === 0 ? "16/7" : "16/8" }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}60, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
                  <div className="flex items-start justify-between">
                    <span className="glass-panel text-[#F7F5F2] text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-[#F7F5F2]/50 text-sm">{project.year}</span>
                  </div>

                  <div>
                    <h3 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-[#F7F5F2] mb-3 tracking-tighter uppercase leading-none">
                      {project.title}
                    </h3>
                    <p className="text-[#F7F5F2]/60 text-base max-w-xl mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[#F7F5F2]/50 text-xs px-3 py-1 border border-white/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="ml-auto text-[#6B8F71] text-sm group-hover:translate-x-2 transition-transform">
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Results ticker */}
        <div className="mt-16 flex flex-wrap gap-6 justify-center">
          {featured.flatMap((p) => p.results).map((result, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/3 border border-white/8 px-4 py-2 rounded-full"
            >
              <span className="text-[#6B8F71] text-xs">✦</span>
              <span className="text-[#F7F5F2]/60 text-xs">{result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
