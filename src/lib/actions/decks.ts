'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { decks, deckColumns, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { CURRICULUM_PRESETS } from '@/data/presets';
import { DeckPreset, ColumnConfig } from '@/types/phonics';

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
        columnCount: d.columnCount as 3 | 4 | 5,
        category: `${d.columnCount}-column` as '3-column' | '4-column' | '5-column',
        exampleWords: d.exampleWords || [],
        tags: d.tags || ['Custom'],
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
