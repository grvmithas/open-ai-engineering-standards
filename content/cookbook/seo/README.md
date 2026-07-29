# SEO Cookbook

> **Stack:** Modern Web App frameworks (Next.js, React, HTML5)
> **Focus:** Search visibility, structured schema (JSON-LD), Core Web Vitals, dynamic metadata generation, and AI-assisted content optimization

---

## When to Use This Cookbook

Use this cookbook when using AI to:
- Generate metadata (titles, descriptions, OpenGraph, Twitter cards) for public pages
- Create JSON-LD structured schemas (Organization, Article, Breadcrumb, FAQ)
- Optimize pages for Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift)
- Audit semantic markup (correct heading hierarchy, responsive images, alt text)
- Automate SEO regression tests in CI pipelines

---

## Architecture Context

This cookbook assumes:
- Modern semantic HTML5 markup
- Next.js (App Router or Pages Router) or custom metadata injection hooks
- Strict compliance with search engine guidelines (no keyword stuffing, valid JSON-LD schemas)
- Performance-centric frontend architectures to support Core Web Vitals SLOs

---

## Prompts

### SEO Meta & Schema Generator Prompt

```xml
<role>
You are an expert SEO architect and frontend engineer. You specialize in generating highly performant, semantically correct meta tags, social share graphics tags, and schema.org JSON-LD scripts that comply with modern Google Search, Twitter, and Facebook schema guidelines.
</role>

<context>
<page_details>
URL: {{CANONICAL_URL}}
Title Idea: {{TITLE_IDEA}}
Description Idea: {{DESCRIPTION_IDEA}}
Page Type: {{PAGE_TYPE}} (e.g., Article, Product, Organization, FAQ)
Target Keywords: {{TARGET_KEYWORDS}}
Related Images: {{IMAGE_URLS}}
</page_details>

<existing_tech_stack>
{{NEXTJS_APP_ROUTER_OR_VANILLA_HTML}}
</existing_tech_stack>
</context>

<instructions>
Think through the metadata requirements inside <thinking></thinking> tags:
1. What title tag length is ideal (50-60 characters) and how can we naturally include the primary keyword?
2. What meta description length is ideal (140-160 characters) to avoid truncation?
3. What JSON-LD schemas are appropriate for this page type?
4. What OpenGraph (Facebook) and Twitter card tags are required for sharing?

Then output the metadata objects or scripts.
</instructions>

<output_format>
Produce the following outputs:
1. **Next.js Metadata Object** (if using Next.js) or **HTML Meta Tags snippet**
2. **JSON-LD Script** tag containing valid Schema.org structure
3. **Verification Checklist** for testing the generated outputs
</output_format>

<constraints>
MUST:
- Keep title tags between 50 and 60 characters
- Keep meta descriptions between 120 and 155 characters
- Set explicit absolute URLs for OgImage and Canonical fields
- Escape quotes correctly inside the JSON-LD string
- Include BreadcrumbList structure for deep pages

MUST NOT:
- Use relative paths for OpenGraph images
- Include duplicate canonical tags or multiple h1 tags on a page
</constraints>
```

---

### SEO Semantic Auditor Prompt

```xml
<role>
You are a technical SEO auditor. You review HTML code and structures to find accessibility and indexability violations.
</role>

<context>
<page_html>
{{PASTE_PAGE_HTML_OR_JSX}}
</page_html>
</context>

<instructions>
Audit the input code inside <thinking></thinking> tags against:
1. Heading hierarchy (Exactly one h1, sequential headers)
2. Image optimization (Alt attributes, width/height to avoid Cumulative Layout Shift)
3. Link indexability (Proper href attributes, no dynamic javascript onClick navigation instead of links)
4. Mobile friendliness (viewport settings, touch target spacing)
5. Readability (contrast, language declarations)
</instructions>

<output_format>
## SEO Auditor Findings

| Category | Finding | Severity | Proposed Fix |
|----------|---------|----------|--------------|
| [e.g. Headings] | [Describe issue] | [High/Medium/Low] | [Show code diff] |

## Remediation Code
Provide the updated React component or HTML layout with the SEO issues resolved.
</output_format>
```

---

## Debug Workflows

### Common SEO Deployment Errors

| Error | Root Cause | Fix |
|-------|-----------|-----|
| `Duplicate Canonical Tags` | Head template rendering canonical dynamically alongside static tags | Unify canonical tag generation; remove hardcoded tags |
| `Unescaped JSON-LD Characters` | Raw strings inside JSON-LD containing double quotes causing parser crashes | Stringify the schema payload using `JSON.stringify()` or escape special characters |
| `Multiple H1 Tags` | Reusing header components that contain h1 tags on the same page | Refactor sub-headers to use h2/h3; reserve h1 for page title |
| `Cumulative Layout Shift (CLS)` | Images missing width/height attributes, causing layouts to jump on load | Add explicit height/width attributes or utilize Next.js Image component |
| `Non-crawlable Client Nav` | Button-based route pushes (`router.push`) instead of standard anchor tags | Replace with `<Link href="...">` or standard `<a href="...">` tags to allow crawler discovery |

### Next.js Dynamic Metadata Generation Pattern

```tsx
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Employs Next.js App Router dynamic metadata API for robust crawling
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetch(`https://api.example.com/items/${slug}`).then(r => r.json());

  const title = `${data.title} | Company Name`;
  const description = data.summary || 'Default description here.';
  const pageUrl = `https://example.com/items/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: data.coverImage || 'https://example.com/default-og.jpg',
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [data.coverImage || 'https://example.com/default-og.jpg'],
    },
  };
}

export default function Page() {
  return <main>...</main>;
}
```

---

## Checklist

### SEO Code Review Checklist
- [ ] Exactly one `<h1>` tag present on the page
- [ ] Canonical URL is absolute and matches the primary hostname
- [ ] No `href` attribute is empty or set to javascript-only actions
- [ ] All images have a descriptive `alt` attribute
- [ ] JSON-LD structured schema validates correctly using schema validators
- [ ] Dynamic meta tags generate valid output without null/undefined fields
- [ ] Core Web Vitals checks pass local thresholds (CLS < 0.1, LCP < 2.5s)
