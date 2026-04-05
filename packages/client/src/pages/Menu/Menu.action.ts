import type { ActionFunctionArgs } from "react-router";
import apiClient from "../../utils/apiClient";
import type { RankedGame } from "../../schemas/game.schema";

export async function MenuAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "leaderboard") {
    const levelId = formData.get("levelId");
    try {
      const { games: leaderboard } = await apiClient<{ games: RankedGame[] }>(
        `/levels/${levelId}/leaderboard`,
        { method: "GET" }
      );
      return { action: "leaderboard", leaderboard };
    } catch (error) {
      return {
        action: "leaderboard",
        leaderboard: [],
        error: error instanceof Error ? error.message : "Failed to load leaderboard.",
      };
    }
  }
}
