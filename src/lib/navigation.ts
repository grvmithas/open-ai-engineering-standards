import manifest from '@/generated/content-manifest.json';

export interface NavItem {
  title: string;
  slug: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

interface ManifestDocument {
  title: string;
  slug: string;
}

const documents = manifest.documents as ManifestDocument[];
const iconBySection: Record<string, string> = {
  '00-foundations': '🧱',
  '01-prompt-engineering': '✍️',
  '02-context-engineering': '📦',
  '03-skill-engineering': '🛠️',
  '04-agent-engineering': '🤖',
  '05-multi-agent-systems': '🕸️',
  '06-memory-knowledge': '🧠',
  '07-llmops': '⚙️',
  '08-ai-sdlc': '🔄',
  '09-enterprise-ai': '🏢',
  '10-ai-org-playbook': '📖',
  patterns: '🎯',
  cookbook: '🍳',
  mcps: '🔌',
  checklists: '✅',
  resources: '📚',
};

const rootIcons: Record<string, string> = {
  README: '🚀',
  CONTRIBUTING: '🤝',
  CHANGELOG: '📋',
};

function createNavigation(): NavItem[] {
  const rootDocuments = documents
    .filter(document => !document.slug.includes('/'))
    .map(document => ({
      title: document.title,
      slug: document.slug,
      icon: rootIcons[document.slug],
    }));

  const sections = [...new Set(
    documents
      .filter(document => document.slug.includes('/'))
      .map(document => document.slug.split('/')[0]),
  )];

  return [
    ...rootDocuments,
    ...sections.map(section => {
      const sectionIndex = documents.find(document => document.slug === `${section}/README`);
      const children = documents
        .filter(document => document.slug.startsWith(`${section}/`) && document.slug !== `${section}/README`)
        .map(document => ({
          title: document.title,
          slug: document.slug,
        }));
      return {
        title: sectionIndex?.title ?? section.replace(/^\d+-/, '').replaceAll('-', ' '),
        slug: sectionIndex?.slug ?? children[0].slug,
        icon: iconBySection[section],
        badge: section === '00-foundations' ? 'Start Here' : undefined,
        children,
      };
    }),
  ];
}

export const navigation: NavItem[] = createNavigation();

export function flattenNav(items: NavItem[]): NavItem[] {
  return items.reduce<NavItem[]>((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flattenNav(item.children));
    return acc;
  }, []);
}

export function findNavItem(slug: string): NavItem | undefined {
  return flattenNav(navigation).find(item => item.slug === slug);
}

export function getPrevNext(slug: string): { prev?: NavItem; next?: NavItem } {
  const flat = flattenNav(navigation);
  const idx = flat.findIndex(item => item.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}
