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

export interface DeckPreset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  columnCount: 3 | 4 | 5;
  category: '3-column' | '4-column' | '5-column';
  columns: ColumnConfig[];
  exampleWords: string[];
  tags: string[];
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
}
