import { createContext, useContext } from 'react';
import type { Solution } from '../../schemas/game.schema';

type GameContextType = {
  handlePickerClick: (solution: Solution) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used inside Game');
  return ctx;
}
