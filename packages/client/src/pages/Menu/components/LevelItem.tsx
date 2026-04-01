import type { ThumbnailLevel } from "../../../schemas/level.schema"
import s from "../Menu.module.css"

type LevelItemProps = ThumbnailLevel & {
  handleClick: () => void,
  className: string,
}
export function LevelItem({ title, imageUrl, handleClick, className }: LevelItemProps) {
  return (
    <>

      <button
        type="button"
        className={`${s.lvl} ${className}`}
        onClick={() => handleClick()}
      >
        <img
          className={s.lvlThumbnail}
          src={imageUrl}
          alt="" />
        {title}
      </button>

    </>
  )
}
