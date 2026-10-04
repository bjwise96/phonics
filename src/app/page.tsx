import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Play,
  Layers,
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Lock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkle,
  Zap,
  Check,
} from 'lucide-react';
import { UserNav } from '@/components/UserNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CURRICULUM_PRESETS } from '@/data/presets';

export default function HomePage() {
  const featuredPresets = CURRICULUM_PRESETS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Application Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-lg">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Inkwell Phonics
                </span>
                <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
                  Primary Grade Board
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center / Right Links & User Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Link
              href="/board"
              className="px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Blending Board
            </Link>
            <Link
              href="/decks"
              className="px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Curriculum Decks
            </Link>
            <Link
              href="/decks/new"
              className="px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Configurator
            </Link>
          </nav>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Alignment Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Aligned with Science of Reading, HD Word & Orton-Gillingham</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          Tactile Phonics Blending <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Engineered for Teachers & SmartBoards
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          The classroom-ready digital blending board for 2nd grade and primary reading instruction.
          Smooth card flips, continuous speech blending, custom column studio, and automatic
          real vs. nonsense word verification.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link
            href="/board"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-current" />
            Launch Blending Board
          </Link>

          <Link
            href="/decks"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Layers className="w-5 h-5 text-indigo-500" />
            Curriculum Decks
          </Link>

          <Link
            href="/decks/new"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-base font-bold transition-all shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Board Studio
          </Link>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <Lock className="w-4 h-4" />
            </span>
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Column Locking</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hold vowels or onsets while cycling sounds</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Real vs. Nonsense</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">29k+ word dictionary & pseudoword engine</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Tile Shuttle Studio</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">1-click Replace or Add phonics packs</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Safety Shield</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Conservative filter built for young children</p>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Classroom-Ready Instruction Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              Everything reading specialists and primary grade educators need for effective whole-class and small-group blending.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Two-Panel Tile Shuttle */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-block">
                  <SlidersHorizontal className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Two-Panel Tile Shuttle
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Easily build and customize 2, 3, 4, 5, or 6-column blending boards. Browse categorized phonics packs (Consonants, Short Vowels, Blends, Digraphs, Vowel Teams, Affixes & Silent-E) and use 1-click &ldquo;Replace Col&rdquo; or &ldquo;+ Add&rdquo; without cumbersome manual setup.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/decks/new"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  Open Board Studio <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 2: 3-Tier Word Analysis Engine */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 inline-block">
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  3-Tier Word Analysis & Matrix
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every card flip is classified in real time as <strong>Real Word</strong> or <strong>Decodable Nonsense Word</strong> using an extensive 29,000+ word elementary lexicon. Preview your entire deck combination matrix before class and adjust any word with a single click.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/board"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  Test Real vs. Nonsense <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 3: Conservative Safety Shield */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 inline-block">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Conservative Classroom Safety
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Designed to protect young children (K–2). Automatically filters profanities, decodable lookalikes, bathroom humor, substance terms, and unpronounceable consonant strings. Inappropriate words are never shown during live smartboard lessons.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Child-Safe Elementary Guard Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Curriculum Presets */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Ready-to-Teach Decks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Curriculum Decks Aligned to 2nd Grade Scope
            </h2>
          </div>
          <Link
            href="/decks"
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            View All Decks ({CURRICULUM_PRESETS.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {preset.columnCount} Columns
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {preset.tags[0]}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {preset.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap gap-1">
                  {preset.exampleWords.slice(0, 3).map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-lexend font-bold"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/board?deck=${preset.id}`}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Play on Board
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Grade Pedagogy Standards Banner */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-950 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Designed for Science of Reading & Early Decoders
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Typography is rendered in <strong>Lexend</strong> featuring true single-story lowercase &lsquo;a&rsquo; and &lsquo;g&rsquo; to eliminate perceptual visual confusion. Large touch targets are calibrated for teacher whiteboard interactions and small-group student participation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/decks/new"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Create Custom Deck
            </Link>
            <Link
              href="/board"
              className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Open Default Board
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              P
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-300">Inkwell Phonics</span>
            <span>• Primary Grade Blending Board</span>
          </div>
          <p className="text-slate-400">
            Part of the <strong className="font-semibold text-slate-600 dark:text-slate-400">Project Inkwell</strong> Fleet • Aligned to Second Grade Scope & Sequence
          </p>
        </div>
      </footer>
    </div>
  );
}
