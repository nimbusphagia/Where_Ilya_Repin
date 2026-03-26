import type { PropsWithChildren } from "react"
import gs from "../../../main.module.css"
import s from "../Game.module.css"
import { NavLink } from "react-router"

type Props = {
  title: string,
  handleRetry: () => void,
  nextLevel: string
}

export function PostGameMenu({ title, handleRetry, nextLevel, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={gs.subMenu}
    >
      <div
        className={s.smHeader}
      >
        <h1>{title}</h1>
      </div>
      {children}
      <button
        className={s.retryBtn}
        type='button'
        onClick={handleRetry}
      >
        Try again
      </button>
      <NavLink
        className={s.nextBtn}
        to={`/game/${nextLevel}`}
      >
        Try again
      </NavLink>
    </div>

  )
}
