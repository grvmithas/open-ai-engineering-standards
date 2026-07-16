import packageMetadata from '../../package.json';

/** Display brand — avoids "Open AI" / OpenAI collision. */
export const PRODUCT_SHORT = 'AIES';
export const PRODUCT_NAME = 'AI Engineering Standard';
export const PRODUCT_TAGLINE =
  'The open, vendor-neutral community standard for production AI delivery';

/**
 * Corpus is production-depth (prompts, skills, MCP, evals, AIDLC, patterns, memory…).
 * “Draft” refers only to community-adoption / shared-governance maturity — not missing know-how.
 */
export const RELEASE_STATUS = 'v1.0 corpus';
export const RELEASE_STATUS_NOTE =
  'Knowledge base and operating playbooks are shipped. What remains Draft is industry adoption: external pilots, shared governance, and inter-org critique — not inventing the practices.';

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
