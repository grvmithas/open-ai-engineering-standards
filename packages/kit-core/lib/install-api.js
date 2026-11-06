/**
 * Client-safe kit helpers — no node:fs, safe for Next.js client components.
 *
 * Layout contract (kit 2.x):
 * - Cross-tool canon, always written: AGENTS.md, .agents/skills/<name>/SKILL.md, plans/, reviews/, hooks/
 * - Primary-IDE native files: subagents, commands, hook wiring, MCP config — each in the exact path
 *   and format that IDE loads. Nothing is written to a path the target does not read.
 * - Repo-root shared dirs: cookbook, guides, mcps, templates, policy (never nested under an IDE folder)
 */
import { SITE_URL, normalizeIde } from './options.js';

const SHARED = {
  cookbookBase: 'cookbook',
  guidesDir: 'guides',
  mcpsDir: 'mcps',
  templatesDir: 'templates',
  policyFile: 'MODEL_POLICY.md',
  skillsDir: '.agents/skills',
};

/**
 * Per-target emitter table. Formats are interpreted by generate.js renderers.
 * @type {Record<string, object>}
 */
const TARGETS = {
  cursor: {
    root: '.cursor',
    rulesFile: '.cursor/rules/aies.mdc',
    commandsDir: '.cursor/commands',
    commandFormat: 'plain-md',
    agentsDir: '.cursor/agents',
    agentFormat: 'cursor',
    skillMirrorDir: null,
    hooksFile: '.cursor/hooks.json',
    hookFormat: 'cursor',
    mcpFile: '.cursor/mcp.json',
    mcpFormat: 'cursor',
  },
  'claude-code': {
    root: '.claude',
    rulesFile: 'CLAUDE.md',
    commandsDir: '.claude/commands',
    commandFormat: 'described-md',
    agentsDir: '.claude/agents',
    agentFormat: 'claude',
    skillMirrorDir: '.claude/skills',
    hooksFile: '.claude/settings.json',
    hookFormat: 'claude',
    mcpFile: '.mcp.json',
    mcpFormat: 'portable',
  },
  copilot: {
    root: '.github',
    rulesFile: '.github/copilot-instructions.md',
    commandsDir: '.github/prompts',
    commandFormat: 'copilot-prompt',
    agentsDir: '.github/agents',
    agentFormat: 'copilot',
    skillMirrorDir: null,
    hooksFile: '.github/hooks/aies-guard.json',
    hookFormat: 'copilot',
    mcpFile: '.mcp.json',
    mcpFormat: 'portable',
  },
  codex: {
    root: '.codex',
    rulesFile: null,
    commandsDir: 'prompts',
    commandFormat: 'plain-md',
    agentsDir: '.codex/agents',
    agentFormat: 'codex',
    skillMirrorDir: null,
    hooksFile: '.codex/hooks.json',
    hookFormat: 'codex',
    mcpFile: '.codex/config.toml',
    mcpFormat: 'codex',
  },
  'gemini-cli': {
    root: '.gemini',
    rulesFile: null,
    commandsDir: '.gemini/commands/aies',
    commandFormat: 'gemini-toml',
    agentsDir: '.gemini/agents',
    agentFormat: 'gemini',
    skillMirrorDir: null,
    hooksFile: '.gemini/settings.json',
    hookFormat: 'gemini',
    mcpFile: '.gemini/settings.json',
    mcpFormat: 'gemini',
  },
  kiro: {
    root: '.kiro',
    rulesFile: '.kiro/steering/aies.md',
    commandsDir: '.kiro/steering',
    commandFormat: 'kiro-steering',
    agentsDir: null,
    agentFormat: null,
    skillMirrorDir: '.kiro/skills',
    hooksFile: '.kiro/hooks/aies-guard.json',
    hookFormat: 'kiro',
    mcpFile: '.kiro/settings/mcp.json',
    mcpFormat: 'cursor',
  },
  windsurf: {
    root: '.devin',
    rulesFile: '.devin/rules/aies.md',
    commandsDir: '.devin/skills',
    commandFormat: 'skill',
    agentsDir: null,
    agentFormat: null,
    skillMirrorDir: null,
    hooksFile: '.devin/hooks.v1.json',
    hookFormat: 'devin',
    mcpFile: '.devin/mcp_config.json',
    mcpFormat: 'portable',
  },
  opencode: {
    root: '.opencode',
    rulesFile: null,
    commandsDir: '.opencode/commands',
    commandFormat: 'described-md',
    agentsDir: '.opencode/agents',
    agentFormat: 'opencode',
    skillMirrorDir: null,
    hooksFile: '.opencode/plugins/aies-guard.js',
    hookFormat: 'opencode',
    mcpFile: 'opencode.json',
    mcpFormat: 'opencode',
  },
  continue: {
    root: '.continue',
    rulesFile: '.continue/rules/aies.md',
    commandsDir: '.continue/prompts',
    commandFormat: 'continue-prompt',
    agentsDir: null,
    agentFormat: null,
    skillMirrorDir: null,
    hooksFile: null,
    hookFormat: null,
    mcpFile: '.continue/mcpServers/aies.json',
    mcpFormat: 'portable',
  },
};

export const SUPPORTED_TARGETS = Object.keys(TARGETS);

/**
 * @param {string} ide
 * @param {{ cookbookId?: string | null }} [opts]
 */
export function layoutFor(ide, opts = {}) {
  const id = normalizeIde(ide);
  const target = TARGETS[id] ?? TARGETS.copilot;
  const cookbookId = opts.cookbookId ?? null;
  return {
    ide: TARGETS[id] ? id : 'copilot',
    ...SHARED,
    ...target,
    promptsDir: target.commandsDir,
    cookbookDir: cookbookId ? `${SHARED.cookbookBase}/${cookbookId}` : SHARED.cookbookBase,
  };
}

export function describeInstallLayout(ide, opts = {}) {
  const L = layoutFor(ide, opts);
  return {
    rootFiles: [
      'AIES.md',
      'AGENTS.md',
      'implementation_plan.md',
      'MODEL_POLICY.md',
      ...(L.ide === 'claude-code' ? ['CLAUDE.md'] : []),
    ],
    ideRoot: L.root,
    ideOnly: [L.commandsDir, L.agentsDir, L.skillMirrorDir].filter(Boolean),
    sharedRoot: [L.skillsDir, L.cookbookDir, L.guidesDir, L.mcpsDir, L.templatesDir, 'plans', 'reviews', 'hooks'],
    rulesFile: L.rulesFile ?? 'AGENTS.md',
    skillsDir: L.skillsDir,
    promptsDir: L.commandsDir,
    cookbookDir: L.cookbookDir,
    guidesDir: L.guidesDir,
    agentsDir: L.agentsDir ?? '(AGENTS.md roles — target has no project subagents)',
    mcpsDir: L.mcpsDir,
    templatesDir: L.templatesDir,
    mcpFile: L.mcpFile,
    policyFile: L.policyFile,
    hooksFile: L.hooksFile ?? 'hooks/ (CI evidence gates — target has no native hooks)',
  };
}

export function buildInstallQuery(profile) {
  return new URLSearchParams({
    stack: profile.stack,
    ide: normalizeIde(profile.ide),
    role: profile.role,
    maturity: profile.maturity,
    goal: profile.goal,
    model: profile.model ?? 'undecided',
    dataClass: profile.dataClass ?? 'internal',
  }).toString();
}

export function getInstallCommands(profile) {
  const q = buildInstallQuery(profile);
  const flags = [
    `--stack ${profile.stack}`,
    `--ide ${normalizeIde(profile.ide)}`,
    `--role ${profile.role}`,
    `--maturity ${profile.maturity}`,
    `--goal ${profile.goal}`,
    `--model ${profile.model ?? 'undecided'}`,
    `--data-class ${profile.dataClass ?? 'internal'}`,
    '--yes',
  ].join(' ');
  return {
    npx: `npx @grvmithas/create-aies-kit@latest ${flags}`,
    enhance: 'npx @grvmithas/create-aies-kit@latest enhance',
    powershell: `irm "${SITE_URL}/api/kit?${q}&shell=ps1" | iex`,
    bash: `curl -fsSL "${SITE_URL}/api/kit?${q}&shell=bash" | bash`,
  };
}
