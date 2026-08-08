import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Analytics from '@/components/Analytics';
import CommandPalette from '@/components/CommandPalette';
import { UserProfileProvider } from '@/components/providers/UserProfileProvider';
import {
  PRODUCT_NAME,
  PRODUCT_SHORT,
  PRODUCT_TAGLINE,
  STEWARD,
} from '@/lib/site';
import {
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  SITE_URL,
  organizationJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PRODUCT_SHORT} — ${PRODUCT_NAME} | AIDLC, Prompts, Agents, MCP, Evals`,
    template: `%s | ${PRODUCT_SHORT}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: PRODUCT_SHORT,
  authors: [{ name: STEWARD.name, url: `${SITE_URL}/about` }],
  creator: STEWARD.name,
  publisher: PRODUCT_SHORT,
  category: 'Technology',
  keywords: [...SEO_KEYWORDS],
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      en: SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    title: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    description: PRODUCT_TAGLINE,
    creator: '@grvmithas',
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
};

import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd(), softwareJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM index" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" title="Sitemap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <ThemeProvider>
          <UserProfileProvider>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <CommandPalette />
            {children}
            <Analytics />
          </UserProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
