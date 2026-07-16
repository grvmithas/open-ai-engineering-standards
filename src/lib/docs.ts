import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import manifest from '@/generated/content-manifest.json';

// Content is consumed only while prerendering the explicit static route manifest.
const CONTENT_ROOT = path.join(/* turbopackIgnore: true */ process.cwd(), 'content');

export interface DocMeta {
  title: string;
  description: string;
  slug: string;
}

export interface DocBlock {
  type: 'html' | 'mermaid';
  content: string;
}

export interface Doc {
  slug: string;
  sourcePath: string;
  title: string;
  description: string;
  blocks: DocBlock[];
  rawContent: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ManifestDocument extends DocMeta {
  sourcePath: string;
}

const documents = manifest.documents as ManifestDocument[];
const documentsBySlug = new Map(documents.map(document => [document.slug, document]));

function slugToFilePath(slug: string): string {
  const sourcePath = documentsBySlug.get(slug)?.sourcePath;
  return sourcePath
    ? path.join(/* turbopackIgnore: true */ process.cwd(), sourcePath)
    : path.join(CONTENT_ROOT, '__missing-document__.md');
}

export function getAllDocSlugs(): string[] {
  return documents.map(document => document.slug);
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  const idCounts = new Map<string, number>();
  let fence: string | null = null;
  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fence === fenceMatch[1][0]) fence = null;
      continue;
    }
    if (fence) continue;
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').replace(/`/g, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      const count = idCounts.get(id) ?? 0;
      idCounts.set(id, count + 1);
      headings.push({ id: count === 0 ? id : `${id}-${count}`, text, level });
    }
  }
  return headings;
}

function extractTitle(markdown: string, slug: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (match) return match[1].replace(/\*\*/g, '').replace(/`/g, '');
  return slug.split('/').pop()?.replace(/-/g, ' ') || slug;
}

function extractDescription(markdown: string): string {
  const lines = markdown.split('\n');
  let pastHeading = false;
  for (const line of lines) {
    if (line.startsWith('#')) { pastHeading = true; continue; }
    if (pastHeading && line.trim() && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('|') && !line.startsWith('-') && !line.startsWith('```')) {
      return line.trim().replace(/\*\*/g, '').replace(/`/g, '').slice(0, 160);
    }
  }
  return 'Open AI Engineering Standard — Production-grade AI engineering documentation.';
}

function addHeadingIds(html: string, idCounts: Map<string, number>): string {
  return html.replace(/<(h[1-3])>(.+?)<\/h[1-3]>/g, (_, tag, content) => {
    const text = content.replace(/<[^>]+>/g, '').replace(/[^a-z0-9\s-]/gi, '');
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    const count = idCounts.get(id) ?? 0;
    idCounts.set(id, count + 1);
    return `<${tag} id="${count === 0 ? id : `${id}-${count}`}">${content}</${tag}>`;
  });
}

interface MarkdownNode {
  type?: string;
  url?: string;
  children?: MarkdownNode[];
}

function toDocsHref(href: string, filePath: string): string {
  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('//') ||
    /^[a-z][a-z\d+.-]*:/i.test(href)
  ) {
    return href;
  }

  const match = href.match(/^([^?#]*)([?#].*)?$/);
  const linkPath = match?.[1] ?? href;
  const suffix = match?.[2] ?? '';
  if (!linkPath) return href;

  const relativeFilePath = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/');
  const resolvedPath = path.posix.normalize(
    path.posix.join(path.posix.dirname(relativeFilePath), linkPath),
  );
  if (resolvedPath === '..' || resolvedPath.startsWith('../')) return href;

  let docSlug: string | null = null;
  if (resolvedPath.endsWith('.md.template')) {
    docSlug = resolvedPath;
  } else if (resolvedPath.endsWith('.md')) {
    docSlug = resolvedPath.slice(0, -3);
  } else {
    const resolvedDiskPath = path.join(/* turbopackIgnore: true */ CONTENT_ROOT, ...resolvedPath.split('/'));
    if (linkPath.endsWith('/') || (fs.existsSync(resolvedDiskPath) && fs.statSync(resolvedDiskPath).isDirectory())) {
      docSlug = `${resolvedPath.replace(/\/$/, '')}/README`;
    }
  }

  return docSlug ? `/docs/${docSlug}${suffix}` : href;
}

function transformRelativeLinks(filePath: string) {
  return () => (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (node.type === 'link' && node.url) {
        node.url = toDocsHref(node.url, filePath);
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

export async function getDoc(slug: string): Promise<Doc | null> {
  const filePath = slugToFilePath(slug);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content: markdown } = matter(fileContent);
  const metadata = documentsBySlug.get(slug);

  // Split content by mermaid blocks
  const parts = markdown.split(/(```mermaid[\s\S]*?```)/g);
  const blocks: DocBlock[] = [];
  const headingIdCounts = new Map<string, number>();

  for (const part of parts) {
    if (part.startsWith('```mermaid')) {
      const chart = part
        .replace(/^```mermaid\s*/, '')
        .replace(/```$/, '')
        .trim();
      blocks.push({ type: 'mermaid', content: chart });
    } else if (part.trim()) {
      const processed = await remark()
        .use(remarkGfm)
        .use(transformRelativeLinks(filePath))
        .use(remarkHtml, { sanitize: false })
        .process(part);
      const htmlWithIds = addHeadingIds(processed.toString(), headingIdCounts);
      blocks.push({
        type: 'html',
        content: sanitizeHtml(htmlWithIds, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'img']),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            '*': ['id', 'class'],
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
            code: ['class'],
          },
          allowedSchemes: ['http', 'https', 'mailto'],
          allowProtocolRelative: false,
        }),
      });
    }
  }

  return {
    slug,
    sourcePath: documentsBySlug.get(slug)?.sourcePath ?? path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
    title: metadata?.title ?? extractTitle(markdown, slug),
    description: metadata?.description ?? extractDescription(markdown),
    blocks,
    rawContent: markdown,
    headings: extractHeadings(markdown),
  };
}

export function getAllDocs(): DocMeta[] {
  return documents.map(({ slug, title, description }) => ({ slug, title, description }));
}
