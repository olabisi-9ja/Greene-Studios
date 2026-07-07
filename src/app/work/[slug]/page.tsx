import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      {/* Hero */}
      <div
        className="relative min-h-[70vh] flex items-end pb-20"
      >
        <Image 
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/60 to-black/20" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}50, transparent)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40">
          <Link href="/work" className="inline-flex items-center gap-2 text-[#F7F5F2]/50 hover:text-[#F7F5F2] text-sm mb-8 transition-colors">
            ← Back to Work
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#12372A] text-[#6B8F71] text-xs font-semibold px-4 py-2 rounded-full">
              {project.category}
            </span>
            <span className="text-[#F7F5F2]/40 text-sm">{project.year}</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-[#F7F5F2]/70 text-xl max-w-2xl leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/* Case Study Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">Overview</h2>
              <p className="text-[#F7F5F2]/60 text-lg leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* The Challenge */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">The Challenge</h2>
              <div className="p-8 bg-[#12372A]/15 border border-[#12372A]/30 rounded-2xl">
                <p className="text-[#F7F5F2]/70 text-base leading-relaxed">
                  {project.challenge || "A unique challenge in the intersection of design and technology."}
                </p>
              </div>
            </section>

            {/* Goals */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">Goals</h2>
              <div className="space-y-4">
                {(project.goals || []).map((goal: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-[#6B8F71] font-mono text-sm mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[#F7F5F2]/70 text-base leading-relaxed">{goal}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Design Approach */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">Design Approach</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(project.approach || []).map((item: any, i: number) => (
                  <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-[#6B8F71] mb-3" />
                    <p className="text-[#F7F5F2]/90 text-sm font-semibold mb-1">{item.title}</p>
                    <p className="text-[#F7F5F2]/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.results.map((result, i) => (
                  <div key={i} className="p-6 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl text-center">
                    <p className="text-[#6B8F71] text-sm font-medium leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Lessons Learned */}
            <section>
              <h2 className="text-3xl font-black text-[#F7F5F2] mb-6 tracking-tight">Lessons Learned</h2>
              <p className="text-[#F7F5F2]/60 text-lg leading-relaxed">
                {project.lessons || "Every project teaches us something new. This was no exception."}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold text-sm tracking-widest uppercase mb-6">Project Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Category", value: project.category },
                  { label: "Year", value: project.year },
                  { label: "Services", value: project.tags.join(", ") },
                  { label: "Timeline", value: "12 weeks" },
                  { label: "Status", value: "Launched" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#F7F5F2]/30 text-xs tracking-wider uppercase mb-1">{label}</p>
                    <p className="text-[#F7F5F2]/80 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold mb-3">Start Your Project</h3>
              <p className="text-[#F7F5F2]/50 text-sm mb-4 leading-relaxed">
                Ready to build something this good? Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24 pt-16 border-t border-white/5">
          <h2 className="text-3xl font-black text-[#F7F5F2] mb-10 tracking-tight">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/work/${p.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                  <Image 
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-[#6B8F71] text-xs mb-2">{p.category}</span>
                    <h3 className="text-[#F7F5F2] text-2xl font-black tracking-tight">{p.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
