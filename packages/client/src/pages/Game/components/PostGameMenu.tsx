import type { PropsWithChildren } from "react"
import gs from "../../../main.module.css"
import s from "../Game.module.css"
import { NavLink, useNavigate } from "react-router"

type Props = {
  title: string,
  handleRetry: () => void,
  nextLevel: string
}

export function PostGameMenu({ title, handleRetry, nextLevel, children }: PropsWithChildren<Props>) {
  const navigate = useNavigate();
  return (
    <div
      className={`${s.postGameMenu} ${gs.glass}`}
    >
      <div
        className={s.postGameHeader}
      >
        <h1>{title}</h1>
      </div>
      {children}
      <button
        className={s.retryBtn}
        type='button'
        onClick={() => navigate(0)}
      >
        Try again
      </button>
      <NavLink
        className={s.nextBtn}
        to={`/game/${nextLevel}`}
      >
        Next Level
      </NavLink>
    </div>

  )
}
