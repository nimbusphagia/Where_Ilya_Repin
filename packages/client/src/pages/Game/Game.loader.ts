import type { LoaderFunctionArgs } from "react-router";
import type { LevelInput } from "../../schemas/level.schema";
import apiClient from "../../utils/apiClient";

export type GameLoaderProps = {
  game: LevelInput,
  nextId: string
}

export async function GameLoader({ params }: LoaderFunctionArgs): Promise<GameLoaderProps> {
  const id = params.id;
  const game = await apiClient<LevelInput>(`/levels/${id}`);
  return { game, nextId: "2" };
};
