import type { User } from "./entities"

export type Level = {
  id: string,
  name: string,
  unlocked: boolean,
}
export type Menu = {
  levels: Level[],
  user: User | null,
}
