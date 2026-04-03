import type { PropsWithChildren } from "react"
import s from "../Game.module.css"
import type { CoordinateInput } from "../../../schemas/level.schema"

type Props = {
  position: CoordinateInput,
}

export function ThumbPicker({ position, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`${s.thumbnailPicker} `}
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      {children}
    </div>

  )
}
