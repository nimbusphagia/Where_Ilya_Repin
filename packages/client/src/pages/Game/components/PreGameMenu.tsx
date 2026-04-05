import type { PropsWithChildren } from "react"
import { NavLink } from "react-router"
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
        <div className={s.btnContainer}>
          <button
            className={s.startBtn}
            type='button'
            onClick={handleStart}
          >
            Start
          </button>

          <NavLink
            to="/"
            className={s.returnBtn}
          >
            Cancel
          </NavLink>

        </div>
      </div>
    </>
  )
}
