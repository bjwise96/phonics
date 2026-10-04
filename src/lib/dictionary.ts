// Elementary & primary grade dictionary and phonotactic lookup for real vs. nonsense word detection.
// Uses the expanded 10,000+ word lexicon, safety shield, and orthographic rule engine.

import { analyzeWord, cleanWord } from './lexicon/word-analyzer';
import { WordOverrideMap, AnalyzedWord } from '@/types/phonics';

export function isRealWord(word: string, overrides?: WordOverrideMap): boolean {
  if (!word) return false;
  const analyzed = analyzeWord(word, overrides);
  return analyzed.classification === 'real';
}

export function classifyWord(word: string, overrides?: WordOverrideMap): AnalyzedWord {
  return analyzeWord(word, overrides);
}

export { cleanWord };
