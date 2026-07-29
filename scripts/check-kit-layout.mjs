import { generateStarterKit } from '../packages/kit-core/lib/generate.js';

const combos = [
  ['nextjs', 'copilot'],
  ['python', 'cursor'],
  ['java', 'claude-code'],
  ['dotnet', 'vscode'],
  ['react', 'windsurf'],
  ['nodejs', 'continue'],
];

let failed = 0;
for (const [stack, ide] of combos) {
  const b = generateStarterKit({
    stack,
    ide,
    role: 'architect',
    maturity: 'intermediate',
    goal: 'existing-codebase',
    model: 'multi',
    dataClass: 'internal',
  });
  const p = Object.keys(b.files);
  const need = [
    'plans/README.md',
    'plans/_TEMPLATE.md',
    'reviews/README.md',
    'reviews/_TEMPLATE.md',
    'hooks/pre-code.hook.sh',
    'hooks/README.md',
    'hooks/CONTRACT.md',
    'implementation_plan.md',
  ];
  const missing = need.filter(n => !p.includes(n));
  const badCook = p.filter(x => x.includes('/cookbook/') && !x.startsWith('cookbook/'));
  const aies = b.files['AIES.md'];
  const hasInvoke =
    aies.includes('enhance-repo.prompt.md') &&
    (aies.includes('@') || aies.includes('#file:') || aies.includes('Read '));
  const ephemeral = b.files['implementation_plan.md'].includes('ephemeral');
  if (missing.length || badCook.length || !hasInvoke || !ephemeral) {
    failed += 1;
    console.log('FAIL', stack, ide, { missing, badCook: badCook.length, hasInvoke, ephemeral });
  } else {
    console.log('OK', stack, ide, 'files=' + p.length);
  }
}

process.exitCode = failed ? 1 : 0;
