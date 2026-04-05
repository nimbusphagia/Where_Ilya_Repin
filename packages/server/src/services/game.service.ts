import { prisma } from "../../lib/prisma.js";
import type { Game } from "../generated/client/index.js";
import { CreateGameInput, EditGameInput } from "../schemas/game.schema.js";
import { ConflictError } from "../errors/index.js";

export async function listAllGames(): Promise<Game[]> {
  return prisma.game.findMany({
    orderBy: {
      timeMs: "asc"
    }
  });
}
export async function createGame({ levelId }: CreateGameInput): Promise<Game> {
  return prisma.game.create({
    data: {
      levelId,
    }
  });
}
export async function stopGame({ id, levelId }: EditGameInput): Promise<Game> {
  const game = await prisma.game.findUniqueOrThrow({ where: { id } });

  if (game.solvedAt) {
    throw new ConflictError("Game has already been solved");
  }

  const solvedAt = new Date();
  const timeMs = solvedAt.getTime() - game.startedAt.getTime();

  return prisma.game.update({
    where: { id },
    data: { levelId, solvedAt, timeMs }
  });
}
export async function addUserToGame({ id, username, levelId }: EditGameInput): Promise<Game> {
  const game = await prisma.game.findUniqueOrThrow({ where: { id } });

  if (game.playerId) {
    throw new ConflictError("Game already has a registered player");
  }
  if (username === undefined) {
    throw new ConflictError("Invalid username");
  }
  const player = await prisma.player.create({
    data: {
      username,
    }
  })

  return prisma.game.update({
    where: { id, levelId },
    data: { playerId: player.id, }
  });
}
