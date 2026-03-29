import { CreateGameSchema, EditGameSchema } from "../schemas/game.schema";
import { createGame, editGame } from "../services/game.service";
import { MiddlewareArgs } from "../types/controller.type";

export async function startGame({ req, res, next }: MiddlewareArgs) {
  try {
    const input = CreateGameSchema.parse(req.body);
    const game = await createGame(input);
    return res.status(201).json(game);
  } catch (error) {
    next!(error);
  }
}
export async function endGame({ req, res, next }: MiddlewareArgs) {
  try {
    const input = EditGameSchema.parse(req.body);
    const game = await editGame(input);
    return res.status(201).json(game);
  } catch (error) {
    next!(error);
  }
}
