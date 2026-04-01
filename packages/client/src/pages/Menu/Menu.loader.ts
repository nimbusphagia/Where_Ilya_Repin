import apiClient from "../../utils/apiClient";
import type { LevelInput } from "../../schemas/level.schema";

export async function MenuLoader(): Promise<LevelInput[]> {
  const levels = await apiClient<LevelInput[]>("/levels");
  return levels;
}
