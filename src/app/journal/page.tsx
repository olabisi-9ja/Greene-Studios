import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ARTICLES, JOURNAL_CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
 title: "Journal — Insights & Perspectives",
 description: "Thoughts on design, development, strategy, and running a digital agency.",
};

export default function JournalPage() {
 const featuredArticle = JOURNAL_ARTICLES.find(a => a.featured) || JOURNAL_ARTICLES[0];
 const restArticles = JOURNAL_ARTICLES.filter(a => a.id !== featuredArticle.id);

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32 pb-24">
 {/* Header */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[#BFA36A]" />
 <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">
 Journal
 </span>
 </div>
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
 <h1 className="text-6xl lg:text-8xl font-semibold text-[#101010] leading-[1.1] tracking-tight">
 Thoughts &
 <br />
 <span className="text-[#101010]/30">perspectives.</span>
 </h1>
 <p className="text-[#757575] text-lg leading-relaxed max-w-sm">
 Insights on design systems, frontend architecture, and the business of creativity.
 </p>
 </div>
 </div>

 {/* Filter Tabs */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
 <div className="flex flex-wrap gap-3">
 {JOURNAL_CATEGORIES.map((category) => (
 <button
 key={category}
 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
 category === "All"
 ? "bg-[#101010] text-white"
 : "border border-[#E6E6E6] text-[#757575] hover:border-[#101010] hover:text-[#101010]"
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-6 lg:px-12">
 {/* Featured Article */}
 <Link href={`/journal/${featuredArticle.slug}`} className="group block mb-16">
 <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center bg-[#FAFAFA] border border-[#E6E6E6] p-4 lg:p-8 rounded-[32px] transition-all duration-300 hover:shadow-md hover:border-[#D1D1D1]">
 <div className="w-full md:w-1/2 overflow-hidden rounded-[24px] relative aspect-[4/3]">
 <Image 
 src={featuredArticle.image}
 alt={featuredArticle.title}
 fill
 priority
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
 />
 </div>
 <div className="w-full md:w-1/2 py-4 px-4 lg:px-0">
 <div className="flex items-center gap-4 text-sm text-[#757575] mb-6">
 <span className="bg-white border border-[#E6E6E6] px-3 py-1 rounded-full font-medium text-[#101010]">
 {featuredArticle.category}
 </span>
 <span>{featuredArticle.date}</span>
 <span>·</span>
 <span>{featuredArticle.readTime}</span>
 </div>
 <h2 className="text-3xl lg:text-5xl font-semibold text-[#101010] mb-6 tracking-tight leading-[1.1] group-hover:text-[#BFA36A] transition-colors">
 {featuredArticle.title}
 </h2>
 <p className="text-[#757575] text-lg leading-relaxed mb-8 max-w-lg">
 {featuredArticle.excerpt}
 </p>
 <div className="inline-flex items-center gap-2 text-[#101010] font-medium group-hover:translate-x-2 transition-transform">
 Read Article <span className="text-[#BFA36A]">→</span>
 </div>
 </div>
 </div>
 </Link>

 {/* Article Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {restArticles.map((article) => (
 <Link key={article.id} href={`/journal/${article.slug}`} className="group flex flex-col h-full">
 <div className="overflow-hidden rounded-[24px] mb-6 border border-[#E6E6E6] relative aspect-[4/3]">
 <Image 
 src={article.image}
 alt={article.title}
 fill
 sizes="(max-width: 1024px) 100vw, 33vw"
 className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
 />
 </div>
 <div className="flex flex-col flex-grow">
 <div className="flex items-center gap-3 text-xs text-[#757575] mb-4">
 <span className="font-medium text-[#BFA36A] uppercase tracking-wider">{article.category}</span>
 <span>·</span>
 <span>{article.readTime}</span>
 </div>
 <h3 className="text-2xl font-semibold text-[#101010] mb-3 leading-snug group-hover:text-[#BFA36A] transition-colors">
 {article.title}
 </h3>
 <p className="text-[#757575] leading-relaxed mb-6 flex-grow">
 {article.excerpt}
 </p>
 <div className="mt-auto text-sm font-medium text-[#101010] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
 Read Article →
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </div>
 );
}
