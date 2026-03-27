import type { PropsWithChildren } from "react"
import type { Coordinate } from "../../../types/entities"
import s from "../Game.module.css"

type Props = {
  position: Coordinate,
}

export function ThumbPicker({ position, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={s.thumbnailPicker}
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      {children}
    </div>

  )
}
