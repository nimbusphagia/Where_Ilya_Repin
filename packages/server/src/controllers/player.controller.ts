import { Request, Response, NextFunction } from "express";
import { createPlayerSchema } from "../schemas/player.schema";
import { createPlayer } from "../services/player.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = createPlayerSchema.parse(req.body);
    const player = await createPlayer({ username });
    return res.status(201).json(player);
  } catch (error) {
    next!(error);
  }
}

