import React from 'react';
import { CURRICULUM_PRESETS } from '@/data/presets';
import { BoardConfigurator } from '@/components/configurator/BoardConfigurator';
import { DeckPreset } from '@/types/phonics';

interface PageProps {
  searchParams: Promise<{ template?: string; fromActive?: string }>;
}

export default async function NewDeckPage({ searchParams }: PageProps) {
  const { template, fromActive } = await searchParams;

  let initialDeck: DeckPreset | undefined = undefined;

  if (template) {
    const found = CURRICULUM_PRESETS.find((p) => p.id === template);
    if (found) {
      initialDeck = {
        ...found,
        id: undefined as any,
        title: `${found.title} (Custom)`,
      };
    }
  }

  return (
    <BoardConfigurator
      initialDeck={initialDeck}
      loadFromActive={fromActive === 'true'}
    />
  );
}
