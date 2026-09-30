'use client';

import React, { useState } from 'react';
import { X, Layers, Sparkles, Check, ChevronRight } from 'lucide-react';
import { CURRICULUM_PRESETS } from '@/data/presets';
import { DeckPreset } from '@/types/phonics';
import { cn } from '@/lib/utils';

interface DeckSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDeckId: string;
  onSelectDeck: (deck: DeckPreset) => void;
}

export function DeckSelectorModal({
  isOpen,
  onClose,
  activeDeckId,
  onSelectDeck,
}: DeckSelectorModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3-column' | '4-column' | '5-column'>('all');

  if (!isOpen) return null;

  const filteredDecks = CURRICULUM_PRESETS.filter((deck) => {
    if (selectedCategory === 'all') return true;
    return deck.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Select Curriculum Deck
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Systematic Phonics Decks (HD Word & Orton-Gillingham Scope)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2">
          {(
            [
              { id: 'all', label: 'All Decks' },
              { id: '3-column', label: '3-Column (CVC, Blends)' },
              { id: '4-column', label: '4-Column (Silent-E, -le)' },
              { id: '5-column', label: '5-Column (Compound, Suffixes)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                selectedCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Decks Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDecks.map((deck) => {
            const isCurrent = deck.id === activeDeckId;
            return (
              <div
                key={deck.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectDeck(deck);
                  onClose();
                }}
                className={cn(
                  'p-4 rounded-2xl border-2 transition-all flex flex-col justify-between text-left cursor-pointer group',
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-900/90 hover:shadow-lg'
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {deck.columnCount} Columns
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                        <Check className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {deck.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    {deck.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {deck.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {deck.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Load Deck <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
