import type { Menu } from "./types/ui"

const mockLvls = [
  {
    id: "1",
    name: "First Level",
    unlocked: true,
  },
  {
    id: "2",
    name: "Second Level",
    unlocked: false,
  },
  {
    id: "3",
    name: "Third Level",
    unlocked: false,
  },
];

export async function MenuLoader(): Promise<Menu> {
  const user = null;
  //If there is a user return user levels, else look for initial levels(only first is unlocked)
  const levels = mockLvls;
  return { levels, user };
}
