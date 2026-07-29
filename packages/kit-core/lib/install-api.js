/**
 * Client-safe kit helpers — no node:fs, safe for Next.js client components.
 *
 * Layout contract:
 * - IDE root (.cursor / .github / .claude / …) = prompts + skills + agents (+ IDE rules/MCP config)
 * - Repo root shared dirs = cookbook, guides, mcps, templates, policy (never nest these under .github)
 */
import { SITE_URL } from './options.js';

/** Shared repo-root paths — identical for every IDE. */
const SHARED = {
  cookbookBase: 'cookbook',
  guidesDir: 'guides',
  mcpsDir: 'mcps',
  templatesDir: 'templates',
  policyFile: 'MODEL_POLICY.md',
  hooksFile: 'aies-hooks.json',
};

/**
 * @param {string} ide
 * @param {{ cookbookId?: string | null }} [opts]
 */
export function layoutFor(ide, opts = {}) {
  const cookbookId = opts.cookbookId ?? null;
  const cookbookDir = cookbookId ? `${SHARED.cookbookBase}/${cookbookId}` : SHARED.cookbookBase;

  switch (ide) {
    case 'cursor':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.cursor',
        rulesFile: '.cursor/rules/aies.mdc',
        skillsDir: '.cursor/skills',
        skillStyle: 'cursor-skill',
        promptsDir: '.cursor/prompts',
        agentsDir: '.cursor/agents',
        mcpFile: '.cursor/mcp.json',
        hooksFile: '.cursor/aies-hooks.json',
      };
    case 'copilot':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.github',
        rulesFile: '.github/copilot-instructions.md',
        skillsDir: '.github/skills',
        skillStyle: 'flat',
        promptsDir: '.github/prompts',
        agentsDir: '.github/agents',
        // Copilot discovery only under .github — MCP config at repo root
        mcpFile: '.mcp.json',
      };
    case 'claude-code':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.claude',
        rulesFile: 'CLAUDE.md',
        skillsDir: '.claude/skills',
        skillStyle: 'cursor-skill',
        promptsDir: '.claude/prompts',
        agentsDir: '.claude/agents',
        mcpFile: '.mcp.json',
      };
    case 'vscode':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.vscode',
        rulesFile: '.vscode/aies-instructions.md',
        skillsDir: '.vscode/skills',
        skillStyle: 'flat',
        promptsDir: '.vscode/prompts',
        agentsDir: '.vscode/agents',
        mcpFile: '.vscode/mcp.json',
      };
    case 'windsurf':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.windsurf',
        rulesFile: '.windsurfrules',
        skillsDir: '.windsurf/skills',
        skillStyle: 'flat',
        promptsDir: '.windsurf/prompts',
        agentsDir: '.windsurf/agents',
        mcpFile: '.windsurf/mcp.json',
      };
    case 'continue':
      return {
        ide,
        ...SHARED,
        cookbookDir,
        root: '.continue',
        rulesFile: '.continue/aies-context.md',
        skillsDir: '.continue/skills',
        skillStyle: 'flat',
        promptsDir: '.continue/prompts',
        agentsDir: '.continue/agents',
        mcpFile: '.continue/mcp.json',
      };
    default:
      return layoutFor('vscode', opts);
  }
}

export function describeInstallLayout(ide, opts = {}) {
  const L = layoutFor(ide, opts);
  return {
    rootFiles: [
      'AIES.md',
      'implementation_plan.md',
      'CLAUDE.md',
      'AGENTS.md',
      'copilot-instructions.md',
      'MODEL_POLICY.md',
      'aies-hooks.json',
    ],
    ideRoot: L.root,
    ideOnly: [L.promptsDir, L.skillsDir, L.agentsDir],
    sharedRoot: [L.cookbookDir, L.guidesDir, L.mcpsDir, L.templatesDir],
    rulesFile: L.rulesFile,
    skillsDir: L.skillsDir,
    promptsDir: L.promptsDir,
    cookbookDir: L.cookbookDir,
    guidesDir: L.guidesDir,
    agentsDir: L.agentsDir,
    mcpsDir: L.mcpsDir,
    templatesDir: L.templatesDir,
    mcpFile: L.mcpFile,
    policyFile: L.policyFile,
    hooksFile: L.hooksFile,
  };
}

export function buildInstallQuery(profile) {
  return new URLSearchParams({
    stack: profile.stack,
    ide: profile.ide,
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
    `--ide ${profile.ide}`,
    `--role ${profile.role}`,
    `--maturity ${profile.maturity}`,
    `--goal ${profile.goal}`,
    `--model ${profile.model ?? 'undecided'}`,
    `--data-class ${profile.dataClass ?? 'internal'}`,
    '--yes',
  ].join(' ');
  return {
    npx: `npx @grvmithas/create-aies-kit ${flags}`,
    enhance: 'npx @grvmithas/create-aies-kit enhance',
    powershell: `irm "${SITE_URL}/api/kit?${q}&shell=ps1" | iex`,
    bash: `curl -fsSL "${SITE_URL}/api/kit?${q}&shell=bash" | bash`,
  };
}
