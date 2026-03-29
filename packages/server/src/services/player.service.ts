import { prisma } from "../../lib/prisma";
import { Player } from "../../prisma/generated/client";
import { CreatePlayerInput } from "../schemas/player.schema";

export async function createPlayer({ username }: CreatePlayerInput): Promise<Player> {
  return prisma.player.create({
    data: {
      username,
    }
  })
}
