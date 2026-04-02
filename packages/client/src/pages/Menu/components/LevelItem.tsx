import type { ThumbnailLevel } from "../../../schemas/level.schema"
import s from "../Menu.module.css"
import gs from "../../../main.module.css"

type LevelItemProps = ThumbnailLevel & {
  handleClick: () => void,
  isSelected: boolean,
}
export function LevelItem({ title, imageUrl, handleClick, isSelected }: LevelItemProps) {
  return (
    <>
      <button
        type="button"
        className={`${s.lvl} ${isSelected ? s.selectedLvl : ""}`}
        onClick={() => handleClick()}
      >
        <img
          className={s.lvlThumbnail}
          src={imageUrl}
          alt="" />
        {isSelected &&
          <div className={gs.vignette}></div>
        }
        <p
          className={`${s.lvlTitle}`}
        >
          {title}
        </p>
      </button>

    </>
  )
}
