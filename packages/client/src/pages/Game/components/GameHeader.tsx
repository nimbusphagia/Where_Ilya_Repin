import type { PropsWithChildren } from "react"
import s from "../Game.module.css"
import gs from "../../../main.module.css"
import { Timer } from "./Timer"
import { formatTime } from "../../../utils/formatting"

type Props = {
  title: string,
  time: number,
}

export function GameHeader({ title, time, children }: PropsWithChildren<Props>) {
  return (
    <header
      className={`${s.header} ${gs.glass}`}
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
