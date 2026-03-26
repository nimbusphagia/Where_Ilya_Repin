import type { GameLevel } from "../../types/entities";

export type GameLoaderProps = {
  game: GameLevel,
  nextId: string
}

const mockGame: GameLevel = {
  id: "1",
  name: "First Level",
  source: "https://res.cloudinary.com/dlsa973vu/image/upload/v1774311850/wassily_kandinsky-yellow_red_blue-1925-obelisk-art-history_yhtxqa.jpg",
  solutions: [
    {
      x: 17.9,
      y: 12.5,
    },
    {
      x: 40.8,
      y: 30.8,
    },
    {
      x: 68.4,
      y: 80.7,
    },
  ],
};


export async function GameLoader(): Promise<GameLoaderProps> {
  const game = mockGame;
  return { game, nextId: "2" };
};
