import type { ActionFunctionArgs } from "react-router";
import apiClient from "../../utils/apiClient";
import { StartGameSchema, EndGameSchema, RegisterUserSchema, type Game } from "../../schemas/game.schema";

type GameIntent = "start" | "end" | "registerUser";
type ActionReturn = {
  action: GameIntent,
  game: Game,
}

export async function GameAction({ request, params }: ActionFunctionArgs): Promise<ActionReturn | Response> {
  const formData = await request.formData();
  const intent = formData.get("intent") as GameIntent;

  switch (intent) {
    case "start": {
      const { levelId } = StartGameSchema.parse({ levelId: params.id });
      const newGame = await apiClient<Game>(`/game`, { method: "POST", body: JSON.stringify({ levelId }) });
      return { action: "start", game: newGame };
    }

    case "end": {
      const { id, levelId } = EndGameSchema.parse({
        id: formData.get("gameId"),
        levelId: params.id,
      });
      const updatedGame = await apiClient<Game>(`/game/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ levelId }),
      });
      return { action: "end", game: updatedGame };
    }

    case "registerUser": {
      const { id, levelId, username } = RegisterUserSchema.parse({
        levelId: params.id,
        id: formData.get("gameId"),
        username: formData.get("username"),
      });
      const registeredGame = await apiClient<Game>(`/game/${id}/user`, {
        method: "PATCH",
        body: JSON.stringify({ levelId, username }),
      });
      return { action: "registerUser", game: registeredGame };
    }

    default:
      throw new Response("Invalid intent", { status: 400 });
  }
}
