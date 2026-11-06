# Open-Weight Model Serving

> **Version:** 1.0.0
> **Last updated:** 2026-11-06
> **Status:** Normative AIES operating standard. Engine versions, model specs, and licence terms are a dated snapshot. Re-verify them against the model card and licence text before every adoption.

## Purpose

Serve open-weight models (LLMs, guard models, embedders, rerankers) in production with the same release discipline as hosted APIs:

- a licence gate;
- pinned weights;
- a serving engine chosen on evidence;
- speculative decoding and scaling tuned to the workload;
- security controls that treat the weights and the endpoint as high-value assets.

## Why

Three shifts in 2026 made self-hosting a mainstream option rather than a niche one:

- **Hosted fine-tuning is closing.** OpenAI's self-serve fine-tuning stops taking new jobs on 2027-01-06. The Gemini API has no fine-tuning. Customized models increasingly mean LoRA or RL on open weights.
- **Open weights reached the frontier tier.** Mistral Large 4 (about 1T total / 52B active, 1M context, released 2026-10-29), DeepSeek V4.1 (MIT), Muse Spark Open (816B / 42B active, released 2026-10-15), and Qwen3.8 cover most mid-tier workloads.
- **Serving engines matured.** vLLM 0.33 and SGLang 0.5.23 ship production speculative decoding, prefix caching, and multi-LoRA serving.

Self-hosting done casually still fails in predictable ways:

- a licence that forbids your use case;
- weights pulled from an unpinned revision;
- GPUs at 15% utilization;
- an unauthenticated OpenAI-compatible endpoint on the internal network.

This standard makes those failures review items.

## When

| Situation | Self-host? |
|---|---|
| Data residency, sovereignty, or air-gapped deployment that no hosted region satisfies | **Yes** |
| Fine-tuned or LoRA-adapted model (hosted fine-tuning is unavailable or closing) | **Yes** |
| Small, high-volume models: guard classifiers, embedders, rerankers, routers | **Yes**; usually the cheapest first win |
| Steady high-volume mid-tier traffic where sustained GPU utilization stays above about 50% | Yes, after a cost model |
| Bursty or low-volume traffic | No. Idle GPUs cost more than API tokens. |
| Tasks that need the frontier tier's quality (hardest reasoning, long-horizon agents) | No. Use hosted frontier models through the [model lifecycle](./model-lifecycle.md) tiers. |

## How

### 1. Pass the licence gate first

| Model (snapshot 2026-11-06) | Licence | Check before adopting |
|---|---|---|
| DeepSeek V4.1 (Flash, Pro) | MIT | Export-control and sanctions screening for your jurisdiction |
| Qwen3.8 27B | Apache-2.0 | Only the 27B is confirmed Apache-2.0; verify the licence of the Max and Flash variants separately |
| Mistral Large 4 | Mistral licence | Restricts offering the model **as a service** to third parties; check your product shape with counsel |
| Muse Spark Open | Muse Model License | Acceptable-use terms and any usage thresholds; attribution requirements |
| gpt-oss-safeguard (20B / 120B) | Apache-2.0 | Policy-classifier use only; pair it with your written policy |
| Llama Guard 4, Prompt Guard 2 | Llama licence | Acceptable-use policy and attribution |
| Qwen3-Embedding-8B, Qwen3-Reranker, bge-reranker-v2-m3 | Apache-2.0 / MIT family | Verify on the model card at the pinned revision |

Record the licence, its version, and the counsel decision in the Model Record. A licence change in a later model revision is a new adoption, not an update.

### 2. Pin and verify the weights

- Pull by **commit revision**, never by branch or tag. Mirror the weights into an internal registry and verify the hashes on every deploy.
- **safetensors only.** Reject pickle (`.bin`, `.pt`) checkpoints. Run with `trust_remote_code` disabled. Models that need custom code get a code review like any other dependency.
- Store the revision, file hashes, quantization recipe, and engine version in the Model Record.

### 3. Choose the engine

| Engine | Default for | Choose it when |
|---|---|---|
| **vLLM 0.33** (default) | General serving: OpenAI-compatible server, broadest model support, multi-LoRA, automatic prefix caching, late-chunked token embeddings | Almost always: the widest model coverage and operational ecosystem |
| **SGLang 0.5.23** | Agentic and structured-output-heavy workloads with heavy prefix reuse (RadixAttention); strong MoE performance | Your own benchmark on your traffic shows at least 15% better throughput or p95 latency than vLLM |

Note the vLLM 0.33 platform change: it ships **CUDA 13 images only**, so plan driver upgrades before you upgrade the engine.

### 4. Size the hardware

```text
VRAM ≈ weights + KV cache + runtime overhead (~10%)
weights  = total_params × bytes_per_param     (MoE: ALL experts must fit, not just active params)
KV/token = 2 × layers × kv_heads × head_dim × bytes_per_element
KV cache = KV/token × max_concurrent_tokens   (concurrency × average context)
```

- A 27B dense model at FP8 needs about 27 GB of weights plus KV cache. It fits one 80 GB GPU with moderate concurrency.
- Muse Spark Open's 4-bit NVFP4 checkpoint needs about 700 GB of VRAM. That is a multi-node deployment, not a single server.
- Long context costs KV cache, not weights. Set `--max-model-len` to what the workload needs, not to the model's 1M maximum.

### 5. Quantize deliberately

| Format | Use on | Note |
|---|---|---|
| FP8 | Hopper and Blackwell | Default; near-lossless for most models |
| NVFP4 | Blackwell | Use vendor-published checkpoints where available |
| INT4 (AWQ, GPTQ) | Smaller or older GPUs | Larger quality drop; mandatory eval |

Run the full eval suite on the quantized model. A quantized model is a different model for release purposes.

### 6. Serve with pinned configuration

```bash
# vLLM — values come from the Model Record; nothing is floating
vllm serve "$MODEL_ID" \
  --revision "$MODEL_REVISION" \
  --served-model-name "$SERVED_NAME" \
  --tensor-parallel-size 2 \
  --max-model-len 131072 \
  --gpu-memory-utilization 0.90 \
  --speculative-config '{"method": "eagle3", "model": "'"$DRAFT_MODEL_ID"'", "num_speculative_tokens": 3}'
```

```bash
# SGLang equivalent
python -m sglang.launch_server \
  --model-path "$MODEL_ID" --revision "$MODEL_REVISION" \
  --tp 2 --context-length 131072 \
  --speculative-algorithm EAGLE3 --speculative-draft-model-path "$DRAFT_MODEL_ID" \
  --speculative-num-steps 3
```

Expose the engine **only** behind the AI gateway, which handles authentication, quotas, logging, and routing. The engine's own API key is not an access-control system.

### 7. Choose speculative decoding by workload

| Method | Use when | Avoid when |
|---|---|---|
| EAGLE-3 draft head | General chat and agent traffic; SGLang's recommended method; supported in vLLM | No trained draft head exists for the model |
| Native MTP | The model ships multi-token-prediction heads (DeepSeek family) | The model has no MTP heads |
| DFlash (vLLM 0.33) | Newer method; benchmark against EAGLE-3 on your traffic | You haven't measured it |
| N-gram / prompt lookup | Code editing, RAG, and summarization where output copies the input | Free-form generation |
| Medusa | — | **Removed in vLLM 0.33**; migrate to EAGLE-3 or MTP |

Speculation trades compute for latency. It wins at low to moderate batch sizes and loses throughput at high batch sizes. Measure acceptance rate and throughput under production concurrency, and reduce `num_speculative_tokens` (or disable speculation) when the server is saturated.

### 8. Scale

- **Prefix-aware routing:** route requests that share a prefix (same system prompt, same agent session) to the same replica, so the KV cache hits. This is the self-hosted equivalent of [prompt caching](./cost-optimization/prompt-caching.md).
- **Prefill/decode disaggregation:** when long prompts (agents, RAG) cause decode latency spikes for other users, run prefill and decode on separate pools that transfer the KV cache between them. Adopt it at multi-node scale, not for a single server.
- **Autoscale on queue depth and KV-cache utilization**, not CPU. Scale-up takes minutes (weight loading), so keep warm capacity for the p95 load.

### 9. Operate it like a hosted model

- The same [eval gate](./evaluation/framework-selection.md), canary, and Model Record as hosted models ([model lifecycle](./model-lifecycle.md)).
- SLOs: time to first token, inter-token latency, throughput per GPU, error rate, and speculative acceptance rate.
- Trace with the OpenTelemetry GenAI conventions ([tracing](./observability/tracing.md)). Use `gen_ai.provider.name` to identify the self-hosted deployment, and record the engine version as a resource attribute.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Self-hosting vs. a hosted API | Residency, fine-tuning, cost at steady volume, latency control | GPU capacity planning, on-call, upgrades, security of weights |
| vLLM default vs. SGLang | Widest model support and ecosystem | Leaves throughput on the table for some agentic or MoE workloads |
| FP8/NVFP4 quantization | Half or a quarter of the VRAM; faster | Requires an eval run per quantized artifact |
| Speculative decoding | Lower latency at moderate load | Extra memory; lower peak throughput under saturation |
| Prefill/decode disaggregation | Stable decode latency with long prompts | KV transfer networking; more moving parts |

## Anti-patterns

- **Adopting a model on its benchmark headline.** Run your private evals ([benchmark citation policy](./evaluation/benchmark-citation-policy.md)).
- **Pulling `main` from a model hub at deploy time.** The weights can change under you. Pin the revision and mirror it.
- **Loading pickle checkpoints or enabling `trust_remote_code` without review.** That is arbitrary code execution from a model repository.
- **Exposing the OpenAI-compatible port inside the cluster without the gateway.** Any workload can burn GPU time or extract model behavior.
- **Sizing for active parameters on MoE models.** All experts must be resident. A "42B active" model can need hundreds of gigabytes.
- **Setting max context to 1M "because the model supports it".** It reserves KV cache you never use and cuts concurrency.
- **Keeping Medusa configs through a vLLM upgrade.** Removed in 0.33; the server fails to start.

## Enterprise considerations

- **Licence governance:** counsel signs off per model and per revision. Products that expose the model to third parties need explicit review against "as a service" clauses (Mistral).
- **Security (ISO/IEC 27090 model theft and extraction):**
  - Encrypt weights at rest.
  - Restrict registry and node access.
  - Deny egress from inference pods.
  - Monitor for extraction-style query patterns at the gateway.
- **Tenant isolation:** shared prefix caches across tenants create timing side channels. Isolate caches per tenant (per-tenant replicas, or a per-request cache salt where the engine supports one) for confidential workloads.
- **Export control and sanctions:** screen model origin and deployment location as part of adoption.
- **FinOps:** report cost per million tokens at measured utilization, including idle capacity, next to the hosted-API price for the same tier.

## Checklist

- [ ] Licence reviewed and recorded per model revision; "as a service" restrictions checked against the product
- [ ] Weights pinned by revision, mirrored internally, hash-verified, safetensors only, `trust_remote_code` off
- [ ] Engine choice recorded; SGLang adoption justified by a workload benchmark
- [ ] VRAM sizing accounts for all MoE experts and the KV cache at target concurrency; `--max-model-len` set to need
- [ ] Quantized artifacts passed the full eval suite
- [ ] Speculative decoding method chosen by workload; acceptance rate and throughput measured under production load
- [ ] Endpoint reachable only through the AI gateway; inference pods have no egress
- [ ] Same eval gate, canary, Model Record, and tracing as hosted models

## References

- [vLLM speculative decoding](https://docs.vllm.ai/en/stable/features/speculative_decoding/) · [vLLM 0.33 release notes](https://freedom.tech/posts/2026-11-02-vllm-0-33-0/)
- [SGLang speculative decoding](https://github.com/sgl-project/sglang/blob/main/docs/advanced_features/speculative_decoding.md)
- [Mistral Large 4](https://docs.mistral.ai/models/mistral-large-4) · [Muse Spark Open](https://research.meta.ai/blog/muse-spark-open) · [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing/)
- [OpenAI reinforcement fine-tuning status](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning)

Sources accessed 2026-11-06. The Qwen3.8 variant licences and some open-weight specs come from secondary sources; confirm them on the model card.

## Changelog

- **1.0.0 — 2026-11-06:** Initial standard. Covers the self-hosting decision, licence matrix, weight pinning, engine selection (vLLM 0.33, SGLang 0.5.23), sizing, quantization, speculative decoding (Medusa removal), scaling, security, and operations.
