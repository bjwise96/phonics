// Classroom safety and conservative inappropriate word filter for primary grade instruction (K-2nd).
// Prevents profanities, vulgarities, hate speech, sexual content, substance references, violence,
// bathroom slang, and bullying put-downs that are unsuitable for young children.

const INAPPROPRIATE_WORDS = new Set([
  // 1. CORE PROFANITIES, VULGARITIES & PHONETIC VARIANTS
  'fuck', 'fuk', 'fck', 'fux', 'fuc', 'fukk', 'phuck', 'phuk', 'fucker', 'fucking', 'fucked', 'feck', 'fug', 'fugg',
  'shit', 'shet', 'shite', 'shyt', 'sh1t', 'shat', 'shits', 'shitty', 'bullshit',
  'damn', 'dam', 'damm', 'dammit', 'damned', 'goddamn',
  'bitch', 'bich', 'bytch', 'bitches', 'bitchy', 'bitching',
  'bastard', 'bastards',
  'ass', 'azz', 'arse', 'asses', 'asshole', 'assholes', 'badass', 'dumbass', 'jackass',
  'crap', 'craps', 'crappy', 'crapping', 'crapped',
  'dick', 'dik', 'dck', 'dix', 'dicks', 'dickhead',
  'cock', 'cok', 'kok', 'cocks', 'cocky',
  'piss', 'piz', 'pisses', 'pissed', 'pissing',
  'cunt', 'kunt', 'cunts',
  'pussy', 'pussie', 'pussies', 'puss',
  'twat', 'twats',
  'slut', 'slutt', 'sluts', 'slutty',
  'whore', 'whores', 'hoe', 'hoes', 'skank', 'skanks', 'skanky',
  'prick', 'pricks',
  'wank', 'wanker', 'wanks',
  'clit', 'clits',
  'dildo', 'dildos',
  'boner', 'boners',
  'dong', 'dongs', 'wang', 'wangs', 'schlong',
  'tit', 'tits', 'titt', 'titts', 'titties', 'titty',
  'boob', 'boobs', 'boobie', 'boobies',
  'cum', 'cums', 'cumming', 'cumshot',
  'jizz', 'jiz', 'jizzes',
  'spunk', 'skeet',
  'smut', 'smutty',
  'porn', 'porno', 'pornos',

  // 2. SLURS, HATE SPEECH, DISCRIMINATORY EPITHETS & DEROGATORY TERMS
  'nigger', 'nigga', 'nigg', 'nig', 'niggers', 'niggas', 'negro', 'coon', 'coons', 'spook', 'darkie',
  'fag', 'fagg', 'faggot', 'faggots', 'fags', 'dyke', 'dykes', 'homo', 'homos', 'queer', 'queers',
  'tranny', 'shemale',
  'chink', 'chinks', 'gook', 'gooks', 'kike', 'kikes', 'spic', 'spick', 'spics', 'wetback', 'beaner',
  'jap', 'japs', 'nip', 'nips',
  'gypsy', 'paki',
  'retard', 'tard', 'retarded', 'retards',
  'spaz', 'spastic',
  'cripple', 'midget', 'midgets',

  // 3. BULLYING, CRUEL PUT-DOWNS & INSULTS
  'stupid', 'dumb', 'dummy', 'dumbo',
  'idiot', 'idiots', 'idiotic',
  'moron', 'morons', 'imbecile',
  'loser', 'losers',
  'freak', 'freaks', 'freaky',
  'jerk', 'jerks',
  'dork', 'dorks',
  'ugly', 'uglier', 'ugliest',
  'hate', 'hater', 'haters', 'hates', 'hated', 'hatred',
  'fatso', 'fatty',
  'psycho', 'lunatic',
  'scum', 'scumbag', 'creep', 'creeps', 'creepy', 'perv', 'pervert', 'perverts',
  'suck', 'sucks', 'sucker', 'suckers',

  // 4. SEXUALITY, EROTICISM, ADULT ANATOMY & INTIMACY
  'sex', 'sexx', 'sexy', 'sexist', 'sexual', 'sexuality',
  'lust', 'lusty',
  'horny',
  'kink', 'kinky',
  'nude', 'nudes', 'naked', 'nudity',
  'strip', 'strips', 'stripper', 'strippers', 'stripping',
  'bra', 'bras', 'thong', 'thongs', 'panty', 'panties', 'undies',
  'penis', 'vagina', 'anus', 'rectum', 'genital', 'genitals', 'pubic', 'scrotum', 'testicle', 'testicles',
  'grope', 'groped', 'groping', 'fondle', 'molest', 'molester', 'rape', 'rapist', 'rapes', 'raping', 'incest', 'pedo', 'pedophile',
  'erect', 'erection',
  'orgasm', 'orgasms',
  'semen', 'sperm',
  'condom', 'condoms',
  'prostitute', 'hooker', 'hookers', 'pimp', 'pimps', 'escort',
  'virgin', 'virgins',

  // 5. SUBSTANCES, DRUGS, ALCOHOL, TOBACCO & INTOXICATION
  'beer', 'beers', 'ale', 'ales', 'wine', 'wines', 'liquor', 'booze', 'vodka', 'gin', 'rum', 'whiskey', 'whisky',
  'drunk', 'drunks', 'drunken', 'wasted', 'buzzed', 'tipsy', 'hangover',
  'weed', 'weeds', 'pot', 'blunt', 'blunts', 'joint', 'joints', 'bong', 'bongs',
  'meth', 'crack', 'coke', 'cocaine', 'heroin', 'fentanyl', 'dope', 'drugg', 'drugs',
  'stoned', 'high',
  'pill', 'pills', 'acid', 'trip', 'tripping',
  'vape', 'vapes', 'vaping', 'juul', 'cig', 'cigs', 'cigarette', 'cigarettes', 'tobacco',
  'sniff', 'snort',

  // 6. VIOLENCE, WEAPONS, GORE, DEATH & HARM
  'kill', 'kills', 'killer', 'killers', 'killing', 'killed',
  'murder', 'murders', 'murderer', 'murdering', 'murdered',
  'die', 'dies', 'dying', 'dead', 'death', 'deaths', 'fatal',
  'corpse', 'corpses', 'casket', 'coffin', 'grave', 'graves', 'cemetery',
  'suicide', 'suicidal',
  'gun', 'guns', 'pistol', 'pistols', 'rifle', 'rifles', 'shotgun', 'bullet', 'bullets', 'ammo', 'firearm',
  'shoot', 'shoots', 'shooting', 'shot', 'shooter', 'shooters',
  'stab', 'stabs', 'stabbing', 'stabbed',
  'knife', 'knives', 'blade', 'blades', 'dagger', 'daggers',
  'bomb', 'bombs', 'bombing', 'bombed', 'blast', 'nuke', 'grenade', 'dynamite', 'explosive',
  'blood', 'bloody', 'bleed', 'bleeds', 'bleeding',
  'gore', 'gory',
  'slay', 'slayer', 'slain', 'decapitate', 'behead', 'mutilate', 'torture',
  'choke', 'chokes', 'choking', 'strangle',
  'hang', 'hanging', 'hangman', 'noose',
  'wound', 'wounds', 'wounded',
  'poison', 'poisons', 'poisonous',
  'hell', 'demon', 'demons', 'demonic', 'devil', 'devils', 'satan', 'satanic',

  // 7. BATHROOM HUMOR, BODILY WASTES & GROSS-OUTS
  'poop', 'poops', 'pooped', 'pooping', 'pooh', 'poo',
  'pee', 'pees', 'peed', 'peeing',
  'piddle', 'tinkle',
  'fart', 'farts', 'farted', 'farting',
  'shart', 'sharts',
  'turd', 'turds',
  'puke', 'pukes', 'puked', 'puking', 'barf', 'barfs', 'barfed', 'barfing', 'vomit', 'vomiting',
  'snot', 'snotty', 'phlegm', 'booger', 'boogers',
  'feces', 'urine', 'urinate',
  'butt', 'butts', 'buttcrack', 'butthole',
]);

// High-severity roots that automatically flag compound words or affix combinations
const SEVERE_ROOTS = [
  'fuck', 'fuk', 'shit', 'shyt', 'bitch', 'cunt', 'nigg', 'fagg', 'cock', 'dick',
  'piss', 'whore', 'slut', 'twat', 'puss', 'dildo', 'kill', 'murd', 'rape', 'porn',
  'poop', 'fart', 'puke', 'barf', 'turd', 'titt', 'boob',
];

export function isClassroomInappropriate(word: string): boolean {
  if (!word) return false;
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return false;

  // 1. Direct set lookup
  if (INAPPROPRIATE_WORDS.has(clean)) {
    return true;
  }

  // 2. High-severity root match (e.g. 'farting', 'killer', 'shittiest', 'buttcrack')
  for (const root of SEVERE_ROOTS) {
    if (clean.includes(root)) {
      return true;
    }
  }

  return false;
}
