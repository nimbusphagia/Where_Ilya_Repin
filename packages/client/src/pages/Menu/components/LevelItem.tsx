import s from "../Menu.module.css"
import type { Level } from "../types/ui"

type LevelItemProps = Level & {
  handleClick: () => void,
  className: string,
  thumbnail: string,
}
export function LevelItem({ name, thumbnail, unlocked, handleClick, className }: LevelItemProps) {
  return (
    <>
      {unlocked ?
        <button
          type="button"
          className={`${s.lvl} ${className} ${s.unlocked}`}
          onClick={() => handleClick()}
        >
          <img
            className={s.lvlThumbnail}
            src={thumbnail}
            alt="" />
          {name}
        </button>
        :
        <div
          className={`${s.lvl} ${className} ${s.locked}`}
        >
          <img
            className={s.lvlThumbnail}
            src={thumbnail}
            alt="" />
          <div
            className={s.lock}
          >
            {name}
          </div>
        </div>
      }
    </>
  )
}
