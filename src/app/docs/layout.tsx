'use client';

import SiteShell from '@/components/SiteShell';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell bare variant="paper">
      <div className="paper h-full w-full px-6 py-8 md:px-10 md:py-10 xl:px-12">
        {children}
      </div>
    </SiteShell>
  );
}
