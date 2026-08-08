import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllDocSlugs, getDoc } from '@/lib/docs';
import { getPrevNext } from '@/lib/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';

import Link from 'next/link';
import { PRODUCT_SHORT, REPOSITORY_URL, SITE_VERSION, STEWARD } from '@/lib/site';
import { articleJsonLd, breadcrumbJsonLd, SEO_KEYWORDS, SITE_URL } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string[] }> | { slug: string[] };
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map(slug => ({
    slug: slug.split('/'),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const doc = await getDoc(slug);

  if (!doc) return {};

  const fullUrl = `${SITE_URL}/docs/${slug}`;
  const title = doc.title;
  const description =
    doc.description ||
    `${doc.title} — ${PRODUCT_SHORT} handbook for production AI engineering.`;

  return {
    title,
    description,
    keywords: [doc.title, PRODUCT_SHORT, ...SEO_KEYWORDS.slice(0, 10)],
    authors: [{ name: STEWARD.name, url: `${SITE_URL}/about` }],
    alternates: { canonical: fullUrl },
    openGraph: {
      title: `${title} | ${PRODUCT_SHORT}`,
      description,
      url: fullUrl,
      type: 'article',
      siteName: PRODUCT_SHORT,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} | ${PRODUCT_SHORT}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${PRODUCT_SHORT}`,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const doc = await getDoc(slug);

  if (!doc) {
    notFound();
  }

  const { prev, next } = getPrevNext(slug);

  // Generate breadcrumbs from slug
  const breadcrumbs = slug.split('/').map(part => {
    return part
      .replace(/-/g, ' ')
      .replace(/^\d+-/, '') // remove maturity prefix numbers
      .replace(/\.skill$/, ' skill')
      .replace(/\.agent$/, ' agent')
      .replace(/\.template$/, ' template');
  });

  return (
    <div className="flex items-start gap-10 xl:gap-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              title: doc.title,
              description: doc.description || doc.title,
              path: `/docs/${slug}`,
            }),
            breadcrumbJsonLd([
              { name: 'Docs', path: '/docs/README' },
              ...breadcrumbs.map((crumb, idx) => ({
                name: crumb,
                path: `/docs/${slug.split('/').slice(0, idx + 1).join('/')}`,
              })),
            ]),
          ]),
        }}
      />

      {/* ─── Document Content ─── */}
      <article className="min-w-0 flex-1" style={{ maxWidth: '52rem' }}>
        
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
          <Link href="/docs" className="hover:text-[var(--ink)]">Docs</Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span>/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'font-bold text-[var(--accent)]' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </div>



        <MarkdownRenderer blocks={doc.blocks} />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--paper-border)] pt-6 text-xs text-[var(--ink-muted)]">
          <span>Version: AIES v{SITE_VERSION}</span>
          <a
            href={`${REPOSITORY_URL}/edit/main/${doc.sourcePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--ink)]"
          >
            ✏️ Edit this page on GitHub
          </a>
        </div>

        <div className="mt-8 flex items-stretch justify-between gap-4 border-t border-[var(--paper-border)] pt-8">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group flex max-w-[48%] flex-1 flex-col rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4 transition duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                Previous Chapter
              </span>
              <span className="line-clamp-1 text-xs font-semibold text-[var(--ink-secondary)] transition duration-150 group-hover:text-[var(--accent-hover)]">
                ← {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex max-w-[48%] flex-1 flex-col rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4 text-right transition duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                Next Chapter
              </span>
              <span className="line-clamp-1 text-xs font-semibold text-[var(--ink-secondary)] transition duration-150 group-hover:text-[var(--accent-hover)]">
                {next.title} →
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

      </article>

      {/* ─── Table of Contents (Desktop Sidebar) ─── */}
      <aside className="sticky top-[100px] hidden w-[220px] shrink-0 overflow-y-auto pr-1 scrollbar lg:block" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <TableOfContents headings={doc.headings} />
      </aside>

    </div>
  );
}
