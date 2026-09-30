'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SoundDotsProps {
  columns: {
    id: string;
    tile: string;
    role: string;
  }[];
  onSweepBlend: () => void;
}

export function SoundDots({ columns, onSweepBlend }: SoundDotsProps) {
  const [activeDot, setActiveDot] = useState<number | null>(null);

  const handleDotClick = (index: number, letterSound: string) => {
    setActiveDot(index);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean letter representation
      const clean = letterSound.replace(/[^a-z]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveDot(null), 400);
  };

  return (
    <div className="w-full flex flex-col items-center mt-3 select-none">
      {/* Sound Dots Grid matching the columns */}
      <div className="w-full grid gap-4 sm:gap-6 md:gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((col, idx) => {
          const isActive = activeDot === idx;
          return (
            <div key={col.id} className="flex justify-center">
              <button
                type="button"
                onClick={() => handleDotClick(idx, col.tile)}
                title={`Tap sound for "${col.tile}"`}
                className={cn(
                  'w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all flex items-center justify-center shadow-sm',
                  isActive
                    ? 'scale-125 bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:scale-110'
                )}
              >
                <div
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    isActive ? 'bg-white' : 'bg-slate-400 dark:bg-slate-500'
                  )}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Blending Sweep Arrow */}
      <div className="w-full max-w-xl mt-3 flex items-center justify-center">
        <button
          type="button"
          onClick={onSweepBlend}
          title="Sweep to blend the full word"
          className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-900/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-all active:scale-95"
        >
          <span>Tap dots to segment sounds, then</span>
          <span className="font-bold flex items-center gap-1 text-blue-600 dark:text-blue-400">
            Sweep to Blend <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
}
