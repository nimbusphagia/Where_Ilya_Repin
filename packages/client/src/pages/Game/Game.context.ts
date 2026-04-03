import { createContext, useContext } from 'react';
import type { Game, Solution } from '../../schemas/game.schema';

type GameContextType = {
  handlePickerClick: (solution: Solution) => void,
  game: Game | null,
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used inside Game');
  return ctx;
}
