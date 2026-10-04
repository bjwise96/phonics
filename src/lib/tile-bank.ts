import { PhonicsRole } from '@/types/phonics';

export interface TilePack {
  id: string;
  name: string;
  category: 'consonants' | 'vowels' | 'blends' | 'digraphs' | 'teams' | 'affixes';
  suggestedRole: PhonicsRole;
  description: string;
  tiles: string[];
}

export const SMART_TILE_PACKS: TilePack[] = [
  // 1. CONSONANTS
  {
    id: 'initial-consonants',
    name: 'Initial Single Consonants',
    category: 'consonants',
    suggestedRole: 'consonant',
    description: 'High-frequency single consonants for syllable onsets.',
    tiles: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y', 'z'],
  },
  {
    id: 'final-consonants',
    name: 'Final Single Consonants',
    category: 'consonants',
    suggestedRole: 'consonant',
    description: 'Single consonants and codas that legally end English words.',
    tiles: ['b', 'd', 'f', 'g', 'k', 'l', 'm', 'n', 'p', 's', 't', 'x', 'z'],
  },

  // 2. SHORT VOWELS
  {
    id: 'short-vowels',
    name: 'Short Vowels (Closed)',
    category: 'vowels',
    suggestedRole: 'short_vowel',
    description: 'Standard short vowel phonemes (a, e, i, o, u) for closed syllables.',
    tiles: ['a', 'e', 'i', 'o', 'u'],
  },

  // 3. DIGRAPHS & TRIGRAPHS
  {
    id: 'initial-digraphs',
    name: 'Initial Digraphs',
    category: 'digraphs',
    suggestedRole: 'blend',
    description: 'Two-letter single-sound consonants (sh, ch, th, wh, ph, kn, wr).',
    tiles: ['sh', 'ch', 'th', 'wh', 'ph', 'kn', 'wr'],
  },
  {
    id: 'final-digraphs',
    name: 'Final Digraphs & Trigraphs',
    category: 'digraphs',
    suggestedRole: 'blend',
    description: 'Coda single-phoneme clusters (ck, tch, dge, sh, ch, th, ng, nk).',
    tiles: ['ck', 'tch', 'dge', 'sh', 'ch', 'th', 'ng', 'nk'],
  },

  // 4. BLENDS
  {
    id: 'l-blends',
    name: 'Initial L-Blends',
    category: 'blends',
    suggestedRole: 'blend',
    description: 'Onset consonant clusters containing l (bl, cl, fl, gl, pl, sl).',
    tiles: ['bl', 'cl', 'fl', 'gl', 'pl', 'sl'],
  },
  {
    id: 'r-blends',
    name: 'Initial R-Blends',
    category: 'blends',
    suggestedRole: 'blend',
    description: 'Onset consonant clusters containing r (br, cr, dr, fr, gr, pr, tr).',
    tiles: ['br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr'],
  },
  {
    id: 's-blends',
    name: 'Initial S-Blends',
    category: 'blends',
    suggestedRole: 'blend',
    description: 'Onset consonant clusters containing s (sc, sk, sm, sn, sp, st, sw).',
    tiles: ['sc', 'sk', 'sm', 'sn', 'sp', 'st', 'sw'],
  },
  {
    id: 'final-blends',
    name: 'Final Consonant Blends',
    category: 'blends',
    suggestedRole: 'blend',
    description: 'Coda consonant clusters retaining distinct sounds (st, nd, nt, mp, lt, lk, sk, pt, ft).',
    tiles: ['st', 'nd', 'nt', 'mp', 'lt', 'lk', 'sk', 'pt', 'ft'],
  },

  // 5. VOWEL TEAMS & DIPHTHONGS
  {
    id: 'vowel-teams-long',
    name: 'Long Vowel Teams',
    category: 'teams',
    suggestedRole: 'vowel_team',
    description: 'Two vowels making a long vowel sound (ai, ay, ee, ea, oa, oe, ie, ue).',
    tiles: ['ai', 'ay', 'ee', 'ea', 'oa', 'oe', 'ie', 'ue'],
  },
  {
    id: 'diphthongs-special',
    name: 'Diphthongs & Variant Vowels',
    category: 'teams',
    suggestedRole: 'vowel_team',
    description: 'Gliding vowel phonemes and variant vowel sounds (oi, oy, ou, ow, oo, ew, au, aw).',
    tiles: ['oi', 'oy', 'ou', 'ow', 'oo', 'ew', 'au', 'aw'],
  },

  // 6. R-CONTROLLED VOWELS
  {
    id: 'bossy-r',
    name: 'R-Controlled Vowels (Bossy R)',
    category: 'vowels',
    suggestedRole: 'r_controlled',
    description: 'Vowels influenced by r (ar, er, ir, or, ur).',
    tiles: ['ar', 'er', 'ir', 'or', 'ur'],
  },

  // 7. SILENT-E & AFFIXES
  {
    id: 'silent-e',
    name: 'Silent-E (Magic E)',
    category: 'affixes',
    suggestedRole: 'silent_e',
    description: 'Magic final e triggering long vowel sounds.',
    tiles: ['e'],
  },
  {
    id: 'common-suffixes',
    name: 'Inflectional Suffixes',
    category: 'affixes',
    suggestedRole: 'affix',
    description: 'Common elementary word endings (-s, -es, -ed, -ing, -er, -est, -ly).',
    tiles: ['s', 'es', 'ed', 'ing', 'er', 'est', 'ly'],
  },
  {
    id: 'consonant-le',
    name: 'Consonant-le Endings',
    category: 'affixes',
    suggestedRole: 'affix',
    description: 'Final stable syllable consonant-le patterns (ble, cle, dle, fle, gle, ple, tle).',
    tiles: ['ble', 'cle', 'dle', 'fle', 'gle', 'ple', 'tle'],
  },
];

export function getPacksByCategory(category: TilePack['category']): TilePack[] {
  return SMART_TILE_PACKS.filter((p) => p.category === category);
}

export interface RoleMetadata {
  label: string;
  colorName: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
  description: string;
}

export const ROLE_METADATA: Record<PhonicsRole, RoleMetadata> = {
  consonant: {
    label: 'Consonant',
    colorName: 'Blue',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    dotBg: 'bg-blue-500',
    description: 'Single consonant onset or coda (Blue)',
  },
  short_vowel: {
    label: 'Short Vowel',
    colorName: 'Rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    dotBg: 'bg-rose-500',
    description: 'Closed syllable vowel sound (Rose)',
  },
  vowel_team: {
    label: 'Vowel Team',
    colorName: 'Red',
    badgeBg: 'bg-red-50 dark:bg-red-950/60',
    badgeText: 'text-red-700 dark:text-red-300',
    badgeBorder: 'border-red-200 dark:border-red-800',
    dotBg: 'bg-red-500',
    description: 'Long vowel team or diphthong (Red)',
  },
  r_controlled: {
    label: 'R-Controlled',
    colorName: 'Amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    dotBg: 'bg-amber-500',
    description: 'Bossy-R vowel pattern (Amber)',
  },
  silent_e: {
    label: 'Silent-E',
    colorName: 'Purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    dotBg: 'bg-purple-500',
    description: 'Magic final-e marker (Purple)',
  },
  affix: {
    label: 'Suffix / Affix',
    colorName: 'Emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    dotBg: 'bg-emerald-500',
    description: 'Ending inflection or syllable (Emerald)',
  },
  blend: {
    label: 'Blend / Digraph',
    colorName: 'Sky',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
    badgeText: 'text-sky-700 dark:text-sky-300',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    dotBg: 'bg-sky-500',
    description: 'Consonant blend or digraph (Sky)',
  },
};

export function detectPhonicsRole(tiles: string[], fallbackRole: PhonicsRole = 'consonant'): PhonicsRole {
  if (!tiles || tiles.length === 0) return fallbackRole;

  // If tiles match silent e
  if (tiles.length === 1 && (tiles[0] === 'e' || tiles[0] === '_e')) {
    return 'silent_e';
  }

  // If all tiles are basic short vowels
  const shortVowels = new Set(['a', 'e', 'i', 'o', 'u']);
  if (tiles.every((t) => shortVowels.has(t))) {
    return 'short_vowel';
  }

  // If tiles are r-controlled
  const rControlled = new Set(['ar', 'er', 'ir', 'or', 'ur']);
  if (tiles.some((t) => rControlled.has(t))) {
    return 'r_controlled';
  }

  // If tiles are vowel teams or diphthongs
  const vowelTeams = new Set([
    'ai', 'ay', 'ee', 'ea', 'oa', 'oe', 'ie', 'ue', 'ui',
    'oi', 'oy', 'ou', 'ow', 'oo', 'ew', 'au', 'aw',
  ]);
  if (tiles.some((t) => vowelTeams.has(t))) {
    return 'vowel_team';
  }

  // If tiles are affixes / suffixes (multi-character suffixes like -ing, -ed, -est, -ly, -ble)
  const multiLetterAffixes = new Set([
    'ed', 'ing', 'est', 'ly', 'ful', 'less',
    'ble', 'cle', 'dle', 'fle', 'gle', 'ple', 'tle',
  ]);
  if (tiles.some((t) => multiLetterAffixes.has(t))) {
    return 'affix';
  }

  // If tiles have blends or digraphs
  const blends = new Set([
    'sh', 'ch', 'th', 'wh', 'ph', 'ck', 'tch', 'dge', 'ng', 'nk', 'kn', 'wr',
    'bl', 'cl', 'fl', 'gl', 'pl', 'sl',
    'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr',
    'sc', 'sk', 'sm', 'sn', 'sp', 'st', 'sw',
    'mp', 'nd', 'nt', 'lt', 'lk', 'pt', 'ft',
  ]);
  if (tiles.some((t) => blends.has(t))) {
    return 'blend';
  }

  return 'consonant';
}
