export type PhonicsRole =
  | 'consonant'
  | 'short_vowel'
  | 'vowel_team'
  | 'r_controlled'
  | 'silent_e'
  | 'affix'
  | 'blend';

export interface ColumnConfig {
  id: string;
  label: string;
  role: PhonicsRole;
  tiles: string[];
  defaultLocked?: boolean;
}

export type WordClassification = 'real' | 'nonsense' | 'invalid';

export type WordOverrideMap = Record<string, WordClassification>;

export interface AnalyzedWord {
  word: string;
  classification: WordClassification;
  reason?: string;
  isOverride?: boolean;
}

export interface DeckPreset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  columnCount: number;
  category: '2-column' | '3-column' | '4-column' | '5-column' | '6-column' | 'custom';
  columns: ColumnConfig[];
  exampleWords: string[];
  tags: string[];
  wordOverrides?: WordOverrideMap;
}

export interface ActiveBoardState {
  deckId: string;
  deckTitle: string;
  columnCount: number;
  columns: {
    id: string;
    label: string;
    role: PhonicsRole;
    tiles: string[];
    currentIndex: number;
    isLocked: boolean;
  }[];
  wordOverrides?: WordOverrideMap;
}
