import { prisma } from "../../lib/prisma.js";
import type { Player } from "../generated/client/index.js";
import { ConflictError } from "../errors/index.js";
import { CreatePlayerInput } from "../schemas/player.schema.js";

export async function createPlayer({ username }: CreatePlayerInput): Promise<Player> {
  if (username.trim() === undefined) throw new ConflictError("Invalid username");
  return prisma.player.create({
    data: {
      username,
    }
  })
}
