export const SITE_URL = 'https://www.ai-standards.dev';

export const GOALS = [
  { id: 'new-product', label: 'Build a new product' },
  { id: 'existing-codebase', label: 'Join an existing codebase' },
  { id: 'legacy-modernize', label: 'Modernize legacy software' },
  { id: 'learn', label: 'Learn AI Engineering' },
  { id: 'browse-standards', label: 'Browse standards' },
  { id: 'explore-examples', label: 'Explore examples' },
];

export const ROLES = [
  { id: 'product-manager', label: 'Product Manager' },
  { id: 'architect', label: 'Architect' },
  { id: 'frontend', label: 'Frontend Developer' },
  { id: 'backend', label: 'Backend Developer' },
  { id: 'fullstack', label: 'Full Stack Engineer' },
  { id: 'qa', label: 'QA Engineer' },
  { id: 'devops', label: 'DevOps Engineer' },
  { id: 'engineering-manager', label: 'Engineering Manager' },
  { id: 'ai-engineer', label: 'AI Engineer' },
];

export const MATURITIES = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'enterprise', label: 'Enterprise transformation' },
];

export const IDES = [
  { id: 'cursor', label: 'Cursor' },
  { id: 'copilot', label: 'GitHub Copilot' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'vscode', label: 'VS Code' },
  { id: 'windsurf', label: 'Windsurf' },
  { id: 'continue', label: 'Continue' },
];

export const MODELS = [
  { id: 'claude', label: 'Claude (Anthropic)' },
  { id: 'gpt', label: 'GPT (OpenAI)' },
  { id: 'gemini', label: 'Gemini (Google)' },
  { id: 'multi', label: 'Multi-model / gateway' },
  { id: 'local', label: 'Local / open-weight' },
  { id: 'undecided', label: 'Undecided' },
];

export const DATA_CLASSES = [
  { id: 'public', label: 'Public' },
  { id: 'internal', label: 'Internal' },
  { id: 'confidential', label: 'Confidential / regulated' },
];

export const STACKS = [
  { id: 'react', label: 'React', skillKey: 'skills/react.skill.md', cookbook: 'react' },
  { id: 'nextjs', label: 'Next.js', skillKey: 'skills/nextjs.skill.md', cookbook: 'nextjs' },
  { id: 'react-native', label: 'React Native', skillKey: 'skills/react-native.skill.md', cookbook: 'react-native' },
  { id: 'nodejs', label: 'Node.js', skillKey: 'skills/node.skill.md', cookbook: 'node' },
  { id: 'nestjs', label: 'NestJS', skillKey: 'skills/node.skill.md', cookbook: 'node' },
  { id: 'python', label: 'Python', skillKey: 'skills/python.skill.md', cookbook: 'python' },
  { id: 'fastapi', label: 'FastAPI', skillKey: 'skills/python.skill.md', cookbook: 'python' },
  { id: 'java', label: 'Java', skillKey: 'skills/java.skill.md', cookbook: 'java' },
  { id: 'dotnet', label: '.NET', skillKey: 'skills/dotnet.skill.md', cookbook: 'dotnet' },
];

export const STACK_LABELS = Object.fromEntries(STACKS.map(s => [s.id, s.label]));

export function idsOf(list) {
  return list.map(item => item.id);
}
