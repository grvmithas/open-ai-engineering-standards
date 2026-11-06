#!/usr/bin/env node

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import fs, { constants } from 'node:fs';
import {
  GOALS,
  ROLES,
  MATURITIES,
  IDES,
  MODELS,
  DATA_CLASSES,
  STACKS,
  STACK_LABELS,
  idsOf,
  normalizeIde,
  IDE_ALIASES,
  KIT_VERSION,
} from '../lib/kit-core/options.js';
import { enhanceStarterKit, generatePluginBundle, generateStarterKit } from '../lib/kit-core/generate.js';
import { applyBundle, readManifest, CONFLICT_SUFFIX, MANIFEST_FILE } from '../lib/kit-core/apply.js';
import { detectVerifyCommands } from '../lib/kit-core/repo-scan.js';
import { detectRepoSignals, stackMcpIds } from '../lib/kit-core/mcp-catalog.js';
import { choose, confirm } from '../lib/prompts.js';
import { runAudit } from '../lib/audit.js';

function printHelp() {
  console.log(`
create-aies-kit ${KIT_VERSION} — AIES harness in runtime-native paths

Usage:
  npx @grvmithas/create-aies-kit@latest
  npx @grvmithas/create-aies-kit@latest --stack nextjs --ide cursor --role fullstack --maturity intermediate --goal new-product --model claude --data-class internal --yes
  npx @grvmithas/create-aies-kit@latest enhance        rescan repo and upgrade the harness (keeps your edits; alias: upgrade)
  npx @grvmithas/create-aies-kit@latest audit          score harness conformance (--format json, --min-score 100 for CI)
  npx @grvmithas/create-aies-kit@latest fix            write missing harness files
  npx @grvmithas/create-aies-kit@latest plugin --out ./aies-plugin   Claude Code plugin bundle

Install writes:
  AGENTS.md (canonical, with this repo's detected lint/typecheck/test commands) + tool rules file
  AIES.md, MODEL_POLICY.md, implementation_plan.md
  .agents/skills/<name>/SKILL.md (open Agent Skills standard)
  native subagents + commands for the chosen runtime
  hooks/aies-guard.mjs wired into the runtime's native hook config (deny unsafe shell, writes, reads)
  evals/ (promptfoo harness evals) + templates/ci/aies-gates.yml (merge-blocking CI gates)
  scripts/aies-worktree.mjs + plans/_TASK_CONTRACT.md (parallel agents)
  empty MCP config + mcps/recommended.json (remote, OAuth; nothing enabled by default)

Re-running install or enhance never overwrites a file you edited: the new version goes to <file>.aies-new.
${MANIFEST_FILE} records what the kit wrote — commit it.

Flags:
  --stack       ${idsOf(STACKS).join(' | ')}
  --ide         ${idsOf(IDES).join(' | ')}
                aliases: ${Object.entries(IDE_ALIASES).map(([a, t]) => `${a}→${t}`).join(', ')}
  --role        ${idsOf(ROLES).join(' | ')}
  --maturity    ${idsOf(MATURITIES).join(' | ')}
  --goal        ${idsOf(GOALS).join(' | ')}
  --model       ${idsOf(MODELS).join(' | ')}
  --data-class  ${idsOf(DATA_CLASSES).join(' | ')}
  --out         Output directory for the plugin command (default ./aies-plugin)
  --force       Replace files you edited with the kit version (default: write <file>.aies-new)
  --dry-run     Print files without writing
  --yes, -y     Non-interactive when profile flags are set
  --help, -h    Show help
`);
}

function parseArgs(argv) {
  /** @type {Record<string, string | boolean>} */
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--force') out.force = true;
    else if (arg === '--dry-run') out.dryRun = true;
    else if (arg === '--yes' || arg === '-y') out.yes = true;
    else if (arg.startsWith('--') && arg.includes('=')) {
      const [k, v] = arg.slice(2).split('=');
      out[k] = v;
    } else if (arg.startsWith('--') && argv[i + 1] && !argv[i + 1].startsWith('--')) {
      out[arg.slice(2)] = argv[i + 1];
      i += 1;
    } else if (!arg.startsWith('--')) {
      out._.push(arg);
    }
  }
  return out;
}

function assertChoice(name, value, allowed) {
  if (!value) return;
  if (!allowed.includes(value)) {
    throw new Error(`Invalid --${name} "${value}". Allowed: ${allowed.join(', ')}`);
  }
}

async function pathExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function writeBundle(cwd, files, { force, dryRun }) {
  const written = [];
  const skipped = [];
  for (const [relPath, content] of Object.entries(files)) {
    const abs = join(cwd, relPath);
    const exists = await pathExists(abs);
    if (exists && !force) {
      skipped.push(relPath);
      continue;
    }
    if (dryRun) {
      written.push(relPath);
      continue;
    }
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, content, 'utf8');
    written.push(relPath);
  }
  return { written, skipped };
}

function stackIdFromLabel(label) {
  const entry = Object.entries(STACK_LABELS).find(([, v]) => v === label);
  return entry?.[0];
}

async function recoverProfile(cwd, args) {
  const dataClass = args['data-class'] || args.dataClass;
  let profile = {
    goal: args.goal,
    role: args.role,
    maturity: args.maturity,
    ide: args.ide,
    model: args.model,
    dataClass,
    stack: args.stack,
  };

  if (Object.values(profile).every(Boolean)) return profile;

  const saved = readManifest(cwd).profile;
  if (saved) {
    for (const key of Object.keys(profile)) profile[key] = profile[key] || saved[key];
    if (Object.values(profile).every(Boolean)) return profile;
  }

  try {
    const aies = await readFile(join(cwd, 'AIES.md'), 'utf8');
    const m = aies.match(
      /\*\*Profile:\*\*\s*(\S+)\s*·\s*(\S+)\s*·\s*(\S+)\s*·\s*([^*·]+?)\s*·\s*model\s*\*\*([^*]+)\*\*\s*·\s*data\s*\*\*([^*]+)\*\*/,
    );
    if (m) {
      const label = m[4].trim();
      profile = {
        goal: profile.goal || 'existing-codebase',
        role: profile.role || m[1],
        ide: profile.ide || m[2],
        maturity: profile.maturity || m[3],
        stack: profile.stack || stackIdFromLabel(label) || 'nextjs',
        model: profile.model || m[5].trim(),
        dataClass: profile.dataClass || m[6].trim(),
      };
    }
  } catch {
    // no AIES.md yet
  }

  return profile;
}

async function main() {
  const rawArgv = process.argv.slice(2);
  const cmd = rawArgv[0];
  const isAudit = cmd === 'audit';
  const isFix = cmd === 'fix';
  const isEnhance = cmd === 'enhance' || cmd === 'upgrade';
  const isPlugin = cmd === 'plugin';

  const args = parseArgs(isAudit || isFix || isEnhance || isPlugin ? rawArgv.slice(1) : rawArgv);

  if (args.help) {
    printHelp();
    return;
  }

  if (args.version || cmd === '--version' || cmd === '-v') {
    console.log(KIT_VERSION);
    return;
  }

  const cwd = resolve(process.cwd());

  if (isPlugin) {
    const out = resolve(cwd, String(args.out || 'aies-plugin'));
    const bundle = generatePluginBundle({
      stack: args.stack || 'nextjs',
      ide: 'claude-code',
      role: args.role || 'fullstack',
      maturity: args.maturity || 'intermediate',
      goal: args.goal || 'existing-codebase',
      model: args.model || 'claude',
      dataClass: args['data-class'] || 'internal',
    });
    const { written, skipped } = await writeBundle(out, bundle.files, { force: Boolean(args.force), dryRun: Boolean(args.dryRun) });
    console.log(`\nClaude Code plugin → ${out}`);
    console.log(`${args.dryRun ? 'Would write' : 'Wrote'} ${written.length} file(s); skipped ${skipped.length}.`);
    console.log('\nNext:');
    console.log(`  /plugin marketplace add ${out}`);
    console.log('  /plugin install aies@aies');
    return;
  }

  if (isAudit || isFix) {
    let profile = await recoverProfile(cwd, args);
    const minScore = args['min-score'] !== undefined ? Number(args['min-score']) : null;
    const auditRes = await runAudit(cwd, { fix: isFix, profile });
    if (minScore !== null && auditRes.score < minScore) process.exitCode = 1;

    if (args.format === 'json') {
      console.log(JSON.stringify(auditRes, null, 2));
      return;
    }

    console.log(`\n🔍 AIES Harness Conformance ${isFix ? '& Auto-Fix Engine' : 'Audit'} — ${cwd}`);
    console.log(`\nResults:`);
    for (const r of auditRes.results) {
      console.log(`  ${r.ok ? '✅' : '❌'} [${r.weight}pts] ${r.name}: ${r.msg}`);
    }

    if (auditRes.fixesApplied.length > 0) {
      console.log(`\nAuto-Fix Remediations Applied:`);
      for (const f of auditRes.fixesApplied) {
        console.log(`  🛠️ ${f}`);
      }
    }

    console.log(`\n----------------------------------------`);
    console.log(`Score: ${auditRes.score}/100 (Grade: ${auditRes.grade})`);
    console.log(`----------------------------------------`);

    if (!isFix && auditRes.score < 100) {
      console.log(`\n💡 Tip: Run "npx @grvmithas/create-aies-kit@latest fix" to create missing harness files (existing files are never overwritten).`);
    }
    if (minScore !== null && auditRes.score < minScore) {
      console.log(`\n❌ Score ${auditRes.score} is below --min-score ${minScore}.`);
    }
    return;
  }
  let profile = await recoverProfile(cwd, args);
  if (profile.ide) profile.ide = normalizeIde(profile.ide);

  assertChoice('stack', profile.stack, idsOf(STACKS));
  assertChoice('ide', profile.ide, idsOf(IDES));
  assertChoice('role', profile.role, idsOf(ROLES));
  assertChoice('maturity', profile.maturity, idsOf(MATURITIES));
  assertChoice('goal', profile.goal, idsOf(GOALS));
  assertChoice('model', profile.model, idsOf(MODELS));
  assertChoice('data-class', profile.dataClass, idsOf(DATA_CLASSES));

  const missing = Object.entries(profile).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length > 0) {
    if (args.yes) {
      throw new Error(
        `Missing required profile fields: ${missing.join(', ')}. Pass flags or run install first so AIES.md exists.`,
      );
    }
    console.log('AIES starter kit — answer a few questions (or pass flags for CI).');
    if (!profile.goal) profile.goal = await choose('What is your goal?', GOALS, 'new-product');
    if (!profile.role) profile.role = await choose('What is your role?', ROLES, 'fullstack');
    if (!profile.maturity) profile.maturity = await choose('AI experience?', MATURITIES, 'intermediate');
    if (!profile.ide) profile.ide = await choose('Which IDE?', IDES, 'cursor');
    if (!profile.model) profile.model = await choose('Primary model / provider?', MODELS, 'claude');
    if (!profile.dataClass) profile.dataClass = await choose('Data class for this project?', DATA_CLASSES, 'internal');
    if (!profile.stack) profile.stack = await choose('Technology stack?', STACKS, 'nextjs');
  }

  console.log(`\nTarget directory: ${cwd}`);
  console.log(
    `Mode: ${isEnhance ? 'enhance' : 'install'} · ${profile.stack} · ${profile.ide} · ${profile.role} · ${profile.maturity} · ${profile.model} · ${profile.dataClass}`,
  );

  if (!args.yes && !args.dryRun && !isEnhance) {
    const ok = await confirm('Write AIES harness files here?', true);
    if (!ok) {
      console.log('Cancelled.');
      process.exitCode = 1;
      return;
    }
  }

  const verify = detectVerifyCommands(cwd, fs);
  const recommendedMcpIds = [...new Set([...stackMcpIds(profile.stack), ...detectRepoSignals(cwd, fs).recommendedMcpIds])];
  const bundle = isEnhance ? enhanceStarterKit(cwd, profile) : generateStarterKit(profile, { verify, recommendedMcpIds });
  const res = applyBundle(cwd, bundle.files, {
    force: Boolean(args.force),
    dryRun: Boolean(args.dryRun),
    retired: bundle.retired,
    kitVersion: KIT_VERSION,
    profile: bundle.profile,
  });

  const list = (title, items, mark, max = 15) => {
    if (!items.length) return;
    console.log(`\n${title} (${items.length}):`);
    items.slice(0, max).forEach(f => console.log(`  ${mark} ${f}`));
    if (items.length > max) console.log(`  … +${items.length - max} more`);
  };
  const verb = args.dryRun ? 'Would ' : '';
  list(`${verb}create`, res.created, '+', args.dryRun ? 40 : 15);
  list(`${verb}update (untouched since the kit wrote them)`, res.updated, '~');
  list(`${verb}remove (retired by this kit version, untouched)`, res.removed, '-');
  list(`Kept your edits — review the new kit version in <file>${CONFLICT_SUFFIX}, merge, then delete it`, res.conflicts, '!', 40);
  list('Retired by this kit version but edited by you — left in place; delete if unused', res.kept, '?');
  console.log(`\n${res.unchanged.length} file(s) already current; ${res.customized.length} customized by you and kept (no kit change).`);

  const found = Object.keys(verify.commands);
  console.log(
    found.length
      ? `\nVerify commands detected (${verify.sources.join(', ')}): ${found.map(k => `${k} → ${verify.commands[k]}`).join(' · ')}`
      : '\nNo lint/typecheck/test commands detected — fill the "(fill in)" lines in AGENTS.md; audit fails until you do.',
  );

  const enhanceCommand = Object.keys(bundle.files).find(f => /enhance-repo/.test(f) && !f.startsWith('cookbook/'));
  const steps = ['Read AIES.md, then AGENTS.md'];
  if (res.conflicts.length) steps.push(`Merge the ${res.conflicts.length} *${CONFLICT_SUFFIX} file(s), then delete them`);
  if (enhanceCommand) steps.push(`Run the enhance-repo command (${enhanceCommand}) in your agent for conventions the scan cannot infer`);
  steps.push('Copy templates/ci/aies-gates.yml to .github/workflows/ and make its jobs required checks');
  steps.push('Commit .aies-kit.json; add *.aies-new and hooks/logs/ to .gitignore');
  steps.push('npx @grvmithas/create-aies-kit@latest audit');
  steps.push('https://www.ai-standards.dev/workflows');
  console.log('\nNext:');
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
}

main().catch(err => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
