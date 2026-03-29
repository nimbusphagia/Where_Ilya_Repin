import type { Coordinate, Level, Player } from "../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { LevelDTO } from "../types/service.type";

export async function listAllLevels(): Promise<Level[]> {
  return prisma.level.findMany();
}
export async function getLevelById(id: string): Promise<Level | null> {
  return prisma.level.findUnique({
    where: {
      id
    }
  })
}
export async function listTop10ByLevelId(id: string) {
  return prisma.level.findUnique({
    where: { id },
    include: {
      games: {
        where: {
          timeMs: { not: null }
        },
        select: {
          timeMs: true,
          player: {
            select: {
              username: true,
            }
          }
        },
        orderBy: {
          timeMs: "asc",
        },
        take: 10,
      }
    }
  })
}

export async function createLevel({ title, imageUrl, solutions }: LevelDTO) {
  return prisma.level.create({
    data: {
      title,
      imageUrl,
      solutions: {
        create: solutions.map(({ x, y }) => ({ x, y })),
      },
    },
    include: {
      solutions: true,
    }
  }
  );
}
export async function editLevel({ id, title, imageUrl }: Level, solutions: Coordinate[]) {
  return prisma.level.update({
    where: { id },
    data: {
      title,
      imageUrl,
      solutions: {
        upsert: solutions.map(({ id, x, y }) => ({
          where: {
            id,
          },
          update: {
            x,
            y
          },
          create: {
            x,
            y
          }
        }))
      },
    },
    include: {
      solutions: true,
    },
  });
}
