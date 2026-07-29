import SiteShell from '@/components/SiteShell';

/** All app pages except the landing page share header + book navigation sidebar. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell bare maxWidth="full" variant="subtle">
      {children}
    </SiteShell>
  );
}
