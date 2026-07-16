import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oaies.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OAIES — Open AI Engineering Standard',
    template: '%s | OAIES',
  },
  description:
    'The production-ready, enterprise-grade AI Engineering Standard. Covers prompt engineering, context engineering, agent engineering, LLMOps, AI SDLC, and enterprise AI governance.',
  keywords: [
    'AI Engineering', 'Prompt Engineering', 'Context Engineering', 'Agent Engineering',
    'LLMOps', 'PromptOps', 'AI SDLC', 'Enterprise AI', 'Multi-Agent Systems',
    'RAG', 'LLM', 'Claude', 'GPT', 'Gemini', 'MCP', 'AI Architecture',
    'AI Governance', 'AI Standards', 'OAIES',
  ],
  authors: [{ name: 'OAIES Contributors' }],
  creator: 'OAIES',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'OAIES — Open AI Engineering Standard',
    description: 'The production-ready, enterprise-grade AI Engineering Standard. The "create-react-app" equivalent for AI Engineering.',
    siteName: 'OAIES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OAIES — Open AI Engineering Standard',
    description: 'The production-ready, enterprise-grade AI Engineering Standard.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'OAIES — Open AI Engineering Standard',
              description: 'The production-ready, enterprise-grade AI Engineering Standard',
              url: siteUrl,
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
