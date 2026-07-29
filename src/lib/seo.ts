import {
  PRODUCT_HERO,
  PRODUCT_NAME,
  PRODUCT_SHORT,
  PRODUCT_USP,
  REPOSITORY_URL,
  STEWARD,
} from '@/lib/site';

/** Production origin — always set NEXT_PUBLIC_SITE_URL in deploy. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://open-ai-engineering-standards.vercel.app'
).replace(/\/$/, '');

export const SEO_KEYWORDS = [
  'AI Engineering Standard',
  'AIES',
  'AIDLC',
  'AI SDLC',
  'AI software development lifecycle',
  'prompt engineering standard',
  'context engineering',
  'agent engineering',
  'LLMOps',
  'AI evaluation gates',
  'Model Context Protocol',
  'MCP servers',
  'enterprise AI governance',
  'AI coding standards',
  'human in the loop AI',
  'production AI delivery',
  'vendor neutral AI',
  'AI engineering handbook',
  'AI patterns library',
  'Gaurav Mithas',
] as const;

export const DEFAULT_DESCRIPTION =
  `${PRODUCT_USP} ${PRODUCT_HERO}. Handbook for AIDLC, patterns, agents, MCP, evals, LLMOps, and enterprise SoA. Maintained by ${STEWARD.name}.`;

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    alternateName: ['AIES', 'AI Engineering Standard'],
    url: SITE_URL,
    logo: absoluteUrl('/opengraph-image'),
    description: DEFAULT_DESCRIPTION,
    sameAs: [REPOSITORY_URL, STEWARD.github, STEWARD.linkedIn],
    email: STEWARD.email,
    founder: {
      '@type': 'Person',
      name: STEWARD.name,
      jobTitle: STEWARD.title,
      worksFor: { '@type': 'Organization', name: STEWARD.org },
      url: absoluteUrl('/about'),
      email: STEWARD.email,
      sameAs: [STEWARD.linkedIn, STEWARD.github],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    alternateName: ['AIES', 'AI Engineering Standard'],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@type': 'Organization', name: PRODUCT_SHORT, url: SITE_URL },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/docs/README?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: PRODUCT_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    codeRepository: REPOSITORY_URL,
    programmingLanguage: ['TypeScript', 'Markdown'],
    runtimePlatform: 'Web',
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Person',
      name: STEWARD.name,
      url: absoluteUrl('/about'),
    },
    keywords: SEO_KEYWORDS.join(', '),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', name: PRODUCT_SHORT, url: SITE_URL },
    author: {
      '@type': 'Person',
      name: STEWARD.name,
      url: absoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: PRODUCT_SHORT,
      url: SITE_URL,
    },
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}
