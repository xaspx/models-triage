# Model Triage Configuration

To use `models-triage` effectively, define your preferred models for each complexity level.

## Recommended Tiers

- **Low Complexity**: Fast, cheap models like `openai-codex/gpt-5.4-mini`.
- **Medium Complexity**: Reliable all-rounders like `openai-codex/gpt-5.4`.
- **High Complexity**: Large reasoning models like `openai-codex/gpt-5.4`.

## Customization

You can edit `scripts/triage.js` to change the keyword mapping or thresholds.

## Environment Variables

Ensure your `.env` contains the relevant API keys for the providers you choose.
