'use client';

import React, { useState } from 'react';
import { ColumnConfig } from '@/types/phonics';
import { TileChip } from './TileChip';
import { TileBankDrawer } from './TileBankDrawer';
import { ROLE_METADATA, detectPhonicsRole } from '@/lib/tile-bank';
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Sparkles,
  Plus,
  AlertCircle,
} from 'lucide-react';

interface ColumnEditorCardProps {
  column: ColumnConfig;
  index: number;
  totalColumns: number;
  onUpdateColumn: (updated: ColumnConfig) => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onDeleteColumn?: () => void;
}

export const ColumnEditorCard: React.FC<ColumnEditorCardProps> = ({
  column,
  index,
  totalColumns,
  onUpdateColumn,
  onMoveLeft,
  onMoveRight,
  onDeleteColumn,
}) => {
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [quickTileInput, setQuickTileInput] = useState('');

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateColumn({ ...column, label: e.target.value });
  };

  const handleRemoveTile = (tileToRemove: string) => {
    const remaining = column.tiles.filter((t) => t !== tileToRemove);
    onUpdateColumn({
      ...column,
      tiles: remaining,
    });
  };

  const handleAddTiles = (newTiles: string[]) => {
    const currentSet = new Set(column.tiles);
    const toAdd = newTiles.filter((t) => !currentSet.has(t));
    if (toAdd.length > 0) {
      const combined = [...column.tiles, ...toAdd];
      const newRole =
        column.tiles.length === 0 ? detectPhonicsRole(combined, column.role) : column.role;
      onUpdateColumn({
        ...column,
        tiles: combined,
        role: newRole,
      });
    }
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickTileInput.trim().toLowerCase();
    if (!clean) return;

    const parsed = clean.split(/[\s,]+/).filter((t) => t.length > 0);
    handleAddTiles(parsed);
    setQuickTileInput('');
  };

  const roleMeta = ROLE_METADATA[column.role] || ROLE_METADATA.consonant;

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700">
        {/* Column Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
              {index + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Col {index + 1} of {totalColumns}
            </span>
          </div>

          {/* Action buttons (Move & Delete) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onMoveLeft}
              disabled={!onMoveLeft}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Move Column Left"
              aria-label="Move Column Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onMoveRight}
              disabled={!onMoveRight}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Move Column Right"
              aria-label="Move Column Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {onDeleteColumn && (
              <button
                type="button"
                onClick={onDeleteColumn}
                disabled={totalColumns <= 2}
                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 disabled:opacity-30 disabled:pointer-events-none transition-colors ml-1"
                title={totalColumns <= 2 ? 'Minimum 2 columns required' : 'Delete Column'}
                aria-label="Delete Column"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Column Metadata & Phonics Theme (Replaces standalone dropdown picklist) */}
        <div className="p-4 space-y-3 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          {/* Label Input */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Column Label
            </label>
            <input
              type="text"
              value={column.label}
              onChange={handleLabelChange}
              placeholder="e.g. Initial Onset, Medial Vowel"
              className="w-full px-3 py-1.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all"
            />
          </div>

          {/* Phonics Theme Badge (Auto-classified from tiles) */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Phonics Theme
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleMeta.badgeBg} ${roleMeta.badgeText} ${roleMeta.badgeBorder}`}
            >
              <span className={`w-2 h-2 rounded-full ${roleMeta.dotBg}`} />
              {roleMeta.label} ({roleMeta.colorName})
            </span>
          </div>

          {/* Shuttle Launcher Button */}
          <button
            type="button"
            onClick={() => setIsBankOpen(true)}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Configure Tiles & Phonics Packs</span>
          </button>
        </div>

        {/* Tile Management Section */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                Active Tiles
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                  {column.tiles.length}
                </span>
              </span>
            </div>

            {/* Chips Container */}
            {column.tiles.length === 0 ? (
              <div
                onClick={() => setIsBankOpen(true)}
                className="p-4 rounded-xl border-2 border-dashed border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-center cursor-pointer hover:bg-rose-50/80 transition-colors"
              >
                <AlertCircle className="w-5 h-5 mx-auto text-rose-500 mb-1" />
                <p className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  No tiles in this column
                </p>
                <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                  Click here to configure tiles & phonics packs
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {column.tiles.map((tile) => (
                  <TileChip
                    key={tile}
                    tile={tile}
                    role={column.role}
                    onRemove={() => handleRemoveTile(tile)}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Form */}
          <form onSubmit={handleQuickAdd} className="flex gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              placeholder="Quick add tile(s)..."
              value={quickTileInput}
              onChange={(e) => setQuickTileInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!quickTileInput.trim()}
              className="px-2.5 py-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Two-Panel Shuttle Modal */}
      <TileBankDrawer
        isOpen={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        column={column}
        columnIndex={index}
        totalColumns={totalColumns}
        onUpdateColumn={onUpdateColumn}
      />
    </>
  );
};
