import s from "../Menu.module.css"
import type { Level } from "../types/ui"

type LevelItemProps = Level & {
  handleClick: () => void,
}
export function LevelItem({ name, unlocked, handleClick }: LevelItemProps) {
  return (
    <button
      type="button"
      className={`${s.lvl} ${unlocked ? s.unlocked : s.locked}`}
      onClick={() => handleClick()}
    >
      {name}
    </button>
  )
}
