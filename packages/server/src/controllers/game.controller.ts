import { Request, Response, NextFunction } from "express";
import { CreateGameSchema, EditGameSchema } from "../schemas/game.schema.js";
import { createGame, addUserToGame, stopGame, listAllGames } from "../services/game.service.js";
export async function getGames(req: Request, res: Response, next: NextFunction) {
  try {
    const games = await listAllGames();
    return res.status(200).json(games);
  } catch (error) {
    next!(error);
  }
}
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
    const input = EditGameSchema.parse({ id: req.params.id, ...req.body });
    const game = await stopGame(input);
    return res.status(200).json(game);
  } catch (error) {
    next!(error);
  }
}
export async function registerGame(req: Request, res: Response, next: NextFunction) {
  try {
    const input = EditGameSchema.parse({ id: req.params.id, ...req.body });
    const game = await addUserToGame(input);
    return res.status(200).json(game);
  } catch (error) {
    next!(error);
  }
}
