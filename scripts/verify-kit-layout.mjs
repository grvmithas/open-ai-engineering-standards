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
  const hasInvoke = aies.includes('enhance-repo.prompt.md') && (aies.includes('@') || aies.includes('#file:') || aies.includes('Read '));
  const ephemeral = b.files['implementation_plan.md'].includes('ephemeral');
  if (missing.length || badCook.length || !hasInvoke || !ephemeral) {
    failed += 1;
    console.log('FAIL', stack, ide, { missing, badCook: badCook.length, hasInvoke, ephemeral });
  } else {
    console.log('OK', stack, ide, 'files=' + p.length);
  }
}

const demo = generateStarterKit({
  stack: 'nextjs',
  ide: 'copilot',
  role: 'architect',
  maturity: 'intermediate',
  goal: 'browse-standards',
  model: 'multi',
  dataClass: 'public',
});
console.log('---');
console.log('hooks count', Object.keys(demo.files).filter(f => f.startsWith('hooks/')).length);
console.log('agentHooks keys', Object.keys(JSON.parse(demo.files['aies-hooks.json'])).join(','));
const idx = demo.files['AIES.md'].indexOf('```text');
console.log('invoke block:\n', demo.files['AIES.md'].slice(idx, idx + 200));
process.exit(failed ? 1 : 0);
