import type { PropsWithChildren } from "react"
import s from "../Game.module.css"
import gs from "../../../main.module.css"

type Props = {
  title: string,
  handleStart: () => void,
}

export function PreGameMenu({ title, handleStart, children }: PropsWithChildren<Props>) {
  return (
    <>
      <div
        className={`${s.preGameMenu} ${gs.glass}`}
      >
        <div
          className={s.preGameHeader}
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
    </>
  )
}
