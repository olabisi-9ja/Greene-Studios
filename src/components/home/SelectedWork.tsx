import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export default function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#BFA36A]" />
              <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
                Selected Work
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#101010] leading-[1.1] tracking-tight">
              Projects that define us.
            </h2>
          </div>
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[#101010] hover:text-[#BFA36A] text-sm font-medium transition-colors"
          >
            View all projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-24">
          {featured.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                {/* Image Container */}
                <div 
                  className={`w-full lg:w-3/5 overflow-hidden rounded-[24px] bg-[#F2F2F2] order-1 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}
                  style={{ aspectRatio: "16/10" }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                </div>

                {/* Content Container */}
                <div className={`w-full lg:w-2/5 flex flex-col justify-center order-2 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[#101010] text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border border-[#E6E6E6] bg-[#FAFAFA]">
                      {project.category}
                    </span>
                    <span className="text-[#757575] text-sm font-medium">{project.year}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-semibold text-[#101010] mb-6 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-[#757575] text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#757575] text-xs font-medium px-3 py-1.5 bg-[#FAFAFA] rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[#111111] font-medium group-hover:text-[#BFA36A] transition-colors">
                    <span className="text-sm uppercase tracking-wide">View Case Study</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
