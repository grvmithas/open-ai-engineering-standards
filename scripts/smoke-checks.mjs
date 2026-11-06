import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './content-utils.mjs';

const checks = {
  accessibility: [
    ['src/app/layout.tsx', /href="#main-content"/, 'global skip link'],
    ['src/app/page.tsx', /id="main-content"/, 'home skip target'],
    ['src/components/SiteShell.tsx', /id="main-content"/, 'site shell skip target'],
    ['src/app/(site)/layout.tsx', /<SiteShell/, 'site pages use SiteShell'],
    ['src/app/docs/layout.tsx', /<SiteShell/, 'docs use SiteShell'],
    ['src/components/DocSearch.tsx', /role="combobox"/, 'search combobox semantics'],
    ['src/components/DocSearch.tsx', /role="listbox"/, 'search results listbox'],
    ['src/components/CommandPalette.tsx', /aria-modal="true"/, 'command palette modal semantics'],
    ['src/components/PortalExplorer.tsx', /aria-live="polite"/, 'portal result announcement'],
    ['src/components/Sidebar.tsx', /type="search"/, 'navigation filtering'],
  ],
  security: [
    ['src/lib/docs.ts', /sanitizeHtml\(/, 'Markdown HTML sanitization'],
    ['src/components/Mermaid.tsx', /securityLevel:\s*'strict'/, 'strict Mermaid security'],
  ],
};

const requested = process.argv[2];
if (!requested || !(requested in checks)) {
  console.error(`Usage: node scripts/smoke-checks.mjs <${Object.keys(checks).join('|')}>`);
  process.exit(2);
}

const failures = checks[requested]
  .filter(([relativePath, pattern]) => !pattern.test(fs.readFileSync(path.join(ROOT, relativePath), 'utf8')))
  .map(([, , description]) => description);

if (failures.length) {
  console.error(`${requested} smoke checks failed: ${failures.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(`${requested} smoke checks passed.`);
}
