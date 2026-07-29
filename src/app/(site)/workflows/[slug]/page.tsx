import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import WorkflowPipeline from '@/components/workflows/WorkflowPipeline';
import { getWorkflowBySlug, getWorkflowIndex, LIFECYCLE_WORKFLOWS } from '@/lib/workflows/lifecycle';
import type { WorkflowDocLink } from '@/lib/workflows/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LIFECYCLE_WORKFLOWS.map(w => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return { title: 'Workflow' };
  return {
    title: `${workflow.title} workflow`,
    description: workflow.goal,
    alternates: { canonical: `/workflows/${slug}` },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--ink-muted)]">{title}</h2>
      <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-4 text-sm text-[var(--ink-secondary)] shadow-sm">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-1.5">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="list-inside list-decimal space-y-2">
      {items.map(item => (
        <li key={item} className="pl-1">{item}</li>
      ))}
    </ol>
  );
}

function LinkList({ items }: { items: WorkflowDocLink[] }) {
  if (items.length === 0) {
    return <p className="text-[var(--ink-muted)]">None required at this stage — keep tools off by default.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item.slug}>
          <Link href={`/docs/${item.slug}`} className="font-medium text-[var(--accent)] hover:underline">
            {item.title}
          </Link>
          {item.why ? (
            <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{item.why}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default async function WorkflowStagePage({ params }: PageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) notFound();

  const index = getWorkflowIndex(slug);
  const prev = index > 0 ? LIFECYCLE_WORKFLOWS[index - 1] : null;
  const next = workflow.nextStage ? getWorkflowBySlug(workflow.nextStage) : null;

  return (
    <>
      <PageHero
        eyebrow={`> workflow / ${workflow.slug}`}
        title={workflow.title}
        description={workflow.goal}
        size="md"
        layout="contained"
      >
        <Link href="/workflows" className="text-xs font-semibold text-[var(--inverse-accent)] hover:underline">
          ← All workflows
        </Link>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-3 shadow-sm">
          <WorkflowPipeline activeSlug={workflow.slug} />
        </div>

        <div className="mt-8 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4 text-sm text-[var(--primary-dark)]">
          <p className="text-xs font-bold uppercase tracking-wider">What should I do next?</p>
          <p className="mt-1">
            Complete the steps and evidence below, clear the human gates, then{' '}
            {next ? (
              <Link href={`/workflows/${next.slug}`} className="font-semibold underline">
                continue to {next.title}
              </Link>
            ) : (
              <span className="font-semibold">loop improvements back into prompts, skills, and evals</span>
            )}
            .
          </p>
        </div>

        <Section title="When to use">
          <BulletList items={workflow.whenToUse} />
        </Section>

        <Section title="Step-by-step">
          <NumberedList items={workflow.steps} />
        </Section>

        <Section title="Decisions to make">
          <BulletList items={workflow.decisions} />
        </Section>

        <Section title="Evidence to collect">
          <BulletList items={workflow.evidence} />
        </Section>

        <Section title="Role-specific next actions">
          <ul className="space-y-2">
            {workflow.roleNext.map(item => (
              <li key={item.role}>
                <span className="font-semibold text-[var(--ink)]">{item.role}:</span>{' '}
                {item.action}
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Inputs">
            <BulletList items={workflow.inputs} />
          </Section>
          <Section title="Outputs">
            <BulletList items={workflow.outputs} />
          </Section>
        </div>

        <Section title="Required prompts">
          <LinkList items={workflow.prompts} />
        </Section>

        <Section title="Required skills">
          <LinkList items={workflow.skills} />
        </Section>

        <Section title="Required MCP servers">
          <LinkList items={workflow.mcps} />
        </Section>

        <Section title="Tooling & handbook">
          <LinkList items={workflow.tooling} />
        </Section>

        <Section title="Recommended agents & patterns">
          <LinkList items={workflow.agents} />
        </Section>

        <Section title="Human approval gates">
          <BulletList items={workflow.hitlGates} />
        </Section>

        <Section title="Automation opportunities">
          <BulletList items={workflow.automation} />
        </Section>

        <Section title="Enterprise best practices">
          <BulletList items={workflow.enterprise} />
        </Section>

        <Section title="Common mistakes">
          <ul className="list-inside list-disc space-y-1.5 text-[var(--warning-text)]">
            {workflow.mistakes.map(m => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Section>

        <nav className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[var(--paper-border)] pt-6">
          {prev ? (
            <Link href={`/workflows/${prev.slug}`} className="text-sm font-semibold text-[var(--accent)]">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/workflows/${next.slug}`} className="text-sm font-semibold text-[var(--accent)]">
              Next: {next.title} →
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
