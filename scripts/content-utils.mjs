import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..');
export const CONTENT_ROOT = path.join(ROOT, 'content');
export const MANIFEST_PATH = path.join(ROOT, 'src', 'generated', 'content-manifest.json');
export const SEARCH_PATH = path.join(ROOT, 'public', 'search-index.json');
export const CONTENT_EXTENSIONS = ['.md', '.md.template'];

export function toPosix(value) {
  return value.replaceAll(path.sep, '/');
}

export function isContentFile(fileName) {
  return CONTENT_EXTENSIONS.some(extension => fileName.endsWith(extension));
}

export function walkContent(directory = CONTENT_ROOT) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name, 'en'))
    .flatMap(entry => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkContent(absolutePath);
      return isContentFile(entry.name) ? [absolutePath] : [];
    });
}

export function sourcePathToSlug(sourcePath) {
  return sourcePath.endsWith('.md.template')
    ? sourcePath
    : sourcePath.slice(0, -3);
}

export function stripFrontmatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

export function stripFencedCode(markdown) {
  return markdown.replace(/^( {0,3})(`{3,}|~{3,}).*$(?:\r?\n[\s\S]*?^\1\2[ \t]*$)?/gm, '');
}

export function extractTitle(markdown, slug) {
  const match = stripFencedCode(markdown).match(/^#\s+(.+)$/m);
  return cleanInlineMarkdown(match?.[1] ?? slug.split('/').at(-1)?.replaceAll('-', ' ') ?? slug);
}

export function extractDescription(markdown) {
  const lines = stripFencedCode(markdown).split(/\r?\n/);
  let passedTitle = false;
  for (const line of lines) {
    if (/^#\s+/.test(line)) {
      passedTitle = true;
      continue;
    }
    if (
      passedTitle &&
      line.trim() &&
      line.trim() !== '---' &&
      !/^(#|>|[-*+] |\d+\. |\|)/.test(line.trim())
    ) {
      return cleanInlineMarkdown(line).slice(0, 160);
    }
  }
  return 'Open AI Engineering Standard — production-grade AI engineering documentation.';
}

export function cleanInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchableText(markdown) {
  return cleanInlineMarkdown(
    stripFencedCode(markdown)
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s?/gm, '')
      .replace(/\|/g, ' '),
  );
}

export function buildManifest() {
  const documents = walkContent().map(absolutePath => {
    const sourcePath = toPosix(path.relative(ROOT, absolutePath));
    const slug = sourcePathToSlug(sourcePath.slice('content/'.length));
    const markdown = stripFrontmatter(fs.readFileSync(absolutePath, 'utf8'));
    return {
      slug,
      sourcePath,
      title: extractTitle(markdown, slug),
      description: extractDescription(markdown),
    };
  });

  return {
    schemaVersion: 1,
    documentCount: documents.length,
    documents,
  };
}

export function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}
