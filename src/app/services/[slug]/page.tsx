import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, PROJECTS, FAQS } from "@/lib/data";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.href === `/services/${slug}`);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — Services`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.href.replace("/services/", "") }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.href === `/services/${slug}`);
  if (!service) notFound();

  const relatedProjects = PROJECTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-32">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <Link href="/services" className="inline-flex items-center gap-2 text-[#F7F5F2]/40 hover:text-[#F7F5F2] text-sm mb-8 transition-colors">
          ← All Services
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <div className="text-5xl mb-6 text-[#6B8F71]">{service.icon}</div>
            <h1 className="text-6xl lg:text-7xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-[#F7F5F2]/50 text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-[#12372A]/20 border border-[#12372A]/40 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold mb-4 text-sm tracking-wide uppercase">What&apos;s Included</h3>
              <div className="space-y-3">
                {service.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3">
                    <Check size={14} className="text-[#6B8F71]" />
                    <span className="text-[#F7F5F2]/70 text-sm">{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="block w-full text-center bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold py-4 rounded-full transition-all"
            >
              Start a {service.title} Project
            </Link>
          </div>
        </div>
      </div>

      {/* What Is It */}
      <div className="bg-[#141414] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-[#F7F5F2] mb-6 tracking-tight">
                What is {service.title}?
              </h2>
              <p className="text-[#F7F5F2]/50 text-lg leading-relaxed mb-6">
                {service.whatIsIt || service.description}
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#F7F5F2] mb-6 tracking-tight">
                Who it&apos;s for
              </h2>
              <div className="space-y-3">
                {(service.whoItsFor || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-[#6B8F71] text-sm font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[#F7F5F2]/60 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-black text-[#F7F5F2] mb-12 tracking-tight text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(service.approach || []).map((item: any) => (
              <div key={item.title} className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-[#12372A] flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#6B8F71]" />
                </div>
                <h3 className="text-[#F7F5F2] font-bold text-xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[#F7F5F2]/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <div className="bg-[#141414] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-black text-[#F7F5F2] mb-12 tracking-tight">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-[#6B8F71] text-xs mb-1">{project.category}</span>
                    <h3 className="text-[#F7F5F2] text-xl font-black tracking-tight">{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-black text-[#F7F5F2] mb-12 tracking-tight text-center">
            Common Questions
          </h2>
          <div className="space-y-0">
            {FAQS.slice(0, 4).map((faq, i) => (
              <div key={i} className="py-6 border-b border-white/5">
                <h3 className="text-[#F7F5F2] font-semibold mb-3">{faq.question}</h3>
                <p className="text-[#F7F5F2]/40 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#141414] py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-black text-[#F7F5F2] mb-6 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-[#F7F5F2]/50 text-lg mb-8 leading-relaxed">
            Book a free 30-minute discovery call. We&apos;ll learn about your project,
            share our approach, and see if we&apos;re a fit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold px-10 py-5 rounded-full transition-all text-lg"
          >
            Book a Discovery Call →
          </Link>
        </div>
      </div>
    </div>
  );
}
