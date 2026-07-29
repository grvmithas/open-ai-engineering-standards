#!/usr/bin/env node

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { constants } from 'node:fs';
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
} from '../lib/kit-core/options.js';
import { enhanceStarterKit, generateStarterKit, layoutFor } from '../lib/kit-core/generate.js';
import { choose, confirm } from '../lib/prompts.js';

function printHelp() {
  console.log(`
create-aies-kit — complete AIES harness in IDE-native paths (no .aies/)

Usage:
  npx @grvmithas/create-aies-kit
  npx @grvmithas/create-aies-kit --stack nextjs --ide cursor --role fullstack --maturity intermediate --goal new-product --model claude --data-class internal --yes
  npx @grvmithas/create-aies-kit enhance

Install writes: AIES.md, implementation_plan.md, CLAUDE.md, AGENTS.md,
IDE prompts/skills/agents under .cursor | .github | .claude | …
plus repo-root cookbook/, guides/, mcps/, templates/ (never under .github/cookbook).


After install, run enhance (no --yes needed) to scan the repo and refresh MCP recommendations, then
run the enhance-repo prompt in your IDE.

Flags:
  --stack       ${idsOf(STACKS).join(' | ')}
  --ide         ${idsOf(IDES).join(' | ')}
  --role        ${idsOf(ROLES).join(' | ')}
  --maturity    ${idsOf(MATURITIES).join(' | ')}
  --goal        ${idsOf(GOALS).join(' | ')}
  --model       ${idsOf(MODELS).join(' | ')}
  --data-class  ${idsOf(DATA_CLASSES).join(' | ')}
  --force       Overwrite existing files
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
  const isEnhance = rawArgv[0] === 'enhance';
  const args = parseArgs(isEnhance ? rawArgv.slice(1) : rawArgv);

  if (args.help) {
    printHelp();
    return;
  }

  const cwd = resolve(process.cwd());
  let profile = await recoverProfile(cwd, args);

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

  const bundle = isEnhance ? enhanceStarterKit(cwd, profile) : generateStarterKit(profile);
  // enhance always overwrites generated harness files so MCP recommendations refresh
  const force = Boolean(args.force) || isEnhance;
  const { written, skipped } = await writeBundle(cwd, bundle.files, {
    force,
    dryRun: Boolean(args.dryRun),
  });

  if (args.dryRun) {
    console.log(`\nDry run — would write ${written.length} file(s):`);
    written.slice(0, 40).forEach(f => console.log(`  ${f}`));
    if (written.length > 40) console.log(`  … +${written.length - 40} more`);
  } else {
    console.log(`\nWrote ${written.length} file(s).`);
    written.slice(0, 25).forEach(f => console.log(`  ✓ ${f}`));
    if (written.length > 25) console.log(`  … +${written.length - 25} more`);
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} existing file(s) (use --force):`);
    skipped.slice(0, 10).forEach(f => console.log(`  · ${f}`));
  }

  const L = layoutFor(profile.ide);
  console.log('\nNext:');
  console.log('  1. Read AIES.md');
  if (!isEnhance) {
    console.log('  2. npx @grvmithas/create-aies-kit enhance');
  }
  console.log(`  ${isEnhance ? '2' : '3'}. Run ${L.promptsDir}/enhance-repo.prompt.md in your IDE agent`);
  console.log(`  ${isEnhance ? '3' : '4'}. Fill implementation_plan.md`);
  console.log(`  ${isEnhance ? '4' : '5'}. https://www.ai-standards.dev/workflows`);
}

main().catch(err => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
