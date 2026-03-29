import { MiddlewareArgs } from "../types/controller.type";
import { createPlayerSchema } from "../schemas/player.schema";
import { createPlayer } from "../services/player.service";

export async function create({ req, res, next }: MiddlewareArgs) {
  try {
    const { username } = createPlayerSchema.parse(req.body);
    const player = await createPlayer({ username });
    return res.status(201).json(player);
  } catch (error) {
    next!(error);
  }
}

