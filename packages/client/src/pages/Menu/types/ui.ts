import type { User } from "../../../types/entities"

export type Level = {
  id: string,
  name: string,
  unlocked: boolean,
  thumbnail: string,
}
export type Menu = {
  levels: Level[],
  user: User | null,
}
