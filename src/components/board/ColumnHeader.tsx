'use client';

import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { PhonicsRole } from '@/types/phonics';
import { cn } from '@/lib/utils';

interface ColumnHeaderProps {
  label: string;
  role: PhonicsRole;
  currentIndex: number;
  totalTiles: number;
  isLocked: boolean;
  onToggleLock: () => void;
}

function getRoleLabel(role: PhonicsRole): string {
  switch (role) {
    case 'consonant':
      return 'Consonant';
    case 'short_vowel':
      return 'Vowel';
    case 'vowel_team':
      return 'Vowel Team';
    case 'r_controlled':
      return 'Bossy R';
    case 'silent_e':
      return 'Silent-E';
    case 'affix':
      return 'Ending / Syllable';
    case 'blend':
      return 'Blend / Digraph';
    default:
      return '';
  }
}

export function ColumnHeader({
  label,
  role,
  currentIndex,
  totalTiles,
  isLocked,
  onToggleLock,
}: ColumnHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between px-2 pb-2 select-none">
      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {currentIndex + 1}/{totalTiles}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {getRoleLabel(role)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleLock}
        title={isLocked ? 'Unlock column' : 'Lock column'}
        className={cn(
          'p-2 rounded-xl border transition-all',
          isLocked
            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 shadow-sm'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300'
        )}
      >
        {isLocked ? (
          <Lock className="w-4 h-4 fill-current" />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
