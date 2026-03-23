import s from "../Menu.module.css"
import type { Level } from "../types/ui"

type LevelItemProps = Level & {
  handleClick: () => void,
  className: string,
  thumbnail: string,
}
export function LevelItem({ name, thumbnail, unlocked, handleClick, className }: LevelItemProps) {
  return (
    <button
      type="button"
      className={`${s.lvl} ${className} ${unlocked ? s.unlocked : s.locked}`}
      onClick={() => handleClick()}
    >
      <img
        className={s.lvlThumbnail}
        src={thumbnail}
        alt="" />
      {name}
    </button>
  )
}
