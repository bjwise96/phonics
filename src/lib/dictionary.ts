// Elementary & primary grade dictionary lookup for real vs. nonsense word detection.
// Uses a Set for O(1) instantaneous lookup on SmartBoard blending interactions.

import { ELEMENTARY_WORD_LIST } from './elementary-words';

const wordSet = new Set(ELEMENTARY_WORD_LIST.map((w) => w.toLowerCase().trim()));

export function isRealWord(word: string): boolean {
  if (!word) return false;
  // Clean hyphens/empty placeholders
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return false;
  return wordSet.has(clean);
}
