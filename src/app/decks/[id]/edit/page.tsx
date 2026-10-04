import React from 'react';
import { notFound } from 'next/navigation';
import { getDeckById } from '@/lib/actions/decks';
import { BoardConfigurator } from '@/components/configurator/BoardConfigurator';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDeckPage({ params }: PageProps) {
  const { id } = await params;
  const deck = await getDeckById(id);

  if (!deck) {
    notFound();
  }

  return <BoardConfigurator initialDeck={deck} />;
}
