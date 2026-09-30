import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Sun, Moon } from 'lucide-react';
import { BlendingBoard } from '@/components/board/BlendingBoard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CURRICULUM_PRESETS } from '@/data/presets';

interface BoardPageProps {
  searchParams?: Promise<{
    deck?: string;
  }>;
}

export default async function BoardPage(props: BoardPageProps) {
  const searchParams = await props.searchParams;
  const deckId = searchParams?.deck;
  const initialPreset = deckId
    ? CURRICULUM_PRESETS.find((p) => p.id === deckId)
    : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top App Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            title="Return home"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              P
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              Inkwell Phonics
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/decks"
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            All Decks
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Board View */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <BlendingBoard initialPreset={initialPreset} />
      </main>
    </div>
  );
}
