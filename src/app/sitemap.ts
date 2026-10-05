import { MetadataRoute } from 'next'
import { JOURNAL_ARTICLES, SERVICES } from '@/lib/data'
import { PROJECTS } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://greene-studios.vercel.app'

  const projects = PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
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


  const routes = [
    '',
    '/work',
    '/gallery',
    '/studio',
    '/team',
    '/services',
    '/journal',
    '/contact',
    '/pricing',
    '/start',
    '/legal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...services, ...projects, ...articles]
}
