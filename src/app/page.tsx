import React from 'react';
import Link from 'next/link';
import { Sparkles, Play, BookOpen, Layers } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-xl">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              Inkwell Phonics
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                Primary Board
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive Digital Blending Board for 2nd Grade
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Systematic Scope & Sequence (HD Word & Orton-Gillingham)</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Tactile Phonics Blending <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Engineered for Teachers
          </span>
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-8">
          Designed specifically for classroom smartboards and tablets. Smooth card-flipping, 
          instant column locking, real/nonsense word verification, and 3, 4, or 5-column curriculum decks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/board"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-current" />
            Launch Blending Board
          </Link>

          <Link
            href="/decks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200 font-semibold text-base shadow-sm transition-all"
          >
            <Layers className="w-5 h-5 text-slate-500" />
            Curriculum Decks
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        Part of the <strong className="font-semibold text-slate-700 dark:text-slate-300">Project Inkwell</strong> Fleet • Second Grade Classroom Edition
      </footer>
    </div>
  );
}
