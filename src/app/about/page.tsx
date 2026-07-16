import Link from 'next/link';
import Image from 'next/image';
import { REPOSITORY_URL, SITE_VERSION } from '@/lib/site';

export const metadata = {
  title: 'Gaurav Mithas — AI Engineering Leader & Architect',
  description: 'Creator of the Open AI Engineering Standard. Principal Solutions Architect and AI Coach helping teams build AI-native software organizations.',
};

const STRATEGIC_CAPABILITIES = [
  {
    title: 'Enterprise Performance & Platform Engineering',
    icon: '🚀',
    desc: 'Expertise in application profiling, Core Web Vitals, rendering optimization, memory analysis, bundle optimization, distributed caching, CDN strategies, and observability to build highly performant, resilient digital platforms.'
  },
  {
    title: 'Cloud & Distributed Architecture',
    icon: '☁️',
    desc: 'Architecting scalable cloud-native systems leveraging microservices, event-driven architectures, API-first design, container orchestration, distributed messaging, and resilient deployment patterns for high-traffic enterprise applications.'
  },
  {
    title: 'API, GraphQL & Integration Architecture',
    icon: '🌐',
    desc: 'Designing GraphQL federations, API gateways, BFF (Backend-for-Frontend) architectures, RESTful services, event-driven integrations, schema governance, and secure service communication across complex enterprise ecosystems.'
  },
  {
    title: 'Cost & Performance Optimization',
    icon: '💰',
    desc: 'Optimizing infrastructure and application costs through intelligent caching, edge computing, CDN optimization, resource right-sizing, API efficiency, prompt optimization, semantic caching, cloud cost governance, and performance engineering without compromising scalability.'
  },
  {
    title: 'Digital Experience Engineering',
    icon: '📈',
    desc: 'Establishing enterprise engineering standards for Technical SEO, WCAG accessibility, semantic architecture, internationalization, performance budgets, and developer experience to maximize discoverability, usability, and conversion.'
  },
  {
    title: 'Enterprise Architecture & Governance',
    icon: '🏛️',
    desc: 'Leading Architecture Review Boards (ARB), defining technology standards, conducting solution reviews, managing technical risk, driving modernization initiatives, and aligning engineering decisions with long-term business strategy.'
  },
  {
    title: 'Reliability, Observability & Operations',
    icon: '🔐',
    desc: 'Implementing enterprise observability through distributed tracing, centralized logging, metrics, synthetic monitoring, incident response, SRE principles, resilience engineering, and proactive performance diagnostics.'
  },
  {
    title: 'AI Platform Engineering',
    icon: '🤖',
    desc: 'Standardizing AI-assisted SDLC, Context Engineering, Model Context Protocol (MCP), prompt libraries, evaluation frameworks, agent orchestration, governance, and enterprise AI adoption to improve developer productivity and software quality.'
  }
];

const IMPACT_CARDS = [
  {
    metric: '50+ Engineers Enabled',
    title: 'AI Engineering Transformation',
    desc: 'Established enterprise AI engineering standards, AI-assisted SDLC workflows, Context Engineering patterns, and reusable prompt libraries to accelerate software delivery across distributed teams.'
  },
  {
    metric: 'Scale & Governance',
    title: 'Enterprise Platform Architecture',
    desc: 'Designed cloud-native, API-first, and microfrontend architectures for globally distributed applications, emphasizing scalability, maintainability, governance, and long-term platform evolution.'
  },
  {
    metric: 'Optimization Expert',
    title: 'Performance & Cost Optimization',
    desc: 'Specialized in performance profiling, distributed caching, GraphQL optimization, Core Web Vitals, CDN strategies, cloud resource optimization, observability, and cost-efficient architecture for enterprise-scale systems.'
  },
  {
    metric: 'Web Platform Excellence',
    title: 'Engineering Excellence',
    desc: 'Championed engineering best practices across SEO, accessibility, security, CI/CD, developer experience, and architecture governance to build resilient, high-quality digital platforms.'
  }
];

const TIMELINE = [
  {
    company: 'Publicis Sapient',
    title: 'Solutions Architect & AI Coach',
    period: '2021 – Present',
    desc: 'Directing enterprise AI platforms, full-stack architectures, engineering governance, and SDLC transformation. Leading adoption of Publicis Sapient’s AI developer platform (Slingshot), standardizing context engineering patterns with MCP, and evaluating RAG systems for enterprise deployment.',
    tagline: 'Internal AI Platform & Enterprise Digital Commerce',
    stack: ['MCP', 'Promptfoo', 'Azure OpenAI', 'NestJS', 'Python', 'Next.js', 'Turborepo']
  },
  {
    company: 'Nagarro',
    title: 'Senior Staff Solutions Architect',
    period: '2018 – 2021',
    desc: 'Led solutions architecture, cross-domain API design, and legacy landscape modernization. Built automated boilerplate generators and cross-domain integration blueprints that eliminated configuration overhead and accelerated time-to-market.',
    tagline: 'Legacy Migrations & Cloud-Native Platforms',
    stack: ['React', 'Vue.js', 'Node.js', 'Golang', 'Docker', 'Microservices']
  },
  {
    company: 'Wipro Technologies',
    title: 'Project Engineer',
    period: '2016 – 2018',
    desc: 'Developed and optimized high-concurrency internal collaboration platforms built to handle intensive daily enterprise workloads.',
    tagline: 'Workflow Automation & Collaboration Systems',
    stack: ['Java', 'JavaScript', 'Database Synchronization']
  },
  {
    company: 'Infosys',
    title: 'Senior Systems Engineer',
    period: '2014 – 2016',
    desc: 'Engineered high-availability software modules for core internal workflow solutions, ensuring strict compliance with enterprise delivery standards.',
    tagline: 'Enterprise Applications & Code Governance',
    stack: ['C#', '.NET', 'SQL Server', 'Code Review Frameworks']
  }
];

const STANDARDS_AREAS = [
  'AI SDLC', 'Context Engineering', 'Prompt Engineering', 
  'Agent Engineering', 'Model Context Protocol (MCP)', 
  'Multi-Agent Workflows', 'Evaluation Frameworks', 
  'AI DevOps (LLMOps)', 'Enterprise AI Architecture'
];

const CURRENT_FOCUS = [
  'Designing AI-native Software Development Lifecycles (AI SDLC)',
  'Building reusable Context Engineering patterns and MCP integrations',
  'Creating AI Engineering Standards (AIES) for production systems',
  'Developing enterprise-grade agentic workflows and developer platforms',
  'Researching memory systems, knowledge graphs, and multi-agent orchestration'
];

const UPCOMING_TOPICS = [
  'Context Engineering vs Prompt Engineering',
  'Building Enterprise MCP Servers',
  'Designing Reliable AI SDLCs',
  'Multi-Agent Architecture Patterns',
  'AI Performance Engineering',
  'LLM Cost Optimization',
  'RAG Beyond Vector Search',
  'AI Governance for Enterprise Teams'
];

export default function AboutPage() {
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
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link href="/docs/README" style={{ padding: '0.4rem 0.85rem', color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>Docs</Link>
            <Link href="/docs/patterns/README" style={{ padding: '0.4rem 0.85rem', color: 'var(--text-subtle)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>Patterns</Link>
            <Link href="/about" style={{ padding: '0.4rem 0.85rem', color: 'var(--primary-light)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>About</Link>
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
              }}
            >
              GitHub →
            </a>
          </nav>
        </div>
      </header>

      {/* ─── Hero / Identity ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 2rem 3rem' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, 0)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        
        <div 
          style={{ position: 'relative', maxWidth: 900, margin: '0 auto', gap: '3rem' }} 
          className="flex flex-col md:flex-row items-center md:text-left text-center"
        >
          {/* Profile Picture with Crisp Border and Soft Shadow */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              position: 'relative',
              width: 140, height: 140,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(139, 92, 246, 0.6)',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(6, 182, 212, 0.2)',
              background: '#0c0c16',
            }}>
              <Image
                src="/gaurav.jpg"
                alt="Gaurav Mithas"
                width={140}
                height={140}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Profile Title & Credentials */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
              color: '#ffffff',
            }}>
              Gaurav Mithas
            </h1>
            <p style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--primary-light)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Principal Solutions Architect & AI Coach
            </p>
            
            {/* Direct Contact Grid */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem 2rem',
                fontSize: '0.85rem',
                color: '#f8fafc', 
                marginBottom: '1.5rem',
              }} 
              className="justify-center md:justify-start"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>📍</span> Gurugram, India
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>✉️</span> <a href="mailto:grvmithas@gmail.com" style={{ color: 'var(--primary-light)', textDecoration: 'none', borderBottom: '1px solid rgba(139,92,246,0.3)' }} className="hover:text-white transition">grvmithas@gmail.com</a>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>📞</span> +91 8810381647
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }} className="justify-center md:justify-start">
              <a
                href="https://linkedin.com/in/gaurav-mithas-06037289"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                className="hover:bg-slate-900"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/grvmithas"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                className="hover:bg-slate-900"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission Statement / Pitch ─── */}
      <section style={{ padding: '2rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          padding: '2rem',
          background: 'rgba(139,92,246,0.05)',
          border: '1px solid rgba(139,92,246,0.15)',
          borderRadius: 16,
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
            Mission
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#f8fafc',
            lineHeight: 1.7,
            fontWeight: 500,
            textAlign: 'justify'
          }}>
            Helping engineering teams build AI-native software organizations. From AI-assisted SDLC and Context Engineering to enterprise platform architecture, the focus is on transforming how modern software is planned, built, tested, and delivered.
          </p>
        </div>
      </section>

      {/* ─── Summary / Focus Themes ─── */}
      <section style={{ padding: '2rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          Strategic Pillars
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-light)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              🧠 AI Engineering & AI SDLC
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6, textAlign: 'justify' }}>
              Establishing modern standards for integrating probabilistic LLMs into deterministic workflows. Designing portable agent tools, refining PromptOps with evaluation loops, and coaching teams to build context-aware developer integrations.
            </p>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-light)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              📐 Enterprise Architecture
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6, textAlign: 'justify' }}>
              Designing distributed systems with microservices, event-driven architectures, and API-first designs. Governing technical risk, chairing Architecture Review Boards (ARBs), and consolidating stacks across multi-million-dollar modernization tracks.
            </p>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-light)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              💻 Full-Stack Engineering
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6, textAlign: 'justify' }}>
              Building highly performant, responsive web platforms. Driving web excellence through Core Web Vitals optimization, module federation, Technical SEO, accessibility guidelines (WCAG), and offline-first client engines.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Building Open Standards (AIES Focus) ─── */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          padding: '2.5rem',
          background: '#0e0e1b',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
            Building Open Standards for AI Engineering
          </h2>
          <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', textAlign: 'justify' }}>
            Working on an open-source initiative to standardize how modern AI-powered software systems are designed, implemented, reviewed, deployed, and governed.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {STANDARDS_AREAS.map(area => (
              <span
                key={area}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--secondary)',
                  background: 'rgba(6,182,212,0.08)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 6
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Areas of Expertise & Impact ─── */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          Areas of Expertise & Proven Impact
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.25rem' }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {IMPACT_CARDS.map(card => (
            <div
              key={card.title}
              style={{
                padding: '1.5rem',
                background: '#0e0e1b',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>
                {card.metric}
              </span>
              <h3 style={{ fontWeight: 750, color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.6, textAlign: 'justify' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Strategic Capabilities Catalog ─── */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          Strategic Architecture Capabilities
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.25rem' }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STRATEGIC_CAPABILITIES.map(cap => (
            <div
              key={cap.title}
              style={{
                padding: '1.25rem',
                background: '#0e0e1b',
                border: '1px solid var(--border)',
                borderRadius: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{cap.icon}</span>
                <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{cap.title}</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.55, textAlign: 'justify' }}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Current Focus & Upcoming Topics ─── */}
      <section style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Current Focus List */}
          <div style={{ padding: '1.5rem', background: '#0e0e1b', border: '1px solid var(--border)', borderRadius: 12 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>
              Current Focus
            </h3>
            <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }} className="space-y-2 text-xs text-[#e2e8f0] font-medium leading-relaxed">
              {CURRENT_FOCUS.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Thought Leadership Pipeline */}
          <div style={{ padding: '1.5rem', background: '#0e0e1b', border: '1px solid var(--border)', borderRadius: 12 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>
              Upcoming Thought Leadership
            </h3>
            <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }} className="space-y-2 text-xs text-[#e2e8f0] font-medium leading-relaxed">
              {UPCOMING_TOPICS.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ─── Timeline / Experience ─── */}
      <section style={{ padding: '3rem 2rem 5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          Professional Experience
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {TIMELINE.map(item => (
            <div
              key={item.company}
              style={{
                padding: '1.5rem',
                background: '#0e0e1b',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: 12,
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                flexWrap: 'wrap',
                gap: '0.5rem 1rem',
                marginBottom: '0.5rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#fff',
                  }}>{item.company}</h3>
                  <p style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--primary-light)',
                    marginTop: '0.1rem'
                  }}>{item.title}</p>
                </div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--secondary)',
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 6
                }}>{item.period}</span>
              </div>
              
              <p style={{
                fontSize: '0.75rem',
                fontStyle: 'italic',
                color: '#f1f5f9', 
                marginBottom: '0.75rem'
              }}>{item.tagline}</p>
              
              <p style={{
                fontSize: '0.825rem',
                color: '#f8fafc', 
                lineHeight: 1.6,
                marginBottom: '1rem',
                textAlign: 'justify'
              }}>{item.desc}</p>
              
              {/* Stack tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.stack.map(st => (
                  <span
                    key={st}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--text-subtle)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 4
                    }}
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
          <strong style={{ color: 'var(--text-subtle)' }}>OAIES v{SITE_VERSION}</strong> — Creator: Gaurav Mithas
          <span style={{ margin: '0 0.75rem' }}>·</span>
          <em>&ldquo;The standard doesn&rsquo;t tell you what you can do. It tells you what you must do.&rdquo;</em>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/docs/README" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '1.25rem' }}>Docs</Link>
          <Link href="/docs/CONTRIBUTING" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '1.25rem' }}>Contributing</Link>
          <Link href="/docs/CHANGELOG" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Changelog</Link>
        </p>
      </footer>

    </main>
  );
}
