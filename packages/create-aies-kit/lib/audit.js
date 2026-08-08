import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { constants } from 'node:fs';
import { generateStarterKit } from './kit-core/generate.js';

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function runAudit(cwd, { fix = false, profile = null } = {}) {
  const checks = [
    {
      id: 'aies-manifest',
      name: 'AIES Core Manifest (AIES.md)',
      weight: 20,
      check: async () => {
        const has = await exists(join(cwd, 'AIES.md'));
        if (!has) return { ok: false, msg: 'Missing AIES.md manifest file at repository root' };
        const content = await readFile(join(cwd, 'AIES.md'), 'utf8');
        const valid = content.includes('AI Engineering Standard') && content.includes('Profile:');
        return {
          ok: valid,
          msg: valid ? 'Valid AIES.md manifest present' : 'AIES.md exists but is missing profile declaration',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        await writeFile(join(cwd, 'AIES.md'), bundle.files['AIES.md'], 'utf8');
        return 'Generated valid AIES.md manifest';
      },
    },
    {
      id: 'agent-contract',
      name: 'Agent Operating Contract (AGENTS.md)',
      weight: 20,
      check: async () => {
        const has = await exists(join(cwd, 'AGENTS.md'));
        if (!has) return { ok: false, msg: 'Missing AGENTS.md operating contract' };
        const content = await readFile(join(cwd, 'AGENTS.md'), 'utf8');
        return {
          ok: content.length > 50,
          msg: 'Valid AGENTS.md operating contract present',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        await writeFile(join(cwd, 'AGENTS.md'), bundle.files['AGENTS.md'], 'utf8');
        return 'Generated AGENTS.md operating contract';
      },
    },
    {
      id: 'ide-rules',
      name: 'IDE Assistant Rules (CLAUDE.md / .cursorrules / .cursor/rules)',
      weight: 20,
      check: async () => {
        const hasClaude = await exists(join(cwd, 'CLAUDE.md'));
        const hasCursor = (await exists(join(cwd, '.cursorrules'))) || (await exists(join(cwd, '.cursor/rules')));
        const hasGithub = await exists(join(cwd, '.github/copilot-instructions.md'));
        const ok = hasClaude || hasCursor || hasGithub;
        return {
          ok,
          msg: ok
            ? 'IDE-native prompt instructions present'
            : 'Missing IDE instructions (CLAUDE.md, .cursorrules, or .github/copilot-instructions.md)',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        let fixed = [];
        if (bundle.files['CLAUDE.md']) {
          await writeFile(join(cwd, 'CLAUDE.md'), bundle.files['CLAUDE.md'], 'utf8');
          fixed.push('CLAUDE.md');
        }
        for (const [relPath, content] of Object.entries(bundle.files)) {
          if (relPath.startsWith('.cursor/') || relPath.startsWith('.github/')) {
            const abs = join(cwd, relPath);
            await mkdir(dirname(abs), { recursive: true });
            await writeFile(abs, content, 'utf8');
            fixed.push(relPath);
          }
        }
        return `Generated IDE instructions: ${fixed.join(', ')}`;
      },
    },
    {
      id: 'impl-plan',
      name: 'Implementation Plan & Stage Gates (implementation_plan.md)',
      weight: 15,
      check: async () => {
        const has = await exists(join(cwd, 'implementation_plan.md'));
        if (!has) return { ok: false, msg: 'Missing implementation_plan.md' };
        const content = await readFile(join(cwd, 'implementation_plan.md'), 'utf8');
        const ok = content.includes('User Review Required') || content.includes('Proposed Changes');
        return {
          ok,
          msg: ok ? 'Valid implementation plan present' : 'implementation_plan.md exists but lacks stage gate sections',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        await writeFile(join(cwd, 'implementation_plan.md'), bundle.files['implementation_plan.md'], 'utf8');
        return 'Generated implementation_plan.md template';
      },
    },
    {
      id: 'mcp-stubs',
      name: 'MCP Integration & Tool Contracts (mcps/ or MCP config)',
      weight: 15,
      check: async () => {
        const hasDir = await exists(join(cwd, 'mcps'));
        const hasFile = await exists(join(cwd, 'mcp.json')) || await exists(join(cwd, '.cursor/mcp.json'));
        const ok = hasDir || hasFile;
        return {
          ok,
          msg: ok ? 'MCP tool integration configs present' : 'Missing MCP directory or tool definitions',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        let created = 0;
        for (const [relPath, content] of Object.entries(bundle.files)) {
          if (relPath.startsWith('mcps/')) {
            const abs = join(cwd, relPath);
            await mkdir(dirname(abs), { recursive: true });
            await writeFile(abs, content, 'utf8');
            created++;
          }
        }
        return `Generated ${created} MCP tool contract stubs`;
      },
    },
    {
      id: 'cookbook-runnables',
      name: 'Cookbooks & Standard Recipes (cookbook/ or guides/)',
      weight: 10,
      check: async () => {
        const hasCookbook = await exists(join(cwd, 'cookbook'));
        const hasGuides = await exists(join(cwd, 'guides'));
        const ok = hasCookbook || hasGuides;
        return {
          ok,
          msg: ok ? 'Standard runnable cookbooks present' : 'Missing cookbook/ or guides/ directory',
        };
      },
      fixAction: async (p) => {
        const bundle = generateStarterKit(p);
        let created = 0;
        for (const [relPath, content] of Object.entries(bundle.files)) {
          if (relPath.startsWith('cookbook/') || relPath.startsWith('guides/')) {
            const abs = join(cwd, relPath);
            await mkdir(dirname(abs), { recursive: true });
            await writeFile(abs, content, 'utf8');
            created++;
          }
        }
        return `Generated ${created} cookbook recipes`;
      },
    },
  ];

  const effectiveProfile = profile || {
    goal: 'existing-codebase',
    role: 'fullstack',
    maturity: 'intermediate',
    ide: 'cursor',
    model: 'claude',
    dataClass: 'internal',
    stack: 'nextjs',
  };

  const results = [];
  const fixesApplied = [];
  let earnedWeight = 0;
  let totalWeight = 0;

  for (const checkObj of checks) {
    totalWeight += checkObj.weight;
    let res = await checkObj.check();

    if (!res.ok && fix) {
      try {
        const fixMsg = await checkObj.fixAction(effectiveProfile);
        fixesApplied.push(`${checkObj.name}: ${fixMsg}`);
        // Re-evaluate check after fix
        res = await checkObj.check();
      } catch (err) {
        fixesApplied.push(`${checkObj.name}: Fix failed — ${err.message}`);
      }
    }

    if (res.ok) {
      earnedWeight += checkObj.weight;
    }

    results.push({
      id: checkObj.id,
      name: checkObj.name,
      weight: checkObj.weight,
      ok: res.ok,
      msg: res.msg,
    });
  }

  const score = Math.round((earnedWeight / totalWeight) * 100);
  let grade = 'F';
  if (score >= 95) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';

  return {
    score,
    grade,
    earnedWeight,
    totalWeight,
    results,
    fixesApplied,
  };
}
