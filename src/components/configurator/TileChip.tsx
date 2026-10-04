'use client';

import React from 'react';
import { PhonicsRole } from '@/types/phonics';
import { X } from 'lucide-react';

interface TileChipProps {
  tile: string;
  role: PhonicsRole;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ROLE_STYLES: Record<PhonicsRole, { bg: string; text: string; border: string }> = {
  consonant: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  short_vowel: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
  },
  vowel_team: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
  },
  r_controlled: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
  silent_e: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
  affix: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  blend: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
  },
};

export const TileChip: React.FC<TileChipProps> = ({
  tile,
  role,
  onRemove,
  onClick,
  selected = false,
  size = 'md',
}) => {
  const styles = ROLE_STYLES[role] || ROLE_STYLES.consonant;

  const sizeClasses = {
    sm: 'text-sm px-2.5 py-1 min-h-[32px]',
    md: 'text-base px-3.5 py-1.5 min-h-[40px]',
    lg: 'text-lg px-4 py-2 min-h-[48px]',
  }[size];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-bold rounded-xl border transition-all select-none ${sizeClasses} ${
        selected
          ? 'ring-2 ring-indigo-500 ring-offset-1 bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200'
          : `${styles.bg} ${styles.text} ${styles.border}`
      } ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
    >
      <span className="font-lexend tracking-wide">{tile}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
          title={`Remove tile ${tile}`}
          aria-label={`Remove tile ${tile}`}
        >
          <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
        </button>
      )}
    </span>
  );
};
