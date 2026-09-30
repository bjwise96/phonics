'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Shuffle,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Volume2,
  Lock,
  Unlock,
  Keyboard,
} from 'lucide-react';
import { DeckPreset, PhonicsRole } from '@/types/phonics';
import { getDefaultPreset, getPresetById } from '@/data/presets';
import { TileCard } from './TileCard';
import { ColumnHeader } from './ColumnHeader';
import { SoundDots } from './SoundDots';
import { WordStatusBadge } from './WordStatusBadge';
import { DeckSelectorModal } from './DeckSelectorModal';
import { cn } from '@/lib/utils';

interface ColumnState {
  id: string;
  label: string;
  role: PhonicsRole;
  tiles: string[];
  currentIndex: number;
  isLocked: boolean;
}

interface BlendingBoardProps {
  initialPreset?: DeckPreset;
}

export function BlendingBoard({ initialPreset }: BlendingBoardProps) {
  const [activeDeck, setActiveDeck] = useState<DeckPreset>(
    initialPreset || getDefaultPreset()
  );

  const [columns, setColumns] = useState<ColumnState[]>(() => {
    const deck = initialPreset || getDefaultPreset();
    return deck.columns.map((col) => ({
      id: col.id,
      label: col.label,
      role: col.role,
      tiles: col.tiles,
      currentIndex: 0,
      isLocked: Boolean(col.defaultLocked),
    }));
  });

  const [isRandomMode, setIsRandomMode] = useState(true);
  const [showWordCheck, setShowWordCheck] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Synchronize columns when active deck changes
  const handleLoadDeck = (newDeck: DeckPreset) => {
    setActiveDeck(newDeck);
    setColumns(
      newDeck.columns.map((col) => ({
        id: col.id,
        label: col.label,
        role: col.role,
        tiles: col.tiles,
        currentIndex: 0,
        isLocked: Boolean(col.defaultLocked),
      }))
    );
  };

  // Flip a single column forward
  const flipColumnNext = useCallback((colIndex: number) => {
    setColumns((prev) =>
      prev.map((col, idx) => {
        if (idx !== colIndex || col.isLocked) return col;
        let nextIndex: number;
        if (isRandomMode && col.tiles.length > 1) {
          do {
            nextIndex = Math.floor(Math.random() * col.tiles.length);
          } while (nextIndex === col.currentIndex && col.tiles.length > 2);
        } else {
          nextIndex = (col.currentIndex + 1) % col.tiles.length;
        }
        return { ...col, currentIndex: nextIndex };
      })
    );
  }, [isRandomMode]);

  // Flip a single column backward
  const flipColumnPrev = useCallback((colIndex: number) => {
    setColumns((prev) =>
      prev.map((col, idx) => {
        if (idx !== colIndex || col.isLocked) return col;
        const prevIndex =
          col.currentIndex === 0 ? col.tiles.length - 1 : col.currentIndex - 1;
        return { ...col, currentIndex: prevIndex };
      })
    );
  }, []);

  // Toggle lock for a single column
  const toggleColumnLock = useCallback((colIndex: number) => {
    setColumns((prev) =>
      prev.map((col, idx) =>
        idx === colIndex ? { ...col, isLocked: !col.isLocked } : col
      )
    );
  }, []);

  // Roll next word: Flip all unlocked columns
  const handleNextWord = useCallback(() => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.isLocked) return col;
        let nextIndex: number;
        if (isRandomMode && col.tiles.length > 1) {
          do {
            nextIndex = Math.floor(Math.random() * col.tiles.length);
          } while (nextIndex === col.currentIndex && col.tiles.length > 2);
        } else {
          nextIndex = (col.currentIndex + 1) % col.tiles.length;
        }
        return { ...col, currentIndex: nextIndex };
      })
    );
  }, [isRandomMode]);

  // Reset all columns to initial index 0
  const handleReset = () => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        currentIndex: 0,
      }))
    );
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Fullscreen change event listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Active blended word calculation
  const currentWord = useMemo(() => {
    return columns
      .map((col) => col.tiles[col.currentIndex] || '')
      .filter((t) => t !== '-')
      .join('');
  }, [columns]);

  // Sweep blend speech
  const handleSweepBlend = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard shortcut handler for smartboard teachers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleNextWord();
      } else if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key, 10) - 1;
        if (index < columns.length) {
          if (e.shiftKey) {
            e.preventDefault();
            toggleColumnLock(index);
          } else {
            e.preventDefault();
            flipColumnNext(index);
          }
        }
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextWord, flipColumnNext, toggleColumnLock, columns.length]);

  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] p-4 sm:p-6 select-none transition-colors',
        isFullscreen && 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-6'
      )}
    >
      {/* Top Controls Bar */}
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Left: Deck Picker & Active Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 shadow-sm text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="truncate max-w-[180px] sm:max-w-[260px]">
              {activeDeck.title}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
              {activeDeck.columnCount} Col
            </span>
          </button>
        </div>

        {/* Center: Real vs Nonsense Word Status */}
        <div className="flex items-center">
          <WordStatusBadge
            currentWord={currentWord}
            showIndicator={showWordCheck}
            onToggleIndicator={() => setShowWordCheck(!showWordCheck)}
          />
        </div>

        {/* Right: Board Utilities */}
        <div className="flex items-center gap-2">
          {/* Random / Sequential Mode */}
          <button
            type="button"
            onClick={() => setIsRandomMode(!isRandomMode)}
            title={isRandomMode ? 'Mode: Random Shuffle' : 'Mode: Sequential Scope'}
            className={cn(
              'p-2 sm:px-3 sm:py-2 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all',
              isRandomMode
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            )}
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isRandomMode ? 'Shuffle' : 'Sequential'}
            </span>
          </button>

          {/* Reset Cards */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset board to initial letters (R)"
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            type="button"
            onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
            title="Keyboard shortcuts"
            className="p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Projector Fullscreen (F)'}
            className="p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-400 transition-all"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay Banner */}
      {showShortcutsHelp && (
        <div className="w-full max-w-6xl mt-2 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200 text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Spacebar:</strong> Next Word</span>
            <span><strong>1-{columns.length}:</strong> Flip Column</span>
            <span><strong>Shift + 1-{columns.length}:</strong> Lock Column</span>
            <span><strong>F:</strong> Fullscreen</span>
            <span><strong>R:</strong> Reset</span>
          </div>
          <button
            type="button"
            onClick={() => setShowShortcutsHelp(false)}
            className="text-xs font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Classroom Cards Grid */}
      <div className="w-full max-w-5xl my-auto py-6">
        <div
          className="grid gap-3 sm:gap-6 md:gap-8 items-center justify-center w-full"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col, idx) => (
            <div key={col.id} className="flex flex-col items-center w-full">
              <ColumnHeader
                label={col.label}
                role={col.role}
                currentIndex={col.currentIndex}
                totalTiles={col.tiles.length}
                isLocked={col.isLocked}
                onToggleLock={() => toggleColumnLock(idx)}
              />

              <TileCard
                tile={col.tiles[col.currentIndex] || ''}
                role={col.role}
                isLocked={col.isLocked}
                onNext={() => flipColumnNext(idx)}
                onPrev={() => flipColumnPrev(idx)}
              />
            </div>
          ))}
        </div>

        {/* Sound Dots & Blending Sweep Arrow */}
        <SoundDots
          columns={columns.map((col) => ({
            id: col.id,
            tile: col.tiles[col.currentIndex] || '',
            role: col.role,
          }))}
          onSweepBlend={handleSweepBlend}
        />
      </div>

      {/* Bottom Main Action Bar (Large SmartBoard Button) */}
      <div className="w-full max-w-3xl flex items-center justify-center gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          type="button"
          onClick={handleNextWord}
          className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold text-xl sm:text-2xl shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-3 select-none"
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <span>Next Word</span>
          <span className="hidden sm:inline-block text-xs font-normal opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
            Space
          </span>
        </button>
      </div>

      {/* Deck Selector Modal */}
      <DeckSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeDeckId={activeDeck.id}
        onSelectDeck={handleLoadDeck}
      />
    </div>
  );
}
