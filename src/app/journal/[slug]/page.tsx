import type { Metadata } from "next";
import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — Journal`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) notFound();

  // Related articles (random 2 or next 2)
  const relatedArticles = JOURNAL_ARTICLES.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-12">
        <Link href="/journal" className="inline-flex items-center gap-2 text-[#757575] hover:text-[#101010] text-sm mb-12 transition-colors">
          ← Back to Journal
        </Link>
        <div className="flex items-center gap-4 text-sm text-[#757575] mb-8">
          <span className="bg-[#FAFAFA] border border-[#E6E6E6] px-4 py-1.5 rounded-full font-medium text-[#101010]">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#101010] leading-[1.1] tracking-tight mb-8">
          {article.title}
        </h1>
        <p className="text-[#757575] text-xl leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full aspect-[21/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-[#FAFAFA] border border-[#E6E6E6]">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
          />
        </div>
      </div>

      {/* Content Body (Mocked since we only have excerpt in data.ts) */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-24 prose prose-lg prose-neutral">
        <p>
          We often hear about the intersection of design and technology, but the real magic happens when we introduce human psychology into the mix. This article explores how our team approaches these challenges.
        </p>
        <h2>The Foundation</h2>
        <p>
          Before diving into pixels, we need to understand the people who will be interacting with our product. Research isn't just a checkbox; it's the compass that guides every subsequent decision. When we skip this step, we're essentially designing in the dark.
        </p>
        <blockquote>
          "Good design is actually a lot harder to notice than poor design, in part because good design fits our needs so well that the design is invisible."
        </blockquote>
        <p>
          As we moved through the strategy phase, it became clear that the standard patterns weren't going to cut it. We needed a fresh approach that felt both familiar and revolutionary. 
        </p>
        <h2>Executing the Vision</h2>
        <p>
          Implementation is where strategy meets reality. We focus heavily on performance, accessibility, and delightful micro-interactions. The difference between a good product and a great one often lies in the details that most people don't consciously notice, but unconsciously feel.
        </p>
        <p>
          In conclusion, the work we do is never truly finished. It evolves as users interact with it, as business needs change, and as technology advances. Embracing this continuous evolution is key to long-term success.
        </p>
      </div>

      {/* Related Articles */}
      <div className="bg-[#FAFAFA] py-24 border-t border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-[#101010] mb-12 tracking-tight">Keep Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} href={`/journal/${rel.slug}`} className="group flex flex-col h-full bg-white p-6 rounded-[24px] border border-[#E6E6E6] hover:shadow-md transition-shadow">
                <div className="overflow-hidden rounded-[16px] mb-6">
                  <div 
                    className="w-full aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${rel.image})` }}
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-[#757575] mb-3">
                    <span className="font-medium text-[#BFA36A] uppercase tracking-wider">{rel.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#101010] mb-3 leading-snug group-hover:text-[#BFA36A] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-[#757575] text-sm leading-relaxed mb-6 flex-grow">
                    {rel.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
