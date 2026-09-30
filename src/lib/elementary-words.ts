// Primary grade word list covering CVC, digraphs, blends, vowel teams, silent-e, and common compounds.

export const ELEMENTARY_WORD_LIST: string[] = [
  // CVC words
  'bat', 'cat', 'fat', 'hat', 'mat', 'pat', 'rat', 'sat', 'bad', 'dad', 'had', 'mad', 'pad', 'sad',
  'bag', 'rag', 'tag', 'wag', 'ham', 'jam', 'ram', 'yam', 'can', 'fan', 'man', 'pan', 'ran', 'tan', 'van',
  'cap', 'gap', 'lap', 'map', 'nap', 'rap', 'sap', 'tap', 'gas',
  'bed', 'fed', 'led', 'red', 'wed', 'beg', 'leg', 'peg', 'hem', 'den', 'hen', 'men', 'pen', 'ten',
  'get', 'jet', 'let', 'met', 'net', 'pet', 'set', 'vet', 'wet', 'yet',
  'bib', 'rib', 'bid', 'did', 'hid', 'kid', 'lid', 'rid', 'big', 'dig', 'fig', 'gig', 'pig', 'wig',
  'dim', 'him', 'rim', 'bin', 'fin', 'pin', 'sin', 'tin', 'win', 'dip', 'hip', 'lip', 'nip', 'rip', 'sip', 'tip', 'zip',
  'bit', 'fit', 'hit', 'kit', 'lit', 'pit', 'sit', 'fix', 'mix', 'six',
  'cob', 'gob', 'job', 'mob', 'rob', 'sob', 'cod', 'nod', 'pod', 'rod', 'bog', 'dog', 'fog', 'hog', 'jog', 'log',
  'mom', 'con', 'cop', 'hop', 'mop', 'pop', 'top', 'cot', 'dot', 'got', 'hot', 'lot', 'not', 'pot', 'rot', 'box', 'fox',
  'cub', 'hub', 'rub', 'sub', 'tub', 'bud', 'mud', 'bug', 'dug', 'hug', 'jug', 'lug', 'mug', 'pug', 'rug', 'tug',
  'gum', 'hum', 'mum', 'sum', 'bun', 'fun', 'gun', 'nun', 'run', 'sun', 'cup', 'pup', 'bus', 'cut', 'gut', 'hut', 'nut', 'rut',

  // Digraphs & Trigraphs
  'chat', 'chin', 'chop', 'chug', 'chip', 'rich', 'much', 'such',
  'ship', 'shop', 'shed', 'shin', 'shot', 'shut', 'fish', 'dish', 'wish', 'mash', 'rash', 'cash', 'dash', 'lash', 'rush', 'hush',
  'that', 'then', 'them', 'this', 'thin', 'thick', 'thud', 'path', 'math', 'with', 'moth', 'bath',
  'when', 'whip', 'whim', 'whiz',
  'back', 'pack', 'sack', 'tack', 'lack', 'neck', 'peck', 'deck', 'kick', 'lick', 'pick', 'sick', 'tick', 'wick',
  'lock', 'rock', 'sock', 'dock', 'duck', 'luck', 'muck', 'tuck', 'buck',
  'catch', 'match', 'patch', 'watch', 'pitch', 'witch', 'ditch', 'hitch', 'fetch', 'notch', 'hutch',
  'badge', 'bridge', 'dodge', 'edge', 'fudge', 'hedge', 'judge', 'ledge', 'lodge', 'nudge', 'pledge', 'ridge', 'sledge', 'smudge',

  // Blends (CCVC / CVCC)
  'glad', 'slam', 'clap', 'flag', 'plan', 'flat', 'trap', 'grab', 'crab', 'frog', 'trip', 'drop', 'drum',
  'stop', 'step', 'spin', 'spot', 'spit', 'skip', 'skin', 'snap', 'snug', 'swim', 'sled', 'slip', 'slot',
  'camp', 'lamp', 'ramp', 'damp', 'jump', 'bump', 'dump', 'pump', 'lump',
  'bank', 'pink', 'sink', 'wink', 'link', 'think', 'thank', 'honk', 'junk',
  'fast', 'last', 'past', 'cast', 'best', 'nest', 'rest', 'test', 'vest', 'west', 'fist', 'list', 'mist', 'cost', 'lost', 'dust', 'must', 'rust',
  'tent', 'bent', 'rent', 'sent', 'went', 'hunt', 'pant', 'hint', 'mint',
  'belt', 'melt', 'felt', 'pelt', 'colt', 'bolt', 'hand', 'sand', 'band', 'land', 'wind', 'send', 'bend', 'mend',
  'gift', 'lift', 'raft', 'soft', 'left', 'desk', 'mask', 'task',

  // Vowel Teams & Diphthongs
  'rain', 'train', 'pain', 'gain', 'main', 'sail', 'tail', 'mail', 'wait', 'bait',
  'play', 'day', 'may', 'say', 'way', 'stay', 'gray', 'clay', 'tray', 'pray',
  'feet', 'meet', 'seed', 'feed', 'need', 'weed', 'deep', 'keep', 'peep', 'weep', 'seen', 'green', 'tree', 'free', 'bee', 'see',
  'read', 'meat', 'seat', 'heat', 'beat', 'leaf', 'team', 'bean', 'clean', 'dream', 'teach', 'reach',
  'high', 'sigh', 'light', 'night', 'right', 'sight', 'tight', 'fight', 'bright', 'flight',
  'boat', 'coat', 'goat', 'road', 'toad', 'soap', 'foam', 'load', 'oak',
  'blow', 'flow', 'glow', 'grow', 'know', 'show', 'slow', 'snow', 'throw', 'crow',
  'moon', 'spoon', 'cool', 'fool', 'pool', 'food', 'room', 'zoom', 'boot', 'root', 'tooth',
  'book', 'cook', 'look', 'hook', 'shook', 'took', 'foot', 'good', 'wood',
  'coin', 'join', 'boil', 'soil', 'oil', 'point', 'boy', 'toy', 'joy',
  'cloud', 'loud', 'proud', 'round', 'sound', 'found', 'ground', 'house', 'mouse', 'mouth', 'south', 'out', 'shout',
  'cow', 'now', 'how', 'down', 'town', 'brown', 'clown', 'owl',

  // Silent-E (VCe)
  'bake', 'cake', 'fake', 'lake', 'make', 'rake', 'take', 'wake', 'brake', 'shake', 'snake',
  'came', 'game', 'name', 'same', 'tame', 'flame', 'frame',
  'cane', 'lane', 'pane', 'plane', 'crane',
  'cape', 'tape', 'shape', 'grape', 'base', 'case', 'chase',
  'date', 'gate', 'hate', 'late', 'mate', 'rate', 'plate', 'skate', 'state',
  'cave', 'gave', 'wave', 'brave', 'crave', 'save',
  'hide', 'ride', 'side', 'tide', 'wide', 'slide', 'pride',
  'bike', 'hike', 'like', 'spike', 'strike',
  'file', 'mile', 'pile', 'tile', 'smile', 'while',
  'dime', 'lime', 'time', 'chime', 'crime',
  'fine', 'line', 'mine', 'nine', 'pine', 'vine', 'shine', 'spine',
  'pipe', 'ripe', 'wipe', 'stripe',
  'bite', 'kite', 'site', 'white', 'quite',
  'dive', 'five', 'hive', 'live', 'drive',
  'bone', 'cone', 'tone', 'zone', 'stone', 'phone',
  'rope', 'hope', 'mope', 'scope', 'slope',
  'hose', 'nose', 'rose', 'close', 'chose',
  'note', 'vote', 'wrote',
  'cube', 'tube', 'cute', 'mute', 'flute', 'mule', 'rule', 'tune', 'prune',

  // R-Controlled Vowels
  'car', 'far', 'jar', 'tar', 'star', 'scar', 'bark', 'dark', 'park', 'shark', 'spark',
  'barn', 'yarn', 'farm', 'harm', 'card', 'hard', 'yard', 'cart', 'part', 'start', 'smart',
  'for', 'nor', 'corn', 'horn', 'born', 'torn', 'cork', 'fork', 'pork',
  'cord', 'lord', 'ford', 'fort', 'port', 'sort', 'short', 'sport', 'storm', 'scorf', 'horse',
  'her', 'fern', 'germ', 'herd', 'perch',
  'bird', 'girl', 'dirt', 'shirt', 'skirt', 'stir', 'third', 'first',
  'fur', 'burn', 'turn', 'surf', 'curb', 'curl', 'hurt', 'nurse', 'purse',
  'shore', 'chore', 'snore', 'store', 'score', 'stare', 'share', 'flare', 'scare',

  // Consonant-le Endings & Multisyllables
  'bubble', 'rubble', 'puddle', 'middle', 'riddle', 'candle', 'handle',
  'waffle', 'sniffle', 'giggle', 'jiggle', 'struggle',
  'pickle', 'tickle', 'trickle', 'ankle', 'uncle',
  'apple', 'ripple', 'topple', 'purple', 'simple', 'sample', 'dimple',
  'little', 'bottle', 'settle', 'cattle', 'battle', 'rattle', 'gentle',
  'dazzle', 'fizzle', 'puzzle', 'muzzle',

  // Compound Words & 2-Syllable Chaining
  'catfish', 'napkin', 'sunset', 'pigpen', 'bobcat', 'hotdog', 'cobweb', 'popcorn',
  'backpack', 'bathtub', 'sandpit', 'laptop', 'dustpan', 'pancake', 'campfire',
  'sunshine', 'cupcake', 'starfish', 'flagpole', 'milkman', 'hilltop', 'windmill',

  // Suffixes & Inflected Endings
  'jumping', 'landing', 'standing', 'hunting', 'drifting', 'training', 'floating', 'boasting',
  'jumped', 'landed', 'hunted', 'drifted', 'floated', 'boasted', 'cleaned', 'dreamed',
  'faster', 'slower', 'taller', 'shorter', 'cleaner', 'farmer', 'starter', 'charmer',
  'fastest', 'slowest', 'tallest', 'cleanest',
  'sandy', 'windy', 'dusty', 'rainy', 'funny', 'sunny'
];
