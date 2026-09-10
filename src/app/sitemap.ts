import { MetadataRoute } from 'next'
import { JOURNAL_ARTICLES, SERVICES, INDUSTRIES } from '@/lib/data'
import { BRANDS } from '@/lib/brands'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://greene-studios.vercel.app'

  const projects = BRANDS.map((brand) => ({
    url: `${baseUrl}/work/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articles = JOURNAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const services = SERVICES.map((service) => ({
    url: `${baseUrl}${service.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const industries = INDUSTRIES.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const routes = [
    '',
    '/work',
    '/services',
    '/industries',
    '/lab',
    '/journal',
    '/about',
    '/contact',
    '/process',
    '/pricing',
    '/careers',
    '/experiments',
    '/resources',
    '/legal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...services, ...industries, ...projects, ...articles]
}
