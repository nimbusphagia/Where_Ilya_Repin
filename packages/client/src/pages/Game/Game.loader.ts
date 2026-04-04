import type { LoaderFunctionArgs } from "react-router";
import type { LevelInput } from "../../schemas/level.schema";
import apiClient from "../../utils/apiClient";

export type GameLoaderProps = {
  level: LevelInput,
}

export async function GameLoader({ params }: LoaderFunctionArgs): Promise<GameLoaderProps> {
  const levelId = params.id;
  const level = await apiClient<LevelInput>(`/levels/${levelId}`);
  return { level };
};
