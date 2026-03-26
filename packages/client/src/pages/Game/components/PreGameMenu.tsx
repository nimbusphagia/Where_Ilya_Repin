import type { PropsWithChildren } from "react"
import gs from "../../../main.module.css"
import s from "../Game.module.css"

type Props = {
  title: string,
  handleStart: () => void,
}

export function PreGameMenu({ title, handleStart, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`${gs.subMenu} ${s.subMenu}`}
    >
      <div
        className={s.smHeader}
      >
        <h1>{title}</h1>
      </div>
      {children}
      <button
        className={s.startBtn}
        type='button'
        onClick={handleStart}
      >
        START
      </button>
    </div>

  )
}
