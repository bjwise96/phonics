'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Lock } from 'lucide-react';
import { PhonicsRole } from '@/types/phonics';
import { cn } from '@/lib/utils';

interface TileCardProps {
  tile: string;
  role: PhonicsRole;
  isLocked: boolean;
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
}

// Classroom color-coding for primary grade phonics
function getRoleStyles(role: PhonicsRole) {
  switch (role) {
    case 'consonant':
    case 'blend':
      return {
        cardBg: 'bg-blue-50/90 dark:bg-slate-900 border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-100 shadow-blue-500/10',
        activeGlow: 'hover:border-blue-400 dark:hover:border-blue-700',
        badge: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300',
      };
    case 'short_vowel':
      return {
        cardBg: 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-100 shadow-rose-500/10',
        activeGlow: 'hover:border-rose-400 dark:hover:border-rose-700',
        badge: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300',
      };
    case 'vowel_team':
      return {
        cardBg: 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-100 shadow-emerald-500/10',
        activeGlow: 'hover:border-emerald-400 dark:hover:border-emerald-700',
        badge: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      };
    case 'r_controlled':
      return {
        cardBg: 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-100 shadow-amber-500/10',
        activeGlow: 'hover:border-amber-400 dark:hover:border-amber-700',
        badge: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
      };
    case 'silent_e':
      return {
        cardBg: 'bg-purple-50/90 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/60 text-purple-950 dark:text-purple-100 shadow-purple-500/10',
        activeGlow: 'hover:border-purple-400 dark:hover:border-purple-700',
        badge: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300',
      };
    case 'affix':
      return {
        cardBg: 'bg-cyan-50/90 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900/60 text-cyan-950 dark:text-cyan-100 shadow-cyan-500/10',
        activeGlow: 'hover:border-cyan-400 dark:hover:border-cyan-700',
        badge: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300',
      };
    default:
      return {
        cardBg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100',
        activeGlow: 'hover:border-slate-400',
        badge: 'bg-slate-200 dark:bg-slate-800 text-slate-700',
      };
  }
}

export function TileCard({
  tile,
  role,
  isLocked,
  onNext,
  onPrev,
  disabled = false,
}: TileCardProps) {
  const [animating, setAnimating] = useState(false);
  const styles = getRoleStyles(role);

  const handleCardClick = () => {
    if (disabled || isLocked) return;
    setAnimating(true);
    onNext();
    setTimeout(() => setAnimating(false), 240);
  };

  const displayText = tile === '-' ? ' ' : tile;

  return (
    <div className="relative group flex flex-col items-center w-full">
      {/* Step Backward Tap Area (SmartBoard Friendly) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLocked) onPrev();
        }}
        disabled={disabled || isLocked}
        title="Previous letter"
        className={cn(
          'w-10 h-8 mb-2 rounded-lg flex items-center justify-center transition-all opacity-40 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800',
          isLocked && 'invisible'
        )}
      >
        <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
      </button>

      {/* Main Interactive Tile Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        className={cn(
          'w-full aspect-[3/4] max-h-[360px] min-h-[180px] rounded-3xl border-2 flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-200 relative overflow-hidden shadow-lg',
          styles.cardBg,
          !isLocked && styles.activeGlow,
          !isLocked && 'hover:-translate-y-1 hover:shadow-xl active:translate-y-0.5 active:scale-[0.99]',
          isLocked && 'ring-2 ring-amber-400/80 dark:ring-amber-500/80 cursor-default opacity-95',
          animating && 'card-flip-enter'
        )}
      >
        {/* Subtle Locked Watermark */}
        {isLocked && (
          <div className="absolute top-3 right-3 text-amber-500 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 p-1.5 rounded-full shadow-sm">
            <Lock className="w-4 h-4" />
          </div>
        )}

        {/* Phonics Grapheme Display */}
        <span
          className={cn(
            'font-lexend font-bold tracking-normal leading-none transition-all drop-shadow-sm',
            // Dynamic text scaling based on grapheme character length
            tile.length <= 2 && 'text-7xl sm:text-8xl md:text-9xl',
            tile.length === 3 && 'text-5xl sm:text-6xl md:text-7xl',
            tile.length >= 4 && 'text-4xl sm:text-5xl md:text-6xl'
          )}
        >
          {displayText}
        </span>
      </div>

      {/* Step Forward Tap Area (SmartBoard Friendly) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLocked) onNext();
        }}
        disabled={disabled || isLocked}
        title="Next letter"
        className={cn(
          'w-10 h-8 mt-2 rounded-lg flex items-center justify-center transition-all opacity-40 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800',
          isLocked && 'invisible'
        )}
      >
        <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
      </button>
    </div>
  );
}
