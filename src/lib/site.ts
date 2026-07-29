import packageMetadata from '../../package.json';

/** Display brand — never “Open AI” / AIES. Product is AI Engineering Standard (AIES). */
export const PRODUCT_SHORT = 'AIES';
export const PRODUCT_NAME = 'AI Engineering Standard';

/** Hero promise — install outcome first. */
export const PRODUCT_HERO =
  'Scaffold a production AI harness in 5 minutes';

/** Core USP — foundations thesis. */
export const PRODUCT_USP =
  'The LLM is one component. The harness is the product.';

/** SEO / OG short line — install + honesty without burying the USP. */
export const PRODUCT_TAGLINE =
  'Scaffold a production AI harness in five minutes — vendor-neutral working standard for AIDLC';

/**
 * Corpus is production-depth (prompts, skills, MCP, evals, AIDLC, patterns, memory…).
 * “Draft” / “working standard” refers to community-adoption maturity — not missing know-how.
 * S1 on the roadmap is when a community-standard claim is earned via external evidence.
 */
export const RELEASE_STATUS = 'Working standard';
export const RELEASE_STATUS_NOTE =
  'Corpus shipped. What remains Draft is industry adoption — external pilots, shared governance, and inter-org critique — not inventing the practices.';

export const SITE_VERSION = packageMetadata.version;
export const REPOSITORY_URL = packageMetadata.repository.url.replace(/\.git$/, '');

/** Project steward — short public profile for About / contact. */
export const STEWARD = {
  name: 'Gaurav Mithas',
  title: 'Principal Solutions Architect & AI Coach',
  org: 'Publicis Sapient',
  summary:
    'Directs enterprise AI platforms, full-stack architecture, and AI-assisted SDLC transformation. Focus areas: AI SDLC / AIDLC, context engineering, MCP, evaluation gates, agent workflows, and production LLMOps for distributed engineering teams.',
  email: 'grvmithas@gmail.com',
  phone: '+91 8810381647',
  phoneTel: '+918810381647',
  linkedIn: 'https://linkedin.com/in/gaurav-mithas-06037289',
  github: 'https://github.com/grvmithas',
  photo: '/gaurav.jpg',
} as const;
