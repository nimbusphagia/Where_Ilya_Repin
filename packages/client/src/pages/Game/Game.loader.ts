import type { GameLevel } from "../../types/entities";

export type GameLoaderProps = {
  game: GameLevel,
}

const mockGame: GameLevel = {
  id: "1",
  name: "First Level",
  source: "https://res.cloudinary.com/dlsa973vu/image/upload/v1774107551/WhatsApp_Image_2026-03-20_at_8.45.06_PM_tp6f1z.jpg",
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
  return { game };
};
