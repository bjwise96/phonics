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

export function getRecommendedPacksForRole(role: PhonicsRole): TilePack[] {
  return SMART_TILE_PACKS.filter((p) => p.suggestedRole === role);
}
