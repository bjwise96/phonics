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
  if (clean.length === 0) {
    return { isValid: false, reason: 'Empty word' };
  }

  // 1. Must contain at least one vowel sound (a, e, i, o, u, y)
  // Consonant-only clusters (e.g. 'bct', 'strnd', 'blck') are unpronounceable and invalid.
  if (!/[aeiouy]/.test(clean)) {
    return {
      isValid: false,
      reason: 'Every English syllable must contain a vowel sound (a, e, i, o, u, y).',
    };
  }

  // 2. Vowel-only sequences of 3+ letters that form unpronounceable clusters (e.g. 'aei', 'oue', 'aio')
  if (clean.length >= 3 && !/[bcdfghjklmnpqrstvwxz]/.test(clean)) {
    return {
      isValid: false,
      reason: 'Sequence of arbitrary vowels without consonants.',
    };
  }

  // 3. English words never end in 'j' (English uses -dge or -ge)
  if (clean.endsWith('j')) {
    return {
      isValid: false,
      reason: "English words do not end in 'j' (use -dge or -ge).",
    };
  }

  // 4. English words never end in 'v' (English always adds 'e', e.g., have, give)
  if (clean.endsWith('v')) {
    return {
      isValid: false,
      reason: "English words do not end in 'v' (words ending in /v/ use -ve).",
    };
  }

  // 5. English words never end in 'wh'
  if (clean.endsWith('wh')) {
    return {
      isValid: false,
      reason: "Digraph 'wh' only appears at the beginning of words.",
    };
  }

  // 6. Digraph 'ck' never appears at the beginning of a word
  if (clean.startsWith('ck')) {
    return {
      isValid: false,
      reason: "Digraph 'ck' only appears after short vowels at the end of a syllable.",
    };
  }

  // 7. Digraphs 'ng' and 'nk' never appear at the beginning of an English word
  if (clean.startsWith('ng') || clean.startsWith('nk')) {
    return {
      isValid: false,
      reason: "Digraphs 'ng' and 'nk' only appear at the end of syllables.",
    };
  }

  // 8. Trigraphs 'tch' and 'dge' never begin an English word
  if (clean.startsWith('tch') || clean.startsWith('dge')) {
    return {
      isValid: false,
      reason: "'tch' and 'dge' only follow short vowels at the end of a syllable.",
    };
  }

  // 9. Letter 'q' must be followed by 'u' in elementary decodable words
  if (clean.includes('q') && !clean.includes('qu')) {
    return {
      isValid: false,
      reason: "The letter 'q' must be followed by 'u'.",
    };
  }

  // 10. English words do not begin with double consonants (e.g., 'bb', 'dd', 'ff', 'll')
  const doubleInitialConsonants = /^(bb|cc|dd|ff|gg|hh|jj|kk|ll|mm|nn|pp|qq|rr|ss|tt|vv|ww|xx|yy|zz)/;
  if (doubleInitialConsonants.test(clean)) {
    return {
      isValid: false,
      reason: 'English words do not begin with double consonants.',
    };
  }

  // 11. Triple consecutive identical letters are invalid in English (e.g. 'sss', 'fff')
  if (/([a-z])\1\1/.test(clean)) {
    return {
      isValid: false,
      reason: 'Words cannot contain three consecutive identical letters.',
    };
  }

  // 12. Trigraph 'tch' and 'dge' only follow a single short vowel, never another consonant (e.g. 'sttch', 'mptch')
  if (/[bcdfghjklmnpqrstvwxyz](tch|dge)/.test(clean)) {
    return {
      isValid: false,
      reason: "'tch' and 'dge' only follow a short vowel, never another consonant.",
    };
  }

  // 13. Illegal double vowels in elementary decodable words (aa, ii, uu, yy)
  if (/(aa|ii|uu|yy)/.test(clean)) {
    return {
      isValid: false,
      reason: "Double vowels 'aa', 'ii', 'uu', and 'yy' do not occur in decodable English words.",
    };
  }

  // 14. Primary decodable words do not begin with 'x' (letter 'x' is taught as coda /ks/)
  if (clean.startsWith('x') && clean.length > 1) {
    return {
      isValid: false,
      reason: "In primary phonics, 'x' is only used at the end of syllables (e.g. box, fix).",
    };
  }

  // 15. Words ending in illegal consonants: 'q'
  if (clean.endsWith('q')) {
    return {
      isValid: false,
      reason: "English words do not end in 'q'.",
    };
  }

  return { isValid: true };
}
