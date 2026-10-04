'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { decks, deckColumns, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { CURRICULUM_PRESETS } from '@/data/presets';
import { DeckPreset, ColumnConfig, WordOverrideMap } from '@/types/phonics';

export async function getUserDecks(): Promise<DeckPreset[]> {
  try {
    const { userId } = await auth();
    if (!userId || !db) {
      return [];
    }

    const userDecksData = await db
      .select()
      .from(decks)
      .where(eq(decks.userId, userId));

    const result: DeckPreset[] = [];

    for (const d of userDecksData) {
      const cols = await db
        .select()
        .from(deckColumns)
        .where(eq(deckColumns.deckId, d.id))
        .orderBy(deckColumns.position);

      result.push({
        id: d.id,
        title: d.title,
        subtitle: d.subtitle || 'Custom Teacher Deck',
        description: d.description || '',
        columnCount: d.columnCount,
        category: (d.columnCount === 2 ? '2-column' : d.columnCount === 3 ? '3-column' : d.columnCount === 4 ? '4-column' : d.columnCount === 5 ? '5-column' : 'custom') as any,
        exampleWords: d.exampleWords || [],
        tags: d.tags || ['Custom'],
        wordOverrides: d.wordOverrides || {},
        columns: cols.map((c) => ({
          id: c.id,
          label: c.label,
          role: c.role as any,
          tiles: c.tiles,
          defaultLocked: c.defaultLocked,
        })),
      });
    }

    return result;
  } catch (error) {
    console.error('Failed to fetch user decks:', error);
    return [];
  }
}

export async function getDeckById(deckId: string): Promise<DeckPreset | null> {
  try {
    // 1. Check curriculum presets first
    const preset = CURRICULUM_PRESETS.find((p) => p.id === deckId);
    if (preset) {
      return preset;
    }

    // 2. Check database
    if (!db) return null;

    const [deck] = await db.select().from(decks).where(eq(decks.id, deckId)).limit(1);
    if (!deck) return null;

    const cols = await db
      .select()
      .from(deckColumns)
      .where(eq(deckColumns.deckId, deck.id))
      .orderBy(deckColumns.position);

    return {
      id: deck.id,
      title: deck.title,
      subtitle: deck.subtitle || '',
      description: deck.description || '',
      columnCount: deck.columnCount,
      category: (deck.columnCount === 2 ? '2-column' : deck.columnCount === 3 ? '3-column' : deck.columnCount === 4 ? '4-column' : deck.columnCount === 5 ? '5-column' : 'custom') as any,
      exampleWords: deck.exampleWords || [],
      tags: deck.tags || ['Custom'],
      wordOverrides: deck.wordOverrides || {},
      columns: cols.map((c) => ({
        id: c.id,
        label: c.label,
        role: c.role as any,
        tiles: c.tiles,
        defaultLocked: c.defaultLocked,
      })),
    };
  } catch (err) {
    console.error('Failed to get deck by ID:', err);
    return null;
  }
}

export async function saveCustomDeck(deck: {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  columnCount: number;
  columns: ColumnConfig[];
  wordOverrides?: WordOverrideMap;
  tags?: string[];
}): Promise<{ success: boolean; newDeckId?: string; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Sign in required to save decks to your library.' };
    }
    if (!db) {
      return { success: false, error: 'Database service is currently unavailable.' };
    }

    // Ensure user record exists
    await db
      .insert(users)
      .values({
        id: userId,
        email: 'teacher@projectinkwell.app',
      })
      .onConflictDoNothing();

    // Check if updating existing deck
    if (deck.id) {
      const [existing] = await db
        .select()
        .from(decks)
        .where(and(eq(decks.id, deck.id), eq(decks.userId, userId)))
        .limit(1);

      if (existing) {
        await db
          .update(decks)
          .set({
            title: deck.title,
            subtitle: deck.subtitle || '',
            description: deck.description || '',
            columnCount: deck.columnCount,
            tags: deck.tags || ['Custom'],
            wordOverrides: deck.wordOverrides || {},
            updatedAt: new Date(),
          })
          .where(eq(decks.id, deck.id));

        // Delete existing columns and re-insert
        await db.delete(deckColumns).where(eq(deckColumns.deckId, deck.id));

        for (let i = 0; i < deck.columns.length; i++) {
          const col = deck.columns[i];
          await db.insert(deckColumns).values({
            deckId: deck.id,
            position: i,
            label: col.label,
            role: col.role,
            tiles: col.tiles,
            defaultLocked: Boolean(col.defaultLocked),
          });
        }

        return { success: true, newDeckId: deck.id };
      }
    }

    // Create new deck
    const [newDeck] = await db
      .insert(decks)
      .values({
        userId,
        title: deck.title,
        subtitle: deck.subtitle || 'Custom Teacher Deck',
        description: deck.description || '',
        columnCount: deck.columnCount,
        isPreset: false,
        tags: deck.tags || ['Custom'],
        exampleWords: [],
        wordOverrides: deck.wordOverrides || {},
      })
      .returning();

    for (let i = 0; i < deck.columns.length; i++) {
      const col = deck.columns[i];
      await db.insert(deckColumns).values({
        deckId: newDeck.id,
        position: i,
        label: col.label,
        role: col.role,
        tiles: col.tiles,
        defaultLocked: Boolean(col.defaultLocked),
      });
    }

    return { success: true, newDeckId: newDeck.id };
  } catch (err: any) {
    console.error('Failed to save custom deck:', err);
    return { success: false, error: err.message || 'Failed to save deck' };
  }
}

export async function updateWordOverrides(
  deckId: string,
  wordOverrides: WordOverrideMap
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId || !db) {
      return { success: false, error: 'Unauthorized or database unavailable.' };
    }

    await db
      .update(decks)
      .set({
        wordOverrides,
        updatedAt: new Date(),
      })
      .where(and(eq(decks.id, deckId), eq(decks.userId, userId)));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update overrides' };
  }
}

export async function duplicatePresetDeck(presetId: string): Promise<{ success: boolean; newDeckId?: string; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Sign in required to save decks.' };
    }
    if (!db) {
      return { success: false, error: 'Database service is currently unavailable.' };
    }

    const preset = CURRICULUM_PRESETS.find((p) => p.id === presetId);
    if (!preset) {
      return { success: false, error: 'Preset not found.' };
    }

    // Ensure user record exists
    await db
      .insert(users)
      .values({
        id: userId,
        email: 'teacher@projectinkwell.app',
      })
      .onConflictDoNothing();

    // Insert new cloned deck
    const [newDeck] = await db
      .insert(decks)
      .values({
        userId,
        title: `${preset.title} (My Copy)`,
        subtitle: preset.subtitle,
        description: preset.description,
        columnCount: preset.columnCount,
        isPreset: false,
        tags: [...preset.tags, 'Customized'],
        exampleWords: preset.exampleWords,
        wordOverrides: preset.wordOverrides || {},
      })
      .returning();

    // Insert columns
    for (let i = 0; i < preset.columns.length; i++) {
      const col = preset.columns[i];
      await db.insert(deckColumns).values({
        deckId: newDeck.id,
        position: i,
        label: col.label,
        role: col.role,
        tiles: col.tiles,
        defaultLocked: Boolean(col.defaultLocked),
      });
    }

    return { success: true, newDeckId: newDeck.id };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to clone deck' };
  }
}

export async function deleteUserDeck(deckId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId || !db) {
      return { success: false, error: 'Unauthorized or database unavailable.' };
    }

    await db
      .delete(decks)
      .where(and(eq(decks.id, deckId), eq(decks.userId, userId)));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete deck' };
  }
}
