import type { Level } from "../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { CreateLevelInput, EditImageInput, EditIndexInput, EditLevelInput } from "../schemas/level.schema";

export async function listAllLevels(): Promise<Level[]> {
  return prisma.level.findMany({
    orderBy: {
      index: "asc"
    }
  });
}
export async function getLevelById(id: string): Promise<Level | null> {
  return prisma.level.findUnique({
    where: {
      id
    },
    include: {
      solutions: true,
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

export async function createLevel({ index, title, imageUrl, solutions }: CreateLevelInput) {
  return prisma.level.create({
    data: {
      index,
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
export async function editLevel({ id, index, title, imageUrl, solutions }: EditLevelInput) {
  return prisma.level.update({
    where: { id },
    data: {
      index,
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
export async function editLevelIndex({ id, index }: EditIndexInput) {
  return prisma.level.update({
    where: { id },
    data: {
      index,
    },
    include: {
      solutions: true,
    },
  });
}
export async function editLevelImage({ id, imageUrl }: EditImageInput) {
  return prisma.level.update({
    where: { id },
    data: {
      imageUrl,
    },
    include: {
      solutions: true,
    },
  });
}
