import { createContext, useContext } from 'react';
import type { Coordinate } from '../../types/entities';

type GameContextType = {
  handlePickerClick: (solution: Coordinate) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used inside Game');
  return ctx;
}
