import type { MetadataRoute } from 'next';
import manifest from '@/generated/content-manifest.json';
import { SITE_URL } from '@/lib/seo';

function priorityForSlug(slug: string): number {
  if (slug === 'README' || slug === 'principles' || slug === 'roadmap') return 0.95;
  if (slug.startsWith('handbook/')) return 0.9;
  if (slug.endsWith('/README')) return 0.85;
  if (slug.startsWith('patterns/') && slug.endsWith('/README')) return 0.85;
  if (slug.startsWith('standard/')) return 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const slugs = manifest.documents.map(document => document.slug).toSorted();

  const docPages: MetadataRoute.Sitemap = slugs.map(slug => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: priorityForSlug(slug),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/portal`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/docs/README`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...docPages,
  ];
}
