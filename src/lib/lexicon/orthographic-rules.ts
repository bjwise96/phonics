// English orthographic and phonotactic validity checks for primary decodable words.
// Identifies combinations that violate foundational spelling principles.

export interface OrthographicResult {
  isValid: boolean;
  reason?: string;
}

export function checkOrthographicValidity(word: string): OrthographicResult {
  if (!word) {
    return { isValid: false, reason: 'Empty word' };
  }

  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length < 2) {
    return { isValid: true };
  }

  // 1. English words never end in 'j' (English uses -dge or -ge)
  if (clean.endsWith('j')) {
    return {
      isValid: false,
      reason: "English words do not end in 'j' (use -dge or -ge).",
    };
  }

  // 2. English words never end in 'v' (English always adds 'e', e.g., have, give)
  if (clean.endsWith('v')) {
    return {
      isValid: false,
      reason: "English words do not end in 'v' (words ending in /v/ use -ve).",
    };
  }

  // 3. English words never end in 'wh'
  if (clean.endsWith('wh')) {
    return {
      isValid: false,
      reason: "Digraph 'wh' only appears at the beginning of words.",
    };
  }

  // 4. Digraph 'ck' never appears at the beginning of a word
  if (clean.startsWith('ck')) {
    return {
      isValid: false,
      reason: "Digraph 'ck' only appears after short vowels at the end of a syllable.",
    };
  }

  // 5. Letter 'q' must be followed by 'u' in elementary decodable words
  if (clean.includes('q') && !clean.includes('qu')) {
    return {
      isValid: false,
      reason: "The letter 'q' must be followed by 'u'.",
    };
  }

  // 6. English words do not begin with double consonants (e.g., 'bb', 'dd', 'ff', 'll')
  const doubleInitialConsonants = /^(bb|cc|dd|ff|gg|hh|jj|kk|ll|mm|nn|pp|qq|rr|ss|tt|vv|ww|xx|yy|zz)/;
  if (doubleInitialConsonants.test(clean)) {
    return {
      isValid: false,
      reason: 'English words do not begin with double consonants.',
    };
  }

  // 7. Triple consecutive letters are invalid in English (e.g. 'sss', 'fff')
  if (/([a-z])\1\1/.test(clean)) {
    return {
      isValid: false,
      reason: 'Words cannot contain three consecutive identical letters.',
    };
  }

  // 8. Trigraph 'tch' and 'dge' only follow a single vowel, never after another consonant (e.g. 'sttch', 'mptch')
  if (/[bcdfghjklmnpqrstvwxyz](tch|dge)/.test(clean)) {
    return {
      isValid: false,
      reason: "'tch' and 'dge' only follow a short vowel, never another consonant.",
    };
  }

  return { isValid: true };
}
