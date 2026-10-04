'use client';

import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Volume2,
  HelpCircle,
  Ban,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordClassification } from '@/types/phonics';

interface WordStatusBadgeProps {
  currentWord: string;
  classification: WordClassification;
  reason?: string;
  isOverride?: boolean;
  onCycleStatus?: () => void;
  onMarkInvalid?: () => void;
  onSkipToValid?: () => void;
}

export function WordStatusBadge({
  currentWord,
  classification,
  reason,
  isOverride = false,
  onCycleStatus,
  onMarkInvalid,
  onSkipToValid,
}: WordStatusBadgeProps) {
  const isReal = classification === 'real';
  const isNonsense = classification === 'nonsense';
  const isInvalid = classification === 'invalid';

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
    <div className="flex items-center gap-2.5">
      {/* Blend Sound / Speech Pronunciation Button */}
      <button
        type="button"
        onClick={handleSpeak}
        title={`Listen to "${currentWord}"`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
      >
        <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Blend Sound</span>
      </button>

      {/* Interactive Word Classification Badge (Cycles Real ↔ Nonsense ↔ Invalid on click) */}
      {isReal && (
        <button
          type="button"
          onClick={() => {
            handleCelebrate();
            if (onCycleStatus) onCycleStatus();
          }}
          title="Real Word • Click to celebrate or toggle classification"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100" />
          <span>Real Word</span>
          <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
          {isOverride && <span className="text-[10px] text-emerald-600 font-semibold">• Edited</span>}
        </button>
      )}

      {isNonsense && (
        <button
          type="button"
          onClick={onCycleStatus}
          title="Nonsense Word (Decodable) • Click to toggle classification"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/80 text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>Nonsense Word</span>
          {isOverride && <span className="text-[10px] text-purple-600 font-semibold">• Edited</span>}
        </button>
      )}

      {isInvalid && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCycleStatus}
            title={reason || 'Invalid combination • Click to override'}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/90 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700/80 text-xs font-bold shadow-sm opacity-90 transition-all hover:opacity-100 active:scale-95"
          >
            <Ban className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Invalid Combination</span>
          </button>

          {onSkipToValid && (
            <button
              type="button"
              onClick={onSkipToValid}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Skip to Valid</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* 1-Click "Mark Invalid / Never Show" Button */}
      {onMarkInvalid && !isInvalid && (
        <button
          type="button"
          onClick={onMarkInvalid}
          title={`Never show "${currentWord}" again on this board`}
          className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-800"
          aria-label={`Mark "${currentWord}" as invalid / never show`}
        >
          <Ban className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
