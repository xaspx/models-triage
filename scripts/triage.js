#!/usr/bin/env node
/**
 * @file triage.js
 * @description GLM-first routing for text tasks, reserving GPT for image and multimodal work.
 * @author David Bayendor
 * @version 1.1.0
 */

const IMAGE_KEYWORDS = [
  'image', 'images', 'picture', 'photo', 'photos', 'screenshot', 'screenshots',
  'vision', 'ocr', 'scan', 'diagram', 'chart', 'png', 'jpg', 'jpeg', 'webp',
  'gif', 'camera', 'gambar', 'foto', 'screen', 'analyze this image'
];

const HIGH_KEYWORDS = [
  'architect', 'architecture', 'refactor', 'debug', 'root cause', 'incident',
  'security', 'audit', 'migrate', 'migration', 'deep dive', 'strategy',
  'comprehensive', 'complex', 'multi-step', 'production', 'optimize',
  'performance', 'forensics', 'critical', 'advanced'
];

const MEDIUM_KEYWORDS = [
  'script', 'write', 'explain', 'compare', 'guide', 'review', 'summarize',
  'analyze', 'research', 'plan', 'workflow', 'integration', 'implement',
  'coding', 'code', 'fix', 'troubleshoot'
];

const SPEED_KEYWORDS = [
  'quick', 'fast', 'cepat', 'singkat', 'ringkas', 'brief', 'draft'
];

function triage(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return {
      task_type: 'text',
      prompt_complexity: 'Low',
      recommended_model: 'zai/glm-4.7',
      recommended_fallbacks: ['zai/glm-5'],
      reasoning: 'Empty input. Default to the cheapest capable GLM text tier.'
    };
  }

  const normalized = prompt.toLowerCase();
  const length = prompt.length;

  const isImageTask = IMAGE_KEYWORDS.some(word => normalized.includes(word));
  const hasHigh = HIGH_KEYWORDS.some(word => normalized.includes(word));
  const hasMedium = MEDIUM_KEYWORDS.some(word => normalized.includes(word));
  const wantsSpeed = SPEED_KEYWORDS.some(word => normalized.includes(word));

  if (isImageTask) {
    return {
      task_type: 'image',
      prompt_complexity: 'Vision',
      recommended_model: 'openai-codex/gpt-5.4',
      recommended_fallbacks: ['openai-codex/gpt-5.4-mini'],
      reasoning: 'Image or multimodal request detected. Keep GPT reserved for image-capable work only.'
    };
  }

  let complexity = 'Low';
  let model = 'zai/glm-4.7';
  let fallbacks = ['zai/glm-5'];

  if (hasHigh || length > 1400) {
    complexity = 'High';
    model = 'zai/glm-5.1';
    fallbacks = ['zai/glm-5', 'zai/glm-5-turbo', 'zai/glm-4.7'];
  } else if (hasMedium || length > 350) {
    complexity = 'Medium';
    model = wantsSpeed ? 'zai/glm-5-turbo' : 'zai/glm-5';
    fallbacks = wantsSpeed
      ? ['zai/glm-5', 'zai/glm-4.7']
      : ['zai/glm-5-turbo', 'zai/glm-4.7'];
  }

  return {
    task_type: 'text',
    prompt_complexity: complexity,
    recommended_model: model,
    recommended_fallbacks: fallbacks,
    reasoning: `GLM-first routing based on prompt length (${length}) and modality-aware keyword analysis.`
  };
}

if (require.main === module) {
  const inputPrompt = process.argv.slice(2).join(' ');
  console.log(JSON.stringify(triage(inputPrompt), null, 2));
}

module.exports = { triage };
