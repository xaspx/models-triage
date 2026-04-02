# Model Triage Configuration

To use `models-triage` effectively, define your preferred models for each complexity level.

## Recommended Tiers

- **Low Complexity**: Fast, cheap models like `gemini-3.1-flash-lite-preview`.
- **Medium Complexity**: Reliable all-rounders like `gemini-3-flash-preview`.
- **High Complexity**: Large reasoning models like `gemini-3.1-pro-preview` or `claude-3-5-sonnet-20241022`.

## Customization

You can edit `scripts/triage.js` to change the keyword mapping or thresholds.

## Environment Variables

Ensure your `.env` contains the relevant API keys for the providers you choose.
