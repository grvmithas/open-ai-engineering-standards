/**
 * Detect a repository's own verification commands so AGENTS.md states real gates, not placeholders.
 * Read-only: inspects manifests and lockfiles, never executes project code.
 */
import path from 'node:path';

export const VERIFY_KEYS = ['lint', 'typecheck', 'test', 'build'];

const NPM_DEFAULT_TEST = /no test specified/i;

function nodeRunner(exists) {
  if (exists('pnpm-lock.yaml')) return { name: 'pnpm', run: s => `pnpm ${s}`, test: 'pnpm test', exec: 'pnpm exec' };
  if (exists('yarn.lock')) return { name: 'yarn', run: s => `yarn ${s}`, test: 'yarn test', exec: 'yarn' };
  if (exists('bun.lock') || exists('bun.lockb')) return { name: 'bun', run: s => `bun run ${s}`, test: 'bun run test', exec: 'bunx' };
  return { name: 'npm', run: s => `npm run ${s}`, test: 'npm test', exec: 'npx' };
}

function firstScript(scripts, names) {
  return names.find(n => typeof scripts[n] === 'string' && scripts[n].trim());
}

function detectNode(exists, read) {
  let pkg;
  try {
    pkg = JSON.parse(read('package.json'));
  } catch {
    return null;
  }
  const scripts = pkg.scripts ?? {};
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const r = nodeRunner(exists);
  const out = {};

  const lint = firstScript(scripts, ['lint', 'lint:check', 'eslint', 'biome:check', 'check:lint']);
  if (lint) out.lint = r.run(lint);
  else if (deps['@biomejs/biome']) out.lint = `${r.exec} biome check .`;

  const typecheck = firstScript(scripts, ['typecheck', 'type-check', 'check-types', 'types:check', 'tsc']);
  if (typecheck) out.typecheck = r.run(typecheck);
  else if (deps.typescript && exists('tsconfig.json')) out.typecheck = `${r.exec} tsc --noEmit`;

  if (scripts.test && !NPM_DEFAULT_TEST.test(scripts.test)) out.test = r.test;
  else {
    const alt = firstScript(scripts, ['test:unit', 'vitest', 'jest']);
    if (alt) out.test = r.run(alt);
  }

  if (scripts.build) out.build = r.run('build');
  return { commands: out, source: `package.json scripts (${r.name})` };
}

function detectPython(exists, read) {
  const pyproject = read('pyproject.toml');
  const reqs = read('requirements.txt') + read('requirements-dev.txt') + read('requirements/dev.txt');
  if (!pyproject && !reqs && !exists('setup.py')) return null;
  const all = `${pyproject}\n${reqs}`;
  const prefix = exists('uv.lock') ? 'uv run ' : exists('poetry.lock') ? 'poetry run ' : exists('pdm.lock') ? 'pdm run ' : '';
  const has = re => re.test(all);
  const dep = name => new RegExp(`\\[tool\\.${name}\\b|(^|["'\\s,\\[])${name}([<>=~!\\[;\\s"',\\]]|$)`, 'm').test(all);
  const out = {};
  if (dep('ruff')) out.lint = `${prefix}ruff check .`;
  else if (dep('flake8')) out.lint = `${prefix}flake8`;
  if (dep('mypy')) out.typecheck = `${prefix}mypy .`;
  else if (dep('pyright')) out.typecheck = `${prefix}pyright`;
  if (dep('pytest') || has(/\[tool\.pytest/) || exists('pytest.ini') || exists('tests')) out.test = `${prefix}pytest`;
  const tool = prefix ? prefix.trim().split(' ')[0] : 'pip';
  return { commands: out, source: `Python project (${tool})` };
}

function detectJvm(exists) {
  if (exists('mvnw') || exists('pom.xml')) {
    const mvn = exists('mvnw') ? './mvnw -B' : 'mvn -B';
    return { commands: { typecheck: `${mvn} -q test-compile`, test: `${mvn} verify`, build: `${mvn} -DskipTests package` }, source: 'Maven' };
  }
  if (exists('gradlew') || exists('build.gradle') || exists('build.gradle.kts')) {
    const g = exists('gradlew') ? './gradlew' : 'gradle';
    return {
      commands: { lint: `${g} check -x test`, typecheck: `${g} testClasses`, test: `${g} test`, build: `${g} build -x test` },
      source: 'Gradle',
    };
  }
  return null;
}

function detectDotnet(listRoot) {
  const entries = listRoot();
  const target = entries.find(f => f.endsWith('.sln') || f.endsWith('.slnx')) ?? entries.find(f => f.endsWith('.csproj'));
  if (!target) return null;
  return {
    commands: {
      lint: `dotnet format ${target} --verify-no-changes`,
      typecheck: `dotnet build ${target} -warnaserror`,
      test: `dotnet test ${target}`,
    },
    source: '.NET',
  };
}

function detectGo(exists) {
  if (!exists('go.mod')) return null;
  return { commands: { lint: 'go vet ./...', typecheck: 'go build ./...', test: 'go test ./...' }, source: 'Go modules' };
}

function detectMake(read) {
  const makefile = read('Makefile');
  if (!makefile) return null;
  const add = {};
  for (const key of VERIFY_KEYS) {
    if (new RegExp(`^${key}:`, 'm').test(makefile)) add[key] = `make ${key}`;
  }
  return Object.keys(add).length ? { commands: add, source: 'Makefile targets' } : null;
}

/**
 * @param {string} cwd
 * @param {{ existsSync: Function, readFileSync: Function, readdirSync?: Function }} fs
 * @returns {{ commands: Partial<Record<'lint'|'typecheck'|'test'|'build', string>>, sources: string[] }}
 */
export function detectVerifyCommands(cwd, fs) {
  const exists = rel => fs.existsSync(path.join(cwd, rel));
  const read = rel => {
    try {
      return fs.readFileSync(path.join(cwd, rel), 'utf8');
    } catch {
      return '';
    }
  };
  const listRoot = () => {
    try {
      return fs.readdirSync ? fs.readdirSync(cwd) : [];
    } catch {
      return [];
    }
  };

  const commands = {};
  const sources = [];
  const merge = found => {
    if (!found) return;
    let used = false;
    for (const [k, v] of Object.entries(found.commands)) {
      if (!commands[k] && v) {
        commands[k] = v;
        used = true;
      }
    }
    if (used) sources.push(found.source);
  };

  // Explicit project scripts first, then commands inferred from the toolchain.
  if (exists('package.json')) merge(detectNode(exists, read));
  merge(detectMake(read));
  merge(detectPython(exists, read));
  merge(detectJvm(exists));
  merge(detectDotnet(listRoot));
  merge(detectGo(exists));
  return { commands, sources };
}
