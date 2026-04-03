---
name: models-triage
description: GLM-first model routing for OpenClaw. Use when selecting the most efficient model for a prompt, updating routing policy, reducing GPT quota burn, or reserving GPT only for image and multimodal tasks.
---

# Models Triage

Route prompts by modality first, then by complexity.

## Routing policy
- Keep text tasks on GLM by default.
- Reserve GPT models for image or multimodal work.
- Prefer the cheapest capable model before escalating.

## Recommended tiers
- Low text → `zai/glm-4.7`
- Medium text → `zai/glm-5` or `zai/glm-5-turbo` when speed matters
- High text → `zai/glm-5.1`
- Image or multimodal → `openai-codex/gpt-5.4` with `openai-codex/gpt-5.4-mini` fallback

## Protocol
1. Run `scripts/triage.js` on the user prompt.
2. If the result is text, stay in the GLM family unless there is a hard capability reason not to.
3. If the result is image or multimodal, switch to GPT.
4. Use the returned fallback order if the primary model is unavailable.

## Notes
- Keep GPT weekly quota protected by avoiding GPT for text-only work.
- Treat `zai/glm-4.7` as the default operating tier for routine chat and lightweight tasks.
- Treat `zai/glm-5.1` as the strongest text reasoning tier in the current stack.
