import { MetadataRoute } from 'next'

const baseUrl = 'https://www.destinymapai.com'

const blogPosts: { slug: string; lastmod: string }[] = [
  { slug: '2026-travel-fortune', lastmod: '2026-01-15' },
  { slug: 'travel-tips', lastmod: '2026-01-08' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...blogPosts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.lastmod),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}