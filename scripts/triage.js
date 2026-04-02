/**
 * @file triage.js
 * @description Analyzes prompt complexity and recommends a model for routing.
 * @author David Bayendor
 * @version 1.0.0
 */

const fs = require('fs');

/**
 * Triage logic to determine prompt complexity.
 * 
 * @param {string} prompt The user's input prompt.
 * @returns {object} { prompt_complexity, recommended_model, reasoning }
 */
function triage(prompt) {
    if (!prompt || typeof prompt !== 'string') {
        return {
            prompt_complexity: 'Low',
            recommended_model: 'google/gemini-3.1-flash-lite-preview',
            reasoning: 'Invalid or empty input, defaulting to low complexity.'
        };
    }

    const length = prompt.length;
    const complexityKeywords = ['implement', 'refactor', 'debug', 'architect', 'analyze', 'comprehensive', 'expert', 'complex', 'detailed'];
    const mediumKeywords = ['script', 'write', 'explain', 'compare', 'how to', 'guide'];
    
    let complexity = 'Low';
    let model = 'google/gemini-3.1-flash-lite-preview'; // Default for low complexity

    const hasComplexity = complexityKeywords.some(word => prompt.toLowerCase().includes(word));
    const hasMedium = mediumKeywords.some(word => prompt.toLowerCase().includes(word));

    if (hasComplexity || length > 1000) {
        complexity = 'High';
        model = 'google/gemini-3.1-pro-preview';
    } else if (hasMedium || length > 300) {
        complexity = 'Medium';
        model = 'google/gemini-3-flash-preview';
    }

    return {
        prompt_complexity: complexity,
        recommended_model: model,
        reasoning: `Based on prompt length (${length} chars) and keyword analysis.`
    };
}

// Minimal CLI interface
const inputPrompt = process.argv.slice(2).join(' ');
console.log(JSON.stringify(triage(inputPrompt), null, 2));

