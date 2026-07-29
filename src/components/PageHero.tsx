import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** full = edge-to-edge inside main; contained = max-width column */
  layout?: 'full' | 'contained';
  size?: 'md' | 'lg';
}

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  layout = 'contained',
  size = 'lg',
}: PageHeroProps) {
  const inner = (
    <div className={`relative z-10 ${layout === 'contained' ? 'mx-auto max-w-4xl' : 'w-full'}`}>
      {eyebrow ? (
        <p className="font-mono text-sm font-medium text-[var(--inverse-accent)]">{eyebrow}</p>
      ) : null}
      <h1
        className={`mt-2 font-extrabold tracking-tight text-[var(--inverse-text)] ${
          size === 'lg' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'
        }`}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--inverse-muted)] md:text-base">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );

  return (
    <section className="hero-band relative overflow-hidden border-b border-[var(--inverse-border)]">
      <div className="hero-band-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-band-glow pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full" aria-hidden />
      <div className="hero-band-glow pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full opacity-70" aria-hidden />
      <div className="relative px-4 py-12 md:px-6 md:py-16 lg:py-20">{inner}</div>
    </section>
  );
}
