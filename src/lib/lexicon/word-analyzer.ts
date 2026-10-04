import { AnalyzedWord, ColumnConfig, WordClassification, WordOverrideMap } from '@/types/phonics';
import { EXPANDED_DICTIONARY_SET } from './elementary-dictionary';
import { isClassroomInappropriate } from './safety-filter';
import { checkOrthographicValidity } from './orthographic-rules';

export function cleanWord(raw: string): string {
  if (!raw) return '';
  return raw.toLowerCase().replace(/[^a-z]/g, '');
}

export function analyzeWord(word: string, overrides?: WordOverrideMap): AnalyzedWord {
  const clean = cleanWord(word);
  if (!clean) {
    return {
      word: '',
      classification: 'invalid',
      reason: 'Empty word',
    };
  }

  // 1. Teacher overrides take highest precedence
  if (overrides && overrides[clean]) {
    return {
      word: clean,
      classification: overrides[clean],
      reason: 'Teacher override',
      isOverride: true,
    };
  }

  // 2. Classroom safety / profanity shield
  if (isClassroomInappropriate(clean)) {
    return {
      word: clean,
      classification: 'invalid',
      reason: 'Classroom safety blocklist',
    };
  }

  // 3. English orthographic and phonotactic rules
  const ortho = checkOrthographicValidity(clean);
  if (!ortho.isValid) {
    return {
      word: clean,
      classification: 'invalid',
      reason: ortho.reason || 'Invalid English spelling pattern',
    };
  }

  // 4. Expanded primary and elementary dictionary
  if (EXPANDED_DICTIONARY_SET.has(clean)) {
    return {
      word: clean,
      classification: 'real',
    };
  }

  // 5. Decodable nonsense word
  return {
    word: clean,
    classification: 'nonsense',
  };
}

export interface CombinationsResult {
  words: AnalyzedWord[];
  totalPossible: number;
  isTruncated: boolean;
  summary: {
    total: number;
    realCount: number;
    nonsenseCount: number;
    invalidCount: number;
  };
}

export function generateCombinations(
  columns: ColumnConfig[],
  overrides?: WordOverrideMap,
  maxCombinations: number = 2500
): CombinationsResult {
  const activeColumns = columns.filter((col) => col.tiles && col.tiles.length > 0);

  if (activeColumns.length === 0) {
    return {
      words: [],
      totalPossible: 0,
      isTruncated: false,
      summary: { total: 0, realCount: 0, nonsenseCount: 0, invalidCount: 0 },
    };
  }

  // Calculate total combinations
  const totalPossible = activeColumns.reduce((acc, col) => acc * col.tiles.length, 1);

  // Cartesian product generator
  const wordsSet = new Set<string>();
  const isTruncated = totalPossible > maxCombinations;

  function cartesian(colIdx: number, currentWord: string) {
    if (wordsSet.size >= maxCombinations) return;

    if (colIdx === activeColumns.length) {
      if (currentWord.trim()) {
        wordsSet.add(cleanWord(currentWord));
      }
      return;
    }

    const currentTiles = activeColumns[colIdx].tiles;
    for (const tile of currentTiles) {
      if (wordsSet.size >= maxCombinations) break;
      cartesian(colIdx + 1, currentWord + tile);
    }
  }

  cartesian(0, '');

  const words: AnalyzedWord[] = [];
  let realCount = 0;
  let nonsenseCount = 0;
  let invalidCount = 0;

  for (const w of wordsSet) {
    const analyzed = analyzeWord(w, overrides);
    words.push(analyzed);

    if (analyzed.classification === 'real') realCount++;
    else if (analyzed.classification === 'nonsense') nonsenseCount++;
    else if (analyzed.classification === 'invalid') invalidCount++;
  }

  // Sort words: Real first, then Nonsense, then Invalid; alphabetical within each group
  words.sort((a, b) => {
    const order: Record<WordClassification, number> = { real: 0, nonsense: 1, invalid: 2 };
    if (order[a.classification] !== order[b.classification]) {
      return order[a.classification] - order[b.classification];
    }
    return a.word.localeCompare(b.word);
  });

  return {
    words,
    totalPossible,
    isTruncated,
    summary: {
      total: words.length,
      realCount,
      nonsenseCount,
      invalidCount,
    },
  };
}
