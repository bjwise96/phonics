import { DeckPreset } from '@/types/phonics';

export const CURRICULUM_PRESETS: DeckPreset[] = [
  // ==========================================
  // 1. THREE-COLUMN DECKS (Onset - Medial - Coda)
  // ==========================================
  {
    id: 'cvc-basic',
    title: 'CVC Syllables Deck',
    subtitle: 'Short Vowels & Single Consonants',
    description: 'Closed-syllable CVC word building with high-frequency consonants and short vowels.',
    columnCount: 3,
    category: '3-column',
    tags: ['CVC', 'Short Vowels', 'Closed Syllable'],
    exampleWords: ['bat', 'cup', 'pig', 'sun', 'mop', 'bed'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'f', 'm', 'p', 's', 't', 'd', 'h', 'j', 'l', 'r'],
      },
      {
        id: 'col-2',
        label: 'Medial Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-3',
        label: 'Final Coda',
        role: 'consonant',
        tiles: ['b', 'd', 'g', 'm', 'n', 'p', 't', 's', 'x', 'p'],
      },
    ],
  },
  {
    id: 'digraphs-trigraphs',
    title: 'Digraph & Trigraph Deck',
    subtitle: 'sh, ch, th, wh, ck, tch, dge',
    description: 'Consonant digraphs, trigraphs, and complex single-sound phonemes.',
    columnCount: 3,
    category: '3-column',
    tags: ['Digraphs', 'Trigraphs', 'HD Word'],
    exampleWords: ['shop', 'math', 'patch', 'bridge', 'thick', 'chin'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Digraph / Trigraph',
        role: 'blend',
        tiles: ['sh', 'ch', 'th', 'wh', 'ph', 'kn', 'wr', 'scr', 'str'],
      },
      {
        id: 'col-2',
        label: 'Medial Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-3',
        label: 'Final Digraph / Trigraph',
        role: 'blend',
        tiles: ['sh', 'ch', 'th', 'ck', 'tch', 'dge', 'ng', 'nk'],
      },
    ],
  },
  {
    id: 'initial-final-blends',
    title: 'Blends Deck (CCVC / CVCC)',
    subtitle: 'Initial L/R/S Blends & Final Blends',
    description: 'Adjacent consonants retaining individual phonemes in onsets and codas.',
    columnCount: 3,
    category: '3-column',
    tags: ['Blends', 'CCVC', 'CVCC'],
    exampleWords: ['stomp', 'blink', 'tent', 'fast', 'clamp', 'drift'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Blend',
        role: 'blend',
        tiles: ['st', 'bl', 'tr', 'fl', 'sn', 'cl', 'dr', 'gr', 'pl', 'sp', 'sw'],
      },
      {
        id: 'col-2',
        label: 'Medial Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-3',
        label: 'Final Blend',
        role: 'blend',
        tiles: ['mp', 'nk', 'st', 'nt', 'lt', 'nd', 'sk', 'ft', 'pt'],
      },
    ],
  },
  {
    id: 'vowel-teams-3col',
    title: 'Vowel Teams Deck',
    subtitle: 'Long Vowel Digraphs & Diphthongs',
    description: 'Common vowel digraphs and teams producing long vowel and diphthong sounds.',
    columnCount: 3,
    category: '3-column',
    tags: ['Vowel Teams', 'Long Vowels', 'Diphthongs'],
    exampleWords: ['rain', 'play', 'feet', 'high', 'boat', 'sheet', 'train'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset',
        role: 'consonant',
        tiles: ['b', 'f', 'm', 'r', 's', 'tr', 'ch', 'p', 't', 'sh', 'gr', 'fl'],
      },
      {
        id: 'col-2',
        label: 'Vowel Team',
        role: 'vowel_team',
        tiles: ['ai', 'ay', 'ee', 'ea', 'igh', 'oa', 'ow', 'oo', 'oi', 'oy', 'ou'],
      },
      {
        id: 'col-3',
        label: 'Final Coda',
        role: 'consonant',
        tiles: ['t', 'd', 'n', 'm', 'p', 'l', 'st', 'k', 'ch', 'th'],
      },
    ],
  },

  // ==========================================
  // 2. FOUR-COLUMN DECKS (Silent-E, Consonant-le)
  // ==========================================
  {
    id: 'silent-e-vce',
    title: 'Silent-E (VCe) Deck',
    subtitle: 'Locked Silent-E Transformation',
    description: 'Interactive VCe pattern with locked final "e" demonstrating vowel lengthening.',
    columnCount: 4,
    category: '4-column',
    tags: ['Silent-E', 'VCe', 'Magic E', 'Long Vowels'],
    exampleWords: ['slide', 'make', 'hope', 'cube', 'brave', 'flute', 'time'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'f', 'm', 'sl', 'pr', 't', 'p', 'd', 'st', 'dr', 'gl'],
      },
      {
        id: 'col-2',
        label: 'Long Vowel',
        role: 'short_vowel',
        tiles: ['a', 'i', 'o', 'u', 'e'],
      },
      {
        id: 'col-3',
        label: 'Medial Consonant',
        role: 'consonant',
        tiles: ['k', 'm', 'p', 't', 'b', 'v', 'l', 'd', 'n', 's', 'z'],
      },
      {
        id: 'col-4',
        label: 'Silent-E Marker',
        role: 'silent_e',
        tiles: ['e'],
        defaultLocked: true,
      },
    ],
  },
  {
    id: 'complex-blend-digraph-4col',
    title: 'Complex Blends + Digraphs (CCVCC)',
    subtitle: 'Triple Blends, Vowels, & Digraph Codas',
    description: 'Complex 3-letter initial blends transitioning through vowels to digraph endings.',
    columnCount: 4,
    category: '4-column',
    tags: ['CCVCC', 'Triple Blends', 'Digraphs'],
    exampleWords: ['strict', 'spring', 'thrash', 'splash', 'switch'],
    columns: [
      {
        id: 'col-1',
        label: 'Complex Initial Blend',
        role: 'blend',
        tiles: ['str', 'spr', 'spl', 'thr', 'sw', 'scr', 'squ', 'shr'],
      },
      {
        id: 'col-2',
        label: 'Short Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-3',
        label: 'Coda Consonant',
        role: 'consonant',
        tiles: ['n', 't', 'p', 'm', 'c', 's', 'l', 'r'],
      },
      {
        id: 'col-4',
        label: 'Final Digraph / Suffix',
        role: 'blend',
        tiles: ['ch', 'sh', 'th', 's', 'ck', 'tch', 'dge'],
      },
    ],
  },
  {
    id: 'r-controlled-vowels',
    title: 'R-Controlled Vowels Deck',
    subtitle: 'Bossy R: ar, or, er, ir, ur',
    description: 'Vowels paired with "r" altering vowel pronunciation, plus silent-e extensions.',
    columnCount: 4,
    category: '4-column',
    tags: ['Bossy R', 'R-Controlled', 'Vowel-R'],
    exampleWords: ['shark', 'storm', 'bird', 'turn', 'shore', 'stare', 'fern'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'f', 'm', 'p', 'st', 'sh', 'ch', 'th', 'dr', 'fl', 'sp'],
      },
      {
        id: 'col-2',
        label: 'R-Controlled Nucleus',
        role: 'r_controlled',
        tiles: ['ar', 'or', 'er', 'ir', 'ur'],
      },
      {
        id: 'col-3',
        label: 'Final Coda',
        role: 'consonant',
        tiles: ['k', 't', 'n', 'ch', 'sh', 'm', 'p', 'd', 'g', 'b', 'th'],
      },
      {
        id: 'col-4',
        label: 'Optional Silent-E',
        role: 'silent_e',
        tiles: ['-', 'e'],
      },
    ],
  },
  {
    id: 'consonant-le-endings',
    title: 'Consonant-le (_le) Syllables',
    subtitle: 'Multisyllabic Final Stable Syllable',
    description: 'Two-syllable decoding practicing closed first syllable with consonant-le endings.',
    columnCount: 4,
    category: '4-column',
    tags: ['Consonant-le', 'Multisyllable', 'Final Stable'],
    exampleWords: ['bubble', 'candle', 'purple', 'little', 'simple', 'rattle'],
    columns: [
      {
        id: 'col-1',
        label: 'Syllable 1 Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'f', 'g', 'k', 't', 'p', 'm', 's', 'r'],
      },
      {
        id: 'col-2',
        label: 'Syllable 1 Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-3',
        label: 'Bridge Consonant',
        role: 'consonant',
        tiles: ['b', 'd', 'f', 'g', 'k', 'p', 't', 'z', 'm', 's'],
      },
      {
        id: 'col-4',
        label: 'Final Syllable',
        role: 'affix',
        tiles: ['le'],
        defaultLocked: true,
      },
    ],
  },

  // ==========================================
  // 3. FIVE-COLUMN DECKS (Advanced & Multisyllabic)
  // ==========================================
  {
    id: 'complex-ccvce-5col',
    title: 'Complex CCVCe Deck',
    subtitle: 'Blends Breakdown + VCe Long Vowels',
    description: 'Deconstructed 2-part initial blends, long vowels, codas, and locked silent-e.',
    columnCount: 5,
    category: '5-column',
    tags: ['CCVCe', '5-Column', 'Silent-E', 'Decoding'],
    exampleWords: ['strike', 'plane', 'smoke', 'chime', 'grade', 'spine', 'flame'],
    columns: [
      {
        id: 'col-1',
        label: 'Blend Part 1',
        role: 'consonant',
        tiles: ['s', 'c', 'p', 't', 'b', 'f', 'g', 'd', 'sh', 'th'],
      },
      {
        id: 'col-2',
        label: 'Blend Part 2',
        role: 'consonant',
        tiles: ['t', 'r', 'l', 'w', 'h', 'm', 'n', 'p'],
      },
      {
        id: 'col-3',
        label: 'Medial Vowel',
        role: 'short_vowel',
        tiles: ['a', 'e', 'i', 'o', 'u'],
      },
      {
        id: 'col-4',
        label: 'Final Consonant',
        role: 'consonant',
        tiles: ['k', 'm', 'n', 'p', 't', 'st', 'nt', 'd', 'b', 'v'],
      },
      {
        id: 'col-5',
        label: 'Silent-E',
        role: 'silent_e',
        tiles: ['e'],
        defaultLocked: true,
      },
    ],
  },
  {
    id: 'syllable-chaining-compound',
    title: 'Compound Words & Syllable Chaining',
    subtitle: 'Two-Syllable Closed Word Building',
    description: 'Systematic multisyllable chaining: Syllable 1 (Onset + Coda) + Bridge + Syllable 2.',
    columnCount: 5,
    category: '5-column',
    tags: ['Compound Words', 'Syllable Chaining', 'Multisyllable'],
    exampleWords: ['catfish', 'napkin', 'sunset', 'pigpen', 'bobcat', 'hotdog'],
    columns: [
      {
        id: 'col-1',
        label: 'Syllable 1 Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'm', 'p', 'r', 's', 't', 'f', 'h', 'n'],
      },
      {
        id: 'col-2',
        label: 'Syllable 1 Nucleus/Coda',
        role: 'affix',
        tiles: ['at', 'en', 'ip', 'op', 'un', 'et', 'in', 'an', 'ig'],
      },
      {
        id: 'col-3',
        label: 'Intervocalic Bridge',
        role: 'consonant',
        tiles: ['p', 't', 'c', 'b', 'm', 'n', 's', 'd', 'f', 'k'],
      },
      {
        id: 'col-4',
        label: 'Syllable 2 Onset',
        role: 'consonant',
        tiles: ['b', 'c', 'f', 'm', 'p', 't', 's', 'd', 'l', 'r'],
      },
      {
        id: 'col-5',
        label: 'Syllable 2 Rime',
        role: 'affix',
        tiles: ['ad', 'en', 'ot', 'ug', 'ip', 'ash', 'et', 'am', 'op'],
      },
    ],
  },
  {
    id: 'advanced-vowel-team-suffix',
    title: 'Vowel Teams + Suffixes (CVVCC)',
    subtitle: 'Vowel Teams with Inflectional Endings',
    description: 'Complex vowel teams combined with consonant codas and inflectional suffixes (-ed, -ing, -er).',
    columnCount: 5,
    category: '5-column',
    tags: ['Suffixes', 'Inflections', 'Vowel Teams'],
    exampleWords: ['training', 'floated', 'cleaner', 'boasting', 'screaming'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset',
        role: 'consonant',
        tiles: ['b', 'f', 'm', 'p', 's', 'str', 'bl', 'cl', 'tr', 'fl', 'gr'],
      },
      {
        id: 'col-2',
        label: 'Vowel Team',
        role: 'vowel_team',
        tiles: ['ai', 'ay', 'ee', 'ea', 'igh', 'oa', 'ow', 'oo', 'oi', 'ou'],
      },
      {
        id: 'col-3',
        label: 'Consonant Part 1',
        role: 'consonant',
        tiles: ['n', 'l', 'r', 'g', 's', 't', 'd', 'm', 'p'],
      },
      {
        id: 'col-4',
        label: 'Consonant Part 2',
        role: 'consonant',
        tiles: ['-', 'd', 't', 'k', 'h', 'm', 'p', 's'],
      },
      {
        id: 'col-5',
        label: 'Suffix / Ending',
        role: 'affix',
        tiles: ['-', 's', 'ed', 'er', 'y', 'ing', 'est'],
      },
    ],
  },
  {
    id: 'vowel-r-multisyllabic-base',
    title: 'Vowel-R Multisyllabic Base (CCV-R-C)',
    subtitle: 'R-Controlled Nucleus with Affixes',
    description: 'Advanced R-controlled vowel combinations with onset blends, consonant codas, and suffixes.',
    columnCount: 5,
    category: '5-column',
    tags: ['Vowel-R', 'Bossy R', 'Suffixes', 'Advanced'],
    exampleWords: ['starter', 'charmer', 'farmers', 'burners', 'shorter'],
    columns: [
      {
        id: 'col-1',
        label: 'Initial Onset / Blend',
        role: 'blend',
        tiles: ['st', 'sh', 'ch', 'th', 'pr', 'gr', 'f', 'b', 'c', 'sp'],
      },
      {
        id: 'col-2',
        label: 'Consonant Buffer',
        role: 'consonant',
        tiles: ['-', 'b', 'c', 'p', 't', 'l', 'r'],
      },
      {
        id: 'col-3',
        label: 'R-Controlled Nucleus',
        role: 'r_controlled',
        tiles: ['ar', 'or', 'er', 'ir', 'ur', 'air', 'ear', 'oar'],
      },
      {
        id: 'col-4',
        label: 'Final Consonant / Coda',
        role: 'consonant',
        tiles: ['k', 't', 'n', 'm', 'p', 'sh', 'ch', 'd', 'g'],
      },
      {
        id: 'col-5',
        label: 'Suffix / Ending',
        role: 'affix',
        tiles: ['-', 's', 'y', 'ed', 'er', 'ing'],
      },
    ],
  },
];

export function getPresetById(id: string): DeckPreset | undefined {
  return CURRICULUM_PRESETS.find((p) => p.id === id);
}

export function getDefaultPreset(): DeckPreset {
  return CURRICULUM_PRESETS[0];
}
