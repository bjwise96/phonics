'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnConfig, DeckPreset, PhonicsRole, WordClassification, WordOverrideMap } from '@/types/phonics';
import { ColumnEditorCard } from './ColumnEditorCard';
import { WordMatrixExplorer } from './WordMatrixExplorer';
import { saveCustomDeck } from '@/lib/actions/decks';
import {
  Play,
  Save,
  Plus,
  LayoutGrid,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import Link from 'next/link';

interface BoardConfiguratorProps {
  initialDeck?: DeckPreset;
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  {
    id: 'col-1',
    label: 'Initial Onset',
    role: 'consonant',
    tiles: ['b', 'c', 'f', 'h', 'm', 'p', 'r', 's', 't'],
  },
  {
    id: 'col-2',
    label: 'Medial Vowel',
    role: 'short_vowel',
    tiles: ['a', 'e', 'i', 'o', 'u'],
  },
  {
    id: 'col-3',
    label: 'Final Coda',
    role: 'consonant',
    tiles: ['b', 'd', 'g', 'm', 'n', 'p', 't'],
  },
];

export const BoardConfigurator: React.FC<BoardConfiguratorProps> = ({ initialDeck }) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialDeck?.title || 'My Custom Phonics Deck');
  const [subtitle, setSubtitle] = useState(initialDeck?.subtitle || 'Custom 2nd Grade Phonics Unit');
  const [description, setDescription] = useState(
    initialDeck?.description || 'Custom interactive blending configuration tailored for classroom phonics instruction.'
  );

  const [columns, setColumns] = useState<ColumnConfig[]>(
    initialDeck?.columns || DEFAULT_COLUMNS
  );

  const [wordOverrides, setWordOverrides] = useState<WordOverrideMap>(
    initialDeck?.wordOverrides || {}
  );

  const [activeTab, setActiveTab] = useState<'columns' | 'matrix'>('columns');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Column operations
  const handleAddColumn = () => {
    if (columns.length >= 6) return;

    let defaultRole: PhonicsRole = 'consonant';
    let defaultLabel = `Column ${columns.length + 1}`;

    if (columns.length === 3) {
      defaultRole = 'silent_e';
      defaultLabel = 'Silent-E';
    } else if (columns.length === 4) {
      defaultRole = 'affix';
      defaultLabel = 'Suffix';
    }

    const newCol: ColumnConfig = {
      id: `col-${Date.now()}`,
      label: defaultLabel,
      role: defaultRole,
      tiles: defaultRole === 'silent_e' ? ['e'] : ['s', 'ed', 'ing'],
    };

    setColumns([...columns, newCol]);
  };

  const handleUpdateColumn = (index: number, updated: ColumnConfig) => {
    const next = [...columns];
    next[index] = updated;
    setColumns(next);
  };

  const handleMoveColumn = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= columns.length) return;
    const next = [...columns];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setColumns(next);
  };

  const handleDeleteColumn = (index: number) => {
    if (columns.length <= 2) return;
    const next = columns.filter((_, i) => i !== index);
    setColumns(next);
  };

  // Word overrides
  const handleToggleOverride = (word: string, targetClassification: WordClassification) => {
    setWordOverrides((prev) => ({
      ...prev,
      [word]: targetClassification,
    }));
  };

  const handleClearOverrides = () => {
    setWordOverrides({});
  };

  // Validation
  const hasEmptyColumns = columns.some((c) => c.tiles.length === 0);

  // Launch on live board immediately (local session storage)
  const handleLaunchOnBoard = () => {
    if (hasEmptyColumns) return;

    const deckData: DeckPreset = {
      id: initialDeck?.id || `custom-${Date.now()}`,
      title,
      subtitle,
      description,
      columnCount: columns.length,
      category: (columns.length === 2 ? '2-column' : columns.length === 3 ? '3-column' : columns.length === 4 ? '4-column' : columns.length === 5 ? '5-column' : 'custom') as any,
      columns,
      exampleWords: [],
      tags: ['Custom'],
      wordOverrides,
    };

    try {
      localStorage.setItem('inkwell_active_deck', JSON.stringify(deckData));
      router.push(`/board?custom=true&t=${Date.now()}`);
    } catch (err) {
      console.error('Failed to store deck:', err);
    }
  };

  // Save to database library
  const handleSaveToLibrary = async () => {
    if (hasEmptyColumns) return;
    setIsSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const res = await saveCustomDeck({
        id: initialDeck?.id,
        title,
        subtitle,
        description,
        columnCount: columns.length,
        columns,
        wordOverrides,
        tags: ['Custom'],
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to save deck');
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with database');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/decks"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to Decks"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                P
              </span>
              Board Configurator
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize columns, graphemes, and verify phonotactic word legality
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSaveToLibrary}
            disabled={hasEmptyColumns || isSaving}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" /> Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Deck'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleLaunchOnBoard}
            disabled={hasEmptyColumns}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Play className="w-4 h-4 fill-white" />
            Play on Board
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Deck Metadata Header Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                Deck Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Silent-E Long Vowels or Digraph Onsets"
                className="w-full px-4 py-2.5 rounded-xl font-bold text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                Subtitle / Concept
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Unit 4 Scope & Sequence"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('columns')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'columns'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Column Layout ({columns.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Word Combinations Matrix
            </button>
          </div>

          {activeTab === 'columns' && (
            <button
              type="button"
              onClick={handleAddColumn}
              disabled={columns.length >= 6}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <Plus className="w-4 h-4" />
              Add Column ({columns.length}/6)
            </button>
          )}
        </div>

        {/* Columns View */}
        {activeTab === 'columns' && (
          <div className="space-y-4">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(
                columns.length,
                4
              )} gap-4`}
            >
              {columns.map((col, idx) => (
                <ColumnEditorCard
                  key={col.id}
                  column={col}
                  index={idx}
                  totalColumns={columns.length}
                  onUpdateColumn={(updated) => handleUpdateColumn(idx, updated)}
                  onMoveLeft={idx > 0 ? () => handleMoveColumn(idx, idx - 1) : undefined}
                  onMoveRight={
                    idx < columns.length - 1 ? () => handleMoveColumn(idx, idx + 1) : undefined
                  }
                  onDeleteColumn={columns.length > 2 ? () => handleDeleteColumn(idx) : undefined}
                />
              ))}
            </div>

            {hasEmptyColumns && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  One or more columns have no tiles. Add at least 1 tile to each column before playing or saving.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Word Matrix View */}
        {activeTab === 'matrix' && (
          <WordMatrixExplorer
            columns={columns}
            overrides={wordOverrides}
            onToggleOverride={handleToggleOverride}
            onClearOverrides={handleClearOverrides}
          />
        )}
      </main>
    </div>
  );
};
