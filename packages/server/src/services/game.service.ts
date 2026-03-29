import { prisma } from "../../lib/prisma";
import { Game } from "../../prisma/generated/client";
import { CreateGameInput, EditGameInput } from "../schemas/game.schema";
import { ConflictError } from "../errors";

export async function createGame({ levelId }: CreateGameInput): Promise<Game> {
  return prisma.game.create({
    data: {
      levelId,
    }
  });
}

export async function editGame({ id, playerId, levelId }: EditGameInput): Promise<Game> {
  const game = await prisma.game.findUniqueOrThrow({ where: { id } });

  if (game.solvedAt) {
    throw new ConflictError("Game has already been solved");
  }

  const solvedAt = new Date();
  const timeMs = solvedAt.getTime() - game.startedAt.getTime();

  return prisma.game.update({
    where: { id },
    data: { playerId, levelId, solvedAt, timeMs }
  });
}
