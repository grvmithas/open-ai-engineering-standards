import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'YandexBot',
          'DuckDuckBot',
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Anthropic-ai',
          'Google-Extended',
          'Cohere-ai',
          'Applebot-Extended',
          'Bytespider',
        ],
        allow: ['/', '/llms.txt', '/docs/', '/workflows/', '/portal/', '/start', '/quickstart'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
