import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  jsonb,
} from 'drizzle-orm/pg-core';
import type { WordOverrideMap } from '@/types/phonics';

// Users table (mirrors Clerk identity)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk User ID (e.g. user_2abc...)
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Decks table (both system presets and teacher-saved custom configurations)
export const decks = pgTable('decks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  columnCount: integer('column_count').notNull(), // 2, 3, 4, 5, or 6
  isPreset: boolean('is_preset').default(false).notNull(),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  exampleWords: jsonb('example_words').$type<string[]>().default([]).notNull(),
  wordOverrides: jsonb('word_overrides').$type<WordOverrideMap>().default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Deck columns table
export const deckColumns = pgTable('deck_columns', {
  id: uuid('id').defaultRandom().primaryKey(),
  deckId: uuid('deck_id')
    .references(() => decks.id, { onDelete: 'cascade' })
    .notNull(),
  position: integer('position').notNull(), // 0-indexed column order (0 to 5)
  label: text('label').notNull(), // e.g. "Initial Onset", "Medial Vowel"
  role: text('role').notNull(), // 'consonant' | 'short_vowel' | 'vowel_team' | 'r_controlled' | 'silent_e' | 'affix' | 'blend'
  tiles: jsonb('tiles').$type<string[]>().notNull(), // ['b', 'c', 'f', ...]
  defaultLocked: boolean('default_locked').default(false).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Deck = typeof decks.$inferSelect;
export type NewDeck = typeof decks.$inferInsert;
export type DeckColumn = typeof deckColumns.$inferSelect;
export type NewDeckColumn = typeof deckColumns.$inferInsert;
