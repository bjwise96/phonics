import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Layers,
  Sparkles,
  Plus,
  FolderHeart,
  SlidersHorizontal,
  Edit3,
} from 'lucide-react';
import { CURRICULUM_PRESETS } from '@/data/presets';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserNav } from '@/components/UserNav';
import { getUserDecks } from '@/lib/actions/decks';

export const dynamic = 'force-dynamic';

export default async function DecksPage() {
  const userDecks = await getUserDecks();

  const threeCol = CURRICULUM_PRESETS.filter((d) => d.category === '3-column');
  const fourCol = CURRICULUM_PRESETS.filter((d) => d.category === '4-column');
  const fiveCol = CURRICULUM_PRESETS.filter((d) => d.category === '5-column');

  const renderSection = (
    title: string,
    subtitle: string,
    decks: typeof CURRICULUM_PRESETS,
    isUser = false
  ) => (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            {isUser && <FolderHeart className="w-6 h-6 text-pink-500" />}
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {deck.columnCount} Columns
                </span>
                <div className="flex gap-1">
                  {deck.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {deck.title}
              </h3>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {deck.subtitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                {deck.description}
              </p>

              {/* Column Structure Breakdown */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 mb-4">
                {deck.columns.map((col, idx) => (
                  <div key={col.id} className="text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">
                      Col {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                      {col.tiles.slice(0, 3).join(', ')}...
                    </span>
                  </div>
                ))}
              </div>

              {/* Example Words */}
              {deck.exampleWords && deck.exampleWords.length > 0 && (
                <div className="text-xs text-slate-500 mb-4">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Sample Words:{' '}
                  </span>
                  <span>{deck.exampleWords.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={`/board?deck=${deck.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Launch on Board
              </Link>

              {isUser ? (
                <Link
                  href={`/decks/${deck.id}/edit`}
                  className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  title="Edit Deck"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Link>
              ) : (
                <Link
                  href={`/decks/new?template=${deck.id}`}
                  className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  title="Customize this deck in Configurator"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Customize
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
              P
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Curriculum Decks & Configurator
              </h1>
              <p className="text-[11px] text-slate-500">
                12 Structured Phonics Blending Decks + Custom Configured Decks
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/decks/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Build Custom Deck
          </Link>
          <Link
            href="/board"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm hover:bg-slate-800 dark:hover:bg-white transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Open Board
          </Link>
          <ThemeToggle />
          <UserNav />
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full space-y-8">
        {/* Callout Banner: Build Custom Deck */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> New: Board Configurator
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Create Your Own Custom Blending Board
            </h2>
            <p className="text-sm text-blue-100 max-w-xl">
              Choose 2 to 6 columns, select from preconstructed phonics packs (digraphs, blends, vowel teams), and verify valid/real decodable words before presenting.
            </p>
          </div>
          <Link
            href="/decks/new"
            className="px-6 py-3 rounded-2xl bg-white text-indigo-700 hover:bg-blue-50 font-black text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap self-start sm:self-auto flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Launch Configurator
          </Link>
        </div>

        {userDecks.length > 0 &&
          renderSection(
            'My Saved Decks',
            'Your custom customized word lists and lesson deck configurations.',
            userDecks,
            true
          )}

        {renderSection(
          '3-Column Decks',
          'Consonant - Vowel - Consonant structures, digraphs, initial/final blends, and vowel teams.',
          threeCol
        )}

        {renderSection(
          '4-Column Decks',
          'Complex syllable structures, Silent-E (VCe), R-controlled vowels, and Consonant-le endings.',
          fourCol
        )}

        {renderSection(
          '5-Column Decks',
          'Advanced multisyllabic decoding, complex blends, compound word chaining, and inflected suffixes.',
          fiveCol
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        Part of the Project Inkwell Fleet • Second Grade Classroom Edition
      </footer>
    </div>
  );
}
