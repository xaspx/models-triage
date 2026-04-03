# Model Triage Configuration

Use a GLM-first policy for text, and reserve GPT for image or multimodal work.

## Recommended tiers
- Low text: `zai/glm-4.7`
- Medium text: `zai/glm-5` or `zai/glm-5-turbo`
- High text: `zai/glm-5.1`
- Image or multimodal: `openai-codex/gpt-5.4`

## Customization
- Edit `scripts/triage.js` to change keyword mapping or thresholds.
- Keep GPT as the image path unless you add another image-capable provider.
- Keep GLM variants ahead of GPT in text-only fallback chains.

## Provider setup
Configure auth profiles for `zai` and `openai-codex` in OpenClaw. Never commit real keys or secrets.
