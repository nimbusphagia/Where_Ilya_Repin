import { Request, Response, NextFunction } from "express";
import { CreateGameSchema, EditGameSchema } from "../schemas/game.schema";
import { createGame, editGame } from "../services/game.service";

export async function startGame(req: Request, res: Response, next: NextFunction) {
  try {
    const input = CreateGameSchema.parse(req.body);
    const game = await createGame(input);
    return res.status(201).json(game);
  } catch (error) {
    next!(error);
  }
}
export async function endGame(req: Request, res: Response, next: NextFunction) {
  try {
    const input = EditGameSchema.parse(req.body);
    const game = await editGame(input);
    return res.status(201).json(game);
  } catch (error) {
    next!(error);
  }
}
