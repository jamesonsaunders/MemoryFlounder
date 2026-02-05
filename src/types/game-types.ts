export type GameMode = 'emoji' | 'words' | 'letters';
export type GridSize = 4 | 16 | 36; // 2x2, 4x4, 6x6

export type Card = {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
};
