import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        <div className="w-full aspect-[21/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-[#FAFAFA] border border-[#E6E6E6] relative">
          <Image 
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-24 prose prose-lg prose-neutral">
        {article.content?.map((block: any, i: number) => {
          if (block.type === "h2") {
            return <h2 key={i}>{block.text}</h2>;
          }
          if (block.type === "quote") {
            return <blockquote key={i}>{block.text}</blockquote>;
          }
          return <p key={i}>{block.text}</p>;
        })}
      </div>

      {/* Related Articles */}
      <div className="bg-[#FAFAFA] py-24 border-t border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-[#101010] mb-12 tracking-tight">Keep Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} href={`/journal/${rel.slug}`} className="group flex flex-col h-full bg-white p-6 rounded-[24px] border border-[#E6E6E6] hover:shadow-md transition-shadow">
                <div className="overflow-hidden rounded-[16px] mb-6 relative aspect-[16/9]">
                  <Image 
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
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
