# Board Configurator & Word Matrix Implementation Plan

**Branch:** `feat/PRO-120-board-configurator`  
**Linear Issue:** `PRO-120`  
**Date:** 2026-10-04  

---

## 1. Objectives
Implement the Board Configurator, Smart Tile Bank precons, 3-Tier Word Analysis Engine, Combinatorics Matrix Explorer, and Live Board invalid word prevention.

---

## 2. Implementation Steps

### Phase 1: Data Model & Schema
- Update `src/types/phonics.ts` with `WordClassification`, `WordOverrideMap`, `AnalyzedWord`, and deck overrides.
- Update `src/db/schema.ts` to add `wordOverrides` JSON column to `decks`.
- Update `src/lib/actions/decks.ts` for database persistence of overrides.

### Phase 2: Word Analysis Engine & Lexicon Expansion
- Create `src/lib/lexicon/elementary-dictionary.ts`: Expanded 10,000+ primary/elementary vocabulary.
- Create `src/lib/lexicon/safety-filter.ts`: Classroom safety/profanity shield.
- Create `src/lib/lexicon/orthographic-rules.ts`: English spelling phonotactic rules (no trailing j/v/wh, no leading ck, etc.).
- Create `src/lib/lexicon/word-analyzer.ts`: Comprehensive word analysis and Cartesian matrix generator.
- Update `src/lib/dictionary.ts` to leverage the new engine.

### Phase 3: Smart Tile Bank
- Create `src/lib/tile-bank.ts`: Curated precon banks (Consonants, Short Vowels, Digraphs, Blends, Vowel Teams, R-Controlled, Affixes).

### Phase 4: Configurator UI Components
- `src/components/configurator/TileChip.tsx`: Interactive draggable/removable phoneme chip.
- `src/components/configurator/TileBankDrawer.tsx`: Slide-over modal with "Add All" and tap-to-toggle chips.
- `src/components/configurator/ColumnEditorCard.tsx`: Column controls (role selector, tiles list, reorder, delete).
- `src/components/configurator/WordMatrixExplorer.tsx`: Word table with search, stat filters, and 3-way toggle overrides.
- `src/components/configurator/BoardConfigurator.tsx`: Top-level orchestrator with dual views (Columns / Word Matrix).
- `src/components/configurator/QuickConfigModal.tsx`: Slide-over sheet for live adjustments from `/board`.

### Phase 5: Pages & Routing
- Create `src/app/decks/new/page.tsx`: Studio page for creating custom decks.
- Create `src/app/decks/[id]/edit/page.tsx`: Studio page for editing custom decks.
- Update `src/app/decks/page.tsx`: Add "Create Custom Deck" and "Edit" action buttons.

### Phase 6: Live Board Player Integration
- Update `src/components/board/WordStatusBadge.tsx`: Interactive cycling (Real ↔ Nonsense ↔ Invalid).
- Update `src/components/board/BlendingBoard.tsx`:
  - Smart auto-skip past invalid words on roll/flip.
  - 1-click "Mark Invalid / Never Show" button with instant flip.
  - Dimmed invalid indicator with "[Skip to Valid]" button on manual column scroll.
  - "Customize Board" button in header opening `QuickConfigModal`.

### Phase 7: Verification & Build
- Verify build with `npm run build`.
- Test 2, 3, 4, 5, and 6 column configurations.
- Test Cartesian word generation and auto-tagging.
- Test teacher overrides in configurator and live on `/board`.
