import type { Level } from "../generated/client/index.js";
import { prisma } from "../../lib/prisma.js";
import { CreateLevelInput, EditImageInput, EditIndexInput, EditLevelInput, EditSolutionsInput } from "../schemas/level.schema.js";
import { NotFoundError } from "../errors/index.js";

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
export async function listTop50ByLevelId(id: string) {
  return prisma.level.findUnique({
    where: { id },
    select: {
      games: {
        where: {
          timeMs: { not: null },
          player: {
            isNot: null,
            is: {
              username: { not: "" }
            }
          }
        },
        select: {
          id: true,
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
        take: 50,
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
export async function editLevelSolutions({ id, solutions }: EditSolutionsInput) {
  return prisma.level.update({
    where: { id },
    data: {
      solutions: {
        updateMany: solutions.map(({ id, x, y }) => ({
          where: {
            id,
          },
          data: {
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
export async function getNextLevelByIndex(index: number) {
  const nextIndex = index + 1;
  const nextLevel = prisma.level.findUnique({
    where: {
      index: nextIndex,
    },
    select: {
      id: true,
    }
  });
  if (!nextLevel) {
    throw new NotFoundError("There's no next level");
  }
  return nextLevel;
}
