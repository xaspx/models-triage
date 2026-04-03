---
name: models-triage
description: "Intelligent model routing and task triage for OpenClaw."
metadata:
  {
    "openclaw": {
      "emoji": "🧠",
      "tags": ["routing", "intelligence", "triage"]
    }
  }
---

# Skill: Models Triage 🧠⚡

Automatically routes user prompts to the most suitable model based on complexity, optimizing cost without sacrificing quality.

## Description
This skill acts as an intelligent routing layer. It allows the agent to start in a low-cost "Triage Mode" (e.g., using GPT-5.4 mini) and escalate complex tasks to a higher-reasoning model (GPT-5.4) via sub-agents.

## Complexity Classification

### 🟢 LOW (Handle Locally)
- Casual conversation, greetings, and small talk.
- Simple status checks (system health, time, simple file reads).
- Short summaries of provided text.
- Formatting existing data.
- **Model**: `openai-codex/gpt-5.4-mini`.

### 🟡 MEDIUM (Keep on Mini)
- Writing or refactoring scripts/code.
- Detailed system analysis or audits.
- Searching and synthesizing information from the web or multiple files.
- Managing multiple tools in a sequence.
- **Model Override**: `openai-codex/gpt-5.4-mini`

### 🔴 HIGH (Escalate to GPT-5.4)
- Complex software architecture design.
- Deep logical reasoning or multi-step strategy.
- High-stakes security audits.
- Deep debugging of complex system errors.
- **Model Override**: `openai-codex/gpt-5.4`

## Triage Protocol (SOUL Integration)

1. **Analyze**: On every user input, identify the complexity level (🟢/🟡/🔴).
2. **Decide**:
   - If 🟢: Respond immediately using the current session.
   - If 🟡 or 🔴: Do NOT attempt to solve the problem yourself.
3. **Escalate**: 
   - Notify the user: "Menganalisis permintaan... Mengaktifkan sub-agent [GPT-5.4 mini/GPT-5.4] untuk hasil maksimal."
   - Call `sessions_spawn` with the recommended model override and the original task.
   - Deliver the sub-agent's result to the user when finished.

## Benefits
- **70-90% Cost Savings**: Entry calls always use the cheapest model.
- **Improved Reliability**: Complex tasks are handled by models actually capable of solving them.
- **Scalability**: Works seamlessly with OpenClaw's sub-agent orchestration.
