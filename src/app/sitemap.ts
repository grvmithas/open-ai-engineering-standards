import type { MetadataRoute } from 'next';
import manifest from '@/generated/content-manifest.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oaies.dev';
  const slugs = manifest.documents.map(document => document.slug).toSorted();

  const docPages = slugs.map(slug => ({
    url: `${baseUrl}/docs/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: slug === 'README' ? 1 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portal`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...docPages,
  ];
}
