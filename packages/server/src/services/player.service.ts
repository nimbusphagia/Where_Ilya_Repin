import { prisma } from "../../lib/prisma";
import { Player } from "../../prisma/generated/client";
import { ConflictError } from "../errors";
import { CreatePlayerInput } from "../schemas/player.schema";

export async function createPlayer({ username }: CreatePlayerInput): Promise<Player> {
  if (username.trim() === undefined) throw new ConflictError("Invalid username");
  return prisma.player.create({
    data: {
      username,
    }
  })
}
