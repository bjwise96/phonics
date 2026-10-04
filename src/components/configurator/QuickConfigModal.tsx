'use client';

import React, { useState } from 'react';
import { ColumnConfig, PhonicsRole, WordClassification, WordOverrideMap } from '@/types/phonics';
import { ColumnEditorCard } from './ColumnEditorCard';
import { WordMatrixExplorer } from './WordMatrixExplorer';
import { X, Check, Plus, LayoutGrid, Sparkles } from 'lucide-react';

interface QuickConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  wordOverrides?: WordOverrideMap;
  onApplyConfig: (newColumns: ColumnConfig[], newOverrides: WordOverrideMap) => void;
}

export const QuickConfigModal: React.FC<QuickConfigModalProps> = ({
  isOpen,
  onClose,
  columns: initialColumns,
  wordOverrides: initialOverrides = {},
  onApplyConfig,
}) => {
  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);
  const [overrides, setOverrides] = useState<WordOverrideMap>(initialOverrides);
  const [activeTab, setActiveTab] = useState<'columns' | 'matrix'>('columns');

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
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

        {/* Tab switcher */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
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
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
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
  );
};
