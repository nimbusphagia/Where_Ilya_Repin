import type { Menu } from "./types/ui"

const mockLvls = [
  {
    id: "1",
    name: "First Level",
    unlocked: true,
    thumbnail: "/images/lvl1.png",
  },
  {
    id: "2",
    name: "Second Level",
    unlocked: false,
    thumbnail: "/images/lvl2.png",
  },
  {
    id: "3",
    name: "Third Level",
    unlocked: false,
    thumbnail: "/images/lvl3.png",
  },
  {
    id: "4",
    name: "Fourth Level",
    unlocked: true,
    thumbnail: "/images/lvl4.png",
  },
  {
    id: "5",
    name: "Fifth Level",
    unlocked: false,
    thumbnail: "/images/lvl5.png",
  },
  {
    id: "6",
    name: "Sixth Level",
    unlocked: false,
    thumbnail: "/images/lvl6.png",
  },
];

export async function MenuLoader(): Promise<Menu> {
  const user = null;
  //If there is a user return user levels, else look for initial levels(only first is unlocked)
  const levels = mockLvls;
  return { levels, user };
}
