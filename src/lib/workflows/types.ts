export type UserGoal =
  | 'new-product'
  | 'existing-codebase'
  | 'legacy-modernize'
  | 'learn'
  | 'browse-standards'
  | 'explore-examples';

export type UserRole =
  | 'product-manager'
  | 'architect'
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'qa'
  | 'devops'
  | 'engineering-manager'
  | 'ai-engineer';

export type AiMaturity = 'beginner' | 'intermediate' | 'advanced' | 'enterprise';

export type UserIde =
  | 'cursor'
  | 'claude-code'
  | 'copilot'
  | 'codex'
  | 'gemini-cli'
  | 'kiro'
  | 'windsurf'
  | 'opencode'
  | 'continue';

export type ModelProvider = 'claude' | 'gpt' | 'gemini' | 'multi' | 'local' | 'undecided';

export type DataClass = 'public' | 'internal' | 'confidential';

export type TechStack =
  | 'react'
  | 'nextjs'
  | 'react-native'
  | 'nodejs'
  | 'nestjs'
  | 'python'
  | 'fastapi'
  | 'java'
  | 'dotnet';

export interface UserProfile {
  goal: UserGoal;
  role: UserRole;
  maturity: AiMaturity;
  ide: UserIde;
  model: ModelProvider;
  dataClass: DataClass;
  stack: TechStack;
  completedAt: string;
}

export interface WorkflowDocLink {
  title: string;
  slug: string;
  /** One-line why this doc matters at this stage */
  why?: string;
}

export interface WorkflowStage {
  id: string;
  title: string;
  slug: string;
  goal: string;
  /** When this stage applies — architect go/no-go */
  whenToUse: string[];
  /** Opinionated step-by-step */
  steps: string[];
  /** Decision cues */
  decisions: string[];
  /** Evidence to collect before exiting stage */
  evidence: string[];
  /** Role-specific next actions */
  roleNext: Array<{ role: string; action: string }>;
  inputs: string[];
  outputs: string[];
  prompts: WorkflowDocLink[];
  skills: WorkflowDocLink[];
  /** Real MCP servers only (`content/mcps/*`) */
  mcps: WorkflowDocLink[];
  /** Handbook, hooks, checklists — not MCPs */
  tooling: WorkflowDocLink[];
  agents: WorkflowDocLink[];
  hitlGates: string[];
  automation: string[];
  enterprise: string[];
  mistakes: string[];
  nextStage?: string;
}

export interface QuickStartRecommendation {
  title: string;
  description: string;
  href: string;
  kind: 'install' | 'prompt' | 'skill' | 'mcp' | 'hook' | 'agent' | 'workflow' | 'checklist' | 'doc';
}

export interface CommandEntry {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  keywords: string[];
  group: 'action' | 'workflow' | 'doc' | 'stack' | 'ide';
}
