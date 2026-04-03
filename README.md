# @bayendor/models-triage

GLM-first model routing and task triage for OpenClaw.

## Description
`models-triage` analyzes incoming prompts and routes them to the most efficient model by capability.

Current policy:
- Text work stays on GLM.
- GPT is reserved for image and multimodal work.
- Higher GLM tiers are used only when the task actually needs them.

## Routing tiers

| Task Type | Typical Work | Recommended Model |
| :--- | :--- | :--- |
| Low text | chat, simple lookups, short summaries | `zai/glm-4.7` |
| Medium text | scripting, reviews, multi-tool work | `zai/glm-5` or `zai/glm-5-turbo` |
| High text | architecture, deep debugging, security analysis | `zai/glm-5.1` |
| Image or multimodal | screenshots, OCR, photo analysis, diagrams | `openai-codex/gpt-5.4` |

## Why use this
- Cut GPT weekly usage for text-only work.
- Keep routing aligned with actual model capability.
- Stay efficient without losing a strong image path.

## Installation

1. Clone the repository into your skills directory:
   ```bash
   git clone https://github.com/xaspx/models-triage ~/.openclaw/workspace/skills/models-triage
   ```

2. Enable in `openclaw.json`:
   ```json
   "skills": {
     "entries": {
       "models-triage": { "enabled": true }
     }
   }
   ```

3. Restart OpenClaw:
   ```bash
   openclaw gateway restart
   ```

## Configuration
Edit `scripts/triage.js` if you want to change keyword heuristics, thresholds, or fallback order.

## License
MIT
