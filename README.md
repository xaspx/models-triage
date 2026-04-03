# @bayendor/models-triage

Intelligent model routing and task triage for OpenClaw.

## Description
`models-triage` acts as an automated routing layer for your OpenClaw agent. It analyzes the complexity of every incoming prompt and dynamically routes the task to the most suitable LLM, optimizing performance and cost.

## Why Use This?
- **Cost Efficiency**: Handle routine tasks with lightweight models (e.g., Flash Lite) and reserve expensive models only for complex tasks.
- **Improved Performance**: Ensures complex requests (coding, architectural analysis) are handled by models with high reasoning capabilities.
- **Seamless Integration**: Works out-of-the-box with OpenClaw sub-agent orchestration.

## Complexity Classification

| Complexity | Typical Tasks | Recommended Model |
| :--- | :--- | :--- |
| **🟢 Low** | Greetings, simple lookups, brief summaries. | `openai-codex/gpt-5.4-mini` |
| **🟡 Medium** | Scripting, basic debugging, tool coordination. | `openai-codex/gpt-5.4-mini` |
| **🔴 High** | Architectural design, security audits, deep reasoning. | `openai-codex/gpt-5.4` |

## Installation

1. **Clone the repository** into your skills directory:
   ```bash
   git clone https://github.com/xaspx/models-triage ~/.openclaw/workspace/skills/models-triage
   ```

2. **Enable in `openclaw.json`**:
   ```json
   "skills": {
     "entries": {
       "models-triage": { "enabled": true }
     }
   }
   ```

3. **Restart OpenClaw**:
   ```bash
   openclaw gateway restart
   ```

## Configuration
Ensure your preferred model providers are configured in `openclaw.json` under `models.providers`. The triage logic references model IDs defined there.

## License
MIT
