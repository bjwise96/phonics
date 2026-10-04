'use client';

import React, { useState, useMemo } from 'react';
import { ColumnConfig, PhonicsRole } from '@/types/phonics';
import { SMART_TILE_PACKS, TilePack, ROLE_METADATA, detectPhonicsRole } from '@/lib/tile-bank';
import { TileChip } from './TileChip';
import {
  X,
  Plus,
  Check,
  Sparkles,
  Search,
  RefreshCw,
  Trash2,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface TileBankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  column: ColumnConfig;
  columnIndex: number;
  totalColumns: number;
  onUpdateColumn: (updated: ColumnConfig) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Packs' },
  { id: 'consonants', label: 'Consonants' },
  { id: 'vowels', label: 'Vowels' },
  { id: 'digraphs', label: 'Digraphs' },
  { id: 'blends', label: 'Blends' },
  { id: 'teams', label: 'Vowel Teams' },
  { id: 'affixes', label: 'Affixes & Silent-E' },
] as const;

export const TileBankDrawer: React.FC<TileBankDrawerProps> = ({
  isOpen,
  onClose,
  column,
  columnIndex,
  totalColumns,
  onUpdateColumn,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showRolePicker, setShowRolePicker] = useState(false);

  const currentSet = useMemo(() => new Set(column.tiles), [column.tiles]);

  const filteredPacks = useMemo(() => {
    return SMART_TILE_PACKS.filter((pack) => {
      // Category filter
      if (selectedCategory !== 'all' && pack.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = pack.name.toLowerCase().includes(q);
        const matchesTiles = pack.tiles.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = pack.description.toLowerCase().includes(q);
        return matchesName || matchesTiles || matchesDesc;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Shuttle action: Replace entire column with a pack
  const handleReplaceWithPack = (pack: TilePack) => {
    onUpdateColumn({
      ...column,
      tiles: [...pack.tiles],
      role: pack.suggestedRole,
    });
  };

  // Shuttle action: Add all pack tiles to column
  const handleAddPackTiles = (pack: TilePack) => {
    const toAdd = pack.tiles.filter((t) => !currentSet.has(t));
    if (toAdd.length === 0) return;

    const newTiles = [...column.tiles, ...toAdd];
    // If column was previously empty, also inherit pack's role
    const newRole = column.tiles.length === 0 ? pack.suggestedRole : column.role;

    onUpdateColumn({
      ...column,
      tiles: newTiles,
      role: newRole,
    });
  };

  // Toggle an individual tile chip
  const handleToggleTile = (tile: string, suggestedRole?: PhonicsRole) => {
    if (currentSet.has(tile)) {
      const newTiles = column.tiles.filter((t) => t !== tile);
      onUpdateColumn({
        ...column,
        tiles: newTiles,
      });
    } else {
      const newTiles = [...column.tiles, tile];
      const newRole = column.tiles.length === 0 && suggestedRole ? suggestedRole : column.role;
      onUpdateColumn({
        ...column,
        tiles: newTiles,
        role: newRole,
      });
    }
  };

  // Remove a single tile from current column
  const handleRemoveTile = (tile: string) => {
    const newTiles = column.tiles.filter((t) => t !== tile);
    onUpdateColumn({
      ...column,
      tiles: newTiles,
    });
  };

  // Clear all tiles from current column
  const handleClearColumn = () => {
    onUpdateColumn({
      ...column,
      tiles: [],
    });
  };

  // Add custom tile or comma-separated list of tiles
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const parsed = customInput
      .toLowerCase()
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (parsed.length === 0) return;

    const toAdd = parsed.filter((t) => !currentSet.has(t));
    if (toAdd.length > 0) {
      const newTiles = [...column.tiles, ...toAdd];
      const newRole =
        column.tiles.length === 0 ? detectPhonicsRole(newTiles, column.role) : column.role;
      onUpdateColumn({
        ...column,
        tiles: newTiles,
        role: newRole,
      });
    }

    setCustomInput('');
  };

  // Manual role override
  const handleSelectRole = (newRole: PhonicsRole) => {
    onUpdateColumn({
      ...column,
      role: newRole,
    });
    setShowRolePicker(false);
  };

  // Label change
  const handleLabelChange = (newLabel: string) => {
    onUpdateColumn({
      ...column,
      label: newLabel,
    });
  };

  if (!isOpen) return null;

  const currentRoleMeta = ROLE_METADATA[column.role] || ROLE_METADATA.consonant;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-6xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Tile Shuttle & Phonics Configurator
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Col {columnIndex + 1} of {totalColumns}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Replace or add phonics packs on the left into your column on the right.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close Shuttle Modal"
            aria-label="Close Shuttle Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Two-Panel Shuttle Body */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-100/50 dark:bg-slate-950/40">
          {/* LEFT PANEL: Available Tile Bank & Packs */}
          <div className="lg:col-span-7 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            {/* Search & Filter Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search phonics packs or phonemes (e.g. 'sh', 'blends', 'vowel')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="overflow-x-auto flex gap-1.5 no-scrollbar pb-0.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Packs Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredPacks.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="font-semibold text-sm">No phonics packs match your search or filter.</p>
                  <p className="text-xs text-slate-500 mt-1">Try clearing your search or picking &quot;All Packs&quot;.</p>
                </div>
              ) : (
                filteredPacks.map((pack) => {
                  const roleMeta = ROLE_METADATA[pack.suggestedRole];
                  const allPackTilesAdded = pack.tiles.every((t) => currentSet.has(t));
                  const unaddedCount = pack.tiles.filter((t) => !currentSet.has(t)).length;

                  return (
                    <div
                      key={pack.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
                    >
                      {/* Pack Header & Shuttle Action Buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                              {pack.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${roleMeta.badgeBg} ${roleMeta.badgeText} ${roleMeta.badgeBorder}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${roleMeta.dotBg}`} />
                              {roleMeta.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {pack.description}
                          </p>
                        </div>

                        {/* Shuttle Actions: Replace & Add */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* 1-Click Replace Column */}
                          <button
                            type="button"
                            onClick={() => handleReplaceWithPack(pack)}
                            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                            title={`Replace column with all ${pack.tiles.length} tiles and set role to ${roleMeta.label}`}
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Replace Col
                          </button>

                          {/* + Add to Column */}
                          <button
                            type="button"
                            onClick={() => handleAddPackTiles(pack)}
                            disabled={allPackTilesAdded}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                              allPackTilesAdded
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 opacity-80 cursor-default'
                                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white'
                            }`}
                            title={`Add ${unaddedCount} remaining tiles to column`}
                          >
                            {allPackTilesAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                All Added
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                Add (+{unaddedCount})
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Interactive Pack Tiles */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pack.tiles.map((tile) => {
                          const isSelected = currentSet.has(tile);
                          return (
                            <TileChip
                              key={tile}
                              tile={tile}
                              role={pack.suggestedRole}
                              selected={isSelected}
                              onClick={() => handleToggleTile(tile, pack.suggestedRole)}
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
          </div>

          {/* RIGHT PANEL: Current Column Destination */}
          <div className="lg:col-span-5 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950/80 p-4 sm:p-5 space-y-4">
            {/* Destination Column Header Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Target Column State
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  {column.tiles.length} {column.tiles.length === 1 ? 'Tile' : 'Tiles'}
                </span>
              </div>

              {/* Editable Label */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Column Label
                </label>
                <input
                  type="text"
                  value={column.label}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  placeholder="e.g. Initial Onset, Medial Vowel"
                  className="w-full px-3 py-1.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Phonics Role Badge & Override Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Role & Color Theme
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRolePicker(!showRolePicker)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    {showRolePicker ? 'Done' : 'Change Theme'}
                    <ChevronDown className={`w-3 h-3 transition-transform ${showRolePicker ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {!showRolePicker ? (
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border ${currentRoleMeta.badgeBg} ${currentRoleMeta.badgeText} ${currentRoleMeta.badgeBorder}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${currentRoleMeta.dotBg}`} />
                      <span className="text-xs font-bold">{currentRoleMeta.label} ({currentRoleMeta.colorName})</span>
                    </div>
                    <span className="text-[11px] font-medium opacity-80">{currentRoleMeta.description}</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in duration-150">
                    {(Object.keys(ROLE_METADATA) as PhonicsRole[]).map((r) => {
                      const meta = ROLE_METADATA[r];
                      const isCurrent = column.role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleSelectRole(r)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold text-left flex items-center justify-between border transition-all ${
                            isCurrent
                              ? 'ring-2 ring-indigo-500 bg-white dark:bg-slate-700 border-indigo-300'
                              : `${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder} hover:brightness-95`
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${meta.dotBg}`} />
                            <span>{meta.label}</span>
                          </div>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Current Tiles Chips Container */}
            <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tiles in Column ({column.tiles.length})
                </span>

                {column.tiles.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearColumn}
                    className="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-bold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Remove all tiles from this column"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Column
                  </button>
                )}
              </div>

              {/* Scrollable list of active chips */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {column.tiles.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
                    <p className="font-bold text-slate-600 dark:text-slate-400 text-sm">
                      Column is currently empty
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 max-w-xs">
                      Click <strong className="text-amber-600 dark:text-amber-400">Replace Col</strong> or{' '}
                      <strong className="text-indigo-600 dark:text-indigo-400">+ Add</strong> on any pack on the left, or type custom tiles below.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 content-start">
                    {column.tiles.map((tile) => (
                      <TileChip
                        key={tile}
                        tile={tile}
                        role={column.role}
                        onRemove={() => handleRemoveTile(tile)}
                        size="md"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add Custom Tile Form */}
              <form onSubmit={handleAddCustom} className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type tile(s), e.g. 'spl' or 'ch, sh'..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!customInput.trim()}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-bold disabled:opacity-40 transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70 shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {column.tiles.length === 0 ? (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                Column needs at least 1 tile before playing.
              </span>
            ) : (
              <span>
                Ready: <strong>{column.tiles.length} tiles</strong> in <em>{column.label || `Col ${columnIndex + 1}`}</em> ({currentRoleMeta.label})
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Apply & Done
          </button>
        </div>
      </div>
    </div>
  );
};
