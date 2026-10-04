'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnConfig, WordClassification, WordOverrideMap } from '@/types/phonics';
import { ColumnEditorCard } from './ColumnEditorCard';
import { WordMatrixExplorer } from './WordMatrixExplorer';
import {
  X,
  Check,
  Plus,
  LayoutGrid,
  Sparkles,
  Save,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface QuickConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  wordOverrides?: WordOverrideMap;
  deckTitle?: string;
  deckId?: string;
  onApplyConfig: (newColumns: ColumnConfig[], newOverrides: WordOverrideMap) => void;
  onSaveToLibrary?: (
    title: string,
    columns: ColumnConfig[],
    overrides: WordOverrideMap
  ) => Promise<{ success: boolean; newDeckId?: string; error?: string }>;
}

export const QuickConfigModal: React.FC<QuickConfigModalProps> = ({
  isOpen,
  onClose,
  columns: initialColumns,
  wordOverrides: initialOverrides = {},
  deckTitle = 'Custom Blending Board',
  deckId,
  onApplyConfig,
  onSaveToLibrary,
}) => {
  const router = useRouter();
  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);
  const [overrides, setOverrides] = useState<WordOverrideMap>(initialOverrides);
  const [title, setTitle] = useState(deckTitle);
  const [activeTab, setActiveTab] = useState<'columns' | 'matrix'>('columns');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Synchronize state with current board properties whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setColumns(initialColumns);
      setOverrides(initialOverrides || {});
      setTitle(deckTitle || 'Custom Blending Board');
      setSaveSuccess(false);
      setSaveError(null);
    }
  }, [isOpen, initialColumns, initialOverrides, deckTitle]);

  if (!isOpen) return null;

  const handleAddColumn = () => {
    if (columns.length >= 6) return;
    const newCol: ColumnConfig = {
      id: `col-${Date.now()}`,
      label: `Column ${columns.length + 1}`,
      role: 'consonant',
      tiles: ['b', 'd', 'm'],
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
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleToggleOverride = (word: string, targetClassification: WordClassification) => {
    setOverrides((prev) => ({
      ...prev,
      [word]: targetClassification,
    }));
  };

  const handleApply = () => {
    onApplyConfig(columns, overrides);
    onClose();
  };

  const handleSave = async () => {
    if (!onSaveToLibrary) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await onSaveToLibrary(title, columns, overrides);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(res.error || 'Failed to save');
      }
    } catch (e: any) {
      setSaveError(e.message || 'Error saving to library');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenFullStudio = () => {
    // Persist current in-progress adjustments to localStorage before routing to studio
    try {
      const currentDeck = {
        id: deckId || `custom-${Date.now()}`,
        title,
        columnCount: columns.length,
        columns,
        wordOverrides: overrides,
        tags: ['Custom'],
      };
      localStorage.setItem('inkwell_active_deck', JSON.stringify(currentDeck));
    } catch {}

    onClose();
    router.push('/decks/new?fromActive=true');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                P
              </span>
              Customize Active Blending Board
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Adjust tiles, add columns, or preview valid combinations for this classroom lesson
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Studio Link */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('columns')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'columns'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Columns ({columns.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Word Matrix
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'columns' && (
              <button
                type="button"
                onClick={handleAddColumn}
                disabled={columns.length >= 6}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 flex items-center gap-1 transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Add Column ({columns.length}/6)
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenFullStudio}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-colors"
              title="Open this deck in the full Board Configurator Studio"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Studio</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'columns' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          ) : (
            <WordMatrixExplorer
              columns={columns}
              overrides={overrides}
              onToggleOverride={handleToggleOverride}
              onClearOverrides={() => setOverrides({})}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            {saveError && (
              <span className="text-xs text-rose-500 font-semibold">{saveError}</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {onSaveToLibrary && (
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || columns.some((c) => c.tiles.length === 0)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-40"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Saved to Library!
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Save to Library
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleApply}
              disabled={columns.some((c) => c.tiles.length === 0)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Check className="w-4 h-4" />
              Apply to Active Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
