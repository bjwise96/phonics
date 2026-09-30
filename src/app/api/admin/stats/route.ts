import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedAdminResponse } from '@/lib/auth-admin';
import { db } from '@/db';
import { users, decks } from '@/db/schema';
import { count } from 'drizzle-orm';
import { CURRICULUM_PRESETS } from '@/data/presets';

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return unauthorizedAdminResponse();
  }

  let totalTeachers = 0;
  let totalCustomDecks = 0;

  if (db) {
    try {
      const [userCount] = await db.select({ val: count() }).from(users);
      const [deckCount] = await db.select({ val: count() }).from(decks);
      totalTeachers = userCount?.val || 0;
      totalCustomDecks = deckCount?.val || 0;
    } catch {
      // In case database is initializing
    }
  }

  return NextResponse.json({
    service: 'inkwell-phonics',
    totalTeachers,
    totalCustomDecks,
    totalCurriculumPresets: CURRICULUM_PRESETS.length,
    deckCategories: {
      threeColumn: CURRICULUM_PRESETS.filter((p) => p.category === '3-column').length,
      fourColumn: CURRICULUM_PRESETS.filter((p) => p.category === '4-column').length,
      fiveColumn: CURRICULUM_PRESETS.filter((p) => p.category === '5-column').length,
    },
    cachedAt: new Date().toISOString(),
  });
}
