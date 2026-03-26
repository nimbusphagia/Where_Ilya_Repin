import type { PropsWithChildren } from "react"
import s from "../Game.module.css"
import { Timer } from "./Timer"
import { formatTime } from "../../../utils/formatting"

type Props = {
  title: string,
  time: number,
}

export function GameHeader({ title, time, children }: PropsWithChildren<Props>) {
  return (
    <header
      className={s.header}
    >
      <h1>
        {title}
      </h1>
      <Timer
        time={formatTime(time)}
      />
      {children}
    </header>

  )
}
