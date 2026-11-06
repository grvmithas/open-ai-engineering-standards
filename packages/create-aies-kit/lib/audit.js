import { access, readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import fs, { constants } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { generateStarterKit, layoutFor, VERIFY_PLACEHOLDER } from './kit-core/generate.js';
import { normalizeIde } from './kit-core/options.js';
import { detectVerifyCommands } from './kit-core/repo-scan.js';
import { CONFLICT_SUFFIX } from './kit-core/apply.js';

/** Hook formats whose completion event can refuse "done" (see hooks/aies-done.mjs). */
const DONE_HOOK_FORMATS = new Set(['claude', 'cursor', 'codex', 'gemini', 'devin']);

const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'out', 'coverage', '.venv', 'venv', 'target', 'bin', 'obj']);

/** Paths (relative) of files under cwd whose name ends with `suffix`, bounded depth. */
async function findBySuffix(cwd, suffix, dir = '', depth = 0, out = []) {
  if (depth > 6) return out;
  let entries = [];
  try {
    entries = await readdir(join(cwd, dir), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) await findBySuffix(cwd, suffix, rel, depth + 1, out);
    } else if (e.name.endsWith(suffix)) {
      out.push(rel);
    }
  }
  return out;
}

function verifySection(agentsMd) {
  return agentsMd.match(/## Verify before claiming done([\s\S]*?)(\n## |$)/)?.[1] ?? '';
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function read(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return '';
  }
}

/** Write bundle files matching `predicate` that do not already exist — fixes never overwrite user edits. */
async function writeMissing(cwd, profile, predicate) {
  const bundle = generateStarterKit(profile, { verify: detectVerifyCommands(cwd, fs) });
  const created = [];
  for (const [relPath, content] of Object.entries(bundle.files)) {
    if (!predicate(relPath)) continue;
    const abs = join(cwd, relPath);
    if (await exists(abs)) continue;
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, content, 'utf8');
    created.push(relPath);
  }
  return created.length ? `Created ${created.length} file(s): ${created.slice(0, 6).join(', ')}${created.length > 6 ? ', …' : ''}` : 'Nothing to create';
}

export async function runAudit(cwd, { fix = false, profile = null } = {}) {
  const effectiveProfile = {
    goal: 'existing-codebase',
    role: 'fullstack',
    maturity: 'intermediate',
    ide: 'cursor',
    model: 'claude',
    dataClass: 'internal',
    stack: 'nextjs',
    ...Object.fromEntries(Object.entries(profile ?? {}).filter(([, v]) => v)),
  };
  effectiveProfile.ide = normalizeIde(effectiveProfile.ide);
  const L = layoutFor(effectiveProfile.ide);

  const checks = [
    {
      id: 'aies-manifest',
      name: 'AIES manifest (AIES.md)',
      weight: 10,
      check: async () => {
        const content = await read(join(cwd, 'AIES.md'));
        if (!content) return { ok: false, msg: 'Missing AIES.md at repository root' };
        const ok = content.includes('Profile:');
        return { ok, msg: ok ? 'AIES.md declares a profile' : 'AIES.md is missing the profile declaration' };
      },
      fixAction: p => writeMissing(cwd, p, f => f === 'AIES.md'),
    },
    {
      id: 'agents-md',
      name: 'Canonical instructions (AGENTS.md)',
      weight: 15,
      check: async () => {
        const content = await read(join(cwd, 'AGENTS.md'));
        if (!content) return { ok: false, msg: 'Missing AGENTS.md — the cross-runtime instruction file' };
        const lines = content.split('\n').length;
        if (lines > 300) return { ok: false, msg: `AGENTS.md is ${lines} lines; keep it under 300 and move procedures into skills` };
        return { ok: true, msg: `AGENTS.md present (${lines} lines)` };
      },
      fixAction: p => writeMissing(cwd, p, f => f === 'AGENTS.md'),
    },
    {
      id: 'verify-commands',
      name: 'Verify commands declared (AGENTS.md)',
      weight: 10,
      check: async () => {
        const section = verifySection(await read(join(cwd, 'AGENTS.md')));
        if (!section) return { ok: false, msg: 'AGENTS.md has no "Verify before claiming done" section — agents cannot prove completion' };
        const open = [...section.matchAll(/^#\s*(\w+)\s*→\s*\(fill in\)/gm)].map(m => m[1]);
        if (open.length) return { ok: false, msg: `Placeholder verify command(s): ${open.join(', ')} — replace with the exact command or "none"` };
        return { ok: true, msg: 'Verify commands declared' };
      },
      fixAction: async () => {
        const path = join(cwd, 'AGENTS.md');
        const md = await read(path);
        const { commands } = detectVerifyCommands(cwd, fs);
        let filled = 0;
        const patched = md.replace(/^#\s*(\w+)\s*→\s*\(fill in\)\s*$/gm, (line, key) => {
          if (!commands[key]) return line;
          filled += 1;
          return `${commands[key]}  # ${key}`;
        });
        if (filled) await writeFile(path, patched, 'utf8');
        return filled ? `Filled ${filled} detected command(s)` : `Nothing detected — edit the ${VERIFY_PLACEHOLDER} lines by hand`;
      },
    },
    {
      id: 'rules-file',
      name: `Runtime rules file (${L.rulesFile ?? 'AGENTS.md'})`,
      weight: 10,
      check: async () => {
        if (!L.rulesFile || L.rulesFile === 'AGENTS.md') return { ok: true, msg: `${effectiveProfile.ide} reads AGENTS.md directly` };
        const content = await read(join(cwd, L.rulesFile));
        if (!content) return { ok: false, msg: `Missing ${L.rulesFile}` };
        if (L.rulesFile === 'CLAUDE.md' && !content.includes('@AGENTS.md')) {
          return { ok: false, msg: 'CLAUDE.md does not import @AGENTS.md — instructions will drift' };
        }
        return { ok: true, msg: `${L.rulesFile} present` };
      },
      fixAction: p => writeMissing(cwd, p, f => f === L.rulesFile),
    },
    {
      id: 'skills',
      name: 'Agent Skills (.agents/skills/*/SKILL.md)',
      weight: 15,
      check: async () => {
        const dir = join(cwd, '.agents/skills');
        if (!(await exists(dir))) return { ok: false, msg: 'Missing .agents/skills — skills are not discoverable by any runtime' };
        const names = (await readdir(dir, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name);
        const bad = [];
        for (const name of names) {
          const md = await read(join(dir, name, 'SKILL.md'));
          const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
          if (!new RegExp(`^name:\\s*["']?${name}["']?\\s*$`, 'm').test(fm) || !/^description:/m.test(fm)) bad.push(name);
        }
        if (!names.length) return { ok: false, msg: '.agents/skills is empty' };
        return bad.length
          ? { ok: false, msg: `Skills with missing/mismatched name or description: ${bad.join(', ')}` }
          : { ok: true, msg: `${names.length} valid skill(s)` };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('.agents/skills/') || (L.skillMirrorDir && f.startsWith(`${L.skillMirrorDir}/`))),
    },
    {
      id: 'native-agents',
      name: 'Native subagents and commands',
      weight: 10,
      check: async () => {
        const hasCommands = await exists(join(cwd, L.commandsDir));
        const hasAgents = !L.agentsDir || (await exists(join(cwd, L.agentsDir)));
        const ok = hasCommands && hasAgents;
        return {
          ok,
          msg: ok ? `${L.commandsDir}${L.agentsDir ? ` and ${L.agentsDir}` : ''} present` : `Missing ${!hasCommands ? L.commandsDir : L.agentsDir}`,
        };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith(`${L.commandsDir}/`) || (L.agentsDir && f.startsWith(`${L.agentsDir}/`))),
    },
    {
      id: 'native-hooks',
      name: 'Enforcing hooks (guard wired into the runtime)',
      weight: 15,
      check: async () => {
        const guard = join(cwd, 'hooks/aies-guard.mjs');
        if (!(await exists(guard))) return { ok: false, msg: 'Missing hooks/aies-guard.mjs' };
        const run = spawnSync(process.execPath, [guard, '--self-test'], { cwd, input: '', encoding: 'utf8', timeout: 15000 });
        if (!/self-test: \d+ cases passed/.test(run.stdout ?? '')) {
          const why = /self-test:/.test(run.stdout ?? '') ? (run.stderr || run.stdout).trim().split('\n')[0] : 'guard predates --self-test — run enhance';
          return { ok: false, msg: `Guard self-test failed: ${why}` };
        }
        if (!L.hooksFile) return { ok: true, msg: `Guard self-test passed; ${effectiveProfile.ide} has no native hook API — enforce via CI` };
        const cfg = await read(join(cwd, L.hooksFile));
        const ok = cfg.includes('aies-guard.mjs');
        return {
          ok,
          msg: ok ? `Guard self-test passed; ${L.hooksFile} invokes it` : `${L.hooksFile} does not invoke hooks/aies-guard.mjs — guard is advisory only`,
        };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('hooks/') || f === L.hooksFile),
    },
    {
      id: 'done-gate',
      name: 'Definition-of-done gate (agent cannot finish on failing checks)',
      weight: 10,
      check: async () => {
        if (!(await exists(join(cwd, 'hooks/aies-done.mjs')))) return { ok: false, msg: 'Missing hooks/aies-done.mjs — run enhance' };
        let commands = [];
        try {
          commands = JSON.parse(await read(join(cwd, 'hooks/aies-done.json'))).commands ?? [];
        } catch {
          return { ok: false, msg: 'hooks/aies-done.json missing or not valid JSON' };
        }
        if (!commands.length) return { ok: false, msg: 'hooks/aies-done.json lists no commands — the gate allows every completion' };
        if (!DONE_HOOK_FORMATS.has(L.hookFormat)) return { ok: true, msg: `${commands.length} command(s); ${effectiveProfile.ide} has no blocking completion hook — the CI verify job is the gate` };
        const wired = (await read(join(cwd, L.hooksFile))).includes('aies-done.mjs');
        return { ok: wired, msg: wired ? `${commands.length} command(s) gate completion via ${L.hooksFile}` : `${L.hooksFile} does not invoke hooks/aies-done.mjs` };
      },
      fixAction: async p => {
        const path = join(cwd, 'hooks/aies-done.json');
        const raw = await read(path);
        let cfg = null;
        try {
          cfg = raw ? JSON.parse(raw) : null;
        } catch {
          return 'hooks/aies-done.json is invalid JSON — fix it by hand';
        }
        if (cfg && !cfg.commands?.length) {
          const { commands } = detectVerifyCommands(cwd, fs);
          const detected = ['lint', 'typecheck', 'test'].map(k => commands[k]).filter(Boolean);
          if (!detected.length) return `Nothing detected — add commands to hooks/aies-done.json by hand`;
          await writeFile(path, `${JSON.stringify({ ...cfg, commands: detected }, null, 2)}\n`, 'utf8');
          return `Filled ${detected.length} detected command(s)`;
        }
        return writeMissing(cwd, p, f => f === 'hooks/aies-done.mjs' || f === 'hooks/aies-done.json');
      },
    },
    {
      id: 'plans',
      name: 'Ephemeral plans and task contracts',
      weight: 10,
      check: async () => {
        const hasTemplate = await exists(join(cwd, 'plans/_TEMPLATE.md'));
        const hasContract = await exists(join(cwd, 'plans/_TASK_CONTRACT.md'));
        const index = await read(join(cwd, 'implementation_plan.md'));
        const ok = hasTemplate && hasContract && /ephemeral/i.test(index);
        return {
          ok,
          msg: ok ? 'Plan template, task contract, and ephemeral index present' : 'Missing plans/_TEMPLATE.md, plans/_TASK_CONTRACT.md, or ephemeral implementation_plan.md',
        };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('plans/') || f.startsWith('reviews/') || f === 'implementation_plan.md' || f === 'scripts/aies-worktree.mjs'),
    },
    {
      id: 'mcp',
      name: 'MCP hygiene (config present, nothing enabled by default)',
      weight: 10,
      check: async () => {
        const recommended = await exists(join(cwd, 'mcps/recommended.json'));
        if (!recommended) return { ok: false, msg: 'Missing mcps/recommended.json' };
        if (!L.mcpFile || L.mcpFile.endsWith('.toml')) return { ok: true, msg: 'MCP recommendations present' };
        const raw = await read(join(cwd, L.mcpFile));
        if (!raw) return { ok: false, msg: `Missing ${L.mcpFile}` };
        try {
          const cfg = JSON.parse(raw);
          const servers = cfg.mcpServers ?? cfg.mcp ?? cfg.servers ?? {};
          const tokens = JSON.stringify(servers).match(/(ghp_|github_pat_|sk-[A-Za-z0-9]{20}|xox[bp]-)/);
          if (tokens) return { ok: false, msg: `${L.mcpFile} contains a literal credential — use OAuth or env refs` };
          return { ok: true, msg: `${L.mcpFile} valid (${Object.keys(servers).length} server(s) enabled)` };
        } catch {
          return { ok: false, msg: `${L.mcpFile} is not valid JSON` };
        }
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('mcps/') || f === L.mcpFile),
    },
    {
      id: 'evals',
      name: 'Eval gate (evals/promptfooconfig.yaml)',
      weight: 10,
      check: async () => {
        const cfg = await read(join(cwd, 'evals/promptfooconfig.yaml'));
        if (!cfg) return { ok: false, msg: 'Missing evals/promptfooconfig.yaml — behavior changes have no regression gate' };
        const tests = (cfg.match(/^\s*- description:/gm) ?? []).length + (cfg.match(/^\s*- file:\/\/cases/gm) ?? []).length;
        if (!/^providers:/m.test(cfg) || !tests) return { ok: false, msg: 'evals/promptfooconfig.yaml has no provider or no tests' };
        return { ok: true, msg: `${tests} eval case(s) configured` };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('evals/')),
    },
    {
      id: 'hygiene',
      name: 'No unmerged kit updates or unwired scripts',
      weight: 5,
      check: async () => {
        const pending = await findBySuffix(cwd, CONFLICT_SUFFIX);
        if (pending.length) return { ok: false, msg: `Unmerged kit updates: ${pending.slice(0, 4).join(', ')}${pending.length > 4 ? ', …' : ''}` };
        let legacy = [];
        try {
          legacy = (await readdir(join(cwd, 'hooks'))).filter(f => f.endsWith('.hook.sh'));
        } catch {
          legacy = [];
        }
        if (legacy.length) {
          const wiringFiles = ['package.json', 'lefthook.yml', '.pre-commit-config.yaml', '.husky/pre-commit', '.husky/pre-push'];
          let wiring = (await Promise.all(wiringFiles.map(f => read(join(cwd, f))))).join('\n');
          try {
            for (const wf of await readdir(join(cwd, '.github/workflows'))) wiring += await read(join(cwd, '.github/workflows', wf));
          } catch {
            // no workflows
          }
          const unwired = legacy.filter(f => !wiring.includes(f));
          if (unwired.length) return { ok: false, msg: `hooks/${unwired[0]}${unwired.length > 1 ? ` and ${unwired.length - 1} more` : ''} not run by any git hook or CI — wire or delete (enhance removes untouched copies)` };
        }
        return { ok: true, msg: 'No pending *.aies-new files; every hook script is wired' };
      },
      fixAction: async () => 'Merge or delete *.aies-new files and unwired hooks/*.hook.sh by hand',
    },
    {
      id: 'reference',
      name: 'Reference material (cookbook/, guides/)',
      weight: 5,
      check: async () => {
        const ok = (await exists(join(cwd, 'cookbook'))) || (await exists(join(cwd, 'guides')));
        return { ok, msg: ok ? 'Cookbook/guides present' : 'Missing cookbook/ and guides/' };
      },
      fixAction: p => writeMissing(cwd, p, f => f.startsWith('cookbook/') || f.startsWith('guides/')),
    },
  ];

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
        res = await checkObj.check();
      } catch (err) {
        fixesApplied.push(`${checkObj.name}: Fix failed — ${err.message}`);
      }
    }

    if (res.ok) earnedWeight += checkObj.weight;
    results.push({ id: checkObj.id, name: checkObj.name, weight: checkObj.weight, ok: res.ok, msg: res.msg });
  }

  const score = Math.round((earnedWeight / totalWeight) * 100);
  let grade = 'F';
  if (score >= 95) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';

  return { score, grade, earnedWeight, totalWeight, results, fixesApplied };
}
