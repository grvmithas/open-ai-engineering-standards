import Link from 'next/link';
import manifest from '@/generated/content-manifest.json';
import { REPOSITORY_URL, SITE_VERSION } from '@/lib/site';

const MATURITY_LEVELS = [
  { level: 0, slug: '00-foundations', title: 'AI Foundations', desc: 'The Harness Principle, failure modes, core mental models', icon: '🧱', color: '#6366f1' },
  { level: 1, slug: '01-prompt-engineering', title: 'Prompt Engineering', desc: 'XML-structured prompts, anti-patterns, system prompt templates', icon: '✍️', color: '#8b5cf6' },
  { level: 2, slug: '02-context-engineering', title: 'Context Engineering', desc: 'Context fidelity, 13 context types, progressive disclosure', icon: '📦', color: '#a855f7' },
  { level: 3, slug: '03-skill-engineering', title: 'Skill Engineering', desc: 'Reusable procedural knowledge for debug, review, security', icon: '🛠️', color: '#c026d3' },
  { level: 4, slug: '04-agent-engineering', title: 'Agent Engineering', desc: 'OAIES agent spec, hooks, subagents, termination criteria', icon: '🤖', color: '#db2777' },
  { level: 5, slug: '05-multi-agent-systems', title: 'Multi-Agent Systems', desc: 'Supervisor, pipeline, parallel patterns, communication protocol', icon: '🕸️', color: '#e11d48' },
  { level: 6, slug: '06-memory-knowledge', title: 'Memory & Knowledge', desc: 'Hybrid RAG, vector databases, episodic and semantic memory', icon: '🧠', color: '#dc2626' },
  { level: 7, slug: '07-llmops', title: 'LLMOps', desc: 'Evaluation gates, PromptOps, cost optimization, observability', icon: '⚙️', color: '#ea580c' },
  { level: 8, slug: '08-ai-sdlc', title: 'AI SDLC', desc: '26-stage workflow, production prompts for every stage', icon: '🔄', color: '#d97706' },
  { level: 9, slug: '09-enterprise-ai', title: 'Enterprise AI', desc: 'Governance, EU AI Act, provider-neutral architecture, audit logging', icon: '🏢', color: '#65a30d' },
  { level: 10, slug: '10-ai-org-playbook', title: 'AI Org Playbook', desc: 'Roles, operating models, hiring criteria, culture principles', icon: '📖', color: '#059669' },
];

const FEATURES = [
  {
    icon: '🎯',
    title: '13-Component Pattern Spec',
    desc: 'Every AI Engineering Pattern includes problem, workflow, prompt, agent, skills, hooks, checklist, examples, failures, and enterprise notes.',
    href: '/docs/patterns/README',
  },
  {
    icon: '🔒',
    title: 'Security-First by Default',
    desc: 'OWASP Top 10 + AI-specific attack vectors baked into every skill, agent, and SDLC stage. Not bolted on after.',
    href: '/docs/03-skill-engineering/skills/security.skill',
  },
  {
    icon: '📊',
    title: 'Evaluation CI/CD Gate',
    desc: 'GitHub Actions workflow that blocks PRs when LLM evaluation tests fail. Prompts are treated like code.',
    href: '/docs/07-llmops/evaluation/framework-selection',
  },
  {
    icon: '⚡',
    title: '26-Stage AI SDLC',
    desc: 'Complete software development lifecycle with AI-enhanced prompts for every stage — from story kickoff to knowledge capture.',
    href: '/docs/08-ai-sdlc/README',
  },
  {
    icon: '🏢',
    title: 'Enterprise Ready',
    desc: 'EU AI Act compliance, provider-neutral gateway, audit logging standard, multi-tenant isolation, and governance frameworks.',
    href: '/docs/09-enterprise-ai/README',
  },
  {
    icon: '🤖',
    title: 'Production Agent Specs',
    desc: 'Every agent ships with a YAML specification: role, tools, memory, communication, termination criteria, and failure handling.',
    href: '/docs/04-agent-engineering/agents/coder.agent',
  },
];

export default function HomePage() {
  return (
    <main id="main-content" style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ─── Header ─── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(5, 5, 9, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        height: 'var(--header-h)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.25rem' }}>⚡</span>
            <span style={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', fontSize: '0.95rem' }}>OAIES</span>
            <span style={{ padding: '0.1rem 0.45rem', background: 'rgba(139,92,246,0.15)', color: 'var(--primary-light)', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid rgba(139,92,246,0.3)' }}>v{SITE_VERSION}</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link href="/docs/README" style={{ padding: '0.4rem 0.85rem', borderRadius: 6, color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}>Docs</Link>
            <Link href="/docs/patterns/README" style={{ padding: '0.4rem 0.85rem', borderRadius: 6, color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}>Patterns</Link>
            <Link href="/about" style={{ padding: '0.4rem 0.85rem', borderRadius: 6, color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}>About</Link>
            <Link href="/docs/08-ai-sdlc/README" style={{ padding: '0.4rem 0.85rem', borderRadius: 6, color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}>SDLC</Link>
            <Link href="/docs/resources/README" style={{ padding: '0.4rem 0.85rem', borderRadius: 6, color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}>Resources</Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: 8,
                background: 'rgba(139,92,246,0.1)',
                color: 'var(--primary-light)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid rgba(139,92,246,0.25)',
                transition: 'all 0.15s',
              }}
            >
              GitHub →
            </a>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem 5rem' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, 0)',
          width: 800, height: 600,
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <span style={{
              padding: '0.35rem 1rem',
              borderRadius: 20,
              background: 'rgba(139,92,246,0.1)',
              color: 'var(--primary-light)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid rgba(139,92,246,0.25)',
            }}>
              🚀 The AI Engineering Standard
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Open AI Engineering<br />Standard
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-subtle)',
            maxWidth: 640,
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            The production-ready, enterprise-grade foundation for AI systems.
            One standard. One stack. No exceptions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/README" style={{
              padding: '0.75rem 2rem',
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}>
              Read the Standard →
            </Link>
            <Link href="/docs/08-ai-sdlc/README" style={{
              padding: '0.75rem 2rem',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.15s',
            }}>
              AI SDLC Prompts
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            {[
              { value: String(MATURITY_LEVELS.length), label: 'Maturity Levels' },
              { value: '26', label: 'SDLC Stages' },
              { value: '13', label: 'Pattern Components' },
              { value: String(manifest.documentCount), label: 'Production Docs' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.2rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Maturity Model ─── */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {MATURITY_LEVELS.length}-Level Maturity Model
          </h2>
          <p style={{ color: 'var(--text-subtle)', maxWidth: 560, margin: '0 auto' }}>
            Enter at your current level. Each level has a readiness gate before progression.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {MATURITY_LEVELS.map(level => (
            <Link
              key={level.level}
              href={`/docs/${level.slug}/README`}
              style={{
                display: 'block',
                padding: '1.25rem 1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="maturity-card"
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${level.color}, transparent)`,
              }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                <div style={{
                  fontSize: '1.25rem',
                  width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${level.color}18`,
                  borderRadius: 10,
                  border: `1px solid ${level.color}30`,
                  flexShrink: 0,
                }}>{level.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: level.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Level {level.level}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{level.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{level.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Key Features ─── */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            What Makes OAIES Different
          </h2>
          <p style={{ color: 'var(--text-subtle)', maxWidth: 540, margin: '0 auto' }}>
            Most AI repos say &ldquo;here are 3 ways.&rdquo; OAIES says: this is the one way. This is why.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
          {FEATURES.map(feature => (
            <Link key={feature.title} href={feature.href} style={{
              display: 'block',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{feature.title}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          padding: '3rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Ready to raise your AI engineering standard?
          </h2>
          <p style={{ color: 'var(--text-subtle)', marginBottom: '2rem' }}>
            Start with Level 0: The Harness Principle. Every production AI system starts here.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/00-foundations/02-the-harness-principle" style={{
              padding: '0.7rem 1.75rem',
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(139,92,246,0.3)',
            }}>
              The Harness Principle →
            </Link>
            <Link href="/docs/patterns/README" style={{
              padding: '0.7rem 1.75rem',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              Browse Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
      }}>
        <p>
          <strong style={{ color: 'var(--text-subtle)' }}>OAIES v{SITE_VERSION}</strong> — Open AI Engineering Standard
          <span style={{ margin: '0 0.75rem' }}>·</span>
          <em>&ldquo;The standard doesn&rsquo;t tell you what you can do. It tells you what you must do.&rdquo;</em>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/docs/README" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '1.25rem' }}>Docs</Link>
          <Link href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '1.25rem' }}>About</Link>
          <Link href="/docs/CONTRIBUTING" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '1.25rem' }}>Contributing</Link>
          <Link href="/docs/CHANGELOG" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Changelog</Link>
        </p>
      </footer>

      <style>{`
        .maturity-card:hover {
          border-color: rgba(139,92,246,0.3) !important;
          background: rgba(139,92,246,0.06) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
