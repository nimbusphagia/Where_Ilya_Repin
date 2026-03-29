import type { Level } from "../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { CreateLevelInput, EditLevelInput } from "../schemas/level.schema";

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

export async function createLevel({ title, imageUrl, solutions }: CreateLevelInput) {
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
export async function editLevel({ id, title, imageUrl, solutions }: EditLevelInput) {
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
