'use client';

import React, { useState, useMemo } from 'react';
import { PhonicsRole } from '@/types/phonics';
import { SMART_TILE_PACKS, TilePack } from '@/lib/tile-bank';
import { TileChip } from './TileChip';
import { X, Plus, Check, Sparkles, Search } from 'lucide-react';

interface TileBankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  columnLabel: string;
  columnRole: PhonicsRole;
  currentTiles: string[];
  onAddTiles: (tiles: string[]) => void;
  onToggleTile: (tile: string) => void;
}

export const TileBankDrawer: React.FC<TileBankDrawerProps> = ({
  isOpen,
  onClose,
  columnLabel,
  columnRole,
  currentTiles,
  onAddTiles,
  onToggleTile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState('');

  const currentSet = useMemo(() => new Set(currentTiles), [currentTiles]);

  const categories = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'consonants', label: 'Consonants' },
    { id: 'vowels', label: 'Vowels' },
    { id: 'digraphs', label: 'Digraphs' },
    { id: 'blends', label: 'Blends' },
    { id: 'teams', label: 'Vowel Teams' },
    { id: 'affixes', label: 'Affixes & Silent-E' },
    { id: 'all', label: 'All Packs' },
  ];

  const filteredPacks = useMemo(() => {
    return SMART_TILE_PACKS.filter((pack) => {
      // Category filter
      if (selectedCategory === 'recommended') {
        if (pack.suggestedRole !== columnRole && !(columnRole === 'blend' && pack.category === 'digraphs')) {
          return false;
        }
      } else if (selectedCategory !== 'all') {
        if (pack.category !== selectedCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = pack.name.toLowerCase().includes(q);
        const matchesTiles = pack.tiles.some((t) => t.toLowerCase().includes(q));
        return matchesName || matchesTiles;
      }

      return true;
    });
  }, [selectedCategory, columnRole, searchQuery]);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.toLowerCase().trim();
    if (!trimmed) return;
    if (!currentSet.has(trimmed)) {
      onAddTiles([trimmed]);
    }
    setCustomInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Smart Tile Bank
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Adding to <strong className="text-slate-700 dark:text-slate-300">{columnLabel}</strong> ({columnRole.replace('_', ' ')}) • {currentTiles.length} tiles currently selected
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tiles or phonics packs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Quick Custom Tile Input */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <input
              type="text"
              placeholder="Type custom tile..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-36 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>
        </div>

        {/* Category Pills */}
        <div className="px-6 py-2.5 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tile Packs List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredPacks.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No phonics packs match your search or filter.
            </div>
          ) : (
            filteredPacks.map((pack) => {
              const allAdded = pack.tiles.every((t) => currentSet.has(t));
              return (
                <div
                  key={pack.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {pack.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {pack.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddTiles(pack.tiles)}
                      disabled={allAdded}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        allAdded
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 opacity-80 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-105 active:scale-95'
                      }`}
                    >
                      {allAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> All Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add All ({pack.tiles.length})
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tile Chips Grid */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {pack.tiles.map((tile) => {
                      const isSelected = currentSet.has(tile);
                      return (
                        <TileChip
                          key={tile}
                          tile={tile}
                          role={pack.suggestedRole}
                          selected={isSelected}
                          onClick={() => onToggleTile(tile)}
                          size="sm"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Tip: Click any tile chip to quickly add or remove it from the column.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm transition-colors shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
