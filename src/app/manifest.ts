import type { MetadataRoute } from 'next';
import { PRODUCT_NAME, PRODUCT_SHORT, PRODUCT_TAGLINE } from '@/lib/site';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    short_name: PRODUCT_SHORT,
    description: PRODUCT_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#2563eb',
    lang: 'en-US',
    categories: ['developer', 'education', 'productivity'],
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
