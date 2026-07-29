import { NextRequest, NextResponse } from 'next/server';
import {
  generateStarterKit,
  renderBashInstallScript,
  renderPowerShellInstallScript,
} from '../../../../packages/kit-core/lib/generate.js';
import type {
  AiMaturity,
  DataClass,
  ModelProvider,
  TechStack,
  UserGoal,
  UserIde,
  UserProfile,
  UserRole,
} from '@/lib/workflows/types';
import {
  DATA_CLASSES,
  GOALS,
  IDES,
  MATURITIES,
  MODELS,
  ROLES,
  STACKS,
} from '@/lib/workflows/catalog';

export const runtime = 'nodejs';

function isOneOf<T extends string>(value: string | null, allowed: readonly T[]): value is T {
  return value !== null && (allowed as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const stack = searchParams.get('stack');
  const ide = searchParams.get('ide');
  const role = searchParams.get('role');
  const maturity = searchParams.get('maturity');
  const goal = searchParams.get('goal');
  const modelParam = searchParams.get('model');
  const dataClassParam = searchParams.get('dataClass') ?? searchParams.get('data-class');
  const shell = (searchParams.get('shell') ?? 'bash').toLowerCase();
  const format = (searchParams.get('format') ?? 'script').toLowerCase();

  const stackIds = STACKS.map(s => s.id);
  const ideIds = IDES.map(i => i.id);
  const roleIds = ROLES.map(r => r.id);
  const maturityIds = MATURITIES.map(m => m.id);
  const goalIds = GOALS.map(g => g.id);
  const modelIds = MODELS.map(m => m.id);
  const dataClassIds = DATA_CLASSES.map(d => d.id);

  if (
    !isOneOf(stack, stackIds) ||
    !isOneOf(ide, ideIds) ||
    !isOneOf(role, roleIds) ||
    !isOneOf(maturity, maturityIds) ||
    !isOneOf(goal, goalIds)
  ) {
    return NextResponse.json(
      {
        error: 'Missing or invalid profile params',
        required: ['stack', 'ide', 'role', 'maturity', 'goal'],
        optional: ['model', 'dataClass'],
        example:
          '/api/kit?stack=nextjs&ide=cursor&role=fullstack&maturity=intermediate&goal=new-product&model=claude&dataClass=internal&shell=ps1',
      },
      { status: 400 },
    );
  }

  // Prefer validating when present; default for backward compat with older install links
  const model: ModelProvider = isOneOf(modelParam, modelIds)
    ? modelParam
    : 'undecided';
  const dataClass: DataClass = isOneOf(dataClassParam, dataClassIds)
    ? dataClassParam
    : 'internal';

  if (
    (modelParam !== null && !isOneOf(modelParam, modelIds)) ||
    (dataClassParam !== null && !isOneOf(dataClassParam, dataClassIds))
  ) {
    return NextResponse.json(
      {
        error: 'Invalid model or dataClass',
        allowed: { model: modelIds, dataClass: dataClassIds },
      },
      { status: 400 },
    );
  }

  const profile: UserProfile = {
    stack: stack as TechStack,
    ide: ide as UserIde,
    role: role as UserRole,
    maturity: maturity as AiMaturity,
    goal: goal as UserGoal,
    model,
    dataClass,
    completedAt: new Date().toISOString(),
  };

  const bundle = generateStarterKit(profile);

  if (format === 'json') {
    return NextResponse.json(bundle, {
      headers: {
        'Content-Disposition': `attachment; filename="aies-${bundle.stack}-starter-kit.json"`,
      },
    });
  }

  const script =
    shell === 'ps1' || shell === 'powershell'
      ? renderPowerShellInstallScript(bundle)
      : renderBashInstallScript(bundle);

  return new NextResponse(script, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-AIES-Kit-Stack': bundle.stack,
      'X-AIES-Kit-Ide': profile.ide,
    },
  });
}
