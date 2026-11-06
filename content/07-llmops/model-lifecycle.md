# Model Lifecycle and API Capability Matrix

> **Version:** 1.0.1
> **Last updated:** 2026-11-06
> **Status:** Normative AIES operating standard. Model rows are a dated snapshot — re-verify against provider deprecation pages before acting.

## Purpose

Keep production LLM systems working through model turnover: know which models are current, when pinned models retire, and which request parameters each model generation rejects.

## Why

Frontier models now have a useful life of about 6–12 months. In 2026 alone, providers shipped breaking parameter changes alongside new models:

- Claude Opus 5.5 rejects assistant prefill, forced `tool_choice`, `thinking: disabled`, and sampling parameters.
- `temperature`, `top_p` and `top_k` are removed in Anthropic API version `2026-10-21`.
- GPT-6 rejects `temperature`, `top_p` and `logprobs` whenever reasoning effort is not `none`.
- Gemini 4 Argon cannot turn thinking off.

A model upgrade that used to be a config change is now a code change plus an eval run. Teams that hard-code model IDs and sampling parameters find out at the provider's shutdown date, in production.

## When

| Trigger | Action |
|---|---|
| Provider deprecation notice for a pinned model | Open a migration ticket the same week; target cutover at least 30 days before shutdown |
| New model in a tier you use | Run the eval suite against it within one sprint; adopt only on eval parity or better |
| Provider API version bump | Diff the changelog against the capability matrix below; run contract tests |
| Quarterly | Re-verify every row in the deprecation calendar and the tier table |

## How

### 1. Route by tier, pin by environment

Application code asks for a **tier and effort** (`small/low`, `mid/medium`, `frontier/high`). Configuration maps each tier to a pinned model ID per environment. Never call a floating alias (`-latest`) in production — it changes behavior without a release.

### 2. Current tiers (snapshot 2026-11-06)

| Tier | Anthropic | OpenAI | Google | Typical use |
|---|---|---|---|---|
| Frontier | Claude Opus 5.5 (Fable 5.1 for hardest work) | GPT-6 Astra | Gemini 4 Argon | Complex reasoning, architecture, long-horizon agents |
| Mid | Claude Sonnet 5.5 | GPT-6.1 Sol / GPT-6.1 Terra | Gemini 3.8 Flash | Coding, RAG synthesis, most agent turns |
| Small | Claude Haiku 5.5 | GPT-6 Luna | Gemini 3.8 Flash (low thinking) | Classification, extraction, routing, guard models |

Open-weight options for self-hosting or data-residency constraints include Mistral Large 4, DeepSeek V4.1, and Qwen3.8. They go through the same eval gate as hosted models; serving, licensing, and security are covered in [Open-weight model serving](./open-weight-serving.md).

### 3. Deprecation calendar (verify before relying on it)

| Model / surface | Shutdown | Replacement |
|---|---|---|
| Claude Sonnet 4.5 | 2026-11-30 | Claude Sonnet 5.5 |
| OpenAI reusable prompt objects (`v1/prompts`), Agent Builder | 2026-11-30 | Prompts in your own registry; Responses API |
| OpenAI Evals platform | 2026-11-30 | promptfoo (OpenAI's named replacement) or Inspect AI |
| OpenAI GPT-5, o3 | 2026-12-11 | GPT-6.1 Sol / GPT-6 Astra |
| OpenAI self-serve fine-tuning (new jobs) | 2027-01-06 | Prompting + retrieval; open-weight fine-tuning |
| OpenAI GPT-4o, GPT-4.1 | 2027-01-14 | GPT-6.1 Terra / GPT-6 Luna |
| OpenAI Whisper, `tts-1`, `gpt-4o-*` audio | Jan–Feb 2027 | `gpt-transcribe`, `gpt-realtime-2.1` |
| OpenAI Assistants API | Shut down 2026-08-26 | Responses + Conversations |

### 4. API capability matrix — parameters that break on upgrade

| Capability | Claude 5.5 generation | GPT-6 generation | Gemini 4 |
|---|---|---|---|
| Reasoning control | `effort`: `low` … `max`; Opus 5.5 always thinks; `budget_tokens` rejected | `reasoning.effort`; Astra and 6.1 Sol reject `none` | `thinkingLevel`: `low/medium/high`; cannot disable |
| Sampling (`temperature`, `top_p`) | Rejected on Opus 5.5; removed in API `2026-10-21` | Rejected unless effort is `none` | Accepted; avoid tuning per prompt |
| Assistant prefill | Rejected on Opus 5.5 — use structured outputs | Not supported | Not supported |
| Forced tool choice | `any` / named tool rejected on Opus 5.5 | Supported | Supported |
| Structured output | `output_config.format` + `strict: true` tools (`output_format` deprecated) | Responses `text.format` (not `response_format`) | `responseSchema` |
| Recommended API surface | Messages | Responses (Chat Completions supported, no shutdown date) | Interactions (`generateContent` is legacy) |
| Response shape | May start with `thinking` blocks — read by type, not index; return thinking blocks unmodified in tool loops | Reasoning items must be passed back in tool loops | Thought signatures must be returned |
| Prompt caching ([standard](./cost-optimization/prompt-caching.md)) | Automatic or ≤4 breakpoints; reads 0.05–0.1×; min 512 tokens | Implicit or explicit breakpoints; TTL `30m`/`12h`; min 1,024 tokens; changing tools or effort breaks the prefix | Implicit only on Argon; min 4,096 tokens |

### 5. Upgrade procedure

1. Add the candidate model to the tier config in a non-production environment.
2. Run the request contract tests: strip parameters the matrix marks as rejected, parse responses by block type.
3. Run the full eval suite; compare task success, cost per task (including thinking and cache tokens), and p95 latency against the pinned model.
4. Canary to a small traffic slice behind a flag; watch error rate, refusal rate, and judge scores.
5. Promote, record the change in the Model Record (ID, date, eval run, approver), and keep the previous model configured for rollback until its shutdown date.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Tier-based routing with pinned IDs | Model churn is a config change with an eval gate | One more indirection; tier config must be reviewed every quarter |
| Adopting new models only on eval parity | No silent quality regressions | Slower access to new capabilities |
| Removing sampling parameters everywhere | Code works across all current generations | Lose fine control on older models that still accept them |
| Multi-provider tier map | Outage and deprecation resilience | Three sets of prompts, evals, and contracts to maintain |

## Anti-patterns

- **Hard-coded model IDs in application code.** Every deprecation becomes a code hunt across services.
- **Floating aliases in production.** `-latest` changes behavior without a release, an eval, or a changelog entry.
- **Carrying `temperature=0` forward "for determinism".** Current reasoning models reject it; determinism comes from schemas, evals, and caching, not sampling.
- **Assistant prefill to force JSON.** Rejected by Opus 5.5; use structured outputs.
- **Upgrading on benchmark headlines.** Public benchmarks (SWE-bench Verified is saturated) pick a shortlist; release decisions use your private evals. See the [benchmark citation policy](./evaluation/benchmark-citation-policy.md).
- **Waiting for the shutdown email.** Notice periods can be as short as 60 days (Anthropic) or two weeks (Google preview models).

## Enterprise considerations

- Maintain one model inventory (Model Record) per system: model ID, tier, provider, data-processing terms, region, zero-data-retention eligibility, shutdown date, owner.
- Managed agent runtimes have different data terms: OpenAI Agents API is US-only and not ZDR-eligible; Claude Managed Agents (beta) is not ZDR- or HIPAA-BAA-eligible. Check before routing regulated data.
- Structured-output schemas may be cached by the provider outside HIPAA protections; keep protected health information out of schemas.
- Model changes to high-risk EU AI Act systems can be substantial modifications; route them through change control.

## Checklist

- [ ] Application code requests tier + effort; model IDs live only in environment config
- [ ] No floating aliases in production
- [ ] Deprecation calendar reviewed this quarter; every pinned model has a cutover date before its shutdown
- [ ] Request contract tests strip rejected parameters and parse responses by block type
- [ ] Every model change has an eval run, a canary, and a Model Record entry
- [ ] Token accounting separates uncached input, cache writes, cache reads, output, and thinking tokens

## References

- [Anthropic model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations) · [Opus 5.5 migration guide](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide)
- [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations) · [Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini thinking](https://ai.google.dev/gemini-api/docs/generate-content/thinking)

Sources accessed 2026-11-06.

## Changelog

- **1.0.1 — 2026-11-06:** Linked the benchmark citation, prompt caching, and open-weight serving standards.
- **1.0.0 — 2026-11-06:** Initial standard — tier table, deprecation calendar, API capability matrix, upgrade procedure.
