import { Coordinate, Level } from "../../prisma/generated/client";

export type CoordinateDTO = Omit<Coordinate, "id" | "levelId">;
export type LevelDTO = Omit<Level, "id"> & {
  solutions: CoordinateDTO[],
};
