// ============================================================
// NLP ENGINE — Single Entry Point
// ============================================================
// This module exports the unified NLP engine that combines:
// - Rule-Based NLG (template parsing)
// - TF-IDF (keyword extraction & domain classification)
// - Pattern-Based NLP (action verbs, quantifiers, role detection)
//
// All three engines work together internally to produce the best output.

import type { ResumeFormData, ResumeOutput } from '../types';
import { generateWithUnifiedEngine } from './unifiedEngine';

/**
 * Main function to generate a resume from form data.
 * Internally combines Rule-Based, TF-IDF, and Pattern-Based NLP.
 */
export function generateResume(data: ResumeFormData): ResumeOutput {
  return generateWithUnifiedEngine(data);
}

// Re-export individual engines for documentation/debugging purposes
export { generateWithRuleBased } from './ruleBasedEngine';
export { generateWithTFIDF } from './tfidfEngine';
export { generateWithPatterns } from './patternEngine';
export { generateWithUnifiedEngine } from './unifiedEngine';
