# React Cookbook

> **Stack:** React 18+ with TypeScript
> **Focus:** Component generation, hooks, state management, testing

---

## When to Use This Cookbook

This cookbook covers AI-assisted React development. Use it when:
- Generating new React components (functional, with TypeScript)
- Reviewing existing React components for correctness and performance
- Debugging React rendering issues, hook violations, or state problems
- Optimizing React performance (unnecessary re-renders, bundle size, code splitting)
- Migrating from class components to functional components

---

## Architecture Context

This cookbook assumes:
- React 18+ (concurrent features available)
- TypeScript (strict mode)
- Functional components (no class components for new code)
- Custom hooks for reusable logic
- No assumption about state management library (see specific sections for Redux, Zustand, Jotai)

---

## Prompts

### Generate Component Prompt

```xml
<role>
You are a senior React engineer specializing in TypeScript, React 18,
and production-grade component design.

You write components that are: type-safe, accessible, performant, testable,
and follow React's mental model precisely.

You do NOT use class components.
You do NOT use implicit any.
You do NOT add dependencies not already in the project.
</role>

<context>
<project_stack>
React {{REACT_VERSION}} | TypeScript {{TS_VERSION}} | {{STATE_LIBRARY}} | {{TESTING_LIBRARY}}
</project_stack>

<existing_patterns>
{{PASTE_SIMILAR_COMPONENT_OR_DESCRIPTION_OF_PATTERNS}}
</existing_patterns>

<component_request>
{{COMPONENT_DESCRIPTION}}
</component_request>
</context>

<instructions>
Think through the component design inside <thinking></thinking> tags:
1. What props does this component need? (required vs. optional)
2. What internal state, if any?
3. What effects, if any? (specify dependencies carefully)
4. What accessibility attributes are required?
5. What are the render performance concerns?

Then produce the component.
</instructions>

<output_format>
Produce the following files:

1. **ComponentName.tsx** — The component
2. **ComponentName.test.tsx** — Tests (React Testing Library)
3. **ComponentName.stories.tsx** — Storybook story (if Storybook is in the project)

Each file should be complete and runnable.
</output_format>

<constraints>
MUST:
- Use TypeScript with explicit prop types (no `React.FC<any>`)
- Include ARIA attributes for interactive elements
- Handle loading, error, and empty states
- Export the component as a named export (not default)
- Include at least 3 test cases

MUST NOT:
- Use `useEffect` for derived state (use `useMemo` or compute inline)
- Suppress TypeScript errors with `@ts-ignore`
- Use inline styles (use CSS modules or styled-components per project convention)
- Access DOM directly without `useRef`
</constraints>
```

---

### Debug Component Prompt

```xml
<role>
You are a React debugging expert. You diagnose component issues systematically
using React DevTools mental models, React's rules of hooks, and rendering behavior.
</role>

<context>
<component_code>
{{PASTE_COMPONENT_CODE}}
</component_code>

<error_or_symptom>
{{DESCRIBE_WHAT_IS_WRONG}}
</error_or_symptom>

<console_output>
{{PASTE_CONSOLE_ERRORS_OR_WARNINGS}}
</console_output>
</context>

<instructions>
Inside <thinking></thinking> tags:
1. Check for Rules of Hooks violations (conditional hooks, hooks in loops)
2. Check for stale closures (useEffect with missing dependencies)
3. Check for unnecessary re-renders (missing React.memo, unstable references)
4. Check for key prop issues in lists
5. Check for memory leaks (effect cleanup)
6. Identify the root cause
</instructions>

<output_format>
## Root Cause
[One sentence — the precise cause]

## Evidence
[Where in the code you found it]

## Fix
```tsx
// The corrected code
```

## Prevention
[What pattern prevents this class of error]
</output_format>
```

---

## Debug Workflows

### 10 Most Common React Errors

| Error | Root Cause | Fix |
|-------|-----------|-----|
| `Rendered more hooks than previous render` | Conditional `useEffect` or `useState` | Move hooks to top level, remove conditionals |
| `Too many re-renders` | State update in render or in effect without deps | Add deps array, check for circular state updates |
| `Cannot read property of undefined` | Accessing nested state before it's initialized | Use optional chaining `?.` or initialize with defaults |
| `Key prop missing in list` | Missing `key` on elements in `.map()` | Add unique `key` prop to each list item |
| `Memory leak: update on unmounted component` | Async operation completing after unmount | Return cleanup function from `useEffect` |
| `Infinite render loop` | Effect dependency that changes every render | Use `useCallback`/`useMemo` for object/function deps |
| `Cannot update during render` | `setState` called during render phase | Move to `useEffect` or event handler |
| `Context value is undefined` | `useContext` outside Provider | Verify Provider wraps the component tree |
| `Objects are not valid React children` | Rendering a plain object | Use `.toString()`, JSON.stringify, or map to elements |
| `Unique key violation` | Using index as key with reordering | Use stable, unique IDs as keys |

### Debugging Re-Render Performance

```tsx
// Step 1: Add render counting (development only)
import { useRef } from 'react';
function useRenderCount(componentName: string) {
  const count = useRef(0);
  count.current += 1;
  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} rendered ${count.current} times`);
  }
}

// Step 2: Use React DevTools Profiler
// In DevTools → Profiler → Record → Interact → Stop
// Look for: components that render when nothing in them changed

// Step 3: Common fix — memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // Only recreate when id changes

// Step 4: Common fix — memoize expensive computations
const sortedItems = useMemo(() => {
  return items.sort(compareFn);
}, [items]); // Only recompute when items change

// Step 5: Common fix — memoize component
const ExpensiveChild = React.memo(({ data }: Props) => {
  return <div>{/* complex render */}</div>;
}); // Only re-render when props actually change
```

---

## Architecture Patterns

### Component Hierarchy Pattern (OAIES Standard for React)

```
feature/
├── index.ts                  ← Public API — only export what's needed
├── FeaturePage.tsx           ← Page component (routing, layout)
├── FeatureContainer.tsx      ← Data fetching, state management
├── FeaturePresenter.tsx      ← Pure UI, no data fetching
├── components/               ← Sub-components
│   ├── FeatureHeader.tsx
│   └── FeatureItem.tsx
├── hooks/
│   ├── useFeatureData.ts     ← Data fetching hook
│   └── useFeatureState.ts    ← Local state management
├── types.ts                  ← TypeScript interfaces for this feature
└── __tests__/
    ├── FeaturePage.test.tsx
    └── FeaturePresenter.test.tsx
```

**Rule:** Page components don't fetch data. Container components don't render UI. Presenter components don't have side effects.

---

## Checklist

### Code Review Checklist (React-Specific)
- [ ] No conditional hooks
- [ ] All `useEffect` deps arrays correct (run `eslint-plugin-react-hooks`)
- [ ] No direct DOM manipulation (use refs)
- [ ] All interactive elements keyboard accessible
- [ ] All images have alt text
- [ ] No inline functions passed as props to expensive children (memoize)
- [ ] Lists have stable, unique keys
- [ ] Effects clean up subscriptions, timers, and async operations
- [ ] No prop drilling more than 2 levels (use Context or state management)
- [ ] Component has a test for at least: render, interaction, edge case

### Performance Checklist (React-Specific)
- [ ] Bundle analyzer run — no unexpected large dependencies
- [ ] Code splitting at route level
- [ ] Images lazy loaded
- [ ] Lists virtualized if > 100 items
- [ ] No synchronous operations in render path
- [ ] React DevTools Profiler run — no unnecessary re-renders
