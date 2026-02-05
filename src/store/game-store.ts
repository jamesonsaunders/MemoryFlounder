import { create } from "zustand";
import type { Card, GameMode, GridSize } from "../types/game-types";

const EMOJIS = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎻', '🎲', '🎰', '🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🎱', '🏓'];
const WORDS = ['APPLE', 'BRAVE', 'CLOUD', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HEART', 'INDIA', 'JEWEL', 'KNIGHT', 'LEMON', 'MAGIC', 'NOBLE', 'OCEAN', 'PEACE', 'QUEST', 'RIVER'];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];

type State = {
  gameMode: GameMode | null;
  gridSize: GridSize | null;
  cards: Card[];
  flippedCards: string[];
  moves: number;
  matches: number;
  gameStarted: boolean;
  matchFeedback: 'correct' | 'incorrect' | null;
  setGameMode: (mode: GameMode) => void;
  setGridSize: (size: GridSize) => void;
  startGame: () => void;
  flipCard: (id: string) => void;
  resetGame: () => void;
  backToMenu: () => void;
};

const getContentArray = (mode: GameMode): string[] => {
  switch (mode) {
    case 'emoji':
      return EMOJIS;
    case 'words':
      return WORDS;
    case 'letters':
      return LETTERS;
  }
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createCards = (mode: GameMode, size: GridSize): Card[] => {
  const contentArray = getContentArray(mode);
  const pairCount = size / 2;
  const selectedContent = contentArray.slice(0, pairCount);
  const pairs = [...selectedContent, ...selectedContent];
  const shuffled = shuffleArray(pairs);
  
  return shuffled.map((content, index) => ({
    id: `${index}`,
    content,
    isFlipped: false,
    isMatched: false,
  }));
};

export const useAppStore = create<State>((set, get) => ({
  gameMode: 'emoji',
  gridSize: 16,
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  gameStarted: false,
  matchFeedback: null,
  
  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode });
  },
  
  setGridSize: (size: GridSize) => {
    set({ gridSize: size });
  },
  
  startGame: () => {
    const { gameMode, gridSize } = get();
    if (!gameMode || !gridSize) return;
    
    const cards = createCards(gameMode, gridSize);
    set({ 
      cards, 
      gameStarted: true, 
      moves: 0, 
      matches: 0,
      flippedCards: []
    });
  },
  
  flipCard: (id: string) => {
    const { cards, flippedCards, matches, gridSize } = get();
    const card = cards.find(c => c.id === id);
    
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }
    
    const newFlippedCards = [...flippedCards, id];
    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    
    set({ cards: newCards, flippedCards: newFlippedCards });
    
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);
      
      set({ moves: get().moves + 1 });
      
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // ({ matchFeedback: 'correct' });
        setTimeout(() => {
          set({
            cards: get().cards.map(c => 
              c.id === firstId || c.id === secondId 
                ? { ...c, isMatched: true } 
                : c
            ),
            flippedCards: [],
            matches: matches + 1,
            matchFeedback: null
          });
        }, 500);
      } else {
        // No match
        set({ matchFeedback: 'incorrect' });
        setTimeout(() => {
          set({
            cards: get().cards.map(c => 
              c.id === firstId || c.id === secondId 
                ? { ...c, isFlipped: false } 
                : c
            ),
            flippedCards: [],
            matchFeedback: null
          });
        }, 1000);
      }
    }
  },
  
  resetGame: () => {
    const { gameMode, gridSize } = get();
    if (!gameMode || !gridSize) return;
    
    const cards = createCards(gameMode, gridSize);
    set({ 
      cards, 
      moves: 0, 
      matches: 0,
      flippedCards: [],
      matchFeedback: null
    });
  },
  
  backToMenu: () => {
    set({ 
      cards: [], 
      gameStarted: false,
      moves: 0,
      matches: 0,
      flippedCards: [],
      matchFeedback: null
    });
  }
}));
