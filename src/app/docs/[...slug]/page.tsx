import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllDocSlugs, getDoc } from '@/lib/docs';
import { getPrevNext } from '@/lib/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import { REPOSITORY_URL, SITE_VERSION } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string[] }> | { slug: string[] };
}

// Generate static params for all docs to build statically
export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map(slug => ({
    slug: slug.split('/'),
  }));
}

export const dynamicParams = false;

// Generate SEO metadata dynamically for each document page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const doc = await getDoc(slug);

  if (!doc) return {};

  return {
    title: `${doc.title} | Open AI Engineering Standard`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} | Open AI Engineering Standard`,
      description: doc.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} | Open AI Engineering Standard`,
      description: doc.description,
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
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      
      {/* ─── Document Content ─── */}
      <article className="flex-1 min-w-0">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-6">
          <Link href="/docs" className="hover:text-slate-300">Docs</Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span>/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'text-violet-400 font-bold' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </div>

        {/* Content Body */}
        <MarkdownRenderer blocks={doc.blocks} />

        {/* Edit/Contribute footer info */}
        <div className="mt-12 pt-6 border-t border-violet-950/20 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500">
          <span>Version: OAIES v{SITE_VERSION}</span>
          <a
            href={`${REPOSITORY_URL}/edit/main/${doc.sourcePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 flex items-center gap-1"
          >
            ✏️ Edit this page on GitHub
          </a>
        </div>

        {/* Prev / Next Page Controls */}
        <div className="mt-8 pt-8 border-t border-violet-950/20 flex gap-4 justify-between items-stretch">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="flex-1 max-w-[48%] flex flex-col p-4 rounded-xl border border-violet-950/20 bg-slate-950/20 hover:bg-slate-950/50 hover:border-violet-900/40 transition duration-150 group"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Previous Chapter
              </span>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-violet-300 transition duration-150 line-clamp-1">
                ← {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="flex-1 max-w-[48%] flex flex-col p-4 rounded-xl border border-violet-950/20 bg-slate-950/20 hover:bg-slate-950/50 hover:border-violet-900/40 transition duration-150 text-right group"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Next Chapter
              </span>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-violet-300 transition duration-150 line-clamp-1">
                {next.title} →
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

      </article>

      {/* ─── Table of Contents (Desktop Sidebar) ─── */}
      <aside className="hidden lg:block w-[200px] sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar shrink-0">
        <TableOfContents headings={doc.headings} />
      </aside>

    </div>
  );
}
