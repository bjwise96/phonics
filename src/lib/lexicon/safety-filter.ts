// Classroom safety and inappropriate word filter for 2nd grade primary instruction.
// Prevents profanity, slurs, vulgarities, and elementary-inappropriate phoneme combinations.

const INAPPROPRIATE_WORDS = new Set([
  // Core profanities and vulgarities
  'fuck', 'fuk', 'fck', 'fux', 'fuc', 'fukk', 'phuck',
  'shit', 'shet', 'shite', 'shyt', 'sh1t',
  'damn', 'dam', 'damm',
  'bitch', 'bich', 'bytch',
  'bastard',
  'ass', 'azz', 'arse', 'asshole',
  'crap',
  'dick', 'dik', 'dck', 'dix',
  'cock', 'cok', 'kok',
  'piss', 'piz',
  'tits', 'titties', 'boob', 'boobs', 'boobie',
  'cunt', 'kunt',
  'pussy', 'pussie',
  'twat',
  'slut', 'slutt',
  'whore', 'hoe',
  'prick',
  'wank', 'wanker',
  'clit',
  'penis', 'vagina', 'anus',
  'dildo',

  // Slurs & offensive terms
  'nigger', 'nigga', 'nig', 'nigg',
  'fag', 'faggot', 'fagg',
  'chink', 'gook', 'kike', 'spic', 'wetback',
  'retard', 'tard',

  // Inappropriate elementary slang/substances
  'sex', 'sexx', 'sexy',
  'porn', 'porno',
  'weed', 'bong', 'meth', 'coke', 'drugg', 'high',
  'kill', 'die', 'dead', 'murder', 'gun', 'stab',
  'nude', 'naked', 'hell',
]);

export function isClassroomInappropriate(word: string): boolean {
  if (!word) return false;
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return false;
  return INAPPROPRIATE_WORDS.has(clean);
}
