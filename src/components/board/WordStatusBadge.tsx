'use client';

import React from 'react';
import { CheckCircle2, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { isRealWord } from '@/lib/dictionary';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface WordStatusBadgeProps {
  currentWord: string;
  showIndicator: boolean;
  onToggleIndicator: () => void;
}

export function WordStatusBadge({
  currentWord,
  showIndicator,
  onToggleIndicator,
}: WordStatusBadgeProps) {
  const isReal = isRealWord(currentWord);

  const handleCelebrate = () => {
    if (isReal && typeof window !== 'undefined') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      });
    }
  };

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.85; // Slightly slower, clear enunciation for primary grade phonics
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Read Aloud / Audio Pronunciation Button */}
      <button
        type="button"
        onClick={handleSpeak}
        title={`Listen to "${currentWord}"`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
      >
        <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Blend Sound</span>
      </button>

      {/* Real / Nonsense Word Verification Badge */}
      {showIndicator ? (
        isReal ? (
          <button
            type="button"
            onClick={handleCelebrate}
            title="Click to celebrate this real word!"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100" />
            <span>Real Word</span>
            <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
          </button>
        ) : (
          <div
            title="Pseudoword / Nonsense word for decoding practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/80 text-xs font-bold shadow-sm"
          >
            <span className="text-sm">👾</span>
            <span>Nonsense Word</span>
          </div>
        )
      ) : (
        <button
          type="button"
          onClick={onToggleIndicator}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 text-xs font-medium border border-dashed border-slate-300 dark:border-slate-700 transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Check Word</span>
        </button>
      )}
    </div>
  );
}
